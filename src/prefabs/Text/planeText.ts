// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Scene, Color3, Matrix, TransformNode } from '@babylonjs/core';
import { FontAsset, TextRenderer } from '@babylonjs/addons';
import type { ParagraphOptions } from '@babylonjs/addons';
import fnt from '../../assets/roboto-regular.json';
import png from '../../assets/roboto-regular.png';

// Global registry to manage all TextRenderer instances per scene
// Shared across all PlaneText instances
const rendererRegistry = new Map<Scene, Set<TextRenderer>>();
const sceneObservers = new Map<Scene, any>();
const sceneDisposeObservers = new Map<Scene, any>();

// Global cache for font assets to avoid recreating them
// Key format: "sceneId_fontCacheKey"
const fontAssetCache = new Map<string, FontAsset>();

// Track which font assets belong to which scene for cleanup
const sceneFontAssets = new Map<Scene, Set<string>>();

export interface PlaneTextOptions {
  text: string;
  font: any;
  atlas: any;
  align: 'left' | 'center' | 'right' ;
  vAlign: 'top' | 'middle' | 'bottom';
  color: Color3;
  strokeColor: Color3;
  strokeWidth: number;
  strokeInsetWidth: number;
  strokeOutsetWidth: number;
  strokeOpacity: number;
  opacity: number;
  size: number;
  lineHeight: number;
  thicknessControl: number;
  isBillboard: boolean;
  isBillboardScreenProjected: boolean;
  ignoreDepthBuffer: boolean;
}

export class PlaneText extends TransformNode {
  declare name: string;
  private options: PlaneTextOptions;
  private textRenderer: TextRenderer | null = null;
  private fontAsset: FontAsset | null = null;
  private hasAddedText: boolean = false;
  private _isRecreating: boolean = false;
  private _isEnabled: boolean = true;
  
  /** Promise that resolves when the PlaneText is fully initialized and rendered */
  public ready: Promise<void>;
  private _resolveReady!: () => void;

  constructor(name: string, options: PlaneTextOptions, scene: Scene) {
    super(name, scene);
    this.name = name;
    this.options = options;
    
    // Create a promise that will resolve when initialization and first render is complete
    this.ready = new Promise<void>((resolve) => {
      this._resolveReady = resolve;
    });
    
    this.initializeAsync(this.getScene());
  }

  private async initializeAsync(scene: Scene) {
    try {
      // Create or get cached font asset
      let fontData: string;
      
      // Handle font data - can be URL, object, or string JSON
      if (URL.canParse(this.options.font)) {
        // If it's a URL, fetch it
        if (this.options.font.startsWith('http')) {
          const response = await fetch(this.options.font);
          fontData = await response.text();
        } else {
          fontData = this.options.font;
        }
      } else {
        fontData = JSON.stringify(this.options.font);
      }

      // Handle atlas URL
      let atlasUrl: string;
      if (!this.options.atlas) {
        atlasUrl = png;
      } else if (typeof this.options.atlas === 'string') {
        atlasUrl = this.options.atlas;
      } else {
        atlasUrl = this.options.atlas.url || png;
      }

      // Create a cache key based on scene ID, font data and atlas URL
      const sceneId = scene.uid;
      const fontCacheKey = `${fontData.substring(0, 100)}_${atlasUrl}`;
      const cacheKey = `${sceneId}_${fontCacheKey}`;
      
      // Check if we have a cached font asset for this scene
      if (fontAssetCache.has(cacheKey)) {
        this.fontAsset = fontAssetCache.get(cacheKey)!;
      } else {
        // Create new font asset and cache it
        this.fontAsset = new FontAsset(fontData, atlasUrl, scene);
        fontAssetCache.set(cacheKey, this.fontAsset);
        
        // Track this font asset for this scene
        if (!sceneFontAssets.has(scene)) {
          sceneFontAssets.set(scene, new Set());
          
          // Set up scene disposal observer to clean up font assets when scene is disposed
          // Only do this once per scene
          if (!sceneDisposeObservers.has(scene)) {
            const disposeObserver = scene.onDisposeObservable.add(() => {
              PlaneText.cleanupSceneFontAssets(scene);
              sceneDisposeObservers.delete(scene);
            });
            sceneDisposeObservers.set(scene, disposeObserver);
          }
        }
        sceneFontAssets.get(scene)!.add(cacheKey);
      }

      // Create text renderer - this is async
      this.textRenderer = await TextRenderer.CreateTextRendererAsync(
        this.fontAsset,
        scene.getEngine()
      );

      // Configure renderer properties
      this.textRenderer.parent = this;
      
      // Register and render on the next frame to avoid flashing
      scene.onBeforeRenderObservable.addOnce(() => {
        if (this._isEnabled && this.textRenderer) {
          this.registerRenderer(scene, this.textRenderer);
          
          // Initial render
          this.updateText();
          this.updateRendererProperties();
          this.updateTransform();
          
          // Resolve ready promise after the text has been rendered
          scene.onAfterRenderObservable.addOnce(() => {
            this._resolveReady();
          });
        } else {
          // If disabled or no renderer, resolve immediately
          this._resolveReady();
        }
      });
 
    } catch (error) {
      console.error('PlaneText initialization error:', error);
      // Resolve ready even on error so awaiting code doesn't hang
      this._resolveReady();
    }
  }

