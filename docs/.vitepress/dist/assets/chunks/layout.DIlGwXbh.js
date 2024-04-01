import{c as b}from"./cars.ZL61P2WZ.js";import{S as q,H as W,V as B,A as J,a as K,C as Q,a0 as E}from"./flowGraphSceneTickEventBlock.jsKt_esu.js";import"./transform.bqJWYwjj.js";import{U as w,Y as $,B as N,G as Z,j as tt}from"./anu.BEFiqz5l.js";import{a as et,C as u,S as rt,R as y,b as Y,c as ot,T as nt,A as at,B as F}from"./mrdlInnerquadMaterial.DLN2Fw7l.js";import{e as L}from"./extent.Ccx1MofX.js";import{b as G}from"./band.DcdtCWjW.js";import{l as V}from"./linear.DaneNRwP.js";import{s as X}from"./sequential.H7nM2Imq.js";import{f as U,m as S}from"./mean.DkLkF0ET.js";import{P as it}from"./PuBuGn.BdTJOPXS.js";import"./ordinal.Cn4HJ1r5.js";import"./colors.Cc3OSVma.js";import"./ramp.RIZ0N6BV.js";class j{constructor(t){this.name=t,this._groupPanel=new Y,this._selectors=new Array,this._groupPanel.verticalAlignment=u.VERTICAL_ALIGNMENT_TOP,this._groupPanel.horizontalAlignment=u.HORIZONTAL_ALIGNMENT_LEFT,this._groupHeader=this._addGroupHeader(t)}get groupPanel(){return this._groupPanel}get selectors(){return this._selectors}get header(){return this._groupHeader.text}set header(t){this._groupHeader.text!=="label"&&(this._groupHeader.text=t)}_addGroupHeader(t){const e=new nt("groupHead",t);return e.width=.9,e.height="30px",e.textWrapping=!0,e.color="black",e.horizontalAlignment=u.HORIZONTAL_ALIGNMENT_LEFT,e.textHorizontalAlignment=u.HORIZONTAL_ALIGNMENT_LEFT,e.left="2px",this._groupPanel.addControl(e),e}_getSelector(t){if(!(t<0||t>=this._selectors.length))return this._selectors[t]}removeSelector(t){t<0||t>=this._selectors.length||(this._groupPanel.removeControl(this._selectors[t]),this._selectors.splice(t,1))}}class st extends j{constructor(){super(...arguments),this._selectNb=0}addRadio(t,e=n=>{},o=!1){const n=this._selectNb++,s=new et;s.name=t,s.width="20px",s.height="20px",s.color="#364249",s.background="#CCCCCC",s.group=this.name,s.horizontalAlignment=u.HORIZONTAL_ALIGNMENT_LEFT,s.onIsCheckedChangedObservable.add(function(d){d&&e(n)});const c=u.AddHeader(s,t,"200px",{isHorizontal:!0,controlFirst:!0});c.height="30px",c.horizontalAlignment=u.HORIZONTAL_ALIGNMENT_LEFT,c.left="4px",this.groupPanel.addControl(c),this.selectors.push(c),s.isChecked=o,this.groupPanel.parent&&this.groupPanel.parent.parent&&(s.color=this.groupPanel.parent.parent.buttonColor,s.background=this.groupPanel.parent.parent.buttonBackground)}_setSelectorLabel(t,e){this.selectors[t].children[1].text=e}_setSelectorLabelColor(t,e){this.selectors[t].children[1].color=e}_setSelectorButtonColor(t,e){this.selectors[t].children[0].color=e}_setSelectorButtonBackground(t,e){this.selectors[t].children[0].background=e}}class M extends j{addSlider(t,e=r=>{},o="Units",n=0,s=0,c=0,d=r=>r|0){const r=new rt;r.name=o,r.value=c,r.minimum=n,r.maximum=s,r.width=.9,r.height="20px",r.color="#364249",r.background="#CCCCCC",r.borderColor="black",r.horizontalAlignment=u.HORIZONTAL_ALIGNMENT_LEFT,r.left="4px",r.paddingBottom="4px",r.onValueChangedObservable.add(function(a){r.parent.children[0].text=r.parent.children[0].name+": "+d(a)+" "+r.name,e(a)});const h=u.AddHeader(r,t+": "+d(c)+" "+o,"30px",{isHorizontal:!1,controlFirst:!1});h.height="60px",h.horizontalAlignment=u.HORIZONTAL_ALIGNMENT_LEFT,h.left="4px",h.children[0].name=t,this.groupPanel.addControl(h),this.selectors.push(h),this.groupPanel.parent&&this.groupPanel.parent.parent&&(r.color=this.groupPanel.parent.parent.buttonColor,r.background=this.groupPanel.parent.parent.buttonBackground)}_setSelectorLabel(t,e){this.selectors[t].children[0].name=e,this.selectors[t].children[0].text=e+": "+this.selectors[t].children[1].value+" "+this.selectors[t].children[1].name}_setSelectorLabelColor(t,e){this.selectors[t].children[0].color=e}_setSelectorButtonColor(t,e){this.selectors[t].children[1].color=e}_setSelectorButtonBackground(t,e){this.selectors[t].children[1].background=e}}class lt extends y{constructor(t,e=[]){if(super(t),this.name=t,this.groups=e,this._buttonColor="#364249",this._buttonBackground="#CCCCCC",this._headerColor="black",this._barColor="white",this._barHeight="2px",this._spacerHeight="20px",this._bars=new Array,this._groups=e,this.thickness=2,this._panel=new Y,this._panel.verticalAlignment=u.VERTICAL_ALIGNMENT_TOP,this._panel.horizontalAlignment=u.HORIZONTAL_ALIGNMENT_LEFT,this._panel.top=5,this._panel.left=5,this._panel.width=.95,e.length>0){for(let o=0;o<e.length-1;o++)this._panel.addControl(e[o].groupPanel),this._addSpacer();this._panel.addControl(e[e.length-1].groupPanel)}this.addControl(this._panel)}_getTypeName(){return"SelectionPanel"}get panel(){return this._panel}get headerColor(){return this._headerColor}set headerColor(t){this._headerColor!==t&&(this._headerColor=t,this._setHeaderColor())}_setHeaderColor(){for(let t=0;t<this._groups.length;t++)this._groups[t].groupPanel.children[0].color=this._headerColor}get buttonColor(){return this._buttonColor}set buttonColor(t){this._buttonColor!==t&&(this._buttonColor=t,this._setbuttonColor())}_setbuttonColor(){for(let t=0;t<this._groups.length;t++)for(let e=0;e<this._groups[t].selectors.length;e++)this._groups[t]._setSelectorButtonColor(e,this._buttonColor)}get labelColor(){return this._labelColor}set labelColor(t){this._labelColor!==t&&(this._labelColor=t,this._setLabelColor())}_setLabelColor(){for(let t=0;t<this._groups.length;t++)for(let e=0;e<this._groups[t].selectors.length;e++)this._groups[t]._setSelectorLabelColor(e,this._labelColor)}get buttonBackground(){return this._buttonBackground}set buttonBackground(t){this._buttonBackground!==t&&(this._buttonBackground=t,this._setButtonBackground())}_setButtonBackground(){for(let t=0;t<this._groups.length;t++)for(let e=0;e<this._groups[t].selectors.length;e++)this._groups[t]._setSelectorButtonBackground(e,this._buttonBackground)}get barColor(){return this._barColor}set barColor(t){this._barColor!==t&&(this._barColor=t,this._setBarColor())}_setBarColor(){for(let t=0;t<this._bars.length;t++)this._bars[t].children[0].background=this._barColor}get barHeight(){return this._barHeight}set barHeight(t){this._barHeight!==t&&(this._barHeight=t,this._setBarHeight())}_setBarHeight(){for(let t=0;t<this._bars.length;t++)this._bars[t].children[0].height=this._barHeight}get spacerHeight(){return this._spacerHeight}set spacerHeight(t){this._spacerHeight!==t&&(this._spacerHeight=t,this._setSpacerHeight())}_setSpacerHeight(){for(let t=0;t<this._bars.length;t++)this._bars[t].height=this._spacerHeight}_addSpacer(){const t=new ot;t.width=1,t.height=this._spacerHeight,t.horizontalAlignment=u.HORIZONTAL_ALIGNMENT_LEFT;const e=new y;e.width=1,e.height=this._barHeight,e.horizontalAlignment=u.HORIZONTAL_ALIGNMENT_LEFT,e.verticalAlignment=u.VERTICAL_ALIGNMENT_CENTER,e.background=this._barColor,e.color="transparent",t.addControl(e),this._panel.addControl(t),this._bars.push(t)}addGroup(t){this._groups.length>0&&this._addSpacer(),this._panel.addControl(t.groupPanel),this._groups.push(t),t.groupPanel.children[0].color=this._headerColor;for(let e=0;e<t.selectors.length;e++)t._setSelectorButtonColor(e,this._buttonColor),t._setSelectorButtonBackground(e,this._buttonBackground)}removeGroup(t){if(t<0||t>=this._groups.length)return;const e=this._groups[t];this._panel.removeControl(e.groupPanel),this._groups.splice(t,1),t<this._bars.length&&(this._panel.removeControl(this._bars[t]),this._bars.splice(t,1))}setHeaderName(t,e){if(e<0||e>=this._groups.length)return;const o=this._groups[e];o.groupPanel.children[0].text=t}relabel(t,e,o){if(e<0||e>=this._groups.length)return;const n=this._groups[e];o<0||o>=n.selectors.length||n._setSelectorLabel(o,t)}removeFromGroupSelector(t,e){if(t<0||t>=this._groups.length)return;const o=this._groups[t];e<0||e>=o.selectors.length||o.removeSelector(e)}addToGroupCheckbox(t,e,o=()=>{},n=!1){if(t<0||t>=this._groups.length)return;this._groups[t].addCheckbox(e,o,n)}addToGroupRadio(t,e,o=()=>{},n=!1){if(t<0||t>=this._groups.length)return;this._groups[t].addRadio(e,o,n)}addToGroupSlider(t,e,o=()=>{},n="Units",s=0,c=0,d=0,r=h=>h|0){if(t<0||t>=this._groups.length)return;this._groups[t].addSlider(e,o,n,s,c,d,r)}}function St(g){const t=new q(g);new W("light1",new B(0,1,0),t);const e=new J("Camera",-(Math.PI/4)*3,Math.PI/4,10,new B(0,0,0),t);e.attachControl(!0),e.position=new B(10.5,7,-10.5);let o=[];for(let l=0;l<15;l++)if(Math.random()>.5){let v=ht(t,Math.random()*100);o.push(v)}else{let v=z(t,Math.random()*100);o.push(v)}let n=w("cot",t);console.log(n),n.scalingX(l=>Math.max(Math.random(),.5)*2),n.scalingY(l=>Math.max(Math.random(),.5)*2),n.scalingZ(l=>Math.max(Math.random(),.4)*2);var s=3,c=20,d=new E(20,5);let r=new $("Layout",{selection:n,rows:s,margin:new E(20,5),radius:20},t).attr("row",2);r.root.normalizeToUnitCube(),e.setTarget(r.root);var h=function(l){s=l,r.attr("row",s)},a=function(l){c=l,r.attr("radius",c)},p=function(l){d.x=l,r.attr("margin",d)},i=function(l){d.y=l,r.attr("margin",d)},_=function(l){return Math.floor(l)},T=function(){let l=z(t,0);l.scalingX(k=>Math.max(Math.random(),.5)*2),l.scalingY(k=>Math.max(Math.random(),.5)*2),l.scalingZ(k=>Math.max(Math.random(),.4)*2),o.push(l),n=w("cot",t),r.options.selection=n,r.update()},D=function(){o.length!=0&&(o[o.length-1].dispose(),o.pop(),n=w("cot",t),r.options.selection=n,r.update())},x=function(l){switch(l){case 0:r.planeLayout();break;case 1:r.cylinderLayout();break;case 2:r.sphereLayout();break}},H=new st("Layout");H.addRadio("Plane",x),H.addRadio("Cylinder",x,!0),H.addRadio("Sphere",x);var O=new M("Config","S");O.addSlider("row",h,"rows",1,6,3,_);var P=new M("Curvature","S");P.addSlider("curvature",a,"units",0,80,20,_);var I=new M("MarginX","S");I.addSlider("marginx",p,"unit",0,60,20,_);var R=new M("MarginY","S");R.addSlider("marginy",i,"unit",0,20,5,_);var A=at.CreateFullscreenUI("UI"),f=new lt("sp",[O,P,I,R,H]);f.width=.2,f.height=.9,f.background="#FFFFFF",f.horizontalAlignment=u.HORIZONTAL_ALIGNMENT_LEFT,f.verticalAlignment=u.VERTICAL_ALIGNMENT_BOTTOM,f.fontFamily="times new roman",f.fontSize="20pt";var m=F.CreateSimpleButton("button1","add chart");m.width=.2,m.height="40px",m.cornerRadius=20,m.color="white",m.thickness=4,m.background="blue",m.top=200,m.left="10%",m.onPointerClickObservable.add(()=>{T()});var C=F.CreateSimpleButton("button2","remove chart");return C.width=.2,C.height="40px",C.cornerRadius=20,C.color="white",C.thickness=4,C.background="blue",C.top=250,C.left="10%",C.onPointerClickObservable.add(()=>{D()}),A.addControl(C),A.addControl(m),A.addControl(f),t}function ht(g,t){[...new Set(b.map(a=>a.Origin))];const e=[...new Set(b.map(a=>a.Cylinders))].sort();let o=U(b,a=>({Horsepower:S(a,p=>p.Horsepower),Miles_per_Gallon:S(a,p=>p.Miles_per_Gallon)}),a=>a.Cylinders);o=o.map(([a,p])=>({Cylinders:a,...p}));const n=L([...new Set(o.map(a=>a.Horsepower))]),s=L([...new Set(o.map(a=>a.Miles_per_Gallon))]);let c=G().domain(e).range([-2.5,2.5]).paddingInner(1).paddingOuter(.5),d=V().domain(n).range([0,5]).nice(),r=X(it).domain(s);N("cot","cot"+t);let h=w("cot"+t,g);return h.bind("plane",{height:1,width:.8,sideOrientation:2},o).positionX(a=>c(a.Cylinders)).positionZ(-.01).scalingY(a=>d(a.Horsepower)).positionY(a=>d(a.Horsepower)/2).material((a,p)=>new K("myMaterial",g)).diffuseColor(a=>{let p=r(a.Miles_per_Gallon).replace(/[^\d,]/g,"").split(",").map(i=>i/255);return new Q(...p)}),Z("test",g,{parent:h,scale:{x:c,y:d}}),h.name("cot"),h}function z(g,t){const e=[...new Set(b.map(i=>i.Origin))],o=[...new Set(b.map(i=>i.Cylinders))].sort().reverse();let n=U(b,i=>({Horsepower:S(i,_=>_.Horsepower),Miles_per_Gallon:S(i,_=>_.Miles_per_Gallon)}),i=>i.Origin,i=>i.Cylinders);n=n.map(([i,_,T])=>({Origin:i,Cylinders:_,...T}));const s=L([...new Set(n.map(i=>i.Horsepower))]),c=L([...new Set(n.map(i=>i.Miles_per_Gallon))]).reverse();let d=G().domain(o).range([-2.5,2.5]).paddingInner(1).paddingOuter(.5),r=V().domain(s).range([0,5]).nice(),h=G().domain(e).range([-2.5,2.5]).paddingInner(1).paddingOuter(.5),a=X(tt("OrRd").toPBRMaterialRough()).domain(c);N("cot","cot"+t);let p=w("cot"+t,g);return p.bind("box",{height:1,width:.8,depth:.8},n).positionX(i=>d(i.Cylinders)).positionZ(i=>h(i.Origin)).scalingY(i=>r(i.Horsepower)).positionY(i=>r(i.Horsepower)/2).material((i,_)=>a(i.Miles_per_Gallon)),Z("test",g,{parent:p,scale:{x:d,y:r,z:h}}),p.name("cot"),p}export{St as layout};