import request from '../utils/request'

export const getLyricRequest = (id) => {
  return request.get(`/lyric?id=${id}`)
}
