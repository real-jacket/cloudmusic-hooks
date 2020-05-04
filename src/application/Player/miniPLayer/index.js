import React, { useRef } from 'react'
import { MiniPlayerContainer } from './style'
import { getName } from '../../../utils'
import { CSSTransition } from 'react-transition-group'
import ProgressCircle from '../../../baseUI/ProgressCircle'

function MiniPlayer(props) {
  const { song, fullScreen, playing, percent } = props
  const { toggleFullScreen, clickPlaying } = props

  const miniPlayRef = useRef()

  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      onEnter={() => {
        miniPlayRef.current.style.display = 'flex'
      }}
      onExited={() => {
        miniPlayRef.current.style.display = 'none'
      }}
    >
      <MiniPlayerContainer ref={miniPlayRef}>
        <div className="icon" onClick={() => toggleFullScreen(true)}>
          <div className="imgWrapper">
            <img
              className={`play ${playing ? '' : 'pause'}`}
              src={song.al.picUrl}
              width="40"
              height="40"
              alt="img"
            ></img>
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            {playing ? (
              <i className="icon-mini iconfont icon-pause" onClick={(e) => clickPlaying(e, false)}>
                &#xe650;
              </i>
            ) : (
              <i className="icon-mini iconfont icon-play" onClick={(e) => clickPlaying(e, true)}>
                &#xe61e;
              </i>
            )}
          </ProgressCircle>
        </div>
        <div className="control">
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  )
}

export default React.memo(MiniPlayer)