  /**
   * Register a TextRenderer with the scene and set up rendering if needed
   */
  private registerRenderer(scene: Scene, renderer: TextRenderer) {
    // Get or create the set of renderers for this scene
    if (!rendererRegistry.has(scene)) {
      rendererRegistry.set(scene, new Set());
    }
    
    const renderers = rendererRegistry.get(scene)!;
    renderers.add(renderer);

    // If this is the first renderer for this scene, set up the render observer
    if (!sceneObservers.has(scene)) {
      const observer = scene.onAfterRenderObservable.add(() => {
        const activeCamera = scene.activeCamera;
        if (!activeCamera) return;

        const viewMatrix = activeCamera.getViewMatrix();
        const projectionMatrix = activeCamera.getProjectionMatrix();
        
        // Render all registered text renderers for this scene
        const sceneRenderers = rendererRegistry.get(scene);
        if (sceneRenderers) {
          sceneRenderers.forEach(textRenderer => {
            textRenderer.render(viewMatrix, projectionMatrix);
          });
        }
      });
      
      sceneObservers.set(scene, observer);
    }
  }

  /**
   * Unregister a TextRenderer from the scene
   */
  private unregisterRenderer(scene: Scene, renderer: TextRenderer) {
    const renderers = rendererRegistry.get(scene);
    if (renderers) {
      renderers.delete(renderer);
      
      // If no more renderers for this scene, clean up the observer
      // Note: We do NOT dispose font assets here because they should persist
      // across PlaneText instances. Font assets will be disposed when the scene is disposed.
      if (renderers.size === 0) {
        const observer = sceneObservers.get(scene);
        if (observer) {
          scene.onAfterRenderObservable.remove(observer);
          sceneObservers.delete(scene);
        }
        rendererRegistry.delete(scene);
      }
    }
  }
  
  /**
   * Clean up all font assets for a scene when the scene is being disposed
   * This should be called by the scene's onDisposeObservable
   */
  private static cleanupSceneFontAssets(scene: Scene) {
    const fontKeys = sceneFontAssets.get(scene);
    if (fontKeys) {
      fontKeys.forEach(key => {
        const fontAsset = fontAssetCache.get(key);
        if (fontAsset) {
          fontAsset.dispose();
          fontAssetCache.delete(key);
        }
      });
      sceneFontAssets.delete(scene);
    }
  }

  public get text() {
    return this.options.text;
  }
  public set text(newText: string) {
    this.options.text = newText;
    this.updateText();
  }

  public get font() {
    return this.options.font;
  }
  public set font(newFont: any) {
    this.options.font = newFont;
    this.reinitialize();
  }

  public get atlas() {
    return this.options.atlas;
  }
  public set atlas(newAtlas: any) {
    this.options.atlas = newAtlas;
    this.reinitialize();
  }

  public get align() {
    return this.options.align;
  }
  public set align(newAlign: 'left' | 'center' | 'right') {
    this.options.align = newAlign;
    this.updateText();
  }

  public get vAlign() {
    return this.options.vAlign;
  }
  public set vAlign(newVAlign: 'top' | 'middle' | 'bottom') {
    this.options.vAlign = newVAlign;
    this.updateText();
  }

  public get color() {
    return this.options.color;
  }
  public set color(newColor: Color3) {
    this.options.color = newColor;
    this.updateRendererProperties();
  }

