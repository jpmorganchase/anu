import{z as s}from"./anu.BEFiqz5l.js";import{S as a,H as c,V as t,A as h}from"./flowGraphSceneTickEventBlock.jsKt_esu.js";import{i as m}from"./iris.BAQHmt8h.js";const g=function(i){const r=new a(i);new c("light1",new t(0,10,0),r);const o=new h("Camera",-(Math.PI/4)*3,Math.PI/4,10,new t(0,0,0),r);return o.attachControl(!0),o.position=new t(-5,-2,-1),s("cot").bind("sphere",{diameter:1},m).prop("position",(e,p,n)=>new t(e.sepalLength,e.sepalWidth,e.petalWidth)).prop("scaling.x",.1).prop("name",(e,p,n)=>"iris_sphere:"+n).prop("renderOutline",!0),r};export{g as prop};