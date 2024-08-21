(function(d,_){typeof exports=="object"&&typeof module!="undefined"?_(exports,require("@floating-ui/dom"),require("vue")):typeof define=="function"&&define.amd?define(["exports","@floating-ui/dom","vue"],_):(d=typeof globalThis!="undefined"?globalThis:d||self,_(d.FloatingVue={},d.FloatingUIDOM,d.Vue))})(this,function(d,_,Ne){"use strict";function Me(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var Ae=Me(Ne);function K(e,t){for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(typeof t[i]=="object"&&e[i]?K(e[i],t[i]):e[i]=t[i])}const m={disabled:!1,distance:5,skidding:0,container:"body",boundary:void 0,instantMove:!1,disposeTimeout:5e3,popperTriggers:[],strategy:"absolute",preventOverflow:!0,flip:!0,shift:!0,overflowPadding:0,arrowPadding:0,arrowOverflow:!0,hideParents:!0,themes:{tooltip:{placement:"top",triggers:["hover","focus","touch"],hideTriggers:e=>[...e,"click"],delay:{show:200,hide:0},handleResize:!1,html:!1,loadingContent:"..."},dropdown:{placement:"bottom",triggers:["click"],delay:0,handleResize:!0,autoHide:!0,hideParents:!0},menu:{$extend:"dropdown",triggers:["hover","focus"],popperTriggers:["hover","focus"],delay:{show:0,hide:400}}}};function S(e,t){let i=m.themes[e]||{},o;do o=i[t],typeof o=="undefined"?i.$extend?i=m.themes[i.$extend]||{}:(i=null,o=m[t]):i=null;while(i);return o}function Ee(e){const t=[e];let i=m.themes[e]||{};do i.$extend&&!i.$resetCss?(t.push(i.$extend),i=m.themes[i.$extend]||{}):i=null;while(i);return t.map(o=>`v-popper--theme-${o}`)}function J(e){const t=[e];let i=m.themes[e]||{};do i.$extend?(t.push(i.$extend),i=m.themes[i.$extend]||{}):i=null;while(i);return t}var Dt="";let T=!1;if(typeof window!="undefined"){T=!1;try{const e=Object.defineProperty({},"passive",{get(){T=!0}});window.addEventListener("test",null,e)}catch{}}let Q=!1;typeof window!="undefined"&&typeof navigator!="undefined"&&(Q=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream);const R=["auto","top","bottom","left","right"].reduce((e,t)=>e.concat([t,`${t}-start`,`${t}-end`]),[]),L={hover:"mouseenter",focus:"focus",click:"click",touch:"touchstart"},x={hover:"mouseleave",focus:"blur",click:"click",touch:"touchend"};function Z(e,t){const i=e.indexOf(t);i!==-1&&e.splice(i,1)}function D(){return new Promise(e=>requestAnimationFrame(()=>{requestAnimationFrame(e)}))}const v=[];let C=null;const ee={};function te(e){let t=ee[e];return t||(t=ee[e]=[]),t}let B=function(){};typeof window!="undefined"&&(B=window.Element);function a(e){return function(){const t=this.$props;return S(t.theme,e)}}const F="__floating-vue__popper";var I=()=>({name:"VPopper",props:{theme:{type:String,required:!0},targetNodes:{type:Function,required:!0},referenceNode:{type:Function,required:!0},popperNode:{type:Function,required:!0},shown:{type:Boolean,default:!1},showGroup:{type:String,default:null},ariaId:{default:null},disabled:{type:Boolean,default:a("disabled")},positioningDisabled:{type:Boolean,default:a("positioningDisabled")},placement:{type:String,default:a("placement"),validator:e=>R.includes(e)},delay:{type:[String,Number,Object],default:a("delay")},distance:{type:[Number,String],default:a("distance")},skidding:{type:[Number,String],default:a("skidding")},triggers:{type:Array,default:a("triggers")},showTriggers:{type:[Array,Function],default:a("showTriggers")},hideTriggers:{type:[Array,Function],default:a("hideTriggers")},popperTriggers:{type:Array,default:a("popperTriggers")},popperShowTriggers:{type:[Array,Function],default:a("popperShowTriggers")},popperHideTriggers:{type:[Array,Function],default:a("popperHideTriggers")},container:{type:[String,Object,B,Boolean],default:a("container")},boundary:{type:[String,B],default:a("boundary")},strategy:{type:String,validator:e=>["absolute","fixed"].includes(e),default:a("strategy")},autoHide:{type:[Boolean,Function],default:a("autoHide")},hideParents:{type:[Boolean],default:a("hideParents")},handleResize:{type:Boolean,default:a("handleResize")},instantMove:{type:Boolean,default:a("instantMove")},eagerMount:{type:Boolean,default:a("eagerMount")},popperClass:{type:[String,Array,Object],default:a("popperClass")},computeTransformOrigin:{type:Boolean,default:a("computeTransformOrigin")},autoMinSize:{type:Boolean,default:a("autoMinSize")},autoSize:{type:[Boolean,String],default:a("autoSize")},autoMaxSize:{type:Boolean,default:a("autoMaxSize")},autoBoundaryMaxSize:{type:Boolean,default:a("autoBoundaryMaxSize")},preventOverflow:{type:Boolean,default:a("preventOverflow")},overflowPadding:{type:[Number,String],default:a("overflowPadding")},arrowPadding:{type:[Number,String],default:a("arrowPadding")},arrowOverflow:{type:Boolean,default:a("arrowOverflow")},flip:{type:Boolean,default:a("flip")},shift:{type:Boolean,default:a("shift")},shiftCrossAxis:{type:Boolean,default:a("shiftCrossAxis")},noAutoFocus:{type:Boolean,default:a("noAutoFocus")}},provide(){return{[F]:{parentPopper:this}}},inject:{[F]:{default:null}},data(){return{isShown:!1,isMounted:!1,skipTransition:!1,classes:{showFrom:!1,showTo:!1,hideFrom:!1,hideTo:!0},result:{x:0,y:0,placement:"",strategy:this.strategy,arrow:{x:0,y:0,centerOffset:0},transformOrigin:null},shownChildren:new Set,lastAutoHide:!0}},computed:{popperId(){return this.ariaId!=null?this.ariaId:this.randomId},shouldMountContent(){return this.eagerMount||this.isMounted},slotData(){return{popperId:this.popperId,isShown:this.isShown,shouldMountContent:this.shouldMountContent,skipTransition:this.skipTransition,autoHide:typeof this.autoHide=="function"?this.lastAutoHide:this.autoHide,show:this.show,hide:this.hide,handleResize:this.handleResize,onResize:this.onResize,classes:{...this.classes,popperClass:this.popperClass},result:this.positioningDisabled?null:this.result}},parentPopper(){var e;return(e=this[F])==null?void 0:e.parentPopper},hasPopperShowTriggerHover(){var e,t;return((e=this.popperTriggers)==null?void 0:e.includes("hover"))||((t=this.popperShowTriggers)==null?void 0:t.includes("hover"))}},watch:{shown:"$_autoShowHide",disabled(e){e?this.dispose():this.init()},async container(){this.isShown&&(this.$_ensureTeleport(),await this.$_computePosition())},...["triggers","positioningDisabled"].reduce((e,t)=>(e[t]="$_refreshListeners",e),{}),...["placement","distance","skidding","boundary","strategy","overflowPadding","arrowPadding","preventOverflow","shift","shiftCrossAxis","flip"].reduce((e,t)=>(e[t]="$_computePosition",e),{})},created(){this.$_isDisposed=!0,this.randomId=`popper_${[Math.random(),Date.now()].map(e=>e.toString(36).substring(2,10)).join("_")}`,this.autoMinSize&&console.warn('[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.'),this.autoMaxSize&&console.warn("[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.")},mounted(){this.init(),this.$_detachPopperNode()},activated(){this.$_autoShowHide()},deactivated(){this.hide()},beforeDestroy(){this.dispose()},methods:{show({event:e=null,skipDelay:t=!1,force:i=!1}={}){var o,s;((o=this.parentPopper)==null?void 0:o.lockedChild)&&this.parentPopper.lockedChild!==this||(this.$_pendingHide=!1,(i||!this.disabled)&&(((s=this.parentPopper)==null?void 0:s.lockedChild)===this&&(this.parentPopper.lockedChild=null),this.$_scheduleShow(e,t),this.$emit("show"),this.$_showFrameLocked=!0,requestAnimationFrame(()=>{this.$_showFrameLocked=!1})),this.$emit("update:shown",!0))},hide({event:e=null,skipDelay:t=!1,skipAiming:i=!1}={}){var o;if(!this.$_hideInProgress){if(this.shownChildren.size>0){this.$_pendingHide=!0;return}if(!i&&this.hasPopperShowTriggerHover&&this.$_isAimingPopper()){this.parentPopper&&(this.parentPopper.lockedChild=this,clearTimeout(this.parentPopper.lockedChildTimer),this.parentPopper.lockedChildTimer=setTimeout(()=>{this.parentPopper.lockedChild===this&&(this.parentPopper.lockedChild.hide({skipDelay:t}),this.parentPopper.lockedChild=null)},1e3));return}((o=this.parentPopper)==null?void 0:o.lockedChild)===this&&(this.parentPopper.lockedChild=null),this.$_pendingHide=!1,this.$_scheduleHide(e,t),this.$emit("hide"),this.$emit("update:shown",!1)}},init(){!this.$_isDisposed||(this.$_isDisposed=!1,this.isMounted=!1,this.$_events=[],this.$_preventShow=!1,this.$_referenceNode=this.referenceNode(),this.$_targetNodes=this.targetNodes().filter(e=>e.nodeType===e.ELEMENT_NODE),this.$_popperNode=this.popperNode(),this.$_innerNode=this.$_popperNode.querySelector(".v-popper__inner"),this.$_arrowNode=this.$_popperNode.querySelector(".v-popper__arrow-container"),this.$_swapTargetAttrs("title","data-original-title"),this.$_detachPopperNode(),this.triggers.length&&this.$_addEventListeners(),this.shown&&this.show())},dispose(){this.$_isDisposed||(this.$_isDisposed=!0,this.$_removeEventListeners(),this.hide({skipDelay:!0}),this.$_detachPopperNode(),this.isMounted=!1,this.isShown=!1,this.$_updateParentShownChildren(!1),this.$_swapTargetAttrs("data-original-title","title"),this.$emit("dispose"))},async onResize(){this.isShown&&(await this.$_computePosition(),this.$emit("resize"))},async $_computePosition(){var o;if(this.$_isDisposed||this.positioningDisabled)return;const e={strategy:this.strategy,middleware:[]};(this.distance||this.skidding)&&e.middleware.push(_.offset({mainAxis:this.distance,crossAxis:this.skidding}));const t=this.placement.startsWith("auto");if(t?e.middleware.push(_.autoPlacement({alignment:(o=this.placement.split("-")[1])!=null?o:""})):e.placement=this.placement,this.preventOverflow&&(this.shift&&e.middleware.push(_.shift({padding:this.overflowPadding,boundary:this.boundary,crossAxis:this.shiftCrossAxis})),!t&&this.flip&&e.middleware.push(_.flip({padding:this.overflowPadding,boundary:this.boundary}))),e.middleware.push(_.arrow({element:this.$_arrowNode,padding:this.arrowPadding})),this.arrowOverflow&&e.middleware.push({name:"arrowOverflow",fn:({placement:s,rects:n,middlewareData:r})=>{let p;const{centerOffset:l}=r.arrow;return s.startsWith("top")||s.startsWith("bottom")?p=Math.abs(l)>n.reference.width/2:p=Math.abs(l)>n.reference.height/2,{data:{overflow:p}}}}),this.autoMinSize||this.autoSize){const s=this.autoSize?this.autoSize:this.autoMinSize?"min":null;e.middleware.push({name:"autoSize",fn:({rects:n,placement:r,middlewareData:p})=>{var h;if((h=p.autoSize)!=null&&h.skip)return{};let l,u;return r.startsWith("top")||r.startsWith("bottom")?l=n.reference.width:u=n.reference.height,this.$_innerNode.style[s==="min"?"minWidth":s==="max"?"maxWidth":"width"]=l!=null?`${l}px`:null,this.$_innerNode.style[s==="min"?"minHeight":s==="max"?"maxHeight":"height"]=u!=null?`${u}px`:null,{data:{skip:!0},reset:{rects:!0}}}})}(this.autoMaxSize||this.autoBoundaryMaxSize)&&(this.$_innerNode.style.maxWidth=null,this.$_innerNode.style.maxHeight=null,e.middleware.push(_.size({boundary:this.boundary,padding:this.overflowPadding,apply:({width:s,height:n})=>{this.$_innerNode.style.maxWidth=s!=null?`${s}px`:null,this.$_innerNode.style.maxHeight=n!=null?`${n}px`:null}})));const i=await _.computePosition(this.$_referenceNode,this.$_popperNode,e);Object.assign(this.result,{x:i.x,y:i.y,placement:i.placement,strategy:i.strategy,arrow:{...i.middlewareData.arrow,...i.middlewareData.arrowOverflow}})},$_scheduleShow(e=null,t=!1){if(this.$_updateParentShownChildren(!0),this.$_hideInProgress=!1,clearTimeout(this.$_scheduleTimer),C&&this.instantMove&&C.instantMove&&C!==this.parentPopper){C.$_applyHide(!0),this.$_applyShow(!0);return}t?this.$_applyShow():this.$_scheduleTimer=setTimeout(this.$_applyShow.bind(this),this.$_computeDelay("show"))},$_scheduleHide(e=null,t=!1){if(this.shownChildren.size>0){this.$_pendingHide=!0;return}this.$_updateParentShownChildren(!1),this.$_hideInProgress=!0,clearTimeout(this.$_scheduleTimer),this.isShown&&(C=this),t?this.$_applyHide():this.$_scheduleTimer=setTimeout(this.$_applyHide.bind(this),this.$_computeDelay("hide"))},$_computeDelay(e){const t=this.delay;return parseInt(t&&t[e]||t||0)},async $_applyShow(e=!1){clearTimeout(this.$_disposeTimer),clearTimeout(this.$_scheduleTimer),this.skipTransition=e,!this.isShown&&(this.$_ensureTeleport(),await D(),await this.$_computePosition(),await this.$_applyShowEffect(),this.positioningDisabled||this.$_registerEventListeners([..._.getScrollParents(this.$_referenceNode),..._.getScrollParents(this.$_popperNode)],"scroll",()=>{this.$_computePosition()}))},async $_applyShowEffect(){if(this.$_hideInProgress)return;if(this.computeTransformOrigin){const t=this.$_referenceNode.getBoundingClientRect(),i=this.$_popperNode.querySelector(".v-popper__wrapper"),o=i.parentNode.getBoundingClientRect(),s=t.x+t.width/2-(o.left+i.offsetLeft),n=t.y+t.height/2-(o.top+i.offsetTop);this.result.transformOrigin=`${s}px ${n}px`}this.isShown=!0,this.$_applyAttrsToTarget({"aria-describedby":this.popperId,"data-popper-shown":""});const e=this.showGroup;if(e){let t;for(let i=0;i<v.length;i++)t=v[i],t.showGroup!==e&&(t.hide(),t.$emit("close-group"))}v.push(this),document.body.classList.add("v-popper--some-open");for(const t of J(this.theme))te(t).push(this),document.body.classList.add(`v-popper--some-open--${t}`);this.$emit("apply-show"),this.classes.showFrom=!0,this.classes.showTo=!1,this.classes.hideFrom=!1,this.classes.hideTo=!1,await D(),this.classes.showFrom=!1,this.classes.showTo=!0,this.noAutoFocus||this.$_popperNode.focus()},async $_applyHide(e=!1){if(this.shownChildren.size>0){this.$_pendingHide=!0,this.$_hideInProgress=!1;return}if(clearTimeout(this.$_scheduleTimer),!this.isShown)return;this.skipTransition=e,Z(v,this),v.length===0&&document.body.classList.remove("v-popper--some-open");for(const i of J(this.theme)){const o=te(i);Z(o,this),o.length===0&&document.body.classList.remove(`v-popper--some-open--${i}`)}C===this&&(C=null),this.isShown=!1,this.$_applyAttrsToTarget({"aria-describedby":void 0,"data-popper-shown":void 0}),clearTimeout(this.$_disposeTimer);const t=S(this.theme,"disposeTimeout");t!==null&&(this.$_disposeTimer=setTimeout(()=>{this.$_popperNode&&(this.$_detachPopperNode(),this.isMounted=!1)},t)),this.$_removeEventListeners("scroll"),this.$emit("apply-hide"),this.classes.showFrom=!1,this.classes.showTo=!1,this.classes.hideFrom=!0,this.classes.hideTo=!1,await D(),this.classes.hideFrom=!1,this.classes.hideTo=!0},$_autoShowHide(){this.shown?this.show():this.hide()},$_ensureTeleport(){if(this.$_isDisposed)return;let e=this.container;if(typeof e=="string"?e=window.document.querySelector(e):e===!1&&(e=this.$_targetNodes[0].parentNode),!e)throw new Error("No container for popover: "+this.container);e.appendChild(this.$_popperNode),this.isMounted=!0},$_addEventListeners(){const e=i=>{this.isShown&&!this.$_hideInProgress||(i.usedByTooltip=!0,!this.$_preventShow&&this.show({event:i}))};this.$_registerTriggerListeners(this.$_targetNodes,L,this.triggers,this.showTriggers,e),this.$_registerTriggerListeners([this.$_popperNode],L,this.popperTriggers,this.popperShowTriggers,e);const t=i=>o=>{o.usedByTooltip||this.hide({event:o,skipAiming:i})};this.$_registerTriggerListeners(this.$_targetNodes,x,this.triggers,this.hideTriggers,t(!1)),this.$_registerTriggerListeners([this.$_popperNode],x,this.popperTriggers,this.popperHideTriggers,t(!0))},$_registerEventListeners(e,t,i){this.$_events.push({targetNodes:e,eventType:t,handler:i}),e.forEach(o=>o.addEventListener(t,i,T?{passive:!0}:void 0))},$_registerTriggerListeners(e,t,i,o,s){let n=i;o!=null&&(n=typeof o=="function"?o(n):o),n.forEach(r=>{const p=t[r];p&&this.$_registerEventListeners(e,p,s)})},$_removeEventListeners(e){const t=[];this.$_events.forEach(i=>{const{targetNodes:o,eventType:s,handler:n}=i;!e||e===s?o.forEach(r=>r.removeEventListener(s,n)):t.push(i)}),this.$_events=t},$_refreshListeners(){this.$_isDisposed||(this.$_removeEventListeners(),this.$_addEventListeners())},$_handleGlobalClose(e,t=!1){this.$_showFrameLocked||(this.hide({event:e}),e.closePopover?this.$emit("close-directive"):this.$emit("auto-hide"),t&&(this.$_preventShow=!0,setTimeout(()=>{this.$_preventShow=!1},300)))},$_detachPopperNode(){this.$_popperNode.parentNode&&this.$_popperNode.parentNode.removeChild(this.$_popperNode)},$_swapTargetAttrs(e,t){for(const i of this.$_targetNodes){const o=i.getAttribute(e);o&&(i.removeAttribute(e),i.setAttribute(t,o))}},$_applyAttrsToTarget(e){for(const t of this.$_targetNodes)for(const i in e){const o=e[i];o==null?t.removeAttribute(i):t.setAttribute(i,o)}},$_updateParentShownChildren(e){let t=this.parentPopper;for(;t;)e?t.shownChildren.add(this.randomId):(t.shownChildren.delete(this.randomId),t.$_pendingHide&&t.hide()),t=t.parentPopper},$_isAimingPopper(){const e=this.$el.getBoundingClientRect();if(z>=e.left&&z<=e.right&&N>=e.top&&N<=e.bottom){const t=this.$_popperNode.getBoundingClientRect(),i=z-w,o=N-y,n=t.left+t.width/2-w+(t.top+t.height/2)-y+t.width+t.height,r=w+i*n,p=y+o*n;return M(w,y,r,p,t.left,t.top,t.left,t.bottom)||M(w,y,r,p,t.left,t.top,t.right,t.top)||M(w,y,r,p,t.right,t.top,t.right,t.bottom)||M(w,y,r,p,t.left,t.bottom,t.right,t.bottom)}return!1}},render(){return this.$scopedSlots.default(this.slotData)[0]}});typeof document!="undefined"&&typeof window!="undefined"&&(Q?(document.addEventListener("touchstart",ie,T?{passive:!0,capture:!0}:!0),document.addEventListener("touchend",He,T?{passive:!0,capture:!0}:!0)):(window.addEventListener("mousedown",ie,!0),window.addEventListener("click",Oe,!0)),window.addEventListener("resize",Le));function ie(e){for(let t=0;t<v.length;t++){const i=v[t];try{const o=i.popperNode();i.$_mouseDownContains=o.contains(e.target)}catch{}}}function Oe(e){oe(e)}function He(e){oe(e,!0)}function oe(e,t=!1){const i={};for(let o=v.length-1;o>=0;o--){const s=v[o];if(!s.hideParents)return;try{const n=s.$_containsGlobalTarget=ke(s,e);s.$_pendingHide=!1,requestAnimationFrame(()=>{if(s.$_pendingHide=!1,!i[s.randomId]&&se(s,n,e)){if(s.$_handleGlobalClose(e,t),!e.closeAllPopover&&e.closePopover&&n){let p=s.parentPopper;for(;p;)i[p.randomId]=!0,p=p.parentPopper;return}let r=s.parentPopper;for(;r&&se(r,r.$_containsGlobalTarget,e);){r.$_handleGlobalClose(e,t);r=r.parentPopper}}})}catch{}}}function ke(e,t){const i=e.popperNode();return e.$_mouseDownContains||i.contains(t.target)}function se(e,t,i){return i.closeAllPopover||i.closePopover&&t||Re(e,i)&&!t}function Re(e,t){if(typeof e.autoHide=="function"){const i=e.autoHide(t);return e.lastAutoHide=i,i}return e.autoHide}function Le(e){for(let t=0;t<v.length;t++)v[t].$_computePosition(e)}function xe(){for(let e=0;e<v.length;e++)v[e].hide()}let w=0,y=0,z=0,N=0;typeof window!="undefined"&&window.addEventListener("mousemove",e=>{w=z,y=N,z=e.clientX,N=e.clientY},T?{passive:!0}:void 0);function M(e,t,i,o,s,n,r,p){const l=((r-s)*(t-n)-(p-n)*(e-s))/((p-n)*(i-e)-(r-s)*(o-t)),u=((i-e)*(t-n)-(o-t)*(e-s))/((p-n)*(i-e)-(r-s)*(o-t));return l>=0&&l<=1&&u>=0&&u<=1}function De(){var e=window.navigator.userAgent,t=e.indexOf("MSIE ");if(t>0)return parseInt(e.substring(t+5,e.indexOf(".",t)),10);var i=e.indexOf("Trident/");if(i>0){var o=e.indexOf("rv:");return parseInt(e.substring(o+3,e.indexOf(".",o)),10)}var s=e.indexOf("Edge/");return s>0?parseInt(e.substring(s+5,e.indexOf(".",s)),10):-1}var A;function V(){V.init||(V.init=!0,A=De()!==-1)}var Be={name:"ResizeObserver",props:{emitOnMount:{type:Boolean,default:!1},ignoreWidth:{type:Boolean,default:!1},ignoreHeight:{type:Boolean,default:!1}},mounted:function(){var t=this;V(),this.$nextTick(function(){t._w=t.$el.offsetWidth,t._h=t.$el.offsetHeight,t.emitOnMount&&t.emitSize()});var i=document.createElement("object");this._resizeObject=i,i.setAttribute("aria-hidden","true"),i.setAttribute("tabindex",-1),i.onload=this.addResizeHandlers,i.type="text/html",A&&this.$el.appendChild(i),i.data="about:blank",A||this.$el.appendChild(i)},beforeDestroy:function(){this.removeResizeHandlers()},methods:{compareAndNotify:function(){(!this.ignoreWidth&&this._w!==this.$el.offsetWidth||!this.ignoreHeight&&this._h!==this.$el.offsetHeight)&&(this._w=this.$el.offsetWidth,this._h=this.$el.offsetHeight,this.emitSize())},emitSize:function(){this.$emit("notify",{width:this._w,height:this._h})},addResizeHandlers:function(){this._resizeObject.contentDocument.defaultView.addEventListener("resize",this.compareAndNotify),this.compareAndNotify()},removeResizeHandlers:function(){this._resizeObject&&this._resizeObject.onload&&(!A&&this._resizeObject.contentDocument&&this._resizeObject.contentDocument.defaultView.removeEventListener("resize",this.compareAndNotify),this.$el.removeChild(this._resizeObject),this._resizeObject.onload=null,this._resizeObject=null)}}};function Fe(e,t,i,o,s,n,r,p,l,u){typeof r!="boolean"&&(l=p,p=r,r=!1);var h=typeof i=="function"?i.options:i;e&&e.render&&(h.render=e.render,h.staticRenderFns=e.staticRenderFns,h._compiled=!0,s&&(h.functional=!0)),o&&(h._scopeId=o);var c;if(n?(c=function($){$=$||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!$&&typeof __VUE_SSR_CONTEXT__!="undefined"&&($=__VUE_SSR_CONTEXT__),t&&t.call(this,l($)),$&&$._registeredComponents&&$._registeredComponents.add(n)},h._ssrRegister=c):t&&(c=r?function(g){t.call(this,u(g,this.$root.$options.shadowRoot))}:function(g){t.call(this,p(g))}),c)if(h.functional){var f=h.render;h.render=function($,ze){return c.call(ze),f($,ze)}}else{var P=h.beforeCreate;h.beforeCreate=P?[].concat(P,c):[c]}return i}var Ie=Be,ne=function(){var t=this,i=t.$createElement,o=t._self._c||i;return o("div",{staticClass:"resize-observer",attrs:{tabindex:"-1"}})},Ve=[];ne._withStripped=!0;var je=void 0,We="data-v-8859cc6c",Ge=void 0,qe=!1,j=Fe({render:ne,staticRenderFns:Ve},je,Ie,We,qe,Ge,!1,void 0,void 0,void 0);function Xe(e){e.component("resize-observer",j),e.component("ResizeObserver",j)}var Ye={version:"1.0.1",install:Xe},E=null;typeof window!="undefined"?E=window.Vue:typeof global!="undefined"&&(E=global.Vue),E&&E.use(Ye);var W={computed:{themeClass(){return Ee(this.theme)}}},Ue={name:"VPopperContent",components:{ResizeObserver:j},mixins:[W],props:{popperId:String,theme:String,shown:Boolean,mounted:Boolean,skipTransition:Boolean,autoHide:Boolean,handleResize:Boolean,classes:Object,result:Object},methods:{toPx(e){return e!=null&&!isNaN(e)?`${e}px`:null}}},Ke=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{ref:"popover",staticClass:"v-popper__popper",class:[e.themeClass,e.classes.popperClass,{"v-popper__popper--shown":e.shown,"v-popper__popper--hidden":!e.shown,"v-popper__popper--show-from":e.classes.showFrom,"v-popper__popper--show-to":e.classes.showTo,"v-popper__popper--hide-from":e.classes.hideFrom,"v-popper__popper--hide-to":e.classes.hideTo,"v-popper__popper--skip-transition":e.skipTransition,"v-popper__popper--arrow-overflow":e.result&&e.result.arrow.overflow,"v-popper__popper--no-positioning":!e.result}],style:e.result?{position:e.result.strategy,transform:"translate3d("+Math.round(e.result.x)+"px,"+Math.round(e.result.y)+"px,0)"}:void 0,attrs:{id:e.popperId,"aria-hidden":e.shown?"false":"true",tabindex:e.autoHide?0:void 0,"data-popper-placement":e.result?e.result.placement:void 0},on:{keyup:function(o){if(!o.type.indexOf("key")&&e._k(o.keyCode,"esc",27,o.key,["Esc","Escape"]))return null;e.autoHide&&e.$emit("hide")}}},[i("div",{staticClass:"v-popper__backdrop",on:{click:function(o){e.autoHide&&e.$emit("hide")}}}),i("div",{staticClass:"v-popper__wrapper",style:e.result?{transformOrigin:e.result.transformOrigin}:void 0},[i("div",{ref:"inner",staticClass:"v-popper__inner"},[e.mounted?[i("div",[e._t("default")],2),e.handleResize?i("ResizeObserver",{on:{notify:function(o){return e.$emit("resize",o)}}}):e._e()]:e._e()],2),i("div",{ref:"arrow",staticClass:"v-popper__arrow-container",style:e.result?{left:e.toPx(e.result.arrow.x),top:e.toPx(e.result.arrow.y)}:void 0},[i("div",{staticClass:"v-popper__arrow-outer"}),i("div",{staticClass:"v-popper__arrow-inner"})])])])},Je=[],Bt="";function b(e,t,i,o,s,n,r,p){var l=typeof e=="function"?e.options:e;t&&(l.render=t,l.staticRenderFns=i,l._compiled=!0),o&&(l.functional=!0),n&&(l._scopeId="data-v-"+n);var u;if(r?(u=function(f){f=f||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!f&&typeof __VUE_SSR_CONTEXT__!="undefined"&&(f=__VUE_SSR_CONTEXT__),s&&s.call(this,f),f&&f._registeredComponents&&f._registeredComponents.add(r)},l._ssrRegister=u):s&&(u=p?function(){s.call(this,(l.functional?this.parent:this).$root.$options.shadowRoot)}:s),u)if(l.functional){l._injectStyles=u;var h=l.render;l.render=function(P,g){return u.call(g),h(P,g)}}else{var c=l.beforeCreate;l.beforeCreate=c?[].concat(c,u):[u]}return{exports:e,options:l}}const re={};var Qe=b(Ue,Ke,Je,!1,Ze,null,null,null);function Ze(e){for(let t in re)this[t]=re[t]}var G=function(){return Qe.exports}(),O={methods:{show(...e){return this.$refs.popper.show(...e)},hide(...e){return this.$refs.popper.hide(...e)},dispose(...e){return this.$refs.popper.dispose(...e)},onResize(...e){return this.$refs.popper.onResize(...e)}}},et={name:"VPopperWrapper",components:{Popper:I(),PopperContent:G},mixins:[O,W],inheritAttrs:!1,props:{theme:{type:String,default(){return this.$options.vPopperTheme}}},methods:{getTargetNodes(){return Array.from(this.$refs.reference.children).filter(e=>e!==this.$refs.popperContent.$el)}}},tt=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("Popper",e._g(e._b({ref:"popper",attrs:{theme:e.theme,"target-nodes":e.getTargetNodes,"reference-node":function(){return e.$refs.reference},"popper-node":function(){return e.$refs.popperContent.$el}},scopedSlots:e._u([{key:"default",fn:function(o){var s=o.popperId,n=o.isShown,r=o.shouldMountContent,p=o.skipTransition,l=o.autoHide,u=o.show,h=o.hide,c=o.handleResize,f=o.onResize,P=o.classes,g=o.result;return[i("div",{ref:"reference",staticClass:"v-popper",class:[e.themeClass,{"v-popper--shown":n}]},[e._t("default",null,{shown:n,show:u,hide:h}),i("PopperContent",{ref:"popperContent",attrs:{"popper-id":s,theme:e.theme,shown:n,mounted:r,"skip-transition":p,"auto-hide":l,"handle-resize":c,classes:P,result:g},on:{hide:h,resize:f}},[e._t("popper",null,{shown:n,hide:h})],2)],2)]}}],null,!0)},"Popper",e.$attrs,!1),e.$listeners))},it=[];const ae={};var ot=b(et,tt,it,!1,st,null,null,null);function st(e){for(let t in ae)this[t]=ae[t]}var H=function(){return ot.exports}(),nt={...H,name:"VDropdown",vPopperTheme:"dropdown"},Ft="";let rt,at;const pe={};var pt=b(nt,rt,at,!1,lt,null,null,null);function lt(e){for(let t in pe)this[t]=pe[t]}var q=function(){return pt.exports}(),dt={...H,name:"VMenu",vPopperTheme:"menu"};let ht,ut;const le={};var ct=b(dt,ht,ut,!1,ft,null,null,null);function ft(e){for(let t in le)this[t]=le[t]}var X=function(){return ct.exports}(),_t={...H,name:"VTooltip",vPopperTheme:"tooltip"},It="";let vt,mt;const de={};var gt=b(_t,vt,mt,!1,$t,null,null,null);function $t(e){for(let t in de)this[t]=de[t]}var Y=function(){return gt.exports}(),wt={name:"VTooltipDirective",components:{Popper:I(),PopperContent:G},mixins:[O],inheritAttrs:!1,props:{theme:{type:String,default:"tooltip"},html:{type:Boolean,default(){return S(this.theme,"html")}},content:{type:[String,Number,Function],default:null},loadingContent:{type:String,default(){return S(this.theme,"loadingContent")}}},data(){return{asyncContent:null}},computed:{isContentAsync(){return typeof this.content=="function"},loading(){return this.isContentAsync&&this.asyncContent==null},finalContent(){return this.isContentAsync?this.loading?this.loadingContent:this.asyncContent:this.content}},watch:{content:{handler(){this.fetchContent(!0)},immediate:!0},async finalContent(e){await this.$nextTick(),this.$refs.popper.onResize()}},created(){this.$_fetchId=0},methods:{fetchContent(e){if(typeof this.content=="function"&&this.$_isShown&&(e||!this.$_loading&&this.asyncContent==null)){this.asyncContent=null,this.$_loading=!0;const t=++this.$_fetchId,i=this.content(this);i.then?i.then(o=>this.onResult(t,o)):this.onResult(t,i)}},onResult(e,t){e===this.$_fetchId&&(this.$_loading=!1,this.asyncContent=t)},onShow(){this.$_isShown=!0,this.fetchContent()},onHide(){this.$_isShown=!1}}},yt=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("Popper",e._g(e._b({ref:"popper",attrs:{theme:e.theme,"popper-node":function(){return e.$refs.popperContent.$el}},on:{"apply-show":e.onShow,"apply-hide":e.onHide},scopedSlots:e._u([{key:"default",fn:function(o){var s=o.popperId,n=o.isShown,r=o.shouldMountContent,p=o.skipTransition,l=o.autoHide,u=o.hide,h=o.handleResize,c=o.onResize,f=o.classes,P=o.result;return[i("PopperContent",{ref:"popperContent",class:{"v-popper--tooltip-loading":e.loading},attrs:{"popper-id":s,theme:e.theme,shown:n,mounted:r,"skip-transition":p,"auto-hide":l,"handle-resize":h,classes:f,result:P},on:{hide:u,resize:c}},[e.html?i("div",{domProps:{innerHTML:e._s(e.finalContent)}}):i("div",{domProps:{textContent:e._s(e.finalContent)}})])]}}])},"Popper",e.$attrs,!1),e.$listeners))},Pt=[];const he={};var Tt=b(wt,yt,Pt,!1,Ct,null,null,null);function Ct(e){for(let t in he)this[t]=he[t]}var ue=function(){return Tt.exports}();const ce="v-popper--has-tooltip";function St(e,t){let i=e.placement;if(!i&&t)for(const o of R)t[o]&&(i=o);return i||(i=S(e.theme||"tooltip","placement")),i}function fe(e,t,i){let o;const s=typeof t;return s==="string"?o={content:t}:t&&s==="object"?o=t:o={content:!1},o.placement=St(o,i),o.targetNodes=()=>[e],o.referenceNode=()=>e,o}function _e(e,t,i){const o=fe(e,t,i),s=e.$_popper=new Ae.default({mixins:[O],data(){return{options:o}},render(r){const{theme:p,html:l,content:u,loadingContent:h,...c}=this.options;return r(ue,{props:{theme:p,html:l,content:u,loadingContent:h},attrs:c,ref:"popper"})},devtools:{hide:!0}}),n=document.createElement("div");return document.body.appendChild(n),s.$mount(n),e.classList&&e.classList.add(ce),s}function U(e){e.$_popper&&(e.$_popper.$destroy(),delete e.$_popper,delete e.$_popperOldShown),e.classList&&e.classList.remove(ce)}function ve(e,{value:t,oldValue:i,modifiers:o}){const s=fe(e,t,o);if(!s.content||S(s.theme||"tooltip","disabled"))U(e);else{let n;e.$_popper?(n=e.$_popper,n.options=s):n=_e(e,t,o),typeof t.shown!="undefined"&&t.shown!==e.$_popperOldShown&&(e.$_popperOldShown=t.shown,t.shown?n.show():n.hide())}}var me={bind:ve,update:ve,unbind(e){U(e)}};function ge(e){e.addEventListener("click",we),e.addEventListener("touchstart",ye,T?{passive:!0}:!1)}function $e(e){e.removeEventListener("click",we),e.removeEventListener("touchstart",ye),e.removeEventListener("touchend",Pe),e.removeEventListener("touchcancel",Te)}function we(e){const t=e.currentTarget;e.closePopover=!t.$_vclosepopover_touch,e.closeAllPopover=t.$_closePopoverModifiers&&!!t.$_closePopoverModifiers.all}function ye(e){if(e.changedTouches.length===1){const t=e.currentTarget;t.$_vclosepopover_touch=!0;const i=e.changedTouches[0];t.$_vclosepopover_touchPoint=i,t.addEventListener("touchend",Pe),t.addEventListener("touchcancel",Te)}}function Pe(e){const t=e.currentTarget;if(t.$_vclosepopover_touch=!1,e.changedTouches.length===1){const i=e.changedTouches[0],o=t.$_vclosepopover_touchPoint;e.closePopover=Math.abs(i.screenY-o.screenY)<20&&Math.abs(i.screenX-o.screenX)<20,e.closeAllPopover=t.$_closePopoverModifiers&&!!t.$_closePopoverModifiers.all}}function Te(e){const t=e.currentTarget;t.$_vclosepopover_touch=!1}var Ce={bind(e,{value:t,modifiers:i}){e.$_closePopoverModifiers=i,(typeof t=="undefined"||t)&&ge(e)},update(e,{value:t,oldValue:i,modifiers:o}){e.$_closePopoverModifiers=o,t!==i&&(typeof t=="undefined"||t?ge(e):$e(e))},unbind(e){$e(e)}};const bt=m,zt=me,Nt=Ce,Mt=q,At=X,Et=I,Ot=G,Ht=O,kt=H,Rt=W,Lt=Y,xt=ue;function Se(e,t={}){e.$_vTooltipInstalled||(e.$_vTooltipInstalled=!0,K(m,t),e.directive("tooltip",me),e.directive("close-popper",Ce),e.component("v-tooltip",Y),e.component("VTooltip",Y),e.component("v-dropdown",q),e.component("VDropdown",q),e.component("v-menu",X),e.component("VMenu",X))}const be={version:"1.0.1-dev.1",install:Se,options:m};let k=null;typeof window!="undefined"?k=window.Vue:typeof global!="undefined"&&(k=global.Vue),k&&k.use(be),d.Dropdown=Mt,d.HIDE_EVENT_MAP=x,d.Menu=At,d.Popper=Et,d.PopperContent=Ot,d.PopperMethods=Ht,d.PopperWrapper=kt,d.SHOW_EVENT_MAP=L,d.ThemeClass=Rt,d.Tooltip=Lt,d.TooltipDirective=xt,d.VClosePopper=Nt,d.VTooltip=zt,d.createTooltip=_e,d.default=be,d.destroyTooltip=U,d.hideAllPoppers=xe,d.install=Se,d.options=bt,d.placements=R,Object.defineProperties(d,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