  public get strokeColor() {
    return this.options.strokeColor;
  }
  public set strokeColor(newStrokeColor: Color3) {
    this.options.strokeColor = newStrokeColor;
    this.updateRendererProperties();
  }

  public get strokeWidth() {
    return this.options.strokeWidth;
  }
  public set strokeWidth(newStrokeWidth: number) {
    this.options.strokeWidth = newStrokeWidth;
    // When strokeWidth is set, update both inset and outset to half the value
    this.options.strokeInsetWidth = newStrokeWidth / 2;
    this.options.strokeOutsetWidth = newStrokeWidth / 2;
    this.updateRendererProperties();
  }

  public get strokeInsetWidth() {
    return this.options.strokeInsetWidth;
  }
  public set strokeInsetWidth(newStrokeInsetWidth: number) {
    this.options.strokeInsetWidth = newStrokeInsetWidth;
    this.updateRendererProperties();
  }

  public get strokeOutsetWidth() {
    return this.options.strokeOutsetWidth;
  }
  public set strokeOutsetWidth(newStrokeOutsetWidth: number) {
    this.options.strokeOutsetWidth = newStrokeOutsetWidth;
    this.updateRendererProperties();
  }

  public get strokeOpacity() {
    return this.options.strokeOpacity;
  }
  public set strokeOpacity(newStrokeOpacity: number) {
    this.options.strokeOpacity = newStrokeOpacity;
    this.updateRendererProperties();
  }

  public get opacity() {
    return this.options.opacity;
  }
  public set opacity(newOpacity: number) {
    this.options.opacity = newOpacity;
    this.updateRendererProperties();
  }

  public get size() {
    return this.options.size;
  }
  public set size(newSize: number) {
    this.options.size = newSize;
    this.updateTransform();
  }

  public get lineHeight() {
    return this.options.lineHeight;
  }
  public set lineHeight(newLineHeight: number) {
    this.options.lineHeight = newLineHeight;
    this.updateText();
  }

  public get thicknessControl() {
    return this.options.thicknessControl;
  }
  public set thicknessControl(newThicknessControl: number) {
    this.options.thicknessControl = newThicknessControl;
    this.updateRendererProperties();
  }

  public get isBillboard() {
    return this.options.isBillboard;
  }
  public set isBillboard(newIsBillboard: boolean) {
    this.options.isBillboard = newIsBillboard;
    this.updateRendererProperties();
  }

  public get isBillboardScreenProjected() {
    return this.options.isBillboardScreenProjected;
  }
  public set isBillboardScreenProjected(newIsBillboardScreenProjected: boolean) {
    this.options.isBillboardScreenProjected = newIsBillboardScreenProjected;
    this.updateRendererProperties();
  }

  public get ignoreDepthBuffer() {
    return this.options.ignoreDepthBuffer;
  }
  public set ignoreDepthBuffer(newIgnoreDepthBuffer: boolean) {
    this.options.ignoreDepthBuffer = newIgnoreDepthBuffer;
    this.updateRendererProperties();
  }

  /**
   * Enable or disable rendering of this text
   * When disabled, the text renderer is removed from the scene's rendering registry
   * @param enabled Whether the text should be rendered
   */
  public setEnabled(enabled: boolean): void {
    if (this._isEnabled === enabled) return;
    
    this._isEnabled = enabled;
    
    if (!this.textRenderer) return;
    
    const scene = this.getScene();
    
    if (enabled) {
      // Re-register the renderer to enable rendering
      this.registerRenderer(scene, this.textRenderer);
      
      // If text hasn't been added yet (was disabled during init), add it now
      if (!this.hasAddedText) {
        this.updateText();
        this.updateRendererProperties();
        this.updateTransform();
      }
    } else {
      // Unregister the renderer to disable rendering (but don't dispose it)
      const renderers = rendererRegistry.get(scene);
      if (renderers) {
        renderers.delete(this.textRenderer);
      }
    }
  }

  /**
   * Get the enabled state of this text
   * @returns Whether the text is currently enabled for rendering
   */
  public isEnabled(): boolean {
    return this._isEnabled;
  }

