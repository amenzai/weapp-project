// pages/classic/classic.js

import classicModel from '../../api/classic.js'
import likeModel from '../../api/like.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      type,
      id
    } = options
    classicModel.getDetail(type, id).then(res => {
      this.setData({
        classic: res
      })
    })

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