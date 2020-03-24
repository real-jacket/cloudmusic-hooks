import { fromJS } from 'immutable'
import * as actionTypes from './constants.js'

const defaultSate = fromJS({
	singerList: [],
	enterLoading: true,
	pullUploading: false,
	pullDownloading: false,
	pageCount: 0
})

export default (state = defaultSate, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_SINGER_LIST:
			return state.set('singerList', action.data)
		case actionTypes.CHANGE_PAGE_COUNT:
			return state.set('pageCount', action.data)
		case actionTypes.CHNAGE_ENTER_LOADING:
			return state.set('enterLoading', action.data)
		case actionTypes.CHANGE_PULLUP_LOADING:
			return state.set('pullUpLoading', action.data)
		case actionTypes.CHANGE_PULLDOWN_LOADING:
			return state.set('pullDownLoading', action.data)
		default:
			return state
	}
}
