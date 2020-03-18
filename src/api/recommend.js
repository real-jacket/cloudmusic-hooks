import request from '../utils/request'

export function getBannerListRequest() {
	return request.get('/banner')
}

export function getRecommendListRequest() {
	return request.get('/personalized')
}
