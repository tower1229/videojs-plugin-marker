(function(o,a){typeof exports=="object"&&typeof module!="undefined"?module.exports=a(require("video.js")):typeof define=="function"&&define.amd?define(["video.js"],a):(o=typeof globalThis!="undefined"?globalThis:o||self,o.lib=a(o.videojs))})(this,function(o){"use strict";function a(s){return s&&typeof s=="object"&&"default"in s?s:{default:s}}var i=a(o);const d=i.default.getComponent("Component"),m=i.default.getComponent("TimeTooltip");class u extends d{constructor(e,t){super(e,t),this.options=t,this.timeToltip=new m(e),this.timeToltip.hide(),this.addChild(this.timeToltip),this.addClass("vjs-marker-point-tip"),this.timeToltip.el_.innerHTML=`
      <p class="vjs-marker-point-tip-time">${i.default.formatTime(this.options.offset,600)}</p>
      <p class="vjs-marker-point-tip-content">${this.options.data.content}</p>
    `}updatePosition(){this.timeToltip.el_.style.left=`-${this.timeToltip.el_.getBoundingClientRect().width/2}px`}}class h extends d{constructor(e,t){super(e,t),this.offset=t.offset,this.type=t.type,this.data=t.data,this.tip=new u(e,{data:this.data,offset:this.offset}),this.mouseDisplay=e.getDescendant(["ControlBar","ProgressControl","SeekBar","MouseTimeDisplay"]),this.addChild(this.tip),this.enableTouchActivity(),this.on("mouseenter",n=>{this.mouseDisplay.hide(),this.tip.timeToltip.show(),this.tip.updatePosition()}),this.on("mouseleave",n=>{this.mouseDisplay.show(),this.tip.timeToltip.hide()})}createEl(){return i.default.dom.createEl("div",{className:"vjs-marker-point"})}updatePosition(e){console.log(this.offset,e),this.el_.style.left=this.offset/e*100+"%"}}const c=i.default.getComponent("Component");class l extends c{static build(e,t){t.markers instanceof Array||(t.markers=[]);const n=[];for(let r=t.markers.length;r--;)n.push(new h(e,t.markers[r]));return new l(e,{markers:n,barName:"markerPoint"})}constructor(e,t){super(e,t),t.markers.forEach(r=>this.addChild(r));const n=()=>{const r=e.duration();t.markers.forEach(g=>{g.updatePosition(r)}),e.off("loadedmetadata",n)};e.on("loadedmetadata",n)}createEl(){return i.default.dom.createEl("div",{className:"vjs-marker-bar"})}}i.default.registerComponent("MarkerBar",l);const f="0.0.1";var j=`/**
 * css for videojs-marker-plugin
 * With the default plugins for postcss you can
 * - @import files, they will be inlined during build
 * - not worry about browser prefixes, they will be handled
 * - nest selectors. This follows the css specification that is
 *   currently out on some browsers. See https://tabatkins.github.io/specs/css-nesting/
 * - custom properties (aka variables) via the var(--var-name) syntax. See
 *   https://www.w3.org/TR/css-variables-1/
 */
/* Note: all vars must be defined here, there are no "local" vars */
:root {
  --base-font-size: 9;
  --font-size: 7;
}
.video-js {
  font-size: 12px;
}
.video-js .vjs-slider-vertical .vjs-volume-level:before {
  left: -0.35em;
}
.video-js .vjs-play-progress {
  background-color: rgba(255, 255, 255, 0.5);
}
.video-js.vjs-marker-plugin {
  /* This class is added to the video.js element by the plugin by default. */
  display: block;
}
.video-js.vjs-marker-plugin .vjs-marker-bar {
  position: relative;
  width: 100%;
  height: 100%;
}
.video-js.vjs-marker-plugin .vjs-marker-point {
  position: absolute;
  width: 6px;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  left: -0.15em;
}
.video-js.vjs-marker-plugin .vjs-marker-point .vjs-marker-point-tip {
  position: absolute;
  left: 50%;
  top: 0;
  font-size: 12px;
  text-align: left;
  width: 300px;
  height: 0;
}
.video-js.vjs-marker-plugin .vjs-marker-point .vjs-marker-point-tip .vjs-time-tooltip {
  max-width: 164px;
  padding: 8px 12px;
  bottom: 12px;
  top: auto;
  background: white;
}
.video-js.vjs-marker-plugin .vjs-marker-point .vjs-marker-point-tip .vjs-time-tooltip::before {
  content: '';
  border-top: 10px solid white;
  border-right: 5px solid transparent;
  border-bottom: 0 solid transparent;
  border-left: 5px solid transparent;
  position: absolute;
  left: calc(50% - 6px);
  top: 100%;
}
.video-js.vjs-marker-plugin .vjs-marker-point .vjs-marker-point-tip .vjs-marker-point-tip-time {
  margin: 0 0 4px 0;
  color: #026DFF;
  font-weight: bold;
}
.video-js.vjs-marker-plugin .vjs-marker-point .vjs-marker-point-tip .vjs-marker-point-tip-content {
  word-break: break-all;
  margin: 0;
  color: rgba(0, 0, 0, 0.7);
}
`;const v=i.default.getPlugin("plugin"),k={};class p extends v{constructor(e,t){super(e),this.options=i.default.mergeOptions(k,t),this.player.addClass("vjs-marker-plugin"),this.updateOptions()}createMarkerBar(){return this.markerBar=l.build(this.player,{markers:this.options.markers}),this.markerBar}updateOptions(e){this.options=i.default.mergeOptions(this.options,e),this.markerBar&&this.markerBar.dispose();const t=this.player.getDescendant(["ControlBar","ProgressControl","SeekBar"]);this.createMarkerBar(),t.addChild(this.markerBar)}}return p.defaultState={},p.VERSION=f,i.default.registerPlugin("markerPlugin",p),p});