  /**
   * Updates the PlaneText with new options.
   *
   * @param options An options object of the properties to change.
   */
  public updatePlaneText(options: Partial<PlaneTextOptions>) {
    const needsReinit = options.font !== undefined || options.atlas !== undefined;
    const textChanged = options.text !== undefined && options.text !== this.options.text;
    const paragraphOptionChanged = (options.align !== undefined && options.align !== this.options.align) || 
                                    (options.vAlign !== undefined && options.vAlign !== this.options.vAlign) || 
                                    (options.lineHeight !== undefined && options.lineHeight !== this.options.lineHeight);
    
    //Override the existing options object with any new options
    Object.assign(this.options, options);
    
    if (needsReinit) {
      this.reinitialize();
    } else {
      // Only recreate renderer if text or paragraph options actually changed
      if (textChanged || paragraphOptionChanged) {
        this.updateText();
      }
      this.updateRendererProperties();
      this.updateTransform();
    }
  }

  private updateText() {
    if (!this.textRenderer) {
      return;
    }

    // If text has already been added, we need to recreate the renderer
    // since TextRenderer doesn't have a clear() method
    if (this.hasAddedText) {
      // Don't start a new recreation if one is already in progress
      if (!this._isRecreating) {
        this.recreateRenderer();
      }
      return;
    }

    const paragraphOptions: Partial<ParagraphOptions> = {
      textAlign: this.options.align,
      translate: this.getAlignmentOffset(),
      lineHeight: this.options.lineHeight,
    };

    this.textRenderer.addParagraph(this.options.text.toString(), paragraphOptions);
    this.hasAddedText = true;
  }

  /**
   * Recreate the text renderer to update text content
   * This is necessary because TextRenderer doesn't have a clear() method
   */
  private async recreateRenderer() {
    if (!this.textRenderer || this._isRecreating) return;
    
    this._isRecreating = true;
    const scene = this.getScene();
    const oldRenderer = this.textRenderer;
    
    try {
      // Create new renderer with same font asset
      const newRenderer = await TextRenderer.CreateTextRendererAsync(
        this.fontAsset!,
        scene.getEngine()
      );

      newRenderer.parent = this;
      
      // Add text to new renderer
      const paragraphOptions: Partial<ParagraphOptions> = {
        textAlign: this.options.align,
        translate: this.getAlignmentOffset(),
        lineHeight: this.options.lineHeight,
      };
      newRenderer.addParagraph(this.options.text.toString(), paragraphOptions);
      
      // Apply properties to new renderer
      newRenderer.color = {
        r: this.options.color.r,
        g: this.options.color.g,
        b: this.options.color.b,
        a: this.options.opacity
      };
      newRenderer.strokeColor = {
        r: this.options.strokeColor.r,
        g: this.options.strokeColor.g,
        b: this.options.strokeColor.b,
        a: this.options.strokeOpacity
      };
      newRenderer.strokeInsetWidth = this.options.strokeInsetWidth;
      newRenderer.strokeOutsetWidth = this.options.strokeOutsetWidth;
      newRenderer.thicknessControl = this.options.thicknessControl;
      newRenderer.isBillboard = this.options.isBillboard;
      newRenderer.isBillboardScreenProjected = this.options.isBillboardScreenProjected;
      newRenderer.ignoreDepthBuffer = this.options.ignoreDepthBuffer;
      
      const scaleMatrix = Matrix.Scaling(this.options.size, this.options.size, this.options.size);
      newRenderer.transformMatrix = scaleMatrix;
      
      // Register new renderer BEFORE unregistering old one to minimize gap
      if (this._isEnabled) {
        this.registerRenderer(scene, newRenderer);
      }
      
      // Update reference to new renderer
      this.textRenderer = newRenderer;
      this.hasAddedText = true;
      
      // Unregister and dispose old renderer after new one is ready
      this.unregisterRenderer(scene, oldRenderer);
      oldRenderer.dispose();
      
      this._isRecreating = false;
    } catch (error) {
      console.error('PlaneText recreation error:', error);
      this._isRecreating = false;
    }
  }

  private updateRendererProperties() {
    if (!this.textRenderer) {
      return;
    }

    // Update color with opacity
    this.textRenderer.color = {
      r: this.options.color.r,
      g: this.options.color.g,
      b: this.options.color.b,
      a: this.options.opacity
    };

    // Update stroke
    this.textRenderer.strokeColor = {
      r: this.options.strokeColor.r,
      g: this.options.strokeColor.g,
      b: this.options.strokeColor.b,
      a: this.options.strokeOpacity
    };
    this.textRenderer.strokeInsetWidth = this.options.strokeInsetWidth;
    this.textRenderer.strokeOutsetWidth = this.options.strokeOutsetWidth;

    // Update other TextRenderer properties
    this.textRenderer.thicknessControl = this.options.thicknessControl;
    this.textRenderer.isBillboard = this.options.isBillboard;
    this.textRenderer.isBillboardScreenProjected = this.options.isBillboardScreenProjected;
    this.textRenderer.ignoreDepthBuffer = this.options.ignoreDepthBuffer;
  }

