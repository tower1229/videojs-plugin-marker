import videojs$1 from "video.js";
const Component$1 = videojs$1.getComponent("Component");
const TimeTooltip = videojs$1.getComponent("TimeTooltip");
class MarkerPointTip extends Component$1 {
  constructor(player, options) {
    super(player, options);
    this.options = options;
    this.timeToltip = new TimeTooltip(player);
    this.timeToltip.hide();
    this.addChild(this.timeToltip);
    this.addClass("vjs-marker-point-tip");
    this.timeToltip.el_.innerHTML = `
      <p class="vjs-marker-point-tip-time">${videojs$1.formatTime(this.options.offset, 600)}</p>
      <p class="vjs-marker-point-tip-content">${this.options.data ? this.options.data.content : ""}</p>
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
    this.on("mousedown", (ev) => {
      typeof options.onClick === "function" && options.onClick(ev);
    });
  }
  createEl() {
    return videojs$1.dom.createEl("div", {
      className: "vjs-marker-point"
    });
  }
  updatePosition(duration) {
    this.el_ && (this.el_.style.left = this.offset / duration * 100 + "%");
  }
}
const Component = videojs$1.getComponent("Component");
let playerDuration;
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
    const setMarkers = () => {
      options.markers.forEach((marker) => {
        marker.updatePosition(playerDuration);
      });
    };
    const onLoadedMetaData = () => {
      playerDuration = player.duration();
      setMarkers();
      player.off("loadedmetadata", onLoadedMetaData);
    };
    if (playerDuration) {
      setMarkers();
    } else {
      player.on("loadedmetadata", onLoadedMetaData);
    }
  }
  createEl() {
    return videojs$1.dom.createEl("div", {
      className: "vjs-marker-bar"
    });
  }
}
videojs$1.registerComponent("MarkerBar", MarkerBar);
const version = "0.0.8";
var plugin = "";
let videojs;
if (window.videojs) {
  videojs = window.videojs;
  console.warn(`MarkerPlugin: \u68C0\u6D4B\u5230window.videojs`);
} else {
  videojs = videojs$1;
}
const Plugin = videojs.getPlugin("plugin");
const defaults = {};
class MarkerPlugin extends Plugin {
  constructor(player, options) {
    super(player);
    this.player.addClass("vjs-marker-plugin");
    this.updateOptions(options);
  }
  createMarkerBar() {
    this.markerBar = MarkerBar.build(this.player, {
      markers: this.options.markers
    });
    return this.markerBar;
  }
  updateOptions(options) {
    this.options = videojs.mergeOptions(defaults, options);
    if (this.markerBar)
      this.markerBar.dispose();
    const container = this.player.getDescendant([
      "ControlBar",
      "ProgressControl",
      "SeekBar"
    ]);
    this.createMarkerBar();
    container.addChild(this.markerBar);
  }
}
MarkerPlugin.defaultState = {};
MarkerPlugin.VERSION = version;
videojs.registerPlugin("markerPlugin", MarkerPlugin);
export { MarkerPlugin as default };
