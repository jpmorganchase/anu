import{_ as e,o as t,c as a,O as d}from"./chunks/framework.eb48dd0f.js";const m=JSON.parse('{"title":"anu","description":"","frontmatter":{},"headers":[],"relativePath":"api/modules.md","filePath":"api/modules.md"}'),l={name:"api/modules.md"},o=d('<p><a href="./README.html">anu</a> / Exports</p><h1 id="anu" tabindex="-1">anu <a class="header-anchor" href="#anu" aria-label="Permalink to &quot;anu&quot;">​</a></h1><h2 id="table-of-contents" tabindex="-1">Table of contents <a class="header-anchor" href="#table-of-contents" aria-label="Permalink to &quot;Table of contents&quot;">​</a></h2><h3 id="classes" tabindex="-1">Classes <a class="header-anchor" href="#classes" aria-label="Permalink to &quot;Classes&quot;">​</a></h3><ul><li><a href="./classes/Axis.html">Axis</a></li><li><a href="./classes/Chart2D.html">Chart2D</a></li><li><a href="./classes/Selection.html">Selection</a></li><li><a href="./classes/Tracer.html">Tracer</a></li></ul><h3 id="functions" tabindex="-1">Functions <a class="header-anchor" href="#functions" aria-label="Permalink to &quot;Functions&quot;">​</a></h3><ul><li><a href="./modules.html#bind">bind</a></li><li><a href="./modules.html#create">create</a></li><li><a href="./modules.html#createbar2d">createBar2D</a></li><li><a href="./modules.html#createmap2d">createMap2D</a></li><li><a href="./modules.html#createscatter2d">createScatter2D</a></li><li><a href="./modules.html#select">select</a></li><li><a href="./modules.html#selectdata">selectData</a></li><li><a href="./modules.html#selectid">selectId</a></li><li><a href="./modules.html#selectname">selectName</a></li><li><a href="./modules.html#selecttag">selectTag</a></li><li><a href="./modules.html#text2d">text2d</a></li></ul><h2 id="functions-1" tabindex="-1">Functions <a class="header-anchor" href="#functions-1" aria-label="Permalink to &quot;Functions&quot;">​</a></h2><h3 id="bind" tabindex="-1">bind <a class="header-anchor" href="#bind" aria-label="Permalink to &quot;bind&quot;">​</a></h3><p>▸ <strong>bind</strong>(<code>shape</code>, <code>scene</code>, <code>options?</code>, <code>data?</code>): <a href="./classes/Selection.html"><code>Selection</code></a></p><p>Take a selection, a shape type, and data. For each index in the data create a new mesh for each node in the selection as the parrent. The data index of the mesh is also attached to the mesh node object under the metadate property.</p><h4 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><code>shape</code></td><td style="text-align:left;"><code>string</code></td><td style="text-align:left;">A string of the type of the mesh geometry being created.</td></tr><tr><td style="text-align:left;"><code>scene</code></td><td style="text-align:left;"><code>Scene</code></td><td style="text-align:left;">The Babylon scene you are targeting.</td></tr><tr><td style="text-align:left;"><code>options</code></td><td style="text-align:left;"><code>object</code></td><td style="text-align:left;">A object contantaing the intial mesh parameters for the selected geometry, can be either values or functions.</td></tr><tr><td style="text-align:left;"><code>data</code></td><td style="text-align:left;"><code>object</code>[]</td><td style="text-align:left;">The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data.</td></tr></tbody></table><h4 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./classes/Selection.html"><code>Selection</code></a></p><p>An instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection, or undefined if a selection could not be made.</p><h4 id="defined-in" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p>bind.ts:17</p><hr><h3 id="create" tabindex="-1">create <a class="header-anchor" href="#create" aria-label="Permalink to &quot;create&quot;">​</a></h3><p>▸ <strong>create</strong>(<code>shape</code>, <code>name</code>, <code>scene</code>, <code>options?</code>, <code>data?</code>): <code>Mesh</code> | <code>TransformNode</code></p><p>Helper function to build meshes of a specified type with options optionally set with functions and data.</p><h4 id="parameters-1" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-1" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><code>shape</code></td><td style="text-align:left;"><code>string</code></td><td style="text-align:left;">The name of the mesh type you want to create.</td></tr><tr><td style="text-align:left;"><code>name</code></td><td style="text-align:left;"><code>string</code></td><td style="text-align:left;">The string that will be used as the inital mesh ID and name.</td></tr><tr><td style="text-align:left;"><code>scene</code></td><td style="text-align:left;"><code>Scene</code></td><td style="text-align:left;">The scene to create the mesh in.</td></tr><tr><td style="text-align:left;"><code>options</code></td><td style="text-align:left;"><code>object</code></td><td style="text-align:left;">An object containg the mesh parametetrs as either absolutle values or functions.</td></tr><tr><td style="text-align:left;"><code>data</code></td><td style="text-align:left;"><code>object</code></td><td style="text-align:left;">An object containg the data that may be used to execute any functions passed in options.</td></tr></tbody></table><h4 id="returns-1" tabindex="-1">Returns <a class="header-anchor" href="#returns-1" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>Mesh</code> | <code>TransformNode</code></p><p>A mesh object created with the passed parameters.</p><h4 id="defined-in-1" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-1" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p>create.ts:57</p><hr><h3 id="createbar2d" tabindex="-1">createBar2D <a class="header-anchor" href="#createbar2d" aria-label="Permalink to &quot;createBar2D&quot;">​</a></h3><p>▸ <strong>createBar2D</strong>(<code>name</code>, <code>scene</code>, <code>data</code>, <code>x</code>, <code>y</code>, <code>options?</code>): <code>Bar2D</code></p><h4 id="parameters-2" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-2" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>name</code></td><td style="text-align:left;"><code>string</code></td></tr><tr><td style="text-align:left;"><code>scene</code></td><td style="text-align:left;"><code>Scene</code></td></tr><tr><td style="text-align:left;"><code>data</code></td><td style="text-align:left;">[]</td></tr><tr><td style="text-align:left;"><code>x</code></td><td style="text-align:left;"><code>string</code></td></tr><tr><td style="text-align:left;"><code>y</code></td><td style="text-align:left;"><code>string</code></td></tr><tr><td style="text-align:left;"><code>options</code></td><td style="text-align:left;"><code>Object</code></td></tr><tr><td style="text-align:left;"><code>options.backgroundAlpha?</code></td><td style="text-align:left;"><code>number</code></td></tr><tr><td style="text-align:left;"><code>options.backgroundColor?</code></td><td style="text-align:left;"><code>Color3</code></td></tr><tr><td style="text-align:left;"><code>options.elementAlpha?</code></td><td style="text-align:left;"><code>number</code></td></tr><tr><td style="text-align:left;"><code>options.elementColor?</code></td><td style="text-align:left;"><code>Color3</code> | { <code>key</code>: <code>string</code> ; <code>scale</code>: <code>Function</code> }</td></tr><tr><td style="text-align:left;"><code>options.height?</code></td><td style="text-align:left;"><code>number</code></td></tr><tr><td style="text-align:left;"><code>options.padding?</code></td><td style="text-align:left;"><code>Object</code></td></tr><tr><td style="text-align:left;"><code>options.padding.bottom?</code></td><td style="text-align:left;"><code>number</code></td></tr><tr><td style="text-align:left;"><code>options.padding.left?</code></td><td style="text-align:left;"><code>number</code></td></tr><tr><td style="text-align:left;"><code>options.padding.right?</code></td><td style="text-align:left;"><code>number</code></td></tr><tr><td style="text-align:left;"><code>options.padding.top?</code></td><td style="text-align:left;"><code>number</code></td></tr><tr><td style="text-align:left;"><code>options.width?</code></td><td style="text-align:left;"><code>number</code></td></tr></tbody></table><h4 id="returns-2" tabindex="-1">Returns <a class="header-anchor" href="#returns-2" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>Bar2D</code></p><h4 id="defined-in-2" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-2" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p>prefabs/Chart2D/Bar2D.ts:80</p><hr><h3 id="createmap2d" tabindex="-1">createMap2D <a class="header-anchor" href="#createmap2d" aria-label="Permalink to &quot;createMap2D&quot;">​</a></h3><p>▸ <strong>createMap2D</strong>(<code>name</code>, <code>scene</code>): <code>Map2D</code></p><h4 id="parameters-3" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-3" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>name</code></td><td style="text-align:left;"><code>string</code></td></tr><tr><td style="text-align:left;"><code>scene</code></td><td style="text-align:left;"><code>Scene</code></td></tr></tbody></table><h4 id="returns-3" tabindex="-1">Returns <a class="header-anchor" href="#returns-3" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>Map2D</code></p><h4 id="defined-in-3" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-3" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p>prefabs/Mapping/Map2D.ts:168</p><hr><h3 id="createscatter2d" tabindex="-1">createScatter2D <a class="header-anchor" href="#createscatter2d" aria-label="Permalink to &quot;createScatter2D&quot;">​</a></h3><p>▸ <strong>createScatter2D</strong>(<code>name</code>, <code>scene</code>, <code>data</code>, <code>x</code>, <code>y</code>, <code>options?</code>): <code>Scatter2D</code></p><h4 id="parameters-4" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-4" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>name</code></td><td style="text-align:left;"><code>string</code></td></tr><tr><td style="text-align:left;"><code>scene</code></td><td style="text-align:left;"><code>Scene</code></td></tr><tr><td style="text-align:left;"><code>data</code></td><td style="text-align:left;">[]</td></tr><tr><td style="text-align:left;"><code>x</code></td><td style="text-align:left;"><code>string</code></td></tr><tr><td style="text-align:left;"><code>y</code></td><td style="text-align:left;"><code>string</code></td></tr><tr><td style="text-align:left;"><code>options</code></td><td style="text-align:left;"><code>Object</code></td></tr><tr><td style="text-align:left;"><code>options.backgroundAlpha?</code></td><td style="text-align:left;"><code>number</code></td></tr><tr><td style="text-align:left;"><code>options.backgroundColor?</code></td><td style="text-align:left;"><code>Color3</code></td></tr><tr><td style="text-align:left;"><code>options.elementAlpha?</code></td><td style="text-align:left;"><code>number</code></td></tr><tr><td style="text-align:left;"><code>options.elementColor?</code></td><td style="text-align:left;"><code>Color3</code> | { <code>key</code>: <code>string</code> ; <code>scale</code>: <code>Function</code> }</td></tr><tr><td style="text-align:left;"><code>options.height?</code></td><td style="text-align:left;"><code>number</code></td></tr><tr><td style="text-align:left;"><code>options.padding?</code></td><td style="text-align:left;"><code>Object</code></td></tr><tr><td style="text-align:left;"><code>options.padding.bottom?</code></td><td style="text-align:left;"><code>number</code></td></tr><tr><td style="text-align:left;"><code>options.padding.left?</code></td><td style="text-align:left;"><code>number</code></td></tr><tr><td style="text-align:left;"><code>options.padding.right?</code></td><td style="text-align:left;"><code>number</code></td></tr><tr><td style="text-align:left;"><code>options.padding.top?</code></td><td style="text-align:left;"><code>number</code></td></tr><tr><td style="text-align:left;"><code>options.width?</code></td><td style="text-align:left;"><code>number</code></td></tr></tbody></table><h4 id="returns-4" tabindex="-1">Returns <a class="header-anchor" href="#returns-4" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>Scatter2D</code></p><h4 id="defined-in-4" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-4" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p>prefabs/Chart2D/Scatter2D.ts:68</p><hr><h3 id="select" tabindex="-1">select <a class="header-anchor" href="#select" aria-label="Permalink to &quot;select&quot;">​</a></h3><p>▸ <strong>select</strong>(<code>name</code>, <code>scene</code>): <a href="./classes/Selection.html"><code>Selection</code></a></p><p>Select all nodes from the scene graph matching the indicator and return it as a instance of Selection.</p><h4 id="parameters-5" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-5" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><code>name</code></td><td style="text-align:left;"><code>string</code></td><td style="text-align:left;">The prefix and text of the selection, selection types include: .&lt;name&gt;, #&lt;id&gt;, $&lt;tags&gt;.</td></tr><tr><td style="text-align:left;"><code>scene</code></td><td style="text-align:left;"><code>Scene</code></td><td style="text-align:left;">The babylon scene the to select from.</td></tr></tbody></table><h4 id="returns-5" tabindex="-1">Returns <a class="header-anchor" href="#returns-5" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./classes/Selection.html"><code>Selection</code></a></p><p>an instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection, or undefined if a selection could not be made.</p><h4 id="defined-in-5" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-5" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p>select.ts:14</p><hr><h3 id="selectdata" tabindex="-1">selectData <a class="header-anchor" href="#selectdata" aria-label="Permalink to &quot;selectData&quot;">​</a></h3><p>▸ <strong>selectData</strong>(<code>key</code>, <code>value</code>, <code>scene</code>): <a href="./classes/Selection.html"><code>Selection</code></a></p><h4 id="parameters-6" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-6" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>key</code></td><td style="text-align:left;"><code>string</code> | <code>string</code>[]</td></tr><tr><td style="text-align:left;"><code>value</code></td><td style="text-align:left;"><code>string</code> | <code>number</code> | <code>string</code>[] | <code>number</code>[]</td></tr><tr><td style="text-align:left;"><code>scene</code></td><td style="text-align:left;"><code>Scene</code></td></tr></tbody></table><h4 id="returns-6" tabindex="-1">Returns <a class="header-anchor" href="#returns-6" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./classes/Selection.html"><code>Selection</code></a></p><h4 id="defined-in-6" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-6" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p>select.ts:58</p><hr><h3 id="selectid" tabindex="-1">selectId <a class="header-anchor" href="#selectid" aria-label="Permalink to &quot;selectId&quot;">​</a></h3><p>▸ <strong>selectId</strong>(<code>id</code>, <code>scene</code>): <a href="./classes/Selection.html"><code>Selection</code></a></p><h4 id="parameters-7" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-7" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>id</code></td><td style="text-align:left;"><code>string</code> | <code>string</code>[]</td></tr><tr><td style="text-align:left;"><code>scene</code></td><td style="text-align:left;"><code>Scene</code></td></tr></tbody></table><h4 id="returns-7" tabindex="-1">Returns <a class="header-anchor" href="#returns-7" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./classes/Selection.html"><code>Selection</code></a></p><h4 id="defined-in-7" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-7" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p>select.ts:40</p><hr><h3 id="selectname" tabindex="-1">selectName <a class="header-anchor" href="#selectname" aria-label="Permalink to &quot;selectName&quot;">​</a></h3><p>▸ <strong>selectName</strong>(<code>name</code>, <code>scene</code>): <a href="./classes/Selection.html"><code>Selection</code></a></p><h4 id="parameters-8" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-8" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>name</code></td><td style="text-align:left;"><code>string</code> | <code>string</code>[]</td></tr><tr><td style="text-align:left;"><code>scene</code></td><td style="text-align:left;"><code>Scene</code></td></tr></tbody></table><h4 id="returns-8" tabindex="-1">Returns <a class="header-anchor" href="#returns-8" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./classes/Selection.html"><code>Selection</code></a></p><h4 id="defined-in-8" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-8" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p>select.ts:32</p><hr><h3 id="selecttag" tabindex="-1">selectTag <a class="header-anchor" href="#selecttag" aria-label="Permalink to &quot;selectTag&quot;">​</a></h3><p>▸ <strong>selectTag</strong>(<code>tag</code>, <code>scene</code>): <a href="./classes/Selection.html"><code>Selection</code></a></p><h4 id="parameters-9" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-9" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>tag</code></td><td style="text-align:left;"><code>string</code> | <code>string</code>[]</td></tr><tr><td style="text-align:left;"><code>scene</code></td><td style="text-align:left;"><code>Scene</code></td></tr></tbody></table><h4 id="returns-9" tabindex="-1">Returns <a class="header-anchor" href="#returns-9" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./classes/Selection.html"><code>Selection</code></a></p><h4 id="defined-in-9" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-9" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p>select.ts:48</p><hr><h3 id="text2d" tabindex="-1">text2d <a class="header-anchor" href="#text2d" aria-label="Permalink to &quot;text2d&quot;">​</a></h3><p>▸ <strong>text2d</strong>(<code>name</code>, <code>options</code>, <code>scene</code>): <code>Mesh</code></p><h4 id="parameters-10" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-10" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>name</code></td><td style="text-align:left;"><code>string</code></td></tr><tr><td style="text-align:left;"><code>options</code></td><td style="text-align:left;"><code>Object</code></td></tr><tr><td style="text-align:left;"><code>options.backgroundColor?</code></td><td style="text-align:left;"><code>string</code></td></tr><tr><td style="text-align:left;"><code>options.fontColor?</code></td><td style="text-align:left;"><code>string</code></td></tr><tr><td style="text-align:left;"><code>options.fontMod?</code></td><td style="text-align:left;"><code>string</code></td></tr><tr><td style="text-align:left;"><code>options.fontSize?</code></td><td style="text-align:left;"><code>number</code></td></tr><tr><td style="text-align:left;"><code>options.fontStyle?</code></td><td style="text-align:left;"><code>string</code></td></tr><tr><td style="text-align:left;"><code>options.size?</code></td><td style="text-align:left;"><code>number</code></td></tr><tr><td style="text-align:left;"><code>options.text?</code></td><td style="text-align:left;"><code>string</code></td></tr><tr><td style="text-align:left;"><code>scene</code></td><td style="text-align:left;"><code>Scene</code></td></tr></tbody></table><h4 id="returns-10" tabindex="-1">Returns <a class="header-anchor" href="#returns-10" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>Mesh</code></p><h4 id="defined-in-10" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-10" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p>prefabs/text2d.ts:4</p>',112),n=[o];function r(c,s,i,h,f,g){return t(),a("div",null,n)}const u=e(l,[["render",r]]);export{m as __pageData,u as default};