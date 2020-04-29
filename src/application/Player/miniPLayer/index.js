import React, { useRef } from 'react'
import { MiniPlayerContainer } from './style'
import { getName } from '../../../utils'
import { CSSTransition } from 'react-transition-group'

function MiniPlayer(props) {
  const { song, fullScreen } = props
  const { toggleFullScreen } = props

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
      <MiniPlayerContainer ref={miniPlayRef} onClick={() => toggleFullScreen(true)}>
        <div className="icon">
          <div className="imgWrapper">
            <img className="play" src={song.al.picUrl} width="40" height="40" alt="img"></img>
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <i className="iconfont">&#xe650;</i>
        </div>
        <div className="control">
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  )
}

export default React.memo(MiniPlayer)
