module.exports=function(r){var e={};function t(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return r[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=r,t.c=e,t.d=function(r,e,n){t.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:n})},t.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},t.t=function(r,e){if(1&e&&(r=t(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var o in r)t.d(n,o,function(e){return r[e]}.bind(null,o));return n},t.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(e,"a",e),e},t.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},t.p="",t(t.s=4)}([function(r,e,t){"use strict";r.exports=t(2)},function(r,e){r.exports=require("react")},function(r,e,t){"use strict";
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */t(3);var n=t(1),o=60103;if(e.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var i=Symbol.for;o=i("react.element"),e.Fragment=i("react.fragment")}var u=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c=Object.prototype.hasOwnProperty,a={key:!0,ref:!0,__self:!0,__source:!0};function l(r,e,t){var n,i={},l=null,f=null;for(n in void 0!==t&&(l=""+t),void 0!==e.key&&(l=""+e.key),void 0!==e.ref&&(f=e.ref),e)c.call(e,n)&&!a.hasOwnProperty(n)&&(i[n]=e[n]);if(r&&r.defaultProps)for(n in e=r.defaultProps)void 0===i[n]&&(i[n]=e[n]);return{$$typeof:o,type:r,key:l,ref:f,props:i,_owner:u.current}}e.jsx=l,e.jsxs=l},function(r,e,t){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;function u(r){if(null==r)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(r)}r.exports=function(){try{if(!Object.assign)return!1;var r=new String("abc");if(r[5]="de","5"===Object.getOwnPropertyNames(r)[0])return!1;for(var e={},t=0;t<10;t++)e["_"+String.fromCharCode(t)]=t;if("0123456789"!==Object.getOwnPropertyNames(e).map((function(r){return e[r]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(r){n[r]=r})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(r){return!1}}()?Object.assign:function(r,e){for(var t,c,a=u(r),l=1;l<arguments.length;l++){for(var f in t=Object(arguments[l]))o.call(t,f)&&(a[f]=t[f]);if(n){c=n(t);for(var s=0;s<c.length;s++)i.call(t,c[s])&&(a[c[s]]=t[c[s]])}}return a}},function(r,e,t){"use strict";t.r(e),t.d(e,"GeneralError",(function(){return o})),t.d(e,"NotAuth",(function(){return i})),t.d(e,"InputField",(function(){return l})),t.d(e,"getParamUrl",(function(){return f}));var n=t(0);var o=function(){return Object(n.jsx)("div",{className:"Grid Grid--alignCenter",children:Object(n.jsx)("div",{className:"u-size6of12",children:Object(n.jsx)("span",{className:"u-textSize5",children:"General - Error"})})})};var i=function(){return Object(n.jsx)("div",{className:"Grid Grid--alignCenter",children:Object(n.jsx)("div",{className:"u-size6of12",children:Object(n.jsx)("span",{className:"u-textSize5",children:"Not - Auth"})})})},u=t(1);function c(r,e){return function(r){if(Array.isArray(r))return r}(r)||function(r,e){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null==t)return;var n,o,i=[],u=!0,c=!1;try{for(t=t.call(r);!(u=(n=t.next()).done)&&(i.push(n.value),!e||i.length!==e);u=!0);}catch(r){c=!0,o=r}finally{try{u||null==t.return||t.return()}finally{if(c)throw o}}return i}(r,e)||function(r,e){if(!r)return;if("string"==typeof r)return a(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);"Object"===t&&r.constructor&&(t=r.constructor.name);if("Map"===t||"Set"===t)return Array.from(r);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return a(r,e)}(r,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}var l=function(){var r=c(Object(u.useState)(0),2),e=r[0],t=r[1];return Object(n.jsxs)("div",{children:[Object(n.jsxs)("p",{children:["You clicked ",e," times"]}),Object(n.jsx)("button",{onClick:function(){return t(e+1)},children:"Click me"})]})},f=function(r){var e={};return r.replace(/([^?=&]+)(=([^&]*))?/g,(function(r,t,n,o){e[t]=o})),e}}]);