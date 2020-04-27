import { fromJS } from 'immutable'
import { CHANGE_ARTIST, CHANGE_SONG_OF_ARTIST, CHANGE_ENTER_LOADING } from './constants'
import { getSingerInfoRequest } from '../../../api/singer'

export const changeArtist = (data) => ({
  type: CHANGE_ARTIST,
  data: fromJS(data),
})

export const changeSongs = (data) => ({
  type: CHANGE_SONG_OF_ARTIST,
  data: fromJS(data),
})

export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data,
})

export const getSingerInfo = (id) => {
  return (dispatch) => {
    getSingerInfoRequest(id).then((data) => {
      dispatch(changeArtist(data.artist))
      dispatch(changeSongs(data.hotSongs))
      dispatch(changeEnterLoading(false))
    })
  }
}
