// components/classic/music/music.js
import {
  classicBehavior
} from '../classic-beh.js'

let mMgr = wx.getBackgroundAudioManager()

// 要实现切换时，音乐仍然播放，在点击另一个音乐时，停止之前音乐。
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBehavior],

  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    waittingUrl: 'images/player@waitting.png',
    playingUrl: 'images/player@playing.png'
  },

  attached: function () {
    this._recoverStatus()
    this._monitorSwitch()
  },

  detached: function () {
    // wx.pauseBackgroundAudio()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(event) {
      if (!this.data.playing) {
        this.setData({
          playing: true,
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      } else {
        this.setData({
          playing: false,
        })
        mMgr.pause()
      }
    },

    _recoverStatus() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => { // 音乐自然播放完成
        this._recoverStatus()
      })
    }

  }
})