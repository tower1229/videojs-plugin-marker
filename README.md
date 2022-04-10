# videojs-plugin-marker

videojs进度条打点插件。基于[videojs-marker-plugin]()项目二次开发，支持marker点更新和marker点击事件；更换构建工具为Vite。

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

//  设置打点信息
player.markerPlugin({
    markers: [
        {
            offset: 2
        }
    ]
})

// 更新打点信息
player.markerPlugin().updateOptions({
    markers: [
    {
        offset: 10,
        data: {
            content: 'content2'
        },
        onClick(e) {
            e.stopPropagation()     // marker点击事件，可以屏蔽原进度条动作
            alert(`marker click!`)
        }
    },
    ]
});
```