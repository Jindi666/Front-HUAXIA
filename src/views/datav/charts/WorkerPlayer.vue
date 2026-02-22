<template>
  <div id="video">
    <video-player
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      class="vjs-custom-skin"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @waiting="onPlayerWaiting($event)"
      @playing="onPlayerPlaying($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
      @ready="playerReadied"
      @statechanged="playerStateChanged($event)"
    />
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
// import './vjs-custom-skin.css'
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'DatavVideoPlayer',
  components: { videoPlayer },
  props: {
    url: { type: String, default: () => '' },
    recordingImage: { type: String, default: () => '' },
    autoplay: { type: Boolean, default: () => false },
    shown: { type: Boolean, default: () => false },
    videos: {
      type: Array,
      default: () => [
        // 'https://video-js.51miz.com/preview/video/00/00/14/50/V-145023-8E7F9667.mp4',
        // 'https://video-js.51miz.com/preview/video/00/00/16/58/V-165862-6ED79517.mp4',
        // 'https://video-js.51miz.com/preview/video/00/00/16/51/V-165152-BB8DE326.mp4',
        // 'https://video-js.51miz.com/preview/video/00/00/16/49/V-164949-135346B1.mp4'
      ]
    }
  },
  data() {
    let width = document.body.clientWidth
    if (width > 3000) {
      return {
        playerOptions: {
          width: '1140',
          height: '640',
          autoplay: this.autoplay,
          muted: true,
          language: 'en',
          loop: false,
          preload: false,
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [],
          // poster: '/images/player-poster.png',
          poster: this.recordingImage,
          notSupportedMessage: this.$t('taskManager.videoFileExist.text'),
          controlBar: {
            // timeDivider: false, // 当前时间和持续时间的分隔符
            // durationDisplay: false, // 时长显示
            remainingTimeDisplay: true, // 剩下时间
            currentTimeDisplay: false, // 当前时间
            // volumeControl: false, // 声音控制键
            playToggle: true, // 暂停和播放键
            // progressControl: false, // 进度条
            fullscreenToggle: true // 全屏按钮
          },
          currentSourceSrc: ''
        }
      }
    } else {
      return {
        playerOptions: {
          width: '570',
          height: '320',
          autoplay: this.autoplay,
          muted: true,
          language: 'en',
          loop: false,
          preload: true,
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [],
          controlBar: {
            // timeDivider: false, // 当前时间和持续时间的分隔符
            // durationDisplay: false, // 时长显示
            remainingTimeDisplay: true, // 剩下时间
            currentTimeDisplay: false, // 当前时间
            // volumeControl: false, // 声音控制键
            playToggle: true, // 暂停和播放键
            // progressControl: false, // 进度条
            fullscreenToggle: true // 全屏按钮
          },
          // poster: '/images/player-poster.png',
          poster: this.recordingImage,
          notSupportedMessage: this.$t('taskManager.videoFileExist.text'),
          currentSourceSrc: ''
        }
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  watch: {
    url: function(newUrl) {
      // this.playerOptions.sources[0].src = newUrl
      // this.player.src({ type: 'video/mp4', src: newUrl })
    },
    videos: function(urls) {
      // this.playerOptions.sources[0].src = newUrl
      // console.log(urls)
      this.player.src({ type: 'video/mp4', src: urls[0] })
      this.currentSourceSrc = urls.length ? urls[0] : ''
    },
    shown: function(val) {
      if (!val) {
        // this.$refs.videoPlayer.pause()
        this.player.pause()
      }
    }
  },
  created() {},
  mounted() {
    // this.$refs.videoPlayer.src({ type: 'video/mp4', url: this.url })
    // console.log('videos:' + this.videos)
    this.player.src({ type: 'video/mp4', src: this.videos.length ? this.videos[0] : '' })
    this.currentSourceSrc = this.videos.length ? this.videos[0] : ''
    // console.log('currentSourceSrc:' + this.currentSourceSrc)
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    onPlayerEnded(player) {
      // let { sourcesList } = player.options_
      let length = this.videos.length
      let currentSourceSrc = ''
      // console.log('length:' + JSON.stringify(sourcesList))
      this.videos.forEach((v, i) => {
        // console.log('onPlayerEnded')
        if (this.currentSourceSrc === v) {
          let index = i === length - 1 ? 0 : ++i
          // this.$set(this.playerOptions, 'sources', [{ type: 'video/mp4', src: this.videos[index] }])
          this.player.src({ type: 'video/mp4', src: this.videos[index] })
          currentSourceSrc = this.videos[index]
          this.player.load()
        }
      })
      this.currentSourceSrc = currentSourceSrc
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied(player) {
      // seek to 10s
      // console.log('example player 1 readied', player)
      // player.currentTime(0)
      // console.log('example 01: the player is readied', player)
    }
  }
}
</script>

<style scoped lang="less">
#video /deep/ .video-js:hover .vjs-big-play-button,
.vjs-custom-skin > .video-js .vjs-big-play-button:focus,
.vjs-custom-skin > .video-js .vjs-big-play-button:active {
  background-color: rgba(31, 119, 243, 1);
  border-color: rgba(255, 255, 255, 0);
  vertical-align: middle;
  text-align: center;
  // margin-left: -25px;
  // position: relative;
  // left: 55%;
  // top: 45%;
}
#video /deep/ .vjs-custom-skin > .video-js .vjs-big-play-button {
  // background-color: rgba(255, 0, 0, 0.45);
  text-align: center;
  line-height: 1.2em !important;
  // font-size: 60px;
  border-radius: 50%;
  // margin-left: -25px;
  border-color: rgba(255, 255, 255, 0);
  // color: transparent !important;
  // background-color: #fff;
  height: 80px !important;
  width: 80px !important;
  @media screen and (min-width: 3000px) {
    line-height: 2.4em !important;
    margin-left: -80px;
    margin-top: -80px !important;
    height: 160px !important;
    width: 160px !important;
  }
  // line-height: 1em !important;
  // margin-top: -1em !important;
}
#video /deep/ .vjs-custom-skin > .video-js .vjs-big-play-button .vjs-icon-placeholder {
  font-size: 60px;
  position: absolute;
  top: 17px;
  left: 8px;
  @media screen and (min-width: 3000px) {
    font-size: 120px;
    top: 34px;
    left: 20px;
  }
}

#video /deep/ .vjs-custom-skin > .vjs-error .vjs-error-display .vjs-modal-dialog-content {
  font-size: 3em;
  // @media screen and (min-width: 3000px) {
  //   font-size: 2.8em;
  // }
}
</style>
