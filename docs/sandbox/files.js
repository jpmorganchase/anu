/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
    'main.js': {
      file: {
        contents: `
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { HemisphericLight, ArcRotateCamera, Vector3, Scene, Engine} from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.

//Grab DOM element where we will attach our canvas. #app is the id assigned to an empty <div> in our index.html 
const app = document.querySelector('#app');
//Create a canvas element and append it to #app div
const canvas = document.createElement('canvas');
app.appendChild(canvas);

//initialize babylon engine, passing in our target canvas element, and create a new scene
const babylonEngine = new Engine(canvas, true)

//create a scene object using our engine
const scene = new Scene(babylonEngine)

//Add lights and a camera
new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
camera.position = new Vector3(-10, 10, -20)
camera.attachControl(true)

//Make a box as a anu Selection object
let box = anu.bind('box', scene);

//Render the scene we created
babylonEngine.runRenderLoop(() => {
scene.render()
})

//Listen for window size changes and resize the scene accordingly 
window.addEventListener("resize", function () {
babylonEngine.resize();
});


// hide/show the Inspector
window.addEventListener("keydown", (ev) => {
    // Shift+Ctrl+Alt+I
    if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
        if (scene.debugLayer.isVisible()) {
            scene.debugLayer.hide();
        } else {
            scene.debugLayer.show();
        }
    }
});
        `,
      },
    },
    'style.css': {
        file: {
            contents: `
            html,
            body {
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
            overflow: hidden;
            }
    
            #app,
            canvas {
            width: 100%;
            height: 100%;
            display: block;
            font-size: 0;
            }
            `
        }
      },
    'index.html': {
        file: {
            contents:`
            <!doctype html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <link rel="stylesheet" href="style.css">
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Anu Starter Template</title>
            </head>
            <body>
                <div id="app"></div>
                <script type="module" src="/main.js"></script>
            </body>
            </html>
            `
    },
},
    'package.json': {
      file: {
        contents: `
        {
            "name": "anu-starter-template",
            "private": true,
            "version": "0.0.1",
            "type": "module",
            "scripts": {
              "dev": "vite",
              "build": "vite build",
              "preview": "vite preview"
            },
            "devDependencies": {
              "vite": "^4.4.5"
            },
            "dependencies": {
              "@babylonjs/inspector": "^6.22.1",
              "@jpmorganchase/anu": "^0.0.1"
            }
          }
        `,
      },
    }
  };

// export const files = {
//     'index.js': {
//       file: {
//         contents: `
//   import express from 'express';
//   const app = express();
//   const port = 3111;
  
//   app.get('/', (req, res) => {
//     res.send('Welcome to a WebContainers app! 🥳');
//   });
  
//   app.listen(port, () => {
//     console.log(\`App is live at http://localhost:\${port}\`);
//   });`,
//       },
//     },
//     'package.json': {
//       file: {
//         contents: `
//   {
//     "name": "example-app",
//     "type": "module",
//     "dependencies": {
//       "express": "latest",
//       "nodemon": "latest"
//     },
//     "scripts": {
//       "start": "nodemon --watch './' index.js"
//     }
//   }`,
//       },
//     },
//   };