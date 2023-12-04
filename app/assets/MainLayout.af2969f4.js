import{k as P,c as f,h as S,l as J,r as $,m as Ie,o as j,n as K,p as $e,q as ie,g as A,s as qe,i as Le,t as D,u as ue,w as C,v as vt,x as Ne,y as Ue,P as mt,z as ht,A as Y,B as gt,C as te,D as ge,E as Pe,G as pe,H as Se,I as ye,J as pt,K as yt,L as bt,M as wt,N as Ct,O as kt,Q as qt,R as Qe,S as St,U as Xe,V as _t,W as $t,X as Lt,Y as zt,Z as be,_ as ae,a as Tt,$ as Bt,d as ze,a0 as Te,a1 as R,a2 as N,a3 as _,f as k,a4 as xt,a5 as Ot,a6 as G,a7 as I,a8 as Ye,a9 as je,F as Ke,aa as Et,ab as Dt,ac as re,ad as ne,ae as we,af as Pt}from"./index.58cc1721.js";import{b as oe,Q as Me,a as le,c as Qt,u as Mt,d as Rt,e as Vt,f as Ht}from"./use-quasar.41ad65e0.js";import"./axios.6e1fcf85.js";var At=P({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:n}){const i=f(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>S("div",{class:i.value},J(n.default))}}),Ft=P({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:n}){const i=f(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>S("div",{class:i.value,role:"toolbar"},J(n.default))}});function Wt(){const e=$(!Ie.value);return e.value===!1&&j(()=>{e.value=!0}),e}const Ge=typeof ResizeObserver!="undefined",Re=Ge===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var _e=P({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:n}){let i=null,u,t={width:-1,height:-1};function a(d){d===!0||e.debounce===0||e.debounce==="0"?s():i===null&&(i=setTimeout(s,e.debounce))}function s(){if(i!==null&&(clearTimeout(i),i=null),u){const{offsetWidth:d,offsetHeight:r}=u;(d!==t.width||r!==t.height)&&(t={width:d,height:r},n("resize",t))}}const{proxy:v}=A();if(Ge===!0){let d;const r=l=>{u=v.$el.parentNode,u?(d=new ResizeObserver(a),d.observe(u),s()):l!==!0&&ie(()=>{r(!0)})};return j(()=>{r()}),K(()=>{i!==null&&clearTimeout(i),d!==void 0&&(d.disconnect!==void 0?d.disconnect():u&&d.unobserve(u))}),$e}else{let l=function(){i!==null&&(clearTimeout(i),i=null),r!==void 0&&(r.removeEventListener!==void 0&&r.removeEventListener("resize",a,qe.passive),r=void 0)},w=function(){l(),u&&u.contentDocument&&(r=u.contentDocument.defaultView,r.addEventListener("resize",a,qe.passive),s())};const d=Wt();let r;return j(()=>{ie(()=>{u=v.$el,u&&w()})}),K(l),v.trigger=a,()=>{if(d.value===!0)return S("object",{style:Re.style,tabindex:-1,type:"text/html",data:Re.url,"aria-hidden":"true",onLoad:w})}}}}),It=P({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:n,emit:i}){const{proxy:{$q:u}}=A(),t=Le(ue,D);if(t===D)return console.error("QHeader needs to be child of QLayout"),D;const a=$(parseInt(e.heightHint,10)),s=$(!0),v=f(()=>e.reveal===!0||t.view.value.indexOf("H")>-1||u.platform.is.ios&&t.isContainer.value===!0),d=f(()=>{if(e.modelValue!==!0)return 0;if(v.value===!0)return s.value===!0?a.value:0;const c=a.value-t.scroll.value.position;return c>0?c:0}),r=f(()=>e.modelValue!==!0||v.value===!0&&s.value!==!0),l=f(()=>e.modelValue===!0&&r.value===!0&&e.reveal===!0),w=f(()=>"q-header q-layout__section--marginal "+(v.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(r.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),b=f(()=>{const c=t.rows.value.top,z={};return c[0]==="l"&&t.left.space===!0&&(z[u.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),c[2]==="r"&&t.right.space===!0&&(z[u.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),z});function m(c,z){t.update("header",c,z)}function h(c,z){c.value!==z&&(c.value=z)}function x({height:c}){h(a,c),m("size",c)}function L(c){l.value===!0&&h(s,!0),i("focusin",c)}C(()=>e.modelValue,c=>{m("space",c),h(s,!0),t.animate()}),C(d,c=>{m("offset",c)}),C(()=>e.reveal,c=>{c===!1&&h(s,e.modelValue)}),C(s,c=>{t.animate(),i("reveal",c)}),C(t.scroll,c=>{e.reveal===!0&&h(s,c.direction==="up"||c.position<=e.revealOffset||c.position-c.inflectionPoint<100)});const y={};return t.instances.header=y,e.modelValue===!0&&m("size",a.value),m("space",e.modelValue),m("offset",d.value),K(()=>{t.instances.header===y&&(t.instances.header=void 0,m("size",0),m("offset",0),m("space",!1))}),()=>{const c=vt(n.default,[]);return e.elevated===!0&&c.push(S("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),c.push(S(_e,{debounce:0,onResize:x})),S("header",{class:w.value,style:b.value,onFocusin:L},c)}}}),Je=P({name:"QList",props:{...Ne,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:n}){const i=A(),u=Ue(e,i.proxy.$q),t=f(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(u.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>S(e.tag,{class:t.value},J(n.default))}});const Be={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},Nt=Object.keys(Be);Be.all=!0;function Ve(e){const n={};for(const i of Nt)e[i]===!0&&(n[i]=!0);return Object.keys(n).length===0?Be:(n.horizontal===!0?n.left=n.right=!0:n.left===!0&&n.right===!0&&(n.horizontal=!0),n.vertical===!0?n.up=n.down=!0:n.up===!0&&n.down===!0&&(n.vertical=!0),n.horizontal===!0&&n.vertical===!0&&(n.all=!0),n)}const Ut=["INPUT","TEXTAREA"];function He(e,n){return n.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof n.handler=="function"&&Ut.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(n.uid)===-1)}function Xt(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),mt.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}function Ce(e,n,i){const u=Se(e);let t,a=u.left-n.event.x,s=u.top-n.event.y,v=Math.abs(a),d=Math.abs(s);const r=n.direction;r.horizontal===!0&&r.vertical!==!0?t=a<0?"left":"right":r.horizontal!==!0&&r.vertical===!0?t=s<0?"up":"down":r.up===!0&&s<0?(t="up",v>d&&(r.left===!0&&a<0?t="left":r.right===!0&&a>0&&(t="right"))):r.down===!0&&s>0?(t="down",v>d&&(r.left===!0&&a<0?t="left":r.right===!0&&a>0&&(t="right"))):r.left===!0&&a<0?(t="left",v<d&&(r.up===!0&&s<0?t="up":r.down===!0&&s>0&&(t="down"))):r.right===!0&&a>0&&(t="right",v<d&&(r.up===!0&&s<0?t="up":r.down===!0&&s>0&&(t="down")));let l=!1;if(t===void 0&&i===!1){if(n.event.isFirst===!0||n.event.lastDir===void 0)return{};t=n.event.lastDir,l=!0,t==="left"||t==="right"?(u.left-=a,v=0,a=0):(u.top-=s,d=0,s=0)}return{synthetic:l,payload:{evt:e,touch:n.event.mouse!==!0,mouse:n.event.mouse===!0,position:u,direction:t,isFirst:n.event.isFirst,isFinal:i===!0,duration:Date.now()-n.event.time,distance:{x:v,y:d},offset:{x:a,y:s},delta:{x:u.left-n.event.lastX,y:u.top-n.event.lastY}}}}let Yt=0;var ke=ht({name:"touch-pan",beforeMount(e,{value:n,modifiers:i}){if(i.mouse!==!0&&Y.has.touch!==!0)return;function u(a,s){i.mouse===!0&&s===!0?pt(a):(i.stop===!0&&pe(a),i.prevent===!0&&Pe(a))}const t={uid:"qvtp_"+Yt++,handler:n,modifiers:i,direction:Ve(i),noop:$e,mouseStart(a){He(a,t)&&gt(a)&&(te(t,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),t.start(a,!0))},touchStart(a){if(He(a,t)){const s=a.target;te(t,"temp",[[s,"touchmove","move","notPassiveCapture"],[s,"touchcancel","end","passiveCapture"],[s,"touchend","end","passiveCapture"]]),t.start(a)}},start(a,s){if(Y.is.firefox===!0&&ge(e,!0),t.lastEvt=a,s===!0||i.stop===!0){if(t.direction.all!==!0&&(s!==!0||t.modifiers.mouseAllDir!==!0&&t.modifiers.mousealldir!==!0)){const r=a.type.indexOf("mouse")>-1?new MouseEvent(a.type,a):new TouchEvent(a.type,a);a.defaultPrevented===!0&&Pe(r),a.cancelBubble===!0&&pe(r),Object.assign(r,{qKeyEvent:a.qKeyEvent,qClickOutside:a.qClickOutside,qAnchorHandled:a.qAnchorHandled,qClonedBy:a.qClonedBy===void 0?[t.uid]:a.qClonedBy.concat(t.uid)}),t.initialEvent={target:a.target,event:r}}pe(a)}const{left:v,top:d}=Se(a);t.event={x:v,y:d,time:Date.now(),mouse:s===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:v,lastY:d}},move(a){if(t.event===void 0)return;const s=Se(a),v=s.left-t.event.x,d=s.top-t.event.y;if(v===0&&d===0)return;t.lastEvt=a;const r=t.event.mouse===!0,l=()=>{u(a,r);let m;i.preserveCursor!==!0&&i.preservecursor!==!0&&(m=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),r===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Xt(),t.styleCleanup=h=>{if(t.styleCleanup=void 0,m!==void 0&&(document.documentElement.style.cursor=m),document.body.classList.remove("non-selectable"),r===!0){const x=()=>{document.body.classList.remove("no-pointer-events--children")};h!==void 0?setTimeout(()=>{x(),h()},50):x()}else h!==void 0&&h()}};if(t.event.detected===!0){t.event.isFirst!==!0&&u(a,t.event.mouse);const{payload:m,synthetic:h}=Ce(a,t,!1);m!==void 0&&(t.handler(m)===!1?t.end(a):(t.styleCleanup===void 0&&t.event.isFirst===!0&&l(),t.event.lastX=m.position.left,t.event.lastY=m.position.top,t.event.lastDir=h===!0?void 0:m.direction,t.event.isFirst=!1));return}if(t.direction.all===!0||r===!0&&(t.modifiers.mouseAllDir===!0||t.modifiers.mousealldir===!0)){l(),t.event.detected=!0,t.move(a);return}const w=Math.abs(v),b=Math.abs(d);w!==b&&(t.direction.horizontal===!0&&w>b||t.direction.vertical===!0&&w<b||t.direction.up===!0&&w<b&&d<0||t.direction.down===!0&&w<b&&d>0||t.direction.left===!0&&w>b&&v<0||t.direction.right===!0&&w>b&&v>0?(t.event.detected=!0,t.move(a)):t.end(a,!0))},end(a,s){if(t.event!==void 0){if(ye(t,"temp"),Y.is.firefox===!0&&ge(e,!1),s===!0)t.styleCleanup!==void 0&&t.styleCleanup(),t.event.detected!==!0&&t.initialEvent!==void 0&&t.initialEvent.target.dispatchEvent(t.initialEvent.event);else if(t.event.detected===!0){t.event.isFirst===!0&&t.handler(Ce(a===void 0?t.lastEvt:a,t).payload);const{payload:v}=Ce(a===void 0?t.lastEvt:a,t,!0),d=()=>{t.handler(v)};t.styleCleanup!==void 0?t.styleCleanup(d):d()}t.event=void 0,t.initialEvent=void 0,t.lastEvt=void 0}}};if(e.__qtouchpan=t,i.mouse===!0){const a=i.mouseCapture===!0||i.mousecapture===!0?"Capture":"";te(t,"main",[[e,"mousedown","mouseStart",`passive${a}`]])}Y.has.touch===!0&&te(t,"main",[[e,"touchstart","touchStart",`passive${i.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,n){const i=e.__qtouchpan;i!==void 0&&(n.oldValue!==n.value&&(typeof value!="function"&&i.end(),i.handler=n.value),i.direction=Ve(n.modifiers))},beforeUnmount(e){const n=e.__qtouchpan;n!==void 0&&(n.event!==void 0&&n.end(),ye(n,"main"),ye(n,"temp"),Y.is.firefox===!0&&ge(e,!1),n.styleCleanup!==void 0&&n.styleCleanup(),delete e.__qtouchpan)}});const Ae=150;var Fe=P({name:"QDrawer",inheritAttrs:!1,props:{...yt,...Ne,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...bt,"onLayout","miniState"],setup(e,{slots:n,emit:i,attrs:u}){const t=A(),{proxy:{$q:a}}=t,s=Ue(e,a),{preventBodyScroll:v}=St(),{registerTimeout:d,removeTimeout:r}=wt(),l=Le(ue,D);if(l===D)return console.error("QDrawer needs to be child of QLayout"),D;let w,b=null,m;const h=$(e.behavior==="mobile"||e.behavior!=="desktop"&&l.totalWidth.value<=e.breakpoint),x=f(()=>e.mini===!0&&h.value!==!0),L=f(()=>x.value===!0?e.miniWidth:e.width),y=$(e.showIfAbove===!0&&h.value===!1?!0:e.modelValue===!0),c=f(()=>e.persistent!==!0&&(h.value===!0||Ze.value===!0));function z(o,g){if(V(),o!==!1&&l.animate(),O(0),h.value===!0){const T=l.instances[Z.value];T!==void 0&&T.belowBreakpoint===!0&&T.hide(!1),Q(1),l.isContainer.value!==!0&&v(!0)}else Q(0),o!==!1&&ve(!1);d(()=>{o!==!1&&ve(!0),g!==!0&&i("show",o)},Ae)}function p(o,g){U(),o!==!1&&l.animate(),Q(0),O(F.value*L.value),me(),g!==!0?d(()=>{i("hide",o)},Ae):r()}const{show:q,hide:B}=Ct({showing:y,hideOnRouteChange:c,handleShow:z,handleHide:p}),{addToHistory:V,removeFromHistory:U}=kt(y,B,c),H={belowBreakpoint:h,hide:B},E=f(()=>e.side==="right"),F=f(()=>(a.lang.rtl===!0?-1:1)*(E.value===!0?1:-1)),xe=$(0),W=$(!1),se=$(!1),Oe=$(L.value*F.value),Z=f(()=>E.value===!0?"left":"right"),de=f(()=>y.value===!0&&h.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:L.value:0),ce=f(()=>e.overlay===!0||e.miniToOverlay===!0||l.view.value.indexOf(E.value?"R":"L")>-1||a.platform.is.ios===!0&&l.isContainer.value===!0),X=f(()=>e.overlay===!1&&y.value===!0&&h.value===!1),Ze=f(()=>e.overlay===!0&&y.value===!0&&h.value===!1),et=f(()=>"fullscreen q-drawer__backdrop"+(y.value===!1&&W.value===!1?" hidden":"")),tt=f(()=>({backgroundColor:`rgba(0,0,0,${xe.value*.4})`})),Ee=f(()=>E.value===!0?l.rows.value.top[2]==="r":l.rows.value.top[0]==="l"),at=f(()=>E.value===!0?l.rows.value.bottom[2]==="r":l.rows.value.bottom[0]==="l"),nt=f(()=>{const o={};return l.header.space===!0&&Ee.value===!1&&(ce.value===!0?o.top=`${l.header.offset}px`:l.header.space===!0&&(o.top=`${l.header.size}px`)),l.footer.space===!0&&at.value===!1&&(ce.value===!0?o.bottom=`${l.footer.offset}px`:l.footer.space===!0&&(o.bottom=`${l.footer.size}px`)),o}),ot=f(()=>{const o={width:`${L.value}px`,transform:`translateX(${Oe.value}px)`};return h.value===!0?o:Object.assign(o,nt.value)}),it=f(()=>"q-drawer__content fit "+(l.isContainer.value!==!0?"scroll":"overflow-auto")),rt=f(()=>`q-drawer q-drawer--${e.side}`+(se.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(s.value===!0?" q-drawer--dark q-dark":"")+(W.value===!0?" no-transition":y.value===!0?"":" q-layout--prevent-focus")+(h.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${x.value===!0?"mini":"standard"}`+(ce.value===!0||X.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+(Ee.value===!0?" q-drawer--top-padding":""))),lt=f(()=>{const o=a.lang.rtl===!0?e.side:Z.value;return[[ke,ct,void 0,{[o]:!0,mouse:!0}]]}),ut=f(()=>{const o=a.lang.rtl===!0?Z.value:e.side;return[[ke,De,void 0,{[o]:!0,mouse:!0}]]}),st=f(()=>{const o=a.lang.rtl===!0?Z.value:e.side;return[[ke,De,void 0,{[o]:!0,mouse:!0,mouseAllDir:!0}]]});function fe(){ft(h,e.behavior==="mobile"||e.behavior!=="desktop"&&l.totalWidth.value<=e.breakpoint)}C(h,o=>{o===!0?(w=y.value,y.value===!0&&B(!1)):e.overlay===!1&&e.behavior!=="mobile"&&w!==!1&&(y.value===!0?(O(0),Q(0),me()):q(!1))}),C(()=>e.side,(o,g)=>{l.instances[g]===H&&(l.instances[g]=void 0,l[g].space=!1,l[g].offset=0),l.instances[o]=H,l[o].size=L.value,l[o].space=X.value,l[o].offset=de.value}),C(l.totalWidth,()=>{(l.isContainer.value===!0||document.qScrollPrevented!==!0)&&fe()}),C(()=>e.behavior+e.breakpoint,fe),C(l.isContainer,o=>{y.value===!0&&v(o!==!0),o===!0&&fe()}),C(l.scrollbarWidth,()=>{O(y.value===!0?0:void 0)}),C(de,o=>{M("offset",o)}),C(X,o=>{i("onLayout",o),M("space",o)}),C(E,()=>{O()}),C(L,o=>{O(),he(e.miniToOverlay,o)}),C(()=>e.miniToOverlay,o=>{he(o,L.value)}),C(()=>a.lang.rtl,()=>{O()}),C(()=>e.mini,()=>{e.noMiniAnimation||e.modelValue===!0&&(dt(),l.animate())}),C(x,o=>{i("miniState",o)});function O(o){o===void 0?ie(()=>{o=y.value===!0?0:L.value,O(F.value*o)}):(l.isContainer.value===!0&&E.value===!0&&(h.value===!0||Math.abs(o)===L.value)&&(o+=F.value*l.scrollbarWidth.value),Oe.value=o)}function Q(o){xe.value=o}function ve(o){const g=o===!0?"remove":l.isContainer.value!==!0?"add":"";g!==""&&document.body.classList[g]("q-body--drawer-toggle")}function dt(){b!==null&&clearTimeout(b),t.proxy&&t.proxy.$el&&t.proxy.$el.classList.add("q-drawer--mini-animate"),se.value=!0,b=setTimeout(()=>{b=null,se.value=!1,t&&t.proxy&&t.proxy.$el&&t.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function ct(o){if(y.value!==!1)return;const g=L.value,T=oe(o.distance.x,0,g);if(o.isFinal===!0){T>=Math.min(75,g)===!0?q():(l.animate(),Q(0),O(F.value*g)),W.value=!1;return}O((a.lang.rtl===!0?E.value!==!0:E.value)?Math.max(g-T,0):Math.min(0,T-g)),Q(oe(T/g,0,1)),o.isFirst===!0&&(W.value=!0)}function De(o){if(y.value!==!0)return;const g=L.value,T=o.direction===e.side,ee=(a.lang.rtl===!0?T!==!0:T)?oe(o.distance.x,0,g):0;if(o.isFinal===!0){Math.abs(ee)<Math.min(75,g)===!0?(l.animate(),Q(1),O(0)):B(),W.value=!1;return}O(F.value*ee),Q(oe(1-ee/g,0,1)),o.isFirst===!0&&(W.value=!0)}function me(){v(!1),ve(!0)}function M(o,g){l.update(e.side,o,g)}function ft(o,g){o.value!==g&&(o.value=g)}function he(o,g){M("size",o===!0?e.miniWidth:g)}return l.instances[e.side]=H,he(e.miniToOverlay,L.value),M("space",X.value),M("offset",de.value),e.showIfAbove===!0&&e.modelValue!==!0&&y.value===!0&&e["onUpdate:modelValue"]!==void 0&&i("update:modelValue",!0),j(()=>{i("onLayout",X.value),i("miniState",x.value),w=e.showIfAbove===!0;const o=()=>{(y.value===!0?z:p)(!1,!0)};if(l.totalWidth.value!==0){ie(o);return}m=C(l.totalWidth,()=>{m(),m=void 0,y.value===!1&&e.showIfAbove===!0&&h.value===!1?q(!1):o()})}),K(()=>{m!==void 0&&m(),b!==null&&(clearTimeout(b),b=null),y.value===!0&&me(),l.instances[e.side]===H&&(l.instances[e.side]=void 0,M("size",0),M("offset",0),M("space",!1))}),()=>{const o=[];h.value===!0&&(e.noSwipeOpen===!1&&o.push(qt(S("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),lt.value)),o.push(Qe("div",{ref:"backdrop",class:et.value,style:tt.value,"aria-hidden":"true",onClick:B},void 0,"backdrop",e.noSwipeBackdrop!==!0&&y.value===!0,()=>st.value)));const g=x.value===!0&&n.mini!==void 0,T=[S("div",{...u,key:""+g,class:[it.value,u.class]},g===!0?n.mini():J(n.default))];return e.elevated===!0&&y.value===!0&&T.push(S("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),o.push(Qe("aside",{ref:"content",class:rt.value,style:ot.value},T,"contentclose",e.noSwipeClose!==!0&&h.value===!0,()=>ut.value)),S("div",{class:"q-drawer-container"},o)}}}),jt=P({name:"QPageContainer",setup(e,{slots:n}){const{proxy:{$q:i}}=A(),u=Le(ue,D);if(u===D)return console.error("QPageContainer needs to be child of QLayout"),D;Xe(_t,!0);const t=f(()=>{const a={};return u.header.space===!0&&(a.paddingTop=`${u.header.size}px`),u.right.space===!0&&(a[`padding${i.lang.rtl===!0?"Left":"Right"}`]=`${u.right.size}px`),u.footer.space===!0&&(a.paddingBottom=`${u.footer.size}px`),u.left.space===!0&&(a[`padding${i.lang.rtl===!0?"Right":"Left"}`]=`${u.left.size}px`),a});return()=>S("div",{class:"q-page-container",style:t.value},J(n.default))}});const{passive:We}=qe,Kt=["both","horizontal","vertical"];var Gt=P({name:"QScrollObserver",props:{axis:{type:String,validator:e=>Kt.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:n}){const i={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let u=null,t,a;C(()=>e.scrollTarget,()=>{d(),v()});function s(){u!==null&&u();const w=Math.max(0,Lt(t)),b=zt(t),m={top:w-i.position.top,left:b-i.position.left};if(e.axis==="vertical"&&m.top===0||e.axis==="horizontal"&&m.left===0)return;const h=Math.abs(m.top)>=Math.abs(m.left)?m.top<0?"up":"down":m.left<0?"left":"right";i.position={top:w,left:b},i.directionChanged=i.direction!==h,i.delta=m,i.directionChanged===!0&&(i.direction=h,i.inflectionPoint=i.position),n("scroll",{...i})}function v(){t=$t(a,e.scrollTarget),t.addEventListener("scroll",r,We),r(!0)}function d(){t!==void 0&&(t.removeEventListener("scroll",r,We),t=void 0)}function r(w){if(w===!0||e.debounce===0||e.debounce==="0")s();else if(u===null){const[b,m]=e.debounce?[setTimeout(s,e.debounce),clearTimeout]:[requestAnimationFrame(s),cancelAnimationFrame];u=()=>{m(b),u=null}}}const{proxy:l}=A();return C(()=>l.$q.lang.rtl,s),j(()=>{a=l.$el.parentNode,v()}),K(()=>{u!==null&&u(),d()}),Object.assign(l,{trigger:r,getPosition:()=>i}),$e}}),Jt=P({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:n,emit:i}){const{proxy:{$q:u}}=A(),t=$(null),a=$(u.screen.height),s=$(e.container===!0?0:u.screen.width),v=$({position:0,direction:"down",inflectionPoint:0}),d=$(0),r=$(Ie.value===!0?0:be()),l=f(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),w=f(()=>e.container===!1?{minHeight:u.screen.height+"px"}:null),b=f(()=>r.value!==0?{[u.lang.rtl===!0?"left":"right"]:`${r.value}px`}:null),m=f(()=>r.value!==0?{[u.lang.rtl===!0?"right":"left"]:0,[u.lang.rtl===!0?"left":"right"]:`-${r.value}px`,width:`calc(100% + ${r.value}px)`}:null);function h(p){if(e.container===!0||document.qScrollPrevented!==!0){const q={position:p.position.top,direction:p.direction,directionChanged:p.directionChanged,inflectionPoint:p.inflectionPoint.top,delta:p.delta.top};v.value=q,e.onScroll!==void 0&&i("scroll",q)}}function x(p){const{height:q,width:B}=p;let V=!1;a.value!==q&&(V=!0,a.value=q,e.onScrollHeight!==void 0&&i("scrollHeight",q),y()),s.value!==B&&(V=!0,s.value=B),V===!0&&e.onResize!==void 0&&i("resize",p)}function L({height:p}){d.value!==p&&(d.value=p,y())}function y(){if(e.container===!0){const p=a.value>d.value?be():0;r.value!==p&&(r.value=p)}}let c=null;const z={instances:{},view:f(()=>e.view),isContainer:f(()=>e.container),rootRef:t,height:a,containerHeight:d,scrollbarWidth:r,totalWidth:f(()=>s.value+r.value),rows:f(()=>{const p=e.view.toLowerCase().split(" ");return{top:p[0].split(""),middle:p[1].split(""),bottom:p[2].split("")}}),header:ae({size:0,offset:0,space:!1}),right:ae({size:300,offset:0,space:!1}),footer:ae({size:0,offset:0,space:!1}),left:ae({size:300,offset:0,space:!1}),scroll:v,animate(){c!==null?clearTimeout(c):document.body.classList.add("q-body--layout-animate"),c=setTimeout(()=>{c=null,document.body.classList.remove("q-body--layout-animate")},155)},update(p,q,B){z[p][q]=B}};if(Xe(ue,z),be()>0){let B=function(){p=null,q.classList.remove("hide-scrollbar")},V=function(){if(p===null){if(q.scrollHeight>u.screen.height)return;q.classList.add("hide-scrollbar")}else clearTimeout(p);p=setTimeout(B,300)},U=function(H){p!==null&&H==="remove"&&(clearTimeout(p),B()),window[`${H}EventListener`]("resize",V)},p=null;const q=document.body;C(()=>e.container!==!0?"add":"remove",U),e.container!==!0&&U("add"),Tt(()=>{U("remove")})}return()=>{const p=Bt(n.default,[S(Gt,{onScroll:h}),S(_e,{onResize:x})]),q=S("div",{class:l.value,style:w.value,ref:e.container===!0?void 0:t,tabindex:-1},p);return e.container===!0?S("div",{class:"q-layout-container overflow-hidden",ref:t},[S(_e,{onResize:L}),S("div",{class:"absolute-full",style:b.value},[S("div",{class:"scroll",style:m.value},[q])])]):q}}});const Zt=ze({name:"EssentialLink",props:{title:{type:String,required:!0},caption:{type:String,default:""},link:{type:String,default:"#"},icon:{type:String,default:""}}});function ea(e,n,i,u,t,a){return R(),N(Qt,{clickable:"",tag:"a",target:"_blank",to:e.link},{default:_(()=>[e.icon?(R(),N(Me,{key:0,avatar:""},{default:_(()=>[k(xt,{name:e.icon},null,8,["name"])]),_:1})):Ot("",!0),k(Me,null,{default:_(()=>[k(le,null,{default:_(()=>[G(I(e.title),1)]),_:1}),k(le,{caption:""},{default:_(()=>[G(I(e.caption),1)]),_:1})]),_:1})]),_:1},8,["to"])}var ta=Te(Zt,[["render",ea]]);const aa=ze({name:"HistoryList",setup(){const e=Mt(),n=Rt();return{store:e,del(i){n.dialog({title:"Confirm",message:"Delete item?",cancel:!0,persistent:!0}).onOk(()=>{e.del_history(i)})}}}}),na={class:"text-h8"},oa={class:"text-weight-bold"},ia={class:"text-weight-bold text-red"},ra={class:"text-caption"};function la(e,n,i,u,t,a){return R(),N(Je,null,{default:_(()=>[k(le,{header:""},{default:_(()=>[G(" History ")]),_:1}),(R(!0),Ye(Ke,null,je(e.store.history,s=>(R(),N(Et,{flat:"",bordered:"",class:"q-ma-sm",key:s.id},{default:_(()=>[k(Ht,{src:`/output/${encodeURIComponent(s.id)}/image.png`},null,8,["src"]),k(Dt,null,{default:_(()=>[k(re,{"fab-mini":"",color:"secondary",icon:"content_copy",class:"absolute",style:{top:"0",right:"46px",transform:"translateY(-60%)"},onClick:v=>e.store.copy_history(s)},null,8,["onClick"]),k(re,{"fab-mini":"",color:"accent",icon:"delete",class:"absolute",onClick:v=>e.del(s),style:{top:"0",right:"0px",transform:"translateY(-60%)"}},null,8,["onClick"]),ne("div",na,I(s.id),1),ne("div",oa,I(s.prompt),1),ne("div",ia,I(s.negative_prompt),1),ne("div",ra,"seed: "+I(s.seed),1)]),_:2},1024)]),_:2},1024))),128)),k(Vt,{showing:e.store.loading_history},null,8,["showing"])]),_:1})}var ua=Te(aa,[["render",la]]);const sa=[{title:"txt2img",caption:"Text to image.",icon:"school",link:"/"},{title:"img2img",caption:"Image to image.",icon:"school",link:"/img2img"},{title:"imgeditor",caption:"Edit images.",icon:"school",link:"/imgeditor"}],da=ze({name:"MainLayout",components:{EssentialLink:ta,HistoryList:ua},setup(){const e=$(!1),n=$(!1);return{essentialLinks:sa,leftDrawerOpen:e,toggleLeftDrawer(){e.value=!e.value},rightDrawerOpen:n,toggleRightDrawer(){n.value=!n.value}}}});function ca(e,n,i,u,t,a){const s=we("EssentialLink"),v=we("HistoryList"),d=we("router-view");return R(),N(Jt,{view:"lHh Lpr fFf"},{default:_(()=>[k(It,{elevated:""},{default:_(()=>[k(Ft,null,{default:_(()=>[k(re,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:e.toggleLeftDrawer},null,8,["onClick"]),k(At,null,{default:_(()=>[G(" AIBro ")]),_:1}),k(re,{dense:"",flat:"",round:"",icon:"menu",onClick:e.toggleRightDrawer},null,8,["onClick"])]),_:1})]),_:1}),k(Fe,{modelValue:e.leftDrawerOpen,"onUpdate:modelValue":n[0]||(n[0]=r=>e.leftDrawerOpen=r),"show-if-above":"",bordered:""},{default:_(()=>[k(Je,null,{default:_(()=>[k(le,{header:""},{default:_(()=>[G(" Menu ")]),_:1}),(R(!0),Ye(Ke,null,je(e.essentialLinks,r=>(R(),N(s,Pt({key:r.title},r),null,16))),128))]),_:1})]),_:1},8,["modelValue"]),k(Fe,{modelValue:e.rightDrawerOpen,"onUpdate:modelValue":n[1]||(n[1]=r=>e.rightDrawerOpen=r),side:"right",overlay:"",bordered:""},{default:_(()=>[k(v)]),_:1},8,["modelValue"]),k(jt,null,{default:_(()=>[k(d)]),_:1})]),_:1})}var ga=Te(da,[["render",ca]]);export{ga as default};