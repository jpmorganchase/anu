import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./tests", // directory where the tests are located
    retries: process.env.CI ? 2 : 0, // retry failed tests on CI
    
    // Configure projects for different test suites
    projects: [
        {
            name: 'anu-examples',
            testMatch: /.*\.spec\.ts/,
            testIgnore: /docs-examples\.spec\.ts/,
            use: {
                baseURL: "http://localhost:3443",
                browserName: "chromium",
                headless: true,
                launchOptions: {
                    args: [
                        "--no-sandbox",
                        "--disable-dev-shm-usage",
                        "--use-gl=swiftshader"
                    ]
                },
                viewport: { width: 1280, height: 720 }
            },
        },
        {
            name: 'docs-examples',
            testMatch: /docs-examples\.spec\.ts/,
            use: {
                baseURL: "http://localhost:5173/anu/",
                browserName: "chromium",
                headless: true,
                launchOptions: {
                    args: [
                        "--no-sandbox",
                        "--disable-dev-shm-usage",
                        "--use-gl=swiftshader"
                    ]
                },
                viewport: { width: 1280, height: 720 }
            },
        },
    ],
    
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

    webServer: [
        {
            command: "cd anu-examples && npm run dev",
            url: "http://localhost:3443",
            timeout: 120 * 1000,
            reuseExistingServer: !process.env.CI
        },
        {
            command: "cd docs && npm run docs:dev",
            url: "http://localhost:5173/anu/",
            timeout: 120 * 1000,
            reuseExistingServer: !process.env.CI
        }
    ]
});