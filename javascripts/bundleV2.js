!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="/dist/",t(0)}([function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{"default":e}}function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(1),l=e(a),s=n(2),c=e(s),u=n(3),d=(e(u),n(4)),f=e(d),p=n(7),h=e(p),m=n(8),b=e(m),v=n(10),g=(e(v),n(14)),y=(e(g),function(e){function n(e){t(this,n);var r=o(this,Object.getPrototypeOf(n).call(this,e));return r.state={value:"",addCallback:function(){}},r}return r(n,e),i(n,[{key:"choosePerson",value:function(e){this.refs.modal.showModal()}},{key:"onSelected",value:function(e){this.refs.editor.onMentionAdd((e||[]).map(function(e){return{id:e.id,name:e.name}}))}},{key:"triggerMention",value:function(){this.refs.editor.triggerMention()}},{key:"render",value:function(){var e=this,t=function(t,n){e.setState({value:t.replace(/\n/g,"<br/>")})};return l["default"].createElement("div",{className:"demos"},l["default"].createElement(f["default"],{ref:"editor",placeholder:"type '@' to open mention modal",onMentionTrigger:this.choosePerson.bind(this),onChange:t.bind(this)}),l["default"].createElement("div",null,l["default"].createElement("span",{className:"mentionBtn",onClick:this.triggerMention.bind(this)},"@ someone")),l["default"].createElement("div",null,l["default"].createElement("p",{className:"title"},"Formatted Value:"),l["default"].createElement("div",{style:{padding:"10px"}},this.state.value)),l["default"].createElement(h["default"],{ref:"modal",component:b["default"],onOk:this.onSelected.bind(this),okText:"Ok",cancelText:"Cancel"}))}}]),n}(l["default"].Component));c["default"].render(l["default"].createElement(y,null),document.getElementById("main"))}).call(this)}finally{}},function(e,t){e.exports=window.React},function(e,t){e.exports=window.ReactDOM},function(e,t,n){var o,r;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
!function(){"use strict";function n(){for(var e=[],t=0;t<arguments.length;t++){var o=arguments[t];if(o){var r=typeof o;if("string"===r||"number"===r)e.push(o);else if(Array.isArray(o))e.push(n.apply(null,o));else if("object"===r)for(var a in o)i.call(o,a)&&o[a]&&e.push(a)}}return e.join(" ")}var i={}.hasOwnProperty;"undefined"!=typeof e&&e.exports?e.exports=n:(o=[],r=function(){return n}.apply(t,o),!(void 0!==r&&(e.exports=r)))}()},function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(5),r=e(o);t["default"]=r["default"]}).call(this)}finally{}},function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{"default":e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(1),c=e(s),u=n(3),d=e(u),f=n(6),p=e(f),h=function(){var e=document.createElement("div");return e.setAttribute("contenteditable","PLAINTEXT-ONLY"),"plaintext-only"===e.contentEditable?"plaintext-only":!0}(),m=function(e){function t(e){r(this,t);var n=i(this,Object.getPrototypeOf(t).call(this,e));return n.state={focus:!1,value:e.value||""},n._markRange=null,n}return a(t,e),l(t,[{key:"triggerMention",value:function(){var e=this;e.props.onMentionTrigger(e.onMentionAdd.bind(e))}},{key:"_createMentionNode",value:function(e){var t=this,n=document.createDocumentFragment();return e=e||[],e.map(function(e){var o=document.createElement("input");o.setAttribute("type","button"),o.setAttribute("data",JSON.stringify(e)),o.setAttribute("tabindex","-1"),o.value=t.props.formatDisplay(e),n.appendChild(o)}),n}},{key:"_setCaretToEnd",value:function(e){e=e||this.refs.editor;var t=p["default"].getSelection(),n=p["default"].createRange();return n.selectNodeContents(e),n.collapse(!1),t.removeAllRanges(),t.addRange(n),n}},{key:"onMentionAdd",value:function(e){if(e&&0!==e.length){var t=this,n=this.refs.editor,o=p["default"].getSelection(),r=p["default"].createRange();r=t._markRange?t._markRange:this._setCaretToEnd(n);var i=t._createMentionNode(e);r.deleteContents();var a=i.lastChild;r.insertNode(i),r.setStartAfter(a),r.collapse(!0),o.removeAllRanges(),o.addRange(r),t._markRange=r.cloneRange(),t.emitChange()}}},{key:"emitChange",value:function(e){var t=this,n=this.refs.editor,o=p["default"].getSelection(),r=0===o.rangeCount?null:o.getRangeAt(0);t._markRange=r.cloneRange();var i=t.lastHtml,a=n.innerHTML;if(i!==a){t.lastHtml=a;var l=t.extractContents(n);if(l=l.replace(/^\n/,"").replace(/\n$/,"").replace(/\n\n/g,"\n"),""==l&&(n.innerHTML=""),t.setState({value:l}),t.props.onChange&&t.props.onChange(l),r){var s=t.totalLen,c=l.length;if(t.totalLen=c,!(s&&s>c)&&r.commonAncestorContainer.nodeType===Node.TEXT_NODE){r.setStart(r.commonAncestorContainer,0);var u=r.toString();"@"===u.substr(-1,1)&&(r.setStart(r.commonAncestorContainer,u.length-1),t._markRange=r.cloneRange(),n.blur(),t.triggerMention())}}}}},{key:"extractContents",value:function(e){e=e||this.refs.editor;var t=this,n=e.childNodes,o="";if(0===n.length)return"";for(var r=0,i=n.length;i>r;r+=1){var a=n[r];if(a.nodeType===Node.ELEMENT_NODE){var l=a.tagName.toLowerCase();if("input"===l){var s=JSON.parse(a.getAttribute("data"));o+=t.props.formatValue(s)}else o+="br"===l?"\n":t.extractContents(a)}else a.nodeType===Node.TEXT_NODE&&(o+=a.textContent||a.nodeValue)}return o}},{key:"onBlur",value:function(e){var t=this;t.setState({focus:!1})}},{key:"onClick",value:function(e){var t=this;if(t.doMarkRange(),!t.state.focus){var n=this.refs.editor,o=p["default"].getSelection();t._markRange?(o.removeAllRanges(),o.addRange(t._markRange)):t._markRange=this._setCaretToEnd().cloneRange(),n.focus()}}},{key:"doMarkRange",value:function(){var e=this,t=p["default"].getSelection();0!==t.rangeCount&&(e._markRange=t.getRangeAt(0).cloneRange())}},{key:"render",value:function(){var e=this,t=(0,d["default"])(o({mentionField:!0},e.props.className,!!e.props.className));return c["default"].createElement("div",{className:t},c["default"].createElement("div",{className:(0,d["default"])({mentionEditor:!0,focus:e.state.focus}),ref:"editor",contentEditable:h,style:{height:e.props.height},onKeyUp:e.emitChange.bind(e),onFocus:function(t){e.setState({focus:!0})},onBlur:e.onBlur.bind(e),onClick:e.onClick.bind(e),onTouchEnd:e.doMarkRange.bind(e)}),e.state.focus||e.state.value?"":c["default"].createElement("div",{className:"mentionPlaceholder"},e.props.placeholder))}}]),t}(c["default"].Component);t["default"]=m,m.defaultProps={formatDisplay:function(e){return"@"+e.name},formatValue:function(e){return"["+e.name+"]("+e.id+")"},height:"200"},m.propTypes={className:s.PropTypes.string,placeholder:s.PropTypes.string,onChange:s.PropTypes.func,onMentionTrigger:s.PropTypes.func,formatDisplay:s.PropTypes.func,value:s.PropTypes.string,height:s.PropTypes.string},m.displayName="MentionEditor"}).call(this)}finally{}},function(e,t,n){try{(function(){"use strict";var t;window.rangy?(window.rangy.init(),t=window.rangy):t={getSelection:function(){return window.getSelection()},createRange:function(){return document.createRange()}},e.exports=t}).call(this)}finally{}},function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{"default":e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(1),u=e(c),d=n(3),f=e(d),p=function(){var e=navigator.userAgent,t=e.match(/(iPad).*OS\s([\d_]+)/),n=!t&&e.match(/(iPhone\sOS)\s([\d_]+)/),o=e.match(/(Android)\s+([\d.]+)/),r=e.match(/Windows Phone|BB/);return{isIpad:t,isIphone:n,isAndroid:o,isMobile:n||o||r}},h=p(),m={_queue:[],init:function(){return window.addEventListener("popstate",this._listener.bind(this),!1),this},destroy:function(){window.removeEventListener("popstate",this._listener.bind(this),!1)},doOpen:function(e){history.pushState(null,"",this._addUrlParam("modal",Date.now())),this._queue.push(e)},_listener:function(){var e=this._queue.pop();e&&e()},_addUrlParam:function(e,t){var n,o=location.href;return/\?/g.test(o)?(n=new RegExp(e+"=[-\\w]{4,25}","g"),n.test(o)?o=o.replace(n,e+"="+t):o+="&"+e+"="+t):o+="?"+e+"="+t,o}}.init(),b=function(e){function t(e){r(this,t);var n=i(this,Object.getPrototypeOf(t).call(this,e));return n.state={title:"",show:e.show},n.hasActions=e.okText+e.cancelText!=="",n}return a(t,e),s(t,[{key:"showModal",value:function(){this.setState({show:!0}),m.doOpen(this.innerHideModal.bind(this)),this.props.onShow&&this.props.onShow(),document.body.className=document.body.className+" modalOpen"}},{key:"onOk",value:function(){var e;return this.onBeforeOk&&(e=this.onBeforeOk(),!e)?!1:(this.props.onOk&&this.props.onOk(e),void this.hideModal())}},{key:"onCancel",value:function(){this.props.onCancel&&this.props.onCancel(),this.hideModal()}},{key:"hideModal",value:function(){history.go(-1)}},{key:"innerHideModal",value:function(){this.setState({show:!1}),this.props.onHide&&this.props.onHide(),document.body.className=document.body.className.replace("modalOpen","")}},{key:"render",value:function(){var e,t=this,n=this.props,r=this.state,i=n.component,a=[];return this.hasActions&&(this.props.okText&&a.push(u["default"].createElement("button",{className:"btn btn-ok",onClick:this.onOk.bind(this)},this.props.okText)),this.props.cancelText&&a.push(u["default"].createElement("button",{className:"btn btn-cancel",onClick:this.onCancel.bind(this)},this.props.cancelText)),2===a.length&&h.isMobile&&(a=a.reverse())),u["default"].createElement("div",{className:(0,f["default"])((e={},o(e,t.props.className,!!t.props.className),o(e,"modalWrapper",!0),o(e,"active",r.show),e))},u["default"].createElement("div",{className:"modal animated slideInUp"},u["default"].createElement("div",{className:"modalTitle"},this.state.title),u["default"].createElement("span",{className:"closeIcon",onClick:this.hideModal.bind(this)}),u["default"].createElement("div",{className:(0,f["default"])({modalContent:!0,hasActions:this.hasActions})},r.show?u["default"].createElement(i,l({},n.data,n.listener,{modal:this})):""),this.hasActions?u["default"].createElement("div",{className:"modalActions"},a):null))}}]),t}(u["default"].Component);t["default"]=b,b.propTypes={data:c.PropTypes.object,show:c.PropTypes.bool,onShow:c.PropTypes.func,onHide:c.PropTypes.func}}).call(this)}finally{}},function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(1),s=e(l),c=n(3),u=e(c),d=n(9),f=e(d),p=function(e){function t(e){o(this,t);var n=r(this,Object.getPrototypeOf(t).call(this,e));return n.state={selected:{},list:[{name:"Jason Statham",avatar:"http://img4.imgtn.bdimg.com/it/u=1328479659,3160485887&fm=21&gp=0.jpg",id:1801},{name:"Paul Walker",avatar:"http://qq1234.org/uploads/allimg/141125/3_141125135639_4.jpg",id:1802},{name:"Vin Diesel",avatar:"http://a3.att.hudong.com/34/68/01200000023882136323684597134_02_250_250.jpg",id:1803},{name:"Jordana Brewster",avatar:"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3407298466,4230891213&fm=58",id:1804},{name:"Dwayne Johnson",avatar:"http://img3.imgtn.bdimg.com/it/u=615024323,3632951200&fm=21&gp=0.jpg",id:1805}]},n}return i(t,e),a(t,[{key:"componentDidMount",value:function(){var e=this;this._setModalTitle(),this.props.modal&&(this.props.modal.onBeforeOk=function(){return e.getSelectedArr()})}},{key:"getSelectedArr",value:function(){var e=[],t=this.state.selected;for(var n in t)t.hasOwnProperty(n)&&e.push(t[n]);return e}},{key:"onItemClick",value:function(e){var t=this.state.list[e],n=t.id,o=this.state.selected;n in o?delete o[n]:o[n]=t,this.setState({selected:(0,f["default"])({},o)}),this._setModalTitle()}},{key:"_setModalTitle",value:function(){var e=Object.keys(this.state.selected);this.props.modal.setState({title:e.length+" Selected"})}},{key:"render",value:function(){var e=this;return s["default"].createElement("div",{id:"selectPage"},s["default"].createElement("div",{id:"list"},this.state.list.map(function(t,n){return s["default"].createElement("div",{className:(0,u["default"])({item:!0,active:t.id in e.state.selected}),onClick:function(t){e.onItemClick(n)}},s["default"].createElement("img",{className:"avatar",src:t.avatar,alt:t.name}),s["default"].createElement("div",{className:"desc"},t.name))})))}}]),t}(s["default"].Component);t["default"]=p}).call(this)}finally{}},function(e,t){"use strict";function n(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}var o=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;e.exports=Object.assign||function(e,t){for(var i,a,l=n(e),s=1;s<arguments.length;s++){i=Object(arguments[s]);for(var c in i)o.call(i,c)&&(l[c]=i[c]);if(Object.getOwnPropertySymbols){a=Object.getOwnPropertySymbols(i);for(var u=0;u<a.length;u++)r.call(i,a[u])&&(l[a[u]]=i[a[u]])}}return l}},function(e,t,n){var o=n(11);"string"==typeof o&&(o=[[e.id,o,""]]);n(13)(o,{});o.locals&&(e.exports=o.locals)},function(e,t,n){t=e.exports=n(12)(),t.push([e.id,".mentionField{position:relative;overflow:hidden;background:#fff}.mentionField .mentionEditor,.mentionField .mentionPlaceholder{line-height:1.6;padding:12px 15px}.mentionField .mentionEditor{border:1px solid #dfdfdf;min-height:100px;overflow-y:auto;-webkit-user-select:text}.mentionField .mentionEditor.focus{border:1px solid #2691f7}.mentionField .mentionEditor input{padding:0 2px;background:none;border:none;font-size:100%;color:#2691f7}.mentionField .mentionPlaceholder{position:absolute;top:0;left:0;right:0;color:#999;pointer-events:none}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(e,t,n){function o(e,t){for(var n=0;n<e.length;n++){var o=e[n],r=p[o.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](o.parts[i]);for(;i<o.parts.length;i++)r.parts.push(c(o.parts[i],t))}else{for(var a=[],i=0;i<o.parts.length;i++)a.push(c(o.parts[i],t));p[o.id]={id:o.id,refs:1,parts:a}}}}function r(e){for(var t=[],n={},o=0;o<e.length;o++){var r=e[o],i=r[0],a=r[1],l=r[2],s=r[3],c={css:a,media:l,sourceMap:s};n[i]?n[i].parts.push(c):t.push(n[i]={id:i,parts:[c]})}return t}function i(e,t){var n=b(),o=y[y.length-1];if("top"===e.insertAt)o?o.nextSibling?n.insertBefore(t,o.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),y.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function a(e){e.parentNode.removeChild(e);var t=y.indexOf(e);t>=0&&y.splice(t,1)}function l(e){var t=document.createElement("style");return t.type="text/css",i(e,t),t}function s(e){var t=document.createElement("link");return t.rel="stylesheet",i(e,t),t}function c(e,t){var n,o,r;if(t.singleton){var i=g++;n=v||(v=l(t)),o=u.bind(null,n,i,!1),r=u.bind(null,n,i,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=s(t),o=f.bind(null,n),r=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=l(t),o=d.bind(null,n),r=function(){a(n)});return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}function u(e,t,n,o){var r=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=w(t,r);else{var i=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function d(e,t){var n=t.css,o=t.media;if(o&&e.setAttribute("media",o),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function f(e,t){var n=t.css,o=t.sourceMap;o&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var r=new Blob([n],{type:"text/css"}),i=e.href;e.href=URL.createObjectURL(r),i&&URL.revokeObjectURL(i)}var p={},h=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},m=h(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),b=h(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,g=0,y=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=m()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=r(e);return o(n,t),function(e){for(var i=[],a=0;a<n.length;a++){var l=n[a],s=p[l.id];s.refs--,i.push(s)}if(e){var c=r(e);o(c,t)}for(var a=0;a<i.length;a++){var s=i[a];if(0===s.refs){for(var u=0;u<s.parts.length;u++)s.parts[u]();delete p[s.id]}}}};var w=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t,n){var o=n(15);"string"==typeof o&&(o=[[e.id,o,""]]);n(13)(o,{});o.locals&&(e.exports=o.locals)},function(e,t,n){t=e.exports=n(12)(),t.push([e.id,"#main{padding:15px}.title{padding:5px 0}.mentionBtn{display:inline-block;margin:15px 0;padding:5px 10px;border:1px solid #dfdfdf;color:#aaa;background:#fff;border-radius:4px;cursor:pointer}#selectPage{padding:0 15px}#list{overflow-y:auto}#list .item{position:relative;height:80px;padding-left:80px}#list .item.active{border-right:3px solid #2691f7;background:#e0e0e0}#list .item+.item{border-top:1px solid #dfdfdf}#list .item .avatar{position:absolute;left:10px;top:10px;width:60px;height:60px;border-radius:10px}#list .item .desc{padding-top:15px}.modalWrapper{display:none;opacity:0;position:fixed;left:0;right:0;top:0;bottom:0;z-index:20;background:rgba(0,0,0,.4)}.modalWrapper.active{display:block;opacity:1}.modal{overflow:hidden;width:100%;min-height:100%;background:#fff}.modal,.modal .modalContent{position:absolute;z-index:10}.modal .modalContent{top:30px;left:0;right:0;bottom:0;overflow-y:auto}.modal .modalContent.hasActions{bottom:42px}@media (min-width:680px){.modal{top:20%;right:20%;bottom:20%;left:20%;overflow:visible;min-height:260px;width:60%;border-radius:4px;box-shadow:0 0 4px 0 #333}}.modal .modalTitle{position:absolute;top:0;left:20px;right:20px;height:30px;line-height:30px;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.modal .modalActions{position:absolute;left:0;right:0;bottom:0;height:42px;z-index:10;display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch}.modalActions .btn{display:block;outline:none;cursor:pointer;height:42px;line-height:42px;-webkit-box-flex:1;-webkit-flex:1;-moz-flex:1;-ms-flex:1;flex:1;width:0}.modalActions .btn.btn-ok{color:#fff;background:#2691f7;border:1px solid #2691f7}.modalActions .btn.btn-cancel{color:#2691f7;background:#fff;border:1px solid #2691f7}.modalActions .btn:active,.modalActions .btn:hover{border:1px solid #2691f7}.modal .closeIcon{display:inline-block;position:absolute;top:5px;right:5px;z-index:10}.modal .closeIcon:before{content:'\\2573';line-height:1}body.modalOpen{overflow:hidden}.animated{-webkit-animation-duration:.3s;animation-duration:.3s;-webkit-animation-fill-mode:both;animation-fill-mode:both}@-webkit-keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}@keyframes slideInUp{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translateZ(0);transform:translateZ(0)}}.slideInUp{-webkit-animation-name:slideInUp;animation-name:slideInUp}",""])}]);