const paginationBev = Behavior({
  properties: {

  },
  data: {
    start: 0,
    count: 20,
    total: 0,
    loading: false, // 上拉 loading
    dataArray: [], // 列表集合
    empty: false, // 判断第一次请求是否有数据
    noMoreData: false // 判断是否有更多数据
  },

  methods: {
    isLocked() {
      return this.data.loading
    },
    locked() {
      this.setData({
        loading: true
      })
    },
    unLocked() {
      this.setData({
        loading: false
      })
    },
    setMoreData(dataArray) {
      if (dataArray == false) { //dataArray == []
        this.data.noMoreData = true
        return
      }
      const temp = this.data.dataArray.concat(dataArray)
      this.data.start += this.data.count
      this.setData({
        dataArray: temp
      })
    },

    noMoreData() {
      return this.data.noMoreData
    },

    saveTotal(total) {
      if (total === 0) {
        this.setData({
          empty: true
        })
        return
      }
      this.data.total = total
    },

    getCurrentStart() {
      return this.data.start
    },

    initPagination() {
      this.data.noMoreData = false
      this.data.start = 0
      this.setData({
        empty: false,
        dataArray: []
      })
    }
  }
})


export {
  paginationBev
}