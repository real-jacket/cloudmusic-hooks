import request from '../utils/request'

export function getRankListRequest() {
  return request.get('/topList/detail')
}
