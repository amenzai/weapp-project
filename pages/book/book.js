// pages/book/book.js

import bookModel from '../../api/book.js'

import {
  random
} from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchPanel: false,
    books: [],
    more: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    bookModel.getHotList().then(res => {
      this.setData({
        books: res
      })
    })
  },

  onActivateSearch(event) {
    this.setData({
      searchPanel: true
    })
  },

  onCancel(event) {
    this.setData({
      searchPanel: false
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.setData({
      more: random(16)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})