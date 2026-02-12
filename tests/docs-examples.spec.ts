import { test, expect } from '@playwright/test';
import { readdirSync } from 'fs';
import { join } from 'path';

// Get all example files from docs/anu-examples
const examplesDir = join(process.cwd(), 'docs', 'anu-examples');

// Examples to exclude from testing
const excludedExamples = [
  'Binding_Instances',
  'Hover',
  'NodeLink3D',
  'brush',
  'brushing_linking_filter',
  'brushing_linking_multiple',
  'brushing_linking_single',
  'dimensionalityReductionPlot',
  'dotDensityGlobe',
  'dotDensityMap',
  'fig1b',
  'linechart2DTubes',
  'prop',
  'props',
  'selectionTest'
];

const exampleFiles = readdirSync(examplesDir)
  .filter(file => file.endsWith('.js') && !file.startsWith('bench_'))
  .map(file => file.replace('.js', ''))
  .filter(name => !excludedExamples.includes(name));

for (const exampleName of exampleFiles) {
  test.describe(`Example: ${exampleName}`, () => {
    
    test('should load and render correctly', async ({ page }) => {
      // Navigate to the example-runner page with example parameter
      // Use relative URL without leading slash so baseURL is properly used
      const url = `/anu/example-runner.html?example=${exampleName}`;
      
      // Start timing
      const startTime = Date.now();
      
      // Navigate to page with increased timeout
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Wait for the canvas to be ready with data-ready attribute (scene initialized)
      await page.locator('canvas#singleView-canvas[scene-ready="1"]').waitFor({ timeout: 15000 });

      // Record time to ready
      const readyTime = Date.now() - startTime;
      console.log(`${exampleName} - Ready in ${readyTime}ms`);
      
      // Additional wait for scene to stabilize and render a few frames
      await page.waitForTimeout(2000);
      
      // Take screenshot for visual regression
      await expect(page).toHaveScreenshot(`${exampleName}.png`, {
        fullPage: false,
        timeout: 20000,
        maxDiffPixelRatio: 0.2
      });
    });
  });
}
