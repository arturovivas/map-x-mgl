function t(t){return!t||(e(t)?A(t,{}):f(t)?A(t,[]):void 0)}function e(t){return!!t&&"object"==typeof t&&!Array.isArray(t)}function r(t){return e(t)&&y(t.type)&&!!t.type.match(/^(vt|rt|cc||sm||gj)$/)}function n(t,e,n){e=f(e)?e:[e];const i=!m(n)||n(t),s=e.reduce((e,r)=>e||t.type===r,!1);return r(t)&&s&&i}function i(t){const e=new RegExp("MX-.{3}-.{3}-.{3}-.{3}-.{3}");return!!t&&!!t.match(e)}function s(t){return!!t.match(t)}function o(t){const e=new RegExp("^MX-GJ-.{10}$|^MX-.{5}-.{5}-.{5}$");return!!t&&y(t)&&!!t.match(e)}function u(t){return e(t)&&i(t.id)}function f(t){return!!t&&"object"==typeof t&&Array.isArray(t)}function c(t){return f(t)&&t.reduce((t,r)=>t?e(r):t,!0)}function a(t){return void 0===t}function p(t){return!isNaN(parseFloat(t))&&isFinite(t)}function d(t){return!0===t||!1===t}function x(t,e,r){return e=e||0,r=r||Infinity,!(!t||"string"!=typeof t)&&(t=t.trim()).length>=e&&t.length<=r}let g=new RegExp(/^data:image\/(png|jpeg|svg);base64\,[a-zA-Z0-9\+\/\=]+$/);function y(t){return"string"==typeof t}function m(t){return t instanceof Function}function l(t){return t instanceof Element}function A(t,e){if(null==t||null==e)return t===e;if(t.constructor!==e.constructor)return!1;if(t instanceof Function)return t===e;if(t instanceof RegExp)return t===e;if(t===e||t.valueOf()===e.valueOf())return!0;if(Array.isArray(t)&&t.length!==e.length)return!1;if(t instanceof Date)return!1;if(!(t instanceof Object))return!1;if(!(e instanceof Object))return!1;var r=Object.keys(t);return Object.keys(e).every(function(t){return-1!==r.indexOf(t)})&&r.every(function(r){return A(t[r],e[r])})}exports.isArray=f,exports.isArrayOfObject=function(t){return c(t)},exports.isArrayOfSourceId=function(t){return f(t)&&t.every(s)},exports.isArrayOfString=function(t){return f(t)&&t.reduce((t,e)=>!1===t?t:y(e),!0)},exports.isArrayOfViews=function(t){return f(t)&&t.reduce((t,e)=>t?r(e):t,!0)},exports.isArrayOfViewsId=function(t){return f(t)&&t.reduce((t,e)=>!1===t?t:o(e),!0)},exports.isBase64img=function(t){try{return!(!x(t,22)||!g.test(t))&&x(t.split(",")[1],10)}catch(t){return!1}},exports.isBoolean=d,exports.isCanvas=function(t){return t instanceof HTMLCanvasElement},exports.isDateString=function(t){return y(t)&&(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(t)||/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/.test(t))},exports.isElement=l,exports.isEmail=function(t){return y(t)&&/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)},exports.isEmpty=t,exports.isEqual=A,exports.isFunction=m,exports.isHTML=function(t){return y(t)&&/(<([^>]+)>)/i.test(t)},exports.isIconFont=function(t){return l(t)&&t.classList.contains("fa")},exports.isJson=function(t){try{JSON.parse(t)}catch(t){return!1}return!0},exports.isMap=function(t){return e(t)&&t._canvas instanceof HTMLCanvasElement},exports.isNotEmpty=function(e){return!t(e)},exports.isNumeric=p,exports.isObject=e,exports.isProject=u,exports.isProjectId=i,exports.isProjectsArray=function(t){return f(t)&&t.reduce((t,e)=>!1===t?t:u(e),!0)},exports.isPromise=function(t){return t instanceof Promise},exports.isSorted=function(t,e){return f(t)&&t.every((t,r,n)=>!r||e?t<n[r+1]:t>=n[r-1])},exports.isSourceId=s,exports.isString=y,exports.isStringRange=x,exports.isStringifiable=function(t){return!a(t)&&(e(t)||f(t)||y(t)||p(t)||d(t))},exports.isTable=c,exports.isUndefined=a,exports.isUrl=function(t){return y(t)&&/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(t)},exports.isValidType=function(t,e){return{image:["image/apng","image/bmp","image/gif","image/jpeg","image/png","image/svg+xml","image/tiff","image/webp"]}[e].indexOf(t)>-1},exports.isView=r,exports.isViewEditable=function(t){return r(t)&&!0===t._edit},exports.isViewId=o,exports.isViewRt=function(t){return n(t,"rt")},exports.isViewType=n,exports.isViewVt=function(t){return n(t,"vt")};
//# sourceMappingURL=mx_valid.js.map
