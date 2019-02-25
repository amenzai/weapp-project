import config from '../config.js';
import {
  removeEmptyProp
} from './util.js';

const {
  apiBase,
  contentType,
  appkey
} = config

const header = {
  'content-type': contentType,
  'appkey': appkey
}
const duration = 2000

/**
 * 处理响应
 */
const handleRes = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'none',
    // mask: true,
    duration
  })
}

/**
 * request 封装
 * @param {*} method 
 * @param {*} url 
 * @param {*} data 
 * @param {*} type 
 */
const request = (method, url, data = {}, type = false) => {
  return new Promise((resolve, reject) => {
    // const token = wx.getStorageSync('token') || ''
    if (!type) {
      data = removeEmptyProp(data)
    }
    console.log('send data----', url, data)
    wx.showNavigationBarLoading()
    wx.request({
      method,
      url: `${apiBase}${url}`,
      data: {
        // token,
        ...data
      },
      header,

      success: (res) => {
        const codeStartChar = res.statusCode.toString().charAt(0);
        console.log(res); // res.statusCode === 404 or 502 success {errMsg header statusCode data}
        const {
          data
        } = res
        if (codeStartChar === '2') {
          resolve(data)
        } else {
          console.log('!==200')
          handleRes(res.errMsg)
          reject(res)
        }
        console.log('request success----', data)
      },

      fail: (err) => {
        console.log('request fail----', err) // {errMsg}
        const errMsg = err.errMsg || '接口异常'
        handleRes(errMsg)
        reject(err)
      },
      complete: () => {
        wx.hideNavigationBarLoading()
      }
    })
  })
}

export default request