---
type: lesson
title: Step 6 Viewing in XR
focus: /main.js
terminal:
  open: false
  activePanel: 1
  panels:
    - type: terminal
      id: 'cmds'
      title: 'Command Line'
      allowRedirects: true
      allowCommands:
        - npx
slug: /:partSlug/:chapterSlug/6-Step6.html/
---

# Adding WebXR

Now we have a complete 3D visualization! We can view and interact with it in 2D on our desktop/laptop browser, but we can also view this visualization in AR/VR using WebXR!
Thankfully, Babylon has excellent webXR support and we can add the essentials for a XR app to our scene in a couple lines. Once we add these features we can preview them either using an emulator in our browser or by opening the webpage in our headsets browser. 

:::tip
[Babylon WebXR Docs](https://doc.babylonjs.com/features/featuresDeepDive/webXR/introToWebXR)

[WebXR Docs](https://immersiveweb.dev/)

[WebXR Emulator Chrome Plugin](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik?hl=en)
:::

#### Step 1: Add the Default WebXR Experience Helper

Lets start by adding the Babylon [default webXR experience helper](https://doc.babylonjs.com/features/featuresDeepDive/webXR/webXRExperienceHelpers/#webxr-default-experience-helper) to our app. 

```js
let defaultXRExperience = await scene.createDefaultXRExperienceAsync( /* optional configuration options */ );
```

After adding this line, if you are viewing the page from a compatible browser on a headset or have the emulator plugin you should see a VR headset icon in the bottom right of the screen. Clicking this icon should launch you into an immersive session either in the headset or emulator. If you don't see this icon, check your dev console and you will likely see a warning about webXR not being support on your device/browser. 

#### Step 2: Viewing in a Headset

The easiest way to view our app on a headset is to expose our local dev server to the web using a tool like [local tunnel](https://github.com/localtunnel/localtunnel). We just need to make sure we use https when we visit our webpage. 

```bash
npx localtunnel --port 8000
```

This should generate a public url that we can visit in our headset browser to load our app. Select the VR googles icon to enter a immersive VR session. 
 
Another way to view our app in a headset is to expose a local dev server to devices on our same network. This is relatively straight forward but requires a few extra steps to enable https since it is required for webXR to work. 
You will need to install the npm package vite-plugin-mkcert, and configure your vite.config.js like so.

```js
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  server: { https: true }, // Not needed for Vite 5+
  plugins: [ mkcert() ]
})
```

To start a dev server exposed to the local network open the terminal (using the toggle terminal button) and enter the following command.

```bash
vite --host
```

