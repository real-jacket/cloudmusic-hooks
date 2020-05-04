import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { playMode } from '../../../config'

const defaultState = fromJS({
  fullScreen: false,
  playing: false,
  sequencePlayList: [],
  playList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  showPlayList: false,
  currentSong: {},
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG:
      return state.set('currentSong', action.data)
    case actionTypes.SET_FULL_SCREEN:
      return state.set('fullScreen', action.data)
    case actionTypes.SET_PLAYING_STATE:
      return state.set('playing', action.data)
    case actionTypes.SET_SEQUENCE_PLAYLIST:
      return state.set('sequencePlayList', action.data)
    case actionTypes.SET_PALY_MODE:
      return state.set('mode', action.data)
    default:
      return state
  }
}
