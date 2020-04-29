import React from 'react'
import {
  changePlayingState,
  changeFUllScreen,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayMode,
  changePlayList,
} from './store/actionCreators'
import { connect } from 'react-redux'
import MiniPLayer from './miniPLayer'
import NormalPlayer from './normalPlayer'

function Player(props) {
  const currentSong = {
    al: { picUrl: 'https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg' },
    name: '木偶人',
    ar: [{ name: '薛之谦' }],
  }

  const { fullScreen } = props

  const { toggleFullScreenDispatch } = props

  return (
    <div>
      <MiniPLayer
        song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreen={toggleFullScreenDispatch}
      ></MiniPLayer>
      <NormalPlayer
        song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreen={toggleFullScreenDispatch}
      ></NormalPlayer>
    </div>
  )
}

const mapStateToProps = (state) => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing']),
  showPlayList: state.getIn(['player', 'showPlayList']),
  currentSong: state.getIn(['player', 'currentSong']),
  mode: state.getIn(['player', 'mode']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  playList: state.getIn(['player', 'playerList']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList']),
})

const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayingDispatch(data) {
      dispatch(changePlayingState(data))
    },
    toggleFullScreenDispatch(data) {
      dispatch(changeFUllScreen(data))
    },
    togglePlayListDispatch(data) {
      dispatch(changeShowPlayList(data))
    },
    changeCurrentIndexDispatch(data) {
      dispatch(changeCurrentIndex(data))
    },
    changeCurrentDispatch(data) {
      dispatch(changeCurrentSong(data))
    },
    changeModeDispatch(data) {
      dispatch(changePlayMode(data))
    },
    changePlayListDispatch(data) {
      dispatch(changePlayList(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))
