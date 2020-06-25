!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e,i){},function(t,e,i){"use strict";i.r(e);class s{constructor(){this.autoLightMode=!1,this.plugins={}}fromInit(t){return this.prefix=t.prefix,this.logLevel=t.logLevel,this.cacheSize=t.cacheSize,this.autoLightMode=t.autoLightMode,this.animationTime=t.animationTime,this.animationTimeShort=t.animationTimeShort,this.animationTimeLong=t.animationTimeLong,this}}class n{constructor(){this.prefix="cui",this.app="$cui",this.logLevel="warning",this.interaction="async",this.animationTime=300,this.animationTimeShort=150,this.animationTimeLong=500,this.cacheSize=500,this.autoLightMode=!1}}class r extends Error{constructor(t,e){super(e),Object.setPrototypeOf(this,new.target.prototype),this.name=t}}class o extends r{constructor(t){super("ItemNotFoundError",t)}}class a extends r{constructor(t){super("ArgumentError",t)}}class h extends r{constructor(t){super("ArgumentError",t)}}class c extends r{constructor(t){super("CuiInstanceInitError",t)}}function u(t,e=!0){return!(null==t||e&&function(t){return("string"==typeof t||!!Array.isArray(t))&&0===t.length}(t))}function l(t,e){if(!u(t)||!u(e))throw new a("Missing argument value");return`${t}-${e}`}function d(t){return new Promise(e=>setTimeout(()=>{e(!0)},t))}function p(t,e){let i=null,s=e.length;for(let n=0;n<s;n++){let s=e[n];if(t.hasAttribute(s)){i=s;break}}return i}function f(t,e,i){return t<e?e:t>i?i:t}function v(...t){return!!u(t)&&void 0===t.find(t=>!1===u(t))}class g{constructor(t,e){this.level=e,this.component=t,this.id="-"}setLevel(t){this.level=t}setId(t){this.id=t}debug(t,e){"debug"===this.level&&console.log(this.prepString(t,e))}error(t,e){"error"!==this.level&&"debug"!==this.level&&"warning"!==this.level||console.error(this.prepString(t,e))}warning(t,e){"warning"!==this.level&&"debug"!==this.level||console.warn(this.prepString(t,e))}exception(t,e){console.error(this.prepString(`An exception occured: ${t.name}: ${t.message}`,e)),"debug"===this.level&&console.exception(t.stack)}performance(t,e){if("debug"!==this.level)return;let i=Date.now();t(),console.log(this.prepString(`Performance measure: ${Date.now()-i}ms`,e))}prepString(t,e){return`[${(new Date).toLocaleString()}][${this.component}][${null!=e?e:"-"}][${this.id}][${t}]`}}const w="animation-progress",m={close:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20"><path d="M 1.9999999,1.9999999 18,18"></path><path d="M 18,1.9999999 1.9999999,18"></path></svg>',accordion:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20"><path d="M 5.0000475,7.4490018 10.000024,12.551028 15,7.4490018"></path></svg>',special_menu:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20"><path class="menu_handle_2" d="M 1,10 H 19"></path><path class="menu_handle_1" d="M 1,4.8571429 H 19"></path><path  class="menu_handle_3" d="M 1,15.142857 H 19"></path></svg>',special_fail:'<svg xmlns="http://www.w3.org/2000/svg" class="special-fail" viewBox="0 0 100 100" width="100" height="100"><path class="circle" d="M 50,7.000001 A 43,43 0 0 1 92.999999,50 43,43 0 0 1 50,92.999999 43,43 0 0 1 7.0000011,50 43,43 0 0 1 50,7.000001 Z"></path><path class="arm_1" d="M 28.536809,28.536809 71.342023,71.342023"></path><path class="arm_2" d="M 71.342023,28.536809 28.536809,71.342023"></path></svg>',special_success:'<svg xmlns="http://www.w3.org/2000/svg" class="special-success" viewBox="0 0 100 100" width="100" height="100"><path class="circle" d="M 50,7 A 43,43 0 0 1 93,50 43,43 0 0 1 50,93 43,43 0 0 1 7,50 43,43 0 0 1 50,7 Z"></path><path class="arm" d="M 22.988405,48.234784 36.946233,72.410453 75.516456,33.84023"></path></svg>'},y={light:{base:"--cui-color-light-base",muted:"--cui-color-light-muted",active:"--cui-color-light-active"},dark:{base:"--cui-color-dark-base",muted:"--cui-color-dark-muted",active:"--cui-color-dark-active"},accent:{base:"--cui-color-primary",muted:"--cui-color-primary-muted",active:"--cui-color-primary-active"},secondary:{base:"--cui-color-secondary",muted:"--cui-color-secondary-muted",active:"--cui-color-secondary-active"},success:{base:"--cui-color-success",muted:"--cui-color-success-muted",active:"--cui-color-success-active"},warning:{base:"--cui-color-warning",muted:"--cui-color-warning-muted",active:"--cui-color-warning-active"},error:{base:"--cui-color-error",muted:"--cui-color-error-muted",active:"--cui-color-error-active"}};class k{}k.logLevel="none",k.prefix="cui";class b{static get(t,e){return new g(t,null!=e?e:k.logLevel)}}var M,L,x,E,A,W=function(t,e,i,s){return new(i||(i=Promise))((function(n,r){function o(t){try{h(s.next(t))}catch(t){r(t)}}function a(t){try{h(s.throw(t))}catch(t){r(t)}}function h(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((s=s.apply(t,e||[])).next())}))},T=function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,i),i},C=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class S{constructor(t,e){M.set(this,void 0),L.set(this,void 0),x.set(this,void 0),E.set(this,void 0),A.set(this,void 0),T(this,M,t),T(this,L,!1),T(this,x,b.get("ElementManager")),T(this,A,e),T(this,E,Date.now())}toggleClass(t){return W(this,void 0,void 0,(function*(){return!!u(t)&&this.call(e=>{e.classList.contains(t)?e.classList.remove(t):e.classList.add(t)},"toggleClass")}))}toggleClassAs(t){return W(this,void 0,void 0,(function*(){return!!u(t)&&this.call(e=>{let i=e.classList;C(this,A).interactions.fetch(()=>{i.contains(t)?C(this,A).interactions.mutate(i.remove,i,t):C(this,A).interactions.mutate(i.add,i,t)},this)},"toggleClassAs")}))}setClass(t){return W(this,void 0,void 0,(function*(){return!!u(t)&&this.call(e=>{e.classList.contains(t)||e.classList.add(t)},"setClass")}))}setClassAs(t){return W(this,void 0,void 0,(function*(){return!!u(t)&&this.call(e=>{let i=e.classList;C(this,A).interactions.fetch(()=>{i.contains(t)||C(this,A).interactions.mutate(i.add,i,t)},this)},"setClassAs")}))}removeClass(t){return W(this,void 0,void 0,(function*(){return!!u(t)&&this.call(e=>{e.classList.contains(t)&&e.classList.remove(t)},"removeClass")}))}removeClassAs(t){return W(this,void 0,void 0,(function*(){return!!u(t)&&this.call(e=>{let i=e.classList;C(this,A).interactions.fetch(()=>{i.contains(t)&&C(this,A).interactions.mutate(i.remove,i,t)},this)},"removeClass")}))}getAttribute(t){return u(t)?C(this,M).reduce((e,i)=>(i.hasAttribute(t)?e.push(i.getAttribute(t)):e.push(null),e),[]):null}setAttribute(t,e){return W(this,void 0,void 0,(function*(){return!!u(t)&&this.call(i=>{i.setAttribute(t,null!=e?e:"")},"setAttribute")}))}setAttributeAs(t,e){return W(this,void 0,void 0,(function*(){return!!u(t)&&this.call(i=>{C(this,A).interactions.mutate(i.setAttribute,i,t,null!=e?e:"")},"setAttributeAs")}))}removeAttribute(t){return W(this,void 0,void 0,(function*(){return!!u(t)&&this.call(e=>{e.removeAttribute(t)},"removeAttribute")}))}removeAttributeAs(t){return W(this,void 0,void 0,(function*(){return!!u(t)&&this.call(e=>{C(this,A).interactions.mutate(e.removeAttribute,e,t)},"removeAttributeAs")}))}toggleAttribute(t,e){return W(this,void 0,void 0,(function*(){return!!u(t)&&this.call(i=>{i.hasAttribute(t)?i.removeAttribute(t):i.setAttribute(t,null!=e?e:"")},"toggleAttribute")}))}toggleAttributeAs(t,e){return W(this,void 0,void 0,(function*(){return!!u(t)&&this.call(i=>{C(this,A).interactions.fetch(()=>{i.hasAttribute(t)?C(this,A).interactions.mutate(i.removeAttribute,i,t):C(this,A).interactions.mutate(i.setAttribute,i,t,null!=e?e:"")},this)},"toggleAttributeAs")}))}click(t){return W(this,void 0,void 0,(function*(){return!!u(t)&&this.call(e=>{e.addEventListener("click",t)},"click")}))}event(t,e){return W(this,void 0,void 0,(function*(){return!(!u(t)||!u(e))&&this.call(i=>{i.addEventListener(t,e)},"event")}))}call(t,e){return W(this,void 0,void 0,(function*(){return C(this,L)&&C(this,x).error("Element is locked",e),this.lock(),C(this,M).forEach((e,i)=>{t(e,i)}),this.unlock(),!0}))}animate(t,e){return W(this,void 0,void 0,(function*(){if(!u(t))return!1;const i=null!=e?e:C(this,A).setup.animationTime;return this.call(e=>{this.change(()=>{e.classList.add(t),e.classList.add(w),setTimeout(()=>{this.change(()=>{e.classList.remove(t),e.classList.remove(w)})},i)})})}))}open(t,e,i){return W(this,void 0,void 0,(function*(){if(!v(t,e))return!1;const s=null!=i?i:C(this,A).setup.animationTime;return this.call(i=>{this.change(()=>{i.classList.add(e),i.classList.add(w),setTimeout(()=>{this.change(()=>{i.classList.remove(e),i.classList.remove(w),i.classList.add(t)})},s)})})}))}close(t,e,i){return W(this,void 0,void 0,(function*(){if(!v(t,e))return!1;const s=null!=i?i:C(this,A).setup.animationTime;return this.call(i=>{this.change(()=>{i.classList.add(e),i.classList.add(w),setTimeout(()=>{this.change(()=>{i.classList.remove(e),i.classList.remove(w),i.classList.remove(t)})},s)})})}))}read(t,...e){C(this,A).interactions.fetch(t,this,...e)}change(t,...e){C(this,A).interactions.mutate(t,this,...e)}elements(){return C(this,M)}count(){return C(this,M).length}lock(){T(this,L,!0)}unlock(){T(this,L,!1)}isLocked(){return C(this,L)}refresh(){return Date.now()-C(this,E)<36e4}}M=new WeakMap,L=new WeakMap,x=new WeakMap,E=new WeakMap,A=new WeakMap;var P,I,$,O,_,B,j,D,N=function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,i),i},z=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class H{constructor(t,e){P.set(this,void 0),I.set(this,void 0),$.set(this,void 0),O.set(this,void 0),_.set(this,void 0),B.set(this,void 0),j.set(this,void 0),D.set(this,void 0),N(this,I,null),N(this,O,t),N(this,P,b.get("CuiMutationObserver")),N(this,_,null),N(this,B,[]),N(this,j,[]),N(this,D,e)}setPlugins(t){return N(this,_,t),this}setComponents(t){return N(this,B,t),this}setAttributes(t){return N(this,$,{attributes:!0,subtree:!0,attributeFilter:t}),N(this,j,t),this}start(){return z(this,P).debug("Starting"),N(this,I,new MutationObserver(this.mutationCallback)),z(this,I).observe(z(this,O),z(this,$)),z(this,P).debug("Started"),this}stop(){return z(this,P).debug("Stopping"),null!==z(this,I)&&z(this,P).debug("Observer available"),z(this,I).disconnect(),N(this,I,null),z(this,P).debug("Stopped"),this}mutationCallback(t,e){t.forEach(t=>{switch(t.type){case"attributes":const e=t.target;u(e.$handler)&&e.$handler.handle();break;case"childList":this.handleChildListMutation(t)}u(z(this,_))&&z(this,_).onMutation(t).then(()=>{z(this,P).debug("Mutation performed on plugins")})})}handleChildListMutation(t){const e=t.addedNodes.length,i=t.removedNodes.length;e>0?(z(this,P).debug("Registering added nodes: "+e),this.handleAddedNodes(t.addedNodes)):i>0&&(z(this,P).debug("REmoving nodes: "+i),this.handleRemovedNodes(t.removedNodes))}handleAddedNodes(t){t.forEach(t=>{if(u(p(t,z(this,j)))){const e=z(this,B).find(t=>{t.attribute});u(e)&&(z(this,D).styleAppender.append(e.getStyle()),t.$handler=e.get(t,z(this,D)),t.$handler.handle())}})}handleRemovedNodes(t){t.forEach(t=>{z(this,P).debug("Removing")})}}P=new WeakMap,I=new WeakMap,$=new WeakMap,O=new WeakMap,_=new WeakMap,B=new WeakMap,j=new WeakMap,D=new WeakMap;var K,R,q,F,U,Z,G,J,Q=function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,i),i},V=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class X{constructor(t,e,i){K.set(this,void 0),R.set(this,void 0),q.set(this,void 0),F.set(this,void 0),U.set(this,void 0),Z.set(this,void 0),G.set(this,void 0),J.set(this,void 0),Q(this,K,t),Q(this,R,`.${e}-toast`),Q(this,q,e+"-toast"),Q(this,F,e+"-active"),Q(this,U,i),Q(this,Z,!1),Q(this,G,e+"-toast-animation-in"),Q(this,J,e+"-toast-animation-out")}show(t){return function(t,e,i,s){return new(i||(i=Promise))((function(n,r){function o(t){try{h(s.next(t))}catch(t){r(t)}}function a(t){try{h(s.throw(t))}catch(t){r(t)}}function h(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((s=s.apply(t,e||[])).next())}))}(this,void 0,void 0,(function*(){if(V(this,Z))return!1;Q(this,Z,!0);let e=document.querySelector(V(this,R));return u(e)||(e=document.createElement("div"),e.classList.add(V(this,q)),document.body.appendChild(e)),V(this,K).mutate(()=>{e.innerHTML=t,e.classList.add(w),e.classList.add(V(this,G))},this),yield d(V(this,U)),V(this,K).mutate(()=>{e.classList.remove(w),e.classList.remove(V(this,G)),e.classList.add(V(this,F))},this),yield d(3e3),V(this,K).mutate(()=>{e.classList.add(w),e.classList.add(V(this,J))},this),setTimeout(()=>{V(this,K).mutate(()=>{e.classList.remove(w),e.classList.remove(V(this,J)),e.classList.remove(V(this,F))},this),Q(this,Z,!1)},V(this,U)),!0}))}}K=new WeakMap,R=new WeakMap,q=new WeakMap,F=new WeakMap,U=new WeakMap,Z=new WeakMap,G=new WeakMap,J=new WeakMap;var Y,tt,et,it,st,nt=function(t,e,i,s){return new(i||(i=Promise))((function(n,r){function o(t){try{h(s.next(t))}catch(t){r(t)}}function a(t){try{h(s.throw(t))}catch(t){r(t)}}function h(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((s=s.apply(t,e||[])).next())}))},rt=function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,i),i},ot=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class at{constructor(t){Y.set(this,void 0),tt.set(this,void 0),et.set(this,void 0),it.set(this,void 0),st.set(this,void 0),rt(this,st,t),rt(this,tt,b.get("CollectionManager"))}setElements(t){rt(this,Y,t)}setToggle(t){rt(this,it,t)}addAnimationClass(t,e,i,s){e.classList.add(w),t.classList.add(s),e.classList.add(i)}setFinalClasses(t,e,i,s){e.classList.remove(w),t.classList.remove(s),e.classList.remove(i),t.classList.remove(ot(this,it)),e.classList.add(ot(this,it))}verifyIndex(t,e,i){return t>=0&&t!==e&&t<i}setCurrent(t,e){return nt(this,void 0,void 0,(function*(){return this.lock(),ot(this,tt).debug(`Switching index from: ${e} to ${t}`),e>-1&&ot(this,Y)[e].classList.remove(ot(this,it)),ot(this,Y)[t].classList.add(ot(this,it)),this.unlock(),!0}))}setCurrentWithAnimation(t,e,i,s,n){return nt(this,void 0,void 0,(function*(){this.lock(),ot(this,tt).debug(`Switching index from: ${n} to ${t}`);const r=ot(this,Y)[n],o=ot(this,Y)[t];return ot(this,st).mutate(this.addAnimationClass,this,r,o,e,i),setTimeout(()=>{ot(this,st).mutate(this.setFinalClasses,this,r,o,e,i),this.unlock()},s),!0}))}getCurrentIndex(){if(!u(ot(this,it)))return-1;let t=this.count();for(let e=0;e<t;e++)if(ot(this,Y)[e].classList.contains(ot(this,it)))return e;return-1}elements(){return ot(this,Y)}check(){return ot(this,et)?(ot(this,tt).warning("Object locked. Operation in progress","Check"),!1):u(ot(this,it))?!(this.count()<=0&&(ot(this,tt).warning("Elements list is empty","Check"),1)):(ot(this,tt).warning("Toggle is not set. Call setToggleClass","Check"),!1)}count(){return ot(this,Y)?ot(this,Y).length:-1}lock(){rt(this,et,!0)}unlock(){rt(this,et,!1)}}Y=new WeakMap,tt=new WeakMap,et=new WeakMap,it=new WeakMap,st=new WeakMap;var ht,ct,ut,lt=function(t,e,i,s){return new(i||(i=Promise))((function(n,r){function o(t){try{h(s.next(t))}catch(t){r(t)}}function a(t){try{h(s.throw(t))}catch(t){r(t)}}function h(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((s=s.apply(t,e||[])).next())}))},dt=function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,i),i},pt=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class ft{constructor(t,e){ht.set(this,void 0),ct.set(this,void 0),ut.set(this,void 0),dt(this,ht,b.get("CollectionManager")),dt(this,ut,new at(e)),pt(this,ut).setElements(t),dt(this,ct,Date.now())}setToggle(t){pt(this,ut).setToggle(t)}setElements(t){pt(this,ut).setElements(t)}click(t){pt(this,ut).elements().forEach((e,i)=>{e.addEventListener("click",()=>{this.set(i).then(()=>{t&&t(e,i)})})})}next(){return lt(this,void 0,void 0,(function*(){if(!pt(this,ut).check())return!1;let t=pt(this,ut).getCurrentIndex()+1;return this.set(t>=this.length()?0:t)}))}previous(){return lt(this,void 0,void 0,(function*(){if(!pt(this,ut).check())return!1;let t=pt(this,ut).getCurrentIndex()-1;return this.set(t<0?this.length()-1:t)}))}set(t){return lt(this,void 0,void 0,(function*(){let e=pt(this,ut).getCurrentIndex();return!(!pt(this,ut).check()||!pt(this,ut).verifyIndex(t,e,this.length()))&&pt(this,ut).setCurrent(t,e)}))}setWithAnimation(t,e,i,s){return lt(this,void 0,void 0,(function*(){let n=pt(this,ut).getCurrentIndex();return!(!pt(this,ut).check()||!pt(this,ut).verifyIndex(t,n,this.length()))&&pt(this,ut).setCurrentWithAnimation(t,e,i,s,n)}))}getCurrentIndex(){return pt(this,ut).getCurrentIndex()}length(){return pt(this,ut).count()}refresh(){return this.length()>0&&Date.now()-pt(this,ct)>36e4}}ht=new WeakMap,ct=new WeakMap,ut=new WeakMap;var vt;class gt{constructor(){this.isScheduled=!1,vt.set(this,void 0),this.raf=window.requestAnimationFrame.bind(window),this.writes=[],this.reads=[],function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");e.set(t,i)}(this,vt,5)}mutate(t,e,...i){this.reads.push(this.createTask(t,e,...i)),this.schedule()}fetch(t,e,...i){this.writes.push(this.createTask(t,e,...i)),this.schedule()}createTask(t,e,...i){return e||i?t.bind(e,...i):t}run(t){let e=null;for(;e=t.shift();)e()}schedule(t){if(!this.isScheduled){if(this.isScheduled=!0,t>=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)}(this,vt))throw new Error("Fast Dom limit reached");this.raf(this.flush.bind(this,t))}}flush(t){let e=null!=t?t:0,i=null,s=this.writes,n=this.reads;try{this.run(n),this.run(s)}catch(t){i=t,console.error(t)}this.isScheduled=!1,i&&this.schedule(e+1),(this.writes.length||this.reads.length)&&this.schedule(t+1)}}vt=new WeakMap;class wt{constructor(){this.isRunning=!1,this.tasks=[],this.raf=window.requestAnimationFrame.bind(window)}mutate(t,e,...i){this.tasks.push(this.createTask(t,e,...i)),this.schedule()}fetch(t,e,...i){this.tasks.push(this.createTask(t,e,...i)),this.schedule()}schedule(){this.isRunning||(this.isRunning=!0,this.raf(this.flush.bind(this)))}flush(){let t=null;for(;t=this.tasks.shift();)try{t()}catch(t){}this.isRunning=!1}createTask(t,e,...i){return e||i?t.bind(e,...i):t}}var mt,yt,kt=function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,i),i},bt=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class Mt{constructor(t){mt.set(this,void 0),yt.set(this,void 0),kt(this,mt,[]),kt(this,yt,[]),t&&t.forEach(t=>{if(!u(t.key))throw kt(this,mt,[]),kt(this,yt,[]),new a("Key is empty");this.add(t.key,t.value)})}add(t,e){if(this.throwOnEmptyKey(t),this.containsKey(t))throw new Error("Key already exists");bt(this,mt).push(t),bt(this,yt).push(e)}remove(t){if(!u(t))return;let e=bt(this,mt).indexOf(t);e>=0&&(bt(this,mt).splice(e,1),bt(this,yt).splice(e,1))}get(t){this.throwOnEmptyKey(t);let e=this.indexOf(t);if(!(e<0))return bt(this,yt)[e]}containsKey(t){return u(t)&&this.indexOf(t)>=0}keys(){return bt(this,mt)}values(){return bt(this,yt)}indexOf(t){return u(t)?bt(this,mt).indexOf(t):-1}update(t,e){this.throwOnEmptyKey(t);let i=this.indexOf(t);if(i<0)throw new o(`Item with key [${t}] not found`);bt(this,yt)[i]=e}clear(){kt(this,yt,[]),kt(this,mt,[])}throwOnEmptyKey(t){if(!u(t))throw new a("Key is empty")}}mt=new WeakMap,yt=new WeakMap;var Lt,xt,Et=function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,i),i},At=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class Wt{constructor(t){Lt.set(this,void 0),xt.set(this,void 0),Et(this,Lt,new Mt),Et(this,xt,null!=t?t:500)}put(t,e){u(t)&&(this.has(t)?At(this,Lt).update(t,e):(this.clean(),At(this,Lt).add(t,e)))}get(t){if(!u(t))return null;if(this.has(t)){let e=At(this,Lt).get(t);if(e.refresh())return e;At(this,Lt).remove(t)}return null}has(t){return!!u(t)&&At(this,Lt).containsKey(t)}remove(t){return!!u(t)&&!!this.has(t)&&(At(this,Lt).remove(t),!0)}clear(){At(this,Lt).clear()}clean(){At(this,Lt).keys().length>=At(this,xt)&&At(this,Lt).remove(At(this,Lt).keys()[0])}}Lt=new WeakMap,xt=new WeakMap;var Tt,Ct,St,Pt=function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,i),i},It=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class $t{constructor(t){Tt.set(this,void 0),Ct.set(this,void 0),St.set(this,void 0),Pt(this,Tt,{}),Pt(this,St,t),Pt(this,Ct,b.get("CuiEventBus"))}on(t,e,i){if(!v(t,e,i))throw new a("Missing argument");let s=i.getCuid();if(!u(s))throw new h("Missing component name or cuid");It(this,Ct).debug(`Attaching new event: [${t}] for: [${s}]`),It(this,Tt)[t]||(It(this,Tt)[t]={}),It(this,Tt)[t][s]={ctx:i,callback:e}}detach(t,e){if(!v(t,e))throw new a("Missing argument");let i=It(this,Tt)[t],s=e.getCuid();It(this,Ct).debug(`Detaching item: [${s}] from [${t}]`),this.isAttached(i,s)&&delete i[s]}detachAll(t){u(t)&&It(this,Tt)[t]?delete It(this,Tt)[t]:It(this,Ct).error("Event name is missing or incorrect","detachAll")}emit(t,...e){return function(t,e,i,s){return new(i||(i=Promise))((function(n,r){function o(t){try{h(s.next(t))}catch(t){r(t)}}function a(t){try{h(s.throw(t))}catch(t){r(t)}}function h(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((s=s.apply(t,e||[])).next())}))}(this,void 0,void 0,(function*(){if(!u(t))throw new a("Event name is incorrect");return It(this,Ct).debug(`Emit: [${t}]`),yield It(this,St).handle(It(this,Tt)[t],e),!0}))}isSubscribing(t,e){let i=It(this,Tt)[t];return this.isAttached(i,e.getCuid())}isAttached(t,e){return u(t)&&u(e)&&u(t[e])}}Tt=new WeakMap,Ct=new WeakMap,St=new WeakMap;var Ot,_t=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};new WeakMap,new WeakMap;class Bt{constructor(t){Ot.set(this,void 0),function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");e.set(t,i)}(this,Ot,t)}handle(t,e){return function(t,e,i,s){return new(i||(i=Promise))((function(n,r){function o(t){try{h(s.next(t))}catch(t){r(t)}}function a(t){try{h(s.throw(t))}catch(t){r(t)}}function h(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((s=s.apply(t,e||[])).next())}))}(this,void 0,void 0,(function*(){if(!u(t))return;let i=[];for(let s in t){let n=t[s];i.push(_t(this,Ot).execute(n.callback,n.ctx,e))}Promise.all(i)}))}}Ot=new WeakMap;class jt{execute(t,e,i){return function(t,e,i,s){return new(i||(i=Promise))((function(n,r){function o(t){try{h(s.next(t))}catch(t){r(t)}}function a(t){try{h(s.throw(t))}catch(t){r(t)}}function h(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((s=s.apply(t,e||[])).next())}))}(this,void 0,void 0,(function*(){i=null!=i?i:[],u(e)?t.apply(e,i):t(...i)}))}}var Dt;class Nt{constructor(t){Dt.set(this,void 0),function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");e.set(t,i)}(this,Dt,t)}append(t){if(u(t)){const e=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style"),s=document.createTextNode(t);i.type="text/css",i.appendChild(s),e.appendChild(i)}return!0}}Dt=new WeakMap;var zt,Ht,Kt,Rt,qt=function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,i),i},Ft=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class Ut{constructor(t){zt.set(this,void 0),Ht.set(this,void 0),Kt.set(this,15),Rt.set(this,15),qt(this,zt,document.documentElement),qt(this,Ht,t)}setAppBackground(t,e){this.setPropertyIn("--cui-color-light-app-background",t.toCssString()),this.setPropertyIn("--cui-color-dark-app-background",e.toCssString())}setComponentBackground(t,e){this.setPropertyIn("--cui-color-light-background",t.toCssString()),this.setPropertyIn("--cui-color-dark-background ",e.toCssString())}setBordersColors(t,e){this.setPropertyIn("--cui-color-light-border",t.toCssString()),this.setPropertyIn("--cui-color-dark-border",e.toCssString())}setColor(t,e){var i,s;const n=y[t],r=e.base;if(!u(n)||!u(r))return;const o=null!==(i=e.muted)&&void 0!==i?i:r.clone().lighten(Ft(this,Kt)),a=null!==(s=e.active)&&void 0!==s?s:r.clone().darken(Ft(this,Rt));Ft(this,Ht).mutate(()=>{this.setProperty(n.base,r.toCssString()),this.setProperty(n.active,a.toCssString()),this.setProperty(n.muted,o.toCssString())},this)}setLightenFactor(t){qt(this,Kt,f(t,0,100))}setDarkenFactor(t){qt(this,Rt,f(t,0,100))}setProperty(t,e){Ft(this,zt).style.setProperty(t,e)}setPropertyIn(t,e){v(e,t)&&Ft(this,Ht).mutate(this.setProperty,this,t,e)}}zt=new WeakMap,Ht=new WeakMap,Kt=new WeakMap,Rt=new WeakMap;class Zt{constructor(t){this.setup=(new s).fromInit(t),this.interactions=class{static get(t){switch(t){case"async":return new gt;default:return new wt}}}.get(t.interaction),this.cache=new Wt(this.setup.cacheSize),this.bus=new $t(new Bt(new jt)),this.colors=new Ut(this.interactions),this.styleAppender=new Nt(this.interactions)}setLightMode(t){const e=l(this.setup.prefix,"dark"),i=document.body.classList;"dark"!==t||i.contains(e)?"light"===t&&i.contains(e)&&this.interactions.mutate(()=>{i.remove(e)},this):this.interactions.mutate(()=>{i.add(e)},this)}setPrintMode(t){const e=l(this.setup.prefix,"print"),i=document.body.classList;t&&!i.contains(e)?this.interactions.mutate(()=>{i.add(e)},this):!t&&i.contains(e)&&this.interactions.mutate(()=>{i.remove(e)},this)}}var Gt,Jt,Qt,Vt=function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,i),i},Xt=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class Yt{constructor(t){Gt.set(this,void 0),Jt.set(this,void 0),Qt.set(this,void 0),Vt(this,Gt,null!=t?t:[]),Vt(this,Qt,b.get("CuiPluginManager"))}init(t){Xt(this,Qt).debug("Plugins initialization started: "+Xt(this,Gt).length),Vt(this,Jt,Xt(this,Gt).filter(t=>u(t.mutation))),Xt(this,Gt).forEach(e=>{e.init(t)}),Xt(this,Qt).debug("Plugins have been initialized")}get(t){if(u(t))return Xt(this,Gt).find(e=>e.name===t)}onMutation(t){return function(t,e,i,s){return new(i||(i=Promise))((function(n,r){function o(t){try{h(s.next(t))}catch(t){r(t)}}function a(t){try{h(s.throw(t))}catch(t){r(t)}}function h(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((s=s.apply(t,e||[])).next())}))}(this,void 0,void 0,(function*(){let e=[];return Xt(this,Jt).forEach(i=>{e.push(i.mutation(t))}),!(yield Promise.all(e)).find(t=>{})}))}}Gt=new WeakMap,Jt=new WeakMap,Qt=new WeakMap;var te,ee,ie,se,ne,re=function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,i),i},oe=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class ae{constructor(t,e,i){te.set(this,void 0),ee.set(this,void 0),ie.set(this,void 0),se.set(this,void 0),ne.set(this,void 0),k.prefix=t.prefix,k.logLevel=t.logLevel,this.plugins=new Yt(e),re(this,ne,null!=i?i:[]),re(this,se,new Zt(t)),re(this,te,b.get("CuiInstance"))}init(){if(!u(window.MutationObserver))throw new c("Mutation observer does not exists");re(this,ie,new X(oe(this,se).interactions,oe(this,se).setup.prefix,oe(this,se).setup.animationTimeLong));const t=oe(this,ne).map(t=>t.attribute),e=u(t)?document.querySelectorAll(u(i=t)?`[${i.join("],[")}]`:""):null;var i;return u(e)&&(oe(this,te).debug(`Initiating ${e.length} elements`),e.forEach(e=>{let i=p(e,t);if(u(i)){let t=oe(this,ne).find(t=>t.attribute===i);u(t)&&(oe(this,se).styleAppender.append(t.getStyle()),e.$handler=t.get(e,oe(this,se)),e.$handler.handle())}else oe(this,te).warning("Handler not found")})),this.plugins.init(oe(this,se)),v(oe(this,ne),t)&&(re(this,ee,new H(document.body,oe(this,se))),oe(this,ee).setComponents(oe(this,ne)).setAttributes(t),oe(this,ee).setPlugins(this.plugins),oe(this,ee).start()),oe(this,se).bus.emit("instance-initialized"),this}finish(){oe(this,ee).stop(),oe(this,se).bus.emit("instance=finished")}get(t){const e=oe(this,se).cache.get(t);if(u(e))return e;const i=this.all(t);if(!i)return;const s=new S(i,oe(this,se));return oe(this,se).cache.put(t,s),s}collection(t){const e=oe(this,se).cache.get(t);if(u(e))return e;const i=this.all(t);if(!u(i))return;let s=new ft(i,oe(this,se).interactions);return oe(this,se).cache.put(t,s),s}toast(t){return function(t,e,i,s){return new(i||(i=Promise))((function(n,r){function o(t){try{h(s.next(t))}catch(t){r(t)}}function a(t){try{h(s.throw(t))}catch(t){r(t)}}function h(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((s=s.apply(t,e||[])).next())}))}(this,void 0,void 0,(function*(){return!!u(t)&&oe(this,ie).show(t)}))}select(t){return document.querySelector(t)}all(t){const e=document.querySelectorAll(t);if(u(e))return[...e]}getUtils(){return oe(this,se)}on(t,e,i){v(t,e,i)||oe(this,te).error("Incorrect arguments","on"),oe(this,se).bus.on(t,e,i)}}te=new WeakMap,ee=new WeakMap,ie=new WeakMap,se=new WeakMap,ne=new WeakMap;var he,ce,ue,le=function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,i),i},de=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class pe{constructor(t,e){he.set(this,void 0),ce.set(this,void 0),ue.set(this,void 0),le(this,he,t),le(this,ue,e),le(this,ce,!1)}start(){return!(!window.matchMedia||de(this,ce)||(window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",this.event.bind(this)),le(this,ce,!0),console.log("Listener initiated"),0))}stop(){return!!de(this,ce)&&(window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change",this.event.bind(this)),le(this,ce,!1),!0)}event(t){var e;console.log("Event");let i=de(this,he).setup.plugins[de(this,ue)];null!==(e=null==i?void 0:i.autoLight)&&void 0!==e&&e&&(t.matches?(console.log("dark"),de(this,he).setLightMode("dark")):(console.log("Light"),de(this,he).setLightMode("light")))}}he=new WeakMap,ce=new WeakMap,ue=new WeakMap;var fe,ve=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class ge{constructor(t){this.description="Dark vs Light mode auto switcher",this.name="auto-light",fe.set(this,void 0),this.description="CuiAutoLightModePlugin",this.setup=t}init(t){this.setup.autoLight&&"dark"==(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")&&t.setLightMode("dark"),function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");e.set(t,i)}(this,fe,new pe(t,this.description)),ve(this,fe).start(),console.log("Auto light initiated")}destroy(){ve(this,fe).stop()}}fe=new WeakMap;class we{constructor(t,e){this._log=b.get(t),this.utils=e}mutate(t,...e){this.utils.interactions.mutate(t,this,...e)}fetch(t,...e){this.utils.interactions.fetch(t,this,...e)}}var me,ye,ke,be,Me,Le,xe,Ee=function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,i),i},Ae=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class We{constructor(){this.attribute="data-icon"}getStyle(){return null}get(t,e){return new Te(t,e,this.attribute)}}class Te extends we{constructor(t,e,i){super("CuiIconHandler",e),me.set(this,void 0),ye.set(this,void 0),ke.set(this,void 0),be.set(this,void 0),Ee(this,ye,t),Ee(this,ke,null),Ee(this,be,i)}handle(){const t=Ae(this,ye).getAttribute(Ae(this,be));if(t===Ae(this,ke))return;const e=t?m[t]:null;if(!e)return;const i=new Ce(e).build(),s=Ae(this,ye).querySelector("svg");u(s)&&s.remove(),Ae(this,ye).childNodes.length>0?this.mutate(this.insertBefore,i):this.mutate(this.appendChild,i)}refresh(){throw new Error("Method not implemented.")}insertBefore(t){Ae(this,ye).insertBefore(t,Ae(this,ye).firstChild)}appendChild(t){Ae(this,ye).appendChild(t)}}me=new WeakMap,ye=new WeakMap,ke=new WeakMap,be=new WeakMap;class Ce{constructor(t){Me.set(this,void 0),Le.set(this,void 0),xe.set(this,void 0),Ee(this,Me,t),Ee(this,Le,1)}setStyle(t){return Ee(this,xe,t),this}setScale(t){return Ee(this,Le,t),this}build(){let t=function(t){if(!u(t))return null;let e=document.createElement("template");return e.innerHTML=t,e.content.children.length>0?e.content.children[0]:null}(Ae(this,Me));return u(t)&&Ae(this,Le)&&(new Se).append(t,Ae(this,Le)),t}}Me=new WeakMap,Le=new WeakMap,xe=new WeakMap;class Se{append(t,e){let i=t.hasAttribute("width")?parseInt(t.getAttribute("width")):20,s=t.hasAttribute("height")?parseInt(t.getAttribute("height")):20;t.setAttribute("width",(i*e).toString()),t.setAttribute("height",(s*e).toString())}}var Pe,Ie,$e,Oe,_e,Be,je,De,Ne,ze=function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,i),i},He=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class Ke{constructor(){Pe.set(this,void 0),this.attribute="circle-progress",m.special_circle_progress='<svg xmlns="http://www.w3.org/2000/svg"  class="circle-progress" viewBox="0 0 100 100" width="100" height="100"><path class="circle-progress-path" d="M 50,5.3660047 A 44.867708,44.633994 0 0 1 94.867709,49.999997 44.867708,44.633994 0 0 1 50,94.633995 44.867708,44.633994 0 0 1 5.1322908,50.000001 44.867708,44.633994 0 0 1 50,5.3660047"></path></svg>'}getStyle(){return null}get(t,e){return new Re(t,e,this.attribute)}}Pe=new WeakMap;class Re extends we{constructor(t,e,i){super("CuiCircleHandler",e),Ie.set(this,void 0),$e.set(this,void 0),Oe.set(this,void 0),_e.set(this,void 0),Be.set(this,void 0),je.set(this,void 0),De.set(this,void 0),Ne.set(this,void 0),ze(this,Ie,t),ze(this,Oe,ze(this,_e,0)),ze(this,Be,null),ze(this,je,-1),ze(this,Ne,i)}handle(){if(console.log("circle"),!u(He(this,$e))){const t=new Ce(m.special_circle_progress).build(),e=He(this,Ie).querySelector("svg");u(e)&&e.remove(),He(this,Ie).appendChild(t),ze(this,Be,He(this,Ie).querySelector(".circle-progress-path")),ze(this,_e,He(this,Be).getTotalLength()),ze(this,Oe,He(this,_e)/100),ze(this,$e,!0)}this.fetch(this.readStyle)}refresh(){throw new Error("Method not implemented.")}updateStyle(t){console.log("Write progress"),He(this,Be).style.strokeDashoffset=t}readStyle(){console.log("Read progress");const t=He(this,Ie).hasAttribute(He(this,Ne))?parseInt(He(this,Ie).getAttribute(He(this,Ne))):0;if(t===He(this,je))return;ze(this,je,t);const e=f(t,0,100);this.mutate(this.updateStyle,He(this,_e)-He(this,Oe)*e)}}Ie=new WeakMap,$e=new WeakMap,Oe=new WeakMap,_e=new WeakMap,Be=new WeakMap,je=new WeakMap,De=new WeakMap,Ne=new WeakMap;var qe,Fe,Ue=function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,i),i},Ze=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class Ge{constructor(){this.attribute="data-spinner",m.special_circle_double='<svg xmlns="http://www.w3.org/2000/svg" class="circle-double" viewBox="0 0 100 100" width="100" height="100"><path class="circle-double-outer" d="M 50.000002,6.1070619 A 44.867709,44.126654 0 0 1 94.867708,50.233712 44.867709,44.126654 0 0 1 50.000002,94.36037 44.867709,44.126654 0 0 1 5.132292,50.233717 44.867709,44.126654 0 0 1 50.000002,6.1070619"></path><path class="circle-double-inner" d="M 50.000001,15.59972 A 35.383463,34.633995 0 0 1 85.383464,50.233711 35.383463,34.633995 0 0 1 50.000001,84.86771 35.383463,34.633995 0 0 1 14.616536,50.233716 35.383463,34.633995 0 0 1 50.000001,15.59972"></path></svg>'}getStyle(){return null}get(t,e){return new Je(t,e,this.attribute)}}class Je extends we{constructor(t,e,i){super("CuiSpinnerHandler",e),qe.set(this,void 0),Fe.set(this,void 0),Ue(this,qe,t),Ue(this,Fe,i)}handle(){const t=Ze(this,qe).getAttribute(Ze(this,Fe)),e=u(t)?m["spinner_"+t]:null;if(!u(e))return;const i=new Ce(e).build();Ze(this,qe).innerHTML="",this.mutate(this.addSpinner,i,t)}refresh(){throw new Error("Method not implemented.")}addSpinner(t,e){Ze(this,qe).appendChild(t),Ze(this,qe).classList.add("animation-spinner-"+e)}}qe=new WeakMap,Fe=new WeakMap;var Qe,Ve,Xe=function(t,e,i,s){return new(i||(i=Promise))((function(n,r){function o(t){try{h(s.next(t))}catch(t){r(t)}}function a(t){try{h(s.throw(t))}catch(t){r(t)}}function h(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((s=s.apply(t,e||[])).next())}))},Ye=function(t,e,i){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,i),i},ti=function(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)};class ei{constructor(){Qe.set(this,void 0),Ye(this,Qe,window)}init(t){return Xe(this,void 0,void 0,(function*(){let e=Object.assign(Object.assign({},new n),t.setup);const i=e.app,s={result:!1};if(u(ti(this,Qe)[i]))return s.message="Instance is already initialized",s;if(u(t.icons))for(let e in t.icons)m[e]=t.icons[e];try{ti(this,Qe)[i]=new ae(e,t.plugins,t.components),ti(this,Qe)[i].init()}catch(t){return console.error(t),s.message="An error occured during initialization",s}return s.result=!0,s}))}}Qe=new WeakMap,Ve=new WeakMap,i(0),window.cuiInit=new class{constructor(){Ve.set(this,void 0),Ye(this,Ve,!1)}init(t,e){var i;return Xe(this,void 0,void 0,(function*(){if(ti(this,Ve))return console.log("Module is already initialized"),!1;const s=new ei,n=[new ge({autoLight:!0})],r=[new We,new Ke,new Ge];let o=yield s.init({setup:t,icons:e,plugins:n,components:r});return o.result?(Ye(this,Ve,!0),!0):(console.error(`A cUI instance failed to initialize: [${null!==(i=o.message)&&void 0!==i?i:"#"}]`),console.log("Cui Light failed to init"),!1)}))}}}]);
//# sourceMappingURL=cui-light.index.js.map