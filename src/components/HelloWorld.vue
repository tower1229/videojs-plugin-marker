<template>
  <h1>videojs-plugin-marker</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <video ref="videoPlayer" class="video-js" width="600" height="400" style="margin: auto"></video>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import "../../lib/main.js";

export default {
  mounted() {
    const options = {
      autoplay: true,
      controls: true,
      playbackRates: [0.5, 1, 1.5, 2]
    }

    const player = videojs(this.$refs.videoPlayer, options, () => {
      this.$emit('ready', player);
    })

    player.src({
      src: "https://static.refined-x.com/static/1080p-watermark.mp4",
      type: "video/mp4"
    })

    player.markerPlugin({
      //  打点信息
      markers: [
        {
          offset: 10,
          data: {
            content: ''
          },
          onClick(e) {
            e.stopPropagation()
            alert(`mark1 click!`)
          }
        },
        {
          offset: 20,
          data: {
            content: 'content2'
          },
          onClick(e) {
            e.stopPropagation()
            alert(`mark2 click!`)
          }
        },
      ]
    });

  },
  beforeDestroy() {
    if (player) {
      player.dispose()
    }
  }
}
</script>

<style scoped>a {
  color: #42b983;
}</style>
