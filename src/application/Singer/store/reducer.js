import * as actionTypes from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  artist: {},
  songOfArtists: [],
  loading: false,
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_ARTIST:
      return state.set('artist', action.data)
    case actionTypes.CHANGE_SONG_OF_ARTIST:
      return state.set('songOfArtists', action.data)
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('loading', false)
    default:
      return state
  }
}
