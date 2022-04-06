# videojs-plugin-marker

videojs进度条打点插件。基于[videojs-marker-plugin]()项目二次开发，精简掉面板展示功能并微调样式，使用Vite构建。

![preivew](public/img/album.png)

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
const player = videojs(this.$refs.videoPlayer, options)

//  添加打点信息
player.markerPlugin({
    markers: [
        {
            offset: 2,
            type: 'text',
            data: {
                content: 'content1'
            }
        },
        {
            offset: 10,
            type: 'text',
            data: {
                content: 'content2'
            }
        },
    ]
})
```