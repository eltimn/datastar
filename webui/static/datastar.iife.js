var Datastar=function(L){"use strict";function C(t){return t instanceof HTMLElement||t instanceof SVGElement?t:null}function $(){throw new Error("Cycle detected")}function De(){throw new Error("Computed cannot have side-effects")}const Ie=Symbol.for("preact-signals"),_=1,A=2,M=4,P=8,N=16,b=32;function x(){H++}function D(){if(H>1){H--;return}let t,e=!1;for(;k!==void 0;){let r=k;for(k=void 0,G++;r!==void 0;){const n=r._nextBatchedEffect;if(r._nextBatchedEffect=void 0,r._flags&=~A,!(r._flags&P)&&oe(r))try{r._callback()}catch(o){e||(t=o,e=!0)}r=n}}if(G=0,H--,e)throw t}function Fe(t){if(H>0)return t();x();try{return t()}finally{D()}}let c,k,H=0,G=0,I=0;function re(t){if(c===void 0)return;let e=t._node;if(e===void 0||e._target!==c)return e={_version:0,_source:t,_prevSource:c._sources,_nextSource:void 0,_target:c,_prevTarget:void 0,_nextTarget:void 0,_rollbackNode:e},c._sources!==void 0&&(c._sources._nextSource=e),c._sources=e,t._node=e,c._flags&b&&t._subscribe(e),e;if(e._version===-1)return e._version=0,e._nextSource!==void 0&&(e._nextSource._prevSource=e._prevSource,e._prevSource!==void 0&&(e._prevSource._nextSource=e._nextSource),e._prevSource=c._sources,e._nextSource=void 0,c._sources._nextSource=e,c._sources=e),e}function p(t){this._value=t,this._version=0,this._node=void 0,this._targets=void 0}p.prototype.brand=Ie,p.prototype._refresh=function(){return!0},p.prototype._subscribe=function(t){this._targets!==t&&t._prevTarget===void 0&&(t._nextTarget=this._targets,this._targets!==void 0&&(this._targets._prevTarget=t),this._targets=t)},p.prototype._unsubscribe=function(t){if(this._targets!==void 0){const e=t._prevTarget,r=t._nextTarget;e!==void 0&&(e._nextTarget=r,t._prevTarget=void 0),r!==void 0&&(r._prevTarget=e,t._nextTarget=void 0),t===this._targets&&(this._targets=r)}},p.prototype.subscribe=function(t){const e=this;return W(function(){const r=e.value,n=this._flags&b;this._flags&=~b;try{t(r)}finally{this._flags|=n}})},p.prototype.valueOf=function(){return this.value},p.prototype.toString=function(){return this.value+""},p.prototype.toJSON=function(){return this.value},p.prototype.peek=function(){return this._value},Object.defineProperty(p.prototype,"value",{get(){const t=re(this);return t!==void 0&&(t._version=this._version),this._value},set(t){if(c instanceof y&&De(),t!==this._value){G>100&&$(),this._value=t,this._version++,I++,x();try{for(let e=this._targets;e!==void 0;e=e._nextTarget)e._target._notify()}finally{D()}}}});function ne(t){return new p(t)}function oe(t){for(let e=t._sources;e!==void 0;e=e._nextSource)if(e._source._version!==e._version||!e._source._refresh()||e._source._version!==e._version)return!0;return!1}function se(t){for(let e=t._sources;e!==void 0;e=e._nextSource){const r=e._source._node;if(r!==void 0&&(e._rollbackNode=r),e._source._node=e,e._version=-1,e._nextSource===void 0){t._sources=e;break}}}function ie(t){let e=t._sources,r;for(;e!==void 0;){const n=e._prevSource;e._version===-1?(e._source._unsubscribe(e),n!==void 0&&(n._nextSource=e._nextSource),e._nextSource!==void 0&&(e._nextSource._prevSource=n)):r=e,e._source._node=e._rollbackNode,e._rollbackNode!==void 0&&(e._rollbackNode=void 0),e=n}t._sources=r}function y(t){p.call(this,void 0),this._compute=t,this._sources=void 0,this._globalVersion=I-1,this._flags=M}y.prototype=new p,y.prototype._refresh=function(){if(this._flags&=~A,this._flags&_)return!1;if((this._flags&(M|b))===b||(this._flags&=~M,this._globalVersion===I))return!0;if(this._globalVersion=I,this._flags|=_,this._version>0&&!oe(this))return this._flags&=~_,!0;const t=c;try{se(this),c=this;const e=this._compute();(this._flags&N||this._value!==e||this._version===0)&&(this._value=e,this._flags&=~N,this._version++)}catch(e){this._value=e,this._flags|=N,this._version++}return c=t,ie(this),this._flags&=~_,!0},y.prototype._subscribe=function(t){if(this._targets===void 0){this._flags|=M|b;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._subscribe(e)}p.prototype._subscribe.call(this,t)},y.prototype._unsubscribe=function(t){if(this._targets!==void 0&&(p.prototype._unsubscribe.call(this,t),this._targets===void 0)){this._flags&=~b;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e)}},y.prototype._notify=function(){if(!(this._flags&A)){this._flags|=M|A;for(let t=this._targets;t!==void 0;t=t._nextTarget)t._target._notify()}},y.prototype.peek=function(){if(this._refresh()||$(),this._flags&N)throw this._value;return this._value},Object.defineProperty(y.prototype,"value",{get(){this._flags&_&&$();const t=re(this);if(this._refresh(),t!==void 0&&(t._version=this._version),this._flags&N)throw this._value;return this._value}});function Ve(t){return new y(t)}function ae(t){const e=t._cleanup;if(t._cleanup=void 0,typeof e=="function"){x();const r=c;c=void 0;try{e()}catch(n){throw t._flags&=~_,t._flags|=P,J(t),n}finally{c=r,D()}}}function J(t){for(let e=t._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e);t._compute=void 0,t._sources=void 0,ae(t)}function Be(t){if(c!==this)throw new Error("Out-of-order effect");ie(this),c=t,this._flags&=~_,this._flags&P&&J(this),D()}function R(t){this._compute=t,this._cleanup=void 0,this._sources=void 0,this._nextBatchedEffect=void 0,this._flags=b}R.prototype._callback=function(){const t=this._start();try{if(this._flags&P||this._compute===void 0)return;const e=this._compute();typeof e=="function"&&(this._cleanup=e)}finally{t()}},R.prototype._start=function(){this._flags&_&&$(),this._flags|=_,this._flags&=~P,ae(this),se(this),x();const t=c;return c=this,Be.bind(this,t)},R.prototype._notify=function(){this._flags&A||(this._flags|=A,this._nextBatchedEffect=k,k=this)},R.prototype._dispose=function(){this._flags|=P,this._flags&_||J(this)};function W(t){const e=new R(t);try{e._callback()}catch(r){throw e._dispose(),r}return e._dispose.bind(e)}class le{get value(){return Z(this)}set value(e){Fe(()=>je(this,e))}peek(){return Z(this,{peek:!0})}}const z=t=>Object.assign(new le,Object.entries(t).reduce((e,[r,n])=>{if(["value","peek"].some(o=>o===r))throw new Error(`${r} is a reserved property name`);return typeof n!="object"||n===null||Array.isArray(n)?e[r]=ne(n):e[r]=z(n),e},{})),je=(t,e)=>Object.keys(e).forEach(r=>t[r].value=e[r]),Z=(t,{peek:e=!1}={})=>Object.entries(t).reduce((r,[n,o])=>(o instanceof p?r[n]=e?o.peek():o.value:o instanceof le&&(r[n]=Z(o,{peek:e})),r),{});function ce(t,e){if(typeof e!="object"||Array.isArray(e)||!e)return JSON.parse(JSON.stringify(e));if(typeof e=="object"&&e.toJSON!==void 0&&typeof e.toJSON=="function")return e.toJSON();let r=t;return typeof t!="object"&&(r={...e}),Object.keys(e).forEach(n=>{r.hasOwnProperty(n)||(r[n]=e[n]),e[n]===null?delete r[n]:r[n]=ce(r[n],e[n])}),r}const Ue={name:"SignalProcessor",description:"Replacing $signal with ctx.store.signal.value",regexp:new RegExp(/(?<whole>\$(?<signal>[a-zA-Z_$][0-9a-zA-Z_$]*))/g),replacer:t=>{const{signal:e}=t;return`ctx.store.${e}.value`}},qe={name:"ActionProcessor",description:"Replacing @action(args) with ctx.actions.action(ctx, args)",regexp:new RegExp(/(?<whole>@(?<action>[a-zA-Z_$][0-9a-zA-Z_$]*)(?<call>\((?<args>.*)\))?)/g),replacer:({action:t,args:e})=>`ctx.actions.${t}(ctx, ${e||""})`},Ke={name:"RefProcessor",description:"Replacing #foo with ctx.refs.foo",regexp:new RegExp(/(?<whole>\#(?<ref>[a-zA-Z_$][0-9a-zA-Z_$]*))/g),replacer({ref:t}){return`data.refs.${t}`}},Ge=[Ue,qe,Ke],Je=[{prefix:"store",description:"Setup the global store",allowedTags:new Set(["body"]),onLoad:t=>{const e=t.expressionFn(t);t.mergeStore(e)}},{prefix:"ref",description:"Sets the value of the element",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,bypassExpressionFunctionCreation:!0,preprocessers:new Set([]),onLoad:t=>{const{el:e,expression:r}=t;return t.refs[r]=e,()=>delete t.refs[r]}}];class ue{plugins=[];store=z({});actions={};refs={};reactivity={signal:ne,computed:Ve,effect:W};missingIDNext=0;removals=new Map;constructor(e={},...r){if(this.actions=Object.assign(this.actions,e),r=[...Je,...r],!r.length)throw new Error("No plugins provided");const n=new Set;for(const o of r){if(o.requiredPluginPrefixes){for(const s of o.requiredPluginPrefixes)if(!n.has(s))throw new Error(`Plugin ${o.prefix} requires plugin ${s}`)}this.plugins.push(o),n.add(o.prefix)}}run(){this.plugins.forEach(e=>{e.onGlobalInit&&e.onGlobalInit({actions:this.actions,refs:this.refs,reactivity:this.reactivity,mergeStore:this.mergeStore.bind(this),store:this.store})}),this.applyPlugins(document.body)}cleanupElementRemovals(e){const r=this.removals.get(e);if(r){for(const n of r)n();this.removals.delete(e)}}mergeStore(e){const r=ce(this.store.value,e);this.store=z(r)}applyPlugins(e){const r=new Set;fe(e,n=>{this.cleanupElementRemovals(n);const o=C(n);if(o){if(o.id){const s=o.style;s.viewTransitionName=o.id,console.log(`Setting viewTransitionName on ${o.id}`)}if(!o.id&&o.tagName!=="BODY"){const s=(this.missingIDNext++).toString(16).padStart(8,"0");o.id=`ds${s}`}this.plugins.forEach(s=>{for(const i in o.dataset){let l=o.dataset[i]||"";if(!i.startsWith(s.prefix))continue;if(r.clear(),console.info(`Found ${i} on ${o.id?`#${o.id}`:o.tagName}, applying Datastar plugin '${s.prefix}'`),s.allowedTags&&!s.allowedTags.has(o.tagName.toLowerCase()))throw new Error(`Tag '${o.tagName}' is not allowed for plugin '${i}', allowed tags are: ${[[...s.allowedTags].map(d=>`'${d}'`)].join(", ")}`);let m=i.slice(s.prefix.length),[g,...a]=m.split(".");if(s.mustHaveEmptyKey&&g.length>0)throw new Error(`Attribute '${i}' must have empty key`);if(s.mustNotEmptyKey&&g.length===0)throw new Error(`Attribute '${i}' must have non-empty key`);g.length&&(g=g[0].toLowerCase()+g.slice(1));const u=a.map(d=>{const[T,...K]=d.split("_");return{label:T,args:K}});if(s.allowedModifiers){for(const d of u)if(!s.allowedModifiers.has(d.label))throw new Error(`Modifier '${d.label}' is not allowed`)}const h=new Map;for(const d of u)h.set(d.label,d.args);if(s.mustHaveEmptyExpression&&l.length)throw new Error(`Attribute '${i}' must have empty expression`);if(s.mustNotEmptyExpression&&!l.length)throw new Error(`Attribute '${i}' must have non-empty expression`);const f=[...Ge,...s.preprocessers||[]];for(const d of f){if(r.has(d))continue;r.add(d);const T=[...l.matchAll(d.regexp)];if(T.length)for(const K of T){if(!K.groups)continue;const{groups:xe}=K,{whole:Mt}=xe;l=l.replace(Mt,d.replacer(xe))}}const{store:S,reactivity:v,actions:te,refs:Lt}=this,Ce={store:S,mergeStore:this.mergeStore.bind(this),applyPlugins:this.applyPlugins.bind(this),actions:te,refs:Lt,reactivity:v,el:o,key:g,expression:l,expressionFn:()=>{throw new Error("Expression function not created")},modifiers:h};if(!s.bypassExpressionFunctionCreation&&!s.mustHaveEmptyExpression&&l.length){const d=`return ${l}`;try{const T=new Function("ctx",d);Ce.expressionFn=T}catch{console.error(`Error evaluating expression '${d}' on ${o.id?`#${o.id}`:o.tagName}`);return}}const $e=s.onLoad(Ce);$e&&(this.removals.has(o)||this.removals.set(o,new Set),this.removals.get(o).add($e))}})}})}}function fe(t,e){if(t)for(e(t),t=t.firstElementChild;t;)fe(t,e),t=t.nextElementSibling}const We=t=>t.replace(/[A-Z]+(?![a-z])|[A-Z]/g,(e,r)=>(r?"-":"")+e.toLowerCase()),ze={prefix:"bind",description:"Sets the value of the element",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>t.reactivity.effect(()=>{const e=We(t.key),r=t.expressionFn(t);t.el.setAttribute(e,`${r}`)})},de=["change","input","keydown"],Ze={prefix:"model",description:"Sets the value of the element",mustHaveEmptyKey:!0,allowedTags:new Set(["input","textarea","select"]),bypassExpressionFunctionCreation:!0,onLoad:t=>{const{store:e,el:r,expression:n}=t,o=e[n];return t.reactivity.effect(()=>{if(!("value"in r))throw new Error("Element does not have value property");r.value=`${o.value}`;const s=()=>{const i=o.value;if(typeof i=="number")o.value=Number(r.value);else if(typeof i=="string")o.value=r.value;else if(typeof i=="boolean")o.value=!!r.value;else throw new Error("Unsupported type")};return s(),de.forEach(i=>{r.addEventListener(i,s)}),()=>{de.forEach(i=>{r.removeEventListener(i,s)})}})}},Xe={prefix:"text",description:"Sets the textContent of the element",mustHaveEmptyKey:!0,onLoad:t=>{const{el:e,expressionFn:r}=t;if(!(e instanceof HTMLElement))throw new Error("Element is not HTMLElement");return t.reactivity.effect(()=>{e.textContent=`${r(t)}`})}},pe="DOMContentLoaded",Ye=[ze,Ze,Xe,{prefix:"focus",description:"Sets the focus of the element",mustHaveEmptyKey:!0,mustHaveEmptyExpression:!0,onLoad:t=>(t.el.tabIndex||t.el.setAttribute("tabindex","0"),t.el.focus(),t.el.scrollIntoView({block:"center",inline:"center"}),()=>t.el.blur())},{prefix:"on",description:"Sets the event listener of the element",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>{const{el:e,key:r,expressionFn:n}=t,o=()=>{n(t)};if(r==="load")return document.addEventListener(pe,o,!0),()=>{document.removeEventListener(pe,o)};const s=r.toLowerCase();return e.addEventListener(s,o),()=>{e.removeEventListener(s,o)}}}],F=new WeakSet;function Qe(t,e,r={}){t instanceof Document&&(t=t.documentElement);let n;typeof e=="string"?n=ot(e):n=e;const o=st(n),s=tt(t,o,r);return he(t,o,s)}function he(t,e,r){if(r.head.block){const n=t.querySelector("head"),o=e.querySelector("head");if(n&&o){const s=me(o,n,r);Promise.all(s).then(()=>{he(t,e,Object.assign(r,{head:{block:!1,ignore:!0}}))});return}}if(r.morphStyle==="innerHTML")return ge(e,t,r),t.children;if(r.morphStyle==="outerHTML"||r.morphStyle==null){const n=at(e,t,r);if(!n)throw new Error("Could not find best match");const o=n?.previousSibling,s=n?.nextSibling,i=V(t,n,r);return n?it(o,i,s):[]}else throw"Do not understand how to morph style "+r.morphStyle}function V(t,e,r){if(!(r.ignoreActive&&t===document.activeElement))if(e==null){if(r.callbacks.beforeNodeRemoved(t)===!1)return;t.remove(),r.callbacks.afterNodeRemoved(t);return}else{if(j(t,e))return r.callbacks.beforeNodeMorphed(t,e)===!1?void 0:(t instanceof HTMLHeadElement&&r.head.ignore||(e instanceof HTMLHeadElement&&t instanceof HTMLHeadElement&&r.head.style!=="morph"?me(e,t,r):(et(e,t),ge(e,t,r))),r.callbacks.afterNodeMorphed(t,e),t);if(r.callbacks.beforeNodeRemoved(t)===!1||r.callbacks.beforeNodeAdded(e)===!1)return;if(!t.parentElement)throw new Error("oldNode has no parentElement");return t.parentElement.replaceChild(e,t),r.callbacks.afterNodeAdded(e),r.callbacks.afterNodeRemoved(t),e}}function ge(t,e,r){let n=t.firstChild,o=e.firstChild,s;for(;n;){if(s=n,n=s.nextSibling,o==null){if(r.callbacks.beforeNodeAdded(s)===!1)return;e.appendChild(s),r.callbacks.afterNodeAdded(s),w(r,s);continue}if(ve(s,o,r)){V(o,s,r),o=o.nextSibling,w(r,s);continue}let i=rt(t,e,s,o,r);if(i){o=_e(o,i,r),V(i,s,r),w(r,s);continue}let l=nt(t,s,o,r);if(l){o=_e(o,l,r),V(l,s,r),w(r,s);continue}if(r.callbacks.beforeNodeAdded(s)===!1)return;e.insertBefore(s,o),r.callbacks.afterNodeAdded(s),w(r,s)}for(;o!==null;){let i=o;o=o.nextSibling,be(i,r)}}function et(t,e){let r=t.nodeType;if(r===1){for(const n of t.attributes)e.getAttribute(n.name)!==n.value&&e.setAttribute(n.name,n.value);for(const n of e.attributes)t.hasAttribute(n.name)||e.removeAttribute(n.name)}if((r===Node.COMMENT_NODE||r===Node.TEXT_NODE)&&e.nodeValue!==t.nodeValue&&(e.nodeValue=t.nodeValue),t instanceof HTMLInputElement&&e instanceof HTMLInputElement&&t.type!=="file")e.value=t.value||"",B(t,e,"value"),B(t,e,"checked"),B(t,e,"disabled");else if(t instanceof HTMLOptionElement)B(t,e,"selected");else if(t instanceof HTMLTextAreaElement&&e instanceof HTMLTextAreaElement){const n=t.value,o=e.value;n!==o&&(e.value=n),e.firstChild&&e.firstChild.nodeValue!==n&&(e.firstChild.nodeValue=n)}}function B(t,e,r){const n=t.getAttribute(r),o=e.getAttribute(r);n!==o&&(n?e.setAttribute(r,n):e.removeAttribute(r))}function me(t,e,r){const n=[],o=[],s=[],i=[],l=r.head.style,m=new Map;for(const a of t.children)m.set(a.outerHTML,a);for(const a of e.children){let u=m.has(a.outerHTML),h=r.head.shouldReAppend(a),f=r.head.shouldPreserve(a);u||f?h?o.push(a):(m.delete(a.outerHTML),s.push(a)):l==="append"?h&&(o.push(a),i.push(a)):r.head.shouldRemove(a)!==!1&&o.push(a)}i.push(...m.values()),console.log("to append: ",i);const g=[];for(const a of i){console.log("adding: ",a);const u=document.createRange().createContextualFragment(a.outerHTML).firstChild;if(!u)throw new Error("could not create new element from: "+a.outerHTML);if(console.log(u),r.callbacks.beforeNodeAdded(u)){if(u.hasAttribute("href")||u.hasAttribute("src")){let h;const f=new Promise(S=>{h=S});u.addEventListener("load",function(){h(void 0)}),g.push(f)}e.appendChild(u),r.callbacks.afterNodeAdded(u),n.push(u)}}for(const a of o)r.callbacks.beforeNodeRemoved(a)!==!1&&(e.removeChild(a),r.callbacks.afterNodeRemoved(a));return r.head.afterHeadMorphed(e,{added:n,kept:s,removed:o}),g}function E(){}function tt(t,e,r){return{target:t,newContent:e,config:r,morphStyle:r.morphStyle,ignoreActive:r.ignoreActive,idMap:ft(t,e),deadIds:new Set,callbacks:Object.assign({beforeNodeAdded:E,afterNodeAdded:E,beforeNodeMorphed:E,afterNodeMorphed:E,beforeNodeRemoved:E,afterNodeRemoved:E},r.callbacks),head:Object.assign({style:"merge",shouldPreserve:n=>n.getAttribute("im-preserve")==="true",shouldReAppend:n=>n.getAttribute("im-re-append")==="true",shouldRemove:E,afterHeadMorphed:E},r.head)}}function ve(t,e,r){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName?t?.id?.length&&t.id===e.id?!0:O(r,t,e)>0:!1}function j(t,e){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName}function _e(t,e,r){for(;t!==e;){const n=t;if(t=t?.nextSibling,!n)throw new Error("tempNode is null");be(n,r)}return w(r,e),e.nextSibling}function rt(t,e,r,n,o){const s=O(o,r,e);let i=null;if(s>0){i=n;let l=0;for(;i!=null;){if(ve(r,i,o))return i;if(l+=O(o,i,t),l>s)return null;i=i.nextSibling}}return i}function nt(t,e,r,n){let o=r,s=e.nextSibling,i=0;for(;o&&s;){if(O(n,o,t)>0)return null;if(j(e,o))return o;if(j(s,o)&&(i++,s=s.nextSibling,i>=2))return null;o=o.nextSibling}return o}const ye=new DOMParser;function ot(t){const e=t.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,"");if(e.match(/<\/html>/)||e.match(/<\/head>/)||e.match(/<\/body>/)){const r=ye.parseFromString(t,"text/html");if(e.match(/<\/html>/))return F.add(r),r;{let n=r.firstChild;return n?(F.add(n),n):null}}else{const n=ye.parseFromString(`<body><template>${t}</template></body>`,"text/html").body.querySelector("template")?.content;if(!n)throw new Error("content is null");return F.add(n),n}}function st(t){if(t==null)return document.createElement("div");if(F.has(t))return t;if(t instanceof Node){const e=document.createElement("div");return e.append(t),e}else{const e=document.createElement("div");for(const r of[...t])e.append(r);return e}}function it(t,e,r){const n=[],o=[];for(;t;)n.push(t),t=t.previousSibling;for(;n.length>0;){const s=n.pop();o.push(s),e?.parentElement?.insertBefore(s,e)}for(o.push(e);r;)n.push(r),o.push(r),r=r.nextSibling;for(;n.length;)e?.parentElement?.insertBefore(n.pop(),e.nextSibling);return o}function at(t,e,r){let n=t.firstChild,o=n,s=0;for(;n;){let i=lt(n,e,r);i>s&&(o=n,s=i),n=n.nextSibling}return o}function lt(t,e,r){return j(t,e)?.5+O(r,t,e):0}function be(t,e){w(e,t),e.callbacks.beforeNodeRemoved(t)!==!1&&(t.remove(),e.callbacks.afterNodeRemoved(t))}function ct(t,e){return!t.deadIds.has(e)}function ut(t,e,r){return t.idMap.get(r)?.has(e)||!1}function w(t,e){const r=t.idMap.get(e);if(r)for(const n of r)t.deadIds.add(n)}function O(t,e,r){const n=t.idMap.get(e);if(!n)return 0;let o=0;for(const s of n)ct(t,s)&&ut(t,s,r)&&++o;return o}function Ee(t,e){const r=t.parentElement,n=t.querySelectorAll("[id]");for(const o of n){let s=o;for(;s!==r&&s;){let i=e.get(s);i==null&&(i=new Set,e.set(s,i)),i.add(o.id),s=s.parentElement}}}function ft(t,e){const r=new Map;return Ee(t,r),Ee(e,r),r}const we="get",dt=[we,"post","put","patch","delete"].reduce((t,e)=>(t[e]=async r=>mt(e,r),t),{}),Se="Accept",X="Content-Type",Te="application/json",Ae="datastar",Y=`${Ae}-indicator`,U=`${Ae}-request`,q="text/html",pt="selector",ht="swap",gt=[{prefix:"header",description:"Sets the header of the fetch request",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>{const e=t.store.fetch.headers,r=t.key[0].toUpperCase()+t.key.slice(1);return e[r]=t.reactivity.computed(()=>t.expressionFn(t)),()=>{delete e[r]}}},{prefix:"fetchUrl",description:"Sets the fetch url",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,onGlobalInit:({mergeStore:t})=>{const e=document.createElement("style");e.innerHTML=`
.${Y}{
 opacity:0;
 transition: opacity 500ms ease-in;
}
.${U} .${Y}{
 opacity:1
}
.${U}.${Y}{
 opacity:1
}
`,document.head.appendChild(e);const r=new Headers;r.append(Se,q),r.append(X,Te),t({fetch:{headers:{},elementURLs:{}}})},onLoad:t=>t.reactivity.effect(()=>{const e=t.reactivity.computed(()=>`${t.expressionFn(t)}`);return t.store.fetch.elementURLs[t.el.id]=e,()=>{delete t.store.fetch.elementURLs[t.el.id]}})},{prefix:"sse",description:"Sets the value of the element",mustHaveEmptyKey:!0,onLoad:t=>{const e=t.expressionFn(t);if(typeof e!="string")throw new Error("SSE url must be a string");const r=new EventSource(e),n=s=>{Pe(t,s.data,"append")};r.addEventListener("message",n);const o=s=>console.error(s);return r.addEventListener("error",o),()=>{r.removeEventListener("message",n),r.removeEventListener("error",o),r.close()}}}];async function mt(t,e){const{el:r,store:n}=e,o=n.fetch.elementURLs[r.id];if(!o)throw new Error(`No signal for ${t}`);r.classList.add(U);const s=new URL(o.value,window.location.origin),i=new Headers;i.append(Se,q),i.append(X,Te);const l=n.fetch.headers.value;if(l)for(const v in l){const te=l[v];i.append(v,te)}const m={...n};delete m.fetch;const g=JSON.stringify(m),a={method:t,headers:i};if(t===we){const v=new URLSearchParams(s.search);v.append("datastar",g),s.search=v.toString()}else a.body=g;const u=await fetch(s,a);if(!u.ok)throw new Error("Network response was not ok.");const h=await u.text();if(u.status>=300&&u.status<40){let v=h;v.startsWith("/")&&(v=window.location.origin+v),Response.redirect(v)}if(!(u.headers.get(X)===q))throw new Error("Response is not HTML, can't merge");Pe(e,h),r.classList.remove(U)}const vt=new DOMParser;function Pe(t,e,r="morph"){const{el:n}=t,o=[...vt.parseFromString(e,q).body.children];for(let s=0;s<o.length;s++){const i=o[s];if(!(i instanceof Element))throw new Error("Not an element");const l=C(i),m=i.getAttribute("id"),g=s===0,a=!!m?.length,u=g&&!a;let h;if(u)h=[n];else{if(!a)throw new Error("No id");const f=l?.dataset?.[pt]||`#${m}`;h=document.querySelectorAll(f)||[]}if(!h)throw new Error("No target element");for(const f of h){const S=l?.dataset?.[ht];switch(S&&(r=S),r){case"morph":Qe(f,i),t.applyPlugins(f);continue;case"inner":f.innerHTML=i.innerHTML;break;case"outer":f.outerHTML=i.outerHTML;break;case"prepend":f.prepend(i);break;case"append":f.append(i);break;case"before":f.before(i);break;case"after":f.after(i);break;case"delete":f.remove();break;default:throw new Error("Invalid merge mode")}t.applyPlugins(i)}}}const Q="display",Le="none",ee="important",_t={prefix:"show",description:"Sets the display of the element",allowedModifiers:new Set([ee]),onLoad:t=>{const{el:e,modifiers:r,expressionFn:n}=t;return W(()=>{const s=!!n(t),l=r.has(ee)?ee:void 0;s?e.style.length===1&&e.style.display===Le?e.style.removeProperty(Q):e.style.setProperty(Q,"",l):e.style.setProperty(Q,Le,l)})}},yt="intersects",Me="once",Ne="half",ke="full",bt={prefix:yt,description:"Run expression when element intersects with viewport",allowedModifiers:new Set([Me,Ne,ke]),mustHaveEmptyKey:!0,onLoad:t=>{const{modifiers:e}=t,r={threshold:0};e.has(ke)?r.threshold=1:e.has(Ne)&&(r.threshold=.5);const n=new IntersectionObserver(o=>{o.forEach(s=>{s.isIntersecting&&(t.expressionFn(t),e.has(Me)&&n.disconnect())})},r);return n.observe(t.el),()=>n.disconnect()}},He="prepend",Re="append",Oe=new Error("Target element must have a parent if using prepend or append"),Et=[_t,bt,{prefix:"teleport",description:"Teleports the element to another element",allowedModifiers:new Set([He,Re]),allowedTags:new Set(["template"]),bypassExpressionFunctionCreation:!0,onLoad:t=>{const{el:e,modifiers:r,expression:n}=t;if(!(e instanceof HTMLTemplateElement))throw new Error;const o=document.querySelector(n);if(!o)throw new Error(`Target element not found: ${n}`);if(!e.content)throw new Error("Template element must have content");const s=e.content.cloneNode(!0);if(C(s)?.firstElementChild)throw new Error("Empty template");if(r.has(He)){if(!o.parentNode)throw Oe;o.parentNode.insertBefore(s,o)}else if(r.has(Re)){if(!o.parentNode)throw Oe;o.parentNode.insertBefore(s,o.nextSibling)}else o.appendChild(s)}},{prefix:"scrollIntoView",description:"Scrolls the element into view",onLoad:t=>{const{el:e}=t;e.scrollIntoView({behavior:"smooth",block:"center",inline:"center"})}}],wt=performance.now(),St=Object.assign({},dt),Tt=[...gt,...Et,...Ye],At=new ue(St,...Tt),Pt=performance.now();return console.log(`Datastar loaded in ${Pt-wt}ms`),L.Datastar=ue,L.datastar=At,L.toHTMLorSVGElement=C,Object.defineProperty(L,Symbol.toStringTag,{value:"Module"}),L}({});
//# sourceMappingURL=datastar.iife.js.map
