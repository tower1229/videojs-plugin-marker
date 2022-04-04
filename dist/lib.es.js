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
const version = "0.0.2";
var plugin = "";
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
