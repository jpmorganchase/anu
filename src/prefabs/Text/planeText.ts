// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Scene, Vector3, Color3, Node, Matrix, TransformNode } from '@babylonjs/core';
import { FontAsset, TextRenderer } from '@babylonjs/addons';
import type { ParagraphOptions } from '@babylonjs/addons';
import fnt from '../../assets/roboto-regular.json';
import png from '../../assets/roboto-regular.png';
import assign from 'lodash-es/assign';

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
  private isInitialized: boolean = false;
  private hasAddedText: boolean = false;
  private _isDisposing: boolean = false;
  private _isRecreating: boolean = false;
  private _pendingTextUpdate: string | null = null;
  private _isEnabled: boolean = true;

  // Static registry to manage all TextRenderer instances per scene
  private static rendererRegistry = new Map<Scene, Set<TextRenderer>>();
  private static sceneObservers = new Map<Scene, any>();
  
  // Static cache for font assets to avoid recreating them
  private static fontAssetCache = new Map<string, FontAsset>();

  constructor(name: string, options: PlaneTextOptions, scene: Scene) {
    super(name, scene);

    this.name = name;
    this.options = options;
    this.initialize();
  }

  private initialize() {
    // Check if already disposed before starting initialization
    if (this._isDisposing) {
      return;
    }

    // Get scene from TransformNode's getScene() method
    const scene = this.getScene();
    
    // Start async initialization but don't wait for it
    this.initializeAsync(scene);
  }

  private initializeAsync(scene: Scene) {
    // Create or get cached font asset
    let fontDataPromise: Promise<string>;
    
    // Handle font data - can be URL, object, or string JSON
    if (typeof this.options.font === 'string') {
      // If it's a URL, fetch it
      if (this.options.font.startsWith('http')) {
        fontDataPromise = fetch(this.options.font).then(r => r.text());
      } else {
        fontDataPromise = Promise.resolve(this.options.font);
      }
    } else {
      fontDataPromise = Promise.resolve(JSON.stringify(this.options.font));
    }
    
    fontDataPromise.then(fontData => {
      // Check if disposed during async operation
      if (this._isDisposing) {
        return;
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

      // Create a cache key based on font data and atlas URL
      const cacheKey = `${fontData.substring(0, 100)}_${atlasUrl}`;
      
      // Check if we have a cached font asset
      if (PlaneText.fontAssetCache.has(cacheKey)) {
        this.fontAsset = PlaneText.fontAssetCache.get(cacheKey)!;
      } else {
        // Create new font asset and cache it
        this.fontAsset = new FontAsset(fontData, atlasUrl, scene);
        PlaneText.fontAssetCache.set(cacheKey, this.fontAsset);
      }

      // Create text renderer
      return TextRenderer.CreateTextRendererAsync(
        this.fontAsset,
        scene.getEngine()
      );
    }).then(renderer => {
      if (!renderer) return;

      // Check again if disposed during async operation
      if (this._isDisposing) {
        renderer.dispose();
        return;
      }

      this.textRenderer = renderer;

      // Configure renderer properties
      this.textRenderer.parent = this;
      this.isInitialized = true;

      // Register this text renderer with the scene (only if enabled)
      if (this._isEnabled) {
        this.registerRenderer(scene, this.textRenderer);
      }

      // Initial render
      this.updateText();
      this.updateRendererProperties();
      this.updateTransform();
    });
  }

  /**
   * Register a TextRenderer with the scene and set up rendering if needed
   */
  private registerRenderer(scene: Scene, renderer: TextRenderer) {
    // Get or create the set of renderers for this scene
    if (!PlaneText.rendererRegistry.has(scene)) {
      PlaneText.rendererRegistry.set(scene, new Set());
    }
    
    const renderers = PlaneText.rendererRegistry.get(scene)!;
    renderers.add(renderer);

    // If this is the first renderer for this scene, set up the render observer
    if (!PlaneText.sceneObservers.has(scene)) {
      const observer = scene.onAfterRenderObservable.add(() => {
        const activeCamera = scene.activeCamera;
        if (!activeCamera) return;

        const viewMatrix = activeCamera.getViewMatrix();
        const projectionMatrix = activeCamera.getProjectionMatrix();
        
        // Render all registered text renderers for this scene
        const sceneRenderers = PlaneText.rendererRegistry.get(scene);
        if (sceneRenderers) {
          sceneRenderers.forEach(textRenderer => {
            textRenderer.render(viewMatrix, projectionMatrix);
          });
        }
      });
      
      PlaneText.sceneObservers.set(scene, observer);
    }
  }

  /**
   * Unregister a TextRenderer from the scene
   */
  private unregisterRenderer(scene: Scene, renderer: TextRenderer) {
    const renderers = PlaneText.rendererRegistry.get(scene);
    if (renderers) {
      renderers.delete(renderer);
      
      // If no more renderers for this scene, clean up the observer
      if (renderers.size === 0) {
        const observer = PlaneText.sceneObservers.get(scene);
        if (observer) {
          scene.onAfterRenderObservable.remove(observer);
          PlaneText.sceneObservers.delete(scene);
        }
        PlaneText.rendererRegistry.delete(scene);
      }
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
    
    if (!this.isInitialized || !this.textRenderer) return;
    
    const scene = this.getScene();
    
    if (enabled) {
      // Re-register the renderer to enable rendering
      this.registerRenderer(scene, this.textRenderer);
    } else {
      // Unregister the renderer to disable rendering (but don't dispose it)
      const renderers = PlaneText.rendererRegistry.get(scene);
      if (renderers) {
        renderers.delete(this.textRenderer);
        // Note: Don't clean up the observer even if no renderers remain,
        // as we might re-enable this or other text later
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
    const paragraphOptionChanged = options.align !== undefined || options.vAlign !== undefined || options.lineHeight !== undefined;
    
    //Override the existing options object with any new options
    this.options = assign({}, this.options, options);
    
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
    if (!this.isInitialized || !this.textRenderer) {
      return;
    }

    // If text has already been added, we need to recreate the renderer
    // since TextRenderer doesn't have a clear() method
    if (this.hasAddedText) {
      // Store the pending text update
      this._pendingTextUpdate = this.options.text;
      
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
  private recreateRenderer() {
    if (!this.textRenderer || this._isRecreating || this._isDisposing) return;
    
    this._isRecreating = true;
    const scene = this.getScene();
    
    // Store the current text to apply after recreation
    const textToApply = this._pendingTextUpdate || this.options.text;
    this._pendingTextUpdate = null;
    
    // Keep reference to old renderer - we'll dispose it AFTER the new one is ready
    const oldRenderer = this.textRenderer;
    
    // Create new renderer with same font asset (async)
    TextRenderer.CreateTextRendererAsync(
      this.fontAsset!,
      scene.getEngine()
    ).then(newRenderer => {
      // Check if disposed during async operation
      if (this._isDisposing) {
        newRenderer.dispose();
        this._isRecreating = false;
        return;
      }
      
      // Check if text changed again during recreation
      if (this._pendingTextUpdate && this._pendingTextUpdate !== textToApply) {
        // Text changed again, dispose this renderer and recreate again
        newRenderer.dispose();
        this._isRecreating = false;
        this.recreateRenderer();
        return;
      }
      
      // Configure the new renderer
      newRenderer.parent = this;
      
      // Temporarily set the text to what we want to display
      const originalText = this.options.text;
      this.options.text = textToApply;
      
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
      
      // Schedule the swap to happen just before the next render
      scene.onBeforeRenderObservable.addOnce(() => {
        // Swap renderers - register new one first (only if enabled), then unregister old one
        if (this._isEnabled) {
          this.registerRenderer(scene, newRenderer);
        }
        this.textRenderer = newRenderer;
        this.hasAddedText = true;
        
        // Now dispose the old renderer
        this.unregisterRenderer(scene, oldRenderer);
        oldRenderer.dispose();
        
        // Restore original text if different
        if (originalText !== textToApply) {
          this.options.text = originalText;
        }
        
        this._isRecreating = false;
      });
    });
  }

  private updateRendererProperties() {
    if (!this.isInitialized || !this.textRenderer) {
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
    if (!this.isInitialized || !this.textRenderer) {
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

  private reinitialize() {
    const scene = this.getScene();
    
    // Clean up existing resources
    if (this.textRenderer) {
      this.unregisterRenderer(scene, this.textRenderer);
      this.textRenderer.dispose();
      this.textRenderer = null;
    }
    // Note: Don't dispose fontAsset as it may be cached and shared
    this.fontAsset = null;

    this.isInitialized = false;
    this.hasAddedText = false;
    this.initialize();
  }

  override dispose(doNotRecurse?: boolean, disposeMaterialAndTextures?: boolean): void {
    // Mark as disposing to prevent initialization from completing
    this._isDisposing = true;
    
    const scene = this.getScene();
    
    // Clean up text renderer resources
    if (this.textRenderer) {
      this.unregisterRenderer(scene, this.textRenderer);
      this.textRenderer.dispose();
      this.textRenderer = null;
    }
    
    // Note: Don't dispose fontAsset as it may be cached and shared
    this.fontAsset = null;
    this.isInitialized = false;
    
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