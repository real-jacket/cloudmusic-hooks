import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from '../application/Recommend/store'
import { reducer as singerReducer } from '../application/Singers/store'
import { reducer as rankReducer } from '../application/Rank/store'

export default combineReducers({
  recommend: recommendReducer,
  singer: singerReducer,
  rank: rankReducer,
})
