// components/like/like-cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: Boolean,
    count: Number,
    readOnly: Boolean
  },

  data: {
    yes_url: 'images/like.png',
    no_url: 'images/like@dis.png'
  },

  methods: {
    onLike: function (event) {
      let {
        readOnly,
        like,
        count
      } = this.properties
      if (readOnly) {
        return
      }
      count = like ? count - 1 : count + 1
      this.setData({
        count: count,
        like: !like
      })
      let behavior = like ? 'cancel' : 'like'
      this.triggerEvent('like', {
        behavior: behavior
      }, {})
    }
  }
})