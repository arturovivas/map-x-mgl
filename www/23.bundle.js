webpackJsonp([23],{97:function(e,t,i){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(){JSONEditor.defaults.resolvers.unshift(function(e){if("string"===e.type&&"textarea"===e.format&&e.options&&"ace"===e.options.editor)return"ace"}),JSONEditor.defaults.editors.ace=JSONEditor.defaults.editors.string.extend({refreshValue:function(){this.value=this.value,this.serialized=this.value},setValue:function(e,t,i){if((!this.template||i)&&(null===e||void 0===e?e="":"object"===(void 0===e?"undefined":n(e))?e=JSON.stringify(e):"string"!=typeof e&&(e=""+e),e!==this.serialized)){var o=this.sanitize(e);if(this.input.value!==o){this.value=o,this.ace_editor&&this.ace_editor.setValue(o);var a=i||this.getValue()!==e;this.refreshValue(),t?this.is_dirty=!1:"change"===this.jsoneditor.options.show_errors&&(this.is_dirty=!0),this.adjust_height&&this.adjust_height(this.input),this.onChange(a)}}},afterInputReady:function(){var e=this,t=this.options.language;i.e(25).then(i.bind(null,472)).then(function(e){return window.ace=e,Promise.all([i.e(30).then(i.bind(null,474)),i.e(31).then(i.bind(null,476))])}).then(function(i){e.ace_container=document.createElement("div"),e.ace_container.style.width="100%",e.ace_container.style.position="relative",e.ace_container.style.height="400px",e.input.parentNode.insertBefore(e.ace_container,e.input),e.input.style.display="none",e.ace_editor=window.ace.edit(e.ace_container),e.ace_editor.setValue(e.getValue()),e.ace_editor.getSession().setMode("ace/mode/"+t),e.ace_editor.setTheme("ace/theme/github"),e.ace_editor.on("change",function(){var t=e.ace_editor.getValue();e.value=t,e.refreshValue(),e.is_dirty=!0,e.onChange(!0)}),e.theme.afterInputReady(e.input)})},destroy:function(){this.ace_editor&&this.ace_editor.destroy()}})}()}});