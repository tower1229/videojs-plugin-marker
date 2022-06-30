# videojs-plugin-marker

videojs 进度条打点插件。基于[videojs-marker-plugin]()项目二次开发，支持 marker 点更新和 marker 点击事件；更换构建工具为 Vite，支持 video.js@7.x。

![preivew](public/img/album.png)

## videojs 系列项目

- [videojs-plugin-source-switcher](https://github.com/tower1229/videojs-plugin-source-switcher) : videojs 视频源切换插件

## Install

```bash
npm i @tower1229/videojs-plugin-marker -S
```

```bash
import '@tower1229/videojs-plugin-marker';
import '@tower1229/videojs-plugin-marker/dist/style.css';

```

## Use

```js
const player = videojs(this.$refs.videoPlayer, options);

//  设置打点信息
player.markerPlugin({
  markers: [
    {
      offset: 2,
    },
  ],
});

// 更新打点信息
player.markerPlugin().updateOptions({
  markers: [
    {
      offset: 10,
      data: {
        content: "content2",
      },
      onClick(e) {
        e.stopPropagation(); // marker点击事件，可以屏蔽原进度条动作
        alert(`marker click!`);
      },
    },
  ],
});
```
