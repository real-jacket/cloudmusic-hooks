import request from '../utils/request'

export function getAlbumDetailRequest(id) {
  return request.get(`/playlist/detail?id=${id}`)
}
