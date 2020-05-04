import { fromJS } from 'immutable'
import {
  SET_CURRENT_SONG,
  SET_FULL_SCREEN,
  SET_PLAYING_STATE,
  SET_SEQUENCE_PLAYLIST,
  SET_PLAYLIST,
  SET_PALY_MODE,
  SET_CURRENT_INDEX,
  SET_SHOW_PLAYLIST,
} from './constants'

export const changeCurrentSong = (data) => ({
  type: SET_CURRENT_SONG,
  data: fromJS(data),
})

export const changeFullScreen = (data) => ({
  type: SET_FULL_SCREEN,
  data,
})

export const changePlayingState = (data) => ({
  type: SET_PLAYING_STATE,
  data,
})

export const changeSequencePlayList = (data) => ({
  type: SET_SEQUENCE_PLAYLIST,
  data: fromJS(data),
})

export const changePlayList = (data) => ({
  type: SET_PLAYLIST,
  data: fromJS(data),
})

export const changePlayMode = (data) => ({
  type: SET_PALY_MODE,
  data,
})

export const changeCurrentIndex = (data) => ({
  type: SET_CURRENT_INDEX,
  data,
})

export const changeShowPlayList = (data) => ({
  type: SET_SHOW_PLAYLIST,
  data,
})
