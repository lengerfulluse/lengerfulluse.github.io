!function(t,e,i,n){function s(e,i){this.element=t(e),this.settings=t.extend({},y,i),this._defaults=y,this._name=d,this.init()}function o(e){D&&(e.element.addClass("navbar-hidden").animate({top:-1*parseInt(e.element.css("height"),10)+e.settings.navbarOffset},{queue:!1,duration:e.settings.animationDuration}),t(".dropdown.open .dropdown-toggle",e.element).dropdown("toggle"),D=!1,e.element.trigger("hide.autoHidingNavbar"))}function h(t){D||(t.element.removeClass("navbar-hidden").animate({top:0},{queue:!1,duration:t.settings.animationDuration}),D=!0,t.element.trigger("show.autoHidingNavbar"))}function a(t){var e=c.scrollTop(),i=e-v;if(v=e,i<0){if(D)return;(t.settings.showOnUpscroll||e<=f)&&h(t)}else if(i>0){if(!D)return void(t.settings.showOnBottom&&e+b===m.height()&&h(t));e>=f&&o(t)}}function u(t){t.settings.disableAutohide||(O=(new Date).getTime(),a(t))}function r(t){m.on("scroll."+d,function(){(new Date).getTime()-O>w?u(t):(clearTimeout(g),g=setTimeout(function(){u(t)},w))}),c.on("resize."+d,function(){clearTimeout(p),p=setTimeout(function(){b=c.height()},w)})}function l(){m.off("."+d),c.off("."+d)}var f,d="autoHidingNavbar",c=t(e),m=t(i),g=null,p=null,w=70,O=0,v=null,b=c.height(),D=!0,y={disableAutohide:!1,showOnUpscroll:!0,showOnBottom:!0,hideOffset:"auto",animationDuration:200,navbarOffset:0};s.prototype={init:function(){return this.elements={navbar:this.element},this.setDisableAutohide(this.settings.disableAutohide),this.setShowOnUpscroll(this.settings.showOnUpscroll),this.setShowOnBottom(this.settings.showOnBottom),this.setHideOffset(this.settings.hideOffset),this.setAnimationDuration(this.settings.animationDuration),f="auto"===this.settings.hideOffset?parseInt(this.element.css("height"),10):this.settings.hideOffset,r(this),this.element},setDisableAutohide:function(t){return this.settings.disableAutohide=t,this.element},setShowOnUpscroll:function(t){return this.settings.showOnUpscroll=t,this.element},setShowOnBottom:function(t){return this.settings.showOnBottom=t,this.element},setHideOffset:function(t){return this.settings.hideOffset=t,this.element},setAnimationDuration:function(t){return this.settings.animationDuration=t,this.element},show:function(){return h(this),this.element},hide:function(){return o(this),this.element},destroy:function(){return l(),h(this),t.data(this,"plugin_"+d,null),this.element}},t.fn[d]=function(e){var i=arguments;if(void 0===e||"object"==typeof e)return this.each(function(){t.data(this,"plugin_"+d)||t.data(this,"plugin_"+d,new s(this,e))});if("string"==typeof e&&"_"!==e[0]&&"init"!==e){var n;return this.each(function(){var o=t.data(this,"plugin_"+d);o instanceof s&&"function"==typeof o[e]&&(n=o[e].apply(o,Array.prototype.slice.call(i,1)))}),void 0!==n?n:this}}}(jQuery,window,document);