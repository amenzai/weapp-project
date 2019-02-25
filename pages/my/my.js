import classicModel from '../../api/classic.js'
import bookModel from '../../api/book.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: true,
    userInfo: null,
    classics: [],
    myBooksCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(options) {
    this._getMyFavor()
    this._getUserInfo()
    this._getMyBookCount()
  },

  _getMyFavor() {
    classicModel.getMyFavor().then(res => {
      this.setData({
        classics: res
      })
    })
  },

  _getMyBookCount() {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        myBooksCount: res.count
      })
    })
  },

  _getUserInfo() {
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (data) => {
              this.setData({
                hasUserInfo: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },

  onGetUserInfo(event) {
    let userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }
  },



  onPreviewTap(event) {
    wx.navigateTo({
      url: '/pages/classic-detail/index?id=' + event.detail.cid + '&type=' + event.detail.type
    })
  },
  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },

  onShareAppMessage() {

  }
})