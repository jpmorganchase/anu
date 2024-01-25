

<script setup>
import { onMounted, ref, onUnmounted, watchEffect, nextTick} from 'vue';
import { WebContainer } from '@webcontainer/api';
import { files } from './files';
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

const editor = ref()



/** @type {import('@webcontainer/api').WebContainer}  */
let webcontainerInstance;

//let contents = ref(files['index.js'].file.contents);




onMounted(async () => {
    const text = monaco.editor.create(editor.value, {
        value: files['main.js'].file.contents,
        language: 'javascript',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        theme: "vs-dark",
    });

    let frame = document.getElementById('preview');

    // Call only once
    webcontainerInstance = await WebContainer.boot();
    await webcontainerInstance.mount(files);

    const packageJSON = await webcontainerInstance.fs.readFile('package.json', 'utf-8');
    console.log(packageJSON);

      const exitCode = await installDependencies();
  if (exitCode !== 0) {
    throw new Error('Installation failed');
  };

    await startDevServer(preview);

    //text.value = files['index.js'].file.contents;

    // text.addEventListener('input', (e) => {
    //      writeIndexJS(e.currentTarget.value);
    //  });
     
     text.onDidChangeModelContent((e) => {
        writeIndexJS(text.getValue())
     })

    

});


/** @param {string} content*/

async function writeIndexJS(content) {
  await webcontainerInstance.fs.writeFile('/main.js', content);
};

async function startDevServer(frame) {
  // Run `npm run start` to start the Express app
  await webcontainerInstance.spawn('npm', ['run', 'dev']);

  // Wait for `server-ready` event
  webcontainerInstance.on('server-ready', (port, url) => {
    console.log("server-ready")
    frame.src = url;
  });
}

async function installDependencies() {
  // Install dependencies
  const installProcess = await webcontainerInstance.spawn('npm', ['install']);
  // Wait for install command to exit
  installProcess.output.pipeTo(new WritableStream({
    write(data) {
      console.log(data);
    }}));
  return installProcess.exit;
}


</script>


<template>
     <div class="container">
    <div class="editor" id="editor" ref="editor">
    </div>
    <div class="preview">
      <iframe id='preview' src="./anu/loading.html"></iframe>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

/* body {
  margin: 0;
  height: 100%;
} */

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  height: 90vh;
  width: 100%;
  padding: 50px;
}

textarea {
  width: 100%;
  height: 100%;
  resize: none;
  border-radius: 0.5rem;
  background: black;
  color: white;
  padding: 0.5rem 1rem;
}

iframe {
  height: 100%;
  width: 100%;
  border-radius: 0.5rem;
}
</style>