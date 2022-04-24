<template>
  <h1>videojs-plugin-marker</h1>

  <p>
    videojs进度条打点插件。基于[videojs-marker-plugin]()项目二次开发，支持marker点更新和marker点击事件；更换构建工具为Vite。
  </p>

  <div style="width: 800px; margin: auto">
    <video ref="videoPlayer" class="video-js vjs-fluid"></video>
  </div>
  <p>
    <a href="https://github.com/tower1229/videojs-plugin-marker"> Github </a>
    <a
      href="https://github.com/tower1229/videojs-plugin-marker/blob/master/README.md"
    >
      文档
    </a>
    <a href="https://refined-x.com/"> 博客 </a>
  </p>
  <p>
    <img
      src="/img/carbon.png"
      alt=""
      style="display: block; max-width: 80%; margin: auto"
    />
  </p>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.min.css";
import "../../lib/main.js";

export default {
  mounted() {
    const options = {
      autoplay: true,
      controls: true,
      playbackRates: [0.5, 1, 1.5, 2],
    };

    const player = videojs(this.$refs.videoPlayer, options, () => {
      this.$emit("ready", player);
    });

    player.src({
      src: "https://static.refined-x.com/static/1080p-watermark.mp4",
      type: "video/mp4",
    });

    player.markerPlugin().updateOptions({
      //  打点信息
      markers: [
        {
          offset: 10,
        },
        {
          offset: 20,
          data: {
            content: "content2",
          },
          onClick(e) {
            e.stopPropagation();
            alert(`mark2 click!`);
          },
        },
      ],
    });
  },
  beforeDestroy() {
    if (player) {
      player.dispose();
    }
  },
};
</script>

<style scoped>
a {
  color: #42b983;
  margin: 0 10px;
}
</style>
