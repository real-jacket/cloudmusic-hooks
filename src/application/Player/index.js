import React, { useState, useRef, useEffect } from 'react'
import {
  changePlayingState,
  changeFullScreen,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayMode,
  changePlayList,
} from './store/actionCreators'
import { connect } from 'react-redux'
import MiniPLayer from './miniPLayer'
import NormalPlayer from './normalPlayer'
import { getSongUrl, isEmptyObject, shuffle, findIndex } from '../../utils'
import Toast from '../../baseUI/Toast'
import { playMode } from '../../config'

function Player(props) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration

  const audioRef = useRef()

  const {
    fullScreen,
    playing,
    currentIndex,
    currentSong: immutableCurrentSong,
    playList: immutablePlayList,
    mode,
    sequencePlayList: immutableSequencePlayList,
  } = props

  const currentSong = immutableCurrentSong.toJS()
  const sequencePlayList = immutableSequencePlayList.toJS()
  const playList = immutablePlayList.toJS()

  const {
    toggleFullScreenDispatch,
    togglePlayingDispatch,
    changeCurrentIndexDispatch,
    changeCurrentDispatch,
    changePlayListDispatch,
    changeModeDispatch,
  } = props

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id
    )
      return
    let current = playList[currentIndex]
    changeCurrentDispatch(current)
    setPreSong(current)
    audioRef.current.src = getSongUrl(current.id)
    setTimeout(() => {
      audioRef.current.play()
    })
    togglePlayingDispatch(true)
    setCurrentTime(0)
    setDuration((current.dt / 1000) | 0)
    //eslint-disable-next-line
  }, [currentIndex, playList])

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause()
  }, [playing])

  const clickPlaying = (e, state) => {
    e.stopPropagation()
    togglePlayingDispatch(state)
  }

  const updateTime = (e) => {
    setCurrentTime(e.target.currentTime)
  }

  const onProgressChange = (curPercent) => {
    const newTime = curPercent * duration
    setCurrentTime(newTime)
    audioRef.current.currentTime = newTime
    if (!playing) {
      togglePlayingDispatch(true)
    }
  }

  // 单曲循环
  const handleLoop = () => {
    audioRef.current.currentTime = 0
    changePlayingState(true)
    audioRef.current.play()
  }

  // 上一曲
  const handlePre = () => {
    if (playList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex - 1
    if (index < 0) index = playList.length - 1
    if (!playing) togglePlayingDispatch(true)
    changeCurrentIndexDispatch(index)
  }

  // 下一首
  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex + 1
    if (index === playList.length) index = 0
    if (!playing) togglePlayingDispatch(true)
    changeCurrentIndexDispatch(index)
  }

  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop()
    } else {
      handleNext()
    }
  }

  const [modeText, setModeText] = useState('')

  const toastRef = useRef()

  // 变更播放模式
  const changeMode = () => {
    let newMode = (mode + 1) % 3
    if (newMode === 0) {
      // 顺序模式
      changePlayListDispatch(sequencePlayList)
      let index = findIndex(currentSong, sequencePlayList)
      changeCurrentIndexDispatch(index)
      setModeText('顺序播放')
    } else if (newMode === 1) {
      // 单曲循环
      changePlayListDispatch(sequencePlayList)
      setModeText('单曲循环')
    } else if (newMode === 2) {
      // 随机播放
      let newList = shuffle(sequencePlayList)
      let index = findIndex(currentSong, newList)
      changePlayListDispatch(newList)
      changeCurrentIndexDispatch(index)
      setModeText('随机播放')
    }
    changeModeDispatch(newMode)
    toastRef.current.show()
  }

  // 记录当前歌曲，以便下次重新渲染时对比是否时同一首歌
  const [preSong, setPreSong] = useState({})

  // useEffect(() => {
  //   changeCurrentIndexDispatch(0)
  //   //eslint-disable-next-line
  // }, [])

  return (
    <div>
      {isEmptyObject(currentSong) ? null : (
        <MiniPLayer
          playing={playing}
          song={currentSong}
          percent={percent}
          fullScreen={fullScreen}
          clickPlaying={clickPlaying}
          toggleFullScreen={toggleFullScreenDispatch}
        ></MiniPLayer>
      )}
      {isEmptyObject(currentSong) ? null : (
        <NormalPlayer
          mode={mode}
          changeMode={changeMode}
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          duration={duration}
          currentTime={currentTime}
          percent={percent}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          onProgressChange={onProgressChange}
          handlePre={handlePre}
          handleNext={handleNext}
        ></NormalPlayer>
      )}
      <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={handleEnd}></audio>
      <Toast text={modeText} ref={toastRef}></Toast>
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
  playList: state.getIn(['player', 'playList']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList']),
})

const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayingDispatch(data) {
      dispatch(changePlayingState(data))
    },
    toggleFullScreenDispatch(data) {
      dispatch(changeFullScreen(data))
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
