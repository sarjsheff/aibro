import{k as V,c as v,h as _,l as le,r as $,m as Ie,o as j,n as K,p as $e,q as oe,g as N,s as qe,i as Le,t as Q,u as ue,w as C,v as ft,x as vt,y as Y,z as ht,A as ee,B as ge,C as Qe,D as pe,E as Se,G as ye,H as mt,I as gt,J as pt,K as yt,L as bt,M as wt,N as Ct,O as kt,P as qt,Q as Pe,R as St,S as Ne,U as _t,V as $t,W as Lt,X as zt,Y as be,Z as te,a as Tt,_ as xt,d as ze,$ as Te,a0 as D,a1 as A,a2 as S,f as k,a3 as Ot,a4 as Ue,a5 as G,a6 as I,a7 as Xe,a8 as Ye,F as je,a9 as Bt,aa as Et,ab as ie,ac as ae,ad as we,ae as Dt}from"./index.a11a8867.js";import{Q as Me,a as re,b as Qt,u as Pt}from"./use-quasar.2c8f2063.js";import{c as Mt,Q as Ke}from"./selection.2138bf6c.js";import{b as ne,u as Vt,Q as Ht}from"./aibro-store.98c8598c.js";import{Q as Rt}from"./QInnerLoading.772ca639.js";import"./axios.6e1fcf85.js";var At=V({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:n}){const i=v(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>_("div",{class:i.value},le(n.default))}}),Ft=V({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:n}){const i=v(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>_("div",{class:i.value,role:"toolbar"},le(n.default))}});function Wt(){const e=$(!Ie.value);return e.value===!1&&j(()=>{e.value=!0}),e}const Ge=typeof ResizeObserver!="undefined",Ve=Ge===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var _e=V({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:n}){let i=null,s,t={width:-1,height:-1};function a(c){c===!0||e.debounce===0||e.debounce==="0"?u():i===null&&(i=setTimeout(u,e.debounce))}function u(){if(i!==null&&(clearTimeout(i),i=null),s){const{offsetWidth:c,offsetHeight:r}=s;(c!==t.width||r!==t.height)&&(t={width:c,height:r},n("resize",t))}}const{proxy:f}=N();if(Ge===!0){let c;const r=l=>{s=f.$el.parentNode,s?(c=new ResizeObserver(a),c.observe(s),u()):l!==!0&&oe(()=>{r(!0)})};return j(()=>{r()}),K(()=>{i!==null&&clearTimeout(i),c!==void 0&&(c.disconnect!==void 0?c.disconnect():s&&c.unobserve(s))}),$e}else{let l=function(){i!==null&&(clearTimeout(i),i=null),r!==void 0&&(r.removeEventListener!==void 0&&r.removeEventListener("resize",a,qe.passive),r=void 0)},w=function(){l(),s&&s.contentDocument&&(r=s.contentDocument.defaultView,r.addEventListener("resize",a,qe.passive),u())};const c=Wt();let r;return j(()=>{oe(()=>{s=f.$el,s&&w()})}),K(l),f.trigger=a,()=>{if(c.value===!0)return _("object",{style:Ve.style,tabindex:-1,type:"text/html",data:Ve.url,"aria-hidden":"true",onLoad:w})}}}}),It=V({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:n,emit:i}){const{proxy:{$q:s}}=N(),t=Le(ue,Q);if(t===Q)return console.error("QHeader needs to be child of QLayout"),Q;const a=$(parseInt(e.heightHint,10)),u=$(!0),f=v(()=>e.reveal===!0||t.view.value.indexOf("H")>-1||s.platform.is.ios&&t.isContainer.value===!0),c=v(()=>{if(e.modelValue!==!0)return 0;if(f.value===!0)return u.value===!0?a.value:0;const d=a.value-t.scroll.value.position;return d>0?d:0}),r=v(()=>e.modelValue!==!0||f.value===!0&&u.value!==!0),l=v(()=>e.modelValue===!0&&r.value===!0&&e.reveal===!0),w=v(()=>"q-header q-layout__section--marginal "+(f.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(r.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),b=v(()=>{const d=t.rows.value.top,z={};return d[0]==="l"&&t.left.space===!0&&(z[s.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),d[2]==="r"&&t.right.space===!0&&(z[s.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),z});function h(d,z){t.update("header",d,z)}function m(d,z){d.value!==z&&(d.value=z)}function O({height:d}){m(a,d),h("size",d)}function L(d){l.value===!0&&m(u,!0),i("focusin",d)}C(()=>e.modelValue,d=>{h("space",d),m(u,!0),t.animate()}),C(c,d=>{h("offset",d)}),C(()=>e.reveal,d=>{d===!1&&m(u,e.modelValue)}),C(u,d=>{t.animate(),i("reveal",d)}),C(t.scroll,d=>{e.reveal===!0&&m(u,d.direction==="up"||d.position<=e.revealOffset||d.position-d.inflectionPoint<100)});const y={};return t.instances.header=y,e.modelValue===!0&&h("size",a.value),h("space",e.modelValue),h("offset",c.value),K(()=>{t.instances.header===y&&(t.instances.header=void 0,h("size",0),h("offset",0),h("space",!1))}),()=>{const d=ft(n.default,[]);return e.elevated===!0&&d.push(_("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),d.push(_(_e,{debounce:0,onResize:O})),_("header",{class:w.value,style:b.value,onFocusin:L},d)}}});const xe={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},Nt=Object.keys(xe);xe.all=!0;function He(e){const n={};for(const i of Nt)e[i]===!0&&(n[i]=!0);return Object.keys(n).length===0?xe:(n.horizontal===!0?n.left=n.right=!0:n.left===!0&&n.right===!0&&(n.horizontal=!0),n.vertical===!0?n.up=n.down=!0:n.up===!0&&n.down===!0&&(n.vertical=!0),n.horizontal===!0&&n.vertical===!0&&(n.all=!0),n)}const Ut=["INPUT","TEXTAREA"];function Re(e,n){return n.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof n.handler=="function"&&Ut.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(n.uid)===-1)}function Ce(e,n,i){const s=Se(e);let t,a=s.left-n.event.x,u=s.top-n.event.y,f=Math.abs(a),c=Math.abs(u);const r=n.direction;r.horizontal===!0&&r.vertical!==!0?t=a<0?"left":"right":r.horizontal!==!0&&r.vertical===!0?t=u<0?"up":"down":r.up===!0&&u<0?(t="up",f>c&&(r.left===!0&&a<0?t="left":r.right===!0&&a>0&&(t="right"))):r.down===!0&&u>0?(t="down",f>c&&(r.left===!0&&a<0?t="left":r.right===!0&&a>0&&(t="right"))):r.left===!0&&a<0?(t="left",f<c&&(r.up===!0&&u<0?t="up":r.down===!0&&u>0&&(t="down"))):r.right===!0&&a>0&&(t="right",f<c&&(r.up===!0&&u<0?t="up":r.down===!0&&u>0&&(t="down")));let l=!1;if(t===void 0&&i===!1){if(n.event.isFirst===!0||n.event.lastDir===void 0)return{};t=n.event.lastDir,l=!0,t==="left"||t==="right"?(s.left-=a,f=0,a=0):(s.top-=u,c=0,u=0)}return{synthetic:l,payload:{evt:e,touch:n.event.mouse!==!0,mouse:n.event.mouse===!0,position:s,direction:t,isFirst:n.event.isFirst,isFinal:i===!0,duration:Date.now()-n.event.time,distance:{x:f,y:c},offset:{x:a,y:u},delta:{x:s.left-n.event.lastX,y:s.top-n.event.lastY}}}}let Xt=0;var ke=vt({name:"touch-pan",beforeMount(e,{value:n,modifiers:i}){if(i.mouse!==!0&&Y.has.touch!==!0)return;function s(a,u){i.mouse===!0&&u===!0?mt(a):(i.stop===!0&&pe(a),i.prevent===!0&&Qe(a))}const t={uid:"qvtp_"+Xt++,handler:n,modifiers:i,direction:He(i),noop:$e,mouseStart(a){Re(a,t)&&ht(a)&&(ee(t,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),t.start(a,!0))},touchStart(a){if(Re(a,t)){const u=a.target;ee(t,"temp",[[u,"touchmove","move","notPassiveCapture"],[u,"touchcancel","end","passiveCapture"],[u,"touchend","end","passiveCapture"]]),t.start(a)}},start(a,u){if(Y.is.firefox===!0&&ge(e,!0),t.lastEvt=a,u===!0||i.stop===!0){if(t.direction.all!==!0&&(u!==!0||t.modifiers.mouseAllDir!==!0&&t.modifiers.mousealldir!==!0)){const r=a.type.indexOf("mouse")>-1?new MouseEvent(a.type,a):new TouchEvent(a.type,a);a.defaultPrevented===!0&&Qe(r),a.cancelBubble===!0&&pe(r),Object.assign(r,{qKeyEvent:a.qKeyEvent,qClickOutside:a.qClickOutside,qAnchorHandled:a.qAnchorHandled,qClonedBy:a.qClonedBy===void 0?[t.uid]:a.qClonedBy.concat(t.uid)}),t.initialEvent={target:a.target,event:r}}pe(a)}const{left:f,top:c}=Se(a);t.event={x:f,y:c,time:Date.now(),mouse:u===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:f,lastY:c}},move(a){if(t.event===void 0)return;const u=Se(a),f=u.left-t.event.x,c=u.top-t.event.y;if(f===0&&c===0)return;t.lastEvt=a;const r=t.event.mouse===!0,l=()=>{s(a,r);let h;i.preserveCursor!==!0&&i.preservecursor!==!0&&(h=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),r===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Mt(),t.styleCleanup=m=>{if(t.styleCleanup=void 0,h!==void 0&&(document.documentElement.style.cursor=h),document.body.classList.remove("non-selectable"),r===!0){const O=()=>{document.body.classList.remove("no-pointer-events--children")};m!==void 0?setTimeout(()=>{O(),m()},50):O()}else m!==void 0&&m()}};if(t.event.detected===!0){t.event.isFirst!==!0&&s(a,t.event.mouse);const{payload:h,synthetic:m}=Ce(a,t,!1);h!==void 0&&(t.handler(h)===!1?t.end(a):(t.styleCleanup===void 0&&t.event.isFirst===!0&&l(),t.event.lastX=h.position.left,t.event.lastY=h.position.top,t.event.lastDir=m===!0?void 0:h.direction,t.event.isFirst=!1));return}if(t.direction.all===!0||r===!0&&(t.modifiers.mouseAllDir===!0||t.modifiers.mousealldir===!0)){l(),t.event.detected=!0,t.move(a);return}const w=Math.abs(f),b=Math.abs(c);w!==b&&(t.direction.horizontal===!0&&w>b||t.direction.vertical===!0&&w<b||t.direction.up===!0&&w<b&&c<0||t.direction.down===!0&&w<b&&c>0||t.direction.left===!0&&w>b&&f<0||t.direction.right===!0&&w>b&&f>0?(t.event.detected=!0,t.move(a)):t.end(a,!0))},end(a,u){if(t.event!==void 0){if(ye(t,"temp"),Y.is.firefox===!0&&ge(e,!1),u===!0)t.styleCleanup!==void 0&&t.styleCleanup(),t.event.detected!==!0&&t.initialEvent!==void 0&&t.initialEvent.target.dispatchEvent(t.initialEvent.event);else if(t.event.detected===!0){t.event.isFirst===!0&&t.handler(Ce(a===void 0?t.lastEvt:a,t).payload);const{payload:f}=Ce(a===void 0?t.lastEvt:a,t,!0),c=()=>{t.handler(f)};t.styleCleanup!==void 0?t.styleCleanup(c):c()}t.event=void 0,t.initialEvent=void 0,t.lastEvt=void 0}}};if(e.__qtouchpan=t,i.mouse===!0){const a=i.mouseCapture===!0||i.mousecapture===!0?"Capture":"";ee(t,"main",[[e,"mousedown","mouseStart",`passive${a}`]])}Y.has.touch===!0&&ee(t,"main",[[e,"touchstart","touchStart",`passive${i.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,n){const i=e.__qtouchpan;i!==void 0&&(n.oldValue!==n.value&&(typeof value!="function"&&i.end(),i.handler=n.value),i.direction=He(n.modifiers))},beforeUnmount(e){const n=e.__qtouchpan;n!==void 0&&(n.event!==void 0&&n.end(),ye(n,"main"),ye(n,"temp"),Y.is.firefox===!0&&ge(e,!1),n.styleCleanup!==void 0&&n.styleCleanup(),delete e.__qtouchpan)}});const Ae=150;var Fe=V({name:"QDrawer",inheritAttrs:!1,props:{...gt,...pt,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...yt,"onLayout","miniState"],setup(e,{slots:n,emit:i,attrs:s}){const t=N(),{proxy:{$q:a}}=t,u=bt(e,a),{preventBodyScroll:f}=St(),{registerTimeout:c,removeTimeout:r}=wt(),l=Le(ue,Q);if(l===Q)return console.error("QDrawer needs to be child of QLayout"),Q;let w,b=null,h;const m=$(e.behavior==="mobile"||e.behavior!=="desktop"&&l.totalWidth.value<=e.breakpoint),O=v(()=>e.mini===!0&&m.value!==!0),L=v(()=>O.value===!0?e.miniWidth:e.width),y=$(e.showIfAbove===!0&&m.value===!1?!0:e.modelValue===!0),d=v(()=>e.persistent!==!0&&(m.value===!0||Je.value===!0));function z(o,g){if(H(),o!==!1&&l.animate(),B(0),m.value===!0){const T=l.instances[J.value];T!==void 0&&T.belowBreakpoint===!0&&T.hide(!1),P(1),l.isContainer.value!==!0&&f(!0)}else P(0),o!==!1&&ve(!1);c(()=>{o!==!1&&ve(!0),g!==!0&&i("show",o)},Ae)}function p(o,g){U(),o!==!1&&l.animate(),P(0),B(F.value*L.value),he(),g!==!0?c(()=>{i("hide",o)},Ae):r()}const{show:q,hide:x}=Ct({showing:y,hideOnRouteChange:d,handleShow:z,handleHide:p}),{addToHistory:H,removeFromHistory:U}=kt(y,x,d),R={belowBreakpoint:m,hide:x},E=v(()=>e.side==="right"),F=v(()=>(a.lang.rtl===!0?-1:1)*(E.value===!0?1:-1)),Oe=$(0),W=$(!1),se=$(!1),Be=$(L.value*F.value),J=v(()=>E.value===!0?"left":"right"),ce=v(()=>y.value===!0&&m.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:L.value:0),de=v(()=>e.overlay===!0||e.miniToOverlay===!0||l.view.value.indexOf(E.value?"R":"L")>-1||a.platform.is.ios===!0&&l.isContainer.value===!0),X=v(()=>e.overlay===!1&&y.value===!0&&m.value===!1),Je=v(()=>e.overlay===!0&&y.value===!0&&m.value===!1),Ze=v(()=>"fullscreen q-drawer__backdrop"+(y.value===!1&&W.value===!1?" hidden":"")),et=v(()=>({backgroundColor:`rgba(0,0,0,${Oe.value*.4})`})),Ee=v(()=>E.value===!0?l.rows.value.top[2]==="r":l.rows.value.top[0]==="l"),tt=v(()=>E.value===!0?l.rows.value.bottom[2]==="r":l.rows.value.bottom[0]==="l"),at=v(()=>{const o={};return l.header.space===!0&&Ee.value===!1&&(de.value===!0?o.top=`${l.header.offset}px`:l.header.space===!0&&(o.top=`${l.header.size}px`)),l.footer.space===!0&&tt.value===!1&&(de.value===!0?o.bottom=`${l.footer.offset}px`:l.footer.space===!0&&(o.bottom=`${l.footer.size}px`)),o}),nt=v(()=>{const o={width:`${L.value}px`,transform:`translateX(${Be.value}px)`};return m.value===!0?o:Object.assign(o,at.value)}),ot=v(()=>"q-drawer__content fit "+(l.isContainer.value!==!0?"scroll":"overflow-auto")),it=v(()=>`q-drawer q-drawer--${e.side}`+(se.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(u.value===!0?" q-drawer--dark q-dark":"")+(W.value===!0?" no-transition":y.value===!0?"":" q-layout--prevent-focus")+(m.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${O.value===!0?"mini":"standard"}`+(de.value===!0||X.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+(Ee.value===!0?" q-drawer--top-padding":""))),rt=v(()=>{const o=a.lang.rtl===!0?e.side:J.value;return[[ke,ct,void 0,{[o]:!0,mouse:!0}]]}),lt=v(()=>{const o=a.lang.rtl===!0?J.value:e.side;return[[ke,De,void 0,{[o]:!0,mouse:!0}]]}),ut=v(()=>{const o=a.lang.rtl===!0?J.value:e.side;return[[ke,De,void 0,{[o]:!0,mouse:!0,mouseAllDir:!0}]]});function fe(){dt(m,e.behavior==="mobile"||e.behavior!=="desktop"&&l.totalWidth.value<=e.breakpoint)}C(m,o=>{o===!0?(w=y.value,y.value===!0&&x(!1)):e.overlay===!1&&e.behavior!=="mobile"&&w!==!1&&(y.value===!0?(B(0),P(0),he()):q(!1))}),C(()=>e.side,(o,g)=>{l.instances[g]===R&&(l.instances[g]=void 0,l[g].space=!1,l[g].offset=0),l.instances[o]=R,l[o].size=L.value,l[o].space=X.value,l[o].offset=ce.value}),C(l.totalWidth,()=>{(l.isContainer.value===!0||document.qScrollPrevented!==!0)&&fe()}),C(()=>e.behavior+e.breakpoint,fe),C(l.isContainer,o=>{y.value===!0&&f(o!==!0),o===!0&&fe()}),C(l.scrollbarWidth,()=>{B(y.value===!0?0:void 0)}),C(ce,o=>{M("offset",o)}),C(X,o=>{i("onLayout",o),M("space",o)}),C(E,()=>{B()}),C(L,o=>{B(),me(e.miniToOverlay,o)}),C(()=>e.miniToOverlay,o=>{me(o,L.value)}),C(()=>a.lang.rtl,()=>{B()}),C(()=>e.mini,()=>{e.noMiniAnimation||e.modelValue===!0&&(st(),l.animate())}),C(O,o=>{i("miniState",o)});function B(o){o===void 0?oe(()=>{o=y.value===!0?0:L.value,B(F.value*o)}):(l.isContainer.value===!0&&E.value===!0&&(m.value===!0||Math.abs(o)===L.value)&&(o+=F.value*l.scrollbarWidth.value),Be.value=o)}function P(o){Oe.value=o}function ve(o){const g=o===!0?"remove":l.isContainer.value!==!0?"add":"";g!==""&&document.body.classList[g]("q-body--drawer-toggle")}function st(){b!==null&&clearTimeout(b),t.proxy&&t.proxy.$el&&t.proxy.$el.classList.add("q-drawer--mini-animate"),se.value=!0,b=setTimeout(()=>{b=null,se.value=!1,t&&t.proxy&&t.proxy.$el&&t.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function ct(o){if(y.value!==!1)return;const g=L.value,T=ne(o.distance.x,0,g);if(o.isFinal===!0){T>=Math.min(75,g)===!0?q():(l.animate(),P(0),B(F.value*g)),W.value=!1;return}B((a.lang.rtl===!0?E.value!==!0:E.value)?Math.max(g-T,0):Math.min(0,T-g)),P(ne(T/g,0,1)),o.isFirst===!0&&(W.value=!0)}function De(o){if(y.value!==!0)return;const g=L.value,T=o.direction===e.side,Z=(a.lang.rtl===!0?T!==!0:T)?ne(o.distance.x,0,g):0;if(o.isFinal===!0){Math.abs(Z)<Math.min(75,g)===!0?(l.animate(),P(1),B(0)):x(),W.value=!1;return}B(F.value*Z),P(ne(1-Z/g,0,1)),o.isFirst===!0&&(W.value=!0)}function he(){f(!1),ve(!0)}function M(o,g){l.update(e.side,o,g)}function dt(o,g){o.value!==g&&(o.value=g)}function me(o,g){M("size",o===!0?e.miniWidth:g)}return l.instances[e.side]=R,me(e.miniToOverlay,L.value),M("space",X.value),M("offset",ce.value),e.showIfAbove===!0&&e.modelValue!==!0&&y.value===!0&&e["onUpdate:modelValue"]!==void 0&&i("update:modelValue",!0),j(()=>{i("onLayout",X.value),i("miniState",O.value),w=e.showIfAbove===!0;const o=()=>{(y.value===!0?z:p)(!1,!0)};if(l.totalWidth.value!==0){oe(o);return}h=C(l.totalWidth,()=>{h(),h=void 0,y.value===!1&&e.showIfAbove===!0&&m.value===!1?q(!1):o()})}),K(()=>{h!==void 0&&h(),b!==null&&(clearTimeout(b),b=null),y.value===!0&&he(),l.instances[e.side]===R&&(l.instances[e.side]=void 0,M("size",0),M("offset",0),M("space",!1))}),()=>{const o=[];m.value===!0&&(e.noSwipeOpen===!1&&o.push(qt(_("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),rt.value)),o.push(Pe("div",{ref:"backdrop",class:Ze.value,style:et.value,"aria-hidden":"true",onClick:x},void 0,"backdrop",e.noSwipeBackdrop!==!0&&y.value===!0,()=>ut.value)));const g=O.value===!0&&n.mini!==void 0,T=[_("div",{...s,key:""+g,class:[ot.value,s.class]},g===!0?n.mini():le(n.default))];return e.elevated===!0&&y.value===!0&&T.push(_("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),o.push(Pe("aside",{ref:"content",class:it.value,style:nt.value},T,"contentclose",e.noSwipeClose!==!0&&m.value===!0,()=>lt.value)),_("div",{class:"q-drawer-container"},o)}}}),Yt=V({name:"QPageContainer",setup(e,{slots:n}){const{proxy:{$q:i}}=N(),s=Le(ue,Q);if(s===Q)return console.error("QPageContainer needs to be child of QLayout"),Q;Ne(_t,!0);const t=v(()=>{const a={};return s.header.space===!0&&(a.paddingTop=`${s.header.size}px`),s.right.space===!0&&(a[`padding${i.lang.rtl===!0?"Left":"Right"}`]=`${s.right.size}px`),s.footer.space===!0&&(a.paddingBottom=`${s.footer.size}px`),s.left.space===!0&&(a[`padding${i.lang.rtl===!0?"Right":"Left"}`]=`${s.left.size}px`),a});return()=>_("div",{class:"q-page-container",style:t.value},le(n.default))}});const{passive:We}=qe,jt=["both","horizontal","vertical"];var Kt=V({name:"QScrollObserver",props:{axis:{type:String,validator:e=>jt.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:n}){const i={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let s=null,t,a;C(()=>e.scrollTarget,()=>{c(),f()});function u(){s!==null&&s();const w=Math.max(0,Lt(t)),b=zt(t),h={top:w-i.position.top,left:b-i.position.left};if(e.axis==="vertical"&&h.top===0||e.axis==="horizontal"&&h.left===0)return;const m=Math.abs(h.top)>=Math.abs(h.left)?h.top<0?"up":"down":h.left<0?"left":"right";i.position={top:w,left:b},i.directionChanged=i.direction!==m,i.delta=h,i.directionChanged===!0&&(i.direction=m,i.inflectionPoint=i.position),n("scroll",{...i})}function f(){t=$t(a,e.scrollTarget),t.addEventListener("scroll",r,We),r(!0)}function c(){t!==void 0&&(t.removeEventListener("scroll",r,We),t=void 0)}function r(w){if(w===!0||e.debounce===0||e.debounce==="0")u();else if(s===null){const[b,h]=e.debounce?[setTimeout(u,e.debounce),clearTimeout]:[requestAnimationFrame(u),cancelAnimationFrame];s=()=>{h(b),s=null}}}const{proxy:l}=N();return C(()=>l.$q.lang.rtl,u),j(()=>{a=l.$el.parentNode,f()}),K(()=>{s!==null&&s(),c()}),Object.assign(l,{trigger:r,getPosition:()=>i}),$e}}),Gt=V({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:n,emit:i}){const{proxy:{$q:s}}=N(),t=$(null),a=$(s.screen.height),u=$(e.container===!0?0:s.screen.width),f=$({position:0,direction:"down",inflectionPoint:0}),c=$(0),r=$(Ie.value===!0?0:be()),l=v(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),w=v(()=>e.container===!1?{minHeight:s.screen.height+"px"}:null),b=v(()=>r.value!==0?{[s.lang.rtl===!0?"left":"right"]:`${r.value}px`}:null),h=v(()=>r.value!==0?{[s.lang.rtl===!0?"right":"left"]:0,[s.lang.rtl===!0?"left":"right"]:`-${r.value}px`,width:`calc(100% + ${r.value}px)`}:null);function m(p){if(e.container===!0||document.qScrollPrevented!==!0){const q={position:p.position.top,direction:p.direction,directionChanged:p.directionChanged,inflectionPoint:p.inflectionPoint.top,delta:p.delta.top};f.value=q,e.onScroll!==void 0&&i("scroll",q)}}function O(p){const{height:q,width:x}=p;let H=!1;a.value!==q&&(H=!0,a.value=q,e.onScrollHeight!==void 0&&i("scrollHeight",q),y()),u.value!==x&&(H=!0,u.value=x),H===!0&&e.onResize!==void 0&&i("resize",p)}function L({height:p}){c.value!==p&&(c.value=p,y())}function y(){if(e.container===!0){const p=a.value>c.value?be():0;r.value!==p&&(r.value=p)}}let d=null;const z={instances:{},view:v(()=>e.view),isContainer:v(()=>e.container),rootRef:t,height:a,containerHeight:c,scrollbarWidth:r,totalWidth:v(()=>u.value+r.value),rows:v(()=>{const p=e.view.toLowerCase().split(" ");return{top:p[0].split(""),middle:p[1].split(""),bottom:p[2].split("")}}),header:te({size:0,offset:0,space:!1}),right:te({size:300,offset:0,space:!1}),footer:te({size:0,offset:0,space:!1}),left:te({size:300,offset:0,space:!1}),scroll:f,animate(){d!==null?clearTimeout(d):document.body.classList.add("q-body--layout-animate"),d=setTimeout(()=>{d=null,document.body.classList.remove("q-body--layout-animate")},155)},update(p,q,x){z[p][q]=x}};if(Ne(ue,z),be()>0){let x=function(){p=null,q.classList.remove("hide-scrollbar")},H=function(){if(p===null){if(q.scrollHeight>s.screen.height)return;q.classList.add("hide-scrollbar")}else clearTimeout(p);p=setTimeout(x,300)},U=function(R){p!==null&&R==="remove"&&(clearTimeout(p),x()),window[`${R}EventListener`]("resize",H)},p=null;const q=document.body;C(()=>e.container!==!0?"add":"remove",U),e.container!==!0&&U("add"),Tt(()=>{U("remove")})}return()=>{const p=xt(n.default,[_(Kt,{onScroll:m}),_(_e,{onResize:O})]),q=_("div",{class:l.value,style:w.value,ref:e.container===!0?void 0:t,tabindex:-1},p);return e.container===!0?_("div",{class:"q-layout-container overflow-hidden",ref:t},[_(_e,{onResize:L}),_("div",{class:"absolute-full",style:b.value},[_("div",{class:"scroll",style:h.value},[q])])]):q}}});const Jt=ze({name:"EssentialLink",props:{title:{type:String,required:!0},caption:{type:String,default:""},link:{type:String,default:"#"},icon:{type:String,default:""}}});function Zt(e,n,i,s,t,a){return D(),A(Qt,{clickable:"",tag:"a",target:"_blank",to:e.link,exact:""},{default:S(()=>[e.icon?(D(),A(Me,{key:0,avatar:""},{default:S(()=>[k(Ot,{name:e.icon},null,8,["name"])]),_:1})):Ue("",!0),k(Me,null,{default:S(()=>[k(re,null,{default:S(()=>[G(I(e.title),1)]),_:1}),k(re,{caption:""},{default:S(()=>[G(I(e.caption),1)]),_:1})]),_:1})]),_:1},8,["to"])}var ea=Te(Jt,[["render",Zt]]);const ta=ze({name:"HistoryList",setup(){const e=Vt(),n=Pt();return{store:e,del(i){n.dialog({title:"Confirm",message:"Delete item?",cancel:!0,persistent:!0}).onOk(()=>{e.del_history(i).then(()=>{e.reload_history()})})}}}}),aa={class:"text-h8"},na={class:"text-weight-bold"},oa={class:"text-weight-bold text-red"},ia={class:"text-caption"};function ra(e,n,i,s,t,a){return D(),A(Ke,null,{default:S(()=>[k(re,{header:""},{default:S(()=>[G(" History ")]),_:1}),(D(!0),Xe(je,null,Ye(e.store.history,u=>(D(),A(Bt,{flat:"",bordered:"",class:"q-ma-sm",key:u.id},{default:S(()=>[k(Ht,{src:`/output/${encodeURIComponent(u.id)}/image.png`},null,8,["src"]),k(Et,null,{default:S(()=>[k(ie,{"fab-mini":"",color:"secondary",icon:"content_copy",class:"absolute",style:{top:"0",right:"46px",transform:"translateY(-60%)"},onClick:f=>e.store.copy_history(u)},null,8,["onClick"]),k(ie,{"fab-mini":"",color:"accent",icon:"delete",class:"absolute",onClick:f=>e.del(u),style:{top:"0",right:"0px",transform:"translateY(-60%)"}},null,8,["onClick"]),ae("div",aa,I(u.id),1),ae("div",na,I(u.prompt),1),ae("div",oa,I(u.negative_prompt),1),ae("div",ia,"seed: "+I(u.seed),1)]),_:2},1024)]),_:2},1024))),128)),k(Rt,{showing:e.store.loading_history},null,8,["showing"])]),_:1})}var la=Te(ta,[["render",ra]]);const ua=[{title:"txt2img",caption:"Text to image.",icon:"school",link:"/"},{title:"Gallery",caption:"Generations gallery.",icon:"school",link:"/gallery"}],sa=ze({name:"MainLayout",components:{EssentialLink:ea,HistoryList:la},setup(){const e=$(!1),n=$(!1);return{essentialLinks:ua,leftDrawerOpen:e,toggleLeftDrawer(){e.value=!e.value},rightDrawerOpen:n,toggleRightDrawer(){n.value=!n.value}}}});function ca(e,n,i,s,t,a){const u=we("EssentialLink"),f=we("HistoryList"),c=we("router-view");return D(),A(Gt,{view:"lHh Lpr fFf"},{default:S(()=>[k(It,{elevated:""},{default:S(()=>[k(Ft,null,{default:S(()=>[k(ie,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:e.toggleLeftDrawer},null,8,["onClick"]),k(At,null,{default:S(()=>[G("AIBro")]),_:1}),e.$route.path=="/"?(D(),A(ie,{key:0,dense:"",flat:"",round:"",icon:"menu",onClick:e.toggleRightDrawer},null,8,["onClick"])):Ue("",!0)]),_:1})]),_:1}),k(Fe,{modelValue:e.leftDrawerOpen,"onUpdate:modelValue":n[0]||(n[0]=r=>e.leftDrawerOpen=r),"show-if-above":"",bordered:""},{default:S(()=>[k(Ke,null,{default:S(()=>[k(re,{header:""},{default:S(()=>[G(" Menu ")]),_:1}),(D(!0),Xe(je,null,Ye(e.essentialLinks,r=>(D(),A(u,Dt({key:r.title},r),null,16))),128))]),_:1})]),_:1},8,["modelValue"]),k(Fe,{modelValue:e.rightDrawerOpen,"onUpdate:modelValue":n[1]||(n[1]=r=>e.rightDrawerOpen=r),side:"right",overlay:"",bordered:""},{default:S(()=>[k(f)]),_:1},8,["modelValue"]),k(Yt,null,{default:S(()=>[k(c)]),_:1})]),_:1})}var ya=Te(sa,[["render",ca]]);export{ya as default};
