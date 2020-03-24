import request from '../utils/request'

// 获取热门歌手列表
export const getHotSingerListRequest = count => {
	return request.get(`/top/artists?offset=${count}`)
}

// 获取歌手列表
export const getSingerListRequest = params => {
	return request({
		url: '/artist/list',
		method: 'get',
		params
	})
}
