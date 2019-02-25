// pages/detail/detail.js

import bookModel from '../../api/book.js'
import commentModel from '../../api/comment.js'
import likeModel from '../../api/like.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    comments: [],
    noComment: true,
    posting: false,
    like: false,
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bid = options.bid
    wx.showLoading()
    Promise.all([
      bookModel.getDetail(bid),
      commentModel.getComment(bid),
      bookModel.getLikeStatus(bid)
    ]).then(res => {
      this.setData({
        book: res[0],
        noComment: res[1].comments.length < 1,
        comments: res[1].comments,
        like: res[2].like_status,
        count: res[2].fav_nums
      })
      wx.hideLoading()
    })
    // bookModel.getDetail(bid).then(res => {
    //   this.setData({
    //     book: res
    //   })
    // })

    // commentModel.getComment(bid).then(res => {
    //   this.setData({
    //     noComment: res.comments.length < 1,
    //     comments: res.comments
    //   })
    // })

    // bookModel.getLikeStatus(bid).then(res => {
    //   this.setData({
    //     like: res.like_status,
    //     count: res.fav_nums
    //   })
    // })
  },

  onFakePost: function () {
    this.setData({
      posting: true
    })
  },

  onPost: function (event) {
    let comment = event.detail.value || event.detail.text
    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    commentModel.postComment({
      book_id: this.data.book.id,
      content: comment,
    }).then(res => {
      wx.showToast({
        title: '+ 1',
        icon: "none"
      })
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        noComment: false
      })
    })

    this.setData({
      posting: false
    })
  },

  onCancel: function (event) {
    this.setData({
      posting: false
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
      type: 400,
      artId: this.data.book.id
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})