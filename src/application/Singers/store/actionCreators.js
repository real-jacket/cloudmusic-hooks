import {
	getHotSingerListRequest,
	getSingerListRequest
} from '../../../api/singer'
import * as actionTypes from './constants'
import { fromJS } from 'immutable'

const changeSingerList = data => ({
	type: actionTypes.CHANGE_SINGER_LIST,
	data: fromJS(data)
})

export const changePageCount = data => ({
	type: actionTypes.CHANGE_PAGE_COUNT,
	data
})

export const changeEnterLoading = data => ({
	type: actionTypes.CHNAGE_ENTER_LOADING,
	data
})

export const changePullUpLoading = data => ({
	type: actionTypes.CHANGE_PULLUP_LOADING,
	data
})

export const changePullDownLoading = data => ({
	type: actionTypes.CHANGE_PULLDOWN_LOADING,
	data
})

// 第一次加载对应类别的歌手
export const getSingerList = (cat, initial) => {
	return (dispatch, getState) => {
		getSingerListRequest({ cat, initial, offset: 0 })
			.then(res => {
				const data = res.artists
				dispatch(changeSingerList(data))
				dispatch(changeEnterLoading(false))
				dispatch(changePullDownLoading(false))
			})
			.catch(() => {
				console.log('获取歌手数据失败')
			})
	}
}

export const getHotSingerList = () => {
	return dispatch => {
		getHotSingerListRequest(0)
			.then(res => {
				const data = res.artists
				dispatch(changeSingerList(data))
				dispatch(changeEnterLoading(false))
				dispatch(changePullDownLoading(false))
			})
			.catch(() => {
				console.log('热门歌手数据获取失败')
			})
	}
}

export const refreshMoreSingerList = (cat, initial) => {
	return (dispatch, getState) => {
		const pageCount = getState().getIn(['singers', 'pageCount'])
		const singerList = getState()
			.getIn(['singers', 'singerList'])
			.toJS()
		getSingerListRequest({cat, initial, offset:pageCount})
			.then(res => {
				const data = [...singerList, ...res.artists]
				dispatch(changeSingerList(data))
				dispatch(changePullUpLoading(false))
			})
			.catch(() => {
				console.log('歌手数据获取失败')
			})
	}
}

export const refreshMoreHotSingerList = (category, alpha) => {
	return (dispatch, getState) => {
		const pageCount = getState().getIn(['singers', 'pageCount'])
		const singerList = getState()
			.getIn(['singer', 'singerList'])
			.toJS()
		getHotSingerListRequest(pageCount)
			.then(res => {
				const data = [...singerList, ...res.artists]
				dispatch(changeSingerList(data))
				dispatch(changePullUpLoading(false))
			})
			.catch(() => {
				console.log('热门歌手数据获取失败')
			})
	}
}
