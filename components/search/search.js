// components/search/search-cmp.js
import {
  paginationBev
} from '../behaviors/pagination.js'
import bookModel from '../../api/book.js'

const KEY = 'q'
const MAX = 10

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: '_loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isHideCancel: true,
    historyKeys: [],
    hotKeys: [],
    confirmSearch: false,
    q: '',
    loadingCenter: false,
  },

  attached() {
    console.log(this.data.dataArray);
    this.setData({
      historyKeys: this._getHistory()
    })
    bookModel.getHotKeywords().then(res => {
      this.setData({
        hotKeys: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   * 
   */
  methods: {

    _loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.noMoreData()) {
        return
      }
      if (this.isLocked()) {
        return
      }
      this.locked()
      bookModel.bookSearch({
        summary: 1,
        q: this.data.q,
        start: this.getCurrentStart()
      }).then(res => {
        this.setMoreData(res.books)
        this.unLocked()
      }).catch(res => {
        this.unLocked()
      })
    },

    _getHistory() {
      var keywords = wx.getStorageSync(KEY)
      return keywords ? keywords : []
    },

    _addToHistory(word) {
      let keywords = this._getHistory()
      if (keywords) {
        let index = keywords.includes(word)
        if (!index) {
          let length = keywords.length
          if (length >= MAX) {
            keywords.pop(word)
          }
          keywords.unshift(word)
        }
        wx.setStorageSync(KEY, keywords)
      } else {
        keywords = [word]
        wx.setStorageSync(KEY, keywords)
      }
    },

    onCancel(event) {
      // this.initPagination()
      this.triggerEvent('cancel', {}, {})
    },

    onDelete(event) {
      this.initPagination()
      this.setData({
        confirmSearch: false,
        q: '',
        isHideCancel: true
      })
    },

    onInput(event) {
      const value = event.detail.value
      console.log(value);
      if (value) {
        this.setData({
          isHideCancel: false
        })
      } else {
        this.setData({
          isHideCancel: true
        })
      }
    },

    onConfirm(event) {
      // 首先切换状态，保持客户端流畅

      const q = event.detail.value || event.detail.text

      if (!q) {
        wx.showToast({
          title: '请输入关键词！',
          icon: 'none'
        })
        return
      }

      this.setData({
        confirmSearch: true,
        loadingCenter: true
      })

      bookModel.bookSearch({
        q,
        start: this.getCurrentStart()
      }).then(res => {
        const bookList = res.books
        if (bookList.length > 0) {
          this._addToHistory(q)
        }
        console.log(bookList);
        this.setMoreData(bookList)
        this.saveTotal(res.total)
        this.setData({
          q: q,
          loadingCenter: false
        })
      }).catch(res => {
        this.setData({
          loadingCenter: false
        })
      })
    }
  }
})