<<<<<<< HEAD
!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=100)}([function(e,t,n){(function(r){var o,i;o=[n(13),n(1),n(97),n(28),n(58),n(57),n(27),n(29),n(96),n(26),n(56),n(95),n(7),n(55)],void 0===(i=function(e,t,n,r,o,i,a,s,u,c,l,f,p,d){"use strict";var h=function(e,t){return new h.fn.init(e,t)},v=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,g=/^-ms-/,m=/-([a-z])/g,y=function(e,t){return t.toUpperCase()};function x(e){var t=!!e&&"length"in e&&e.length,n=h.type(e);return"function"!==n&&!h.isWindow(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}return h.fn=h.prototype={jquery:"3.0.0",constructor:h,length:0,toArray:function(){return r.call(this)},get:function(e){return null!=e?e<0?this[e+this.length]:this[e]:r.call(this)},pushStack:function(e){var t=h.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return h.each(this,e)},map:function(e){return this.pushStack(h.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(r.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:i,sort:e.sort,splice:e.splice},h.extend=h.fn.extend=function(){var e,t,n,r,o,i,a=arguments[0]||{},s=1,u=arguments.length,c=!1;for("boolean"==typeof a&&(c=a,a=arguments[s]||{},s++),"object"==typeof a||h.isFunction(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)n=a[t],a!==(r=e[t])&&(c&&r&&(h.isPlainObject(r)||(o=h.isArray(r)))?(o?(o=!1,i=n&&h.isArray(n)?n:[]):i=n&&h.isPlainObject(n)?n:{},a[t]=h.extend(c,i,r)):void 0!==r&&(a[t]=r));return a},h.extend({expando:"jQuery"+("3.0.0"+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===h.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){var t=h.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},isPlainObject:function(e){var t,r;return!(!e||"[object Object]"!==u.call(e))&&(!(t=n(e))||"function"==typeof(r=c.call(t,"constructor")&&t.constructor)&&l.call(r)===f)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?s[u.call(e)]||"object":typeof e},globalEval:function(e){d(e)},camelCase:function(e){return e.replace(g,"ms-").replace(m,y)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t){var n,r=0;if(x(e))for(n=e.length;r<n&&!1!==t.call(e[r],r,e[r]);r++);else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},trim:function(e){return null==e?"":(e+"").replace(v,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(x(Object(e))?h.merge(n,"string"==typeof e?[e]:e):i.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:a.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,o=e.length;r<n;r++)e[o++]=t[r];return e.length=o,e},grep:function(e,t,n){for(var r=[],o=0,i=e.length,a=!n;o<i;o++)!t(e[o],o)!==a&&r.push(e[o]);return r},map:function(e,t,n){var r,i,a=0,s=[];if(x(e))for(r=e.length;a<r;a++)null!=(i=t(e[a],a,n))&&s.push(i);else for(a in e)null!=(i=t(e[a],a,n))&&s.push(i);return o.apply([],s)},guid:1,proxy:function(e,t){var n,o,i;if("string"==typeof t&&(n=e[t],t=e,e=n),h.isFunction(e))return o=r.call(arguments,2),(i=function(){return e.apply(t||this,o.concat(r.call(arguments)))}).guid=e.guid=e.guid||h.guid++,i},now:Date.now,support:p}),"function"==typeof Symbol&&(h.fn[Symbol.iterator]=e[Symbol.iterator]),h.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){s["[object "+t+"]"]=t.toLowerCase()}),h}.apply(t,o))||(e.exports=i)}).call(this,n(59))},function(e,t,n){var r;void 0===(r=function(){"use strict";return window.document}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r,o;r=[n(94)],void 0===(o=function(){}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(1),n(54),n(53)],void 0===(o=function(e,t,n){"use strict";var r,o=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,i=e.fn.init=function(i,a,s){var u,c;if(!i)return this;if(s=s||r,"string"==typeof i){if(!(u="<"===i[0]&&">"===i[i.length-1]&&i.length>=3?[null,i,null]:o.exec(i))||!u[1]&&a)return!a||a.jquery?(a||s).find(i):this.constructor(a).find(i);if(u[1]){if(a=a instanceof e?a[0]:a,e.merge(this,e.parseHTML(u[1],a&&a.nodeType?a.ownerDocument||a:t,!0)),n.test(u[1])&&e.isPlainObject(a))for(u in a)e.isFunction(this[u])?this[u](a[u]):this.attr(u,a[u]);return this}return(c=t.getElementById(u[2]))&&(this[0]=c,this.length=1),this}return i.nodeType?(this[0]=i,this.length=1,this):e.isFunction(i)?void 0!==s.ready?s.ready(i):i(e):e.makeArray(i,this)};return i.prototype=e.fn,r=e(t),i}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(45)],void 0===(o=function(e){"use strict";return new e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0)],void 0===(o=function(e){"use strict";var t=function(n,r,o,i,a,s,u){var c=0,l=n.length,f=null==o;if("object"===e.type(o))for(c in a=!0,o)t(n,r,c,o[c],!0,s,u);else if(void 0!==i&&(a=!0,e.isFunction(i)||(u=!0),f&&(u?(r.call(n,i),r=null):(f=r,r=function(t,n,r){return f.call(e(t),r)})),r))for(;c<l;c++)r(n[c],o,u?i:i.call(n[c],c,r(n[c],o)));return a?n:f?r.call(n):l?r(n[0],o):s};return t}.apply(t,r))||(e.exports=o)},function(e,t,n){var r;void 0===(r=function(){"use strict";return/\S+/g}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r;void 0===(r=function(){"use strict";return{}}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r,o;r=[n(0),n(1),n(6),n(76),n(32),n(31),n(3),n(75),n(15),n(9),n(30)],void 0===(o=function(e,t,n,r,o,i){"use strict";var a=/%20/g,s=/#.*$/,u=/([?&])_=[^&]*/,c=/^(.*?):[ \t]*([^\r\n]*)$/gm,l=/^(?:GET|HEAD)$/,f=/^\/\//,p={},d={},h="*/".concat("*"),v=t.createElement("a");function g(t){return function(r,o){"string"!=typeof r&&(o=r,r="*");var i,a=0,s=r.toLowerCase().match(n)||[];if(e.isFunction(o))for(;i=s[a++];)"+"===i[0]?(i=i.slice(1)||"*",(t[i]=t[i]||[]).unshift(o)):(t[i]=t[i]||[]).push(o)}}function m(t,n,r,o){var i={},a=t===d;function s(u){var c;return i[u]=!0,e.each(t[u]||[],function(e,t){var u=t(n,r,o);return"string"!=typeof u||a||i[u]?a?!(c=u):void 0:(n.dataTypes.unshift(u),s(u),!1)}),c}return s(n.dataTypes[0])||!i["*"]&&s("*")}function y(t,n){var r,o,i=e.ajaxSettings.flatOptions||{};for(r in n)void 0!==n[r]&&((i[r]?t:o||(o={}))[r]=n[r]);return o&&e.extend(!0,t,o),t}return v.href=r.href,e.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:r.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(r.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":h,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":e.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(t,n){return n?y(y(t,e.ajaxSettings),n):y(e.ajaxSettings,t)},ajaxPrefilter:g(p),ajaxTransport:g(d),ajax:function(g,y){"object"==typeof g&&(y=g,g=void 0),y=y||{};var x,b,w,C,T,S,k,E,N,j,A=e.ajaxSetup({},y),D=A.context||A,O=A.context&&(D.nodeType||D.jquery)?e(D):e.event,L=e.Deferred(),q=e.Callbacks("once memory"),_=A.statusCode||{},H={},I={},F="canceled",M={readyState:0,getResponseHeader:function(e){var t;if(k){if(!C)for(C={};t=c.exec(w);)C[t[1].toLowerCase()]=t[2];t=C[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return k?w:null},setRequestHeader:function(e,t){return null==k&&(e=I[e.toLowerCase()]=I[e.toLowerCase()]||e,H[e]=t),this},overrideMimeType:function(e){return null==k&&(A.mimeType=e),this},statusCode:function(e){var t;if(e)if(k)M.always(e[M.status]);else for(t in e)_[t]=[_[t],e[t]];return this},abort:function(e){var t=e||F;return x&&x.abort(t),P(0,t),this}};if(L.promise(M),A.url=((g||A.url||r.href)+"").replace(f,r.protocol+"//"),A.type=y.method||y.type||A.method||A.type,A.dataTypes=(A.dataType||"*").toLowerCase().match(n)||[""],null==A.crossDomain){S=t.createElement("a");try{S.href=A.url,S.href=S.href,A.crossDomain=v.protocol+"//"+v.host!=S.protocol+"//"+S.host}catch(e){A.crossDomain=!0}}if(A.data&&A.processData&&"string"!=typeof A.data&&(A.data=e.param(A.data,A.traditional)),m(p,A,y,M),k)return M;for(N in(E=e.event&&A.global)&&0==e.active++&&e.event.trigger("ajaxStart"),A.type=A.type.toUpperCase(),A.hasContent=!l.test(A.type),b=A.url.replace(s,""),A.hasContent?A.data&&A.processData&&0===(A.contentType||"").indexOf("application/x-www-form-urlencoded")&&(A.data=A.data.replace(a,"+")):(j=A.url.slice(b.length),A.data&&(b+=(i.test(b)?"&":"?")+A.data,delete A.data),!1===A.cache&&(b=b.replace(u,""),j=(i.test(b)?"&":"?")+"_="+o+++j),A.url=b+j),A.ifModified&&(e.lastModified[b]&&M.setRequestHeader("If-Modified-Since",e.lastModified[b]),e.etag[b]&&M.setRequestHeader("If-None-Match",e.etag[b])),(A.data&&A.hasContent&&!1!==A.contentType||y.contentType)&&M.setRequestHeader("Content-Type",A.contentType),M.setRequestHeader("Accept",A.dataTypes[0]&&A.accepts[A.dataTypes[0]]?A.accepts[A.dataTypes[0]]+("*"!==A.dataTypes[0]?", "+h+"; q=0.01":""):A.accepts["*"]),A.headers)M.setRequestHeader(N,A.headers[N]);if(A.beforeSend&&(!1===A.beforeSend.call(D,M,A)||k))return M.abort();if(F="abort",q.add(A.complete),M.done(A.success),M.fail(A.error),x=m(d,A,y,M)){if(M.readyState=1,E&&O.trigger("ajaxSend",[M,A]),k)return M;A.async&&A.timeout>0&&(T=window.setTimeout(function(){M.abort("timeout")},A.timeout));try{k=!1,x.send(H,P)}catch(e){if(k)throw e;P(-1,e)}}else P(-1,"No Transport");function P(t,n,r,o){var i,a,s,u,c,l=n;k||(k=!0,T&&window.clearTimeout(T),x=void 0,w=o||"",M.readyState=t>0?4:0,i=t>=200&&t<300||304===t,r&&(u=function(e,t,n){for(var r,o,i,a,s=e.contents,u=e.dataTypes;"*"===u[0];)u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(o in s)if(s[o]&&s[o].test(r)){u.unshift(o);break}if(u[0]in n)i=u[0];else{for(o in n){if(!u[0]||e.converters[o+" "+u[0]]){i=o;break}a||(a=o)}i=i||a}if(i)return i!==u[0]&&u.unshift(i),n[i]}(A,M,r)),u=function(e,t,n,r){var o,i,a,s,u,c={},l=e.dataTypes.slice();if(l[1])for(a in e.converters)c[a.toLowerCase()]=e.converters[a];for(i=l.shift();i;)if(e.responseFields[i]&&(n[e.responseFields[i]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=i,i=l.shift())if("*"===i)i=u;else if("*"!==u&&u!==i){if(!(a=c[u+" "+i]||c["* "+i]))for(o in c)if((s=o.split(" "))[1]===i&&(a=c[u+" "+s[0]]||c["* "+s[0]])){!0===a?a=c[o]:!0!==c[o]&&(i=s[0],l.unshift(s[1]));break}if(!0!==a)if(a&&e.throws)t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+i}}}return{state:"success",data:t}}(A,u,M,i),i?(A.ifModified&&((c=M.getResponseHeader("Last-Modified"))&&(e.lastModified[b]=c),(c=M.getResponseHeader("etag"))&&(e.etag[b]=c)),204===t||"HEAD"===A.type?l="nocontent":304===t?l="notmodified":(l=u.state,a=u.data,i=!(s=u.error))):(s=l,!t&&l||(l="error",t<0&&(t=0))),M.status=t,M.statusText=(n||l)+"",i?L.resolveWith(D,[a,l,M]):L.rejectWith(D,[M,l,s]),M.statusCode(_),_=void 0,E&&O.trigger(i?"ajaxSuccess":"ajaxError",[M,A,i?a:s]),q.fireWith(D,[M,l]),E&&(O.trigger("ajaxComplete",[M,A]),--e.active||e.event.trigger("ajaxStop")))}return M},getJSON:function(t,n,r){return e.get(t,n,r,"json")},getScript:function(t,n){return e.get(t,void 0,n,"script")}}),e.each(["get","post"],function(t,n){e[n]=function(t,r,o,i){return e.isFunction(r)&&(i=i||o,o=r,r=void 0),e.ajax(e.extend({url:t,type:n,dataType:i,data:r,success:o},e.isPlainObject(t)&&t))}}),e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(28),n(23)],void 0===(o=function(e,t){"use strict";function n(e){return e}function r(e){throw e}function o(t,n,r){var o;try{t&&e.isFunction(o=t.promise)?o.call(t).done(n).fail(r):t&&e.isFunction(o=t.then)?o.call(t,n,r):n.call(void 0,t)}catch(t){r.call(void 0,t)}}return e.extend({Deferred:function(t){var o=[["notify","progress",e.Callbacks("memory"),e.Callbacks("memory"),2],["resolve","done",e.Callbacks("once memory"),e.Callbacks("once memory"),0,"resolved"],["reject","fail",e.Callbacks("once memory"),e.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},catch:function(e){return a.then(null,e)},pipe:function(){var t=arguments;return e.Deferred(function(n){e.each(o,function(r,o){var i=e.isFunction(t[o[4]])&&t[o[4]];s[o[1]](function(){var t=i&&i.apply(this,arguments);t&&e.isFunction(t.promise)?t.promise().progress(n.notify).done(n.resolve).fail(n.reject):n[o[0]+"With"](this,i?[t]:arguments)})}),t=null}).promise()},then:function(t,i,a){var s=0;function u(t,o,i,a){return function(){var c=this,l=arguments,f=function(){var f,p;if(!(t<s)){if((f=i.apply(c,l))===o.promise())throw new TypeError("Thenable self-resolution");p=f&&("object"==typeof f||"function"==typeof f)&&f.then,e.isFunction(p)?a?p.call(f,u(s,o,n,a),u(s,o,r,a)):(s++,p.call(f,u(s,o,n,a),u(s,o,r,a),u(s,o,n,o.notifyWith))):(i!==n&&(c=void 0,l=[f]),(a||o.resolveWith)(c,l))}},p=a?f:function(){try{f()}catch(n){e.Deferred.exceptionHook&&e.Deferred.exceptionHook(n,p.stackTrace),t+1>=s&&(i!==r&&(c=void 0,l=[n]),o.rejectWith(c,l))}};t?p():(e.Deferred.getStackHook&&(p.stackTrace=e.Deferred.getStackHook()),window.setTimeout(p))}}return e.Deferred(function(s){o[0][3].add(u(0,s,e.isFunction(a)?a:n,s.notifyWith)),o[1][3].add(u(0,s,e.isFunction(t)?t:n)),o[2][3].add(u(0,s,e.isFunction(i)?i:r))}).promise()},promise:function(t){return null!=t?e.extend(t,a):a}},s={};return e.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[0][2].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),t&&t.call(s,s),s},when:function(n){var r=arguments.length,i=r,a=Array(i),s=t.call(arguments),u=e.Deferred(),c=function(e){return function(n){a[e]=this,s[e]=arguments.length>1?t.call(arguments):n,--r||u.resolveWith(a,s)}};if(r<=1&&(o(n,u.done(c(i)).resolve,u.reject),"pending"===u.state()||e.isFunction(s[i]&&s[i].then)))return u.then();for(;i--;)o(s[i],c(i),u.reject);return u.promise()}}),e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(1),n(24),n(6),n(28),n(4),n(3),n(2)],void 0===(o=function(e,t,n,r,o,i){"use strict";var a=/^key/,s=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,u=/^([^.]*)(?:\.(.+)|)/;function c(){return!0}function l(){return!1}function f(){try{return t.activeElement}catch(e){}}function p(t,n,r,o,i,a){var s,u;if("object"==typeof n){for(u in"string"!=typeof r&&(o=o||r,r=void 0),n)p(t,u,r,o,n[u],a);return t}if(null==o&&null==i?(i=r,o=r=void 0):null==i&&("string"==typeof r?(i=o,o=void 0):(i=o,o=r,r=void 0)),!1===i)i=l;else if(!i)return t;return 1===a&&(s=i,(i=function(t){return e().off(t),s.apply(this,arguments)}).guid=s.guid||(s.guid=e.guid++)),t.each(function(){e.event.add(this,n,i,o,r)})}return e.event={global:{},add:function(t,o,a,s,c){var l,f,p,d,h,v,g,m,y,x,b,w=i.get(t);if(w)for(a.handler&&(a=(l=a).handler,c=l.selector),c&&e.find.matchesSelector(n,c),a.guid||(a.guid=e.guid++),(d=w.events)||(d=w.events={}),(f=w.handle)||(f=w.handle=function(n){return void 0!==e&&e.event.triggered!==n.type?e.event.dispatch.apply(t,arguments):void 0}),h=(o=(o||"").match(r)||[""]).length;h--;)y=b=(p=u.exec(o[h])||[])[1],x=(p[2]||"").split(".").sort(),y&&(g=e.event.special[y]||{},y=(c?g.delegateType:g.bindType)||y,g=e.event.special[y]||{},v=e.extend({type:y,origType:b,data:s,handler:a,guid:a.guid,selector:c,needsContext:c&&e.expr.match.needsContext.test(c),namespace:x.join(".")},l),(m=d[y])||((m=d[y]=[]).delegateCount=0,g.setup&&!1!==g.setup.call(t,s,x,f)||t.addEventListener&&t.addEventListener(y,f)),g.add&&(g.add.call(t,v),v.handler.guid||(v.handler.guid=a.guid)),c?m.splice(m.delegateCount++,0,v):m.push(v),e.event.global[y]=!0)},remove:function(t,n,o,a,s){var c,l,f,p,d,h,v,g,m,y,x,b=i.hasData(t)&&i.get(t);if(b&&(p=b.events)){for(d=(n=(n||"").match(r)||[""]).length;d--;)if(m=x=(f=u.exec(n[d])||[])[1],y=(f[2]||"").split(".").sort(),m){for(v=e.event.special[m]||{},g=p[m=(a?v.delegateType:v.bindType)||m]||[],f=f[2]&&new RegExp("(^|\\.)"+y.join("\\.(?:.*\\.|)")+"(\\.|$)"),l=c=g.length;c--;)h=g[c],!s&&x!==h.origType||o&&o.guid!==h.guid||f&&!f.test(h.namespace)||a&&a!==h.selector&&("**"!==a||!h.selector)||(g.splice(c,1),h.selector&&g.delegateCount--,v.remove&&v.remove.call(t,h));l&&!g.length&&(v.teardown&&!1!==v.teardown.call(t,y,b.handle)||e.removeEvent(t,m,b.handle),delete p[m])}else for(m in p)e.event.remove(t,m+n[d],o,a,!0);e.isEmptyObject(p)&&i.remove(t,"handle events")}},dispatch:function(t){var n,r,o,a,s,u,c=e.event.fix(t),l=new Array(arguments.length),f=(i.get(this,"events")||{})[c.type]||[],p=e.event.special[c.type]||{};for(l[0]=c,n=1;n<arguments.length;n++)l[n]=arguments[n];if(c.delegateTarget=this,!p.preDispatch||!1!==p.preDispatch.call(this,c)){for(u=e.event.handlers.call(this,c,f),n=0;(a=u[n++])&&!c.isPropagationStopped();)for(c.currentTarget=a.elem,r=0;(s=a.handlers[r++])&&!c.isImmediatePropagationStopped();)c.rnamespace&&!c.rnamespace.test(s.namespace)||(c.handleObj=s,c.data=s.data,void 0!==(o=((e.event.special[s.origType]||{}).handle||s.handler).apply(a.elem,l))&&!1===(c.result=o)&&(c.preventDefault(),c.stopPropagation()));return p.postDispatch&&p.postDispatch.call(this,c),c.result}},handlers:function(t,n){var r,o,i,a,s=[],u=n.delegateCount,c=t.target;if(u&&c.nodeType&&("click"!==t.type||isNaN(t.button)||t.button<1))for(;c!==this;c=c.parentNode||this)if(1===c.nodeType&&(!0!==c.disabled||"click"!==t.type)){for(o=[],r=0;r<u;r++)void 0===o[i=(a=n[r]).selector+" "]&&(o[i]=a.needsContext?e(i,this).index(c)>-1:e.find(i,this,null,[c]).length),o[i]&&o.push(a);o.length&&s.push({elem:c,handlers:o})}return u<n.length&&s.push({elem:this,handlers:n.slice(u)}),s},addProp:function(t,n){Object.defineProperty(e.Event.prototype,t,{enumerable:!0,configurable:!0,get:e.isFunction(n)?function(){if(this.originalEvent)return n(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(t){return t[e.expando]?t:new e.Event(t)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==f()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===f()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&e.nodeName(this,"input"))return this.click(),!1},_default:function(t){return e.nodeName(t.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},e.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},e.Event=function(t,n){if(!(this instanceof e.Event))return new e.Event(t,n);t&&t.type?(this.originalEvent=t,this.type=t.type,this.isDefaultPrevented=t.defaultPrevented||void 0===t.defaultPrevented&&!1===t.returnValue?c:l,this.target=t.target&&3===t.target.nodeType?t.target.parentNode:t.target,this.currentTarget=t.currentTarget,this.relatedTarget=t.relatedTarget):this.type=t,n&&e.extend(this,n),this.timeStamp=t&&t.timeStamp||e.now(),this[e.expando]=!0},e.Event.prototype={constructor:e.Event,isDefaultPrevented:l,isPropagationStopped:l,isImmediatePropagationStopped:l,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=c,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=c,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=c,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},e.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&a.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&s.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},e.event.addProp),e.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(t,n){e.event.special[t]={delegateType:n,bindType:n,handle:function(t){var r,o=t.relatedTarget,i=t.handleObj;return o&&(o===this||e.contains(this,o))||(t.type=i.origType,r=i.handler.apply(this,arguments),t.type=n),r}}}),e.fn.extend({on:function(e,t,n,r){return p(this,e,t,n,r)},one:function(e,t,n,r){return p(this,e,t,n,r,1)},off:function(t,n,r){var o,i;if(t&&t.preventDefault&&t.handleObj)return o=t.handleObj,e(t.delegateTarget).off(o.namespace?o.origType+"."+o.namespace:o.origType,o.selector,o.handler),this;if("object"==typeof t){for(i in t)this.off(i,n,t[i]);return this}return!1!==n&&"function"!=typeof n||(r=n,n=void 0),!1===r&&(r=l),this.each(function(){e.event.remove(this,t,r,n)})}}),e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(27),n(91),n(90),n(52),n(3),n(53),n(2)],void 0===(o=function(e,t,n,r,o){"use strict";var i=/^(?:parents|prev(?:Until|All))/,a={children:!0,contents:!0,next:!0,prev:!0};function s(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}return e.fn.extend({has:function(t){var n=e(t,this),r=n.length;return this.filter(function(){for(var t=0;t<r;t++)if(e.contains(this,n[t]))return!0})},closest:function(t,n){var r,i=0,a=this.length,s=[],u="string"!=typeof t&&e(t);if(!o.test(t))for(;i<a;i++)for(r=this[i];r&&r!==n;r=r.parentNode)if(r.nodeType<11&&(u?u.index(r)>-1:1===r.nodeType&&e.find.matchesSelector(r,t))){s.push(r);break}return this.pushStack(s.length>1?e.uniqueSort(s):s)},index:function(n){return n?"string"==typeof n?t.call(e(n),this[0]):t.call(this,n.jquery?n[0]:n):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(t,n){return this.pushStack(e.uniqueSort(e.merge(this.get(),e(t,n))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),e.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return n(e,"parentNode")},parentsUntil:function(e,t,r){return n(e,"parentNode",r)},next:function(e){return s(e,"nextSibling")},prev:function(e){return s(e,"previousSibling")},nextAll:function(e){return n(e,"nextSibling")},prevAll:function(e){return n(e,"previousSibling")},nextUntil:function(e,t,r){return n(e,"nextSibling",r)},prevUntil:function(e,t,r){return n(e,"previousSibling",r)},siblings:function(e){return r((e.parentNode||{}).firstChild,e)},children:function(e){return r(e.firstChild)},contents:function(t){return t.contentDocument||e.merge([],t.childNodes)}},function(t,n){e.fn[t]=function(r,o){var s=e.map(this,n,r);return"Until"!==t.slice(-5)&&(o=r),o&&"string"==typeof o&&(s=e.filter(o,s)),this.length>1&&(a[t]||e.uniqueSort(s),i.test(t)&&s.reverse()),this.pushStack(s)}}),e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(19),n(5),n(37),n(1),n(20),n(18),n(40),n(36),n(39),n(35),n(38),n(34),n(17),n(3),n(42),n(2)],void 0===(o=function(e,t,n,r,o,i,a,s,u,c,l,f,p,d){"use strict";var h=/^(none|table(?!-c[ea]).+)/,v={position:"absolute",visibility:"hidden",display:"block"},g={letterSpacing:"0",fontWeight:"400"},m=["Webkit","Moz","ms"],y=o.createElement("div").style;function x(e){if(e in y)return e;for(var t=e[0].toUpperCase()+e.slice(1),n=m.length;n--;)if((e=m[n]+t)in y)return e}function b(e,t,n){var r=i.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function w(t,n,r,o,i){for(var a=r===(o?"border":"content")?4:"width"===n?1:0,u=0;a<4;a+=2)"margin"===r&&(u+=e.css(t,r+s[a],!0,i)),o?("content"===r&&(u-=e.css(t,"padding"+s[a],!0,i)),"margin"!==r&&(u-=e.css(t,"border"+s[a]+"Width",!0,i))):(u+=e.css(t,"padding"+s[a],!0,i),"padding"!==r&&(u+=e.css(t,"border"+s[a]+"Width",!0,i)));return u}function C(t,n,r){var o,i=!0,s=u(t),c="border-box"===e.css(t,"boxSizing",!1,s);if(t.getClientRects().length&&(o=t.getBoundingClientRect()[n]),o<=0||null==o){if(((o=l(t,n,s))<0||null==o)&&(o=t.style[n]),a.test(o))return o;i=c&&(d.boxSizingReliable()||o===t.style[n]),o=parseFloat(o)||0}return o+w(t,n,r||(c?"border":"content"),i,s)+"px"}return e.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=l(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{float:"cssFloat"},style:function(t,n,r,o){if(t&&3!==t.nodeType&&8!==t.nodeType&&t.style){var a,s,u,c=e.camelCase(n),l=t.style;if(n=e.cssProps[c]||(e.cssProps[c]=x(c)||c),u=e.cssHooks[n]||e.cssHooks[c],void 0===r)return u&&"get"in u&&void 0!==(a=u.get(t,!1,o))?a:l[n];"string"===(s=typeof r)&&(a=i.exec(r))&&a[1]&&(r=f(t,n,a),s="number"),null!=r&&r==r&&("number"===s&&(r+=a&&a[3]||(e.cssNumber[c]?"":"px")),d.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),u&&"set"in u&&void 0===(r=u.set(t,r,o))||(l[n]=r))}},css:function(t,n,r,o){var i,a,s,u=e.camelCase(n);return n=e.cssProps[u]||(e.cssProps[u]=x(u)||u),(s=e.cssHooks[n]||e.cssHooks[u])&&"get"in s&&(i=s.get(t,!0,r)),void 0===i&&(i=l(t,n,o)),"normal"===i&&n in g&&(i=g[n]),""===r||r?(a=parseFloat(i),!0===r||isFinite(a)?a||0:i):i}}),e.each(["height","width"],function(t,n){e.cssHooks[n]={get:function(t,r,o){if(r)return!h.test(e.css(t,"display"))||t.getClientRects().length&&t.getBoundingClientRect().width?C(t,n,o):c(t,v,function(){return C(t,n,o)})},set:function(t,r,o){var a,s=o&&u(t),c=o&&w(t,n,o,"border-box"===e.css(t,"boxSizing",!1,s),s);return c&&(a=i.exec(r))&&"px"!==(a[3]||"px")&&(t.style[n]=r,r=e.css(t,n)),b(0,r,c)}}}),e.cssHooks.marginLeft=p(d.reliableMarginLeft,function(e,t){if(t)return(parseFloat(l(e,"marginLeft"))||e.getBoundingClientRect().left-c(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),e.each({margin:"",padding:"",border:"Width"},function(t,n){e.cssHooks[t+n]={expand:function(e){for(var r=0,o={},i="string"==typeof e?e.split(" "):[e];r<4;r++)o[t+s[r]+n]=i[r]||i[r-2]||i[0];return o}},r.test(t)||(e.cssHooks[t+n].set=b)}),e.fn.extend({css:function(t,r){return n(this,function(t,n,r){var o,i,a={},s=0;if(e.isArray(n)){for(o=u(t),i=n.length;s<i;s++)a[n[s]]=e.css(t,n[s],!1,o);return a}return void 0!==r?e.style(t,n,r):e.css(t,n)},t,r,arguments.length>1)}}),e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r;void 0===(r=function(){"use strict";return[]}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r,o;r=[n(0),n(58),n(57),n(5),n(44),n(50),n(49),n(48),n(47),n(46),n(51),n(92),n(4),n(43),n(25),n(55),n(3),n(11),n(2),n(10)],void 0===(o=function(e,t,n,r,o,i,a,s,u,c,l,f,p,d,h,v){"use strict";var g=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,m=/<script|<style|<link/i,y=/checked\s*(?:[^=]|=\s*.checked.)/i,x=/^true\/(.*)/,b=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function w(t,n){return e.nodeName(t,"table")&&e.nodeName(11!==n.nodeType?n:n.firstChild,"tr")&&t.getElementsByTagName("tbody")[0]||t}function C(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function T(e){var t=x.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function S(t,n){var r,o,i,a,s,u,c,l;if(1===n.nodeType){if(p.hasData(t)&&(a=p.access(t),s=p.set(n,a),l=a.events))for(i in delete s.handle,s.events={},l)for(r=0,o=l[i].length;r<o;r++)e.event.add(n,i,l[i][r]);d.hasData(t)&&(u=d.access(t),c=e.extend({},u),d.set(n,c))}}function k(e,t){var n=t.nodeName.toLowerCase();"input"===n&&o.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function E(n,r,o,i){r=t.apply([],r);var s,c,d,h,g,m,x=0,w=n.length,S=w-1,k=r[0],N=e.isFunction(k);if(N||w>1&&"string"==typeof k&&!f.checkClone&&y.test(k))return n.each(function(e){var t=n.eq(e);N&&(r[0]=k.call(this,e,t.html())),E(t,r,o,i)});if(w&&(c=(s=l(r,n[0].ownerDocument,!1,n,i)).firstChild,1===s.childNodes.length&&(s=c),c||i)){for(h=(d=e.map(u(s,"script"),C)).length;x<w;x++)g=s,x!==S&&(g=e.clone(g,!0,!0),h&&e.merge(d,u(g,"script"))),o.call(n[x],g,x);if(h)for(m=d[d.length-1].ownerDocument,e.map(d,T),x=0;x<h;x++)g=d[x],a.test(g.type||"")&&!p.access(g,"globalEval")&&e.contains(m,g)&&(g.src?e._evalUrl&&e._evalUrl(g.src):v(g.textContent.replace(b,""),m))}return n}function N(t,n,r){for(var o,i=n?e.filter(n,t):t,a=0;null!=(o=i[a]);a++)r||1!==o.nodeType||e.cleanData(u(o)),o.parentNode&&(r&&e.contains(o.ownerDocument,o)&&c(u(o,"script")),o.parentNode.removeChild(o));return t}return e.extend({htmlPrefilter:function(e){return e.replace(g,"<$1></$2>")},clone:function(t,n,r){var o,i,a,s,l=t.cloneNode(!0),p=e.contains(t.ownerDocument,t);if(!(f.noCloneChecked||1!==t.nodeType&&11!==t.nodeType||e.isXMLDoc(t)))for(s=u(l),o=0,i=(a=u(t)).length;o<i;o++)k(a[o],s[o]);if(n)if(r)for(a=a||u(t),s=s||u(l),o=0,i=a.length;o<i;o++)S(a[o],s[o]);else S(t,l);return(s=u(l,"script")).length>0&&c(s,!p&&u(t,"script")),l},cleanData:function(t){for(var n,r,o,i=e.event.special,a=0;void 0!==(r=t[a]);a++)if(h(r)){if(n=r[p.expando]){if(n.events)for(o in n.events)i[o]?e.event.remove(r,o):e.removeEvent(r,o,n.handle);r[p.expando]=void 0}r[d.expando]&&(r[d.expando]=void 0)}}}),e.fn.extend({detach:function(e){return N(this,e,!0)},remove:function(e){return N(this,e)},text:function(t){return r(this,function(t){return void 0===t?e.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=t)})},null,t,arguments.length)},append:function(){return E(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||w(this,e).appendChild(e)})},prepend:function(){return E(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=w(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return E(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return E(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var t,n=0;null!=(t=this[n]);n++)1===t.nodeType&&(e.cleanData(u(t,!1)),t.textContent="");return this},clone:function(t,n){return t=null!=t&&t,n=null==n?t:n,this.map(function(){return e.clone(this,t,n)})},html:function(t){return r(this,function(t){var n=this[0]||{},r=0,o=this.length;if(void 0===t&&1===n.nodeType)return n.innerHTML;if("string"==typeof t&&!m.test(t)&&!s[(i.exec(t)||["",""])[1].toLowerCase()]){t=e.htmlPrefilter(t);try{for(;r<o;r++)1===(n=this[r]||{}).nodeType&&(e.cleanData(u(n,!1)),n.innerHTML=t);n=0}catch(e){}}n&&this.empty().append(t)},null,t,arguments.length)},replaceWith:function(){var t=[];return E(this,arguments,function(n){var r=this.parentNode;e.inArray(this,t)<0&&(e.cleanData(u(this)),r&&r.replaceChild(n,this))},t)}}),e.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(t,r){e.fn[t]=function(t){for(var o,i=[],a=e(t),s=a.length-1,u=0;u<=s;u++)o=u===s?this:this.clone(!0),e(a[u])[r](o),n.apply(i,o.get());return this.pushStack(i)}}),e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(1),n(4),n(25),n(26),n(10)],void 0===(o=function(e,t,n,r,o){"use strict";var i=/^(?:focusinfocus|focusoutblur)$/;return e.extend(e.event,{trigger:function(a,s,u,c){var l,f,p,d,h,v,g,m=[u||t],y=o.call(a,"type")?a.type:a,x=o.call(a,"namespace")?a.namespace.split("."):[];if(f=p=u=u||t,3!==u.nodeType&&8!==u.nodeType&&!i.test(y+e.event.triggered)&&(y.indexOf(".")>-1&&(y=(x=y.split(".")).shift(),x.sort()),h=y.indexOf(":")<0&&"on"+y,(a=a[e.expando]?a:new e.Event(y,"object"==typeof a&&a)).isTrigger=c?2:3,a.namespace=x.join("."),a.rnamespace=a.namespace?new RegExp("(^|\\.)"+x.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,a.result=void 0,a.target||(a.target=u),s=null==s?[a]:e.makeArray(s,[a]),g=e.event.special[y]||{},c||!g.trigger||!1!==g.trigger.apply(u,s))){if(!c&&!g.noBubble&&!e.isWindow(u)){for(d=g.delegateType||y,i.test(d+y)||(f=f.parentNode);f;f=f.parentNode)m.push(f),p=f;p===(u.ownerDocument||t)&&m.push(p.defaultView||p.parentWindow||window)}for(l=0;(f=m[l++])&&!a.isPropagationStopped();)a.type=l>1?d:g.bindType||y,(v=(n.get(f,"events")||{})[a.type]&&n.get(f,"handle"))&&v.apply(f,s),(v=h&&f[h])&&v.apply&&r(f)&&(a.result=v.apply(f,s),!1===a.result&&a.preventDefault());return a.type=y,c||a.isDefaultPrevented()||g._default&&!1!==g._default.apply(m.pop(),s)||!r(u)||h&&e.isFunction(u[y])&&!e.isWindow(u)&&((p=u[h])&&(u[h]=null),e.event.triggered=y,u[y](),e.event.triggered=void 0,p&&(u[h]=p)),a.result}},simulate:function(t,n,r){var o=e.extend(new e.Event,r,{type:t,isSimulated:!0});e.event.trigger(o,null,n)}}),e.fn.extend({trigger:function(t,n){return this.each(function(){e.event.trigger(t,n,this)})},triggerHandler:function(t,n){var r=this[0];if(r)return e.event.trigger(t,n,r,!0)}}),e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(1),n(7)],void 0===(o=function(e,t){"use strict";return function(){var n=e.createElement("input"),r=e.createElement("select").appendChild(e.createElement("option"));n.type="checkbox",t.checkOn=""!==n.value,t.optSelected=r.selected,(n=e.createElement("input")).value="t",n.type="radio",t.radioValue="t"===n.value}(),t}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(1),n(24),n(7)],void 0===(o=function(e,t,n,r){"use strict";return function(){function o(){if(l){l.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",l.innerHTML="",n.appendChild(c);var e=window.getComputedStyle(l);i="1%"!==e.top,u="2px"===e.marginLeft,a="4px"===e.width,l.style.marginRight="50%",s="4px"===e.marginRight,n.removeChild(c),l=null}}var i,a,s,u,c=t.createElement("div"),l=t.createElement("div");l.style&&(l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",r.clearCloneStyle="content-box"===l.style.backgroundClip,c.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",c.appendChild(l),e.extend(r,{pixelPosition:function(){return o(),i},boxSizingReliable:function(){return o(),a},pixelMarginRight:function(){return o(),s},reliableMarginLeft:function(){return o(),u}}))}(),r}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(19)],void 0===(o=function(e){"use strict";return new RegExp("^("+e+")(?!px)[a-z%]+$","i")}.apply(t,r))||(e.exports=o)},function(e,t,n){var r;void 0===(r=function(){"use strict";return/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r,o;r=[n(19)],void 0===(o=function(e){"use strict";return new RegExp("^(?:([+-])=|)("+e+")([a-z%]*)$","i")}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(1),n(20),n(6),n(40),n(41),n(39),n(38),n(4),n(86),n(3),n(22),n(9),n(11),n(14),n(12),n(85)],void 0===(o=function(e,t,n,r,o,i,a,s,u,c){"use strict";var l,f,p=/^(?:toggle|show|hide)$/,d=/queueHooks$/;function h(){f&&(window.requestAnimationFrame(h),e.fx.tick())}function v(){return window.setTimeout(function(){l=void 0}),l=e.now()}function g(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=o[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function m(e,t,n){for(var r,o=(y.tweeners[t]||[]).concat(y.tweeners["*"]),i=0,a=o.length;i<a;i++)if(r=o[i].call(n,t,e))return r}function y(t,n,r){var o,i,a=0,s=y.prefilters.length,u=e.Deferred().always(function(){delete c.elem}),c=function(){if(i)return!1;for(var e=l||v(),n=Math.max(0,f.startTime+f.duration-e),r=1-(n/f.duration||0),o=0,a=f.tweens.length;o<a;o++)f.tweens[o].run(r);return u.notifyWith(t,[f,r,n]),r<1&&a?n:(u.resolveWith(t,[f]),!1)},f=u.promise({elem:t,props:e.extend({},n),opts:e.extend(!0,{specialEasing:{},easing:e.easing._default},r),originalProperties:n,originalOptions:r,startTime:l||v(),duration:r.duration,tweens:[],createTween:function(n,r){var o=e.Tween(t,f.opts,n,r,f.opts.specialEasing[n]||f.opts.easing);return f.tweens.push(o),o},stop:function(e){var n=0,r=e?f.tweens.length:0;if(i)return this;for(i=!0;n<r;n++)f.tweens[n].run(1);return e?(u.notifyWith(t,[f,1,0]),u.resolveWith(t,[f,e])):u.rejectWith(t,[f,e]),this}}),p=f.props;for(!function(t,n){var r,o,i,a,s;for(r in t)if(i=n[o=e.camelCase(r)],a=t[r],e.isArray(a)&&(i=a[1],a=t[r]=a[0]),r!==o&&(t[o]=a,delete t[r]),(s=e.cssHooks[o])&&"expand"in s)for(r in a=s.expand(a),delete t[o],a)r in t||(t[r]=a[r],n[r]=i);else n[o]=i}(p,f.opts.specialEasing);a<s;a++)if(o=y.prefilters[a].call(f,t,p,f.opts))return e.isFunction(o.stop)&&(e._queueHooks(f.elem,f.opts.queue).stop=e.proxy(o.stop,o)),o;return e.map(p,m,f),e.isFunction(f.opts.start)&&f.opts.start.call(t,f),e.fx.timer(e.extend(c,{elem:t,anim:f,queue:f.opts.queue})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}return e.Animation=e.extend(y,{tweeners:{"*":[function(e,t){var r=this.createTween(e,t);return s(r.elem,e,n.exec(t),r),r}]},tweener:function(t,n){e.isFunction(t)?(n=t,t=["*"]):t=t.match(r);for(var o,i=0,a=t.length;i<a;i++)o=t[i],y.tweeners[o]=y.tweeners[o]||[],y.tweeners[o].unshift(n)},prefilters:[function(t,n,r){var o,a,s,l,f,d,h,v,g="width"in n||"height"in n,y=this,x={},b=t.style,w=t.nodeType&&i(t),C=u.get(t,"fxshow");for(o in r.queue||(null==(l=e._queueHooks(t,"fx")).unqueued&&(l.unqueued=0,f=l.empty.fire,l.empty.fire=function(){l.unqueued||f()}),l.unqueued++,y.always(function(){y.always(function(){l.unqueued--,e.queue(t,"fx").length||l.empty.fire()})})),n)if(a=n[o],p.test(a)){if(delete n[o],s=s||"toggle"===a,a===(w?"hide":"show")){if("show"!==a||!C||void 0===C[o])continue;w=!0}x[o]=C&&C[o]||e.style(t,o)}if((d=!e.isEmptyObject(n))||!e.isEmptyObject(x))for(o in g&&1===t.nodeType&&(r.overflow=[b.overflow,b.overflowX,b.overflowY],null==(h=C&&C.display)&&(h=u.get(t,"display")),"none"===(v=e.css(t,"display"))&&(h?v=h:(c([t],!0),h=t.style.display||h,v=e.css(t,"display"),c([t]))),("inline"===v||"inline-block"===v&&null!=h)&&"none"===e.css(t,"float")&&(d||(y.done(function(){b.display=h}),null==h&&(v=b.display,h="none"===v?"":v)),b.display="inline-block")),r.overflow&&(b.overflow="hidden",y.always(function(){b.overflow=r.overflow[0],b.overflowX=r.overflow[1],b.overflowY=r.overflow[2]})),d=!1,x)d||(C?"hidden"in C&&(w=C.hidden):C=u.access(t,"fxshow",{display:h}),s&&(C.hidden=!w),w&&c([t],!0),y.done(function(){for(o in w||c([t]),u.remove(t,"fxshow"),x)e.style(t,o,x[o])})),d=m(w?C[o]:0,o,y),o in C||(C[o]=d.start,w&&(d.end=d.start,d.start=0))}],prefilter:function(e,t){t?y.prefilters.unshift(e):y.prefilters.push(e)}}),e.speed=function(n,r,o){var i=n&&"object"==typeof n?e.extend({},n):{complete:o||!o&&r||e.isFunction(n)&&n,duration:n,easing:o&&r||r&&!e.isFunction(r)&&r};return e.fx.off||t.hidden?i.duration=0:i.duration="number"==typeof i.duration?i.duration:i.duration in e.fx.speeds?e.fx.speeds[i.duration]:e.fx.speeds._default,null!=i.queue&&!0!==i.queue||(i.queue="fx"),i.old=i.complete,i.complete=function(){e.isFunction(i.old)&&i.old.call(this),i.queue&&e.dequeue(this,i.queue)},i},e.fn.extend({fadeTo:function(e,t,n,r){return this.filter(i).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,n,r,o){var i=e.isEmptyObject(t),a=e.speed(n,r,o),s=function(){var n=y(this,e.extend({},t),a);(i||u.get(this,"finish"))&&n.stop(!0)};return s.finish=s,i||!1===a.queue?this.each(s):this.queue(a.queue,s)},stop:function(t,n,r){var o=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof t&&(r=n,n=t,t=void 0),n&&!1!==t&&this.queue(t||"fx",[]),this.each(function(){var n=!0,i=null!=t&&t+"queueHooks",a=e.timers,s=u.get(this);if(i)s[i]&&s[i].stop&&o(s[i]);else for(i in s)s[i]&&s[i].stop&&d.test(i)&&o(s[i]);for(i=a.length;i--;)a[i].elem!==this||null!=t&&a[i].queue!==t||(a[i].anim.stop(r),n=!1,a.splice(i,1));!n&&r||e.dequeue(this,t)})},finish:function(t){return!1!==t&&(t=t||"fx"),this.each(function(){var n,r=u.get(this),o=r[t+"queue"],i=r[t+"queueHooks"],a=e.timers,s=o?o.length:0;for(r.finish=!0,e.queue(this,t,[]),i&&i.stop&&i.stop.call(this,!0),n=a.length;n--;)a[n].elem===this&&a[n].queue===t&&(a[n].anim.stop(!0),a.splice(n,1));for(n=0;n<s;n++)o[n]&&o[n].finish&&o[n].finish.call(this);delete r.finish})}}),e.each(["toggle","show","hide"],function(t,n){var r=e.fn[n];e.fn[n]=function(e,t,o){return null==e||"boolean"==typeof e?r.apply(this,arguments):this.animate(g(n,!0),e,t,o)}}),e.each({slideDown:g("show"),slideUp:g("hide"),slideToggle:g("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(t,n){e.fn[t]=function(e,t,r){return this.animate(n,e,t,r)}}),e.timers=[],e.fx.tick=function(){var t,n=0,r=e.timers;for(l=e.now();n<r.length;n++)(t=r[n])()||r[n]!==t||r.splice(n--,1);r.length||e.fx.stop(),l=void 0},e.fx.timer=function(t){e.timers.push(t),t()?e.fx.start():e.timers.pop()},e.fx.interval=13,e.fx.start=function(){f||(f=window.requestAnimationFrame?window.requestAnimationFrame(h):window.setInterval(e.fx.tick,e.fx.interval))},e.fx.stop=function(){window.cancelAnimationFrame?window.cancelAnimationFrame(f):window.clearInterval(f),f=null},e.fx.speeds={slow:600,fast:200,_default:400},e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(4),n(9),n(23)],void 0===(o=function(e,t){"use strict";return e.extend({queue:function(n,r,o){var i;if(n)return r=(r||"fx")+"queue",i=t.get(n,r),o&&(!i||e.isArray(o)?i=t.access(n,r,e.makeArray(o)):i.push(o)),i||[]},dequeue:function(t,n){n=n||"fx";var r=e.queue(t,n),o=r.length,i=r.shift(),a=e._queueHooks(t,n);"inprogress"===i&&(i=r.shift(),o--),i&&("fx"===n&&r.unshift("inprogress"),delete a.stop,i.call(t,function(){e.dequeue(t,n)},a)),!o&&a&&a.empty.fire()},_queueHooks:function(n,r){var o=r+"queueHooks";return t.get(n,o)||t.access(n,o,{empty:e.Callbacks("once memory").add(function(){t.remove(n,[r+"queue",o])})})}}),e.fn.extend({queue:function(t,n){var r=2;return"string"!=typeof t&&(n=t,t="fx",r--),arguments.length<r?e.queue(this[0],t):void 0===n?this:this.each(function(){var r=e.queue(this,t,n);e._queueHooks(this,t),"fx"===t&&"inprogress"!==r[0]&&e.dequeue(this,t)})},dequeue:function(t){return this.each(function(){e.dequeue(this,t)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(n,r){var o,i=1,a=e.Deferred(),s=this,u=this.length,c=function(){--i||a.resolveWith(s,[s])};for("string"!=typeof n&&(r=n,n=void 0),n=n||"fx";u--;)(o=t.get(s[u],n+"queueHooks"))&&o.empty&&(i++,o.empty.add(c));return c(),a.promise(r)}}),e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(6)],void 0===(o=function(e,t){"use strict";return e.Callbacks=function(n){n="string"==typeof n?function(n){var r={};return e.each(n.match(t)||[],function(e,t){r[t]=!0}),r}(n):e.extend({},n);var r,o,i,a,s=[],u=[],c=-1,l=function(){for(a=n.once,i=r=!0;u.length;c=-1)for(o=u.shift();++c<s.length;)!1===s[c].apply(o[0],o[1])&&n.stopOnFalse&&(c=s.length,o=!1);n.memory||(o=!1),r=!1,a&&(s=o?[]:"")},f={add:function(){return s&&(o&&!r&&(c=s.length-1,u.push(o)),function t(r){e.each(r,function(r,o){e.isFunction(o)?n.unique&&f.has(o)||s.push(o):o&&o.length&&"string"!==e.type(o)&&t(o)})}(arguments),o&&!r&&l()),this},remove:function(){return e.each(arguments,function(t,n){for(var r;(r=e.inArray(n,s,r))>-1;)s.splice(r,1),r<=c&&c--}),this},has:function(t){return t?e.inArray(t,s)>-1:s.length>0},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=o="",this},disabled:function(){return!s},lock:function(){return a=u=[],o||r||(s=o=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),r||l()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!i}};return f},e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(1)],void 0===(o=function(e){"use strict";return e.documentElement}.apply(t,r))||(e.exports=o)},function(e,t,n){var r;void 0===(r=function(){"use strict";return function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType}}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r,o;r=[n(29)],void 0===(o=function(e){"use strict";return e.hasOwnProperty}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(13)],void 0===(o=function(e){"use strict";return e.indexOf}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(13)],void 0===(o=function(e){"use strict";return e.slice}.apply(t,r))||(e.exports=o)},function(e,t,n){var r;void 0===(r=function(){"use strict";return{}}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r,o;r=[n(0),n(44),n(3),n(11),n(33)],void 0===(o=function(e,t){"use strict";var n=/\[\]$/,r=/\r?\n/g,o=/^(?:submit|button|image|reset|file)$/i,i=/^(?:input|select|textarea|keygen)/i;function a(t,r,o,i){var s;if(e.isArray(r))e.each(r,function(e,r){o||n.test(t)?i(t,r):a(t+"["+("object"==typeof r&&null!=r?e:"")+"]",r,o,i)});else if(o||"object"!==e.type(r))i(t,r);else for(s in r)a(t+"["+s+"]",r[s],o,i)}return e.param=function(t,n){var r,o=[],i=function(t,n){var r=e.isFunction(n)?n():n;o[o.length]=encodeURIComponent(t)+"="+encodeURIComponent(null==r?"":r)};if(e.isArray(t)||t.jquery&&!e.isPlainObject(t))e.each(t,function(){i(this.name,this.value)});else for(r in t)a(r,t[r],n,i);return o.join("&")},e.fn.extend({serialize:function(){return e.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var t=e.prop(this,"elements");return t?e.makeArray(t):this}).filter(function(){var n=this.type;return this.name&&!e(this).is(":disabled")&&i.test(this.nodeName)&&!o.test(n)&&(this.checked||!t.test(n))}).map(function(t,n){var o=e(this).val();return null==o?null:e.isArray(o)?e.map(o,function(e){return{name:n.name,value:e.replace(r,"\r\n")}}):{name:n.name,value:o.replace(r,"\r\n")}}).get()}}),e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r;void 0===(r=function(){"use strict";return/\?/}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r,o;r=[n(0)],void 0===(o=function(e){"use strict";return e.now()}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(5),n(16),n(2)],void 0===(o=function(e,t,n){"use strict";var r=/^(?:input|select|textarea|button)$/i,o=/^(?:a|area)$/i;e.fn.extend({prop:function(n,r){return t(this,e.prop,n,r,arguments.length>1)},removeProp:function(t){return this.each(function(){delete this[e.propFix[t]||t]})}}),e.extend({prop:function(t,n,r){var o,i,a=t.nodeType;if(3!==a&&8!==a&&2!==a)return 1===a&&e.isXMLDoc(t)||(n=e.propFix[n]||n,i=e.propHooks[n]),void 0!==r?i&&"set"in i&&void 0!==(o=i.set(t,r,n))?o:t[n]=r:i&&"get"in i&&null!==(o=i.get(t,n))?o:t[n]},propHooks:{tabIndex:{get:function(t){var n=e.find.attr(t,"tabindex");return n?parseInt(n,10):r.test(t.nodeName)||o.test(t.nodeName)&&t.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),n.optSelected||(e.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),e.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){e.propFix[this.toLowerCase()]=this})}.apply(t,r))||(e.exports=o)},function(e,t,n){var r;void 0===(r=function(){"use strict";return function(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r,o;r=[n(0),n(18),n(37),n(36),n(17),n(2)],void 0===(o=function(e,t,n,r,o){"use strict";return function(i,a,s){var u,c,l,f,p=i.style;return(s=s||r(i))&&(""!==(f=s.getPropertyValue(a)||s[a])||e.contains(i.ownerDocument,i)||(f=e.style(i,a)),!o.pixelMarginRight()&&t.test(f)&&n.test(a)&&(u=p.width,c=p.minWidth,l=p.maxWidth,p.minWidth=p.maxWidth=p.width=f,f=s.width,p.width=u,p.minWidth=c,p.maxWidth=l)),void 0!==f?f+"":f}}.apply(t,r))||(e.exports=o)},function(e,t,n){var r;void 0===(r=function(){"use strict";return function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=window),t.getComputedStyle(e)}}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r;void 0===(r=function(){"use strict";return/^margin/}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r,o;r=[n(0),n(20)],void 0===(o=function(e,t){"use strict";return function(n,r,o,i){var a,s=1,u=20,c=i?function(){return i.cur()}:function(){return e.css(n,r,"")},l=c(),f=o&&o[3]||(e.cssNumber[r]?"":"px"),p=(e.cssNumber[r]||"px"!==f&&+l)&&t.exec(e.css(n,r));if(p&&p[3]!==f){f=f||p[3],o=o||[],p=+l||1;do{p/=s=s||".5",e.style(n,r,p+f)}while(s!==(s=c()/l)&&1!==s&&--u)}return o&&(p=+p||+l||0,a=o[1]?p+(o[1]+1)*o[2]:+o[2],i&&(i.unit=f,i.start=p,i.end=a)),a}}.apply(t,r))||(e.exports=o)},function(e,t,n){var r;void 0===(r=function(){"use strict";return function(e,t,n,r){var o,i,a={};for(i in t)a[i]=e.style[i],e.style[i]=t[i];for(i in o=n.apply(e,r||[]),t)e.style[i]=a[i];return o}}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r;void 0===(r=function(){"use strict";return["Top","Right","Bottom","Left"]}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r,o;r=[n(0),n(2)],void 0===(o=function(e){"use strict";return function(t,n){return"none"===(t=n||t).style.display||""===t.style.display&&e.contains(t.ownerDocument,t)&&"none"===e.css(t,"display")}}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(1),n(9)],void 0===(o=function(e,t){"use strict";var n=e.Deferred();function r(){t.removeEventListener("DOMContentLoaded",r),window.removeEventListener("load",r),e.ready()}e.fn.ready=function(e){return n.then(e),this},e.extend({isReady:!1,readyWait:1,holdReady:function(t){t?e.readyWait++:e.ready(!0)},ready:function(r){(!0===r?--e.readyWait:e.isReady)||(e.isReady=!0,!0!==r&&--e.readyWait>0||n.resolveWith(t,[e]))}}),e.ready.then=n.then,"complete"===t.readyState||"loading"!==t.readyState&&!t.documentElement.doScroll?window.setTimeout(e.ready):(t.addEventListener("DOMContentLoaded",r),window.addEventListener("load",r))}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(45)],void 0===(o=function(e){"use strict";return new e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r;void 0===(r=function(){"use strict";return/^(?:checkbox|radio)$/i}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r,o;r=[n(0),n(6),n(25)],void 0===(o=function(e,t,n){"use strict";function r(){this.expando=e.expando+r.uid++}return r.uid=1,r.prototype={cache:function(e){var t=e[this.expando];return t||(t={},n(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(t,n,r){var o,i=this.cache(t);if("string"==typeof n)i[e.camelCase(n)]=r;else for(o in n)i[e.camelCase(o)]=n[o];return i},get:function(t,n){return void 0===n?this.cache(t):t[this.expando]&&t[this.expando][e.camelCase(n)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(n,r){var o,i=n[this.expando];if(void 0!==i){if(void 0!==r){o=(r=e.isArray(r)?r.map(e.camelCase):(r=e.camelCase(r))in i?[r]:r.match(t)||[]).length;for(;o--;)delete i[r[o]]}(void 0===r||e.isEmptyObject(i))&&(n.nodeType?n[this.expando]=void 0:delete n[this.expando])}},hasData:function(t){var n=t[this.expando];return void 0!==n&&!e.isEmptyObject(n)}},r}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(4)],void 0===(o=function(e){"use strict";return function(t,n){for(var r=0,o=t.length;r<o;r++)e.set(t[r],"globalEval",!n||e.get(n[r],"globalEval"))}}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0)],void 0===(o=function(e){"use strict";return function(t,n){var r=void 0!==t.getElementsByTagName?t.getElementsByTagName(n||"*"):void 0!==t.querySelectorAll?t.querySelectorAll(n||"*"):[];return void 0===n||n&&e.nodeName(t,n)?e.merge([t],r):r}}.apply(t,r))||(e.exports=o)},function(e,t,n){var r;void 0===(r=function(){"use strict";var e={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};return e.optgroup=e.option,e.tbody=e.tfoot=e.colgroup=e.caption=e.thead,e.th=e.td,e}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r;void 0===(r=function(){"use strict";return/^$|\/(?:java|ecma)script/i}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r;void 0===(r=function(){"use strict";return/<([a-z][^\/\0>\x20\t\r\n\f]+)/i}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r,o;r=[n(0),n(50),n(49),n(48),n(47),n(46)],void 0===(o=function(e,t,n,r,o,i){"use strict";var a=/<|&#?\w+;/;return function(s,u,c,l,f){for(var p,d,h,v,g,m,y=u.createDocumentFragment(),x=[],b=0,w=s.length;b<w;b++)if((p=s[b])||0===p)if("object"===e.type(p))e.merge(x,p.nodeType?[p]:p);else if(a.test(p)){for(d=d||y.appendChild(u.createElement("div")),h=(t.exec(p)||["",""])[1].toLowerCase(),v=r[h]||r._default,d.innerHTML=v[1]+e.htmlPrefilter(p)+v[2],m=v[0];m--;)d=d.lastChild;e.merge(x,d.childNodes),(d=y.firstChild).textContent=""}else x.push(u.createTextNode(p));for(y.textContent="",b=0;p=x[b++];)if(l&&e.inArray(p,l)>-1)f&&f.push(p);else if(g=e.contains(p.ownerDocument,p),d=o(y.appendChild(p),"script"),g&&i(d),c)for(m=0;p=d[m++];)n.test(p.type||"")&&c.push(p);return y}}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(2)],void 0===(o=function(e){"use strict";return e.expr.match.needsContext}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(27),n(52),n(2)],void 0===(o=function(e,t,n){"use strict";var r=/^.[^:#\[\.,]*$/;function o(n,o,i){if(e.isFunction(o))return e.grep(n,function(e,t){return!!o.call(e,t,e)!==i});if(o.nodeType)return e.grep(n,function(e){return e===o!==i});if("string"==typeof o){if(r.test(o))return e.filter(o,n,i);o=e.filter(o,n)}return e.grep(n,function(e){return t.call(o,e)>-1!==i&&1===e.nodeType})}e.filter=function(t,n,r){var o=n[0];return r&&(t=":not("+t+")"),1===n.length&&1===o.nodeType?e.find.matchesSelector(o,t)?[o]:[]:e.find.matches(t,e.grep(n,function(e){return 1===e.nodeType}))},e.fn.extend({find:function(t){var n,r,o=this.length,i=this;if("string"!=typeof t)return this.pushStack(e(t).filter(function(){for(n=0;n<o;n++)if(e.contains(i[n],this))return!0}));for(r=this.pushStack([]),n=0;n<o;n++)e.find(t,i[n],r);return o>1?e.uniqueSort(r):r},filter:function(e){return this.pushStack(o(this,e||[],!1))},not:function(e){return this.pushStack(o(this,e||[],!0))},is:function(t){return!!o(this,"string"==typeof t&&n.test(t)?e(t):t||[],!1).length}})}.apply(t,r))||(e.exports=o)},function(e,t,n){var r;void 0===(r=function(){"use strict";return/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r,o;r=[n(1)],void 0===(o=function(e){"use strict";return function(t,n){var r=(n=n||e).createElement("script");r.text=t,n.head.appendChild(r).parentNode.removeChild(r)}}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(26)],void 0===(o=function(e){"use strict";return e.toString}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(13)],void 0===(o=function(e){"use strict";return e.push}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(13)],void 0===(o=function(e){"use strict";return e.concat}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(2),n(11),n(23),n(9),n(89),n(42),n(88),n(22),n(87),n(84),n(10),n(80),n(79),n(14),n(77),n(98),n(12),n(74),n(30),n(8),n(73),n(72),n(71),n(70),n(67),n(21),n(66),n(65),n(64),n(63),n(62)],void 0===(o=function(e){"use strict";return window.jQuery=window.$=e}.apply(t,r))||(e.exports=o)},function(e,t,n){"use strict";var r=function(e,t,n,r){var o;if(o=r?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e),n){Array.isArray(n)||(n=[n]);for(var i=0;i<n.length;i++){var a=n[i];"string"!=typeof a&&"number"!=typeof a||(a=document.createTextNode(a)),a&&o.appendChild(a)}}if(t)for(var s in t)if("style"===s)for(var u in t[s])o.style[u]=t[s][u];else 0===s.indexOf("data-")||r?o.setAttribute(s,t[s]):o[s]=t[s];return o},o={tag:function(e,t,n){return r(e,t,n,!1)},svgTag:function(e,t,n){return r(e,t,n,!0)},createIcon:function(e){var t=document.createElement("i");return t.className="icon_"+e,t},createTooltip:function(e,t){var n="tooltip_wrap";switch(t.direction){case"left":n+=" to_left";break;case"top-left":n+=" to_top_left";break;case"top-right":n+=" to_top_right"}return o.tag("span",{className:n},[o.tag("span",{className:"tip"},e)])},hasAncestor:function(e,t){for(var n=e.parentNode;n;){if(n===t)return!0;n=n.parentNode}return!1},addClass:function(e,t){var n=new RegExp("\\b"+t+"\\b");e.className.match(n)||(e.className+=" "+t)},removeClass:function(e,t){var n=new RegExp("\\s*\\b"+t+"\\b","g");e.className=e.className.replace(n,"")},toggleClass:function(e,t,n){void 0===n&&(n=!o.hasClass(e,t)),n?o.addClass(e,t):o.removeClass(e,t)},hasClass:function(e,t){var n=new RegExp("\\b"+t+"\\b");return!!e.className.match(n)},getStyle:function(e,t){return e.currentStyle?e.currentStyle[styleProp]:window.getComputedStyle?document.defaultView.getComputedStyle(e,null).getPropertyValue(t):""},documentPosition:function(e){for(var t={x:0,y:0},n=e;n;)t.x+=n.offsetLeft,t.y+=n.offsetTop,n=n.offsetParent;return t},windowPosition:function(e){var t=o.documentPosition(e);return t.x-=window.scrollX,t.y-=window.scrollY,t},delegate:function(e,t,n,r){if("focus"===e||"blur"===e)throw"Focus and blur delegation are not yet supported";var o=function(){return!1};if("string"==typeof n)n=n.toUpperCase(),o=function(e){return e.tagName===n};else if(n.className){var i=new RegExp("\\b"+n.className+"\\b");o=function(e){return e.className.match(i)}}else n.id&&(o=function(e){return e.id===n.id});t.addEventListener(e,function(e){for(var t=e.target;t&&t!==document;)o(t)&&r.call(t,e),t=t.parentNode})},prettyNumber:function(e){var t,n=Math.ceil(Math.log(Math.abs(e)+1)/Math.LN10);if(n>6&&n<10)return(0|(t=e/1e6))===t||0===Math.round(e%1e6/1e5)?(0|t)+"M":(0|t)+"."+Math.round(e%1e6/1e5)+"M";if(n>5)return(0|(t=e/1e3))===t||0===Math.round(e%1e3/100)?(0|t)+"K":(0|t)+"."+Math.round(e%1e3/100)+"K";if(n>3){var r=e%1e3|0;return r<10?r="00"+r:r<100&&(r="0"+r),(e/1e3|0)+","+r}return(0|e)+""},Animate:{show:function(e,t){"undefined"===t&&(t=0),e.style.display="block",e.style.opacity=0,setTimeout(function(){e.style.opacity=1},t)},hide:function(e,t){window.getComputedStyle(e).opacity>0&&(void 0===t&&(t=500),e.style.opacity=0,setTimeout(function(){e.style.display="none"},t))}},ComponentProto:{attach:function(e){return this.node?(e.appendChild(this.node),this):null},remove:function(){return this.node&&this.node.parentNode?(this.node.parentNode.removeChild(this.node),this):null}}};e.exports=o},function(e,t,n){"use strict";var r,o,i,a,s,u=window,c={},l=function(){},f=function(e,t){if(function(e){return null===e.offsetParent}(e))return!1;var n=e.getBoundingClientRect();return n.right>=t.l&&n.bottom>=t.t&&n.left<=t.r&&n.top<=t.b},p=function(){!a&&o||(clearTimeout(o),o=setTimeout(function(){c.render(),o=null},i))};c.init=function(e){var t=(e=e||{}).offset||0,n=e.offsetVertical||t,o=e.offsetHorizontal||t,f=function(e,t){return parseInt(e||t,10)};r={t:f(e.offsetTop,n),b:f(e.offsetBottom,n),l:f(e.offsetLeft,o),r:f(e.offsetRight,o)},i=f(e.throttle,250),a=!1!==e.debounce,s=!!e.unload,l=e.callback||l,c.render(),document.addEventListener?(u.addEventListener("scroll",p,!1),u.addEventListener("load",p,!1)):(u.attachEvent("onscroll",p),u.attachEvent("onload",p))},c.render=function(e){for(var t,n,o=(e||document).querySelectorAll("[data-echo], [data-echo-background]"),i=o.length,a={l:0-r.l,t:0-r.t,b:(u.innerHeight||document.documentElement.clientHeight)+r.b,r:(u.innerWidth||document.documentElement.clientWidth)+r.r},p=0;p<i;p++)n=o[p],f(n,a)?(s&&n.setAttribute("data-echo-placeholder",n.src),null!==n.getAttribute("data-echo-background")?n.style.backgroundImage="url("+n.getAttribute("data-echo-background")+")":n.src!==(t=n.getAttribute("data-echo"))&&(n.src=t),s||(n.removeAttribute("data-echo"),n.removeAttribute("data-echo-background")),l(n,"load")):s&&(t=n.getAttribute("data-echo-placeholder"))&&(null!==n.getAttribute("data-echo-background")?n.style.backgroundImage="url("+t+")":n.src=t,n.removeAttribute("data-echo-placeholder"),l(n,"unload"));i||c.detach()},c.detach=function(){document.removeEventListener?u.removeEventListener("scroll",p):u.detachEvent("onscroll",p),clearTimeout(o)},e.exports=c},function(e,t,n){var r,o;r=[n(0)],void 0===(o=function(n){"use strict";void 0===(o=function(){return n}.apply(t,r=[]))||(e.exports=o)}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0)],void 0===(o=function(e){"use strict";e.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),e.parseJSON=JSON.parse}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(5),n(12)],void 0===(o=function(e,t){"use strict";return e.each({Height:"height",Width:"width"},function(n,r){e.each({padding:"inner"+n,content:r,"":"outer"+n},function(o,i){e.fn[i]=function(a,s){var u=arguments.length&&(o||"boolean"!=typeof a),c=o||(!0===a||!0===s?"margin":"border");return t(this,function(t,r,o){var a;return e.isWindow(t)?0===i.indexOf("outer")?t["inner"+n]:t.document.documentElement["client"+n]:9===t.nodeType?(a=t.documentElement,Math.max(t.body["scroll"+n],a["scroll"+n],t.body["offset"+n],a["offset"+n],a["client"+n])):void 0===o?e.css(t,r,c):e.style(t,r,o,c)},r,u?a:void 0,u)}})}),e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(5),n(1),n(24),n(18),n(35),n(34),n(17),n(3),n(12),n(2)],void 0===(o=function(e,t,n,r,o,i,a,s){"use strict";function u(t){return e.isWindow(t)?t:9===t.nodeType&&t.defaultView}return e.offset={setOffset:function(t,n,r){var o,i,a,s,u,c,l=e.css(t,"position"),f=e(t),p={};"static"===l&&(t.style.position="relative"),u=f.offset(),a=e.css(t,"top"),c=e.css(t,"left"),("absolute"===l||"fixed"===l)&&(a+c).indexOf("auto")>-1?(s=(o=f.position()).top,i=o.left):(s=parseFloat(a)||0,i=parseFloat(c)||0),e.isFunction(n)&&(n=n.call(t,r,e.extend({},u))),null!=n.top&&(p.top=n.top-u.top+s),null!=n.left&&(p.left=n.left-u.left+i),"using"in n?n.using.call(t,p):f.css(p)}},e.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(n){e.offset.setOffset(this,t,n)});var n,r,o,i,a=this[0];return a?a.getClientRects().length?(o=a.getBoundingClientRect()).width||o.height?(r=u(i=a.ownerDocument),n=i.documentElement,{top:o.top+r.pageYOffset-n.clientTop,left:o.left+r.pageXOffset-n.clientLeft}):o:{top:0,left:0}:void 0},position:function(){if(this[0]){var t,n,r=this[0],o={top:0,left:0};return"fixed"===e.css(r,"position")?n=r.getBoundingClientRect():(t=this.offsetParent(),n=this.offset(),e.nodeName(t[0],"html")||(o=t.offset()),o={top:o.top+e.css(t[0],"borderTopWidth",!0),left:o.left+e.css(t[0],"borderLeftWidth",!0)}),{top:n.top-o.top-e.css(r,"marginTop",!0),left:n.left-o.left-e.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent;t&&"static"===e.css(t,"position");)t=t.offsetParent;return t||r})}}),e.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(n,r){var o="pageYOffset"===r;e.fn[n]=function(e){return t(this,function(e,t,n){var i=u(e);if(void 0===n)return i?i[r]:e[t];i?i.scrollTo(o?i.pageXOffset:n,o?n:i.pageYOffset):e[t]=n},n,e,arguments.length)}}),e.each(["top","left"],function(t,n){e.cssHooks[n]=a(s.pixelPosition,function(t,r){if(r)return r=i(t,n),o.test(r)?e(t).position()[n]+"px":r})}),e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(2),n(21)],void 0===(o=function(e){"use strict";e.expr.pseudos.animated=function(t){return e.grep(e.timers,function(e){return t===e.elem}).length}}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(10)],void 0===(o=function(e){"use strict";e.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(t,n){e.fn[n]=function(e){return this.on(n,e)}})}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(1),n(7)],void 0===(o=function(e,t){"use strict";return t.createHTMLDocument=function(){var t=e.implementation.createHTMLDocument("").body;return t.innerHTML="<form></form><form></form>",2===t.childNodes.length}(),t}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(1),n(54),n(51),n(68)],void 0===(o=function(e,t,n,r,o){"use strict";return e.parseHTML=function(i,a,s){return"string"!=typeof i?[]:("boolean"==typeof a&&(s=a,a=!1),a||(o.createHTMLDocument?((u=(a=t.implementation.createHTMLDocument("")).createElement("base")).href=t.location.href,a.head.appendChild(u)):a=t),c=n.exec(i),l=!s&&[],c?[a.createElement(c[1])]:(c=r([i],a,l),l&&l.length&&e(l).remove(),e.merge([],c.childNodes)));var u,c,l},e.parseHTML}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(69),n(8),n(11),n(14),n(2)],void 0===(o=function(e){"use strict";e.fn.load=function(t,n,r){var o,i,a,s=this,u=t.indexOf(" ");return u>-1&&(o=e.trim(t.slice(u)),t=t.slice(0,u)),e.isFunction(n)?(r=n,n=void 0):n&&"object"==typeof n&&(i="POST"),s.length>0&&e.ajax({url:t,type:i||"GET",dataType:"html",data:n}).done(function(t){a=arguments,s.html(o?e("<div>").append(e.parseHTML(t)).find(o):t)}).always(r&&function(e,t){s.each(function(){r.apply(this,a||[e.responseText,t,e])})}),this}}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(32),n(31),n(8)],void 0===(o=function(e,t,n){"use strict";var r=[],o=/(=)\?(?=&|$)|\?\?/;e.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var n=r.pop()||e.expando+"_"+t++;return this[n]=!0,n}}),e.ajaxPrefilter("json jsonp",function(t,i,a){var s,u,c,l=!1!==t.jsonp&&(o.test(t.url)?"url":"string"==typeof t.data&&0===(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&o.test(t.data)&&"data");if(l||"jsonp"===t.dataTypes[0])return s=t.jsonpCallback=e.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,l?t[l]=t[l].replace(o,"$1"+s):!1!==t.jsonp&&(t.url+=(n.test(t.url)?"&":"?")+t.jsonp+"="+s),t.converters["script json"]=function(){return c||e.error(s+" was not called"),c[0]},t.dataTypes[0]="json",u=window[s],window[s]=function(){c=arguments},a.always(function(){void 0===u?e(window).removeProp(s):window[s]=u,t[s]&&(t.jsonpCallback=i.jsonpCallback,r.push(s)),c&&e.isFunction(u)&&u(c[0]),c=u=void 0}),"script"})}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(1),n(8)],void 0===(o=function(e,t){"use strict";e.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),e.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(t){return e.globalEval(t),t}}}),e.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),e.ajaxTransport("script",function(n){var r,o;if(n.crossDomain)return{send:function(i,a){r=e("<script>").prop({charset:n.scriptCharset,src:n.url}).on("load error",o=function(e){r.remove(),o=null,e&&a("error"===e.type?404:200,e.type)}),t.head.appendChild(r[0])},abort:function(){o&&o()}}})}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(7),n(8)],void 0===(o=function(e,t){"use strict";e.ajaxSettings.xhr=function(){try{return new window.XMLHttpRequest}catch(e){}};var n={0:200,1223:204},r=e.ajaxSettings.xhr();t.cors=!!r&&"withCredentials"in r,t.ajax=r=!!r,e.ajaxTransport(function(e){var o,i;if(t.cors||r&&!e.crossDomain)return{send:function(t,r){var a,s=e.xhr();if(s.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(a in e.xhrFields)s[a]=e.xhrFields[a];for(a in e.mimeType&&s.overrideMimeType&&s.overrideMimeType(e.mimeType),e.crossDomain||t["X-Requested-With"]||(t["X-Requested-With"]="XMLHttpRequest"),t)s.setRequestHeader(a,t[a]);o=function(e){return function(){o&&(o=i=s.onload=s.onerror=s.onabort=s.onreadystatechange=null,"abort"===e?s.abort():"error"===e?"number"!=typeof s.status?r(0,"error"):r(s.status,s.statusText):r(n[s.status]||s.status,s.statusText,"text"!==(s.responseType||"text")||"string"!=typeof s.responseText?{binary:s.response}:{text:s.responseText},s.getAllResponseHeaders()))}},s.onload=o(),i=s.onerror=o("error"),void 0!==s.onabort?s.onabort=i:s.onreadystatechange=function(){4===s.readyState&&window.setTimeout(function(){o&&i()})},o=o("abort");try{s.send(e.hasContent&&e.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}})}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(2)],void 0===(o=function(e){"use strict";e.expr.pseudos.hidden=function(t){return!e.expr.pseudos.visible(t)},e.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0)],void 0===(o=function(e){"use strict";return e.parseXML=function(t){var n;if(!t||"string"!=typeof t)return null;try{n=(new window.DOMParser).parseFromString(t,"text/xml")}catch(e){n=void 0}return n&&!n.getElementsByTagName("parsererror").length||e.error("Invalid XML: "+t),n},e.parseXML}.apply(t,r))||(e.exports=o)},function(e,t,n){var r;void 0===(r=function(){"use strict";return window.location}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r,o;r=[n(8)],void 0===(o=function(e){"use strict";return e._evalUrl=function(t){return e.ajax({url:t,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,throws:!0})},e._evalUrl}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(7)],void 0===(o=function(e){"use strict";return e.focusin="onfocusin"in window,e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(4),n(78),n(10),n(15)],void 0===(o=function(e,t,n){"use strict";return n.focusin||e.each({focus:"focusin",blur:"focusout"},function(n,r){var o=function(t){e.event.simulate(r,t.target,e.event.fix(t))};e.event.special[r]={setup:function(){var e=this.ownerDocument||this,i=t.access(e,r);i||e.addEventListener(n,o,!0),t.access(e,r,(i||0)+1)},teardown:function(){var e=this.ownerDocument||this,i=t.access(e,r)-1;i?t.access(e,r,i):(e.removeEventListener(n,o,!0),t.remove(e,r))}}}),e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(10),n(15)],void 0===(o=function(e){"use strict";e.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(t,n){e.fn[n]=function(e,t){return arguments.length>0?this.on(n,null,e,t):this.trigger(n)}}),e.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}})}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(16),n(3)],void 0===(o=function(e,t){"use strict";var n=/\r/g,r=/[\x20\t\r\n\f]+/g;e.fn.extend({val:function(t){var r,o,i,a=this[0];return arguments.length?(i=e.isFunction(t),this.each(function(n){var o;1===this.nodeType&&(null==(o=i?t.call(this,n,e(this).val()):t)?o="":"number"==typeof o?o+="":e.isArray(o)&&(o=e.map(o,function(e){return null==e?"":e+""})),(r=e.valHooks[this.type]||e.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,o,"value")||(this.value=o))})):a?(r=e.valHooks[a.type]||e.valHooks[a.nodeName.toLowerCase()])&&"get"in r&&void 0!==(o=r.get(a,"value"))?o:"string"==typeof(o=a.value)?o.replace(n,""):null==o?"":o:void 0}}),e.extend({valHooks:{option:{get:function(t){var n=e.find.attr(t,"value");return null!=n?n:e.trim(e.text(t)).replace(r," ")}},select:{get:function(t){for(var n,r,o=t.options,i=t.selectedIndex,a="select-one"===t.type,s=a?null:[],u=a?i+1:o.length,c=i<0?u:a?i:0;c<u;c++)if(((r=o[c]).selected||c===i)&&!r.disabled&&(!r.parentNode.disabled||!e.nodeName(r.parentNode,"optgroup"))){if(n=e(r).val(),a)return n;s.push(n)}return s},set:function(t,n){for(var r,o,i=t.options,a=e.makeArray(n),s=i.length;s--;)((o=i[s]).selected=e.inArray(e.valHooks.option.get(o),a)>-1)&&(r=!0);return r||(t.selectedIndex=-1),a}}}}),e.each(["radio","checkbox"],function(){e.valHooks[this]={set:function(t,n){if(e.isArray(n))return t.checked=e.inArray(e(t).val(),n)>-1}},t.checkOn||(e.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})})}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(6),n(4),n(3)],void 0===(o=function(e,t,n){"use strict";var r=/[\t\r\n\f]/g;function o(e){return e.getAttribute&&e.getAttribute("class")||""}e.fn.extend({addClass:function(n){var i,a,s,u,c,l,f,p=0;if(e.isFunction(n))return this.each(function(t){e(this).addClass(n.call(this,t,o(this)))});if("string"==typeof n&&n)for(i=n.match(t)||[];a=this[p++];)if(u=o(a),s=1===a.nodeType&&(" "+u+" ").replace(r," ")){for(l=0;c=i[l++];)s.indexOf(" "+c+" ")<0&&(s+=c+" ");u!==(f=e.trim(s))&&a.setAttribute("class",f)}return this},removeClass:function(n){var i,a,s,u,c,l,f,p=0;if(e.isFunction(n))return this.each(function(t){e(this).removeClass(n.call(this,t,o(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof n&&n)for(i=n.match(t)||[];a=this[p++];)if(u=o(a),s=1===a.nodeType&&(" "+u+" ").replace(r," ")){for(l=0;c=i[l++];)for(;s.indexOf(" "+c+" ")>-1;)s=s.replace(" "+c+" "," ");u!==(f=e.trim(s))&&a.setAttribute("class",f)}return this},toggleClass:function(r,i){var a=typeof r;return"boolean"==typeof i&&"string"===a?i?this.addClass(r):this.removeClass(r):e.isFunction(r)?this.each(function(t){e(this).toggleClass(r.call(this,t,o(this),i),i)}):this.each(function(){var i,s,u,c;if("string"===a)for(s=0,u=e(this),c=r.match(t)||[];i=c[s++];)u.hasClass(i)?u.removeClass(i):u.addClass(i);else void 0!==r&&"boolean"!==a||((i=o(this))&&n.set(this,"__className__",i),this.setAttribute&&this.setAttribute("class",i||!1===r?"":n.get(this,"__className__")||""))})},hasClass:function(e){var t,n,i=0;for(t=" "+e+" ";n=this[i++];)if(1===n.nodeType&&(" "+o(n)+" ").replace(r," ").indexOf(t)>-1)return!0;return!1}})}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(5),n(16),n(6),n(2)],void 0===(o=function(e,t,n,r){"use strict";var o,i=e.expr.attrHandle;e.fn.extend({attr:function(n,r){return t(this,e.attr,n,r,arguments.length>1)},removeAttr:function(t){return this.each(function(){e.removeAttr(this,t)})}}),e.extend({attr:function(t,n,r){var i,a,s=t.nodeType;if(3!==s&&8!==s&&2!==s)return void 0===t.getAttribute?e.prop(t,n,r):(1===s&&e.isXMLDoc(t)||(a=e.attrHooks[n.toLowerCase()]||(e.expr.match.bool.test(n)?o:void 0)),void 0!==r?null===r?void e.removeAttr(t,n):a&&"set"in a&&void 0!==(i=a.set(t,r,n))?i:(t.setAttribute(n,r+""),r):a&&"get"in a&&null!==(i=a.get(t,n))?i:null==(i=e.find.attr(t,n))?void 0:i)},attrHooks:{type:{set:function(t,r){if(!n.radioValue&&"radio"===r&&e.nodeName(t,"input")){var o=t.value;return t.setAttribute("type",r),o&&(t.value=o),r}}}},removeAttr:function(e,t){var n,o=0,i=t&&t.match(r);if(i&&1===e.nodeType)for(;n=i[o++];)e.removeAttribute(n)}}),o={set:function(t,n,r){return!1===n?e.removeAttr(t,r):t.setAttribute(r,r),r}},e.each(e.expr.match.bool.source.match(/\w+/g),function(t,n){var r=i[n]||e.find.attr;i[n]=function(e,t,n){var o,a,s=t.toLowerCase();return n||(a=i[s],i[s]=o,o=null!=r(e,t,n)?s:null,i[s]=a),o}})}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(83),n(33),n(82),n(81)],void 0===(o=function(e){"use strict";return e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(12)],void 0===(o=function(e){"use strict";function t(e,n,r,o,i){return new t.prototype.init(e,n,r,o,i)}e.Tween=t,t.prototype={constructor:t,init:function(t,n,r,o,i,a){this.elem=t,this.prop=r,this.easing=i||e.easing._default,this.options=n,this.start=this.now=this.cur(),this.end=o,this.unit=a||(e.cssNumber[r]?"":"px")},cur:function(){var e=t.propHooks[this.prop];return e&&e.get?e.get(this):t.propHooks._default.get(this)},run:function(n){var r,o=t.propHooks[this.prop];return this.options.duration?this.pos=r=e.easing[this.easing](n,this.options.duration*n,0,1,this.options.duration):this.pos=r=n,this.now=(this.end-this.start)*r+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),o&&o.set?o.set(this):t.propHooks._default.set(this),this}},t.prototype.init.prototype=t.prototype,t.propHooks={_default:{get:function(t){var n;return 1!==t.elem.nodeType||null!=t.elem[t.prop]&&null==t.elem.style[t.prop]?t.elem[t.prop]:(n=e.css(t.elem,t.prop,""))&&"auto"!==n?n:0},set:function(t){e.fx.step[t.prop]?e.fx.step[t.prop](t):1!==t.elem.nodeType||null==t.elem.style[e.cssProps[t.prop]]&&!e.cssHooks[t.prop]?t.elem[t.prop]=t.now:e.style(t.elem,t.prop,t.now+t.unit)}}},t.propHooks.scrollTop=t.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},e.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},e.fx=t.prototype.init,e.fx.step={}}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(4),n(41)],void 0===(o=function(e,t,n){"use strict";var r={};function o(t){var n,o=t.ownerDocument,i=t.nodeName,a=r[i];return a||(n=o.body.appendChild(o.createElement(i)),a=e.css(n,"display"),n.parentNode.removeChild(n),"none"===a&&(a="block"),r[i]=a,a)}function i(e,r){for(var i,a,s=[],u=0,c=e.length;u<c;u++)(a=e[u]).style&&(i=a.style.display,r?("none"===i&&(s[u]=t.get(a,"display")||null,s[u]||(a.style.display="")),""===a.style.display&&n(a)&&(s[u]=o(a))):"none"!==i&&(s[u]="none",t.set(a,"display",i)));for(u=0;u<c;u++)null!=s[u]&&(e[u].style.display=s[u]);return e}return e.fn.extend({show:function(){return i(this,!0)},hide:function(){return i(this)},toggle:function(t){return"boolean"==typeof t?t?this.show():this.hide():this.each(function(){n(this)?e(this).show():e(this).hide()})}}),i}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(22),n(21)],void 0===(o=function(e){"use strict";return e.fn.delay=function(t,n){return t=e.fx&&e.fx.speeds[t]||t,n=n||"fx",this.queue(n,function(e,n){var r=window.setTimeout(e,t);n.stop=function(){window.clearTimeout(r)}})},e.fn.delay}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(5),n(4),n(43)],void 0===(o=function(e,t,n,r){"use strict";var o=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,i=/[A-Z]/g;function a(e,t,n){var a;if(void 0===n&&1===e.nodeType)if(a="data-"+t.replace(i,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(a))){try{n="true"===n||"false"!==n&&("null"===n?null:+n+""===n?+n:o.test(n)?JSON.parse(n):n)}catch(e){}r.set(e,t,n)}else n=void 0;return n}return e.extend({hasData:function(e){return r.hasData(e)||n.hasData(e)},data:function(e,t,n){return r.access(e,t,n)},removeData:function(e,t){r.remove(e,t)},_data:function(e,t,r){return n.access(e,t,r)},_removeData:function(e,t){n.remove(e,t)}}),e.fn.extend({data:function(o,i){var s,u,c,l=this[0],f=l&&l.attributes;if(void 0===o){if(this.length&&(c=r.get(l),1===l.nodeType&&!n.get(l,"hasDataAttrs"))){for(s=f.length;s--;)f[s]&&0===(u=f[s].name).indexOf("data-")&&(u=e.camelCase(u.slice(5)),a(l,u,c[u]));n.set(l,"hasDataAttrs",!0)}return c}return"object"==typeof o?this.each(function(){r.set(this,o)}):t(this,function(e){var t;if(l&&void 0===e)return void 0!==(t=r.get(l,o))?t:void 0!==(t=a(l,o))?t:void 0;this.each(function(){r.set(this,o,e)})},null,i,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){r.remove(this,e)})}}),e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(0),n(9)],void 0===(o=function(e){"use strict";var t=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;e.Deferred.exceptionHook=function(e,n){window.console&&window.console.warn&&e&&t.test(e.name)&&window.console.warn("jQuery.Deferred exception: "+e.message,e.stack,n)}}.apply(t,r))||(e.exports=o)},function(e,t,n){var r;void 0===(r=function(){"use strict";return function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r,o;r=[n(0)],void 0===(o=function(e){"use strict";return function(t,n,r){for(var o=[],i=void 0!==r;(t=t[n])&&9!==t.nodeType;)if(1===t.nodeType){if(i&&e(t).is(r))break;o.push(t)}return o}}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(1),n(7)],void 0===(o=function(e,t){"use strict";return function(){var n=e.createDocumentFragment().appendChild(e.createElement("div")),r=e.createElement("input");r.setAttribute("type","radio"),r.setAttribute("checked","checked"),r.setAttribute("name","t"),n.appendChild(r),t.checkClone=n.cloneNode(!0).cloneNode(!0).lastChild.checked,n.innerHTML="<textarea>x</textarea>",t.noCloneChecked=!!n.cloneNode(!0).lastChild.defaultValue}(),t}.apply(t,r))||(e.exports=o)},function(e,t,n){var r;
/*!
 * Sizzle CSS Selector Engine v2.3.0
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-01-04
 */
/*!
 * Sizzle CSS Selector Engine v2.3.0
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-01-04
 */
!function(o){var i,a,s,u,c,l,f,p,d,h,v,g,m,y,x,b,w,C,T,S="sizzle"+1*new Date,k=o.document,E=0,N=0,j=le(),A=le(),D=le(),O=function(e,t){return e===t&&(v=!0),0},L={}.hasOwnProperty,q=[],_=q.pop,H=q.push,I=q.push,F=q.slice,M=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},P="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",R="[\\x20\\t\\r\\n\\f]",B="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",W="\\["+R+"*("+B+")(?:"+R+"*([*^$|!~]?=)"+R+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+B+"))|)"+R+"*\\]",$=":("+B+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+W+")*)|.*)\\)|)",z=new RegExp(R+"+","g"),V=new RegExp("^"+R+"+|((?:^|[^\\\\])(?:\\\\.)*)"+R+"+$","g"),X=new RegExp("^"+R+"*,"+R+"*"),U=new RegExp("^"+R+"*([>+~]|"+R+")"+R+"*"),K=new RegExp("="+R+"*([^\\]'\"]*?)"+R+"*\\]","g"),Y=new RegExp($),G=new RegExp("^"+B+"$"),J={ID:new RegExp("^#("+B+")"),CLASS:new RegExp("^\\.("+B+")"),TAG:new RegExp("^("+B+"|[*])"),ATTR:new RegExp("^"+W),PSEUDO:new RegExp("^"+$),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+R+"*(even|odd|(([+-]|)(\\d*)n|)"+R+"*(?:([+-]|)"+R+"*(\\d+)|))"+R+"*\\)|)","i"),bool:new RegExp("^(?:"+P+")$","i"),needsContext:new RegExp("^"+R+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+R+"*((?:-\\d)?\\d*)"+R+"*\\)|)(?=[^-]|$)","i")},Q=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,ee=/^[^{]+\{\s*\[native \w/,te=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ne=/[+~]/,re=new RegExp("\\\\([\\da-f]{1,6}"+R+"?|("+R+")|.)","ig"),oe=function(e,t,n){var r="0x"+t-65536;return r!=r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},ie=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,ae=function(e,t){return t?"\0"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},se=function(){g()},ue=Ce(function(e){return!0===e.disabled},{dir:"parentNode",next:"legend"});try{I.apply(q=F.call(k.childNodes),k.childNodes),q[k.childNodes.length].nodeType}catch(e){I={apply:q.length?function(e,t){H.apply(e,F.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}function ce(e,t,n,r){var o,i,s,u,c,f,d,h=t&&t.ownerDocument,v=t?t.nodeType:9;if(n=n||[],"string"!=typeof e||!e||1!==v&&9!==v&&11!==v)return n;if(!r&&((t?t.ownerDocument||t:k)!==m&&g(t),t=t||m,x)){if(11!==v&&(c=te.exec(e)))if(o=c[1]){if(9===v){if(!(s=t.getElementById(o)))return n;if(s.id===o)return n.push(s),n}else if(h&&(s=h.getElementById(o))&&T(t,s)&&s.id===o)return n.push(s),n}else{if(c[2])return I.apply(n,t.getElementsByTagName(e)),n;if((o=c[3])&&a.getElementsByClassName&&t.getElementsByClassName)return I.apply(n,t.getElementsByClassName(o)),n}if(a.qsa&&!D[e+" "]&&(!b||!b.test(e))){if(1!==v)h=t,d=e;else if("object"!==t.nodeName.toLowerCase()){for((u=t.getAttribute("id"))?u=u.replace(ie,ae):t.setAttribute("id",u=S),i=(f=l(e)).length;i--;)f[i]="#"+u+" "+we(f[i]);d=f.join(","),h=ne.test(e)&&xe(t.parentNode)||t}if(d)try{return I.apply(n,h.querySelectorAll(d)),n}catch(e){}finally{u===S&&t.removeAttribute("id")}}}return p(e.replace(V,"$1"),t,n,r)}function le(){var e=[];return function t(n,r){return e.push(n+" ")>s.cacheLength&&delete t[e.shift()],t[n+" "]=r}}function fe(e){return e[S]=!0,e}function pe(e){var t=m.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function de(e,t){for(var n=e.split("|"),r=n.length;r--;)s.attrHandle[n[r]]=t}function he(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function ve(e){return function(t){return"input"===t.nodeName.toLowerCase()&&t.type===e}}function ge(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function me(e){return function(t){return"label"in t&&t.disabled===e||"form"in t&&t.disabled===e||"form"in t&&!1===t.disabled&&(t.isDisabled===e||t.isDisabled!==!e&&("label"in t||!ue(t))!==e)}}function ye(e){return fe(function(t){return t=+t,fe(function(n,r){for(var o,i=e([],n.length,t),a=i.length;a--;)n[o=i[a]]&&(n[o]=!(r[o]=n[o]))})})}function xe(e){return e&&void 0!==e.getElementsByTagName&&e}for(i in a=ce.support={},c=ce.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},g=ce.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:k;return r!==m&&9===r.nodeType&&r.documentElement?(y=(m=r).documentElement,x=!c(m),k!==m&&(n=m.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",se,!1):n.attachEvent&&n.attachEvent("onunload",se)),a.attributes=pe(function(e){return e.className="i",!e.getAttribute("className")}),a.getElementsByTagName=pe(function(e){return e.appendChild(m.createComment("")),!e.getElementsByTagName("*").length}),a.getElementsByClassName=ee.test(m.getElementsByClassName),a.getById=pe(function(e){return y.appendChild(e).id=S,!m.getElementsByName||!m.getElementsByName(S).length}),a.getById?(s.find.ID=function(e,t){if(void 0!==t.getElementById&&x){var n=t.getElementById(e);return n?[n]:[]}},s.filter.ID=function(e){var t=e.replace(re,oe);return function(e){return e.getAttribute("id")===t}}):(delete s.find.ID,s.filter.ID=function(e){var t=e.replace(re,oe);return function(e){var n=void 0!==e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}}),s.find.TAG=a.getElementsByTagName?function(e,t){return void 0!==t.getElementsByTagName?t.getElementsByTagName(e):a.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],o=0,i=t.getElementsByTagName(e);if("*"===e){for(;n=i[o++];)1===n.nodeType&&r.push(n);return r}return i},s.find.CLASS=a.getElementsByClassName&&function(e,t){if(void 0!==t.getElementsByClassName&&x)return t.getElementsByClassName(e)},w=[],b=[],(a.qsa=ee.test(m.querySelectorAll))&&(pe(function(e){y.appendChild(e).innerHTML="<a id='"+S+"'></a><select id='"+S+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&b.push("[*^$]="+R+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||b.push("\\["+R+"*(?:value|"+P+")"),e.querySelectorAll("[id~="+S+"-]").length||b.push("~="),e.querySelectorAll(":checked").length||b.push(":checked"),e.querySelectorAll("a#"+S+"+*").length||b.push(".#.+[+~]")}),pe(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=m.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&b.push("name"+R+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&b.push(":enabled",":disabled"),y.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&b.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),b.push(",.*:")})),(a.matchesSelector=ee.test(C=y.matches||y.webkitMatchesSelector||y.mozMatchesSelector||y.oMatchesSelector||y.msMatchesSelector))&&pe(function(e){a.disconnectedMatch=C.call(e,"*"),C.call(e,"[s!='']:x"),w.push("!=",$)}),b=b.length&&new RegExp(b.join("|")),w=w.length&&new RegExp(w.join("|")),t=ee.test(y.compareDocumentPosition),T=t||ee.test(y.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},O=t?function(e,t){if(e===t)return v=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!a.sortDetached&&t.compareDocumentPosition(e)===n?e===m||e.ownerDocument===k&&T(k,e)?-1:t===m||t.ownerDocument===k&&T(k,t)?1:h?M(h,e)-M(h,t):0:4&n?-1:1)}:function(e,t){if(e===t)return v=!0,0;var n,r=0,o=e.parentNode,i=t.parentNode,a=[e],s=[t];if(!o||!i)return e===m?-1:t===m?1:o?-1:i?1:h?M(h,e)-M(h,t):0;if(o===i)return he(e,t);for(n=e;n=n.parentNode;)a.unshift(n);for(n=t;n=n.parentNode;)s.unshift(n);for(;a[r]===s[r];)r++;return r?he(a[r],s[r]):a[r]===k?-1:s[r]===k?1:0},m):m},ce.matches=function(e,t){return ce(e,null,null,t)},ce.matchesSelector=function(e,t){if((e.ownerDocument||e)!==m&&g(e),t=t.replace(K,"='$1']"),a.matchesSelector&&x&&!D[t+" "]&&(!w||!w.test(t))&&(!b||!b.test(t)))try{var n=C.call(e,t);if(n||a.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){}return ce(t,m,null,[e]).length>0},ce.contains=function(e,t){return(e.ownerDocument||e)!==m&&g(e),T(e,t)},ce.attr=function(e,t){(e.ownerDocument||e)!==m&&g(e);var n=s.attrHandle[t.toLowerCase()],r=n&&L.call(s.attrHandle,t.toLowerCase())?n(e,t,!x):void 0;return void 0!==r?r:a.attributes||!x?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},ce.escape=function(e){return(e+"").replace(ie,ae)},ce.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},ce.uniqueSort=function(e){var t,n=[],r=0,o=0;if(v=!a.detectDuplicates,h=!a.sortStable&&e.slice(0),e.sort(O),v){for(;t=e[o++];)t===e[o]&&(r=n.push(o));for(;r--;)e.splice(n[r],1)}return h=null,e},u=ce.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=u(e)}else if(3===o||4===o)return e.nodeValue}else for(;t=e[r++];)n+=u(t);return n},(s=ce.selectors={cacheLength:50,createPseudo:fe,match:J,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(re,oe),e[3]=(e[3]||e[4]||e[5]||"").replace(re,oe),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ce.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ce.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return J.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&Y.test(n)&&(t=l(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(re,oe).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=j[e+" "];return t||(t=new RegExp("(^|"+R+")"+e+"("+R+"|$)"))&&j(e,function(e){return t.test("string"==typeof e.className&&e.className||void 0!==e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var o=ce.attr(r,e);return null==o?"!="===t:!t||(o+="","="===t?o===n:"!="===t?o!==n:"^="===t?n&&0===o.indexOf(n):"*="===t?n&&o.indexOf(n)>-1:"$="===t?n&&o.slice(-n.length)===n:"~="===t?(" "+o.replace(z," ")+" ").indexOf(n)>-1:"|="===t&&(o===n||o.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,r,o){var i="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===o?function(e){return!!e.parentNode}:function(t,n,u){var c,l,f,p,d,h,v=i!==a?"nextSibling":"previousSibling",g=t.parentNode,m=s&&t.nodeName.toLowerCase(),y=!u&&!s,x=!1;if(g){if(i){for(;v;){for(p=t;p=p[v];)if(s?p.nodeName.toLowerCase()===m:1===p.nodeType)return!1;h=v="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?g.firstChild:g.lastChild],a&&y){for(x=(d=(c=(l=(f=(p=g)[S]||(p[S]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===E&&c[1])&&c[2],p=d&&g.childNodes[d];p=++d&&p&&p[v]||(x=d=0)||h.pop();)if(1===p.nodeType&&++x&&p===t){l[e]=[E,d,x];break}}else if(y&&(x=d=(c=(l=(f=(p=t)[S]||(p[S]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===E&&c[1]),!1===x)for(;(p=++d&&p&&p[v]||(x=d=0)||h.pop())&&((s?p.nodeName.toLowerCase()!==m:1!==p.nodeType)||!++x||(y&&((l=(f=p[S]||(p[S]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]=[E,x]),p!==t)););return(x-=o)===r||x%r==0&&x/r>=0}}},PSEUDO:function(e,t){var n,r=s.pseudos[e]||s.setFilters[e.toLowerCase()]||ce.error("unsupported pseudo: "+e);return r[S]?r(t):r.length>1?(n=[e,e,"",t],s.setFilters.hasOwnProperty(e.toLowerCase())?fe(function(e,n){for(var o,i=r(e,t),a=i.length;a--;)e[o=M(e,i[a])]=!(n[o]=i[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:fe(function(e){var t=[],n=[],r=f(e.replace(V,"$1"));return r[S]?fe(function(e,t,n,o){for(var i,a=r(e,null,o,[]),s=e.length;s--;)(i=a[s])&&(e[s]=!(t[s]=i))}):function(e,o,i){return t[0]=e,r(t,null,i,n),t[0]=null,!n.pop()}}),has:fe(function(e){return function(t){return ce(e,t).length>0}}),contains:fe(function(e){return e=e.replace(re,oe),function(t){return(t.textContent||t.innerText||u(t)).indexOf(e)>-1}}),lang:fe(function(e){return G.test(e||"")||ce.error("unsupported lang: "+e),e=e.replace(re,oe).toLowerCase(),function(t){var n;do{if(n=x?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(e){var t=o.location&&o.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===y},focus:function(e){return e===m.activeElement&&(!m.hasFocus||m.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:me(!1),disabled:me(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!s.pseudos.empty(e)},header:function(e){return Z.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ye(function(){return[0]}),last:ye(function(e,t){return[t-1]}),eq:ye(function(e,t,n){return[n<0?n+t:n]}),even:ye(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ye(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ye(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:ye(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=s.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})s.pseudos[i]=ve(i);for(i in{submit:!0,reset:!0})s.pseudos[i]=ge(i);function be(){}function we(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function Ce(e,t,n){var r=t.dir,o=t.next,i=o||r,a=n&&"parentNode"===i,s=N++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||a)return e(t,n,o)}:function(t,n,u){var c,l,f,p=[E,s];if(u){for(;t=t[r];)if((1===t.nodeType||a)&&e(t,n,u))return!0}else for(;t=t[r];)if(1===t.nodeType||a)if(l=(f=t[S]||(t[S]={}))[t.uniqueID]||(f[t.uniqueID]={}),o&&o===t.nodeName.toLowerCase())t=t[r]||t;else{if((c=l[i])&&c[0]===E&&c[1]===s)return p[2]=c[2];if(l[i]=p,p[2]=e(t,n,u))return!0}}}function Te(e){return e.length>1?function(t,n,r){for(var o=e.length;o--;)if(!e[o](t,n,r))return!1;return!0}:e[0]}function Se(e,t,n,r,o){for(var i,a=[],s=0,u=e.length,c=null!=t;s<u;s++)(i=e[s])&&(n&&!n(i,r,o)||(a.push(i),c&&t.push(s)));return a}function ke(e,t,n,r,o,i){return r&&!r[S]&&(r=ke(r)),o&&!o[S]&&(o=ke(o,i)),fe(function(i,a,s,u){var c,l,f,p=[],d=[],h=a.length,v=i||function(e,t,n){for(var r=0,o=t.length;r<o;r++)ce(e,t[r],n);return n}(t||"*",s.nodeType?[s]:s,[]),g=!e||!i&&t?v:Se(v,p,e,s,u),m=n?o||(i?e:h||r)?[]:a:g;if(n&&n(g,m,s,u),r)for(c=Se(m,d),r(c,[],s,u),l=c.length;l--;)(f=c[l])&&(m[d[l]]=!(g[d[l]]=f));if(i){if(o||e){if(o){for(c=[],l=m.length;l--;)(f=m[l])&&c.push(g[l]=f);o(null,m=[],c,u)}for(l=m.length;l--;)(f=m[l])&&(c=o?M(i,f):p[l])>-1&&(i[c]=!(a[c]=f))}}else m=Se(m===a?m.splice(h,m.length):m),o?o(null,a,m,u):I.apply(a,m)})}function Ee(e){for(var t,n,r,o=e.length,i=s.relative[e[0].type],a=i||s.relative[" "],u=i?1:0,c=Ce(function(e){return e===t},a,!0),l=Ce(function(e){return M(t,e)>-1},a,!0),f=[function(e,n,r){var o=!i&&(r||n!==d)||((t=n).nodeType?c(e,n,r):l(e,n,r));return t=null,o}];u<o;u++)if(n=s.relative[e[u].type])f=[Ce(Te(f),n)];else{if((n=s.filter[e[u].type].apply(null,e[u].matches))[S]){for(r=++u;r<o&&!s.relative[e[r].type];r++);return ke(u>1&&Te(f),u>1&&we(e.slice(0,u-1).concat({value:" "===e[u-2].type?"*":""})).replace(V,"$1"),n,u<r&&Ee(e.slice(u,r)),r<o&&Ee(e=e.slice(r)),r<o&&we(e))}f.push(n)}return Te(f)}be.prototype=s.filters=s.pseudos,s.setFilters=new be,l=ce.tokenize=function(e,t){var n,r,o,i,a,u,c,l=A[e+" "];if(l)return t?0:l.slice(0);for(a=e,u=[],c=s.preFilter;a;){for(i in n&&!(r=X.exec(a))||(r&&(a=a.slice(r[0].length)||a),u.push(o=[])),n=!1,(r=U.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(V," ")}),a=a.slice(n.length)),s.filter)!(r=J[i].exec(a))||c[i]&&!(r=c[i](r))||(n=r.shift(),o.push({value:n,type:i,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ce.error(e):A(e,u).slice(0)},f=ce.compile=function(e,t){var n,r=[],o=[],i=D[e+" "];if(!i){for(t||(t=l(e)),n=t.length;n--;)(i=Ee(t[n]))[S]?r.push(i):o.push(i);(i=D(e,function(e,t){var n=t.length>0,r=e.length>0,o=function(o,i,a,u,c){var l,f,p,h=0,v="0",y=o&&[],b=[],w=d,C=o||r&&s.find.TAG("*",c),T=E+=null==w?1:Math.random()||.1,S=C.length;for(c&&(d=i===m||i||c);v!==S&&null!=(l=C[v]);v++){if(r&&l){for(f=0,i||l.ownerDocument===m||(g(l),a=!x);p=e[f++];)if(p(l,i||m,a)){u.push(l);break}c&&(E=T)}n&&((l=!p&&l)&&h--,o&&y.push(l))}if(h+=v,n&&v!==h){for(f=0;p=t[f++];)p(y,b,i,a);if(o){if(h>0)for(;v--;)y[v]||b[v]||(b[v]=_.call(u));b=Se(b)}I.apply(u,b),c&&!o&&b.length>0&&h+t.length>1&&ce.uniqueSort(u)}return c&&(E=T,d=w),y};return n?fe(o):o}(o,r))).selector=e}return i},p=ce.select=function(e,t,n,r){var o,i,u,c,p,d="function"==typeof e&&e,h=!r&&l(e=d.selector||e);if(n=n||[],1===h.length){if((i=h[0]=h[0].slice(0)).length>2&&"ID"===(u=i[0]).type&&a.getById&&9===t.nodeType&&x&&s.relative[i[1].type]){if(!(t=(s.find.ID(u.matches[0].replace(re,oe),t)||[])[0]))return n;d&&(t=t.parentNode),e=e.slice(i.shift().value.length)}for(o=J.needsContext.test(e)?0:i.length;o--&&(u=i[o],!s.relative[c=u.type]);)if((p=s.find[c])&&(r=p(u.matches[0].replace(re,oe),ne.test(i[0].type)&&xe(t.parentNode)||t))){if(i.splice(o,1),!(e=r.length&&we(i)))return I.apply(n,r),n;break}}return(d||f(e,h))(r,t,!x,n,!t||ne.test(e)&&xe(t.parentNode)||t),n},a.sortStable=S.split("").sort(O).join("")===S,a.detectDuplicates=!!v,g(),a.sortDetached=pe(function(e){return 1&e.compareDocumentPosition(m.createElement("fieldset"))}),pe(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||de("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),a.attributes&&pe(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||de("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),pe(function(e){return null==e.getAttribute("disabled")})||de(P,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null});var Ne=o.Sizzle;ce.noConflict=function(){return o.Sizzle===ce&&(o.Sizzle=Ne),ce},void 0===(r=function(){return ce}.call(t,n,t,e))||(e.exports=r)}(window)},function(e,t,n){var r,o;r=[n(0),n(93)],void 0===(o=function(e,t){"use strict";e.find=t,e.expr=t.selectors,e.expr[":"]=e.expr.pseudos,e.uniqueSort=e.unique=t.uniqueSort,e.text=t.getText,e.isXMLDoc=t.isXML,e.contains=t.contains,e.escapeSelector=t.escape}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(56)],void 0===(o=function(e){"use strict";return e.call(Object)}.apply(t,r))||(e.exports=o)},function(e,t,n){var r,o;r=[n(29)],void 0===(o=function(e){"use strict";return e.toString}.apply(t,r))||(e.exports=o)},function(e,t,n){var r;void 0===(r=function(){"use strict";return Object.getPrototypeOf}.call(t,n,t,e))||(e.exports=r)},function(e,t,n){var r,o;r=[n(0),n(3),n(14),n(11)],void 0===(o=function(e){"use strict";return e.fn.extend({wrapAll:function(t){var n;return this[0]&&(e.isFunction(t)&&(t=t.call(this[0])),n=e(t,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&n.insertBefore(this[0]),n.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(t){return e.isFunction(t)?this.each(function(n){e(this).wrapInner(t.call(this,n))}):this.each(function(){var n=e(this),r=n.contents();r.length?r.wrapAll(t):n.append(t)})},wrap:function(t){var n=e.isFunction(t);return this.each(function(r){e(this).wrapAll(n?t.call(this,r):t)})},unwrap:function(t){return this.parent(t).not("body").each(function(){e(this).replaceWith(this.childNodes)}),this}}),e}.apply(t,r))||(e.exports=o)},function(e,t,n){var r;(function(){var n=this,o=n._,i=Array.prototype,a=Object.prototype,s=Function.prototype,u=i.push,c=i.slice,l=a.toString,f=a.hasOwnProperty,p=Array.isArray,d=Object.keys,h=s.bind,v=Object.create,g=function(){},m=function(e){return e instanceof m?e:this instanceof m?void(this._wrapped=e):new m(e)};void 0!==e&&e.exports&&(t=e.exports=m),t._=m,m.VERSION="1.8.3";var y=function(e,t,n){if(void 0===t)return e;switch(null==n?3:n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,o){return e.call(t,n,r,o)};case 4:return function(n,r,o,i){return e.call(t,n,r,o,i)}}return function(){return e.apply(t,arguments)}},x=function(e,t,n){return null==e?m.identity:m.isFunction(e)?y(e,t,n):m.isObject(e)?m.matcher(e):m.property(e)};m.iteratee=function(e,t){return x(e,t,1/0)};var b=function(e,t){return function(n){var r=arguments.length;if(r<2||null==n)return n;for(var o=1;o<r;o++)for(var i=arguments[o],a=e(i),s=a.length,u=0;u<s;u++){var c=a[u];t&&void 0!==n[c]||(n[c]=i[c])}return n}},w=function(e){if(!m.isObject(e))return{};if(v)return v(e);g.prototype=e;var t=new g;return g.prototype=null,t},C=function(e){return function(t){return null==t?void 0:t[e]}},T=Math.pow(2,53)-1,S=C("length"),k=function(e){var t=S(e);return"number"==typeof t&&t>=0&&t<=T};function E(e){return function(t,n,r,o){n=y(n,o,4);var i=!k(t)&&m.keys(t),a=(i||t).length,s=e>0?0:a-1;return arguments.length<3&&(r=t[i?i[s]:s],s+=e),function(t,n,r,o,i,a){for(;i>=0&&i<a;i+=e){var s=o?o[i]:i;r=n(r,t[s],s,t)}return r}(t,n,r,i,s,a)}}m.each=m.forEach=function(e,t,n){var r,o;if(t=y(t,n),k(e))for(r=0,o=e.length;r<o;r++)t(e[r],r,e);else{var i=m.keys(e);for(r=0,o=i.length;r<o;r++)t(e[i[r]],i[r],e)}return e},m.map=m.collect=function(e,t,n){t=x(t,n);for(var r=!k(e)&&m.keys(e),o=(r||e).length,i=Array(o),a=0;a<o;a++){var s=r?r[a]:a;i[a]=t(e[s],s,e)}return i},m.reduce=m.foldl=m.inject=E(1),m.reduceRight=m.foldr=E(-1),m.find=m.detect=function(e,t,n){var r;if(void 0!==(r=k(e)?m.findIndex(e,t,n):m.findKey(e,t,n))&&-1!==r)return e[r]},m.filter=m.select=function(e,t,n){var r=[];return t=x(t,n),m.each(e,function(e,n,o){t(e,n,o)&&r.push(e)}),r},m.reject=function(e,t,n){return m.filter(e,m.negate(x(t)),n)},m.every=m.all=function(e,t,n){t=x(t,n);for(var r=!k(e)&&m.keys(e),o=(r||e).length,i=0;i<o;i++){var a=r?r[i]:i;if(!t(e[a],a,e))return!1}return!0},m.some=m.any=function(e,t,n){t=x(t,n);for(var r=!k(e)&&m.keys(e),o=(r||e).length,i=0;i<o;i++){var a=r?r[i]:i;if(t(e[a],a,e))return!0}return!1},m.contains=m.includes=m.include=function(e,t,n,r){return k(e)||(e=m.values(e)),("number"!=typeof n||r)&&(n=0),m.indexOf(e,t,n)>=0},m.invoke=function(e,t){var n=c.call(arguments,2),r=m.isFunction(t);return m.map(e,function(e){var o=r?t:e[t];return null==o?o:o.apply(e,n)})},m.pluck=function(e,t){return m.map(e,m.property(t))},m.where=function(e,t){return m.filter(e,m.matcher(t))},m.findWhere=function(e,t){return m.find(e,m.matcher(t))},m.max=function(e,t,n){var r,o,i=-1/0,a=-1/0;if(null==t&&null!=e)for(var s=0,u=(e=k(e)?e:m.values(e)).length;s<u;s++)(r=e[s])>i&&(i=r);else t=x(t,n),m.each(e,function(e,n,r){((o=t(e,n,r))>a||o===-1/0&&i===-1/0)&&(i=e,a=o)});return i},m.min=function(e,t,n){var r,o,i=1/0,a=1/0;if(null==t&&null!=e)for(var s=0,u=(e=k(e)?e:m.values(e)).length;s<u;s++)(r=e[s])<i&&(i=r);else t=x(t,n),m.each(e,function(e,n,r){((o=t(e,n,r))<a||o===1/0&&i===1/0)&&(i=e,a=o)});return i},m.shuffle=function(e){for(var t,n=k(e)?e:m.values(e),r=n.length,o=Array(r),i=0;i<r;i++)(t=m.random(0,i))!==i&&(o[i]=o[t]),o[t]=n[i];return o},m.sample=function(e,t,n){return null==t||n?(k(e)||(e=m.values(e)),e[m.random(e.length-1)]):m.shuffle(e).slice(0,Math.max(0,t))},m.sortBy=function(e,t,n){return t=x(t,n),m.pluck(m.map(e,function(e,n,r){return{value:e,index:n,criteria:t(e,n,r)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||void 0===n)return 1;if(n<r||void 0===r)return-1}return e.index-t.index}),"value")};var N=function(e){return function(t,n,r){var o={};return n=x(n,r),m.each(t,function(r,i){var a=n(r,i,t);e(o,r,a)}),o}};m.groupBy=N(function(e,t,n){m.has(e,n)?e[n].push(t):e[n]=[t]}),m.indexBy=N(function(e,t,n){e[n]=t}),m.countBy=N(function(e,t,n){m.has(e,n)?e[n]++:e[n]=1}),m.toArray=function(e){return e?m.isArray(e)?c.call(e):k(e)?m.map(e,m.identity):m.values(e):[]},m.size=function(e){return null==e?0:k(e)?e.length:m.keys(e).length},m.partition=function(e,t,n){t=x(t,n);var r=[],o=[];return m.each(e,function(e,n,i){(t(e,n,i)?r:o).push(e)}),[r,o]},m.first=m.head=m.take=function(e,t,n){if(null!=e)return null==t||n?e[0]:m.initial(e,e.length-t)},m.initial=function(e,t,n){return c.call(e,0,Math.max(0,e.length-(null==t||n?1:t)))},m.last=function(e,t,n){if(null!=e)return null==t||n?e[e.length-1]:m.rest(e,Math.max(0,e.length-t))},m.rest=m.tail=m.drop=function(e,t,n){return c.call(e,null==t||n?1:t)},m.compact=function(e){return m.filter(e,m.identity)};var j=function(e,t,n,r){for(var o=[],i=0,a=r||0,s=S(e);a<s;a++){var u=e[a];if(k(u)&&(m.isArray(u)||m.isArguments(u))){t||(u=j(u,t,n));var c=0,l=u.length;for(o.length+=l;c<l;)o[i++]=u[c++]}else n||(o[i++]=u)}return o};function A(e){return function(t,n,r){n=x(n,r);for(var o=S(t),i=e>0?0:o-1;i>=0&&i<o;i+=e)if(n(t[i],i,t))return i;return-1}}function D(e,t,n){return function(r,o,i){var a=0,s=S(r);if("number"==typeof i)e>0?a=i>=0?i:Math.max(i+s,a):s=i>=0?Math.min(i+1,s):i+s+1;else if(n&&i&&s)return r[i=n(r,o)]===o?i:-1;if(o!=o)return(i=t(c.call(r,a,s),m.isNaN))>=0?i+a:-1;for(i=e>0?a:s-1;i>=0&&i<s;i+=e)if(r[i]===o)return i;return-1}}m.flatten=function(e,t){return j(e,t,!1)},m.without=function(e){return m.difference(e,c.call(arguments,1))},m.uniq=m.unique=function(e,t,n,r){m.isBoolean(t)||(r=n,n=t,t=!1),null!=n&&(n=x(n,r));for(var o=[],i=[],a=0,s=S(e);a<s;a++){var u=e[a],c=n?n(u,a,e):u;t?(a&&i===c||o.push(u),i=c):n?m.contains(i,c)||(i.push(c),o.push(u)):m.contains(o,u)||o.push(u)}return o},m.union=function(){return m.uniq(j(arguments,!0,!0))},m.intersection=function(e){for(var t=[],n=arguments.length,r=0,o=S(e);r<o;r++){var i=e[r];if(!m.contains(t,i)){for(var a=1;a<n&&m.contains(arguments[a],i);a++);a===n&&t.push(i)}}return t},m.difference=function(e){var t=j(arguments,!0,!0,1);return m.filter(e,function(e){return!m.contains(t,e)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(e){for(var t=e&&m.max(e,S).length||0,n=Array(t),r=0;r<t;r++)n[r]=m.pluck(e,r);return n},m.object=function(e,t){for(var n={},r=0,o=S(e);r<o;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n},m.findIndex=A(1),m.findLastIndex=A(-1),m.sortedIndex=function(e,t,n,r){for(var o=(n=x(n,r,1))(t),i=0,a=S(e);i<a;){var s=Math.floor((i+a)/2);n(e[s])<o?i=s+1:a=s}return i},m.indexOf=D(1,m.findIndex,m.sortedIndex),m.lastIndexOf=D(-1,m.findLastIndex),m.range=function(e,t,n){null==t&&(t=e||0,e=0),n=n||1;for(var r=Math.max(Math.ceil((t-e)/n),0),o=Array(r),i=0;i<r;i++,e+=n)o[i]=e;return o};var O=function(e,t,n,r,o){if(!(r instanceof t))return e.apply(n,o);var i=w(e.prototype),a=e.apply(i,o);return m.isObject(a)?a:i};m.bind=function(e,t){if(h&&e.bind===h)return h.apply(e,c.call(arguments,1));if(!m.isFunction(e))throw new TypeError("Bind must be called on a function");var n=c.call(arguments,2),r=function(){return O(e,r,t,this,n.concat(c.call(arguments)))};return r},m.partial=function(e){var t=c.call(arguments,1),n=function(){for(var r=0,o=t.length,i=Array(o),a=0;a<o;a++)i[a]=t[a]===m?arguments[r++]:t[a];for(;r<arguments.length;)i.push(arguments[r++]);return O(e,n,this,this,i)};return n},m.bindAll=function(e){var t,n,r=arguments.length;if(r<=1)throw new Error("bindAll must be passed function names");for(t=1;t<r;t++)e[n=arguments[t]]=m.bind(e[n],e);return e},m.memoize=function(e,t){var n=function(r){var o=n.cache,i=""+(t?t.apply(this,arguments):r);return m.has(o,i)||(o[i]=e.apply(this,arguments)),o[i]};return n.cache={},n},m.delay=function(e,t){var n=c.call(arguments,2);return setTimeout(function(){return e.apply(null,n)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(e,t,n){var r,o,i,a=null,s=0;n||(n={});var u=function(){s=!1===n.leading?0:m.now(),a=null,i=e.apply(r,o),a||(r=o=null)};return function(){var c=m.now();s||!1!==n.leading||(s=c);var l=t-(c-s);return r=this,o=arguments,l<=0||l>t?(a&&(clearTimeout(a),a=null),s=c,i=e.apply(r,o),a||(r=o=null)):a||!1===n.trailing||(a=setTimeout(u,l)),i}},m.debounce=function(e,t,n){var r,o,i,a,s,u=function(){var c=m.now()-a;c<t&&c>=0?r=setTimeout(u,t-c):(r=null,n||(s=e.apply(i,o),r||(i=o=null)))};return function(){i=this,o=arguments,a=m.now();var c=n&&!r;return r||(r=setTimeout(u,t)),c&&(s=e.apply(i,o),i=o=null),s}},m.wrap=function(e,t){return m.partial(t,e)},m.negate=function(e){return function(){return!e.apply(this,arguments)}},m.compose=function(){var e=arguments,t=e.length-1;return function(){for(var n=t,r=e[t].apply(this,arguments);n--;)r=e[n].call(this,r);return r}},m.after=function(e,t){return function(){if(--e<1)return t.apply(this,arguments)}},m.before=function(e,t){var n;return function(){return--e>0&&(n=t.apply(this,arguments)),e<=1&&(t=null),n}},m.once=m.partial(m.before,2);var L=!{toString:null}.propertyIsEnumerable("toString"),q=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];function _(e,t){var n=q.length,r=e.constructor,o=m.isFunction(r)&&r.prototype||a,i="constructor";for(m.has(e,i)&&!m.contains(t,i)&&t.push(i);n--;)(i=q[n])in e&&e[i]!==o[i]&&!m.contains(t,i)&&t.push(i)}m.keys=function(e){if(!m.isObject(e))return[];if(d)return d(e);var t=[];for(var n in e)m.has(e,n)&&t.push(n);return L&&_(e,t),t},m.allKeys=function(e){if(!m.isObject(e))return[];var t=[];for(var n in e)t.push(n);return L&&_(e,t),t},m.values=function(e){for(var t=m.keys(e),n=t.length,r=Array(n),o=0;o<n;o++)r[o]=e[t[o]];return r},m.mapObject=function(e,t,n){t=x(t,n);for(var r,o=m.keys(e),i=o.length,a={},s=0;s<i;s++)a[r=o[s]]=t(e[r],r,e);return a},m.pairs=function(e){for(var t=m.keys(e),n=t.length,r=Array(n),o=0;o<n;o++)r[o]=[t[o],e[t[o]]];return r},m.invert=function(e){for(var t={},n=m.keys(e),r=0,o=n.length;r<o;r++)t[e[n[r]]]=n[r];return t},m.functions=m.methods=function(e){var t=[];for(var n in e)m.isFunction(e[n])&&t.push(n);return t.sort()},m.extend=b(m.allKeys),m.extendOwn=m.assign=b(m.keys),m.findKey=function(e,t,n){t=x(t,n);for(var r,o=m.keys(e),i=0,a=o.length;i<a;i++)if(t(e[r=o[i]],r,e))return r},m.pick=function(e,t,n){var r,o,i={},a=e;if(null==a)return i;m.isFunction(t)?(o=m.allKeys(a),r=y(t,n)):(o=j(arguments,!1,!1,1),r=function(e,t,n){return t in n},a=Object(a));for(var s=0,u=o.length;s<u;s++){var c=o[s],l=a[c];r(l,c,a)&&(i[c]=l)}return i},m.omit=function(e,t,n){if(m.isFunction(t))t=m.negate(t);else{var r=m.map(j(arguments,!1,!1,1),String);t=function(e,t){return!m.contains(r,t)}}return m.pick(e,t,n)},m.defaults=b(m.allKeys,!0),m.create=function(e,t){var n=w(e);return t&&m.extendOwn(n,t),n},m.clone=function(e){return m.isObject(e)?m.isArray(e)?e.slice():m.extend({},e):e},m.tap=function(e,t){return t(e),e},m.isMatch=function(e,t){var n=m.keys(t),r=n.length;if(null==e)return!r;for(var o=Object(e),i=0;i<r;i++){var a=n[i];if(t[a]!==o[a]||!(a in o))return!1}return!0};var H=function(e,t,n,r){if(e===t)return 0!==e||1/e==1/t;if(null==e||null==t)return e===t;e instanceof m&&(e=e._wrapped),t instanceof m&&(t=t._wrapped);var o=l.call(e);if(o!==l.call(t))return!1;switch(o){case"[object RegExp]":case"[object String]":return""+e==""+t;case"[object Number]":return+e!=+e?+t!=+t:0==+e?1/+e==1/t:+e==+t;case"[object Date]":case"[object Boolean]":return+e==+t}var i="[object Array]"===o;if(!i){if("object"!=typeof e||"object"!=typeof t)return!1;var a=e.constructor,s=t.constructor;if(a!==s&&!(m.isFunction(a)&&a instanceof a&&m.isFunction(s)&&s instanceof s)&&"constructor"in e&&"constructor"in t)return!1}n=n||[],r=r||[];for(var u=n.length;u--;)if(n[u]===e)return r[u]===t;if(n.push(e),r.push(t),i){if((u=e.length)!==t.length)return!1;for(;u--;)if(!H(e[u],t[u],n,r))return!1}else{var c,f=m.keys(e);if(u=f.length,m.keys(t).length!==u)return!1;for(;u--;)if(c=f[u],!m.has(t,c)||!H(e[c],t[c],n,r))return!1}return n.pop(),r.pop(),!0};m.isEqual=function(e,t){return H(e,t)},m.isEmpty=function(e){return null==e||(k(e)&&(m.isArray(e)||m.isString(e)||m.isArguments(e))?0===e.length:0===m.keys(e).length)},m.isElement=function(e){return!(!e||1!==e.nodeType)},m.isArray=p||function(e){return"[object Array]"===l.call(e)},m.isObject=function(e){var t=typeof e;return"function"===t||"object"===t&&!!e},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(e){m["is"+e]=function(t){return l.call(t)==="[object "+e+"]"}}),m.isArguments(arguments)||(m.isArguments=function(e){return m.has(e,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(e){return"function"==typeof e||!1}),m.isFinite=function(e){return isFinite(e)&&!isNaN(parseFloat(e))},m.isNaN=function(e){return m.isNumber(e)&&e!==+e},m.isBoolean=function(e){return!0===e||!1===e||"[object Boolean]"===l.call(e)},m.isNull=function(e){return null===e},m.isUndefined=function(e){return void 0===e},m.has=function(e,t){return null!=e&&f.call(e,t)},m.noConflict=function(){return n._=o,this},m.identity=function(e){return e},m.constant=function(e){return function(){return e}},m.noop=function(){},m.property=C,m.propertyOf=function(e){return null==e?function(){}:function(t){return e[t]}},m.matcher=m.matches=function(e){return e=m.extendOwn({},e),function(t){return m.isMatch(t,e)}},m.times=function(e,t,n){var r=Array(Math.max(0,e));t=y(t,n,1);for(var o=0;o<e;o++)r[o]=t(o);return r},m.random=function(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))},m.now=Date.now||function(){return(new Date).getTime()};var I={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},F=m.invert(I),M=function(e){var t=function(t){return e[t]},n="(?:"+m.keys(e).join("|")+")",r=RegExp(n),o=RegExp(n,"g");return function(e){return e=null==e?"":""+e,r.test(e)?e.replace(o,t):e}};m.escape=M(I),m.unescape=M(F),m.result=function(e,t,n){var r=null==e?void 0:e[t];return void 0===r&&(r=n),m.isFunction(r)?r.call(e):r};var P=0;m.uniqueId=function(e){var t=++P+"";return e?e+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var R=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},W=/\\|'|\r|\n|\u2028|\u2029/g,$=function(e){return"\\"+B[e]};m.template=function(e,t,n){!t&&n&&(t=n),t=m.defaults({},t,m.templateSettings);var r=RegExp([(t.escape||R).source,(t.interpolate||R).source,(t.evaluate||R).source].join("|")+"|$","g"),o=0,i="__p+='";e.replace(r,function(t,n,r,a,s){return i+=e.slice(o,s).replace(W,$),o=s+t.length,n?i+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?i+="'+\n((__t=("+r+"))==null?'':__t)+\n'":a&&(i+="';\n"+a+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=new Function(t.variable||"obj","_",i)}catch(e){throw e.source=i,e}var s=function(e){return a.call(this,e,m)},u=t.variable||"obj";return s.source="function("+u+"){\n"+i+"}",s},m.chain=function(e){var t=m(e);return t._chain=!0,t};var z=function(e,t){return e._chain?m(t).chain():t};m.mixin=function(e){m.each(m.functions(e),function(t){var n=m[t]=e[t];m.prototype[t]=function(){var e=[this._wrapped];return u.apply(e,arguments),z(this,n.apply(m,e))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=i[e];m.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),"shift"!==e&&"splice"!==e||0!==n.length||delete n[0],z(this,n)}}),m.each(["concat","join","slice"],function(e){var t=i[e];m.prototype[e]=function(){return z(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},void 0===(r=function(){return m}.apply(t,[]))||(e.exports=r)}).call(this)},function(e,t,n){"use strict";(function(e,t){var r=n(61),o=n(60);!function(){function e(){var e=window.pageYOffset||document.documentElement.scrollTop,t=window.innerWidth||document.body.clientWidth,n=document.getElementById("toc");e>250?t>1104?(n.style.position="fixed",n.style.left=document.getElementById("getting-started").getBoundingClientRect().left-230+"px"):t>760&&(n.style.position="fixed",n.style.left=document.getElementById("getting-started").getBoundingClientRect().left-210+"px"):(n.style.position="absolute",n.style.left="0")}window.onscroll=window.onresize=e,e()}();var i={Models:{}};i.Models.Docs={},i.Models.Apps={},i.Collections={},i.Views={},function(e,n){if(e){var r=e.LiveTOC=function(e){this.parent=e.parent,this.content=e.content,this.scrollContent=e.scrollContent||e.content,this.throttleInterval=e.throttleInterval||300,this.alignment=e.alignment||"center",this.onSelect=e.onSelect||null,this.currentItem=null,this._headerHeights={},this._sortedHeights=[],this.render(),e.parent&&this.attach(e.parent),this.initializeEventHandlers()};r.prototype={initializeEventHandlers:function(){var e=n.throttle(this.handleScroll.bind(this),this.throttleInterval);this.scrollContent===document.getElementsByTagName("body")[0]?document.addEventListener("scroll",e):this.scrollContent.addEventListener("scroll",e)},render:function(){this.scrollContent.style.position="relative",this.node=document.getElementsByClassName("ui_live_toc")[0],t(document).ready(function(e){this.updateHeights(),window.location.hash&&(this.hashChanged=!0),this.handleScroll()}.bind(this)),t(window).on("hashchange",function(){this.hashChanged=!0}.bind(this))},updateHeights:function(){for(var e={},t=[],n=this.content.querySelectorAll("h1, h2, h3"),r=0;r<n.length;r++){var o=n[r].id;e[n[r].offsetTop]=o,t.push(n[r].offsetTop)}this._headerHeights=e,this._sortedHeights=t.sort(function(e,t){return e-t})},findBestLink:function(){var e=this.scrollContent.scrollTop;0===e&&(e=t(window).scrollTop());var n,r=this.scrollContent.offsetHeight;n="top"===this.alignment?e:"bottom"===this.alignment?r+e:r/2+e;for(var o=this._sortedHeights[0],i=0;i<this._sortedHeights.length&&!(this._sortedHeights[i]>n);i++)o=this._sortedHeights[i];return this._headerHeights[o]},handleScroll:function(){var t;if(this.hashChanged?(this.hashChanged=!1,t=window.location.hash.replace("#","")):t=this.findBestLink(),null===this.currentItem||this.currentItem.getAttribute("data-name")!==t){for(var n=this.node.getElementsByTagName("li"),r=0;r<n.length;r++)e.removeClass(n[r],"selected");var o=this.node.querySelector('[href="#'+t+'"]');if(!o)return;if(this.currentItem=o.parentElement,null===this.currentItem)return;this.currentItem.dataset&&(this.currentItem.dataset.name=t),e.addClass(this.currentItem,"selected"),e.hasClass(this.currentItem,"ui_live_toc_3")&&e.addClass(this.currentMajorSection(),"selected"),(e.hasClass(this.currentItem,"ui_live_toc_2")||e.hasClass(this.currentItem,"ui_live_toc_3"))&&e.addClass(this.currentMainSection(),"selected")}},currentMainSection:function(){for(var t=this.currentItem;t&&!e.hasClass(t,"ui_live_toc_1");)t=t.parentElement;return t},currentMajorSection:function(){if(e.hasClass(this.currentItem,"ui_live_toc_1"))return!1;for(var t=this.currentItem;!e.hasClass(t,"ui_live_toc_2");)t=t.parentElement;return t}},n.extend(r.prototype,e.ComponentProto)}}(o,e),function(e,n){if(e){i.Views.Docs||(i.Views.Docs={});var r=i.Views.Docs.Toggle=function(e){this.parent=e.parent,this.opt1=e.opt1,this.opt2=e.opt2,this.label1=e.label1,this.label2=e.label2,this.onChange=e.onChange,this.render()};r.prototype={render:function(){this.opt1;var n=this;t(".language-toggle").each(function(r,o){t(o.children).each(function(r,o){var i,a=!1,s=!1;"PRE"===o.tagName?(a=o.firstChild.className.indexOf(n.opt1)>=0,s=o.firstChild.className.indexOf(n.opt2)>=0,a&&t(o).addClass("language-"+n.opt1),s&&t(o).addClass("language-"+n.opt2),i=o):(a=o.className.indexOf(n.opt1)>=0,s=o.className.indexOf(n.opt2)>=0,i=t(o).find("pre.highlight").first()),a?i.append(n.renderToggle(!0)):s&&i.append(n.renderToggle(!1)),e.addClass(o,"has_toggles")})}),t("."+this.opt2+"-toggle").on("click",this.showOpt2.bind(this)),t("."+this.opt1+"-toggle").on("click",this.showOpt1.bind(this)),this.toggleOpt(!0)},renderToggle:function(t){var n=e.tag("div",{className:"toggles"},[e.tag("div",{className:"toggle-item"},[e.tag("a",{className:this.opt1+"-toggle",href:"#"},this.label1)]),e.tag("div",{className:"toggle-item"},[e.tag("a",{className:this.opt2+"-toggle",href:"#"},this.label2)])]);return!0===t?e.addClass(n.childNodes[0],"selected"):e.addClass(n.childNodes[1],"selected"),n},showOpt1:function(e){e&&e.preventDefault(),t(".language-toggle .language-"+this.opt2).hide(),t(".language-toggle .language-"+this.opt1).show()},showOpt2:function(e){e&&e.preventDefault(),t(".language-toggle .language-"+this.opt2).show(),t(".language-toggle .language-"+this.opt1).hide()},toggleOpt:function(e){!0===e?(t(".language-toggle .language-"+this.opt2).hide(),t(".language-toggle .language-"+this.opt1).show()):(t(".language-toggle .language-"+this.opt2).show(),t(".language-toggle .language-"+this.opt1).hide()),this.onChange()}},n.extend(r.prototype,e.ComponentProto)}}(o,e),function(e,n){if(e){i.Views.Docs||(i.Views.Docs={});var r=i.Views.Docs.Main=function(e){this.platform=e.platform,this.language=e.language,this.render()};r.prototype={render:function(){this.scrollContent=document.getElementsByTagName("body")[0],"ios"===this.platform||"osx"===this.platform||"macos"===this.platform?new i.Views.Docs.Toggle({parent:this.scrollContent,opt1:"objective_c",opt2:"swift",label1:"Objective-C",label2:"Swift",onChange:this.handleToggleChange.bind(this)}):"rest"===this.platform&&new i.Views.Docs.Toggle({parent:this.scrollContent,opt1:"bash",opt2:"python",label1:"cURL",label2:"Python",onChange:this.handleToggleChange.bind(this)}),t(window).on("resize",n.throttle(this.handleWindowResize.bind(this),300)),t(window).on("load",function(){this.toc&&this.toc.updateHeights()}.bind(this)),t(function(){this.toc=new e.LiveTOC({parent:document.getElementById("toc"),scrollContent:this.scrollContent,content:document.getElementsByClassName("guide_content")[0]}),this.setupServerFieldCustomization(),this.mobileToc=document.getElementById("mobile_toc").getElementsByTagName("select")[0],this.renderMobileTOC(),this.handleWindowResize()}.bind(this))},renderMobileTOC:function(){for(var t=this.scrollContent.getElementsByTagName("h1"),n=document.createDocumentFragment(),r=0;r<t.length;r++){var o=e.tag("option",{"data-anchor":"#"+t[r].id},[t[r].textContent]);n.appendChild(o)}this.mobileToc.appendChild(n),this.mobileToc.addEventListener("change",this.handleSelectChange.bind(this)),this.mobileToc.getElementsByTagName("option")[0].setAttribute("selected",!0)},setupServerFieldCustomization:function(){if(document.getElementById("parse-server-custom-url")){if("undefined"!=typeof Storage){var e=localStorage.getItem("parse-server-custom-url"),n=localStorage.getItem("parse-server-custom-mount"),r=localStorage.getItem("parse-server-custom-protocol"),o=localStorage.getItem("parse-server-custom-appid"),i=localStorage.getItem("parse-server-custom-clientkey");e&&(t(".custom-parse-server-url").html(e),t("#parse-server-custom-url").val(e)),n&&(t(".custom-parse-server-mount").html(n),t("#parse-server-custom-mount").val(n)),r&&(t(".custom-parse-server-protocol").html(r),t("#parse-server-custom-protocol").val(r)),o&&(t(".custom-parse-server-appid").html(o),t("#parse-server-custom-appid").val(o)),i&&(t(".custom-parse-server-clientkey").html(i),t("#parse-server-custom-clientkey").val(i))}t("#parse-server-custom-url").keyup(function(){var e=t("#parse-server-custom-url").val();e.match(/^[-_a-z0-9\.]+(?::[0-9]+)?$/i)&&(t(".custom-parse-server-url").html(e),"undefined"!=typeof Storage&&localStorage.setItem("parse-server-custom-url",e))}),t("#parse-server-custom-mount").keyup(function(){var e=t("#parse-server-custom-mount").val();(e.match(/^[-_a-z0-9\/]+$/i)||""===e)&&(e.match(/^\//)||(e="/"+e),e.match(/\/$/)||(e+="/"),t(".custom-parse-server-mount").html(e),"undefined"!=typeof Storage&&localStorage.setItem("parse-server-custom-mount",e))}),t("#parse-server-custom-protocol").change(function(){var e=t("#parse-server-custom-protocol").val();e.match(/^[a-z]+$/)&&(t(".custom-parse-server-protocol").html(e),"undefined"!=typeof Storage&&localStorage.setItem("parse-server-custom-protocol",e))}),t("#parse-server-custom-appid").keyup(function(){var e=t("#parse-server-custom-appid").val();e.match(/^[^\s]+$/i)&&(e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),t(".custom-parse-server-appid").html(e),"undefined"!=typeof Storage&&localStorage.setItem("parse-server-custom-appid",e))}),t("#parse-server-custom-clientkey").keyup(function(){var e=t("#parse-server-custom-clientkey").val();e.match(/^[^\s]+$/i)&&(e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),t(".custom-parse-server-clientkey").html(e),"undefined"!=typeof Storage&&localStorage.setItem("parse-server-custom-clientkey",e))}),t("#parse-server-custom-values-reset").click(function(){var e=t("#parse-server-custom-url").attr("defaultval");t(".custom-parse-server-url").html(e),t("#parse-server-custom-url").val(e),localStorage.setItem("parse-server-custom-url",e),e=t("#parse-server-custom-mount").attr("defaultval"),t(".custom-parse-server-mount").html("/"+e+"/"),t("#parse-server-custom-mount").val(e),localStorage.setItem("parse-server-custom-mount","/"+e+"/"),e=t("#parse-server-custom-protocol").attr("defaultval"),t(".custom-parse-server-protocol").html(e),t("#parse-server-custom-protocol").val(e),localStorage.setItem("parse-server-custom-protocol",e),e=t("#parse-server-custom-appid").attr("defaultval"),t(".custom-parse-server-appid").html(e),t("#parse-server-custom-appid").val(e),localStorage.setItem("parse-server-custom-appid",e),e=t("#parse-server-custom-clientkey").attr("defaultval"),t(".custom-parse-server-clientkey").html(e),t("#parse-server-custom-clientkey").val(e),localStorage.setItem("parse-server-custom-clientkey",e)})}},handleToggleChange:function(){this.toc&&this.toc.updateHeights()},handleSelectChange:function(e){location.href=this.mobileToc.selectedOptions[0].getAttribute("data-anchor")},handleWindowResize:function(e){this.toc&&this.toc.updateHeights()}},n.extend(r.prototype,e.ComponentProto)}}(o,e);var a=window.location.pathname.split("/")[1];a&&new i.Views.Docs.Main({language:"en",platform:a}),t(function(){r.init({offset:2500,throttle:250,unload:!1,callback:function(e,t){}})})}).call(this,n(99),n(59))}]);
=======
---
---


/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_, $) {'use strict';

	// Sticky TOC
	(function () {
	  window.onscroll = window.onresize = function () {
	    var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
	    var windowWidth = window.innerWidth || document.body.clientWidth;
	    var toc = document.getElementById('toc');
	    if (scrollPos > 250) {
	      if (windowWidth > 1104) {
	        toc.style.position = 'fixed';
	        toc.style.left = document.getElementById('getting-started').getBoundingClientRect().left - 230 + 'px';
	      } else if (windowWidth > 760) {
	        toc.style.position = 'fixed';
	        toc.style.left = document.getElementById('getting-started').getBoundingClientRect().left - 210 + 'px';
	      }
	    } else {
	      toc.style.position = 'absolute';
	      toc.style.left = '0';
	    }
	  };
	})();

	// application.js
	// Setup empty objects for organizational purposes.
	// These objects will be common to both the website and the mobile website.
	var App = {};
	App.Models = {};
	App.Models.Docs = {};
	App.Models.Apps = {};
	App.Collections = {};
	App.Views = {};

	// core.js
	(function () {

	  var svgNamespace = 'http://www.w3.org/2000/svg';

	  // Wrapped to provide tag vs svgTag methods
	  var createElement = function createElement(name, attr, children, svg) {
	    var tag;
	    if (svg) {
	      tag = document.createElementNS(svgNamespace, name);
	    } else {
	      tag = document.createElement(name);
	    }
	    // We apply attributes after children so that we can set the value of
	    // a select tag at render time
	    if (children) {
	      if (!Array.isArray(children)) {
	        children = [children];
	      }
	      for (var i = 0; i < children.length; i++) {
	        var node = children[i];
	        if (typeof node === 'string' || typeof node === 'number') {
	          node = document.createTextNode(node);
	        }
	        if (node) {
	          // Allow falsy entries to be ignored
	          tag.appendChild(node);
	        }
	      }
	    }
	    if (attr) {
	      for (var a in attr) {
	        if (a === 'style') {
	          for (var s in attr[a]) {
	            tag.style[s] = attr[a][s];
	          }
	        } else if (a.indexOf('data-') === 0 || svg) {
	          tag.setAttribute(a, attr[a]);
	        } else {
	          tag[a] = attr[a];
	        }
	      }
	    }
	    return tag;
	  };

	  var UI = window.UI = {
	    // DOM construction methods
	    tag: function tag(name, attr, children) {
	      return createElement(name, attr, children, false);
	    },

	    svgTag: function svgTag(name, attr, children) {
	      return createElement(name, attr, children, true);
	    },

	    createIcon: function createIcon(icon) {
	      var i = document.createElement('i');
	      i.className = 'icon_' + icon;
	      return i;
	    },

	    createTooltip: function createTooltip(text, options) {
	      var className = 'tooltip_wrap';
	      switch (options.direction) {
	        case 'left':
	          className += ' to_left';
	          break;
	        case 'top-left':
	          className += ' to_top_left';
	          break;
	        case 'top-right':
	          className += ' to_top_right';
	          break;
	      }
	      return UI.tag('span', { className: className }, [UI.tag('span', { className: 'tip' }, text)]);
	    },

	    // DOM property methods
	    hasAncestor: function hasAncestor(node, ancestor) {
	      var cur = node.parentNode;
	      while (cur) {
	        if (cur === ancestor) {
	          return true;
	        }
	        cur = cur.parentNode;
	      }
	      return false;
	    },

	    addClass: function addClass(node, className) {
	      var re = new RegExp('\\b' + className + '\\b');
	      if (!node.className.match(re)) {
	        node.className += ' ' + className;
	      }
	    },

	    removeClass: function removeClass(node, className) {
	      var re = new RegExp('\\s*\\b' + className + '\\b', 'g');
	      node.className = node.className.replace(re, '');
	    },

	    toggleClass: function toggleClass(node, className, add) {
	      if (add === undefined) {
	        add = !UI.hasClass(node, className);
	      }

	      if (add) {
	        UI.addClass(node, className);
	      } else {
	        UI.removeClass(node, className);
	      }
	    },

	    hasClass: function hasClass(node, className) {
	      var re = new RegExp('\\b' + className + '\\b');
	      return !!node.className.match(re);
	    },

	    getStyle: function getStyle(node, prop) {
	      if (node.currentStyle) return node.currentStyle[styleProp];
	      if (window.getComputedStyle) return document.defaultView.getComputedStyle(node, null).getPropertyValue(prop);
	      return '';
	    },

	    documentPosition: function documentPosition(node) {
	      var pos = { x: 0, y: 0 };
	      var cur = node;
	      while (cur) {
	        pos.x += cur.offsetLeft;
	        pos.y += cur.offsetTop;
	        cur = cur.offsetParent;
	      }
	      return pos;
	    },

	    windowPosition: function windowPosition(node) {
	      var pos = UI.documentPosition(node);
	      pos.x -= window.scrollX;
	      pos.y -= window.scrollY;
	      return pos;
	    },

	    // DOM event methods
	    delegate: function delegate(event, parent, selector, cb) {
	      if (event === 'focus' || event === 'blur') {
	        // Focus and blur don't bubble
	        throw 'Focus and blur delegation are not yet supported';
	      }
	      var matches = function matches() {
	        return false;
	      };
	      if (typeof selector === 'string') {
	        selector = selector.toUpperCase();
	        matches = function matches(el) {
	          return el.tagName === selector;
	        };
	      } else {
	        if (selector.className) {
	          var re = new RegExp('\\b' + selector.className + '\\b');
	          matches = function matches(el) {
	            return el.className.match(re);
	          };
	        } else if (selector.id) {
	          matches = function matches(el) {
	            return el.id === selector.id;
	          };
	        }
	      }
	      parent.addEventListener(event, function (e) {
	        var node = e.target;
	        while (node && node !== document) {
	          if (matches(node)) {
	            cb.call(node, e);
	          }
	          node = node.parentNode;
	        }
	      });
	    },

	    // formatting methods
	    prettyNumber: function prettyNumber(num) {
	      var pre;
	      var places = Math.ceil(Math.log(Math.abs(num) + 1) / Math.LN10);
	      if (places > 6 && places < 10) {
	        pre = num / 1e6;
	        if ((pre | 0) === pre || Math.round(num % 1e6 / 1e5) === 0) {
	          return (pre | 0) + 'M';
	        } else {
	          return (pre | 0) + '.' + Math.round(num % 1e6 / 1e5) + 'M';
	        }
	      } else if (places > 5) {
	        pre = num / 1000;
	        if ((pre | 0) === pre || Math.round(num % 1000 / 100) === 0) {
	          return (pre | 0) + 'K';
	        } else {
	          return (pre | 0) + '.' + Math.round(num % 1000 / 100) + 'K';
	        }
	      } else if (places > 3) {
	        var post = num % 1000 | 0;
	        if (post < 10) {
	          post = '00' + post;
	        } else if (post < 100) {
	          post = '0' + post;
	        }
	        return (num / 1000 | 0) + ',' + post;
	      } else {
	        return (num | 0) + '';
	      }
	    },

	    // animation methods
	    Animate: {
	      // The show and hide functions require a "transition: 'opacity' delay"
	      // CSS class to be present on the element
	      show: function show(el, delay) {
	        if (delay === 'undefined') {
	          delay = 0;
	        }
	        el.style.display = 'block';
	        el.style.opacity = 0;
	        setTimeout(function () {
	          el.style.opacity = 1;
	        }, delay);
	      },

	      hide: function hide(el, delay) {
	        if (window.getComputedStyle(el).opacity > 0) {
	          if (typeof delay === 'undefined') {
	            delay = 500;
	          }
	          el.style.opacity = 0;
	          setTimeout(function () {
	            el.style.display = 'none';
	          }, delay);
	        }
	      }
	    },

	    // Methods inherited by components
	    ComponentProto: {
	      attach: function attach(parent) {
	        if (this.node) {
	          parent.appendChild(this.node);
	          return this;
	        }
	        return null;
	      },

	      remove: function remove() {
	        if (this.node && this.node.parentNode) {
	          this.node.parentNode.removeChild(this.node);
	          return this;
	        }
	        return null;
	      }
	    }
	  };
	})();

	// live_toc.js
	(function (UI, _) {
	  if (!UI) {
	    return;
	  }

	  var LiveTOC = UI.LiveTOC = function (options) {
	    this.parent = options.parent;
	    this.content = options.content;
	    this.scrollContent = options.scrollContent || options.content;

	    this.throttleInterval = options.throttleInterval || 300;
	    this.alignment = options.alignment || 'center';
	    this.onSelect = options.onSelect || null;

	    this.currentItem = null;
	    this._headerHeights = {};
	    this._sortedHeights = [];

	    this.render();
	    if (options.parent) {
	      this.attach(options.parent);
	    }
	    this.initializeEventHandlers();
	  };

	  LiveTOC.prototype = {
	    initializeEventHandlers: function initializeEventHandlers() {
	      var throttled = _.throttle(this.handleScroll.bind(this), this.throttleInterval);

	      if (this.scrollContent === document.getElementsByTagName('body')[0]) {
	        document.addEventListener('scroll', throttled);
	      } else {
	        this.scrollContent.addEventListener('scroll', throttled);
	      }
	    },

	    render: function render() {
	      // we really need this to calculate header heights
	      this.scrollContent.style.position = "relative";

	      // build a mapping of the table of content based on the
	      // h1s and h2s in the content
	      var toc = this.buildTOC();

	      // add toc data
	      this.node = UI.tag('ul', { className: 'ui_live_toc' }, toc);

	      // calculate the cached heights of each header in the text
	      $(document).ready(function (e) {
	        this.updateHeights();
	      }.bind(this));
	    },

	    // find all the h1s and h2s in the content and build the TOC elements
	    buildTOC: function buildTOC() {
	      var headers = this.content.querySelectorAll('h1, h2, h3');
	      var toc = [];
	      var latestMajor, latestMinor;

	      for (var i = 0; i < headers.length; i++) {
	        var el = headers[i];
	        var text = $(el).text();
	        // var anchor = el.getElementsByTagName('a')[0];
	        // if (anchor === undefined) {
	        // 	continue;
	        // }
	        // var name = anchor.name;
	        var name = el.id;

	        // Build main table of contents list from h1 tags
	        if (el.tagName === 'H1') {
	          latestMajor = UI.tag('ul', { className: 'ui_live_toc_major_list' });
	          toc.push(UI.tag('li', { 'data-name': name, className: 'ui_live_toc_main' }, [UI.tag('a', { href: '#' + name }, text), latestMajor]));
	          latestMinor = undefined;

	          // Build collapsable sublist with h2 tags. We skip any H2s
	          // that appear before the first H1.
	        } else if (el.tagName === 'H2' && latestMajor !== undefined) {
	          latestMinor = UI.tag('ul', { className: 'ui_live_toc_minor_list' });
	          latestMajor.appendChild(UI.tag('li', { 'data-name': name, className: 'ui_live_toc_major' }, [UI.tag('a', { href: '#' + name }, text), latestMinor]));

	          // Build deeper collapsable sublist with h3 tags. We skip any
	          // H3s that appear before the first H1 or directly after any H1
	        } else if (el.tagName === 'H3' && latestMajor !== undefined && latestMinor !== undefined) {
	          latestMinor.appendChild(UI.tag('li', { 'data-name': name, className: 'ui_live_toc_minor' }, [UI.tag('a', { href: '#' + name }, text.toLowerCase())]));
	        }
	      }
	      return toc;
	    },

	    // Update the internal tracking of header heights. Should be called when
	    // the content changes in a way that will affect the height of headers
	    updateHeights: function updateHeights() {
	      var headerHeights = {};
	      var sortedHeights = [];
	      var headers = this.content.querySelectorAll('h1, h2, h3');
	      for (var i = 0; i < headers.length; i++) {
	        // var anchor = headers[i].getElementsByTagName('a')[0];
	        // var name = anchor.name;
	        var name = headers[i].id;

	        headerHeights[headers[i].offsetTop] = name;
	        sortedHeights.push(headers[i].offsetTop);
	      }
	      this._headerHeights = headerHeights;
	      this._sortedHeights = sortedHeights.sort(function (a, b) {
	        return a - b;
	      });
	    },

	    // find out what item to highlight in the TOC and what section
	    // to collapse/expand
	    handleScroll: function handleScroll() {
	      var fromTop = this.scrollContent.scrollTop;
	      // firefox doesn't like this so we fallback to window
	      if (fromTop === 0) {
	        fromTop = $(window).scrollTop();
	      }
	      var renderedHeight = this.scrollContent.offsetHeight;

	      var cur;
	      if (this.alignment === 'top') {
	        cur = fromTop;
	      } else if (this.alignment === 'bottom') {
	        cur = renderedHeight + fromTop;
	      } else {
	        // fallback to center line
	        cur = renderedHeight / 2 + fromTop;
	      }

	      // find closest header above the current location
	      var bestHeight = this._sortedHeights[0];
	      for (var i = 0; i < this._sortedHeights.length; i++) {
	        if (this._sortedHeights[i] > cur) {
	          break; // break once we've passed current
	        }
	        bestHeight = this._sortedHeights[i];
	      }

	      var best = this._headerHeights[bestHeight];

	      // only render if nothing is selected or selection has changed
	      if (this.currentItem === null || this.currentItem.getAttribute('data-name') !== best) {
	        // if we have a new item selected, remove current selection
	        var listItems = this.node.getElementsByTagName('li');
	        for (var j = 0; j < listItems.length; j++) {
	          UI.removeClass(listItems[j], 'selected');
	        }

	        // set newly selected item and add the class
	        this.currentItem = this.node.querySelector('[data-name="' + best + '"]');
	        UI.addClass(this.currentItem, 'selected');

	        // if the item was a minor header, also select parent (major header)
	        if (UI.hasClass(this.currentItem, 'ui_live_toc_minor')) {
	          UI.addClass(this.currentMajorSection(), 'selected');
	        }

	        // if the item was a major header or minor header, also select parent (main header)
	        if (UI.hasClass(this.currentItem, 'ui_live_toc_major') || UI.hasClass(this.currentItem, 'ui_live_toc_minor')) {
	          UI.addClass(this.currentMainSection(), 'selected');
	        }
	      }
	    },

	    /* Utility functions about the state of the content & location */

	    // find the current main section expanded (this is tied to H1s)
	    currentMainSection: function currentMainSection() {
	      var cur = this.currentItem;
	      while (cur && !UI.hasClass(cur, 'ui_live_toc_main')) {
	        cur = cur.parentElement;
	      }
	      return cur;
	    },

	    // find the current major section expanded (this is tied to H2s)
	    currentMajorSection: function currentMajorSection() {
	      if (UI.hasClass(this.currentItem, 'ui_live_toc_main')) {
	        return false;
	      }

	      var cur = this.currentItem;
	      while (!UI.hasClass(cur, 'ui_live_toc_major')) {
	        cur = cur.parentElement;
	      }
	      return cur;
	    }
	  };

	  _.extend(LiveTOC.prototype, UI.ComponentProto);
	})(UI, _);

	// docs_toggle.js
	(function (UI, _) {
	  if (!UI) {
	    return;
	  }

	  if (!App.Views.Docs) {
	    App.Views.Docs = {};
	  }

	  var Toggle = App.Views.Docs.Toggle = function (options) {
	    this.parent = options.parent;
	    this.opt1 = options.opt1;
	    this.opt2 = options.opt2;
	    this.label1 = options.label1;
	    this.label2 = options.label2;
	    this.onChange = options.onChange;
	    this.render();
	  };

	  Toggle.prototype = {
	    render: function render() {
	      var opt1Els = this.parent.getElementsByClassName('hljs ' + this.opt1);
	      for (var i = 0; i < opt1Els.length; i++) {
	        if (opt1Els[i].parentElement.parentElement.getAttribute("class").indexOf("common-lang-block") === -1) {
	          UI.addClass(opt1Els[i], 'has_toggles');
	          opt1Els[i].appendChild(this.renderToggle(true));
	        }
	      }

	      var opt2Els = this.parent.getElementsByClassName('hljs ' + this.opt2);
	      for (i = 0; i < opt2Els.length; i++) {
	        if (opt2Els[i].parentElement.parentElement.getAttribute("class").indexOf("common-lang-block") === -1) {
	          UI.addClass(opt2Els[i], 'has_toggles');
	          opt2Els[i].appendChild(this.renderToggle(false));
	        }
	      }

	      $('.' + this.opt2 + '-toggle').on('click', this.showOpt2.bind(this));
	      $('.' + this.opt1 + '-toggle').on('click', this.showOpt1.bind(this));
	      this.toggleOpt(true);
	    },

	    renderToggle: function renderToggle(selectOpt1) {
	      var toggle = UI.tag('div', { className: 'toggles' }, [UI.tag('div', { className: 'toggle-item' }, [UI.tag('a', { className: this.opt1 + '-toggle', href: '#' }, this.label1)]), UI.tag('div', { className: 'toggle-item' }, [UI.tag('a', { className: this.opt2 + '-toggle', href: '#' }, this.label2)])]);

	      if (selectOpt1 === true) {
	        UI.addClass(toggle.childNodes[0], 'selected');
	      } else {
	        UI.addClass(toggle.childNodes[1], 'selected');
	      }

	      return toggle;
	    },

	    showOpt1: function showOpt1(e) {
	      e.preventDefault();

	      // make sure it's the right toggle
	      if ($(e.target).parent().hasClass('selected')) {
	        return false;
	      }

	      var $pre = $(e.target).closest('pre');
	      var distance = $(window).scrollTop() - $pre[0].offsetTop;

	      // flash the border
	      var $code = $pre.prev().children('code');
	      $code.addClass('code_flash');
	      setTimeout(function () {
	        $code.removeClass('code_flash');
	      }, 2000);

	      // scroll to the code block
	      var el = $pre.prev()[0];
	      this.toggleOpt(true);
	      $(window).scrollTop(el.offsetTop + distance);
	    },

	    showOpt2: function showOpt2(e) {
	      e.preventDefault();

	      // make sure it's the right toggle
	      if ($(e.target).parent().hasClass('selected')) {
	        return false;
	      }

	      var $pre = $(e.target).closest('pre');
	      var distance = $(window).scrollTop() - $pre[0].offsetTop;

	      // flash the border
	      var $code = $pre.next().children('code');
	      $code.addClass('code_flash');
	      setTimeout(function () {
	        $code.removeClass('code_flash');
	      }, 2000);

	      // scroll to the code block
	      var el = $pre.next()[0];
	      this.toggleOpt(false);
	      $(window).scrollTop(el.offsetTop + distance);
	    },

	    toggleOpt: function toggleOpt(showOpt1) {
	      if (showOpt1 === true) {
	        $('.hljs.' + this.opt2).parent().hide();
	        $('.hljs.' + this.opt1).parent().show();
	      } else {
	        $('.hljs.' + this.opt2).parent().show();
	        $('.hljs.' + this.opt1).parent().hide();
	      }
	      this.onChange();
	    }
	  };

	  _.extend(Toggle.prototype, UI.ComponentProto);
	})(UI, _);

	// docs.js
	(function (UI, _) {
	  if (!UI) {
	    return;
	  }

	  if (!App.Views.Docs) {
	    App.Views.Docs = {};
	  }

	  var Docs = App.Views.Docs.Main = function (options) {
	    this.platform = options.platform;
	    this.language = options.language;
	    this.render();
	  };

	  Docs.prototype = {
	    render: function render() {
	      // create the TOC
	      this.scrollContent = document.getElementsByTagName('body')[0];
	      this.toc = new UI.LiveTOC({
	        parent: document.getElementById('toc'),
	        scrollContent: this.scrollContent,
	        content: document.getElementsByClassName('guide_content')[0]
	      });

	      // deal with common-lang-blocks
	      this.toggleCommonLangBlocks();

	      // setup the server/mount path editor
	      this.setupServerFieldCustomization();

	      // add toggles to code blocks if necessary
	      if (this.platform === "ios" || this.platform === "osx" || this.platform === "macos") {
	        new App.Views.Docs.Toggle({
	          parent: this.scrollContent,
	          opt1: 'objectivec',
	          opt2: 'swift',
	          label1: 'Objective-C',
	          label2: 'Swift',
	          onChange: this.handleToggleChange.bind(this)
	        });
	      } else if (this.platform === "rest") {
	        new App.Views.Docs.Toggle({
	          parent: this.scrollContent,
	          opt1: 'bash',
	          opt2: 'python',
	          label1: 'cURL',
	          label2: 'Python',
	          onChange: this.handleToggleChange.bind(this)
	        });
	      }

	      this.mobileToc = document.getElementById('mobile_toc').getElementsByTagName('select')[0];
	      this.renderMobileTOC();

	      // move the TOC with the content. Since it's fixed, we can't just do it in css :(
	      $(window).on('resize', _.throttle(this.handleWindowResize.bind(this), 300));
	      this.handleWindowResize();
	      // calculate final position of headers for the TOC once
	      // the DOM is loaded (including images)
	      $(window).on('load', function () {
	        this.toc.updateHeights();
	      }.bind(this));
	    },

	    renderMobileTOC: function renderMobileTOC() {
	      var h1s = this.scrollContent.getElementsByTagName('h1');
	      for (var i = 0; i < h1s.length; i++) {
	        // var anchor = h1s[i].getElementsByTagName('a')[0];
	        this.mobileToc.appendChild(UI.tag('option', { 'data-anchor': h1s[i].id }, [h1s[i].textContent]));
	      }
	      this.mobileToc.addEventListener('change', this.handleSelectChange.bind(this));
	      this.mobileToc.getElementsByTagName('option')[0].setAttribute('selected', true);
	    },

	    // in "common" sections, there's a code block for every platform,
	    // this hides all but the current one
	    toggleCommonLangBlocks: function toggleCommonLangBlocks() {
	      $('.common-lang-block').hide();
	      switch (this.platform) {
	        case 'ios':
	        case 'osx':
	        case 'macos':
	          $('.common-lang-block.objectivec').show();
	          $('.common-lang-block.swift').show();
	          break;
	        case 'android':
	          $('.common-lang-block.java').show();
	          break;
	        case 'dotnet':
	        case 'unity':
	          $('.common-lang-block.cs').show();
	          break;
	        case 'php':
	          $('.common-lang-block.php').show();
	          break;
	        case 'rest':
	          $('.common-lang-block.bash').show();
	          $('.common-lang-block.python').show();
	          break;
	        case 'arduino':
	          $('.common-lang-block.cpp').show();
	          break;
	        case 'cloudcode':
	        case 'js':
	        default:
	          $('.common-lang-block.js').show();
	      }
	    },

	    setupServerFieldCustomization: function setupServerFieldCustomization() {

	      if (!document.getElementById('parse-server-custom-url')) {
	        // no customization available on this page
	        return;
	      }

	      if (typeof Storage !== "undefined") {
	        // apply previous values from local storage
	        var _url = localStorage.getItem('parse-server-custom-url');
	        var _mount = localStorage.getItem('parse-server-custom-mount');
	        var _protocol = localStorage.getItem('parse-server-custom-protocol');
	        var _appId = localStorage.getItem('parse-server-custom-appid');
	        var _clientKey = localStorage.getItem('parse-server-custom-clientkey');

	        // set existing entries
	        if (_url) {
	          $(".custom-parse-server-url").html(_url);
	          $("#parse-server-custom-url").val(_url);
	        }
	        if (_mount) {
	          $(".custom-parse-server-mount").html(_mount);
	          $("#parse-server-custom-mount").val(_mount);
	        }
	        if (_protocol) {
	          $(".custom-parse-server-protocol").html(_protocol);
	          $("#parse-server-custom-protocol").val(_protocol);
	        }
	        if (_appId) {
	          $(".custom-parse-server-appid").html(_appId);
	          $("#parse-server-custom-appid").val(_appId);
	        }
	        if (_clientKey) {
	          $(".custom-parse-server-clientkey").html(_clientKey);
	          $("#parse-server-custom-clientkey").val(_clientKey);
	        }
	      }

	      // set url listener
	      $('#parse-server-custom-url').keyup(function () {
	        var url = $('#parse-server-custom-url').val();
	        if (!url.match(/^[-_a-z0-9\.]+(?::[0-9]+)?$/i)) {
	          // not a valid url
	          return;
	        }
	        $(".custom-parse-server-url").html(url);
	        if (typeof Storage !== "undefined") {
	          localStorage.setItem('parse-server-custom-url', url);
	        }
	      });

	      // set mount listener
	      $('#parse-server-custom-mount').keyup(function () {
	        var mount = $('#parse-server-custom-mount').val();
	        if (!mount.match(/^[-_a-z0-9\/]+$/i) && mount !== '') {
	          // not a valid mount path, and not empty
	          return;
	        }
	        if (!mount.match(/^\//)) {
	          // add leading slash
	          mount = '/' + mount;
	        }
	        if (!mount.match(/\/$/)) {
	          // add trailing slash
	          mount = mount + '/';
	        }
	        $(".custom-parse-server-mount").html(mount);
	        if (typeof Storage !== "undefined") {
	          localStorage.setItem('parse-server-custom-mount', mount);
	        }
	      });

	      // set protocol listener
	      $('#parse-server-custom-protocol').change(function () {
	        var protocol = $('#parse-server-custom-protocol').val();
	        if (!protocol.match(/^[a-z]+$/)) {
	          // not a valid protocol
	          return;
	        }
	        $(".custom-parse-server-protocol").html(protocol);
	        if (typeof Storage !== "undefined") {
	          localStorage.setItem('parse-server-custom-protocol', protocol);
	        }
	      });

	      // set appId listener
	      $('#parse-server-custom-appid').keyup(function () {
	        var appId = $('#parse-server-custom-appid').val();
	        if (!appId.match(/^[^\s]+$/i)) {
	          // not a valid appId
	          return;
	        }
	        // encode any html
	        appId = appId.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	        $(".custom-parse-server-appid").html(appId);
	        if (typeof Storage !== "undefined") {
	          localStorage.setItem('parse-server-custom-appid', appId);
	        }
	      });

	      // set clientKey listener
	      $('#parse-server-custom-clientkey').keyup(function () {
	        var clientKey = $('#parse-server-custom-clientkey').val();
	        if (!clientKey.match(/^[^\s]+$/i)) {
	          // not a valid appId
	          return;
	        }
	        // encode any html
	        clientKey = clientKey.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	        $(".custom-parse-server-clientkey").html(clientKey);
	        if (typeof Storage !== "undefined") {
	          localStorage.setItem('parse-server-custom-clientkey', clientKey);
	        }
	      });

	      // set reset button
	      $('#parse-server-custom-values-reset').click(function () {
	        // reset defaults
	        var _default = $("#parse-server-custom-url").attr('defaultval');
	        $(".custom-parse-server-url").html(_default);
	        $("#parse-server-custom-url").val(_default);
	        localStorage.setItem('parse-server-custom-url', _default);

	        _default = $("#parse-server-custom-mount").attr('defaultval');
	        $(".custom-parse-server-mount").html("/" + _default + "/");
	        $("#parse-server-custom-mount").val(_default);
	        localStorage.setItem('parse-server-custom-mount', "/" + _default + "/");

	        _default = $("#parse-server-custom-protocol").attr('defaultval');
	        $(".custom-parse-server-protocol").html(_default);
	        $("#parse-server-custom-protocol").val(_default);
	        localStorage.setItem('parse-server-custom-protocol', _default);

	        _default = $("#parse-server-custom-appid").attr('defaultval');
	        $(".custom-parse-server-appid").html(_default);
	        $("#parse-server-custom-appid").val(_default);
	        localStorage.setItem('parse-server-custom-appid', _default);

	        _default = $("#parse-server-custom-clientkey").attr('defaultval');
	        $(".custom-parse-server-clientkey").html(_default);
	        $("#parse-server-custom-clientkey").val(_default);
	        localStorage.setItem('parse-server-custom-clientkey', _default);
	      });
	    },

	    // we recalculate the header heights for the TOC
	    // highlighting when the height of the content changes
	    handleToggleChange: function handleToggleChange() {
	      this.toc.updateHeights();
	    },

	    handleSelectChange: function handleSelectChange(e) {
	      location.href = this.mobileToc.selectedOptions[0].getAttribute('data-anchor');
	    },

	    handleWindowResize: function handleWindowResize(e) {
	      this.toc.parent.style.left = $(".guide").css("margin-left");
	      this.toc.updateHeights();
	    }
	  };

	  _.extend(Docs.prototype, UI.ComponentProto);
	})(UI, _);

	$('pre code').each(function (i, block) {
	  hljs.highlightBlock(block);
	});

	var platform = window.location.pathname.split('/')[1];
	if (platform) {
	  new App.Views.Docs.Main({
	    language: 'en',
	    platform: platform
	  });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function () {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype,
	      ObjProto = Object.prototype,
	      FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var push = ArrayProto.push,
	      slice = ArrayProto.slice,
	      toString = ObjProto.toString,
	      hasOwnProperty = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var nativeIsArray = Array.isArray,
	      nativeKeys = Object.keys,
	      nativeBind = FuncProto.bind,
	      nativeCreate = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function Ctor() {};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function _(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function optimizeCb(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1:
	        return function (value) {
	          return func.call(context, value);
	        };
	      case 2:
	        return function (value, other) {
	          return func.call(context, value, other);
	        };
	      case 3:
	        return function (value, index, collection) {
	          return func.call(context, value, index, collection);
	        };
	      case 4:
	        return function (accumulator, value, index, collection) {
	          return func.call(context, accumulator, value, index, collection);
	        };
	    }
	    return function () {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function cb(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function (value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function createAssigner(keysFunc, undefinedOnly) {
	    return function (obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function baseCreate(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor();
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function property(key) {
	    return function (obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function isArrayLike(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function (obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function (obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function (obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function (obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function (value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function (obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function (obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function (value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function (obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function (obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function (obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function (obj, iteratee, context) {
	    var result = -Infinity,
	        lastComputed = -Infinity,
	        value,
	        computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function (obj, iteratee, context) {
	    var result = Infinity,
	        lastComputed = Infinity,
	        value,
	        computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function (obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function (obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function (value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function (left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function group(behavior) {
	    return function (obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function (result, value, key) {
	    if (_.has(result, key)) result[key].push(value);else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function (result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function (result, value, key) {
	    if (_.has(result, key)) result[key]++;else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function (obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function (obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [],
	        fail = [];
	    _.each(obj, function (value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function (array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function (array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function (array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function (array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function (array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function flatten(input, shallow, strict, startIndex) {
	    var output = [],
	        idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0,
	            len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function (array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function (array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function (array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function () {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function (array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function (array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function (value) {
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function () {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function (array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function (list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function (array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function (array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0,
	        high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1;else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function (array, item, idx) {
	      var i = 0,
	          length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	          i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function (start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function (func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function bound() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function (func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function bound() {
	      var position = 0,
	          length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) {
	        args.push(arguments[position++]);
	      }return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function (obj) {
	    var i,
	        length = arguments.length,
	        key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function (func, hasher) {
	    var memoize = function memoize(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function (func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function () {
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function (func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function later() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function () {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function (func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function later() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function () {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function (func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function (predicate) {
	    return function () {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function () {
	    var args = arguments;
	    var start = args.length - 1;
	    return function () {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) {
	        result = args[i].call(this, result);
	      }return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function (times, func) {
	    return function () {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function (times, func) {
	    var memo;
	    return function () {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function (obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) {
	      if (_.has(obj, key)) keys.push(key);
	    } // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function (obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) {
	      keys.push(key);
	    } // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function (obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = _.keys(obj),
	        length = keys.length,
	        results = {},
	        currentKey;
	    for (var index = 0; index < length; index++) {
	      currentKey = keys[index];
	      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function (obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function (obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function (obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj),
	        key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function (object, oiteratee, context) {
	    var result = {},
	        obj = object,
	        iteratee,
	        keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function iteratee(value, key, obj) {
	        return key in obj;
	      };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	  // Return a copy of the object without the blacklisted properties.
	  _.omit = function (obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function iteratee(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function (prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function (obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function (obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function (object, attrs) {
	    var keys = _.keys(attrs),
	        length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };

	  // Internal recursive comparison function for `isEqual`.
	  var eq = function eq(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor,
	          bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a),
	          key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function (a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function (obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function (obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function (obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function (obj) {
	    var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (name) {
	    _['is' + name] = function (obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function (obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && (typeof Int8Array === 'undefined' ? 'undefined' : _typeof(Int8Array)) != 'object') {
	    _.isFunction = function (obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function (obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function (obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function (obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function (obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function (obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function (obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function () {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function (value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function (value) {
	    return function () {
	      return value;
	    };
	  };

	  _.noop = function () {};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function (obj) {
	    return obj == null ? function () {} : function (key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function (attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function (obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function (n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) {
	      accum[i] = iteratee(i);
	    }return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function (min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function () {
	    return new Date().getTime();
	  };

	  // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function createEscaper(map) {
	    var escaper = function escaper(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function (string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function (object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function (prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate: /<%([\s\S]+?)%>/g,
	    interpolate: /<%=([\s\S]+?)%>/g,
	    escape: /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'": "'",
	    '\\': '\\',
	    '\r': 'r',
	    '\n': 'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function escapeChar(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function (text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function template(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function (obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function result(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function (obj) {
	    _.each(_.functions(obj), function (name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function () {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function () {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function (name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function () {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function () {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function () {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(undefined);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(23), __webpack_require__(50), __webpack_require__(57), __webpack_require__(56), __webpack_require__(55), __webpack_require__(58), __webpack_require__(59), __webpack_require__(60), __webpack_require__(63), __webpack_require__(53), __webpack_require__(69), __webpack_require__(71), __webpack_require__(32), __webpack_require__(73), __webpack_require__(80), __webpack_require__(3), __webpack_require__(81), __webpack_require__(82), __webpack_require__(74), __webpack_require__(83), __webpack_require__(84), __webpack_require__(85), __webpack_require__(86), __webpack_require__(88), __webpack_require__(61), __webpack_require__(89), __webpack_require__(90), __webpack_require__(91), __webpack_require__(92), __webpack_require__(93)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		return window.jQuery = window.$ = jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(19), __webpack_require__(16), __webpack_require__(17), __webpack_require__(11), __webpack_require__(18), __webpack_require__(20), __webpack_require__(21), __webpack_require__(22), __webpack_require__(26), __webpack_require__(4), __webpack_require__(27), __webpack_require__(30), __webpack_require__(31), __webpack_require__(54), __webpack_require__(28), __webpack_require__(39), __webpack_require__(46), __webpack_require__(55), __webpack_require__(23) // contains
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, pnum, access, rmargin, document, rcssNum, rnumnonpx, cssExpand, isHidden, getStyles, swap, curCSS, adjustCSS, defaultDisplay, addGetHookIf, support, dataPriv) {

		var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		    cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},
		    cssPrefixes = ["Webkit", "O", "Moz", "ms"],
		    emptyStyle = document.createElement("div").style;

		// Return a css property mapped to a potentially vendor prefixed property
		function vendorPropName(name) {

			// Shortcut for names that are not vendor prefixed
			if (name in emptyStyle) {
				return name;
			}

			// Check for vendor prefixed names
			var capName = name[0].toUpperCase() + name.slice(1),
			    i = cssPrefixes.length;

			while (i--) {
				name = cssPrefixes[i] + capName;
				if (name in emptyStyle) {
					return name;
				}
			}
		}

		function setPositiveNumber(elem, value, subtract) {

			// Any relative (+/-) values have already been
			// normalized at this point
			var matches = rcssNum.exec(value);
			return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
		}

		function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
			var i = extra === (isBorderBox ? "border" : "content") ?

			// If we already have the right measurement, avoid augmentation
			4 :

			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,
			    val = 0;

			for (; i < 4; i += 2) {

				// Both box models exclude margin, so add it if we want it
				if (extra === "margin") {
					val += jQuery.css(elem, extra + cssExpand[i], true, styles);
				}

				if (isBorderBox) {

					// border-box includes padding, so remove it if we want content
					if (extra === "content") {
						val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
					}

					// At this point, extra isn't border nor margin, so remove border
					if (extra !== "margin") {
						val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
					}
				} else {

					// At this point, extra isn't content, so add padding
					val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

					// At this point, extra isn't content nor padding, so add border
					if (extra !== "padding") {
						val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
					}
				}
			}

			return val;
		}

		function getWidthOrHeight(elem, name, extra) {

			// Start with offset property, which is equivalent to the border-box value
			var valueIsBorderBox = true,
			    val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			    styles = getStyles(elem),
			    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

			// Some non-html elements return undefined for offsetWidth, so check for null/undefined
			// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
			// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
			if (val <= 0 || val == null) {

				// Fall back to computed then uncomputed css if necessary
				val = curCSS(elem, name, styles);
				if (val < 0 || val == null) {
					val = elem.style[name];
				}

				// Computed unit is not pixels. Stop here and return.
				if (rnumnonpx.test(val)) {
					return val;
				}

				// Check for style in case a browser which returns unreliable values
				// for getComputedStyle silently falls back to the reliable elem.style
				valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

				// Normalize "", auto, and prepare for extra
				val = parseFloat(val) || 0;
			}

			// Use the active box-sizing model to add/subtract irrelevant styles
			return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
		}

		function showHide(elements, show) {
			var display,
			    elem,
			    hidden,
			    values = [],
			    index = 0,
			    length = elements.length;

			for (; index < length; index++) {
				elem = elements[index];
				if (!elem.style) {
					continue;
				}

				values[index] = dataPriv.get(elem, "olddisplay");
				display = elem.style.display;
				if (show) {

					// Reset the inline display of this element to learn if it is
					// being hidden by cascaded rules or not
					if (!values[index] && display === "none") {
						elem.style.display = "";
					}

					// Set elements which have been overridden with display: none
					// in a stylesheet to whatever the default browser style is
					// for such an element
					if (elem.style.display === "" && isHidden(elem)) {
						values[index] = dataPriv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
					}
				} else {
					hidden = isHidden(elem);

					if (display !== "none" || !hidden) {
						dataPriv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
					}
				}
			}

			// Set the display of most of the elements in a second loop
			// to avoid the constant reflow
			for (index = 0; index < length; index++) {
				elem = elements[index];
				if (!elem.style) {
					continue;
				}
				if (!show || elem.style.display === "none" || elem.style.display === "") {
					elem.style.display = show ? values[index] || "" : "none";
				}
			}

			return elements;
		}

		jQuery.extend({

			// Add in style property hooks for overriding the default
			// behavior of getting and setting a style property
			cssHooks: {
				opacity: {
					get: function get(elem, computed) {
						if (computed) {

							// We should always get a number back from opacity
							var ret = curCSS(elem, "opacity");
							return ret === "" ? "1" : ret;
						}
					}
				}
			},

			// Don't automatically add "px" to these possibly-unitless properties
			cssNumber: {
				"animationIterationCount": true,
				"columnCount": true,
				"fillOpacity": true,
				"flexGrow": true,
				"flexShrink": true,
				"fontWeight": true,
				"lineHeight": true,
				"opacity": true,
				"order": true,
				"orphans": true,
				"widows": true,
				"zIndex": true,
				"zoom": true
			},

			// Add in properties whose names you wish to fix before
			// setting or getting the value
			cssProps: {
				"float": "cssFloat"
			},

			// Get and set the style property on a DOM Node
			style: function style(elem, name, value, extra) {

				// Don't set styles on text and comment nodes
				if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
					return;
				}

				// Make sure that we're working with the right name
				var ret,
				    type,
				    hooks,
				    origName = jQuery.camelCase(name),
				    style = elem.style;

				name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

				// Gets hook for the prefixed version, then unprefixed version
				hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

				// Check if we're setting a value
				if (value !== undefined) {
					type = typeof value === "undefined" ? "undefined" : _typeof(value);

					// Convert "+=" or "-=" to relative numbers (#7345)
					if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
						value = adjustCSS(elem, name, ret);

						// Fixes bug #9237
						type = "number";
					}

					// Make sure that null and NaN values aren't set (#7116)
					if (value == null || value !== value) {
						return;
					}

					// If a number was passed in, add the unit (except for certain CSS properties)
					if (type === "number") {
						value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
					}

					// Support: IE9-11+
					// background-* props affect original clone's values
					if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
						style[name] = "inherit";
					}

					// If a hook was provided, use that value, otherwise just set the specified value
					if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

						style[name] = value;
					}
				} else {

					// If a hook was provided get the non-computed value from there
					if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {

						return ret;
					}

					// Otherwise just get the value from the style object
					return style[name];
				}
			},

			css: function css(elem, name, extra, styles) {
				var val,
				    num,
				    hooks,
				    origName = jQuery.camelCase(name);

				// Make sure that we're working with the right name
				name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

				// Try prefixed name followed by the unprefixed name
				hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

				// If a hook was provided get the computed value from there
				if (hooks && "get" in hooks) {
					val = hooks.get(elem, true, extra);
				}

				// Otherwise, if a way to get the computed value exists, use that
				if (val === undefined) {
					val = curCSS(elem, name, styles);
				}

				// Convert "normal" to computed value
				if (val === "normal" && name in cssNormalTransform) {
					val = cssNormalTransform[name];
				}

				// Make numeric if forced or a qualifier was provided and val looks numeric
				if (extra === "" || extra) {
					num = parseFloat(val);
					return extra === true || isFinite(num) ? num || 0 : val;
				}
				return val;
			}
		});

		jQuery.each(["height", "width"], function (i, name) {
			jQuery.cssHooks[name] = {
				get: function get(elem, computed, extra) {
					if (computed) {

						// Certain elements can have dimension info if we invisibly show them
						// but it must have a current display style that would benefit
						return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? swap(elem, cssShow, function () {
							return getWidthOrHeight(elem, name, extra);
						}) : getWidthOrHeight(elem, name, extra);
					}
				},

				set: function set(elem, value, extra) {
					var matches,
					    styles = extra && getStyles(elem),
					    subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);

					// Convert to pixels if value adjustment is needed
					if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {

						elem.style[name] = value;
						value = jQuery.css(elem, name);
					}

					return setPositiveNumber(elem, value, subtract);
				}
			};
		});

		jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
			if (computed) {
				return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
					return elem.getBoundingClientRect().left;
				})) + "px";
			}
		});

		// Support: Android 2.3
		jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function (elem, computed) {
			if (computed) {
				return swap(elem, { "display": "inline-block" }, curCSS, [elem, "marginRight"]);
			}
		});

		// These hooks are used by animate to expand properties
		jQuery.each({
			margin: "",
			padding: "",
			border: "Width"
		}, function (prefix, suffix) {
			jQuery.cssHooks[prefix + suffix] = {
				expand: function expand(value) {
					var i = 0,
					    expanded = {},


					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [value];

					for (; i < 4; i++) {
						expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
					}

					return expanded;
				}
			};

			if (!rmargin.test(prefix)) {
				jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
			}
		});

		jQuery.fn.extend({
			css: function css(name, value) {
				return access(this, function (elem, name, value) {
					var styles,
					    len,
					    map = {},
					    i = 0;

					if (jQuery.isArray(name)) {
						styles = getStyles(elem);
						len = name.length;

						for (; i < len; i++) {
							map[name[i]] = jQuery.css(elem, name[i], false, styles);
						}

						return map;
					}

					return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
				}, name, value, arguments.length > 1);
			},
			show: function show() {
				return showHide(this, true);
			},
			hide: function hide() {
				return showHide(this);
			},
			toggle: function toggle(state) {
				if (typeof state === "boolean") {
					return state ? this.show() : this.hide();
				}

				return this.each(function () {
					if (isHidden(this)) {
						jQuery(this).show();
					} else {
						jQuery(this).hide();
					}
				});
			}
		});

		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

		// A method for quickly swapping in/out CSS properties to get correct calculations.
		return function (elem, options, callback, args) {
			var ret,
			    name,
			    old = {};

			// Remember the old values, and insert the new ones
			for (name in options) {
				old[name] = elem.style[name];
				elem.style[name] = options[name];
			}

			ret = callback.apply(elem, args || []);

			// Revert the old values
			for (name in options) {
				elem.style[name] = old[name];
			}

			return ret;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(8), __webpack_require__(9), __webpack_require__(10), __webpack_require__(6), __webpack_require__(12), __webpack_require__(13), __webpack_require__(14), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function (arr, document, _slice, concat, push, indexOf, class2type, toString, hasOwn, support) {

		var version = "@VERSION",


		// Define a local copy of jQuery
		jQuery = function jQuery(selector, context) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init(selector, context);
		},


		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,


		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		    rdashAlpha = /-([\da-z])/gi,


		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function fcamelCase(all, letter) {
			return letter.toUpperCase();
		};

		jQuery.fn = jQuery.prototype = {

			// The current version of jQuery being used
			jquery: version,

			constructor: jQuery,

			// Start with an empty selector
			selector: "",

			// The default length of a jQuery object is 0
			length: 0,

			toArray: function toArray() {
				return _slice.call(this);
			},

			// Get the Nth element in the matched element set OR
			// Get the whole matched element set as a clean array
			get: function get(num) {
				return num != null ?

				// Return just the one element from the set
				num < 0 ? this[num + this.length] : this[num] :

				// Return all the elements in a clean array
				_slice.call(this);
			},

			// Take an array of elements and push it onto the stack
			// (returning the new matched element set)
			pushStack: function pushStack(elems) {

				// Build a new jQuery matched element set
				var ret = jQuery.merge(this.constructor(), elems);

				// Add the old object onto the stack (as a reference)
				ret.prevObject = this;
				ret.context = this.context;

				// Return the newly-formed element set
				return ret;
			},

			// Execute a callback for every element in the matched set.
			each: function each(callback) {
				return jQuery.each(this, callback);
			},

			map: function map(callback) {
				return this.pushStack(jQuery.map(this, function (elem, i) {
					return callback.call(elem, i, elem);
				}));
			},

			slice: function slice() {
				return this.pushStack(_slice.apply(this, arguments));
			},

			first: function first() {
				return this.eq(0);
			},

			last: function last() {
				return this.eq(-1);
			},

			eq: function eq(i) {
				var len = this.length,
				    j = +i + (i < 0 ? len : 0);
				return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
			},

			end: function end() {
				return this.prevObject || this.constructor();
			},

			// For internal use only.
			// Behaves like an Array's method, not like a jQuery method.
			push: push,
			sort: arr.sort,
			splice: arr.splice
		};

		jQuery.extend = jQuery.fn.extend = function () {
			var options,
			    name,
			    src,
			    copy,
			    copyIsArray,
			    clone,
			    target = arguments[0] || {},
			    i = 1,
			    length = arguments.length,
			    deep = false;

			// Handle a deep copy situation
			if (typeof target === "boolean") {
				deep = target;

				// Skip the boolean and the target
				target = arguments[i] || {};
				i++;
			}

			// Handle case when target is a string or something (possible in deep copy)
			if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !jQuery.isFunction(target)) {
				target = {};
			}

			// Extend jQuery itself if only one argument is passed
			if (i === length) {
				target = this;
				i--;
			}

			for (; i < length; i++) {

				// Only deal with non-null/undefined values
				if ((options = arguments[i]) != null) {

					// Extend the base object
					for (name in options) {
						src = target[name];
						copy = options[name];

						// Prevent never-ending loop
						if (target === copy) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {

							if (copyIsArray) {
								copyIsArray = false;
								clone = src && jQuery.isArray(src) ? src : [];
							} else {
								clone = src && jQuery.isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = jQuery.extend(deep, clone, copy);

							// Don't bring in undefined values
						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			// Return the modified object
			return target;
		};

		jQuery.extend({

			// Unique for each copy of jQuery on the page
			expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

			// Assume jQuery is ready without the ready module
			isReady: true,

			error: function error(msg) {
				throw new Error(msg);
			},

			noop: function noop() {},

			isFunction: function isFunction(obj) {
				return jQuery.type(obj) === "function";
			},

			isArray: Array.isArray,

			isWindow: function isWindow(obj) {
				return obj != null && obj === obj.window;
			},

			isNumeric: function isNumeric(obj) {

				// parseFloat NaNs numeric-cast false positives (null|true|false|"")
				// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
				// subtraction forces infinities to NaN
				// adding 1 corrects loss of precision from parseFloat (#15100)
				var realStringObj = obj && obj.toString();
				return !jQuery.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0;
			},

			isPlainObject: function isPlainObject(obj) {
				var key;

				// Not plain objects:
				// - Any object or value whose internal [[Class]] property is not "[object Object]"
				// - DOM nodes
				// - window
				if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
					return false;
				}

				// Not own constructor property must be Object
				if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype || {}, "isPrototypeOf")) {
					return false;
				}

				// Own properties are enumerated firstly, so to speed up,
				// if last one is own, then all properties are own
				for (key in obj) {}

				return key === undefined || hasOwn.call(obj, key);
			},

			isEmptyObject: function isEmptyObject(obj) {
				var name;
				for (name in obj) {
					return false;
				}
				return true;
			},

			type: function type(obj) {
				if (obj == null) {
					return obj + "";
				}

				// Support: Android<4.0, iOS<6 (functionish RegExp)
				return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
			},

			// Evaluates a script in a global context
			globalEval: function globalEval(code) {
				var script,
				    indirect = eval;

				code = jQuery.trim(code);

				if (code) {

					// If the code includes a valid, prologue position
					// strict mode pragma, execute code by injecting a
					// script tag into the document.
					if (code.indexOf("use strict") === 1) {
						script = document.createElement("script");
						script.text = code;
						document.head.appendChild(script).parentNode.removeChild(script);
					} else {

						// Otherwise, avoid the DOM node creation, insertion
						// and removal by using an indirect global eval

						indirect(code);
					}
				}
			},

			// Convert dashed to camelCase; used by the css and data modules
			// Support: IE9-11+
			// Microsoft forgot to hump their vendor prefix (#9572)
			camelCase: function camelCase(string) {
				return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
			},

			nodeName: function nodeName(elem, name) {
				return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
			},

			each: function each(obj, callback) {
				var length,
				    i = 0;

				if (isArrayLike(obj)) {
					length = obj.length;
					for (; i < length; i++) {
						if (callback.call(obj[i], i, obj[i]) === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						if (callback.call(obj[i], i, obj[i]) === false) {
							break;
						}
					}
				}

				return obj;
			},

			// Support: Android<4.1
			trim: function trim(text) {
				return text == null ? "" : (text + "").replace(rtrim, "");
			},

			// results is for internal usage only
			makeArray: function makeArray(arr, results) {
				var ret = results || [];

				if (arr != null) {
					if (isArrayLike(Object(arr))) {
						jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
					} else {
						push.call(ret, arr);
					}
				}

				return ret;
			},

			inArray: function inArray(elem, arr, i) {
				return arr == null ? -1 : indexOf.call(arr, elem, i);
			},

			merge: function merge(first, second) {
				var len = +second.length,
				    j = 0,
				    i = first.length;

				for (; j < len; j++) {
					first[i++] = second[j];
				}

				first.length = i;

				return first;
			},

			grep: function grep(elems, callback, invert) {
				var callbackInverse,
				    matches = [],
				    i = 0,
				    length = elems.length,
				    callbackExpect = !invert;

				// Go through the array, only saving the items
				// that pass the validator function
				for (; i < length; i++) {
					callbackInverse = !callback(elems[i], i);
					if (callbackInverse !== callbackExpect) {
						matches.push(elems[i]);
					}
				}

				return matches;
			},

			// arg is for internal usage only
			map: function map(elems, callback, arg) {
				var length,
				    value,
				    i = 0,
				    ret = [];

				// Go through the array, translating each of the items to their new values
				if (isArrayLike(elems)) {
					length = elems.length;
					for (; i < length; i++) {
						value = callback(elems[i], i, arg);

						if (value != null) {
							ret.push(value);
						}
					}

					// Go through every key on the object,
				} else {
					for (i in elems) {
						value = callback(elems[i], i, arg);

						if (value != null) {
							ret.push(value);
						}
					}
				}

				// Flatten any nested arrays
				return concat.apply([], ret);
			},

			// A global GUID counter for objects
			guid: 1,

			// Bind a function to a context, optionally partially applying any
			// arguments.
			proxy: function proxy(fn, context) {
				var tmp, args, proxy;

				if (typeof context === "string") {
					tmp = fn[context];
					context = fn;
					fn = tmp;
				}

				// Quick check to determine if target is callable, in the spec
				// this throws a TypeError, but we will just return undefined.
				if (!jQuery.isFunction(fn)) {
					return undefined;
				}

				// Simulated bind
				args = _slice.call(arguments, 2);
				proxy = function proxy() {
					return fn.apply(context || this, args.concat(_slice.call(arguments)));
				};

				// Set the guid of unique handler to the same of original handler, so it can be removed
				proxy.guid = fn.guid = fn.guid || jQuery.guid++;

				return proxy;
			},

			now: Date.now,

			// jQuery.support is not used in Core but other projects attach their
			// properties to it so it needs to exist.
			support: support
		});

		// JSHint would error on this code due to the Symbol not being defined in ES5.
		// Defining this global in .jshintrc would create a danger of using the global
		// unguarded in another place, it seems safer to just disable JSHint for these
		// three lines.
		/* jshint ignore: start */
		if (typeof Symbol === "function") {
			jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
		}
		/* jshint ignore: end */

		// Populate the class2type map
		jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
			class2type["[object " + name + "]"] = name.toLowerCase();
		});

		function isArrayLike(obj) {

			// Support: iOS 8.2 (not reproducible in simulator)
			// `in` check used to prevent JIT error (gh-2145)
			// hasOwn isn't used here due to false negatives
			// regarding Nodelist length in IE
			var length = !!obj && "length" in obj && obj.length,
			    type = jQuery.type(obj);

			if (type === "function" || jQuery.isWindow(obj)) {
				return false;
			}

			return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
		}

		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (arr) {
		return arr.indexOf;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
		return [];
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (arr) {
		return arr.slice;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (arr) {
		return arr.concat;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (arr) {
		return arr.push;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
		return window.document;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

		// [[Class]] -> type pairs
		return {};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function (class2type) {
		return class2type.toString;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function (class2type) {
		return class2type.hasOwnProperty;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

		// All support tests are defined in their respective modules.
		return {};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		// Multifunctional method to get and set values of a collection
		// The value/s can optionally be executed if it's a function
		var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
			var i = 0,
			    len = elems.length,
			    bulk = key == null;

			// Sets many values
			if (jQuery.type(key) === "object") {
				chainable = true;
				for (i in key) {
					access(elems, fn, i, key[i], true, emptyGet, raw);
				}

				// Sets one value
			} else if (value !== undefined) {
				chainable = true;

				if (!jQuery.isFunction(value)) {
					raw = true;
				}

				if (bulk) {

					// Bulk operations run against the entire set
					if (raw) {
						fn.call(elems, value);
						fn = null;

						// ...except when executing function values
					} else {
						bulk = fn;
						fn = function fn(elem, key, value) {
							return bulk.call(jQuery(elem), value);
						};
					}
				}

				if (fn) {
					for (; i < len; i++) {
						fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
					}
				}
			}

			return chainable ? elems :

			// Gets
			bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
		};

		return access;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
		return (/^margin/
		);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(19)], __WEBPACK_AMD_DEFINE_RESULT__ = function (pnum) {

		return new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
		return (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
		);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(19)], __WEBPACK_AMD_DEFINE_RESULT__ = function (pnum) {
		return new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
		return ["Top", "Right", "Bottom", "Left"];
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(23)

	// css is assumed
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		return function (elem, el) {

			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
		};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(24)], __WEBPACK_AMD_DEFINE_RESULT__ = function () {}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(25)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, Sizzle) {

		jQuery.find = Sizzle;
		jQuery.expr = Sizzle.selectors;
		jQuery.expr[":"] = jQuery.expr.pseudos;
		jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
		jQuery.text = Sizzle.getText;
		jQuery.isXMLDoc = Sizzle.isXML;
		jQuery.contains = Sizzle.contains;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	/*!
	 * Sizzle CSS Selector Engine v2.2.1
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-10-17
	 */
	(function (window) {

		var i,
		    support,
		    Expr,
		    getText,
		    isXML,
		    tokenize,
		    compile,
		    select,
		    outermostContext,
		    sortInput,
		    hasDuplicate,


		// Local document vars
		setDocument,
		    document,
		    docElem,
		    documentIsHTML,
		    rbuggyQSA,
		    rbuggyMatches,
		    matches,
		    contains,


		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		    preferredDoc = window.document,
		    dirruns = 0,
		    done = 0,
		    classCache = createCache(),
		    tokenCache = createCache(),
		    compilerCache = createCache(),
		    sortOrder = function sortOrder(a, b) {
			if (a === b) {
				hasDuplicate = true;
			}
			return 0;
		},


		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,


		// Instance methods
		hasOwn = {}.hasOwnProperty,
		    arr = [],
		    pop = arr.pop,
		    push_native = arr.push,
		    push = arr.push,
		    slice = arr.slice,

		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function indexOf(list, elem) {
			var i = 0,
			    len = list.length;
			for (; i < len; i++) {
				if (list[i] === elem) {
					return i;
				}
			}
			return -1;
		},
		    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",


		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",


		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
		    pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" + ")\\)|)",


		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp(whitespace + "+", "g"),
		    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
		    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
		    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
		    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
		    rpseudo = new RegExp(pseudos),
		    ridentifier = new RegExp("^" + identifier + "$"),
		    matchExpr = {
			"ID": new RegExp("^#(" + identifier + ")"),
			"CLASS": new RegExp("^\\.(" + identifier + ")"),
			"TAG": new RegExp("^(" + identifier + "|[*])"),
			"ATTR": new RegExp("^" + attributes),
			"PSEUDO": new RegExp("^" + pseudos),
			"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
			"bool": new RegExp("^(?:" + booleans + ")$", "i"),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
		},
		    rinputs = /^(?:input|select|textarea|button)$/i,
		    rheader = /^h\d$/i,
		    rnative = /^[^{]+\{\s*\[native \w/,


		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		    rsibling = /[+~]/,
		    rescape = /'|\\/g,


		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
		    funescape = function funescape(_, escaped, escapedWhitespace) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ? escaped : high < 0 ?
			// BMP codepoint
			String.fromCharCode(high + 0x10000) :
			// Supplemental Plane codepoint (surrogate pair)
			String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
		},


		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function unloadHandler() {
			setDocument();
		};

		// Optimize for push.apply( _, NodeList )
		try {
			push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
			// Support: Android<4.0
			// Detect silently failing push.apply
			arr[preferredDoc.childNodes.length].nodeType;
		} catch (e) {
			push = { apply: arr.length ?

				// Leverage slice if possible
				function (target, els) {
					push_native.apply(target, slice.call(els));
				} :

				// Support: IE<9
				// Otherwise append directly
				function (target, els) {
					var j = target.length,
					    i = 0;
					// Can't trust NodeList.length
					while (target[j++] = els[i++]) {}
					target.length = j - 1;
				}
			};
		}

		function Sizzle(selector, context, results, seed) {
			var m,
			    i,
			    elem,
			    nid,
			    nidselect,
			    match,
			    groups,
			    newSelector,
			    newContext = context && context.ownerDocument,


			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

			results = results || [];

			// Return early from calls with invalid selector or context
			if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

				return results;
			}

			// Try to shortcut find operations (as opposed to filters) in HTML documents
			if (!seed) {

				if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
					setDocument(context);
				}
				context = context || document;

				if (documentIsHTML) {

					// If the selector is sufficiently simple, try using a "get*By*" DOM method
					// (excepting DocumentFragment context, where the methods don't exist)
					if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

						// ID selector
						if (m = match[1]) {

							// Document context
							if (nodeType === 9) {
								if (elem = context.getElementById(m)) {

									// Support: IE, Opera, Webkit
									// TODO: identify versions
									// getElementById can match elements by name instead of ID
									if (elem.id === m) {
										results.push(elem);
										return results;
									}
								} else {
									return results;
								}

								// Element context
							} else {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

									results.push(elem);
									return results;
								}
							}

							// Type selector
						} else if (match[2]) {
							push.apply(results, context.getElementsByTagName(selector));
							return results;

							// Class selector
						} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

							push.apply(results, context.getElementsByClassName(m));
							return results;
						}
					}

					// Take advantage of querySelectorAll
					if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {

						if (nodeType !== 1) {
							newContext = context;
							newSelector = selector;

							// qSA looks outside Element context, which is not what we want
							// Thanks to Andrew Dupont for this workaround technique
							// Support: IE <=8
							// Exclude object elements
						} else if (context.nodeName.toLowerCase() !== "object") {

							// Capture the context ID, setting it first if necessary
							if (nid = context.getAttribute("id")) {
								nid = nid.replace(rescape, "\\$&");
							} else {
								context.setAttribute("id", nid = expando);
							}

							// Prefix every selector in the list
							groups = tokenize(selector);
							i = groups.length;
							nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
							while (i--) {
								groups[i] = nidselect + " " + toSelector(groups[i]);
							}
							newSelector = groups.join(",");

							// Expand context for sibling selectors
							newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
						}

						if (newSelector) {
							try {
								push.apply(results, newContext.querySelectorAll(newSelector));
								return results;
							} catch (qsaError) {} finally {
								if (nid === expando) {
									context.removeAttribute("id");
								}
							}
						}
					}
				}
			}

			// All others
			return select(selector.replace(rtrim, "$1"), context, results, seed);
		}

		/**
	  * Create key-value caches of limited size
	  * @returns {function(string, object)} Returns the Object data after storing it on itself with
	  *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	  *	deleting the oldest entry
	  */
		function createCache() {
			var keys = [];

			function cache(key, value) {
				// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
				if (keys.push(key + " ") > Expr.cacheLength) {
					// Only keep the most recent entries
					delete cache[keys.shift()];
				}
				return cache[key + " "] = value;
			}
			return cache;
		}

		/**
	  * Mark a function for special use by Sizzle
	  * @param {Function} fn The function to mark
	  */
		function markFunction(fn) {
			fn[expando] = true;
			return fn;
		}

		/**
	  * Support testing using an element
	  * @param {Function} fn Passed the created div and expects a boolean result
	  */
		function assert(fn) {
			var div = document.createElement("div");

			try {
				return !!fn(div);
			} catch (e) {
				return false;
			} finally {
				// Remove from its parent by default
				if (div.parentNode) {
					div.parentNode.removeChild(div);
				}
				// release memory in IE
				div = null;
			}
		}

		/**
	  * Adds the same handler for all of the specified attrs
	  * @param {String} attrs Pipe-separated list of attributes
	  * @param {Function} handler The method that will be applied
	  */
		function addHandle(attrs, handler) {
			var arr = attrs.split("|"),
			    i = arr.length;

			while (i--) {
				Expr.attrHandle[arr[i]] = handler;
			}
		}

		/**
	  * Checks document order of two siblings
	  * @param {Element} a
	  * @param {Element} b
	  * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	  */
		function siblingCheck(a, b) {
			var cur = b && a,
			    diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);

			// Use IE sourceIndex if available on both nodes
			if (diff) {
				return diff;
			}

			// Check if b follows a
			if (cur) {
				while (cur = cur.nextSibling) {
					if (cur === b) {
						return -1;
					}
				}
			}

			return a ? 1 : -1;
		}

		/**
	  * Returns a function to use in pseudos for input types
	  * @param {String} type
	  */
		function createInputPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === type;
			};
		}

		/**
	  * Returns a function to use in pseudos for buttons
	  * @param {String} type
	  */
		function createButtonPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && elem.type === type;
			};
		}

		/**
	  * Returns a function to use in pseudos for positionals
	  * @param {Function} fn
	  */
		function createPositionalPseudo(fn) {
			return markFunction(function (argument) {
				argument = +argument;
				return markFunction(function (seed, matches) {
					var j,
					    matchIndexes = fn([], seed.length, argument),
					    i = matchIndexes.length;

					// Match elements found at the specified indexes
					while (i--) {
						if (seed[j = matchIndexes[i]]) {
							seed[j] = !(matches[j] = seed[j]);
						}
					}
				});
			});
		}

		/**
	  * Checks a node for validity as a Sizzle context
	  * @param {Element|Object=} context
	  * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	  */
		function testContext(context) {
			return context && typeof context.getElementsByTagName !== "undefined" && context;
		}

		// Expose support vars for convenience
		support = Sizzle.support = {};

		/**
	  * Detects XML nodes
	  * @param {Element|Object} elem An element or a document
	  * @returns {Boolean} True iff elem is a non-HTML XML node
	  */
		isXML = Sizzle.isXML = function (elem) {
			// documentElement is verified for cases where it doesn't yet exist
			// (such as loading iframes in IE - #4833)
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false;
		};

		/**
	  * Sets document-related variables once based on the current document
	  * @param {Element|Object} [doc] An element or document object to use to set the document
	  * @returns {Object} Returns the current document
	  */
		setDocument = Sizzle.setDocument = function (node) {
			var hasCompare,
			    parent,
			    doc = node ? node.ownerDocument || node : preferredDoc;

			// Return early if doc is invalid or already selected
			if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
				return document;
			}

			// Update global variables
			document = doc;
			docElem = document.documentElement;
			documentIsHTML = !isXML(document);

			// Support: IE 9-11, Edge
			// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
			if ((parent = document.defaultView) && parent.top !== parent) {
				// Support: IE 11
				if (parent.addEventListener) {
					parent.addEventListener("unload", unloadHandler, false);

					// Support: IE 9 - 10 only
				} else if (parent.attachEvent) {
					parent.attachEvent("onunload", unloadHandler);
				}
			}

			/* Attributes
	  ---------------------------------------------------------------------- */

			// Support: IE<8
			// Verify that getAttribute really returns attributes and not properties
			// (excepting IE8 booleans)
			support.attributes = assert(function (div) {
				div.className = "i";
				return !div.getAttribute("className");
			});

			/* getElement(s)By*
	  ---------------------------------------------------------------------- */

			// Check if getElementsByTagName("*") returns only elements
			support.getElementsByTagName = assert(function (div) {
				div.appendChild(document.createComment(""));
				return !div.getElementsByTagName("*").length;
			});

			// Support: IE<9
			support.getElementsByClassName = rnative.test(document.getElementsByClassName);

			// Support: IE<10
			// Check if getElementById returns elements by name
			// The broken getElementById methods don't pick up programatically-set names,
			// so use a roundabout getElementsByName test
			support.getById = assert(function (div) {
				docElem.appendChild(div).id = expando;
				return !document.getElementsByName || !document.getElementsByName(expando).length;
			});

			// ID find and filter
			if (support.getById) {
				Expr.find["ID"] = function (id, context) {
					if (typeof context.getElementById !== "undefined" && documentIsHTML) {
						var m = context.getElementById(id);
						return m ? [m] : [];
					}
				};
				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						return elem.getAttribute("id") === attrId;
					};
				};
			} else {
				// Support: IE6/7
				// getElementById is not reliable as a find shortcut
				delete Expr.find["ID"];

				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
						return node && node.value === attrId;
					};
				};
			}

			// Tag
			Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
				if (typeof context.getElementsByTagName !== "undefined") {
					return context.getElementsByTagName(tag);

					// DocumentFragment nodes don't have gEBTN
				} else if (support.qsa) {
					return context.querySelectorAll(tag);
				}
			} : function (tag, context) {
				var elem,
				    tmp = [],
				    i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName(tag);

				// Filter out possible comments
				if (tag === "*") {
					while (elem = results[i++]) {
						if (elem.nodeType === 1) {
							tmp.push(elem);
						}
					}

					return tmp;
				}
				return results;
			};

			// Class
			Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
				if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
					return context.getElementsByClassName(className);
				}
			};

			/* QSA/matchesSelector
	  ---------------------------------------------------------------------- */

			// QSA and matchesSelector support

			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			rbuggyMatches = [];

			// qSa(:focus) reports false when true (Chrome 21)
			// We allow this because of a bug in IE8/9 that throws an error
			// whenever `document.activeElement` is accessed on an iframe
			// So, we allow :focus to pass through QSA all the time to avoid the IE error
			// See http://bugs.jquery.com/ticket/13378
			rbuggyQSA = [];

			if (support.qsa = rnative.test(document.querySelectorAll)) {
				// Build QSA regex
				// Regex strategy adopted from Diego Perini
				assert(function (div) {
					// Select is set to empty string on purpose
					// This is to test IE's treatment of not explicitly
					// setting a boolean content attribute,
					// since its presence should be enough
					// http://bugs.jquery.com/ticket/12359
					docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

					// Support: IE8, Opera 11-12.16
					// Nothing should be selected when empty strings follow ^= or $= or *=
					// The test attribute must be unknown in Opera but "safe" for WinRT
					// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
					if (div.querySelectorAll("[msallowcapture^='']").length) {
						rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
					}

					// Support: IE8
					// Boolean attributes and "value" are not treated correctly
					if (!div.querySelectorAll("[selected]").length) {
						rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
					}

					// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
					if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
						rbuggyQSA.push("~=");
					}

					// Webkit/Opera - :checked should return selected option elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					// IE8 throws error here and will not see later tests
					if (!div.querySelectorAll(":checked").length) {
						rbuggyQSA.push(":checked");
					}

					// Support: Safari 8+, iOS 8+
					// https://bugs.webkit.org/show_bug.cgi?id=136851
					// In-page `selector#id sibing-combinator selector` fails
					if (!div.querySelectorAll("a#" + expando + "+*").length) {
						rbuggyQSA.push(".#.+[+~]");
					}
				});

				assert(function (div) {
					// Support: Windows 8 Native Apps
					// The type and name attributes are restricted during .innerHTML assignment
					var input = document.createElement("input");
					input.setAttribute("type", "hidden");
					div.appendChild(input).setAttribute("name", "D");

					// Support: IE8
					// Enforce case-sensitivity of name attribute
					if (div.querySelectorAll("[name=d]").length) {
						rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
					}

					// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
					// IE8 throws error here and will not see later tests
					if (!div.querySelectorAll(":enabled").length) {
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Opera 10-11 does not throw on post-comma invalid pseudos
					div.querySelectorAll("*,:x");
					rbuggyQSA.push(",.*:");
				});
			}

			if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

				assert(function (div) {
					// Check to see if it's possible to do matchesSelector
					// on a disconnected node (IE 9)
					support.disconnectedMatch = matches.call(div, "div");

					// This should fail with an exception
					// Gecko does not error, returns false instead
					matches.call(div, "[s!='']:x");
					rbuggyMatches.push("!=", pseudos);
				});
			}

			rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
			rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

			/* Contains
	  ---------------------------------------------------------------------- */
			hasCompare = rnative.test(docElem.compareDocumentPosition);

			// Element contains another
			// Purposefully self-exclusive
			// As in, an element does not contain itself
			contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
				    bup = b && b.parentNode;
				return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
			} : function (a, b) {
				if (b) {
					while (b = b.parentNode) {
						if (b === a) {
							return true;
						}
					}
				}
				return false;
			};

			/* Sorting
	  ---------------------------------------------------------------------- */

			// Document order sorting
			sortOrder = hasCompare ? function (a, b) {

				// Flag for duplicate removal
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				// Sort on method existence if only one input has compareDocumentPosition
				var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
				if (compare) {
					return compare;
				}

				// Calculate position if both inputs belong to the same document
				compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :

				// Otherwise we know they are disconnected
				1;

				// Disconnected nodes
				if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {

					// Choose the first element that is related to our preferred document
					if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
						return -1;
					}
					if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
						return 1;
					}

					// Maintain original order
					return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
				}

				return compare & 4 ? -1 : 1;
			} : function (a, b) {
				// Exit early if the nodes are identical
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				var cur,
				    i = 0,
				    aup = a.parentNode,
				    bup = b.parentNode,
				    ap = [a],
				    bp = [b];

				// Parentless nodes are either documents or disconnected
				if (!aup || !bup) {
					return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;

					// If the nodes are siblings, we can do a quick check
				} else if (aup === bup) {
					return siblingCheck(a, b);
				}

				// Otherwise we need full lists of their ancestors for comparison
				cur = a;
				while (cur = cur.parentNode) {
					ap.unshift(cur);
				}
				cur = b;
				while (cur = cur.parentNode) {
					bp.unshift(cur);
				}

				// Walk down the tree looking for a discrepancy
				while (ap[i] === bp[i]) {
					i++;
				}

				return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck(ap[i], bp[i]) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
			};

			return document;
		};

		Sizzle.matches = function (expr, elements) {
			return Sizzle(expr, null, null, elements);
		};

		Sizzle.matchesSelector = function (elem, expr) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			// Make sure that attribute selectors are quoted
			expr = expr.replace(rattributeQuotes, "='$1']");

			if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

				try {
					var ret = matches.call(elem, expr);

					// IE 9's matchesSelector returns false on disconnected nodes
					if (ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11) {
						return ret;
					}
				} catch (e) {}
			}

			return Sizzle(expr, document, null, [elem]).length > 0;
		};

		Sizzle.contains = function (context, elem) {
			// Set document vars if needed
			if ((context.ownerDocument || context) !== document) {
				setDocument(context);
			}
			return contains(context, elem);
		};

		Sizzle.attr = function (elem, name) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			var fn = Expr.attrHandle[name.toLowerCase()],

			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

			return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
		};

		Sizzle.error = function (msg) {
			throw new Error("Syntax error, unrecognized expression: " + msg);
		};

		/**
	  * Document sorting and removing duplicates
	  * @param {ArrayLike} results
	  */
		Sizzle.uniqueSort = function (results) {
			var elem,
			    duplicates = [],
			    j = 0,
			    i = 0;

			// Unless we *know* we can detect duplicates, assume their presence
			hasDuplicate = !support.detectDuplicates;
			sortInput = !support.sortStable && results.slice(0);
			results.sort(sortOrder);

			if (hasDuplicate) {
				while (elem = results[i++]) {
					if (elem === results[i]) {
						j = duplicates.push(i);
					}
				}
				while (j--) {
					results.splice(duplicates[j], 1);
				}
			}

			// Clear input after sorting to release objects
			// See https://github.com/jquery/sizzle/pull/225
			sortInput = null;

			return results;
		};

		/**
	  * Utility function for retrieving the text value of an array of DOM nodes
	  * @param {Array|Element} elem
	  */
		getText = Sizzle.getText = function (elem) {
			var node,
			    ret = "",
			    i = 0,
			    nodeType = elem.nodeType;

			if (!nodeType) {
				// If no nodeType, this is expected to be an array
				while (node = elem[i++]) {
					// Do not traverse comment nodes
					ret += getText(node);
				}
			} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
				// Use textContent for elements
				// innerText usage removed for consistency of new lines (jQuery #11153)
				if (typeof elem.textContent === "string") {
					return elem.textContent;
				} else {
					// Traverse its children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						ret += getText(elem);
					}
				}
			} else if (nodeType === 3 || nodeType === 4) {
				return elem.nodeValue;
			}
			// Do not include comment or processing instruction nodes

			return ret;
		};

		Expr = Sizzle.selectors = {

			// Can be adjusted by the user
			cacheLength: 50,

			createPseudo: markFunction,

			match: matchExpr,

			attrHandle: {},

			find: {},

			relative: {
				">": { dir: "parentNode", first: true },
				" ": { dir: "parentNode" },
				"+": { dir: "previousSibling", first: true },
				"~": { dir: "previousSibling" }
			},

			preFilter: {
				"ATTR": function ATTR(match) {
					match[1] = match[1].replace(runescape, funescape);

					// Move the given value to match[3] whether quoted or unquoted
					match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

					if (match[2] === "~=") {
						match[3] = " " + match[3] + " ";
					}

					return match.slice(0, 4);
				},

				"CHILD": function CHILD(match) {
					/* matches from matchExpr["CHILD"]
	    	1 type (only|nth|...)
	    	2 what (child|of-type)
	    	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
	    	4 xn-component of xn+y argument ([+-]?\d*n|)
	    	5 sign of xn-component
	    	6 x of xn-component
	    	7 sign of y-component
	    	8 y of y-component
	    */
					match[1] = match[1].toLowerCase();

					if (match[1].slice(0, 3) === "nth") {
						// nth-* requires argument
						if (!match[3]) {
							Sizzle.error(match[0]);
						}

						// numeric x and y parameters for Expr.filter.CHILD
						// remember that false/true cast respectively to 0/1
						match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
						match[5] = +(match[7] + match[8] || match[3] === "odd");

						// other types prohibit arguments
					} else if (match[3]) {
						Sizzle.error(match[0]);
					}

					return match;
				},

				"PSEUDO": function PSEUDO(match) {
					var excess,
					    unquoted = !match[6] && match[2];

					if (matchExpr["CHILD"].test(match[0])) {
						return null;
					}

					// Accept quoted arguments as-is
					if (match[3]) {
						match[2] = match[4] || match[5] || "";

						// Strip excess characters from unquoted arguments
					} else if (unquoted && rpseudo.test(unquoted) && (
					// Get excess from tokenize (recursively)
					excess = tokenize(unquoted, true)) && (
					// advance to the next closing parenthesis
					excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

						// excess is a negative index
						match[0] = match[0].slice(0, excess);
						match[2] = unquoted.slice(0, excess);
					}

					// Return only captures needed by the pseudo filter method (type and argument)
					return match.slice(0, 3);
				}
			},

			filter: {

				"TAG": function TAG(nodeNameSelector) {
					var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
					return nodeNameSelector === "*" ? function () {
						return true;
					} : function (elem) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
				},

				"CLASS": function CLASS(className) {
					var pattern = classCache[className + " "];

					return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
						return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
					});
				},

				"ATTR": function ATTR(name, operator, check) {
					return function (elem) {
						var result = Sizzle.attr(elem, name);

						if (result == null) {
							return operator === "!=";
						}
						if (!operator) {
							return true;
						}

						result += "";

						return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
					};
				},

				"CHILD": function CHILD(type, what, argument, first, last) {
					var simple = type.slice(0, 3) !== "nth",
					    forward = type.slice(-4) !== "last",
					    ofType = what === "of-type";

					return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function (elem) {
						return !!elem.parentNode;
					} : function (elem, context, xml) {
						var cache,
						    uniqueCache,
						    outerCache,
						    node,
						    nodeIndex,
						    start,
						    dir = simple !== forward ? "nextSibling" : "previousSibling",
						    parent = elem.parentNode,
						    name = ofType && elem.nodeName.toLowerCase(),
						    useCache = !xml && !ofType,
						    diff = false;

						if (parent) {

							// :(first|last|only)-(child|of-type)
							if (simple) {
								while (dir) {
									node = elem;
									while (node = node[dir]) {
										if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [forward ? parent.firstChild : parent.lastChild];

							// non-xml :nth-child(...) stores cache data on `parent`
							if (forward && useCache) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[expando] || (node[expando] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

								cache = uniqueCache[type] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = nodeIndex && cache[2];
								node = nodeIndex && parent.childNodes[nodeIndex];

								while (node = ++nodeIndex && node && node[dir] || (

								// Fallback to seeking `elem` from the start
								diff = nodeIndex = 0) || start.pop()) {

									// When found, cache indexes on `parent` and break
									if (node.nodeType === 1 && ++diff && node === elem) {
										uniqueCache[type] = [dirruns, nodeIndex, diff];
										break;
									}
								}
							} else {
								// Use previously-cached element index if available
								if (useCache) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[expando] || (node[expando] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

									cache = uniqueCache[type] || [];
									nodeIndex = cache[0] === dirruns && cache[1];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if (diff === false) {
									// Use the same loop as above to seek `elem` from the start
									while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

										if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {

											// Cache the index of each encountered element
											if (useCache) {
												outerCache = node[expando] || (node[expando] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

												uniqueCache[type] = [dirruns, diff];
											}

											if (node === elem) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || diff % first === 0 && diff / first >= 0;
						}
					};
				},

				"PSEUDO": function PSEUDO(pseudo, argument) {
					// pseudo-class names are case-insensitive
					// http://www.w3.org/TR/selectors/#pseudo-classes
					// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
					// Remember that setFilters inherits from pseudos
					var args,
					    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

					// The user may use createPseudo to indicate that
					// arguments are needed to create the filter function
					// just as Sizzle does
					if (fn[expando]) {
						return fn(argument);
					}

					// But maintain support for old signatures
					if (fn.length > 1) {
						args = [pseudo, pseudo, "", argument];
						return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
							var idx,
							    matched = fn(seed, argument),
							    i = matched.length;
							while (i--) {
								idx = indexOf(seed, matched[i]);
								seed[idx] = !(matches[idx] = matched[i]);
							}
						}) : function (elem) {
							return fn(elem, 0, args);
						};
					}

					return fn;
				}
			},

			pseudos: {
				// Potentially complex pseudos
				"not": markFunction(function (selector) {
					// Trim the selector passed to compile
					// to avoid treating leading and trailing
					// spaces as combinators
					var input = [],
					    results = [],
					    matcher = compile(selector.replace(rtrim, "$1"));

					return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
						var elem,
						    unmatched = matcher(seed, null, xml, []),
						    i = seed.length;

						// Match elements unmatched by `matcher`
						while (i--) {
							if (elem = unmatched[i]) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) : function (elem, context, xml) {
						input[0] = elem;
						matcher(input, null, xml, results);
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
				}),

				"has": markFunction(function (selector) {
					return function (elem) {
						return Sizzle(selector, elem).length > 0;
					};
				}),

				"contains": markFunction(function (text) {
					text = text.replace(runescape, funescape);
					return function (elem) {
						return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
					};
				}),

				// "Whether an element is represented by a :lang() selector
				// is based solely on the element's language value
				// being equal to the identifier C,
				// or beginning with the identifier C immediately followed by "-".
				// The matching of C against the element's language value is performed case-insensitively.
				// The identifier C does not have to be a valid language name."
				// http://www.w3.org/TR/selectors/#lang-pseudo
				"lang": markFunction(function (lang) {
					// lang value must be a valid identifier
					if (!ridentifier.test(lang || "")) {
						Sizzle.error("unsupported lang: " + lang);
					}
					lang = lang.replace(runescape, funescape).toLowerCase();
					return function (elem) {
						var elemLang;
						do {
							if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
							}
						} while ((elem = elem.parentNode) && elem.nodeType === 1);
						return false;
					};
				}),

				// Miscellaneous
				"target": function target(elem) {
					var hash = window.location && window.location.hash;
					return hash && hash.slice(1) === elem.id;
				},

				"root": function root(elem) {
					return elem === docElem;
				},

				"focus": function focus(elem) {
					return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
				},

				// Boolean properties
				"enabled": function enabled(elem) {
					return elem.disabled === false;
				},

				"disabled": function disabled(elem) {
					return elem.disabled === true;
				},

				"checked": function checked(elem) {
					// In CSS3, :checked should return both checked and selected elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					var nodeName = elem.nodeName.toLowerCase();
					return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
				},

				"selected": function selected(elem) {
					// Accessing this property makes selected-by-default
					// options in Safari work properly
					if (elem.parentNode) {
						elem.parentNode.selectedIndex;
					}

					return elem.selected === true;
				},

				// Contents
				"empty": function empty(elem) {
					// http://www.w3.org/TR/selectors/#empty-pseudo
					// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
					//   but not by others (comment: 8; processing instruction: 7; etc.)
					// nodeType < 6 works because attributes (2) do not appear as children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						if (elem.nodeType < 6) {
							return false;
						}
					}
					return true;
				},

				"parent": function parent(elem) {
					return !Expr.pseudos["empty"](elem);
				},

				// Element/input types
				"header": function header(elem) {
					return rheader.test(elem.nodeName);
				},

				"input": function input(elem) {
					return rinputs.test(elem.nodeName);
				},

				"button": function button(elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === "button" || name === "button";
				},

				"text": function text(elem) {
					var attr;
					return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && (

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					(attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
				},

				// Position-in-collection
				"first": createPositionalPseudo(function () {
					return [0];
				}),

				"last": createPositionalPseudo(function (matchIndexes, length) {
					return [length - 1];
				}),

				"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
					return [argument < 0 ? argument + length : argument];
				}),

				"even": createPositionalPseudo(function (matchIndexes, length) {
					var i = 0;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"odd": createPositionalPseudo(function (matchIndexes, length) {
					var i = 1;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; --i >= 0;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; ++i < length;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				})
			}
		};

		Expr.pseudos["nth"] = Expr.pseudos["eq"];

		// Add button/input type pseudos
		for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
			Expr.pseudos[i] = createInputPseudo(i);
		}
		for (i in { submit: true, reset: true }) {
			Expr.pseudos[i] = createButtonPseudo(i);
		}

		// Easy API for creating new setFilters
		function setFilters() {}
		setFilters.prototype = Expr.filters = Expr.pseudos;
		Expr.setFilters = new setFilters();

		tokenize = Sizzle.tokenize = function (selector, parseOnly) {
			var matched,
			    match,
			    tokens,
			    type,
			    soFar,
			    groups,
			    preFilters,
			    cached = tokenCache[selector + " "];

			if (cached) {
				return parseOnly ? 0 : cached.slice(0);
			}

			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;

			while (soFar) {

				// Comma and first run
				if (!matched || (match = rcomma.exec(soFar))) {
					if (match) {
						// Don't consume trailing commas as valid
						soFar = soFar.slice(match[0].length) || soFar;
					}
					groups.push(tokens = []);
				}

				matched = false;

				// Combinators
				if (match = rcombinators.exec(soFar)) {
					matched = match.shift();
					tokens.push({
						value: matched,
						// Cast descendant combinators to space
						type: match[0].replace(rtrim, " ")
					});
					soFar = soFar.slice(matched.length);
				}

				// Filters
				for (type in Expr.filter) {
					if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice(matched.length);
					}
				}

				if (!matched) {
					break;
				}
			}

			// Return the length of the invalid excess
			// if we're just parsing
			// Otherwise, throw an error or return tokens
			return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :
			// Cache the tokens
			tokenCache(selector, groups).slice(0);
		};

		function toSelector(tokens) {
			var i = 0,
			    len = tokens.length,
			    selector = "";
			for (; i < len; i++) {
				selector += tokens[i].value;
			}
			return selector;
		}

		function addCombinator(matcher, combinator, base) {
			var dir = combinator.dir,
			    checkNonElements = base && dir === "parentNode",
			    doneName = done++;

			return combinator.first ?
			// Check against closest ancestor/preceding element
			function (elem, context, xml) {
				while (elem = elem[dir]) {
					if (elem.nodeType === 1 || checkNonElements) {
						return matcher(elem, context, xml);
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function (elem, context, xml) {
				var oldCache,
				    uniqueCache,
				    outerCache,
				    newCache = [dirruns, doneName];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if (xml) {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							if (matcher(elem, context, xml)) {
								return true;
							}
						}
					}
				} else {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							outerCache = elem[expando] || (elem[expando] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

							if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {

								// Assign to newCache so results back-propagate to previous elements
								return newCache[2] = oldCache[2];
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[dir] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if (newCache[2] = matcher(elem, context, xml)) {
									return true;
								}
							}
						}
					}
				}
			};
		}

		function elementMatcher(matchers) {
			return matchers.length > 1 ? function (elem, context, xml) {
				var i = matchers.length;
				while (i--) {
					if (!matchers[i](elem, context, xml)) {
						return false;
					}
				}
				return true;
			} : matchers[0];
		}

		function multipleContexts(selector, contexts, results) {
			var i = 0,
			    len = contexts.length;
			for (; i < len; i++) {
				Sizzle(selector, contexts[i], results);
			}
			return results;
		}

		function condense(unmatched, map, filter, context, xml) {
			var elem,
			    newUnmatched = [],
			    i = 0,
			    len = unmatched.length,
			    mapped = map != null;

			for (; i < len; i++) {
				if (elem = unmatched[i]) {
					if (!filter || filter(elem, context, xml)) {
						newUnmatched.push(elem);
						if (mapped) {
							map.push(i);
						}
					}
				}
			}

			return newUnmatched;
		}

		function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
			if (postFilter && !postFilter[expando]) {
				postFilter = setMatcher(postFilter);
			}
			if (postFinder && !postFinder[expando]) {
				postFinder = setMatcher(postFinder, postSelector);
			}
			return markFunction(function (seed, results, context, xml) {
				var temp,
				    i,
				    elem,
				    preMap = [],
				    postMap = [],
				    preexisting = results.length,


				// Get initial elements from seed or context
				elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),


				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
				    matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || (seed ? preFilter : preexisting || postFilter) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results : matcherIn;

				// Find primary matches
				if (matcher) {
					matcher(matcherIn, matcherOut, context, xml);
				}

				// Apply postFilter
				if (postFilter) {
					temp = condense(matcherOut, postMap);
					postFilter(temp, [], context, xml);

					// Un-match failing elements by moving them back to matcherIn
					i = temp.length;
					while (i--) {
						if (elem = temp[i]) {
							matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
						}
					}
				}

				if (seed) {
					if (postFinder || preFilter) {
						if (postFinder) {
							// Get the final matcherOut by condensing this intermediate into postFinder contexts
							temp = [];
							i = matcherOut.length;
							while (i--) {
								if (elem = matcherOut[i]) {
									// Restore matcherIn since elem is not yet a final match
									temp.push(matcherIn[i] = elem);
								}
							}
							postFinder(null, matcherOut = [], temp, xml);
						}

						// Move matched elements from seed to results to keep them synchronized
						i = matcherOut.length;
						while (i--) {
							if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

								seed[temp] = !(results[temp] = elem);
							}
						}
					}

					// Add elements to results, through postFinder if defined
				} else {
					matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
					if (postFinder) {
						postFinder(null, results, matcherOut, xml);
					} else {
						push.apply(results, matcherOut);
					}
				}
			});
		}

		function matcherFromTokens(tokens) {
			var checkContext,
			    matcher,
			    j,
			    len = tokens.length,
			    leadingRelative = Expr.relative[tokens[0].type],
			    implicitRelative = leadingRelative || Expr.relative[" "],
			    i = leadingRelative ? 1 : 0,


			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator(function (elem) {
				return elem === checkContext;
			}, implicitRelative, true),
			    matchAnyContext = addCombinator(function (elem) {
				return indexOf(checkContext, elem) > -1;
			}, implicitRelative, true),
			    matchers = [function (elem, context, xml) {
				var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			}];

			for (; i < len; i++) {
				if (matcher = Expr.relative[tokens[i].type]) {
					matchers = [addCombinator(elementMatcher(matchers), matcher)];
				} else {
					matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

					// Return special upon seeing a positional matcher
					if (matcher[expando]) {
						// Find the next relative operator (if any) for proper handling
						j = ++i;
						for (; j < len; j++) {
							if (Expr.relative[tokens[j].type]) {
								break;
							}
						}
						return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
					}
					matchers.push(matcher);
				}
			}

			return elementMatcher(matchers);
		}

		function matcherFromGroupMatchers(elementMatchers, setMatchers) {
			var bySet = setMatchers.length > 0,
			    byElement = elementMatchers.length > 0,
			    superMatcher = function superMatcher(seed, context, xml, results, outermost) {
				var elem,
				    j,
				    matcher,
				    matchedCount = 0,
				    i = "0",
				    unmatched = seed && [],
				    setMatched = [],
				    contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]("*", outermost),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
				    len = elems.length;

				if (outermost) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for (; i !== len && (elem = elems[i]) != null; i++) {
					if (byElement && elem) {
						j = 0;
						if (!context && elem.ownerDocument !== document) {
							setDocument(elem);
							xml = !documentIsHTML;
						}
						while (matcher = elementMatchers[j++]) {
							if (matcher(elem, context || document, xml)) {
								results.push(elem);
								break;
							}
						}
						if (outermost) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if (bySet) {
						// They will have gone through all possible matchers
						if (elem = !matcher && elem) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if (seed) {
							unmatched.push(elem);
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if (bySet && i !== matchedCount) {
					j = 0;
					while (matcher = setMatchers[j++]) {
						matcher(unmatched, setMatched, context, xml);
					}

					if (seed) {
						// Reintegrate element matches to eliminate the need for sorting
						if (matchedCount > 0) {
							while (i--) {
								if (!(unmatched[i] || setMatched[i])) {
									setMatched[i] = pop.call(results);
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense(setMatched);
					}

					// Add matches to results
					push.apply(results, setMatched);

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

						Sizzle.uniqueSort(results);
					}
				}

				// Override manipulation of globals by nested matchers
				if (outermost) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

			return bySet ? markFunction(superMatcher) : superMatcher;
		}

		compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
			var i,
			    setMatchers = [],
			    elementMatchers = [],
			    cached = compilerCache[selector + " "];

			if (!cached) {
				// Generate a function of recursive functions that can be used to check each element
				if (!match) {
					match = tokenize(selector);
				}
				i = match.length;
				while (i--) {
					cached = matcherFromTokens(match[i]);
					if (cached[expando]) {
						setMatchers.push(cached);
					} else {
						elementMatchers.push(cached);
					}
				}

				// Cache the compiled function
				cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

				// Save selector and tokenization
				cached.selector = selector;
			}
			return cached;
		};

		/**
	  * A low-level selection function that works with Sizzle's compiled
	  *  selector functions
	  * @param {String|Function} selector A selector or a pre-compiled
	  *  selector function built with Sizzle.compile
	  * @param {Element} context
	  * @param {Array} [results]
	  * @param {Array} [seed] A set of elements to match against
	  */
		select = Sizzle.select = function (selector, context, results, seed) {
			var i,
			    tokens,
			    token,
			    type,
			    find,
			    compiled = typeof selector === "function" && selector,
			    match = !seed && tokenize(selector = compiled.selector || selector);

			results = results || [];

			// Try to minimize operations if there is only one selector in the list and no seed
			// (the latter of which guarantees us context)
			if (match.length === 1) {

				// Reduce context if the leading compound selector is an ID
				tokens = match[0] = match[0].slice(0);
				if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

					context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
					if (!context) {
						return results;

						// Precompiled matchers will still verify ancestry, so step up a level
					} else if (compiled) {
						context = context.parentNode;
					}

					selector = selector.slice(tokens.shift().value.length);
				}

				// Fetch a seed set for right-to-left matching
				i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
				while (i--) {
					token = tokens[i];

					// Abort if we hit a combinator
					if (Expr.relative[type = token.type]) {
						break;
					}
					if (find = Expr.find[type]) {
						// Search, expanding context for leading sibling combinators
						if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {

							// If seed is empty or no tokens remain, we can return early
							tokens.splice(i, 1);
							selector = seed.length && toSelector(tokens);
							if (!selector) {
								push.apply(results, seed);
								return results;
							}

							break;
						}
					}
				}
			}

			// Compile and execute a filtering function if one is not provided
			// Provide `match` to avoid retokenization if we modified the selector above
			(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
			return results;
		};

		// One-time assignments

		// Sort stability
		support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

		// Support: Chrome 14-35+
		// Always assume duplicates if they aren't passed to the comparison function
		support.detectDuplicates = !!hasDuplicate;

		// Initialize against the default document
		setDocument();

		// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
		// Detached nodes confoundingly follow *each other*
		support.sortDetached = assert(function (div1) {
			// Should return 1, but returns 4 (following)
			return div1.compareDocumentPosition(document.createElement("div")) & 1;
		});

		// Support: IE<8
		// Prevent attribute/property "interpolation"
		// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
		if (!assert(function (div) {
			div.innerHTML = "<a href='#'></a>";
			return div.firstChild.getAttribute("href") === "#";
		})) {
			addHandle("type|href|height|width", function (elem, name, isXML) {
				if (!isXML) {
					return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
				}
			});
		}

		// Support: IE<9
		// Use defaultValue in place of getAttribute("value")
		if (!support.attributes || !assert(function (div) {
			div.innerHTML = "<input/>";
			div.firstChild.setAttribute("value", "");
			return div.firstChild.getAttribute("value") === "";
		})) {
			addHandle("value", function (elem, name, isXML) {
				if (!isXML && elem.nodeName.toLowerCase() === "input") {
					return elem.defaultValue;
				}
			});
		}

		// Support: IE<9
		// Use getAttributeNode to fetch booleans when getAttribute lies
		if (!assert(function (div) {
			return div.getAttribute("disabled") == null;
		})) {
			addHandle(booleans, function (elem, name, isXML) {
				var val;
				if (!isXML) {
					return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
				}
			});
		}

		// EXPOSE
		if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return Sizzle;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			// Sizzle requires that there be a global window in Common-JS like environments
		} else if (typeof module !== "undefined" && module.exports) {
			module.exports = Sizzle;
		} else {
			window.Sizzle = Sizzle;
		}
		// EXPOSE
	})(window);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
		return function (elem) {

			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if (!view || !view.opener) {
				view = window;
			}

			return view.getComputedStyle(elem);
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(20), __webpack_require__(17), __webpack_require__(26), __webpack_require__(28), __webpack_require__(23) // Get jQuery.contains
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, rnumnonpx, rmargin, getStyles, support) {

		function curCSS(elem, name, computed) {
			var width,
			    minWidth,
			    maxWidth,
			    ret,
			    style = elem.style;

			computed = computed || getStyles(elem);
			ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;

			// Support: Opera 12.1x only
			// Fall back to style even without computed
			// computed is undefined for elems on document fragments
			if ((ret === "" || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
				ret = jQuery.style(elem, name);
			}

			// Support: IE9
			// getPropertyValue is only needed for .css('filter') (#12537)
			if (computed) {

				// A tribute to the "awesome hack by Dean Edwards"
				// Android Browser returns percentage for some values,
				// but width seems to be reliably pixels.
				// This is against the CSSOM draft spec:
				// http://dev.w3.org/csswg/cssom/#resolved-values
				if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

					// Remember the original values
					width = style.width;
					minWidth = style.minWidth;
					maxWidth = style.maxWidth;

					// Put in the new values to get a computed value out
					style.minWidth = style.maxWidth = style.width = ret;
					ret = computed.width;

					// Revert the changed values
					style.width = width;
					style.minWidth = minWidth;
					style.maxWidth = maxWidth;
				}
			}

			return ret !== undefined ?

			// Support: IE9-11+
			// IE returns zIndex value as an integer.
			ret + "" : ret;
		}

		return curCSS;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(11), __webpack_require__(29), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, document, documentElement, support) {

		(function () {
			var pixelPositionVal,
			    boxSizingReliableVal,
			    pixelMarginRightVal,
			    reliableMarginLeftVal,
			    container = document.createElement("div"),
			    div = document.createElement("div");

			// Finish early in limited (non-browser) environments
			if (!div.style) {
				return;
			}

			// Support: IE9-11+
			// Style of cloned element affects source element cloned (#8908)
			div.style.backgroundClip = "content-box";
			div.cloneNode(true).style.backgroundClip = "";
			support.clearCloneStyle = div.style.backgroundClip === "content-box";

			container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
			container.appendChild(div);

			// Executing both pixelPosition & boxSizingReliable tests require only one layout
			// so they're executed at the same time to save the second computation.
			function computeStyleTests() {
				div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
				div.innerHTML = "";
				documentElement.appendChild(container);

				var divStyle = window.getComputedStyle(div);
				pixelPositionVal = divStyle.top !== "1%";
				reliableMarginLeftVal = divStyle.marginLeft === "2px";
				boxSizingReliableVal = divStyle.width === "4px";

				// Support: Android 4.0 - 4.3 only
				// Some styles come back with percentage values, even though they shouldn't
				div.style.marginRight = "50%";
				pixelMarginRightVal = divStyle.marginRight === "4px";

				documentElement.removeChild(container);
			}

			jQuery.extend(support, {
				pixelPosition: function pixelPosition() {

					// This test is executed only once but we still do memoizing
					// since we can use the boxSizingReliable pre-computing.
					// No need to check if the test was already performed, though.
					computeStyleTests();
					return pixelPositionVal;
				},
				boxSizingReliable: function boxSizingReliable() {
					if (boxSizingReliableVal == null) {
						computeStyleTests();
					}
					return boxSizingReliableVal;
				},
				pixelMarginRight: function pixelMarginRight() {

					// Support: Android 4.0-4.3
					// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
					// since that compresses better and they're computed together anyway.
					if (boxSizingReliableVal == null) {
						computeStyleTests();
					}
					return pixelMarginRightVal;
				},
				reliableMarginLeft: function reliableMarginLeft() {

					// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
					if (boxSizingReliableVal == null) {
						computeStyleTests();
					}
					return reliableMarginLeftVal;
				},
				reliableMarginRight: function reliableMarginRight() {

					// Support: Android 2.3
					// Check if div with explicit width and no margin-right incorrectly
					// gets computed margin-right based on width of container. (#3333)
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// This support function is only executed once so no memoizing is needed.
					var ret,
					    marginDiv = div.appendChild(document.createElement("div"));

					// Reset CSS: box-sizing; display; margin; border; padding
					marginDiv.style.cssText = div.style.cssText =

					// Support: Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;box-sizing:content-box;" + "display:block;margin:0;border:0;padding:0";
					marginDiv.style.marginRight = marginDiv.style.width = "0";
					div.style.width = "1px";
					documentElement.appendChild(container);

					ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);

					documentElement.removeChild(container);
					div.removeChild(marginDiv);

					return ret;
				}
			});
		})();

		return support;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (document) {
		return document.documentElement;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(18)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, rcssNum) {

		function adjustCSS(elem, prop, valueParts, tween) {
			var adjusted,
			    scale = 1,
			    maxIterations = 20,
			    currentValue = tween ? function () {
				return tween.cur();
			} : function () {
				return jQuery.css(elem, prop, "");
			},
			    initial = currentValue(),
			    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),


			// Starting value computation is required for potential unit mismatches
			initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

			if (initialInUnit && initialInUnit[3] !== unit) {

				// Trust units reported by jQuery.css
				unit = unit || initialInUnit[3];

				// Make sure we update the tween properties later on
				valueParts = valueParts || [];

				// Iteratively approximate from a nonzero starting point
				initialInUnit = +initial || 1;

				do {

					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					initialInUnit = initialInUnit / scale;
					jQuery.style(elem, prop, initialInUnit + unit);

					// Update scale, tolerating zero or NaN from tween.cur()
					// Break the loop if scale is unchanged or perfect, or if we've just had enough.
				} while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
			}

			if (valueParts) {
				initialInUnit = +initialInUnit || +initial || 0;

				// Apply relative offset (+=/-=) if specified
				adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
				if (tween) {
					tween.unit = unit;
					tween.start = initialInUnit;
					tween.end = adjusted;
				}
			}
			return adjusted;
		}

		return adjustCSS;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(11), __webpack_require__(32) // appendTo
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, document) {

		var iframe,
		    elemdisplay = {

			// Support: Firefox
			// We have to pre-define these values for FF (#10227)
			HTML: "block",
			BODY: "block"
		};

		/**
	  * Retrieve the actual display of a element
	  * @param {String} name nodeName of the element
	  * @param {Object} doc Document object
	  */

		// Called only from within defaultDisplay
		function actualDisplay(name, doc) {
			var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
			    display = jQuery.css(elem[0], "display");

			// We don't have any data stored on the element,
			// so use "detach" method as fast way to get rid of the element
			elem.detach();

			return display;
		}

		/**
	  * Try to determine the default display value of an element
	  * @param {String} nodeName
	  */
		function defaultDisplay(nodeName) {
			var doc = document,
			    display = elemdisplay[nodeName];

			if (!display) {
				display = actualDisplay(nodeName, doc);

				// If the simple way fails, read from inside an iframe
				if (display === "none" || !display) {

					// Use the already-created iframe if possible
					iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);

					// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
					doc = iframe[0].contentDocument;

					// Support: IE
					doc.write();
					doc.close();

					display = actualDisplay(nodeName, doc);
					iframe.detach();
				}

				// Store the correct default display
				elemdisplay[nodeName] = display;
			}

			return display;
		}

		return defaultDisplay;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(9), __webpack_require__(10), __webpack_require__(16), __webpack_require__(43), __webpack_require__(34), __webpack_require__(35), __webpack_require__(36), __webpack_require__(37), __webpack_require__(38), __webpack_require__(33), __webpack_require__(44), __webpack_require__(39), __webpack_require__(45), __webpack_require__(42), __webpack_require__(46), __webpack_require__(50), __webpack_require__(23), __webpack_require__(53)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, concat, push, access, rcheckableType, rtagName, rscriptType, wrapMap, getAll, setGlobalEval, buildFragment, support, dataPriv, dataUser, acceptData) {

		var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,


		// Support: IE 10-11, Edge 10240+
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,


		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		    rscriptTypeMasked = /^true\/(.*)/,
		    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

		// Manipulating tables requires a tbody
		function manipulationTarget(elem, content) {
			return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
		}

		// Replace/restore the type attribute of script elements for safe DOM manipulation
		function disableScript(elem) {
			elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
			return elem;
		}
		function restoreScript(elem) {
			var match = rscriptTypeMasked.exec(elem.type);

			if (match) {
				elem.type = match[1];
			} else {
				elem.removeAttribute("type");
			}

			return elem;
		}

		function cloneCopyEvent(src, dest) {
			var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

			if (dest.nodeType !== 1) {
				return;
			}

			// 1. Copy private data: events, handlers, etc.
			if (dataPriv.hasData(src)) {
				pdataOld = dataPriv.access(src);
				pdataCur = dataPriv.set(dest, pdataOld);
				events = pdataOld.events;

				if (events) {
					delete pdataCur.handle;
					pdataCur.events = {};

					for (type in events) {
						for (i = 0, l = events[type].length; i < l; i++) {
							jQuery.event.add(dest, type, events[type][i]);
						}
					}
				}
			}

			// 2. Copy user data
			if (dataUser.hasData(src)) {
				udataOld = dataUser.access(src);
				udataCur = jQuery.extend({}, udataOld);

				dataUser.set(dest, udataCur);
			}
		}

		// Fix IE bugs, see support tests
		function fixInput(src, dest) {
			var nodeName = dest.nodeName.toLowerCase();

			// Fails to persist the checked state of a cloned checkbox or radio button.
			if (nodeName === "input" && rcheckableType.test(src.type)) {
				dest.checked = src.checked;

				// Fails to return the selected option to the default selected state when cloning options
			} else if (nodeName === "input" || nodeName === "textarea") {
				dest.defaultValue = src.defaultValue;
			}
		}

		function domManip(collection, args, callback, ignored) {

			// Flatten any nested arrays
			args = concat.apply([], args);

			var fragment,
			    first,
			    scripts,
			    hasScripts,
			    node,
			    doc,
			    i = 0,
			    l = collection.length,
			    iNoClone = l - 1,
			    value = args[0],
			    isFunction = jQuery.isFunction(value);

			// We can't cloneNode fragments that contain checked, in WebKit
			if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
				return collection.each(function (index) {
					var self = collection.eq(index);
					if (isFunction) {
						args[0] = value.call(this, index, self.html());
					}
					domManip(self, args, callback, ignored);
				});
			}

			if (l) {
				fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
				first = fragment.firstChild;

				if (fragment.childNodes.length === 1) {
					fragment = first;
				}

				// Require either new content or an interest in ignored elements to invoke the callback
				if (first || ignored) {
					scripts = jQuery.map(getAll(fragment, "script"), disableScript);
					hasScripts = scripts.length;

					// Use the original fragment for the last item
					// instead of the first because it can end up
					// being emptied incorrectly in certain situations (#8070).
					for (; i < l; i++) {
						node = fragment;

						if (i !== iNoClone) {
							node = jQuery.clone(node, true, true);

							// Keep references to cloned scripts for later restoration
							if (hasScripts) {

								// Support: Android<4.1, PhantomJS<2
								// push.apply(_, arraylike) throws on ancient WebKit
								jQuery.merge(scripts, getAll(node, "script"));
							}
						}

						callback.call(collection[i], node, i);
					}

					if (hasScripts) {
						doc = scripts[scripts.length - 1].ownerDocument;

						// Reenable scripts
						jQuery.map(scripts, restoreScript);

						// Evaluate executable scripts on first document insertion
						for (i = 0; i < hasScripts; i++) {
							node = scripts[i];
							if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {

								if (node.src) {

									// Optional AJAX dependency, but won't run scripts if not present
									if (jQuery._evalUrl) {
										jQuery._evalUrl(node.src);
									}
								} else {
									jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
								}
							}
						}
					}
				}
			}

			return collection;
		}

		function _remove(elem, selector, keepData) {
			var node,
			    nodes = selector ? jQuery.filter(selector, elem) : elem,
			    i = 0;

			for (; (node = nodes[i]) != null; i++) {
				if (!keepData && node.nodeType === 1) {
					jQuery.cleanData(getAll(node));
				}

				if (node.parentNode) {
					if (keepData && jQuery.contains(node.ownerDocument, node)) {
						setGlobalEval(getAll(node, "script"));
					}
					node.parentNode.removeChild(node);
				}
			}

			return elem;
		}

		jQuery.extend({
			htmlPrefilter: function htmlPrefilter(html) {
				return html.replace(rxhtmlTag, "<$1></$2>");
			},

			clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
				var i,
				    l,
				    srcElements,
				    destElements,
				    clone = elem.cloneNode(true),
				    inPage = jQuery.contains(elem.ownerDocument, elem);

				// Fix IE cloning issues
				if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

					// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
					destElements = getAll(clone);
					srcElements = getAll(elem);

					for (i = 0, l = srcElements.length; i < l; i++) {
						fixInput(srcElements[i], destElements[i]);
					}
				}

				// Copy the events from the original to the clone
				if (dataAndEvents) {
					if (deepDataAndEvents) {
						srcElements = srcElements || getAll(elem);
						destElements = destElements || getAll(clone);

						for (i = 0, l = srcElements.length; i < l; i++) {
							cloneCopyEvent(srcElements[i], destElements[i]);
						}
					} else {
						cloneCopyEvent(elem, clone);
					}
				}

				// Preserve script evaluation history
				destElements = getAll(clone, "script");
				if (destElements.length > 0) {
					setGlobalEval(destElements, !inPage && getAll(elem, "script"));
				}

				// Return the cloned set
				return clone;
			},

			cleanData: function cleanData(elems) {
				var data,
				    elem,
				    type,
				    special = jQuery.event.special,
				    i = 0;

				for (; (elem = elems[i]) !== undefined; i++) {
					if (acceptData(elem)) {
						if (data = elem[dataPriv.expando]) {
							if (data.events) {
								for (type in data.events) {
									if (special[type]) {
										jQuery.event.remove(elem, type);

										// This is a shortcut to avoid jQuery.event.remove's overhead
									} else {
										jQuery.removeEvent(elem, type, data.handle);
									}
								}
							}

							// Support: Chrome <= 35-45+
							// Assign undefined instead of using delete, see Data#remove
							elem[dataPriv.expando] = undefined;
						}
						if (elem[dataUser.expando]) {

							// Support: Chrome <= 35-45+
							// Assign undefined instead of using delete, see Data#remove
							elem[dataUser.expando] = undefined;
						}
					}
				}
			}
		});

		jQuery.fn.extend({

			// Keep domManip exposed until 3.0 (gh-2225)
			domManip: domManip,

			detach: function detach(selector) {
				return _remove(this, selector, true);
			},

			remove: function remove(selector) {
				return _remove(this, selector);
			},

			text: function text(value) {
				return access(this, function (value) {
					return value === undefined ? jQuery.text(this) : this.empty().each(function () {
						if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
							this.textContent = value;
						}
					});
				}, null, value, arguments.length);
			},

			append: function append() {
				return domManip(this, arguments, function (elem) {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						var target = manipulationTarget(this, elem);
						target.appendChild(elem);
					}
				});
			},

			prepend: function prepend() {
				return domManip(this, arguments, function (elem) {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						var target = manipulationTarget(this, elem);
						target.insertBefore(elem, target.firstChild);
					}
				});
			},

			before: function before() {
				return domManip(this, arguments, function (elem) {
					if (this.parentNode) {
						this.parentNode.insertBefore(elem, this);
					}
				});
			},

			after: function after() {
				return domManip(this, arguments, function (elem) {
					if (this.parentNode) {
						this.parentNode.insertBefore(elem, this.nextSibling);
					}
				});
			},

			empty: function empty() {
				var elem,
				    i = 0;

				for (; (elem = this[i]) != null; i++) {
					if (elem.nodeType === 1) {

						// Prevent memory leaks
						jQuery.cleanData(getAll(elem, false));

						// Remove any remaining nodes
						elem.textContent = "";
					}
				}

				return this;
			},

			clone: function clone(dataAndEvents, deepDataAndEvents) {
				dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
				deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

				return this.map(function () {
					return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
				});
			},

			html: function html(value) {
				return access(this, function (value) {
					var elem = this[0] || {},
					    i = 0,
					    l = this.length;

					if (value === undefined && elem.nodeType === 1) {
						return elem.innerHTML;
					}

					// See if we can take a shortcut and just use innerHTML
					if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

						value = jQuery.htmlPrefilter(value);

						try {
							for (; i < l; i++) {
								elem = this[i] || {};

								// Remove element nodes and prevent memory leaks
								if (elem.nodeType === 1) {
									jQuery.cleanData(getAll(elem, false));
									elem.innerHTML = value;
								}
							}

							elem = 0;

							// If using innerHTML throws an exception, use the fallback method
						} catch (e) {}
					}

					if (elem) {
						this.empty().append(value);
					}
				}, null, value, arguments.length);
			},

			replaceWith: function replaceWith() {
				var ignored = [];

				// Make the changes, replacing each non-ignored context element with the new content
				return domManip(this, arguments, function (elem) {
					var parent = this.parentNode;

					if (jQuery.inArray(this, ignored) < 0) {
						jQuery.cleanData(getAll(this));
						if (parent) {
							parent.replaceChild(elem, this);
						}
					}

					// Force callback invocation
				}, ignored);
			}
		});

		jQuery.each({
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after",
			replaceAll: "replaceWith"
		}, function (name, original) {
			jQuery.fn[name] = function (selector) {
				var elems,
				    ret = [],
				    insert = jQuery(selector),
				    last = insert.length - 1,
				    i = 0;

				for (; i <= last; i++) {
					elems = i === last ? this : this.clone(true);
					jQuery(insert[i])[original](elems);

					// Support: QtWebKit
					// .get() because push.apply(_, arraylike) throws
					push.apply(ret, elems.get());
				}

				return this.pushStack(ret);
			};
		});

		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(34), __webpack_require__(35), __webpack_require__(36), __webpack_require__(37), __webpack_require__(38)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, rtagName, rscriptType, wrapMap, getAll, setGlobalEval) {

		var rhtml = /<|&#?\w+;/;

		function buildFragment(elems, context, scripts, selection, ignored) {
			var elem,
			    tmp,
			    tag,
			    wrap,
			    contains,
			    j,
			    fragment = context.createDocumentFragment(),
			    nodes = [],
			    i = 0,
			    l = elems.length;

			for (; i < l; i++) {
				elem = elems[i];

				if (elem || elem === 0) {

					// Add nodes directly
					if (jQuery.type(elem) === "object") {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

						// Convert non-html into a text node
					} else if (!rhtml.test(elem)) {
						nodes.push(context.createTextNode(elem));

						// Convert html into DOM nodes
					} else {
						tmp = tmp || fragment.appendChild(context.createElement("div"));

						// Deserialize a standard representation
						tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
						wrap = wrapMap[tag] || wrapMap._default;
						tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

						// Descend through wrappers to the right content
						j = wrap[0];
						while (j--) {
							tmp = tmp.lastChild;
						}

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge(nodes, tmp.childNodes);

						// Remember the top-level container
						tmp = fragment.firstChild;

						// Ensure the created nodes are orphaned (#12392)
						tmp.textContent = "";
					}
				}
			}

			// Remove wrapper from fragment
			fragment.textContent = "";

			i = 0;
			while (elem = nodes[i++]) {

				// Skip elements already in the context collection (trac-4087)
				if (selection && jQuery.inArray(elem, selection) > -1) {
					if (ignored) {
						ignored.push(elem);
					}
					continue;
				}

				contains = jQuery.contains(elem.ownerDocument, elem);

				// Append to fragment
				tmp = getAll(fragment.appendChild(elem), "script");

				// Preserve script evaluation history
				if (contains) {
					setGlobalEval(tmp);
				}

				// Capture executables
				if (scripts) {
					j = 0;
					while (elem = tmp[j++]) {
						if (rscriptType.test(elem.type || "")) {
							scripts.push(elem);
						}
					}
				}
			}

			return fragment;
		}

		return buildFragment;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
		return (/<([\w:-]+)/
		);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
		return (/^$|\/(?:java|ecma)script/i
		);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

		// We have to close these tags to support XHTML (#13200)
		var wrapMap = {

			// Support: IE9
			option: [1, "<select multiple='multiple'>", "</select>"],

			// XHTML parsers do not magically insert elements in the
			// same way that tag soup parsers do. So we cannot shorten
			// this by omitting <tbody> or other required elements.
			thead: [1, "<table>", "</table>"],
			col: [2, "<table><colgroup>", "</colgroup></table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

			_default: [0, "", ""]
		};

		// Support: IE9
		wrapMap.optgroup = wrapMap.option;

		wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
		wrapMap.th = wrapMap.td;

		return wrapMap;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		function getAll(context, tag) {

			// Support: IE9-11+
			// Use typeof to avoid zero-argument method invocation on host objects (#15151)
			var ret = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : [];

			return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
		}

		return getAll;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(39)], __WEBPACK_AMD_DEFINE_RESULT__ = function (dataPriv) {

		// Mark scripts as having already been evaluated
		function setGlobalEval(elems, refElements) {
			var i = 0,
			    l = elems.length;

			for (; i < l; i++) {
				dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
			}
		}

		return setGlobalEval;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(40)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Data) {
		return new Data();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(41), __webpack_require__(42)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, rnotwhite, acceptData) {

		function Data() {
			this.expando = jQuery.expando + Data.uid++;
		}

		Data.uid = 1;

		Data.prototype = {

			register: function register(owner, initial) {
				var value = initial || {};

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if (owner.nodeType) {
					owner[this.expando] = value;

					// Otherwise secure it in a non-enumerable, non-writable property
					// configurability must be true to allow the property to be
					// deleted with the delete operator
				} else {
					Object.defineProperty(owner, this.expando, {
						value: value,
						writable: true,
						configurable: true
					});
				}
				return owner[this.expando];
			},
			cache: function cache(owner) {

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if (!acceptData(owner)) {
					return {};
				}

				// Check if the owner object already has a cache
				var value = owner[this.expando];

				// If not, create one
				if (!value) {
					value = {};

					// We can accept data for non-element nodes in modern browsers,
					// but we should not, see #8335.
					// Always return an empty object.
					if (acceptData(owner)) {

						// If it is a node unlikely to be stringify-ed or looped over
						// use plain assignment
						if (owner.nodeType) {
							owner[this.expando] = value;

							// Otherwise secure it in a non-enumerable property
							// configurable must be true to allow the property to be
							// deleted when data is removed
						} else {
							Object.defineProperty(owner, this.expando, {
								value: value,
								configurable: true
							});
						}
					}
				}

				return value;
			},
			set: function set(owner, data, value) {
				var prop,
				    cache = this.cache(owner);

				// Handle: [ owner, key, value ] args
				if (typeof data === "string") {
					cache[data] = value;

					// Handle: [ owner, { properties } ] args
				} else {

					// Copy the properties one-by-one to the cache object
					for (prop in data) {
						cache[prop] = data[prop];
					}
				}
				return cache;
			},
			get: function get(owner, key) {
				return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][key];
			},
			access: function access(owner, key, value) {
				var stored;

				// In cases where either:
				//
				//   1. No key was specified
				//   2. A string key was specified, but no value provided
				//
				// Take the "read" path and allow the get method to determine
				// which value to return, respectively either:
				//
				//   1. The entire cache object
				//   2. The data stored at the key
				//
				if (key === undefined || key && typeof key === "string" && value === undefined) {

					stored = this.get(owner, key);

					return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
				}

				// When the key is not a string, or both a key and value
				// are specified, set or extend (existing objects) with either:
				//
				//   1. An object of properties
				//   2. A key and value
				//
				this.set(owner, key, value);

				// Since the "set" path can have two possible entry points
				// return the expected data based on which path was taken[*]
				return value !== undefined ? value : key;
			},
			remove: function remove(owner, key) {
				var i,
				    name,
				    camel,
				    cache = owner[this.expando];

				if (cache === undefined) {
					return;
				}

				if (key === undefined) {
					this.register(owner);
				} else {

					// Support array or space separated string of keys
					if (jQuery.isArray(key)) {

						// If "name" is an array of keys...
						// When data is initially created, via ("key", "val") signature,
						// keys will be converted to camelCase.
						// Since there is no way to tell _how_ a key was added, remove
						// both plain key and camelCase key. #12786
						// This will only penalize the array argument path.
						name = key.concat(key.map(jQuery.camelCase));
					} else {
						camel = jQuery.camelCase(key);

						// Try the string as a key before any manipulation
						if (key in cache) {
							name = [key, camel];
						} else {

							// If a key with the spaces exists, use it.
							// Otherwise, create an array by matching non-whitespace
							name = camel;
							name = name in cache ? [name] : name.match(rnotwhite) || [];
						}
					}

					i = name.length;

					while (i--) {
						delete cache[name[i]];
					}
				}

				// Remove the expando if there's no more data
				if (key === undefined || jQuery.isEmptyObject(cache)) {

					// Support: Chrome <= 35-45+
					// Webkit & Blink performance suffers when deleting properties
					// from DOM nodes, so set to undefined instead
					// https://code.google.com/p/chromium/issues/detail?id=378607
					if (owner.nodeType) {
						owner[this.expando] = undefined;
					} else {
						delete owner[this.expando];
					}
				}
			},
			hasData: function hasData(owner) {
				var cache = owner[this.expando];
				return cache !== undefined && !jQuery.isEmptyObject(cache);
			}
		};

		return Data;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
		return (/\S+/g
		);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

		/**
	  * Determines whether an object can have data
	  */
		return function (owner) {

			// Accepts only:
			//  - Node
			//    - Node.ELEMENT_NODE
			//    - Node.DOCUMENT_NODE
			//  - Object
			//    - Any
			/* jshint -W018 */
			return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
		return (/^(?:checkbox|radio)$/i
		);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(11), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function (document, support) {

		(function () {
			var fragment = document.createDocumentFragment(),
			    div = fragment.appendChild(document.createElement("div")),
			    input = document.createElement("input");

			// Support: Android 4.0-4.3, Safari<=5.1
			// Check state lost if the name is set (#11217)
			// Support: Windows Web Apps (WWA)
			// `name` and `type` must use .setAttribute for WWA (#14901)
			input.setAttribute("type", "radio");
			input.setAttribute("checked", "checked");
			input.setAttribute("name", "t");

			div.appendChild(input);

			// Support: Safari<=5.1, Android<4.2
			// Older WebKit doesn't clone checked state correctly in fragments
			support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

			// Support: IE<=11+
			// Make sure textarea (and checkbox) defaultValue is properly cloned
			div.innerHTML = "<textarea>x</textarea>";
			support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
		})();

		return support;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(40)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Data) {
		return new Data();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	// Initialize a jQuery object
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(11), __webpack_require__(47), __webpack_require__(48)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, document, rsingleTag) {

		// A central reference to the root jQuery(document)
		var rootjQuery,


		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		    init = jQuery.fn.init = function (selector, context, root) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if (!selector) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if (typeof selector === "string") {
				if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [null, selector, null];
				} else {
					match = rquickExpr.exec(selector);
				}

				// Match html or make sure no context is specified for #id
				if (match && (match[1] || !context)) {

					// HANDLE: $(html) -> $(array)
					if (match[1]) {
						context = context instanceof jQuery ? context[0] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

						// HANDLE: $(html, props)
						if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
							for (match in context) {

								// Properties of context are called as methods if possible
								if (jQuery.isFunction(this[match])) {
									this[match](context[match]);

									// ...and otherwise set as attributes
								} else {
									this.attr(match, context[match]);
								}
							}
						}

						return this;

						// HANDLE: $(#id)
					} else {
						elem = document.getElementById(match[2]);

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if (elem && elem.parentNode) {

							// Inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

					// HANDLE: $(expr, $(...))
				} else if (!context || context.jquery) {
					return (context || root).find(selector);

					// HANDLE: $(expr, context)
					// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor(context).find(selector);
				}

				// HANDLE: $(DOMElement)
			} else if (selector.nodeType) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;

				// HANDLE: $(function)
				// Shortcut for document ready
			} else if (jQuery.isFunction(selector)) {
				return root.ready !== undefined ? root.ready(selector) :

				// Execute immediately if ready is not present
				selector(jQuery);
			}

			if (selector.selector !== undefined) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray(selector, this);
		};

		// Give the init function the jQuery prototype for later instantiation
		init.prototype = jQuery.fn;

		// Initialize central reference
		rootjQuery = jQuery(document);

		return init;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

		// Match a standalone tag
		return (/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/
		);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(6), __webpack_require__(49), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, indexOf, rneedsContext) {

		var risSimple = /^.[^:#\[\.,]*$/;

		// Implement the identical functionality for filter and not
		function winnow(elements, qualifier, not) {
			if (jQuery.isFunction(qualifier)) {
				return jQuery.grep(elements, function (elem, i) {
					/* jshint -W018 */
					return !!qualifier.call(elem, i, elem) !== not;
				});
			}

			if (qualifier.nodeType) {
				return jQuery.grep(elements, function (elem) {
					return elem === qualifier !== not;
				});
			}

			if (typeof qualifier === "string") {
				if (risSimple.test(qualifier)) {
					return jQuery.filter(qualifier, elements, not);
				}

				qualifier = jQuery.filter(qualifier, elements);
			}

			return jQuery.grep(elements, function (elem) {
				return indexOf.call(qualifier, elem) > -1 !== not;
			});
		}

		jQuery.filter = function (expr, elems, not) {
			var elem = elems[0];

			if (not) {
				expr = ":not(" + expr + ")";
			}

			return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
				return elem.nodeType === 1;
			}));
		};

		jQuery.fn.extend({
			find: function find(selector) {
				var i,
				    len = this.length,
				    ret = [],
				    self = this;

				if (typeof selector !== "string") {
					return this.pushStack(jQuery(selector).filter(function () {
						for (i = 0; i < len; i++) {
							if (jQuery.contains(self[i], this)) {
								return true;
							}
						}
					}));
				}

				for (i = 0; i < len; i++) {
					jQuery.find(selector, self[i], ret);
				}

				// Needed because $( selector, context ) becomes $( context ).find( selector )
				ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
				ret.selector = this.selector ? this.selector + " " + selector : selector;
				return ret;
			},
			filter: function filter(selector) {
				return this.pushStack(winnow(this, selector || [], false));
			},
			not: function not(selector) {
				return this.pushStack(winnow(this, selector || [], true));
			},
			is: function is(selector) {
				return !!winnow(this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
			}
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {
		return jQuery.expr.match.needsContext;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(6), __webpack_require__(51), __webpack_require__(52), __webpack_require__(49), __webpack_require__(46), __webpack_require__(48), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, indexOf, dir, _siblings, rneedsContext) {

		var rparentsprev = /^(?:parents|prev(?:Until|All))/,


		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

		jQuery.fn.extend({
			has: function has(target) {
				var targets = jQuery(target, this),
				    l = targets.length;

				return this.filter(function () {
					var i = 0;
					for (; i < l; i++) {
						if (jQuery.contains(this, targets[i])) {
							return true;
						}
					}
				});
			},

			closest: function closest(selectors, context) {
				var cur,
				    i = 0,
				    l = this.length,
				    matched = [],
				    pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;

				for (; i < l; i++) {
					for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

						// Always skip document fragments
						if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {

							matched.push(cur);
							break;
						}
					}
				}

				return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
			},

			// Determine the position of an element within the set
			index: function index(elem) {

				// No argument, return index in parent
				if (!elem) {
					return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
				}

				// Index in selector
				if (typeof elem === "string") {
					return indexOf.call(jQuery(elem), this[0]);
				}

				// Locate the position of the desired element
				return indexOf.call(this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[0] : elem);
			},

			add: function add(selector, context) {
				return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
			},

			addBack: function addBack(selector) {
				return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
			}
		});

		function sibling(cur, dir) {
			while ((cur = cur[dir]) && cur.nodeType !== 1) {}
			return cur;
		}

		jQuery.each({
			parent: function parent(elem) {
				var parent = elem.parentNode;
				return parent && parent.nodeType !== 11 ? parent : null;
			},
			parents: function parents(elem) {
				return dir(elem, "parentNode");
			},
			parentsUntil: function parentsUntil(elem, i, until) {
				return dir(elem, "parentNode", until);
			},
			next: function next(elem) {
				return sibling(elem, "nextSibling");
			},
			prev: function prev(elem) {
				return sibling(elem, "previousSibling");
			},
			nextAll: function nextAll(elem) {
				return dir(elem, "nextSibling");
			},
			prevAll: function prevAll(elem) {
				return dir(elem, "previousSibling");
			},
			nextUntil: function nextUntil(elem, i, until) {
				return dir(elem, "nextSibling", until);
			},
			prevUntil: function prevUntil(elem, i, until) {
				return dir(elem, "previousSibling", until);
			},
			siblings: function siblings(elem) {
				return _siblings((elem.parentNode || {}).firstChild, elem);
			},
			children: function children(elem) {
				return _siblings(elem.firstChild);
			},
			contents: function contents(elem) {
				return elem.contentDocument || jQuery.merge([], elem.childNodes);
			}
		}, function (name, fn) {
			jQuery.fn[name] = function (until, selector) {
				var matched = jQuery.map(this, fn, until);

				if (name.slice(-5) !== "Until") {
					selector = until;
				}

				if (selector && typeof selector === "string") {
					matched = jQuery.filter(selector, matched);
				}

				if (this.length > 1) {

					// Remove duplicates
					if (!guaranteedUnique[name]) {
						jQuery.uniqueSort(matched);
					}

					// Reverse order for parents* and prev-derivatives
					if (rparentsprev.test(name)) {
						matched.reverse();
					}
				}

				return this.pushStack(matched);
			};
		});

		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		return function (elem, dir, until) {
			var matched = [],
			    truncate = until !== undefined;

			while ((elem = elem[dir]) && elem.nodeType !== 9) {
				if (elem.nodeType === 1) {
					if (truncate && jQuery(elem).is(until)) {
						break;
					}
					matched.push(elem);
				}
			}
			return matched;
		};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

		return function (n, elem) {
			var matched = [];

			for (; n; n = n.nextSibling) {
				if (n.nodeType === 1 && n !== elem) {
					matched.push(n);
				}
			}

			return matched;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(11), __webpack_require__(41), __webpack_require__(8), __webpack_require__(39), __webpack_require__(46), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, document, rnotwhite, slice, dataPriv) {

		var rkeyEvent = /^key/,
		    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

		function returnTrue() {
			return true;
		}

		function returnFalse() {
			return false;
		}

		// Support: IE9
		// See #13393 for more info
		function safeActiveElement() {
			try {
				return document.activeElement;
			} catch (err) {}
		}

		function _on(elem, types, selector, data, fn, one) {
			var origFn, type;

			// Types can be a map of types/handlers
			if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

				// ( types-Object, selector, data )
				if (typeof selector !== "string") {

					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for (type in types) {
					_on(elem, type, selector, data, types[type], one);
				}
				return elem;
			}

			if (data == null && fn == null) {

				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if (fn == null) {
				if (typeof selector === "string") {

					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else {

					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if (fn === false) {
				fn = returnFalse;
			} else if (!fn) {
				return elem;
			}

			if (one === 1) {
				origFn = fn;
				fn = function fn(event) {

					// Can use an empty set, since event contains the info
					jQuery().off(event);
					return origFn.apply(this, arguments);
				};

				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
			}
			return elem.each(function () {
				jQuery.event.add(this, types, fn, data, selector);
			});
		}

		/*
	  * Helper functions for managing events -- not part of the public interface.
	  * Props to Dean Edwards' addEvent library for many of the ideas.
	  */
		jQuery.event = {

			global: {},

			add: function add(elem, types, handler, data, selector) {

				var handleObjIn,
				    eventHandle,
				    tmp,
				    events,
				    t,
				    handleObj,
				    special,
				    handlers,
				    type,
				    namespaces,
				    origType,
				    elemData = dataPriv.get(elem);

				// Don't attach events to noData or text/comment nodes (but allow plain objects)
				if (!elemData) {
					return;
				}

				// Caller can pass in an object of custom data in lieu of the handler
				if (handler.handler) {
					handleObjIn = handler;
					handler = handleObjIn.handler;
					selector = handleObjIn.selector;
				}

				// Make sure that the handler has a unique ID, used to find/remove it later
				if (!handler.guid) {
					handler.guid = jQuery.guid++;
				}

				// Init the element's event structure and main handler, if this is the first
				if (!(events = elemData.events)) {
					events = elemData.events = {};
				}
				if (!(eventHandle = elemData.handle)) {
					eventHandle = elemData.handle = function (e) {

						// Discard the second event of a jQuery.event.trigger() and
						// when an event is called after a page has unloaded
						return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
					};
				}

				// Handle multiple events separated by a space
				types = (types || "").match(rnotwhite) || [""];
				t = types.length;
				while (t--) {
					tmp = rtypenamespace.exec(types[t]) || [];
					type = origType = tmp[1];
					namespaces = (tmp[2] || "").split(".").sort();

					// There *must* be a type, no attaching namespace-only handlers
					if (!type) {
						continue;
					}

					// If event changes its type, use the special event handlers for the changed type
					special = jQuery.event.special[type] || {};

					// If selector defined, determine special event api type, otherwise given type
					type = (selector ? special.delegateType : special.bindType) || type;

					// Update special based on newly reset type
					special = jQuery.event.special[type] || {};

					// handleObj is passed to all event handlers
					handleObj = jQuery.extend({
						type: type,
						origType: origType,
						data: data,
						handler: handler,
						guid: handler.guid,
						selector: selector,
						needsContext: selector && jQuery.expr.match.needsContext.test(selector),
						namespace: namespaces.join(".")
					}, handleObjIn);

					// Init the event handler queue if we're the first
					if (!(handlers = events[type])) {
						handlers = events[type] = [];
						handlers.delegateCount = 0;

						// Only use addEventListener if the special events handler returns false
						if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {

							if (elem.addEventListener) {
								elem.addEventListener(type, eventHandle);
							}
						}
					}

					if (special.add) {
						special.add.call(elem, handleObj);

						if (!handleObj.handler.guid) {
							handleObj.handler.guid = handler.guid;
						}
					}

					// Add to the element's handler list, delegates in front
					if (selector) {
						handlers.splice(handlers.delegateCount++, 0, handleObj);
					} else {
						handlers.push(handleObj);
					}

					// Keep track of which events have ever been used, for event optimization
					jQuery.event.global[type] = true;
				}
			},

			// Detach an event or set of events from an element
			remove: function remove(elem, types, handler, selector, mappedTypes) {

				var j,
				    origCount,
				    tmp,
				    events,
				    t,
				    handleObj,
				    special,
				    handlers,
				    type,
				    namespaces,
				    origType,
				    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

				if (!elemData || !(events = elemData.events)) {
					return;
				}

				// Once for each type.namespace in types; type may be omitted
				types = (types || "").match(rnotwhite) || [""];
				t = types.length;
				while (t--) {
					tmp = rtypenamespace.exec(types[t]) || [];
					type = origType = tmp[1];
					namespaces = (tmp[2] || "").split(".").sort();

					// Unbind all events (on this namespace, if provided) for the element
					if (!type) {
						for (type in events) {
							jQuery.event.remove(elem, type + types[t], handler, selector, true);
						}
						continue;
					}

					special = jQuery.event.special[type] || {};
					type = (selector ? special.delegateType : special.bindType) || type;
					handlers = events[type] || [];
					tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

					// Remove matching events
					origCount = j = handlers.length;
					while (j--) {
						handleObj = handlers[j];

						if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
							handlers.splice(j, 1);

							if (handleObj.selector) {
								handlers.delegateCount--;
							}
							if (special.remove) {
								special.remove.call(elem, handleObj);
							}
						}
					}

					// Remove generic event handler if we removed something and no more handlers exist
					// (avoids potential for endless recursion during removal of special event handlers)
					if (origCount && !handlers.length) {
						if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {

							jQuery.removeEvent(elem, type, elemData.handle);
						}

						delete events[type];
					}
				}

				// Remove data and the expando if it's no longer used
				if (jQuery.isEmptyObject(events)) {
					dataPriv.remove(elem, "handle events");
				}
			},

			dispatch: function dispatch(event) {

				// Make a writable jQuery.Event from the native event object
				event = jQuery.event.fix(event);

				var i,
				    j,
				    ret,
				    matched,
				    handleObj,
				    handlerQueue = [],
				    args = slice.call(arguments),
				    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
				    special = jQuery.event.special[event.type] || {};

				// Use the fix-ed jQuery.Event rather than the (read-only) native event
				args[0] = event;
				event.delegateTarget = this;

				// Call the preDispatch hook for the mapped type, and let it bail if desired
				if (special.preDispatch && special.preDispatch.call(this, event) === false) {
					return;
				}

				// Determine handlers
				handlerQueue = jQuery.event.handlers.call(this, event, handlers);

				// Run delegates first; they may want to stop propagation beneath us
				i = 0;
				while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
					event.currentTarget = matched.elem;

					j = 0;
					while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

						// Triggered event must either 1) have no namespace, or 2) have namespace(s)
						// a subset or equal to those in the bound event (both can have no namespace).
						if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

							event.handleObj = handleObj;
							event.data = handleObj.data;

							ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

							if (ret !== undefined) {
								if ((event.result = ret) === false) {
									event.preventDefault();
									event.stopPropagation();
								}
							}
						}
					}
				}

				// Call the postDispatch hook for the mapped type
				if (special.postDispatch) {
					special.postDispatch.call(this, event);
				}

				return event.result;
			},

			handlers: function handlers(event, _handlers) {
				var i,
				    matches,
				    sel,
				    handleObj,
				    handlerQueue = [],
				    delegateCount = _handlers.delegateCount,
				    cur = event.target;

				// Support (at least): Chrome, IE9
				// Find delegate handlers
				// Black-hole SVG <use> instance trees (#13180)
				//
				// Support: Firefox<=42+
				// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
				if (delegateCount && cur.nodeType && (event.type !== "click" || isNaN(event.button) || event.button < 1)) {

					for (; cur !== this; cur = cur.parentNode || this) {

						// Don't check non-elements (#13208)
						// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
						if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
							matches = [];
							for (i = 0; i < delegateCount; i++) {
								handleObj = _handlers[i];

								// Don't conflict with Object.prototype properties (#13203)
								sel = handleObj.selector + " ";

								if (matches[sel] === undefined) {
									matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
								}
								if (matches[sel]) {
									matches.push(handleObj);
								}
							}
							if (matches.length) {
								handlerQueue.push({ elem: cur, handlers: matches });
							}
						}
					}
				}

				// Add the remaining (directly-bound) handlers
				if (delegateCount < _handlers.length) {
					handlerQueue.push({ elem: this, handlers: _handlers.slice(delegateCount) });
				}

				return handlerQueue;
			},

			// Includes some event props shared by KeyEvent and MouseEvent
			props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),

			fixHooks: {},

			keyHooks: {
				props: "char charCode key keyCode".split(" "),
				filter: function filter(event, original) {

					// Add which for key events
					if (event.which == null) {
						event.which = original.charCode != null ? original.charCode : original.keyCode;
					}

					return event;
				}
			},

			mouseHooks: {
				props: ("button buttons clientX clientY offsetX offsetY pageX pageY " + "screenX screenY toElement").split(" "),
				filter: function filter(event, original) {
					var eventDoc,
					    doc,
					    body,
					    button = original.button;

					// Calculate pageX/Y if missing and clientX/Y available
					if (event.pageX == null && original.clientX != null) {
						eventDoc = event.target.ownerDocument || document;
						doc = eventDoc.documentElement;
						body = eventDoc.body;

						event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
						event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
					}

					// Add which for click: 1 === left; 2 === middle; 3 === right
					// Note: button is not normalized, so don't use it
					if (!event.which && button !== undefined) {
						event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
					}

					return event;
				}
			},

			fix: function fix(event) {
				if (event[jQuery.expando]) {
					return event;
				}

				// Create a writable copy of the event object and normalize some properties
				var i,
				    prop,
				    copy,
				    type = event.type,
				    originalEvent = event,
				    fixHook = this.fixHooks[type];

				if (!fixHook) {
					this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
				}
				copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

				event = new jQuery.Event(originalEvent);

				i = copy.length;
				while (i--) {
					prop = copy[i];
					event[prop] = originalEvent[prop];
				}

				// Support: Cordova 2.5 (WebKit) (#13255)
				// All events should have a target; Cordova deviceready doesn't
				if (!event.target) {
					event.target = document;
				}

				// Support: Safari 6.0+, Chrome<28
				// Target should not be a text node (#504, #13143)
				if (event.target.nodeType === 3) {
					event.target = event.target.parentNode;
				}

				return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
			},

			special: {
				load: {

					// Prevent triggered image.load events from bubbling to window.load
					noBubble: true
				},
				focus: {

					// Fire native event if possible so blur/focus sequence is correct
					trigger: function trigger() {
						if (this !== safeActiveElement() && this.focus) {
							this.focus();
							return false;
						}
					},
					delegateType: "focusin"
				},
				blur: {
					trigger: function trigger() {
						if (this === safeActiveElement() && this.blur) {
							this.blur();
							return false;
						}
					},
					delegateType: "focusout"
				},
				click: {

					// For checkbox, fire native event so checked state will be right
					trigger: function trigger() {
						if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
							this.click();
							return false;
						}
					},

					// For cross-browser consistency, don't fire native .click() on links
					_default: function _default(event) {
						return jQuery.nodeName(event.target, "a");
					}
				},

				beforeunload: {
					postDispatch: function postDispatch(event) {

						// Support: Firefox 20+
						// Firefox doesn't alert if the returnValue field is not set.
						if (event.result !== undefined && event.originalEvent) {
							event.originalEvent.returnValue = event.result;
						}
					}
				}
			}
		};

		jQuery.removeEvent = function (elem, type, handle) {

			// This "if" is needed for plain objects
			if (elem.removeEventListener) {
				elem.removeEventListener(type, handle);
			}
		};

		jQuery.Event = function (src, props) {

			// Allow instantiation without the 'new' keyword
			if (!(this instanceof jQuery.Event)) {
				return new jQuery.Event(src, props);
			}

			// Event object
			if (src && src.type) {
				this.originalEvent = src;
				this.type = src.type;

				// Events bubbling up the document may have been marked as prevented
				// by a handler lower down the tree; reflect the correct value.
				this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ? returnTrue : returnFalse;

				// Event type
			} else {
				this.type = src;
			}

			// Put explicitly provided properties onto the event object
			if (props) {
				jQuery.extend(this, props);
			}

			// Create a timestamp if incoming event doesn't have one
			this.timeStamp = src && src.timeStamp || jQuery.now();

			// Mark it as fixed
			this[jQuery.expando] = true;
		};

		// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
		// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
		jQuery.Event.prototype = {
			constructor: jQuery.Event,
			isDefaultPrevented: returnFalse,
			isPropagationStopped: returnFalse,
			isImmediatePropagationStopped: returnFalse,
			isSimulated: false,

			preventDefault: function preventDefault() {
				var e = this.originalEvent;

				this.isDefaultPrevented = returnTrue;

				if (e && !this.isSimulated) {
					e.preventDefault();
				}
			},
			stopPropagation: function stopPropagation() {
				var e = this.originalEvent;

				this.isPropagationStopped = returnTrue;

				if (e && !this.isSimulated) {
					e.stopPropagation();
				}
			},
			stopImmediatePropagation: function stopImmediatePropagation() {
				var e = this.originalEvent;

				this.isImmediatePropagationStopped = returnTrue;

				if (e && !this.isSimulated) {
					e.stopImmediatePropagation();
				}

				this.stopPropagation();
			}
		};

		// Create mouseenter/leave events using mouseover/out and event-time checks
		// so that event delegation works in jQuery.
		// Do the same for pointerenter/pointerleave and pointerover/pointerout
		//
		// Support: Safari 7 only
		// Safari sends mouseenter too often; see:
		// https://code.google.com/p/chromium/issues/detail?id=470258
		// for the description of the bug (it existed in older Chrome versions as well).
		jQuery.each({
			mouseenter: "mouseover",
			mouseleave: "mouseout",
			pointerenter: "pointerover",
			pointerleave: "pointerout"
		}, function (orig, fix) {
			jQuery.event.special[orig] = {
				delegateType: fix,
				bindType: fix,

				handle: function handle(event) {
					var ret,
					    target = this,
					    related = event.relatedTarget,
					    handleObj = event.handleObj;

					// For mouseenter/leave call the handler if related is outside the target.
					// NB: No relatedTarget if the mouse left/entered the browser window
					if (!related || related !== target && !jQuery.contains(target, related)) {
						event.type = handleObj.origType;
						ret = handleObj.handler.apply(this, arguments);
						event.type = fix;
					}
					return ret;
				}
			};
		});

		jQuery.fn.extend({
			on: function on(types, selector, data, fn) {
				return _on(this, types, selector, data, fn);
			},
			one: function one(types, selector, data, fn) {
				return _on(this, types, selector, data, fn, 1);
			},
			off: function off(types, selector, fn) {
				var handleObj, type;
				if (types && types.preventDefault && types.handleObj) {

					// ( event )  dispatched jQuery.Event
					handleObj = types.handleObj;
					jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
					return this;
				}
				if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

					// ( types-object [, selector] )
					for (type in types) {
						this.off(type, selector, types[type]);
					}
					return this;
				}
				if (selector === false || typeof selector === "function") {

					// ( types [, fn] )
					fn = selector;
					selector = undefined;
				}
				if (fn === false) {
					fn = returnFalse;
				}
				return this.each(function () {
					jQuery.event.remove(this, types, fn, selector);
				});
			}
		});

		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

		function addGetHookIf(conditionFn, hookFn) {

			// Define the hook, we'll check on the first run if it's really needed.
			return {
				get: function get() {
					if (conditionFn()) {

						// Hook not needed (or it's not possible to use it due
						// to missing dependency), remove it.
						delete this.get;
						return;
					}

					// Hook needed; redefine it so that the support test is not executed again.
					return (this.get = hookFn).apply(this, arguments);
				}
			};
		}

		return addGetHookIf;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(11), __webpack_require__(46), __webpack_require__(56)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, document) {

		// The deferred used on DOM ready
		var readyList;

		jQuery.fn.ready = function (fn) {

			// Add the callback
			jQuery.ready.promise().done(fn);

			return this;
		};

		jQuery.extend({

			// Is the DOM ready to be used? Set to true once it occurs.
			isReady: false,

			// A counter to track how many items to wait for before
			// the ready event fires. See #6781
			readyWait: 1,

			// Hold (or release) the ready event
			holdReady: function holdReady(hold) {
				if (hold) {
					jQuery.readyWait++;
				} else {
					jQuery.ready(true);
				}
			},

			// Handle when the DOM is ready
			ready: function ready(wait) {

				// Abort if there are pending holds or we're already ready
				if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
					return;
				}

				// Remember that the DOM is ready
				jQuery.isReady = true;

				// If a normal DOM Ready event fired, decrement, and wait if need be
				if (wait !== true && --jQuery.readyWait > 0) {
					return;
				}

				// If there are functions bound, to execute
				readyList.resolveWith(document, [jQuery]);

				// Trigger any bound ready events
				if (jQuery.fn.triggerHandler) {
					jQuery(document).triggerHandler("ready");
					jQuery(document).off("ready");
				}
			}
		});

		/**
	  * The ready event handler and self cleanup method
	  */
		function completed() {
			document.removeEventListener("DOMContentLoaded", completed);
			window.removeEventListener("load", completed);
			jQuery.ready();
		}

		jQuery.ready.promise = function (obj) {
			if (!readyList) {

				readyList = jQuery.Deferred();

				// Catch cases where $(document).ready() is called
				// after the browser event has already occurred.
				// Support: IE9-10 only
				// Older IE sometimes signals "interactive" too soon
				if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {

					// Handle it asynchronously to allow scripts the opportunity to delay ready
					window.setTimeout(jQuery.ready);
				} else {

					// Use the handy event callback
					document.addEventListener("DOMContentLoaded", completed);

					// A fallback to window.onload, that will always work
					window.addEventListener("load", completed);
				}
			}
			return readyList.promise(obj);
		};

		// Kick off the DOM ready check even if the user does not
		jQuery.ready.promise();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(8), __webpack_require__(57)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, slice) {

		jQuery.extend({

			Deferred: function Deferred(func) {
				var tuples = [

				// action, add listener, listener list, final state
				["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
				    _state = "pending",
				    _promise = {
					state: function state() {
						return _state;
					},
					always: function always() {
						deferred.done(arguments).fail(arguments);
						return this;
					},
					then: function then() /* fnDone, fnFail, fnProgress */{
						var fns = arguments;
						return jQuery.Deferred(function (newDefer) {
							jQuery.each(tuples, function (i, tuple) {
								var fn = jQuery.isFunction(fns[i]) && fns[i];

								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[tuple[1]](function () {
									var returned = fn && fn.apply(this, arguments);
									if (returned && jQuery.isFunction(returned.promise)) {
										returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
									} else {
										newDefer[tuple[0] + "With"](this === _promise ? newDefer.promise() : this, fn ? [returned] : arguments);
									}
								});
							});
							fns = null;
						}).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function promise(obj) {
						return obj != null ? jQuery.extend(obj, _promise) : _promise;
					}
				},
				    deferred = {};

				// Keep pipe for back-compat
				_promise.pipe = _promise.then;

				// Add list-specific methods
				jQuery.each(tuples, function (i, tuple) {
					var list = tuple[2],
					    stateString = tuple[3];

					// promise[ done | fail | progress ] = list.add
					_promise[tuple[1]] = list.add;

					// Handle state
					if (stateString) {
						list.add(function () {

							// state = [ resolved | rejected ]
							_state = stateString;

							// [ reject_list | resolve_list ].disable; progress_list.lock
						}, tuples[i ^ 1][2].disable, tuples[2][2].lock);
					}

					// deferred[ resolve | reject | notify ]
					deferred[tuple[0]] = function () {
						deferred[tuple[0] + "With"](this === deferred ? _promise : this, arguments);
						return this;
					};
					deferred[tuple[0] + "With"] = list.fireWith;
				});

				// Make the deferred a promise
				_promise.promise(deferred);

				// Call given func if any
				if (func) {
					func.call(deferred, deferred);
				}

				// All done!
				return deferred;
			},

			// Deferred helper
			when: function when(subordinate /* , ..., subordinateN */) {
				var i = 0,
				    resolveValues = slice.call(arguments),
				    length = resolveValues.length,


				// the count of uncompleted subordinates
				remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,


				// the master Deferred.
				// If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),


				// Update function for both resolve and progress values
				updateFunc = function updateFunc(i, contexts, values) {
					return function (value) {
						contexts[i] = this;
						values[i] = arguments.length > 1 ? slice.call(arguments) : value;
						if (values === progressValues) {
							deferred.notifyWith(contexts, values);
						} else if (! --remaining) {
							deferred.resolveWith(contexts, values);
						}
					};
				},
				    progressValues,
				    progressContexts,
				    resolveContexts;

				// Add listeners to Deferred subordinates; treat others as resolved
				if (length > 1) {
					progressValues = new Array(length);
					progressContexts = new Array(length);
					resolveContexts = new Array(length);
					for (; i < length; i++) {
						if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
							resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject);
						} else {
							--remaining;
						}
					}
				}

				// If we're not waiting on anything, resolve the master
				if (!remaining) {
					deferred.resolveWith(resolveContexts, resolveValues);
				}

				return deferred.promise();
			}
		});

		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(41)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, rnotwhite) {

		// Convert String-formatted options into Object-formatted ones
		function createOptions(options) {
			var object = {};
			jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
				object[flag] = true;
			});
			return object;
		}

		/*
	  * Create a callback list using the following parameters:
	  *
	  *	options: an optional list of space-separated options that will change how
	  *			the callback list behaves or a more traditional option object
	  *
	  * By default a callback list will act like an event callback list and can be
	  * "fired" multiple times.
	  *
	  * Possible options:
	  *
	  *	once:			will ensure the callback list can only be fired once (like a Deferred)
	  *
	  *	memory:			will keep track of previous values and will call any callback added
	  *					after the list has been fired right away with the latest "memorized"
	  *					values (like a Deferred)
	  *
	  *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	  *
	  *	stopOnFalse:	interrupt callings when a callback returns false
	  *
	  */
		jQuery.Callbacks = function (options) {

			// Convert options from String-formatted to Object-formatted if needed
			// (we check in cache first)
			options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

			var // Flag to know if list is currently firing
			firing,


			// Last fire value for non-forgettable lists
			memory,


			// Flag to know if list was already fired
			_fired,


			// Flag to prevent firing
			_locked,


			// Actual callback list
			list = [],


			// Queue of execution data for repeatable lists
			queue = [],


			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,


			// Fire callbacks
			fire = function fire() {

				// Enforce single-firing
				_locked = options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				_fired = firing = true;
				for (; queue.length; firingIndex = -1) {
					memory = queue.shift();
					while (++firingIndex < list.length) {

						// Run callback and check for early termination
						if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if (!options.memory) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if (_locked) {

					// Keep an empty list if we have data for future add calls
					if (memory) {
						list = [];

						// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},


			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function add() {
					if (list) {

						// If we have memory from a past run, we should fire after adding
						if (memory && !firing) {
							firingIndex = list.length - 1;
							queue.push(memory);
						}

						(function add(args) {
							jQuery.each(args, function (_, arg) {
								if (jQuery.isFunction(arg)) {
									if (!options.unique || !self.has(arg)) {
										list.push(arg);
									}
								} else if (arg && arg.length && jQuery.type(arg) !== "string") {

									// Inspect recursively
									add(arg);
								}
							});
						})(arguments);

						if (memory && !firing) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function remove() {
					jQuery.each(arguments, function (_, arg) {
						var index;
						while ((index = jQuery.inArray(arg, list, index)) > -1) {
							list.splice(index, 1);

							// Handle firing indexes
							if (index <= firingIndex) {
								firingIndex--;
							}
						}
					});
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function has(fn) {
					return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function empty() {
					if (list) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function disable() {
					_locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function disabled() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function lock() {
					_locked = queue = [];
					if (!memory) {
						list = memory = "";
					}
					return this;
				},
				locked: function locked() {
					return !!_locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function fireWith(context, args) {
					if (!_locked) {
						args = args || [];
						args = [context, args.slice ? args.slice() : args];
						queue.push(args);
						if (!firing) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function fire() {
					self.fireWith(this, arguments);
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function fired() {
					return !!_fired;
				}
			};

			return self;
		};

		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(16), __webpack_require__(39), __webpack_require__(45)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, access, dataPriv, dataUser) {

		//	Implementation Summary
		//
		//	1. Enforce API surface and semantic compatibility with 1.9.x branch
		//	2. Improve the module's maintainability by reducing the storage
		//		paths to a single mechanism.
		//	3. Use the same single mechanism to support "private" and "user" data.
		//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
		//	5. Avoid exposing implementation details on user objects (eg. expando properties)
		//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

		var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		    rmultiDash = /[A-Z]/g;

		function dataAttr(elem, key, data) {
			var name;

			// If nothing was found internally, try to fetch any
			// data from the HTML5 data-* attribute
			if (data === undefined && elem.nodeType === 1) {
				name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
				data = elem.getAttribute(name);

				if (typeof data === "string") {
					try {
						data = data === "true" ? true : data === "false" ? false : data === "null" ? null :

						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
					} catch (e) {}

					// Make sure we set the data so it isn't changed later
					dataUser.set(elem, key, data);
				} else {
					data = undefined;
				}
			}
			return data;
		}

		jQuery.extend({
			hasData: function hasData(elem) {
				return dataUser.hasData(elem) || dataPriv.hasData(elem);
			},

			data: function data(elem, name, _data) {
				return dataUser.access(elem, name, _data);
			},

			removeData: function removeData(elem, name) {
				dataUser.remove(elem, name);
			},

			// TODO: Now that all calls to _data and _removeData have been replaced
			// with direct calls to dataPriv methods, these can be deprecated.
			_data: function _data(elem, name, data) {
				return dataPriv.access(elem, name, data);
			},

			_removeData: function _removeData(elem, name) {
				dataPriv.remove(elem, name);
			}
		});

		jQuery.fn.extend({
			data: function data(key, value) {
				var i,
				    name,
				    data,
				    elem = this[0],
				    attrs = elem && elem.attributes;

				// Gets all values
				if (key === undefined) {
					if (this.length) {
						data = dataUser.get(elem);

						if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
							i = attrs.length;
							while (i--) {

								// Support: IE11+
								// The attrs elements can be null (#14894)
								if (attrs[i]) {
									name = attrs[i].name;
									if (name.indexOf("data-") === 0) {
										name = jQuery.camelCase(name.slice(5));
										dataAttr(elem, name, data[name]);
									}
								}
							}
							dataPriv.set(elem, "hasDataAttrs", true);
						}
					}

					return data;
				}

				// Sets multiple values
				if ((typeof key === "undefined" ? "undefined" : _typeof(key)) === "object") {
					return this.each(function () {
						dataUser.set(this, key);
					});
				}

				return access(this, function (value) {
					var data, camelKey;

					// The calling jQuery object (element matches) is not empty
					// (and therefore has an element appears at this[ 0 ]) and the
					// `value` parameter was not undefined. An empty jQuery object
					// will result in `undefined` for elem = this[ 0 ] which will
					// throw an exception if an attempt to read a data cache is made.
					if (elem && value === undefined) {

						// Attempt to get data from the cache
						// with the key as-is
						data = dataUser.get(elem, key) ||

						// Try to find dashed key if it exists (gh-2779)
						// This is for 2.2.x only
						dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase());

						if (data !== undefined) {
							return data;
						}

						camelKey = jQuery.camelCase(key);

						// Attempt to get data from the cache
						// with the key camelized
						data = dataUser.get(elem, camelKey);
						if (data !== undefined) {
							return data;
						}

						// Attempt to "discover" the data in
						// HTML5 custom data-* attrs
						data = dataAttr(elem, camelKey, undefined);
						if (data !== undefined) {
							return data;
						}

						// We tried really hard, but the data doesn't exist.
						return;
					}

					// Set the data...
					camelKey = jQuery.camelCase(key);
					this.each(function () {

						// First, attempt to store a copy or reference of any
						// data that might've been store with a camelCased key.
						var data = dataUser.get(this, camelKey);

						// For HTML5 data-* attribute interop, we have to
						// store property names with dashes in a camelCase form.
						// This might not apply to all properties...*
						dataUser.set(this, camelKey, value);

						// *... In the case of properties that might _actually_
						// have dashes, we need to also store a copy of that
						// unchanged property.
						if (key.indexOf("-") > -1 && data !== undefined) {
							dataUser.set(this, key, value);
						}
					});
				}, null, value, arguments.length > 1, null, true);
			},

			removeData: function removeData(key) {
				return this.each(function () {
					dataUser.remove(this, key);
				});
			}
		});

		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(39), __webpack_require__(56), __webpack_require__(57)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, dataPriv) {

		jQuery.extend({
			queue: function queue(elem, type, data) {
				var queue;

				if (elem) {
					type = (type || "fx") + "queue";
					queue = dataPriv.get(elem, type);

					// Speed up dequeue by getting out quickly if this is just a lookup
					if (data) {
						if (!queue || jQuery.isArray(data)) {
							queue = dataPriv.access(elem, type, jQuery.makeArray(data));
						} else {
							queue.push(data);
						}
					}
					return queue || [];
				}
			},

			dequeue: function dequeue(elem, type) {
				type = type || "fx";

				var queue = jQuery.queue(elem, type),
				    startLength = queue.length,
				    fn = queue.shift(),
				    hooks = jQuery._queueHooks(elem, type),
				    next = function next() {
					jQuery.dequeue(elem, type);
				};

				// If the fx queue is dequeued, always remove the progress sentinel
				if (fn === "inprogress") {
					fn = queue.shift();
					startLength--;
				}

				if (fn) {

					// Add a progress sentinel to prevent the fx queue from being
					// automatically dequeued
					if (type === "fx") {
						queue.unshift("inprogress");
					}

					// Clear up the last queue stop function
					delete hooks.stop;
					fn.call(elem, next, hooks);
				}

				if (!startLength && hooks) {
					hooks.empty.fire();
				}
			},

			// Not public - generate a queueHooks object, or return the current one
			_queueHooks: function _queueHooks(elem, type) {
				var key = type + "queueHooks";
				return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
					empty: jQuery.Callbacks("once memory").add(function () {
						dataPriv.remove(elem, [type + "queue", key]);
					})
				});
			}
		});

		jQuery.fn.extend({
			queue: function queue(type, data) {
				var setter = 2;

				if (typeof type !== "string") {
					data = type;
					type = "fx";
					setter--;
				}

				if (arguments.length < setter) {
					return jQuery.queue(this[0], type);
				}

				return data === undefined ? this : this.each(function () {
					var queue = jQuery.queue(this, type, data);

					// Ensure a hooks for this queue
					jQuery._queueHooks(this, type);

					if (type === "fx" && queue[0] !== "inprogress") {
						jQuery.dequeue(this, type);
					}
				});
			},
			dequeue: function dequeue(type) {
				return this.each(function () {
					jQuery.dequeue(this, type);
				});
			},
			clearQueue: function clearQueue(type) {
				return this.queue(type || "fx", []);
			},

			// Get a promise resolved when queues of a certain type
			// are emptied (fx is the type by default)
			promise: function promise(type, obj) {
				var tmp,
				    count = 1,
				    defer = jQuery.Deferred(),
				    elements = this,
				    i = this.length,
				    resolve = function resolve() {
					if (! --count) {
						defer.resolveWith(elements, [elements]);
					}
				};

				if (typeof type !== "string") {
					obj = type;
					type = undefined;
				}
				type = type || "fx";

				while (i--) {
					tmp = dataPriv.get(elements[i], type + "queueHooks");
					if (tmp && tmp.empty) {
						count++;
						tmp.empty.add(resolve);
					}
				}
				resolve();
				return defer.promise(obj);
			}
		});

		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(59), __webpack_require__(61) // Delay is optional because of this dependency
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		// Based off of the plugin by Clint Helfers, with permission.
		// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
		jQuery.fn.delay = function (time, type) {
			time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
			type = type || "fx";

			return this.queue(type, function (next, hooks) {
				var timeout = window.setTimeout(next, time);
				hooks.stop = function () {
					window.clearTimeout(timeout);
				};
			});
		};

		return jQuery.fn.delay;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(11), __webpack_require__(18), __webpack_require__(21), __webpack_require__(41), __webpack_require__(22), __webpack_require__(30), __webpack_require__(31), __webpack_require__(39), __webpack_require__(46), __webpack_require__(62), __webpack_require__(59), __webpack_require__(3), __webpack_require__(56), __webpack_require__(50)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, document, rcssNum, cssExpand, rnotwhite, isHidden, adjustCSS, defaultDisplay, dataPriv) {

		var fxNow,
		    timerId,
		    rfxtypes = /^(?:toggle|show|hide)$/,
		    rrun = /queueHooks$/;

		// Animations created synchronously will run synchronously
		function createFxNow() {
			window.setTimeout(function () {
				fxNow = undefined;
			});
			return fxNow = jQuery.now();
		}

		// Generate parameters to create a standard animation
		function genFx(type, includeWidth) {
			var which,
			    i = 0,
			    attrs = { height: type };

			// If we include width, step value is 1 to do all cssExpand values,
			// otherwise step value is 2 to skip over Left and Right
			includeWidth = includeWidth ? 1 : 0;
			for (; i < 4; i += 2 - includeWidth) {
				which = cssExpand[i];
				attrs["margin" + which] = attrs["padding" + which] = type;
			}

			if (includeWidth) {
				attrs.opacity = attrs.width = type;
			}

			return attrs;
		}

		function createTween(value, prop, animation) {
			var tween,
			    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
			    index = 0,
			    length = collection.length;
			for (; index < length; index++) {
				if (tween = collection[index].call(animation, prop, value)) {

					// We're done with this property
					return tween;
				}
			}
		}

		function defaultPrefilter(elem, props, opts) {
			/* jshint validthis: true */
			var prop,
			    value,
			    toggle,
			    tween,
			    hooks,
			    oldfire,
			    display,
			    checkDisplay,
			    anim = this,
			    orig = {},
			    style = elem.style,
			    hidden = elem.nodeType && isHidden(elem),
			    dataShow = dataPriv.get(elem, "fxshow");

			// Handle queue: false promises
			if (!opts.queue) {
				hooks = jQuery._queueHooks(elem, "fx");
				if (hooks.unqueued == null) {
					hooks.unqueued = 0;
					oldfire = hooks.empty.fire;
					hooks.empty.fire = function () {
						if (!hooks.unqueued) {
							oldfire();
						}
					};
				}
				hooks.unqueued++;

				anim.always(function () {

					// Ensure the complete handler is called before this completes
					anim.always(function () {
						hooks.unqueued--;
						if (!jQuery.queue(elem, "fx").length) {
							hooks.empty.fire();
						}
					});
				});
			}

			// Height/width overflow pass
			if (elem.nodeType === 1 && ("height" in props || "width" in props)) {

				// Make sure that nothing sneaks out
				// Record all 3 overflow attributes because IE9-10 do not
				// change the overflow attribute when overflowX and
				// overflowY are set to the same value
				opts.overflow = [style.overflow, style.overflowX, style.overflowY];

				// Set display property to inline-block for height/width
				// animations on inline elements that are having width/height animated
				display = jQuery.css(elem, "display");

				// Test default display if display is currently "none"
				checkDisplay = display === "none" ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;

				if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
					style.display = "inline-block";
				}
			}

			if (opts.overflow) {
				style.overflow = "hidden";
				anim.always(function () {
					style.overflow = opts.overflow[0];
					style.overflowX = opts.overflow[1];
					style.overflowY = opts.overflow[2];
				});
			}

			// show/hide pass
			for (prop in props) {
				value = props[prop];
				if (rfxtypes.exec(value)) {
					delete props[prop];
					toggle = toggle || value === "toggle";
					if (value === (hidden ? "hide" : "show")) {

						// If there is dataShow left over from a stopped hide or show
						// and we are going to proceed with show, we should pretend to be hidden
						if (value === "show" && dataShow && dataShow[prop] !== undefined) {
							hidden = true;
						} else {
							continue;
						}
					}
					orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);

					// Any non-fx value stops us from restoring the original display value
				} else {
					display = undefined;
				}
			}

			if (!jQuery.isEmptyObject(orig)) {
				if (dataShow) {
					if ("hidden" in dataShow) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access(elem, "fxshow", {});
				}

				// Store state if its toggle - enables .stop().toggle() to "reverse"
				if (toggle) {
					dataShow.hidden = !hidden;
				}
				if (hidden) {
					jQuery(elem).show();
				} else {
					anim.done(function () {
						jQuery(elem).hide();
					});
				}
				anim.done(function () {
					var prop;

					dataPriv.remove(elem, "fxshow");
					for (prop in orig) {
						jQuery.style(elem, prop, orig[prop]);
					}
				});
				for (prop in orig) {
					tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);

					if (!(prop in dataShow)) {
						dataShow[prop] = tween.start;
						if (hidden) {
							tween.end = tween.start;
							tween.start = prop === "width" || prop === "height" ? 1 : 0;
						}
					}
				}

				// If this is a noop like .hide().hide(), restore an overwritten display value
			} else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
				style.display = display;
			}
		}

		function propFilter(props, specialEasing) {
			var index, name, easing, value, hooks;

			// camelCase, specialEasing and expand cssHook pass
			for (index in props) {
				name = jQuery.camelCase(index);
				easing = specialEasing[name];
				value = props[index];
				if (jQuery.isArray(value)) {
					easing = value[1];
					value = props[index] = value[0];
				}

				if (index !== name) {
					props[name] = value;
					delete props[index];
				}

				hooks = jQuery.cssHooks[name];
				if (hooks && "expand" in hooks) {
					value = hooks.expand(value);
					delete props[name];

					// Not quite $.extend, this won't overwrite existing keys.
					// Reusing 'index' because we have the correct "name"
					for (index in value) {
						if (!(index in props)) {
							props[index] = value[index];
							specialEasing[index] = easing;
						}
					}
				} else {
					specialEasing[name] = easing;
				}
			}
		}

		function Animation(elem, properties, options) {
			var result,
			    stopped,
			    index = 0,
			    length = Animation.prefilters.length,
			    deferred = jQuery.Deferred().always(function () {

				// Don't match elem in the :animated selector
				delete tick.elem;
			}),
			    tick = function tick() {
				if (stopped) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
				    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),


				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				    percent = 1 - temp,
				    index = 0,
				    length = animation.tweens.length;

				for (; index < length; index++) {
					animation.tweens[index].run(percent);
				}

				deferred.notifyWith(elem, [animation, percent, remaining]);

				if (percent < 1 && length) {
					return remaining;
				} else {
					deferred.resolveWith(elem, [animation]);
					return false;
				}
			},
			    animation = deferred.promise({
				elem: elem,
				props: jQuery.extend({}, properties),
				opts: jQuery.extend(true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function createTween(prop, end) {
					var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
					animation.tweens.push(tween);
					return tween;
				},
				stop: function stop(gotoEnd) {
					var index = 0,


					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
					if (stopped) {
						return this;
					}
					stopped = true;
					for (; index < length; index++) {
						animation.tweens[index].run(1);
					}

					// Resolve when we played the last frame; otherwise, reject
					if (gotoEnd) {
						deferred.notifyWith(elem, [animation, 1, 0]);
						deferred.resolveWith(elem, [animation, gotoEnd]);
					} else {
						deferred.rejectWith(elem, [animation, gotoEnd]);
					}
					return this;
				}
			}),
			    props = animation.props;

			propFilter(props, animation.opts.specialEasing);

			for (; index < length; index++) {
				result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
				if (result) {
					if (jQuery.isFunction(result.stop)) {
						jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
					}
					return result;
				}
			}

			jQuery.map(props, createTween, animation);

			if (jQuery.isFunction(animation.opts.start)) {
				animation.opts.start.call(elem, animation);
			}

			jQuery.fx.timer(jQuery.extend(tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			}));

			// attach callbacks from options
			return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
		}

		jQuery.Animation = jQuery.extend(Animation, {
			tweeners: {
				"*": [function (prop, value) {
					var tween = this.createTween(prop, value);
					adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
					return tween;
				}]
			},

			tweener: function tweener(props, callback) {
				if (jQuery.isFunction(props)) {
					callback = props;
					props = ["*"];
				} else {
					props = props.match(rnotwhite);
				}

				var prop,
				    index = 0,
				    length = props.length;

				for (; index < length; index++) {
					prop = props[index];
					Animation.tweeners[prop] = Animation.tweeners[prop] || [];
					Animation.tweeners[prop].unshift(callback);
				}
			},

			prefilters: [defaultPrefilter],

			prefilter: function prefilter(callback, prepend) {
				if (prepend) {
					Animation.prefilters.unshift(callback);
				} else {
					Animation.prefilters.push(callback);
				}
			}
		});

		jQuery.speed = function (speed, easing, fn) {
			var opt = speed && (typeof speed === "undefined" ? "undefined" : _typeof(speed)) === "object" ? jQuery.extend({}, speed) : {
				complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
				duration: speed,
				easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
			};

			opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

			// Normalize opt.queue - true/undefined/null -> "fx"
			if (opt.queue == null || opt.queue === true) {
				opt.queue = "fx";
			}

			// Queueing
			opt.old = opt.complete;

			opt.complete = function () {
				if (jQuery.isFunction(opt.old)) {
					opt.old.call(this);
				}

				if (opt.queue) {
					jQuery.dequeue(this, opt.queue);
				}
			};

			return opt;
		};

		jQuery.fn.extend({
			fadeTo: function fadeTo(speed, to, easing, callback) {

				// Show any hidden elements after setting opacity to 0
				return this.filter(isHidden).css("opacity", 0).show()

				// Animate to the value specified
				.end().animate({ opacity: to }, speed, easing, callback);
			},
			animate: function animate(prop, speed, easing, callback) {
				var empty = jQuery.isEmptyObject(prop),
				    optall = jQuery.speed(speed, easing, callback),
				    doAnimation = function doAnimation() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation(this, jQuery.extend({}, prop), optall);

					// Empty animations, or finishing resolves immediately
					if (empty || dataPriv.get(this, "finish")) {
						anim.stop(true);
					}
				};
				doAnimation.finish = doAnimation;

				return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
			},
			stop: function stop(type, clearQueue, gotoEnd) {
				var stopQueue = function stopQueue(hooks) {
					var stop = hooks.stop;
					delete hooks.stop;
					stop(gotoEnd);
				};

				if (typeof type !== "string") {
					gotoEnd = clearQueue;
					clearQueue = type;
					type = undefined;
				}
				if (clearQueue && type !== false) {
					this.queue(type || "fx", []);
				}

				return this.each(function () {
					var dequeue = true,
					    index = type != null && type + "queueHooks",
					    timers = jQuery.timers,
					    data = dataPriv.get(this);

					if (index) {
						if (data[index] && data[index].stop) {
							stopQueue(data[index]);
						}
					} else {
						for (index in data) {
							if (data[index] && data[index].stop && rrun.test(index)) {
								stopQueue(data[index]);
							}
						}
					}

					for (index = timers.length; index--;) {
						if (timers[index].elem === this && (type == null || timers[index].queue === type)) {

							timers[index].anim.stop(gotoEnd);
							dequeue = false;
							timers.splice(index, 1);
						}
					}

					// Start the next in the queue if the last step wasn't forced.
					// Timers currently will call their complete callbacks, which
					// will dequeue but only if they were gotoEnd.
					if (dequeue || !gotoEnd) {
						jQuery.dequeue(this, type);
					}
				});
			},
			finish: function finish(type) {
				if (type !== false) {
					type = type || "fx";
				}
				return this.each(function () {
					var index,
					    data = dataPriv.get(this),
					    queue = data[type + "queue"],
					    hooks = data[type + "queueHooks"],
					    timers = jQuery.timers,
					    length = queue ? queue.length : 0;

					// Enable finishing flag on private data
					data.finish = true;

					// Empty the queue first
					jQuery.queue(this, type, []);

					if (hooks && hooks.stop) {
						hooks.stop.call(this, true);
					}

					// Look for any active animations, and finish them
					for (index = timers.length; index--;) {
						if (timers[index].elem === this && timers[index].queue === type) {
							timers[index].anim.stop(true);
							timers.splice(index, 1);
						}
					}

					// Look for any animations in the old queue and finish them
					for (index = 0; index < length; index++) {
						if (queue[index] && queue[index].finish) {
							queue[index].finish.call(this);
						}
					}

					// Turn off finishing flag
					delete data.finish;
				});
			}
		});

		jQuery.each(["toggle", "show", "hide"], function (i, name) {
			var cssFn = jQuery.fn[name];
			jQuery.fn[name] = function (speed, easing, callback) {
				return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
			};
		});

		// Generate shortcuts for custom animations
		jQuery.each({
			slideDown: genFx("show"),
			slideUp: genFx("hide"),
			slideToggle: genFx("toggle"),
			fadeIn: { opacity: "show" },
			fadeOut: { opacity: "hide" },
			fadeToggle: { opacity: "toggle" }
		}, function (name, props) {
			jQuery.fn[name] = function (speed, easing, callback) {
				return this.animate(props, speed, easing, callback);
			};
		});

		jQuery.timers = [];
		jQuery.fx.tick = function () {
			var timer,
			    i = 0,
			    timers = jQuery.timers;

			fxNow = jQuery.now();

			for (; i < timers.length; i++) {
				timer = timers[i];

				// Checks the timer has not already been removed
				if (!timer() && timers[i] === timer) {
					timers.splice(i--, 1);
				}
			}

			if (!timers.length) {
				jQuery.fx.stop();
			}
			fxNow = undefined;
		};

		jQuery.fx.timer = function (timer) {
			jQuery.timers.push(timer);
			if (timer()) {
				jQuery.fx.start();
			} else {
				jQuery.timers.pop();
			}
		};

		jQuery.fx.interval = 13;
		jQuery.fx.start = function () {
			if (!timerId) {
				timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
			}
		};

		jQuery.fx.stop = function () {
			window.clearInterval(timerId);

			timerId = null;
		};

		jQuery.fx.speeds = {
			slow: 600,
			fast: 200,

			// Default speed
			_default: 400
		};

		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		function Tween(elem, options, prop, end, easing) {
			return new Tween.prototype.init(elem, options, prop, end, easing);
		}
		jQuery.Tween = Tween;

		Tween.prototype = {
			constructor: Tween,
			init: function init(elem, options, prop, end, easing, unit) {
				this.elem = elem;
				this.prop = prop;
				this.easing = easing || jQuery.easing._default;
				this.options = options;
				this.start = this.now = this.cur();
				this.end = end;
				this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
			},
			cur: function cur() {
				var hooks = Tween.propHooks[this.prop];

				return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
			},
			run: function run(percent) {
				var eased,
				    hooks = Tween.propHooks[this.prop];

				if (this.options.duration) {
					this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
				} else {
					this.pos = eased = percent;
				}
				this.now = (this.end - this.start) * eased + this.start;

				if (this.options.step) {
					this.options.step.call(this.elem, this.now, this);
				}

				if (hooks && hooks.set) {
					hooks.set(this);
				} else {
					Tween.propHooks._default.set(this);
				}
				return this;
			}
		};

		Tween.prototype.init.prototype = Tween.prototype;

		Tween.propHooks = {
			_default: {
				get: function get(tween) {
					var result;

					// Use a property on the element directly when it is not a DOM element,
					// or when there is no matching style property that exists.
					if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
						return tween.elem[tween.prop];
					}

					// Passing an empty string as a 3rd parameter to .css will automatically
					// attempt a parseFloat and fallback to a string if the parse fails.
					// Simple values such as "10px" are parsed to Float;
					// complex values such as "rotate(1rad)" are returned as-is.
					result = jQuery.css(tween.elem, tween.prop, "");

					// Empty strings, null, undefined and "auto" are converted to 0.
					return !result || result === "auto" ? 0 : result;
				},
				set: function set(tween) {

					// Use step hook for back compat.
					// Use cssHook if its there.
					// Use .style if available and use plain properties where available.
					if (jQuery.fx.step[tween.prop]) {
						jQuery.fx.step[tween.prop](tween);
					} else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
						jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
					} else {
						tween.elem[tween.prop] = tween.now;
					}
				}
			}
		};

		// Support: IE9
		// Panic based approach to setting things on disconnected nodes
		Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
			set: function set(tween) {
				if (tween.elem.nodeType && tween.elem.parentNode) {
					tween.elem[tween.prop] = tween.now;
				}
			}
		};

		jQuery.easing = {
			linear: function linear(p) {
				return p;
			},
			swing: function swing(p) {
				return 0.5 - Math.cos(p * Math.PI) / 2;
			},
			_default: "swing"
		};

		jQuery.fx = Tween.prototype.init;

		// Back Compat <1.8 extension point
		jQuery.fx.step = {};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(64), __webpack_require__(66), __webpack_require__(67), __webpack_require__(68)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		// Return jQuery for attributes-only inclusion
		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(16), __webpack_require__(65), __webpack_require__(41), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, access, support, rnotwhite) {

		var boolHook,
		    attrHandle = jQuery.expr.attrHandle;

		jQuery.fn.extend({
			attr: function attr(name, value) {
				return access(this, jQuery.attr, name, value, arguments.length > 1);
			},

			removeAttr: function removeAttr(name) {
				return this.each(function () {
					jQuery.removeAttr(this, name);
				});
			}
		});

		jQuery.extend({
			attr: function attr(elem, name, value) {
				var ret,
				    hooks,
				    nType = elem.nodeType;

				// Don't get/set attributes on text, comment and attribute nodes
				if (nType === 3 || nType === 8 || nType === 2) {
					return;
				}

				// Fallback to prop when attributes are not supported
				if (typeof elem.getAttribute === "undefined") {
					return jQuery.prop(elem, name, value);
				}

				// All attributes are lowercase
				// Grab necessary hook if one is defined
				if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
					name = name.toLowerCase();
					hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
				}

				if (value !== undefined) {
					if (value === null) {
						jQuery.removeAttr(elem, name);
						return;
					}

					if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
						return ret;
					}

					elem.setAttribute(name, value + "");
					return value;
				}

				if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
					return ret;
				}

				ret = jQuery.find.attr(elem, name);

				// Non-existent attributes return null, we normalize to undefined
				return ret == null ? undefined : ret;
			},

			attrHooks: {
				type: {
					set: function set(elem, value) {
						if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
							var val = elem.value;
							elem.setAttribute("type", value);
							if (val) {
								elem.value = val;
							}
							return value;
						}
					}
				}
			},

			removeAttr: function removeAttr(elem, value) {
				var name,
				    propName,
				    i = 0,
				    attrNames = value && value.match(rnotwhite);

				if (attrNames && elem.nodeType === 1) {
					while (name = attrNames[i++]) {
						propName = jQuery.propFix[name] || name;

						// Boolean attributes get special treatment (#10870)
						if (jQuery.expr.match.bool.test(name)) {

							// Set corresponding property to false
							elem[propName] = false;
						}

						elem.removeAttribute(name);
					}
				}
			}
		});

		// Hooks for boolean attributes
		boolHook = {
			set: function set(elem, value, name) {
				if (value === false) {

					// Remove boolean attributes when set to false
					jQuery.removeAttr(elem, name);
				} else {
					elem.setAttribute(name, name);
				}
				return name;
			}
		};
		jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
			var getter = attrHandle[name] || jQuery.find.attr;

			attrHandle[name] = function (elem, name, isXML) {
				var ret, handle;
				if (!isXML) {

					// Avoid an infinite loop by temporarily removing this function from the getter
					handle = attrHandle[name];
					attrHandle[name] = ret;
					ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
					attrHandle[name] = handle;
				}
				return ret;
			};
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(11), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function (document, support) {

		(function () {
			var input = document.createElement("input"),
			    select = document.createElement("select"),
			    opt = select.appendChild(document.createElement("option"));

			input.type = "checkbox";

			// Support: iOS<=5.1, Android<=4.2+
			// Default value for a checkbox should be "on"
			support.checkOn = input.value !== "";

			// Support: IE<=11+
			// Must access selectedIndex to make default options select
			support.optSelected = opt.selected;

			// Support: Android<=2.3
			// Options inside disabled selects are incorrectly marked as disabled
			select.disabled = true;
			support.optDisabled = !opt.disabled;

			// Support: IE<=11+
			// An input loses its value after becoming a radio
			input = document.createElement("input");
			input.value = "t";
			input.type = "radio";
			support.radioValue = input.value === "t";
		})();

		return support;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(16), __webpack_require__(65), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, access, support) {

		var rfocusable = /^(?:input|select|textarea|button)$/i,
		    rclickable = /^(?:a|area)$/i;

		jQuery.fn.extend({
			prop: function prop(name, value) {
				return access(this, jQuery.prop, name, value, arguments.length > 1);
			},

			removeProp: function removeProp(name) {
				return this.each(function () {
					delete this[jQuery.propFix[name] || name];
				});
			}
		});

		jQuery.extend({
			prop: function prop(elem, name, value) {
				var ret,
				    hooks,
				    nType = elem.nodeType;

				// Don't get/set properties on text, comment and attribute nodes
				if (nType === 3 || nType === 8 || nType === 2) {
					return;
				}

				if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

					// Fix name and attach hooks
					name = jQuery.propFix[name] || name;
					hooks = jQuery.propHooks[name];
				}

				if (value !== undefined) {
					if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
						return ret;
					}

					return elem[name] = value;
				}

				if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
					return ret;
				}

				return elem[name];
			},

			propHooks: {
				tabIndex: {
					get: function get(elem) {

						// elem.tabIndex doesn't always return the
						// correct value when it hasn't been explicitly set
						// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
						// Use proper attribute retrieval(#12072)
						var tabindex = jQuery.find.attr(elem, "tabindex");

						return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
					}
				}
			},

			propFix: {
				"for": "htmlFor",
				"class": "className"
			}
		});

		// Support: IE <=11 only
		// Accessing the selectedIndex property
		// forces the browser to respect setting selected
		// on the option
		// The getter ensures a default option is selected
		// when in an optgroup
		if (!support.optSelected) {
			jQuery.propHooks.selected = {
				get: function get(elem) {
					var parent = elem.parentNode;
					if (parent && parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
					return null;
				},
				set: function set(elem) {
					var parent = elem.parentNode;
					if (parent) {
						parent.selectedIndex;

						if (parent.parentNode) {
							parent.parentNode.selectedIndex;
						}
					}
				}
			};
		}

		jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
			jQuery.propFix[this.toLowerCase()] = this;
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(41), __webpack_require__(39), __webpack_require__(46)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, rnotwhite, dataPriv) {

		var rclass = /[\t\r\n\f]/g;

		function getClass(elem) {
			return elem.getAttribute && elem.getAttribute("class") || "";
		}

		jQuery.fn.extend({
			addClass: function addClass(value) {
				var classes,
				    elem,
				    cur,
				    curValue,
				    clazz,
				    j,
				    finalValue,
				    i = 0;

				if (jQuery.isFunction(value)) {
					return this.each(function (j) {
						jQuery(this).addClass(value.call(this, j, getClass(this)));
					});
				}

				if (typeof value === "string" && value) {
					classes = value.match(rnotwhite) || [];

					while (elem = this[i++]) {
						curValue = getClass(elem);
						cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

						if (cur) {
							j = 0;
							while (clazz = classes[j++]) {
								if (cur.indexOf(" " + clazz + " ") < 0) {
									cur += clazz + " ";
								}
							}

							// Only assign if different to avoid unneeded rendering.
							finalValue = jQuery.trim(cur);
							if (curValue !== finalValue) {
								elem.setAttribute("class", finalValue);
							}
						}
					}
				}

				return this;
			},

			removeClass: function removeClass(value) {
				var classes,
				    elem,
				    cur,
				    curValue,
				    clazz,
				    j,
				    finalValue,
				    i = 0;

				if (jQuery.isFunction(value)) {
					return this.each(function (j) {
						jQuery(this).removeClass(value.call(this, j, getClass(this)));
					});
				}

				if (!arguments.length) {
					return this.attr("class", "");
				}

				if (typeof value === "string" && value) {
					classes = value.match(rnotwhite) || [];

					while (elem = this[i++]) {
						curValue = getClass(elem);

						// This expression is here for better compressibility (see addClass)
						cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

						if (cur) {
							j = 0;
							while (clazz = classes[j++]) {

								// Remove *all* instances
								while (cur.indexOf(" " + clazz + " ") > -1) {
									cur = cur.replace(" " + clazz + " ", " ");
								}
							}

							// Only assign if different to avoid unneeded rendering.
							finalValue = jQuery.trim(cur);
							if (curValue !== finalValue) {
								elem.setAttribute("class", finalValue);
							}
						}
					}
				}

				return this;
			},

			toggleClass: function toggleClass(value, stateVal) {
				var type = typeof value === "undefined" ? "undefined" : _typeof(value);

				if (typeof stateVal === "boolean" && type === "string") {
					return stateVal ? this.addClass(value) : this.removeClass(value);
				}

				if (jQuery.isFunction(value)) {
					return this.each(function (i) {
						jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
					});
				}

				return this.each(function () {
					var className, i, self, classNames;

					if (type === "string") {

						// Toggle individual class names
						i = 0;
						self = jQuery(this);
						classNames = value.match(rnotwhite) || [];

						while (className = classNames[i++]) {

							// Check each className given, space separated list
							if (self.hasClass(className)) {
								self.removeClass(className);
							} else {
								self.addClass(className);
							}
						}

						// Toggle whole class name
					} else if (value === undefined || type === "boolean") {
						className = getClass(this);
						if (className) {

							// Store className if set
							dataPriv.set(this, "__className__", className);
						}

						// If the element has a class name or if we're passed `false`,
						// then remove the whole classname (if there was one, the above saved it).
						// Otherwise bring back whatever was previously saved (if anything),
						// falling back to the empty string if nothing was stored.
						if (this.setAttribute) {
							this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
						}
					}
				});
			},

			hasClass: function hasClass(selector) {
				var className,
				    elem,
				    i = 0;

				className = " " + selector + " ";
				while (elem = this[i++]) {
					if (elem.nodeType === 1 && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) {
						return true;
					}
				}

				return false;
			}
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(65), __webpack_require__(46)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, support) {

		var rreturn = /\r/g,
		    rspaces = /[\x20\t\r\n\f]+/g;

		jQuery.fn.extend({
			val: function val(value) {
				var hooks,
				    ret,
				    isFunction,
				    elem = this[0];

				if (!arguments.length) {
					if (elem) {
						hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

						if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
							return ret;
						}

						ret = elem.value;

						return typeof ret === "string" ?

						// Handle most common string cases
						ret.replace(rreturn, "") :

						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
					}

					return;
				}

				isFunction = jQuery.isFunction(value);

				return this.each(function (i) {
					var val;

					if (this.nodeType !== 1) {
						return;
					}

					if (isFunction) {
						val = value.call(this, i, jQuery(this).val());
					} else {
						val = value;
					}

					// Treat null/undefined as ""; convert numbers to string
					if (val == null) {
						val = "";
					} else if (typeof val === "number") {
						val += "";
					} else if (jQuery.isArray(val)) {
						val = jQuery.map(val, function (value) {
							return value == null ? "" : value + "";
						});
					}

					hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

					// If set returns undefined, fall back to normal setting
					if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
						this.value = val;
					}
				});
			}
		});

		jQuery.extend({
			valHooks: {
				option: {
					get: function get(elem) {

						var val = jQuery.find.attr(elem, "value");
						return val != null ? val :

						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						jQuery.trim(jQuery.text(elem)).replace(rspaces, " ");
					}
				},
				select: {
					get: function get(elem) {
						var value,
						    option,
						    options = elem.options,
						    index = elem.selectedIndex,
						    one = elem.type === "select-one" || index < 0,
						    values = one ? null : [],
						    max = one ? index + 1 : options.length,
						    i = index < 0 ? max : one ? index : 0;

						// Loop through all the selected options
						for (; i < max; i++) {
							option = options[i];

							// IE8-9 doesn't update selected after form reset (#2551)
							if ((option.selected || i === index) && (

							// Don't return options that are disabled or in a disabled optgroup
							support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {

								// Get the specific value for the option
								value = jQuery(option).val();

								// We don't need an array for one selects
								if (one) {
									return value;
								}

								// Multi-Selects return an array
								values.push(value);
							}
						}

						return values;
					},

					set: function set(elem, value) {
						var optionSet,
						    option,
						    options = elem.options,
						    values = jQuery.makeArray(value),
						    i = options.length;

						while (i--) {
							option = options[i];
							if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
								optionSet = true;
							}
						}

						// Force browsers to behave consistently when non-matching value is set
						if (!optionSet) {
							elem.selectedIndex = -1;
						}
						return values;
					}
				}
			}
		});

		// Radios and checkboxes getter/setter
		jQuery.each(["radio", "checkbox"], function () {
			jQuery.valHooks[this] = {
				set: function set(elem, value) {
					if (jQuery.isArray(value)) {
						return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
					}
				}
			};
			if (!support.checkOn) {
				jQuery.valHooks[this].get = function (elem) {
					return elem.getAttribute("value") === null ? "on" : elem.value;
				};
			}
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(53), __webpack_require__(70)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function (i, name) {

			// Handle event binding
			jQuery.fn[name] = function (data, fn) {
				return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
			};
		});

		jQuery.fn.extend({
			hover: function hover(fnOver, fnOut) {
				return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
			}
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(11), __webpack_require__(39), __webpack_require__(42), __webpack_require__(14), __webpack_require__(53)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, document, dataPriv, acceptData, hasOwn) {

		var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

		jQuery.extend(jQuery.event, {

			trigger: function trigger(event, data, elem, onlyHandlers) {

				var i,
				    cur,
				    tmp,
				    bubbleType,
				    ontype,
				    handle,
				    special,
				    eventPath = [elem || document],
				    type = hasOwn.call(event, "type") ? event.type : event,
				    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

				cur = tmp = elem = elem || document;

				// Don't do events on text and comment nodes
				if (elem.nodeType === 3 || elem.nodeType === 8) {
					return;
				}

				// focus/blur morphs to focusin/out; ensure we're not firing them right now
				if (rfocusMorph.test(type + jQuery.event.triggered)) {
					return;
				}

				if (type.indexOf(".") > -1) {

					// Namespaced trigger; create a regexp to match event type in handle()
					namespaces = type.split(".");
					type = namespaces.shift();
					namespaces.sort();
				}
				ontype = type.indexOf(":") < 0 && "on" + type;

				// Caller can pass in a jQuery.Event object, Object, or just an event type string
				event = event[jQuery.expando] ? event : new jQuery.Event(type, (typeof event === "undefined" ? "undefined" : _typeof(event)) === "object" && event);

				// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
				event.isTrigger = onlyHandlers ? 2 : 3;
				event.namespace = namespaces.join(".");
				event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

				// Clean up the event in case it is being reused
				event.result = undefined;
				if (!event.target) {
					event.target = elem;
				}

				// Clone any incoming data and prepend the event, creating the handler arg list
				data = data == null ? [event] : jQuery.makeArray(data, [event]);

				// Allow special events to draw outside the lines
				special = jQuery.event.special[type] || {};
				if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
					return;
				}

				// Determine event propagation path in advance, per W3C events spec (#9951)
				// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
				if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

					bubbleType = special.delegateType || type;
					if (!rfocusMorph.test(bubbleType + type)) {
						cur = cur.parentNode;
					}
					for (; cur; cur = cur.parentNode) {
						eventPath.push(cur);
						tmp = cur;
					}

					// Only add window if we got to document (e.g., not plain obj or detached DOM)
					if (tmp === (elem.ownerDocument || document)) {
						eventPath.push(tmp.defaultView || tmp.parentWindow || window);
					}
				}

				// Fire handlers on the event path
				i = 0;
				while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

					event.type = i > 1 ? bubbleType : special.bindType || type;

					// jQuery handler
					handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
					if (handle) {
						handle.apply(cur, data);
					}

					// Native handler
					handle = ontype && cur[ontype];
					if (handle && handle.apply && acceptData(cur)) {
						event.result = handle.apply(cur, data);
						if (event.result === false) {
							event.preventDefault();
						}
					}
				}
				event.type = type;

				// If nobody prevented the default action, do it now
				if (!onlyHandlers && !event.isDefaultPrevented()) {

					if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {

						// Call a native DOM method on the target with the same name name as the event.
						// Don't do default actions on window, that's where global variables be (#6170)
						if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

							// Don't re-trigger an onFOO event when we call its FOO() method
							tmp = elem[ontype];

							if (tmp) {
								elem[ontype] = null;
							}

							// Prevent re-triggering of the same event, since we already bubbled it above
							jQuery.event.triggered = type;
							elem[type]();
							jQuery.event.triggered = undefined;

							if (tmp) {
								elem[ontype] = tmp;
							}
						}
					}
				}

				return event.result;
			},

			// Piggyback on a donor event to simulate a different one
			// Used only for `focus(in | out)` events
			simulate: function simulate(type, elem, event) {
				var e = jQuery.extend(new jQuery.Event(), event, {
					type: type,
					isSimulated: true
				});

				jQuery.event.trigger(e, null, elem);
			}

		});

		jQuery.fn.extend({

			trigger: function trigger(type, data) {
				return this.each(function () {
					jQuery.event.trigger(type, data, this);
				});
			},
			triggerHandler: function triggerHandler(type, data) {
				var elem = this[0];
				if (elem) {
					return jQuery.event.trigger(type, data, elem, true);
				}
			}
		});

		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(39), __webpack_require__(72), __webpack_require__(53), __webpack_require__(70)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, dataPriv, support) {

		// Support: Firefox
		// Firefox doesn't have focus(in | out) events
		// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
		//
		// Support: Chrome, Safari
		// focus(in | out) events fire after focus & blur events,
		// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
		// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
		if (!support.focusin) {
			jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

				// Attach a single capturing handler on the document while someone wants focusin/focusout
				var handler = function handler(event) {
					jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
				};

				jQuery.event.special[fix] = {
					setup: function setup() {
						var doc = this.ownerDocument || this,
						    attaches = dataPriv.access(doc, fix);

						if (!attaches) {
							doc.addEventListener(orig, handler, true);
						}
						dataPriv.access(doc, fix, (attaches || 0) + 1);
					},
					teardown: function teardown() {
						var doc = this.ownerDocument || this,
						    attaches = dataPriv.access(doc, fix) - 1;

						if (!attaches) {
							doc.removeEventListener(orig, handler, true);
							dataPriv.remove(doc, fix);
						} else {
							dataPriv.access(doc, fix, attaches);
						}
					}
				};
			});
		}

		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function (support) {

		support.focusin = "onfocusin" in window;

		return support;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(74)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		jQuery._evalUrl = function (url) {
			return jQuery.ajax({
				url: url,

				// Make this explicit, since user can override this through ajaxSetup (#11264)
				type: "GET",
				dataType: "script",
				async: false,
				global: false,
				"throws": true
			});
		};

		return jQuery._evalUrl;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(11), __webpack_require__(41), __webpack_require__(75), __webpack_require__(76), __webpack_require__(77), __webpack_require__(46), __webpack_require__(78), __webpack_require__(79), __webpack_require__(70), __webpack_require__(56)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, document, rnotwhite, location, nonce, rquery) {

		var rhash = /#.*$/,
		    rts = /([?&])_=[^&]*/,
		    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,


		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		    rnoContent = /^(?:GET|HEAD)$/,
		    rprotocol = /^\/\//,


		/* Prefilters
	  * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	  * 2) These are called:
	  *    - BEFORE asking for a transport
	  *    - AFTER param serialization (s.data is a string if s.processData is true)
	  * 3) key is the dataType
	  * 4) the catchall symbol "*" can be used
	  * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	  */
		prefilters = {},


		/* Transports bindings
	  * 1) key is the dataType
	  * 2) the catchall symbol "*" can be used
	  * 3) selection will start with transport dataType and THEN go to "*" if needed
	  */
		transports = {},


		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat("*"),


		// Anchor tag for parsing the document origin
		originAnchor = document.createElement("a");
		originAnchor.href = location.href;

		// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
		function addToPrefiltersOrTransports(structure) {

			// dataTypeExpression is optional and defaults to "*"
			return function (dataTypeExpression, func) {

				if (typeof dataTypeExpression !== "string") {
					func = dataTypeExpression;
					dataTypeExpression = "*";
				}

				var dataType,
				    i = 0,
				    dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

				if (jQuery.isFunction(func)) {

					// For each dataType in the dataTypeExpression
					while (dataType = dataTypes[i++]) {

						// Prepend if requested
						if (dataType[0] === "+") {
							dataType = dataType.slice(1) || "*";
							(structure[dataType] = structure[dataType] || []).unshift(func);

							// Otherwise append
						} else {
							(structure[dataType] = structure[dataType] || []).push(func);
						}
					}
				}
			};
		}

		// Base inspection function for prefilters and transports
		function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

			var inspected = {},
			    seekingTransport = structure === transports;

			function inspect(dataType) {
				var selected;
				inspected[dataType] = true;
				jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
					var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
					if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {

						options.dataTypes.unshift(dataTypeOrTransport);
						inspect(dataTypeOrTransport);
						return false;
					} else if (seekingTransport) {
						return !(selected = dataTypeOrTransport);
					}
				});
				return selected;
			}

			return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
		}

		// A special extend for ajax options
		// that takes "flat" options (not to be deep extended)
		// Fixes #9887
		function ajaxExtend(target, src) {
			var key,
			    deep,
			    flatOptions = jQuery.ajaxSettings.flatOptions || {};

			for (key in src) {
				if (src[key] !== undefined) {
					(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
				}
			}
			if (deep) {
				jQuery.extend(true, target, deep);
			}

			return target;
		}

		/* Handles responses to an ajax request:
	  * - finds the right dataType (mediates between content-type and expected dataType)
	  * - returns the corresponding response
	  */
		function ajaxHandleResponses(s, jqXHR, responses) {

			var ct,
			    type,
			    finalDataType,
			    firstDataType,
			    contents = s.contents,
			    dataTypes = s.dataTypes;

			// Remove auto dataType and get content-type in the process
			while (dataTypes[0] === "*") {
				dataTypes.shift();
				if (ct === undefined) {
					ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
				}
			}

			// Check if we're dealing with a known content-type
			if (ct) {
				for (type in contents) {
					if (contents[type] && contents[type].test(ct)) {
						dataTypes.unshift(type);
						break;
					}
				}
			}

			// Check to see if we have a response for the expected dataType
			if (dataTypes[0] in responses) {
				finalDataType = dataTypes[0];
			} else {

				// Try convertible dataTypes
				for (type in responses) {
					if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
						finalDataType = type;
						break;
					}
					if (!firstDataType) {
						firstDataType = type;
					}
				}

				// Or just use first one
				finalDataType = finalDataType || firstDataType;
			}

			// If we found a dataType
			// We add the dataType to the list if needed
			// and return the corresponding response
			if (finalDataType) {
				if (finalDataType !== dataTypes[0]) {
					dataTypes.unshift(finalDataType);
				}
				return responses[finalDataType];
			}
		}

		/* Chain conversions given the request and the original response
	  * Also sets the responseXXX fields on the jqXHR instance
	  */
		function ajaxConvert(s, response, jqXHR, isSuccess) {
			var conv2,
			    current,
			    conv,
			    tmp,
			    prev,
			    converters = {},


			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

			// Create converters map with lowercased keys
			if (dataTypes[1]) {
				for (conv in s.converters) {
					converters[conv.toLowerCase()] = s.converters[conv];
				}
			}

			current = dataTypes.shift();

			// Convert to each sequential dataType
			while (current) {

				if (s.responseFields[current]) {
					jqXHR[s.responseFields[current]] = response;
				}

				// Apply the dataFilter if provided
				if (!prev && isSuccess && s.dataFilter) {
					response = s.dataFilter(response, s.dataType);
				}

				prev = current;
				current = dataTypes.shift();

				if (current) {

					// There's only work to do if current dataType is non-auto
					if (current === "*") {

						current = prev;

						// Convert response if prev dataType is non-auto and differs from current
					} else if (prev !== "*" && prev !== current) {

						// Seek a direct converter
						conv = converters[prev + " " + current] || converters["* " + current];

						// If none found, seek a pair
						if (!conv) {
							for (conv2 in converters) {

								// If conv2 outputs current
								tmp = conv2.split(" ");
								if (tmp[1] === current) {

									// If prev can be converted to accepted input
									conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
									if (conv) {

										// Condense equivalence converters
										if (conv === true) {
											conv = converters[conv2];

											// Otherwise, insert the intermediate dataType
										} else if (converters[conv2] !== true) {
											current = tmp[0];
											dataTypes.unshift(tmp[1]);
										}
										break;
									}
								}
							}
						}

						// Apply converter (if not an equivalence)
						if (conv !== true) {

							// Unless errors are allowed to bubble, catch and return them
							if (conv && s.throws) {
								response = conv(response);
							} else {
								try {
									response = conv(response);
								} catch (e) {
									return {
										state: "parsererror",
										error: conv ? e : "No conversion from " + prev + " to " + current
									};
								}
							}
						}
					}
				}
			}

			return { state: "success", data: response };
		}

		jQuery.extend({

			// Counter for holding the number of active queries
			active: 0,

			// Last-Modified header cache for next request
			lastModified: {},
			etag: {},

			ajaxSettings: {
				url: location.href,
				type: "GET",
				isLocal: rlocalProtocol.test(location.protocol),
				global: true,
				processData: true,
				async: true,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				/*
	   timeout: 0,
	   data: null,
	   dataType: null,
	   username: null,
	   password: null,
	   cache: null,
	   throws: false,
	   traditional: false,
	   headers: {},
	   */

				accepts: {
					"*": allTypes,
					text: "text/plain",
					html: "text/html",
					xml: "application/xml, text/xml",
					json: "application/json, text/javascript"
				},

				contents: {
					xml: /\bxml\b/,
					html: /\bhtml/,
					json: /\bjson\b/
				},

				responseFields: {
					xml: "responseXML",
					text: "responseText",
					json: "responseJSON"
				},

				// Data converters
				// Keys separate source (or catchall "*") and destination types with a single space
				converters: {

					// Convert anything to text
					"* text": String,

					// Text to html (true = no transformation)
					"text html": true,

					// Evaluate text as a json expression
					"text json": jQuery.parseJSON,

					// Parse text as xml
					"text xml": jQuery.parseXML
				},

				// For options that shouldn't be deep extended:
				// you can add your own custom options here if
				// and when you create one that shouldn't be
				// deep extended (see ajaxExtend)
				flatOptions: {
					url: true,
					context: true
				}
			},

			// Creates a full fledged settings object into target
			// with both ajaxSettings and settings fields.
			// If target is omitted, writes into ajaxSettings.
			ajaxSetup: function ajaxSetup(target, settings) {
				return settings ?

				// Building a settings object
				ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

				// Extending ajaxSettings
				ajaxExtend(jQuery.ajaxSettings, target);
			},

			ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
			ajaxTransport: addToPrefiltersOrTransports(transports),

			// Main method
			ajax: function ajax(url, options) {

				// If url is an object, simulate pre-1.5 signature
				if ((typeof url === "undefined" ? "undefined" : _typeof(url)) === "object") {
					options = url;
					url = undefined;
				}

				// Force options to be an object
				options = options || {};

				var transport,


				// URL without anti-cache param
				cacheURL,


				// Response headers
				responseHeadersString,
				    responseHeaders,


				// timeout handle
				timeoutTimer,


				// Url cleanup var
				urlAnchor,


				// To know if global events are to be dispatched
				fireGlobals,


				// Loop variable
				i,


				// Create the final options object
				s = jQuery.ajaxSetup({}, options),


				// Callbacks context
				callbackContext = s.context || s,


				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,


				// Deferreds
				deferred = jQuery.Deferred(),
				    completeDeferred = jQuery.Callbacks("once memory"),


				// Status-dependent callbacks
				_statusCode = s.statusCode || {},


				// Headers (they are sent all at once)
				requestHeaders = {},
				    requestHeadersNames = {},


				// The jqXHR state
				state = 0,


				// Default abort message
				strAbort = "canceled",


				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function getResponseHeader(key) {
						var match;
						if (state === 2) {
							if (!responseHeaders) {
								responseHeaders = {};
								while (match = rheaders.exec(responseHeadersString)) {
									responseHeaders[match[1].toLowerCase()] = match[2];
								}
							}
							match = responseHeaders[key.toLowerCase()];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function getAllResponseHeaders() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function setRequestHeader(name, value) {
						var lname = name.toLowerCase();
						if (!state) {
							name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
							requestHeaders[name] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function overrideMimeType(type) {
						if (!state) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function statusCode(map) {
						var code;
						if (map) {
							if (state < 2) {
								for (code in map) {

									// Lazy-add the new callback in a way that preserves old ones
									_statusCode[code] = [_statusCode[code], map[code]];
								}
							} else {

								// Execute the appropriate callbacks
								jqXHR.always(map[jqXHR.status]);
							}
						}
						return this;
					},

					// Cancel the request
					abort: function abort(statusText) {
						var finalText = statusText || strAbort;
						if (transport) {
							transport.abort(finalText);
						}
						done(0, finalText);
						return this;
					}
				};

				// Attach deferreds
				deferred.promise(jqXHR).complete = completeDeferred.add;
				jqXHR.success = jqXHR.done;
				jqXHR.error = jqXHR.fail;

				// Remove hash character (#7531: and string promotion)
				// Add protocol if not provided (prefilters might expect it)
				// Handle falsy url in the settings object (#10093: consistency with old signature)
				// We also use the url parameter if available
				s.url = ((url || s.url || location.href) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//");

				// Alias method option to type as per ticket #12004
				s.type = options.method || options.type || s.method || s.type;

				// Extract dataTypes list
				s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

				// A cross-domain request is in order when the origin doesn't match the current origin.
				if (s.crossDomain == null) {
					urlAnchor = document.createElement("a");

					// Support: IE8-11+
					// IE throws exception if url is malformed, e.g. http://example.com:80x/
					try {
						urlAnchor.href = s.url;

						// Support: IE8-11+
						// Anchor's host property isn't correctly set when s.url is relative
						urlAnchor.href = urlAnchor.href;
						s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
					} catch (e) {

						// If there is an error parsing the URL, assume it is crossDomain,
						// it can be rejected by the transport if it is invalid
						s.crossDomain = true;
					}
				}

				// Convert data if not already a string
				if (s.data && s.processData && typeof s.data !== "string") {
					s.data = jQuery.param(s.data, s.traditional);
				}

				// Apply prefilters
				inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

				// If request was aborted inside a prefilter, stop there
				if (state === 2) {
					return jqXHR;
				}

				// We can fire global events as of now if asked to
				// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
				fireGlobals = jQuery.event && s.global;

				// Watch for a new set of requests
				if (fireGlobals && jQuery.active++ === 0) {
					jQuery.event.trigger("ajaxStart");
				}

				// Uppercase the type
				s.type = s.type.toUpperCase();

				// Determine if request has content
				s.hasContent = !rnoContent.test(s.type);

				// Save the URL in case we're toying with the If-Modified-Since
				// and/or If-None-Match header later on
				cacheURL = s.url;

				// More options handling for requests with no content
				if (!s.hasContent) {

					// If data is available, append data to url
					if (s.data) {
						cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;

						// #9682: remove data so that it's not used in an eventual retry
						delete s.data;
					}

					// Add anti-cache in url if needed
					if (s.cache === false) {
						s.url = rts.test(cacheURL) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace(rts, "$1_=" + nonce++) :

						// Otherwise add one to the end
						cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
					}
				}

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if (s.ifModified) {
					if (jQuery.lastModified[cacheURL]) {
						jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
					}
					if (jQuery.etag[cacheURL]) {
						jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
					}
				}

				// Set the correct header, if data is being sent
				if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
					jqXHR.setRequestHeader("Content-Type", s.contentType);
				}

				// Set the Accepts header for the server, depending on the dataType
				jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

				// Check for headers option
				for (i in s.headers) {
					jqXHR.setRequestHeader(i, s.headers[i]);
				}

				// Allow custom headers/mimetypes and early abort
				if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {

					// Abort if not done already and return
					return jqXHR.abort();
				}

				// Aborting is no longer a cancellation
				strAbort = "abort";

				// Install callbacks on deferreds
				for (i in { success: 1, error: 1, complete: 1 }) {
					jqXHR[i](s[i]);
				}

				// Get transport
				transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

				// If no transport, we auto-abort
				if (!transport) {
					done(-1, "No Transport");
				} else {
					jqXHR.readyState = 1;

					// Send global event
					if (fireGlobals) {
						globalEventContext.trigger("ajaxSend", [jqXHR, s]);
					}

					// If request was aborted inside ajaxSend, stop there
					if (state === 2) {
						return jqXHR;
					}

					// Timeout
					if (s.async && s.timeout > 0) {
						timeoutTimer = window.setTimeout(function () {
							jqXHR.abort("timeout");
						}, s.timeout);
					}

					try {
						state = 1;
						transport.send(requestHeaders, done);
					} catch (e) {

						// Propagate exception as error if not done
						if (state < 2) {
							done(-1, e);

							// Simply rethrow otherwise
						} else {
							throw e;
						}
					}
				}

				// Callback for when everything is done
				function done(status, nativeStatusText, responses, headers) {
					var isSuccess,
					    success,
					    error,
					    response,
					    modified,
					    statusText = nativeStatusText;

					// Called once
					if (state === 2) {
						return;
					}

					// State is "done" now
					state = 2;

					// Clear timeout if it exists
					if (timeoutTimer) {
						window.clearTimeout(timeoutTimer);
					}

					// Dereference transport for early garbage collection
					// (no matter how long the jqXHR object will be used)
					transport = undefined;

					// Cache response headers
					responseHeadersString = headers || "";

					// Set readyState
					jqXHR.readyState = status > 0 ? 4 : 0;

					// Determine if successful
					isSuccess = status >= 200 && status < 300 || status === 304;

					// Get response data
					if (responses) {
						response = ajaxHandleResponses(s, jqXHR, responses);
					}

					// Convert no matter what (that way responseXXX fields are always set)
					response = ajaxConvert(s, response, jqXHR, isSuccess);

					// If successful, handle type chaining
					if (isSuccess) {

						// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
						if (s.ifModified) {
							modified = jqXHR.getResponseHeader("Last-Modified");
							if (modified) {
								jQuery.lastModified[cacheURL] = modified;
							}
							modified = jqXHR.getResponseHeader("etag");
							if (modified) {
								jQuery.etag[cacheURL] = modified;
							}
						}

						// if no content
						if (status === 204 || s.type === "HEAD") {
							statusText = "nocontent";

							// if not modified
						} else if (status === 304) {
							statusText = "notmodified";

							// If we have data, let's convert it
						} else {
							statusText = response.state;
							success = response.data;
							error = response.error;
							isSuccess = !error;
						}
					} else {

						// Extract error from statusText and normalize for non-aborts
						error = statusText;
						if (status || !statusText) {
							statusText = "error";
							if (status < 0) {
								status = 0;
							}
						}
					}

					// Set data for the fake xhr object
					jqXHR.status = status;
					jqXHR.statusText = (nativeStatusText || statusText) + "";

					// Success/Error
					if (isSuccess) {
						deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
					} else {
						deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
					}

					// Status-dependent callbacks
					jqXHR.statusCode(_statusCode);
					_statusCode = undefined;

					if (fireGlobals) {
						globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
					}

					// Complete
					completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

					if (fireGlobals) {
						globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

						// Handle the global AJAX counter
						if (! --jQuery.active) {
							jQuery.event.trigger("ajaxStop");
						}
					}
				}

				return jqXHR;
			},

			getJSON: function getJSON(url, data, callback) {
				return jQuery.get(url, data, callback, "json");
			},

			getScript: function getScript(url, callback) {
				return jQuery.get(url, undefined, callback, "script");
			}
		});

		jQuery.each(["get", "post"], function (i, method) {
			jQuery[method] = function (url, data, callback, type) {

				// Shift arguments if data argument was omitted
				if (jQuery.isFunction(data)) {
					type = type || callback;
					callback = data;
					data = undefined;
				}

				// The url can be an options object (which then must have .url)
				return jQuery.ajax(jQuery.extend({
					url: url,
					type: method,
					dataType: type,
					data: data,
					success: callback
				}, jQuery.isPlainObject(url) && url));
			};
		});

		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
		return window.location;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {
		return jQuery.now();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
		return (/\?/
		);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		jQuery.parseJSON = function (data) {
			return JSON.parse(data + "");
		};

		return jQuery.parseJSON;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		// Cross-browser xml parsing
		jQuery.parseXML = function (data) {
			var xml;
			if (!data || typeof data !== "string") {
				return null;
			}

			// Support: IE9
			try {
				xml = new window.DOMParser().parseFromString(data, "text/xml");
			} catch (e) {
				xml = undefined;
			}

			if (!xml || xml.getElementsByTagName("parsererror").length) {
				jQuery.error("Invalid XML: " + data);
			}
			return xml;
		};

		return jQuery.parseXML;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(46), __webpack_require__(32), // clone
	__webpack_require__(50) // parent, contents
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		jQuery.fn.extend({
			wrapAll: function wrapAll(html) {
				var wrap;

				if (jQuery.isFunction(html)) {
					return this.each(function (i) {
						jQuery(this).wrapAll(html.call(this, i));
					});
				}

				if (this[0]) {

					// The elements to wrap the target around
					wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

					if (this[0].parentNode) {
						wrap.insertBefore(this[0]);
					}

					wrap.map(function () {
						var elem = this;

						while (elem.firstElementChild) {
							elem = elem.firstElementChild;
						}

						return elem;
					}).append(this);
				}

				return this;
			},

			wrapInner: function wrapInner(html) {
				if (jQuery.isFunction(html)) {
					return this.each(function (i) {
						jQuery(this).wrapInner(html.call(this, i));
					});
				}

				return this.each(function () {
					var self = jQuery(this),
					    contents = self.contents();

					if (contents.length) {
						contents.wrapAll(html);
					} else {
						self.append(html);
					}
				});
			},

			wrap: function wrap(html) {
				var isFunction = jQuery.isFunction(html);

				return this.each(function (i) {
					jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
				});
			},

			unwrap: function unwrap() {
				return this.parent().each(function () {
					if (!jQuery.nodeName(this, "body")) {
						jQuery(this).replaceWith(this.childNodes);
					}
				}).end();
			}
		});

		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		jQuery.expr.filters.hidden = function (elem) {
			return !jQuery.expr.filters.visible(elem);
		};
		jQuery.expr.filters.visible = function (elem) {

			// Support: Opera <= 12.12
			// Opera reports offsetWidths and offsetHeights less than zero on some elements
			// Use OR instead of AND as the element is not visible if either is true
			// See tickets #10406 and #13132
			return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
		};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(43), __webpack_require__(46), __webpack_require__(50), // filter
	__webpack_require__(66)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, rcheckableType) {

		var r20 = /%20/g,
		    rbracket = /\[\]$/,
		    rCRLF = /\r?\n/g,
		    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		    rsubmittable = /^(?:input|select|textarea|keygen)/i;

		function buildParams(prefix, obj, traditional, add) {
			var name;

			if (jQuery.isArray(obj)) {

				// Serialize array item.
				jQuery.each(obj, function (i, v) {
					if (traditional || rbracket.test(prefix)) {

						// Treat each array item as a scalar.
						add(prefix, v);
					} else {

						// Item is non-scalar (array or object), encode its numeric index.
						buildParams(prefix + "[" + ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && v != null ? i : "") + "]", v, traditional, add);
					}
				});
			} else if (!traditional && jQuery.type(obj) === "object") {

				// Serialize object item.
				for (name in obj) {
					buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
				}
			} else {

				// Serialize scalar item.
				add(prefix, obj);
			}
		}

		// Serialize an array of form elements or a set of
		// key/values into a query string
		jQuery.param = function (a, traditional) {
			var prefix,
			    s = [],
			    add = function add(key, value) {

				// If value is a function, invoke it and return its value
				value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
				s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
			};

			// Set traditional to true for jQuery <= 1.3.2 behavior.
			if (traditional === undefined) {
				traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
			}

			// If an array was passed in, assume that it is an array of form elements.
			if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {

				// Serialize the form elements
				jQuery.each(a, function () {
					add(this.name, this.value);
				});
			} else {

				// If traditional, encode the "old" way (the way 1.3.2 or older
				// did it), otherwise encode params recursively.
				for (prefix in a) {
					buildParams(prefix, a[prefix], traditional, add);
				}
			}

			// Return the resulting serialization
			return s.join("&").replace(r20, "+");
		};

		jQuery.fn.extend({
			serialize: function serialize() {
				return jQuery.param(this.serializeArray());
			},
			serializeArray: function serializeArray() {
				return this.map(function () {

					// Can add propHook for "elements" to filter or add form elements
					var elements = jQuery.prop(this, "elements");
					return elements ? jQuery.makeArray(elements) : this;
				}).filter(function () {
					var type = this.type;

					// Use .is( ":disabled" ) so that fieldset[disabled] works
					return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
				}).map(function (i, elem) {
					var val = jQuery(this).val();

					return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
						return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
					}) : { name: elem.name, value: val.replace(rCRLF, "\r\n") };
				}).get();
			}
		});

		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(15), __webpack_require__(74)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, support) {

		jQuery.ajaxSettings.xhr = function () {
			try {
				return new window.XMLHttpRequest();
			} catch (e) {}
		};

		var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		    xhrSupported = jQuery.ajaxSettings.xhr();

		support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
		support.ajax = xhrSupported = !!xhrSupported;

		jQuery.ajaxTransport(function (options) {
			var _callback, errorCallback;

			// Cross domain only allowed if supported through XMLHttpRequest
			if (support.cors || xhrSupported && !options.crossDomain) {
				return {
					send: function send(headers, complete) {
						var i,
						    xhr = options.xhr();

						xhr.open(options.type, options.url, options.async, options.username, options.password);

						// Apply custom fields if provided
						if (options.xhrFields) {
							for (i in options.xhrFields) {
								xhr[i] = options.xhrFields[i];
							}
						}

						// Override mime type if needed
						if (options.mimeType && xhr.overrideMimeType) {
							xhr.overrideMimeType(options.mimeType);
						}

						// X-Requested-With header
						// For cross-domain requests, seeing as conditions for a preflight are
						// akin to a jigsaw puzzle, we simply never set it to be sure.
						// (it can always be set on a per-request basis or even using ajaxSetup)
						// For same-domain requests, won't change header if already provided.
						if (!options.crossDomain && !headers["X-Requested-With"]) {
							headers["X-Requested-With"] = "XMLHttpRequest";
						}

						// Set headers
						for (i in headers) {
							xhr.setRequestHeader(i, headers[i]);
						}

						// Callback
						_callback = function callback(type) {
							return function () {
								if (_callback) {
									_callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

									if (type === "abort") {
										xhr.abort();
									} else if (type === "error") {

										// Support: IE9
										// On a manual native abort, IE9 throws
										// errors on any property access that is not readyState
										if (typeof xhr.status !== "number") {
											complete(0, "error");
										} else {
											complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status, xhr.statusText);
										}
									} else {
										complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText,

										// Support: IE9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										(xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
									}
								}
							};
						};

						// Listen to events
						xhr.onload = _callback();
						errorCallback = xhr.onerror = _callback("error");

						// Support: IE9
						// Use onreadystatechange to replace onabort
						// to handle uncaught aborts
						if (xhr.onabort !== undefined) {
							xhr.onabort = errorCallback;
						} else {
							xhr.onreadystatechange = function () {

								// Check readyState before timeout as it changes
								if (xhr.readyState === 4) {

									// Allow onerror to be called first,
									// but that will not handle a native abort
									// Also, save errorCallback to a variable
									// as xhr.onerror cannot be accessed
									window.setTimeout(function () {
										if (_callback) {
											errorCallback();
										}
									});
								}
							};
						}

						// Create the abort callback
						_callback = _callback("abort");

						try {

							// Do send the request (this may raise an exception)
							xhr.send(options.hasContent && options.data || null);
						} catch (e) {

							// #14683: Only rethrow if this hasn't been notified as an error yet
							if (_callback) {
								throw e;
							}
						}
					},

					abort: function abort() {
						if (_callback) {
							_callback();
						}
					}
				};
			}
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(11), __webpack_require__(74)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, document) {

		// Install script dataType
		jQuery.ajaxSetup({
			accepts: {
				script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
			},
			contents: {
				script: /\b(?:java|ecma)script\b/
			},
			converters: {
				"text script": function textScript(text) {
					jQuery.globalEval(text);
					return text;
				}
			}
		});

		// Handle cache's special case and crossDomain
		jQuery.ajaxPrefilter("script", function (s) {
			if (s.cache === undefined) {
				s.cache = false;
			}
			if (s.crossDomain) {
				s.type = "GET";
			}
		});

		// Bind script tag hack transport
		jQuery.ajaxTransport("script", function (s) {

			// This transport only deals with cross domain requests
			if (s.crossDomain) {
				var script, _callback;
				return {
					send: function send(_, complete) {
						script = jQuery("<script>").prop({
							charset: s.scriptCharset,
							src: s.url
						}).on("load error", _callback = function callback(evt) {
							script.remove();
							_callback = null;
							if (evt) {
								complete(evt.type === "error" ? 404 : 200, evt.type);
							}
						});

						// Use native DOM manipulation to avoid our domManip AJAX trickery
						document.head.appendChild(script[0]);
					},
					abort: function abort() {
						if (_callback) {
							_callback();
						}
					}
				};
			}
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(76), __webpack_require__(77), __webpack_require__(74)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, nonce, rquery) {

		var oldCallbacks = [],
		    rjsonp = /(=)\?(?=&|$)|\?\?/;

		// Default jsonp settings
		jQuery.ajaxSetup({
			jsonp: "callback",
			jsonpCallback: function jsonpCallback() {
				var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
				this[callback] = true;
				return callback;
			}
		});

		// Detect, normalize options and install callbacks for jsonp requests
		jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

			var callbackName,
			    overwritten,
			    responseContainer,
			    jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

			// Handle iff the expected data type is "jsonp" or we have a parameter to set
			if (jsonProp || s.dataTypes[0] === "jsonp") {

				// Get callback name, remembering preexisting value associated with it
				callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

				// Insert callback into url or form data
				if (jsonProp) {
					s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
				} else if (s.jsonp !== false) {
					s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
				}

				// Use data converter to retrieve json after script execution
				s.converters["script json"] = function () {
					if (!responseContainer) {
						jQuery.error(callbackName + " was not called");
					}
					return responseContainer[0];
				};

				// Force json dataType
				s.dataTypes[0] = "json";

				// Install callback
				overwritten = window[callbackName];
				window[callbackName] = function () {
					responseContainer = arguments;
				};

				// Clean-up function (fires after converters)
				jqXHR.always(function () {

					// If previous value didn't exist - remove it
					if (overwritten === undefined) {
						jQuery(window).removeProp(callbackName);

						// Otherwise restore preexisting value
					} else {
						window[callbackName] = overwritten;
					}

					// Save back as free
					if (s[callbackName]) {

						// Make sure that re-using the options doesn't screw things around
						s.jsonpCallback = originalSettings.jsonpCallback;

						// Save the callback name for future use
						oldCallbacks.push(callbackName);
					}

					// Call if it was a function and we have a response
					if (responseContainer && jQuery.isFunction(overwritten)) {
						overwritten(responseContainer[0]);
					}

					responseContainer = overwritten = undefined;
				});

				// Delegate to script
				return "script";
			}
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(87), __webpack_require__(74), __webpack_require__(50), __webpack_require__(32), __webpack_require__(23),

	// Optional event/alias dependency
	__webpack_require__(69)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		// Keep a copy of the old load method
		var _load = jQuery.fn.load;

		/**
	  * Load a url into a page
	  */
		jQuery.fn.load = function (url, params, callback) {
			if (typeof url !== "string" && _load) {
				return _load.apply(this, arguments);
			}

			var selector,
			    type,
			    response,
			    self = this,
			    off = url.indexOf(" ");

			if (off > -1) {
				selector = jQuery.trim(url.slice(off));
				url = url.slice(0, off);
			}

			// If it's a function
			if (jQuery.isFunction(params)) {

				// We assume that it's the callback
				callback = params;
				params = undefined;

				// Otherwise, build a param string
			} else if (params && (typeof params === "undefined" ? "undefined" : _typeof(params)) === "object") {
				type = "POST";
			}

			// If we have elements to modify, make the request
			if (self.length > 0) {
				jQuery.ajax({
					url: url,

					// If "type" variable is undefined, then "GET" method will be used.
					// Make value of this field explicit since
					// user can override it through ajaxSetup method
					type: type || "GET",
					dataType: "html",
					data: params
				}).done(function (responseText) {

					// Save response for use in complete callback
					response = arguments;

					self.html(selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

					// Otherwise use the full result
					responseText);

					// If the request succeeds, this function gets "data", "status", "jqXHR"
					// but they are ignored because response was set above.
					// If it fails, this function gets "jqXHR", "status", "error"
				}).always(callback && function (jqXHR, status) {
					self.each(function () {
						callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
					});
				});
			}

			return this;
		};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(11), __webpack_require__(47), __webpack_require__(33)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, document, rsingleTag, buildFragment) {

		// Argument "data" should be string of html
		// context (optional): If specified, the fragment will be created in this context,
		// defaults to document
		// keepScripts (optional): If true, will include scripts passed in the html string
		jQuery.parseHTML = function (data, context, keepScripts) {
			if (!data || typeof data !== "string") {
				return null;
			}
			if (typeof context === "boolean") {
				keepScripts = context;
				context = false;
			}
			context = context || document;

			var parsed = rsingleTag.exec(data),
			    scripts = !keepScripts && [];

			// Single tag
			if (parsed) {
				return [context.createElement(parsed[1])];
			}

			parsed = buildFragment([data], context, scripts);

			if (scripts && scripts.length) {
				jQuery(scripts).remove();
			}

			return jQuery.merge([], parsed.childNodes);
		};

		return jQuery.parseHTML;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(53)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		// Attach a bunch of functions for handling common AJAX events
		jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
			jQuery.fn[type] = function (fn) {
				return this.on(type, fn);
			};
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(23), __webpack_require__(61)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		jQuery.expr.filters.animated = function (elem) {
			return jQuery.grep(jQuery.timers, function (fn) {
				return elem === fn.elem;
			}).length;
		};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(16), __webpack_require__(11), __webpack_require__(29), __webpack_require__(20), __webpack_require__(27), __webpack_require__(54), __webpack_require__(28), __webpack_require__(46), __webpack_require__(3), __webpack_require__(23) // contains
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, access, document, documentElement, rnumnonpx, curCSS, addGetHookIf, support) {

		/**
	  * Gets a window from an element
	  */
		function getWindow(elem) {
			return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
		}

		jQuery.offset = {
			setOffset: function setOffset(elem, options, i) {
				var curPosition,
				    curLeft,
				    curCSSTop,
				    curTop,
				    curOffset,
				    curCSSLeft,
				    calculatePosition,
				    position = jQuery.css(elem, "position"),
				    curElem = jQuery(elem),
				    props = {};

				// Set position first, in-case top/left are set even on static elem
				if (position === "static") {
					elem.style.position = "relative";
				}

				curOffset = curElem.offset();
				curCSSTop = jQuery.css(elem, "top");
				curCSSLeft = jQuery.css(elem, "left");
				calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

				// Need to be able to calculate position if either
				// top or left is auto and position is either absolute or fixed
				if (calculatePosition) {
					curPosition = curElem.position();
					curTop = curPosition.top;
					curLeft = curPosition.left;
				} else {
					curTop = parseFloat(curCSSTop) || 0;
					curLeft = parseFloat(curCSSLeft) || 0;
				}

				if (jQuery.isFunction(options)) {

					// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
					options = options.call(elem, i, jQuery.extend({}, curOffset));
				}

				if (options.top != null) {
					props.top = options.top - curOffset.top + curTop;
				}
				if (options.left != null) {
					props.left = options.left - curOffset.left + curLeft;
				}

				if ("using" in options) {
					options.using.call(elem, props);
				} else {
					curElem.css(props);
				}
			}
		};

		jQuery.fn.extend({
			offset: function offset(options) {
				if (arguments.length) {
					return options === undefined ? this : this.each(function (i) {
						jQuery.offset.setOffset(this, options, i);
					});
				}

				var docElem,
				    win,
				    elem = this[0],
				    box = { top: 0, left: 0 },
				    doc = elem && elem.ownerDocument;

				if (!doc) {
					return;
				}

				docElem = doc.documentElement;

				// Make sure it's not a disconnected DOM node
				if (!jQuery.contains(docElem, elem)) {
					return box;
				}

				box = elem.getBoundingClientRect();
				win = getWindow(doc);
				return {
					top: box.top + win.pageYOffset - docElem.clientTop,
					left: box.left + win.pageXOffset - docElem.clientLeft
				};
			},

			position: function position() {
				if (!this[0]) {
					return;
				}

				var offsetParent,
				    offset,
				    elem = this[0],
				    parentOffset = { top: 0, left: 0 };

				// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
				// because it is its only offset parent
				if (jQuery.css(elem, "position") === "fixed") {

					// Assume getBoundingClientRect is there when computed position is fixed
					offset = elem.getBoundingClientRect();
				} else {

					// Get *real* offsetParent
					offsetParent = this.offsetParent();

					// Get correct offsets
					offset = this.offset();
					if (!jQuery.nodeName(offsetParent[0], "html")) {
						parentOffset = offsetParent.offset();
					}

					// Add offsetParent borders
					parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
					parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
				}

				// Subtract parent offsets and element margins
				return {
					top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
					left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
				};
			},

			// This method will return documentElement in the following cases:
			// 1) For the element inside the iframe without offsetParent, this method will return
			//    documentElement of the parent window
			// 2) For the hidden or detached element
			// 3) For body or html element, i.e. in case of the html node - it will return itself
			//
			// but those exceptions were never presented as a real life use-cases
			// and might be considered as more preferable results.
			//
			// This logic, however, is not guaranteed and can change at any point in the future
			offsetParent: function offsetParent() {
				return this.map(function () {
					var offsetParent = this.offsetParent;

					while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
						offsetParent = offsetParent.offsetParent;
					}

					return offsetParent || documentElement;
				});
			}
		});

		// Create scrollLeft and scrollTop methods
		jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
			var top = "pageYOffset" === prop;

			jQuery.fn[method] = function (val) {
				return access(this, function (elem, method, val) {
					var win = getWindow(elem);

					if (val === undefined) {
						return win ? win[prop] : elem[method];
					}

					if (win) {
						win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
					} else {
						elem[method] = val;
					}
				}, method, val, arguments.length);
			};
		});

		// Support: Safari<7-8+, Chrome<37-44+
		// Add the top/left cssHooks using jQuery.fn.position
		// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
		// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
		// getComputedStyle returns percent when specified for top/left/bottom/right;
		// rather than make the css module depend on the offset module, just check for it here
		jQuery.each(["top", "left"], function (i, prop) {
			jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
				if (computed) {
					computed = curCSS(elem, prop);

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
				}
			});
		});

		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(16), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, access) {

		// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
		jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
			jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {

				// Margin is only for outerHeight, outerWidth
				jQuery.fn[funcName] = function (margin, value) {
					var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
					    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

					return access(this, function (elem, type, value) {
						var doc;

						if (jQuery.isWindow(elem)) {

							// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
							// isn't a whole lot we can do. See pull request at this URL for discussion:
							// https://github.com/jquery/jquery/pull/764
							return elem.document.documentElement["client" + name];
						}

						// Get document width or height
						if (elem.nodeType === 9) {
							doc = elem.documentElement;

							// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
							// whichever is greatest
							return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
						}

						return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css(elem, type, extra) :

						// Set width or height on the element
						jQuery.style(elem, type, value, extra);
					}, type, chainable ? margin : undefined, chainable, null);
				};
			});
		});

		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		jQuery.fn.extend({

			bind: function bind(types, data, fn) {
				return this.on(types, null, data, fn);
			},
			unbind: function unbind(types, fn) {
				return this.off(types, null, fn);
			},

			delegate: function delegate(selector, types, data, fn) {
				return this.on(types, selector, data, fn);
			},
			undelegate: function undelegate(selector, types, fn) {

				// ( namespace ) or ( selector, types [, fn] )
				return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
			},
			size: function size() {
				return this.length;
			}
		});

		jQuery.fn.andSelf = jQuery.fn.addBack;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

		// Register as a named AMD module, since jQuery can be concatenated with other
		// files that may use define, but not via a proper concatenation script that
		// understands anonymous AMD modules. A named AMD is safest and most robust
		// way to register. Lowercase jquery is used because AMD module names are
		// derived from file names, and jQuery is normally delivered in a lowercase
		// file name. Do this after creating the global so that if an AMD module wants
		// to call noConflict to hide this version of jQuery, it will work.

		// Note that for maximum portability, libraries that are not jQuery should
		// declare themselves as anonymous modules, and avoid setting a global if an
		// AMD loader is present. jQuery is a special case. For more information, see
		// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return jQuery;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })
/******/ ]);
>>>>>>> changes to make it build locally.  Should be good?
