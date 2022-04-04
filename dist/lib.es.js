import videojs from "video.js";
const Component$1 = videojs.getComponent("Component");
const TimeTooltip = videojs.getComponent("TimeTooltip");
class MarkerPointTip extends Component$1 {
  constructor(player, options) {
    super(player, options);
    this.options = options;
    this.timeToltip = new TimeTooltip(player);
    this.timeToltip.hide();
    this.addChild(this.timeToltip);
    this.addClass("vjs-marker-point-tip");
    this.timeToltip.el_.innerHTML = `
      <p class="vjs-marker-point-tip-time">${videojs.formatTime(this.options.offset, 600)}</p>
      <p class="vjs-marker-point-tip-content">${this.options.data.content}</p>
    `;
  }
  updatePosition() {
    this.timeToltip.el_.style.left = `-${this.timeToltip.el_.getBoundingClientRect().width / 2}px`;
  }
}
class MarkerPoint extends Component$1 {
  constructor(player, options) {
    super(player, options);
    this.offset = options.offset;
    this.type = options.type;
    this.data = options.data;
    this.tip = new MarkerPointTip(player, {
      data: this.data,
      offset: this.offset
    });
    this.mouseDisplay = player.getDescendant(["ControlBar", "ProgressControl", "SeekBar", "MouseTimeDisplay"]);
    this.addChild(this.tip);
    this.enableTouchActivity();
    this.on("mouseenter", (ev) => {
      this.mouseDisplay.hide();
      this.tip.timeToltip.show();
      this.tip.updatePosition();
    });
    this.on("mouseleave", (ev) => {
      this.mouseDisplay.show();
      this.tip.timeToltip.hide();
    });
  }
  createEl() {
    return videojs.dom.createEl("div", {
      className: "vjs-marker-point"
    });
  }
  updatePosition(duration) {
    console.log(this.offset, duration);
    this.el_.style.left = this.offset / duration * 100 + "%";
  }
}
const Component = videojs.getComponent("Component");
class MarkerBar extends Component {
  static build(player, options) {
    if (!(options.markers instanceof Array)) {
      options.markers = [];
    }
    const markers = [];
    for (let i = options.markers.length; i--; ) {
      markers.push(new MarkerPoint(player, options.markers[i]));
    }
    return new MarkerBar(player, { markers, barName: "markerPoint" });
  }
  constructor(player, options) {
    super(player, options);
    options.markers.forEach((marker) => this.addChild(marker));
    const onLoadedMetaData = () => {
      const duration = player.duration();
      options.markers.forEach((marker) => {
        marker.updatePosition(duration);
      });
      player.off("loadedmetadata", onLoadedMetaData);
    };
    player.on("loadedmetadata", onLoadedMetaData);
  }
  createEl() {
    return videojs.dom.createEl("div", {
      className: "vjs-marker-bar"
    });
  }
}
videojs.registerComponent("MarkerBar", MarkerBar);
const version = "0.0.1";
var plugin = `/**
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
`;
const Plugin = videojs.getPlugin("plugin");
const defaults = {};
class MarkerPlugin extends Plugin {
  constructor(player, options) {
    super(player);
    this.options = videojs.mergeOptions(defaults, options);
    this.player.addClass("vjs-marker-plugin");
    this.updateOptions();
  }
  createMarkerBar() {
    this.markerBar = MarkerBar.build(this.player, {
      markers: this.options.markers
    });
    return this.markerBar;
  }
  updateOptions(options) {
    this.options = videojs.mergeOptions(this.options, options);
    if (this.markerBar)
      this.markerBar.dispose();
    const container = this.player.getDescendant(["ControlBar", "ProgressControl", "SeekBar"]);
    this.createMarkerBar();
    container.addChild(this.markerBar);
  }
}
MarkerPlugin.defaultState = {};
MarkerPlugin.VERSION = version;
videojs.registerPlugin("markerPlugin", MarkerPlugin);
export { MarkerPlugin as default };
