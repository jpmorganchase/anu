import{z as C,G as u}from"./anu.BEFiqz5l.js";import{S as w,H as v,V as i,A as x,a as z,C as L}from"./flowGraphSceneTickEventBlock.jsKt_esu.js";import{i as t}from"./iris.BAQHmt8h.js";import"./transform.bqJWYwjj.js";import{l as n}from"./linear.DaneNRwP.js";import{e as s}from"./extent.Ccx1MofX.js";import{m}from"./map.B1ecjv1F.js";import{o as S}from"./ordinal.Cn4HJ1r5.js";import{s as M}from"./category10.BWdlC_y7.js";import"./colors.Cc3OSVma.js";const b=function(g){const a=new w(g);new v("light1",new i(0,10,0),a);const p=new x("Camera",-(Math.PI/4)*3,Math.PI/4,10,new i(0,0,0),a);p.attachControl(!0),p.position=new i(20,2,-40);var c=n().domain(s(m(t,e=>e.sepalLength))).range([-10,10]).nice(),l=n().domain(s(m(t,e=>e.petalLength))).range([-10,10]).nice(),h=n().domain(s(m(t,e=>e.sepalWidth))).range([-10,10]).nice(),f=S().domain(["setosa","versicolor","virginica"]).range(M);let d=C("cot");return d.bind("sphere",{diameter:.5},t).positionX((e,o,r)=>c(e.sepalLength)).positionY((e,o,r)=>l(e.petalLength)).positionZ((e,o,r)=>h(e.sepalWidth)).material((e,o,r)=>new z("myMaterial"+r,a)).diffuseColor(e=>L.FromHexString(f(e.species))),u("axes",a,{parent:d,scale:{x:c,y:l,z:h}}),a};export{b as scatterPlot3DStep6};