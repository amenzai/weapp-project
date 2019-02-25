import request from '../utils/request.js'

const LikeModel = {
  getClassicLikeStatus: (type, cid) => request('GET', `/classic/${type}/${cid}/favor`),
  getBookLikeStatus: (type, bid) => request('GET', `/book/${type}/${bid}/favor`),
  testApi: (params) => request('GET', `/like/test`, params),
  likeApi: (params) => request('POST', '/like', params),
  cancelLikeApi: (params) => request('POST', '/like/cancel', params),
}


export default LikeModel