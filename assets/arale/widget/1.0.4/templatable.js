define("arale/widget/1.0.4/templatable",["$","gallery/handlebars/1.0.1/handlebars"],function(e,t,n){function r(e){return o(e)?null:l(i(e))}function a(e,t){if(e){var n=e.find(t);if(0===n.length)throw Error("Invalid template selector: "+t);return s(n.html())}}function i(e){return e.replace(/({[^}]+}})/g,"<!--$1-->").replace(/\s(src|href)\s*=\s*(['"])(.*?\{.+?)\2/g," data-templatable-$1=$2$3$2")}function s(e){return e.replace(/(?:<|&lt;)!--({{[^}]+}})--(?:>|&gt;)/g,"$1").replace(/data-templatable-/gi,"")}function o(e){return"function"==typeof e}var l=e("$"),u=e("gallery/handlebars/1.0.1/handlebars"),f={};n.exports={templateHelpers:null,templateObject:null,parseElementFromTemplate:function(){this.templateObject=r(this.template),this.element=l(this.compile())},compile:function(e,t){e||(e=this.template),t||(t=this.model),t.toJSON&&(t=t.toJSON());var n=this.templateHelpers;if(n)for(var r in n)n.hasOwnProperty(r)&&u.registerHelper(r,n[r]);var a="function"==typeof e?e:f[e];a||(a=f[e]=u.compile(e));var i=a(t);if(n)for(r in n)n.hasOwnProperty(r)&&delete u.helpers[r];return i},renderPartial:function(e){var t=a(this.templateObject,e);return t?this.$(e).html(this.compile(t)):this.element.html(this.compile()),this}};var c=u.compile;u.compile=function(e){return o(e)?e:c.call(u,e)}});
