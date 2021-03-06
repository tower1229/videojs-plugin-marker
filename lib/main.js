import vjs from "video.js";
import { MarkerBar } from "./markerBar";
import { version as VERSION } from "../package.json";
import "./plugin.less";
// 兼容videojs独立引入
let videojs;
if (window.videojs) {
  videojs = window.videojs;
  console.warn(`MarkerPlugin: 检测到window.videojs`);
} else {
  videojs = vjs;
}
const Plugin = videojs.getPlugin("plugin");

// Default options for the plugin.
const defaults = {};

/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */
class MarkerPlugin extends Plugin {
  /**
   * Create a MarkerPlugin plugin instance.
   *
   * @param  {Player} player
   *         A Video.js Player instance.
   *
   * @param  {Object} [options]
   *         An optional options object.
   *
   *         While not a core part of the Video.js plugin architecture, a
   *         second argument of options is a convenient way to accept inputs
   *         from your plugin's caller.
   */
  constructor(player, options) {
    // the parent class will add player under this.player
    super(player);

    this.player.addClass("vjs-marker-plugin");

    this.updateOptions(options);
  }

  /**
   * create {@link MarkerBar} instance
   *
   * @return {MarkerBar} return a {@link MarkerBar} instance
   */
  createMarkerBar() {
    this.markerBar = MarkerBar.build(this.player, {
      markers: this.options.markers,
    });
    return this.markerBar;
  }

  updateOptions(options) {
    this.options = videojs.mergeOptions(defaults, options);

    if (this.markerBar) this.markerBar.dispose();

    const container = this.player.getDescendant([
      "ControlBar",
      "ProgressControl",
      "SeekBar",
    ]);
    this.createMarkerBar();
    container.addChild(this.markerBar);
  }
}

// Define default values for the plugin's `state` object here.
MarkerPlugin.defaultState = {};

// Include the version number.
MarkerPlugin.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin("markerPlugin", MarkerPlugin);

export default MarkerPlugin;
