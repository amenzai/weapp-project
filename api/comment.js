import request from '../utils/request.js'

const CommentModel = {
  getComment: (bid) => request('GET', `/book/${bid}/short_comment`),
  postComment: (params) => request('POST', `/book/add/short_comment`, params)
}

export default CommentModel