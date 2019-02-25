import request from '../utils/request.js'

const ClassicModel = {
  getLatest: () => request('GET', '/classic/latest'),
  getPrevious: (index) => request('GET', `/classic/${index}/previous`),
  getNext: (index) => request('GET', `/classic/${index}/next`),
  getMyFavor: () => request('GET', '/classic/favor'),
  getDetail: (type, id) => request('GET', `/classic/${type}/${id}`),
}

export default ClassicModel