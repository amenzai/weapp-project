import config from '../config.js'

function handleStorageKey(partKey) {
  return config.prefix + '-' + partKey
}

const storage = {
  get(k) {
    let key = handleStorageKey(k)
    return wx.getStorageSync(key)
  },
  set(k, v) {
    let key = handleStorageKey(k)
    wx.setStorageSync(key, v)
  }
}

export default storage