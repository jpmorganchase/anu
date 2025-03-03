---
type: lesson
title: Anu Starter Template
slug: /:partSlug/:chapterSlug/2-quick-setup.html/
mainCommand: ['npm run dev', 'Starting http server']
prepareCommands:
  - ['npm install', 'Installing dependencies']
---


## Local Installation and Starter Template
We recommend following the [Babylon + Vite](https://doc.babylonjs.com/guidedLearning/usingVite) guide to set-up your Babylonjs project.

Once your project structure is up and running, install Anu.js by building it locally in a different file directory and linking it to your project.

```bash
npm install @jpmorganchase/anu
```

Then import the anu name space

```js
import * as anu from '@jpmorganchase/anu';
```

You can now call Anu methods as such

```js
//shape, name, options, data, scene
anu.create('box', 'myBox');
```

### Or Use The Anu-Starter Template 
You can also install the anu starter template using these npm commands or downloading the template on this page. 

```bash
npx @jpmorganchase/anu-starter@latest my_project
```

```bash
cd my_project
npm install
npm run dev
```

See and modify main.js to get started.



