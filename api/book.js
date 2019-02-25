import request from '../utils/request.js'

const BookModel = {
  getHotList: () => request('GET', '/book/hot_list'),
  getDetail: (bid) => request('GET', `/book/${bid}/detail`),
  getLikeStatus: (bid) => request('GET', `/book/${bid}/favor`),
  getMyBookCount: () => request('GET', '/book/favor/count'),
  getHotKeywords: () => request('GET', '/book/hot_keyword'),
  bookSearch: (params) => request('GET', '/book/search', params),
}

export default BookModel