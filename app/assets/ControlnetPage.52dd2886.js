import{Q as C}from"./QPage.a772fd90.js";import{d as m,a1 as d,a2 as l,a3 as p,a4 as r,ad as s,af as u,f as t,az as $,ae as y,a6 as i,a7 as N,a8 as Q,ac as V,ag as v}from"./index.b511c86e.js";import{Q as n}from"./QImg.e7fc65ae.js";import{u as k}from"./controlnet-store.ca8da487.js";const x=m({name:"ControlNet",setup(){return{store:k()}}}),B={class:"flex q-gutter-md"},h={class:"flex q-gutter-md"};function I(e,o,c,f,_,g){return e.store.input_image?(l(),p(V,{key:0},{default:r(()=>[e.store.input_image?(l(),p(s,{key:0},{default:r(()=>[u("div",B,[t($,{modelValue:e.store.prompt,"onUpdate:modelValue":o[0]||(o[0]=a=>e.store.prompt=a),label:"prompt",style:{flex:"1"}},null,8,["modelValue"]),t(y,{icon:"start",label:"Run",color:"primary",onClick:o[1]||(o[1]=a=>e.store.controlnet_run())})])]),_:1})):i("",!0),t(s,null,{default:r(()=>[N(Q(decodeURIComponent(e.store.input_image))+" ",1),u("div",h,[t(n,{style:{flex:"1"},src:e.store.input_image},null,8,["src"]),t(n,{style:{flex:"1"},src:e.store.input_image},null,8,["src"])])]),_:1}),t(s,null,{default:r(()=>[t(n,{style:{flex:"1"},src:e.store.input_image},null,8,["src"])]),_:1})]),_:1})):i("",!0)}var P=d(x,[["render",I]]);const S=m({name:"ControlnetPage",components:{ControlNet:P}});function b(e,o,c,f,_,g){const a=v("ControlNet");return l(),p(C,{style:{height:"300px"}},{default:r(()=>[t(a)]),_:1})}var z=d(S,[["render",b]]);export{z as default};