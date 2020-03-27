import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { getBannerListRequest, getRecommendListRequest } from '../../../api/recommend'

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data),
})
export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data),
})

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data,
})

export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest()
      .then((data) => {
        dispatch(changeRecommendList(data.result))
      })
      .catch(() => {
        console.log('推荐歌单数据传输失误')
      })
      .finally(() => {
        dispatch(changeEnterLoading(false))
      })
  }
}

export const getBannerList = () => {
  return (dispatch) => {
    getBannerListRequest()
      .then((data) => {
        const { banners } = data
        dispatch(changeBannerList(banners))
      })
      .catch(() => {
        console.log('轮播图数据传输错误')
      })
  }
}