  private updateTransform() {
    if (!this.textRenderer) {
      return;
    }

    // Apply scaling through the transform matrix
    const scaleMatrix = Matrix.Scaling(this.options.size, this.options.size, this.options.size);
    this.textRenderer.transformMatrix = scaleMatrix;
  }

  private getAlignmentOffset(): { x: number; y: number } {
    // Calculate horizontal alignment offset
    let xOffset = 0;
    switch (this.options.align) {
      case 'left':
        xOffset = 0;
        break;
      case 'center':
        xOffset = -0.5;
        break;
      case 'right':
        xOffset = -1;
        break;
    }

    // Calculate vertical alignment offset
    let yOffset = 0;
    switch (this.options.vAlign) {
      case 'top':
        yOffset = 0.5;
        break;
      case 'middle':
        yOffset = 0;
        break;
      case 'bottom':
        yOffset = -0.5;
        break;
    }

    return { x: xOffset, y: yOffset };
  }

  private async reinitialize() {
    const scene = this.getScene();
    
    // Clean up existing resources
    if (this.textRenderer) {
      this.unregisterRenderer(scene, this.textRenderer);
      this.textRenderer.dispose();
      this.textRenderer = null;
    }
    // Note: Don't dispose fontAsset as it may be cached and shared
    this.fontAsset = null;
    this.hasAddedText = false;
    
    await this.initializeAsync(scene);
  }

  override dispose(doNotRecurse: boolean = false, disposeMaterialAndTextures: boolean = false): void {
    const scene = this.getScene();
    // Clean up text renderer resources
    if (this.textRenderer) {
      this.unregisterRenderer(scene, this.textRenderer);
      this.textRenderer = null;
    }
    
    // Note: Don't dispose fontAsset as it may be cached and shared
    this.fontAsset = null;
    
    super.dispose(doNotRecurse, disposeMaterialAndTextures);
  }
}

/**
 * Creates a new PlaneText prefab.
 *
 * @param name The name of this PlaneText.
 * @param options An options object of the PlaneText.
 * @param scene The target scene for the created PlaneText.
 * 
 * @example
 * // Use default Babylon.js CDN fonts
 * const text = createPlaneText('myText', { text: 'Hello World' }, scene);
 * 
 * @example
 * // Use custom font from URL
 * const text = createPlaneText('myText', {
 *   text: 'Hello World',
 *   font: 'https://example.com/my-font.json',
 *   atlas: 'https://example.com/my-font.png'
 * }, scene);
 */
export function createPlaneText(name: string, options: Partial<PlaneTextOptions>, scene: Scene) {
  // If strokeWidth is provided but inset/outset are not, split strokeWidth in half
  const strokeInset = options.strokeInsetWidth ?? (options.strokeWidth ? options.strokeWidth / 2 : 0);
  const strokeOutset = options.strokeOutsetWidth ?? (options.strokeWidth ? options.strokeWidth / 2 : 0);
  
  const ops: PlaneTextOptions = {
    text: options.text ?? "undefined",
    font: options.font ?? fnt,
    atlas: options.atlas ?? png,
    align: options.align ?? 'center',
    vAlign: options.vAlign ?? 'middle',
    color: options.color ?? Color3.White(),
    strokeColor: options.strokeColor ?? Color3.Black(),
    strokeWidth: options.strokeWidth ?? 0,
    strokeInsetWidth: strokeInset,
    strokeOutsetWidth: strokeOutset,
    strokeOpacity: options.strokeOpacity ?? 1,
    opacity: options.opacity ?? 1,
    size: options.size ?? 1,
    lineHeight: options.lineHeight ?? 1,
    thicknessControl: options.thicknessControl ?? 0,
    isBillboard: options.isBillboard ?? false,
    isBillboardScreenProjected: options.isBillboardScreenProjected ?? false,
    ignoreDepthBuffer: options.ignoreDepthBuffer ?? false,
  };
  let plane = new PlaneText(name, ops, scene);
  return plane;
}