import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./tests", // directory where the tests are located
    retries: process.env.CI ? 2 : 0, // retry failed tests on CI
    use: {
        baseURL: "http://localhost:3443", // base URL where the game is served
        browserName: "chromium", // We are testing on chromium
        headless: true, // do not show the browser window
        launchOptions: {
            args: [
                "--no-sandbox",
                "--disable-dev-shm-usage",
                "--use-gl=swiftshader" // software WebGL (no need for a GPU)
            ]
        },
        viewport: { width: 1280, height: 720 } // HD resolution is good enough
    },
    fullyParallel: true, // Run tests in files in parallel

    expect: {
        toHaveScreenshot: {
            maxDiffPixelRatio: 0.03, // ~3 % pixels may differ (aliasing can change the color of some pixels)
            threshold: 0.01 // pixels are considered different if they differ by more than 1% (aliasing can change the color of some pixels)
        }
    },

    webServer: {
        command: "cd anu-examples && npm run dev", // Change this to the command that serves your built game
        url: "http://localhost:3443", // URL where the game is served
        timeout: 120 * 1000, // 2 minutes timeout for server startup
        reuseExistingServer: !process.env.CI // Don't start a new server if one is already running in CI
    }
});