import{Q as g}from"./QPage.84cbbfc8.js";import{d as m,$ as d,a0 as l,a1 as p,a2 as r,aa as s,ac as u,f as t,aD as $,ab as y,a4 as i,a5 as N,a6 as Q,a9 as V,ad as v}from"./index.a11a8867.js";import{Q as n}from"./aibro-store.98c8598c.js";import{u as k}from"./controlnet-store.69525f95.js";import"./axios.6e1fcf85.js";const x=m({name:"ControlNet",setup(){return{store:k()}}}),B={class:"flex q-gutter-md"},b={class:"flex q-gutter-md"};function h(e,o,c,f,_,C){return e.store.input_image?(l(),p(V,{key:0},{default:r(()=>[e.store.input_image?(l(),p(s,{key:0},{default:r(()=>[u("div",B,[t($,{modelValue:e.store.prompt,"onUpdate:modelValue":o[0]||(o[0]=a=>e.store.prompt=a),label:"prompt",style:{flex:"1"}},null,8,["modelValue"]),t(y,{icon:"start",label:"Run",color:"primary",onClick:o[1]||(o[1]=a=>e.store.controlnet_run())})])]),_:1})):i("",!0),t(s,null,{default:r(()=>[N(Q(decodeURIComponent(e.store.input_image))+" ",1),u("div",b,[t(n,{style:{flex:"1"},src:e.store.input_image},null,8,["src"]),t(n,{style:{flex:"1"},src:e.store.input_image},null,8,["src"])])]),_:1}),t(s,null,{default:r(()=>[t(n,{style:{flex:"1"},src:e.store.input_image},null,8,["src"])]),_:1})]),_:1})):i("",!0)}var I=d(x,[["render",h]]);const P=m({name:"ControlnetPage",components:{ControlNet:I}});function S(e,o,c,f,_,C){const a=v("ControlNet");return l(),p(g,{style:{height:"300px"}},{default:r(()=>[t(a)]),_:1})}var T=d(P,[["render",S]]);export{T as default};
