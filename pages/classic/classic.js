// pages/classic/classic.js

import classicModel from '../../api/classic.js'
import likeModel from '../../api/like.js'
import storage from '../../utils/storage.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true, // 根据返回数据，设置属性，判断是否最新一期或者最后一期
    first: false,
    like: false,
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest().then(res => {
      const index = res.index
      storage.set(index, res)
      storage.set('latest-index', index)
      this.setData({
        classic: res,
        like: res.like_status,
        count: res.fav_nums
      })
    })

  },

  _isLatest(index) {
    let latestIndex = storage.get('latest-index')
    return index === latestIndex ? true : false
  },

  _isFirst(index) {
    return index === 1 ? true : false
  },

  _updatePageData(res) {
    this._getLikeStatus(res.type, res.id)
    this.setData({
      classic: res,
      latest: this._isLatest(res.index),
      first: this._isFirst(res.index)
    })
  },

  _getClassic(index, nextOrPrevious) {
    let isNext = nextOrPrevious === 'next'
    let classic = isNext ? storage.get(index + 1) : storage.get(index - 1)
    if (classic) {
      this._updatePageData(classic)
    } else {
      let useApi = isNext ? classicModel.getNext : classicModel.getPrevious
      useApi(index).then(res => {
        storage.set(res.index, res)
        this._updatePageData(res)
      })
    }

  },

  // 不从缓存中获取喜欢信息
  _getLikeStatus(type, id) {
    likeModel.getClassicLikeStatus(type, id).then(res => {
      this.setData({
        like: res.like_status,
        count: res.fav_nums
      })
    })
  },

  // 前一期
  onPrevious(event) {
    let index = this.data.classic.index
    this._getClassic(index, 'previous')
  },

  // 后一期
  onNext: function (event) {
    let index = this.data.classic.index
    this._getClassic(index, 'next')
  },

  // 点赞逻辑
  onLike: function (event) {
    let likeOrCancel = event.detail.behavior
    let useApi = null
    if (likeOrCancel === 'like') {
      useApi = likeModel.likeApi
    } else {
      useApi = likeModel.cancelLikeApi
    }
    useApi({
      type: this.data.classic.type,
      artId: this.data.classic.id
    })
  },

  onShareAppMessage() {

  }
})