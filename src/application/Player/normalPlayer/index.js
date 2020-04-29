import React, { useRef } from 'react'
import { NormalPlayerContainer, Top, Middle, CDWrapper, Bottom, Operators } from './style'
import { getName, prefixStyle } from '../../../utils'
import { CSSTransition } from 'react-transition-group'
import animations from 'create-keyframe-animation'

function NormalPlayer(props) {
  const { song, fullScreen } = props
  const { toggleFullScreen } = props

  const normalPlayerRef = useRef()
  const cdWrapperRef = useRef()

  const transform = prefixStyle('transform')

  // 计算偏移的辅助函数
  const _getPosAndScale = () => {
    const targetWidth = 40
    const paddingLeft = 40
    const paddingBottom = 30
    const paddingTop = 80
    const width = window.innerWidth * 0.8
    const scale = targetWidth / width
    // 两个圆心的横坐标距离和纵坐标距离
    const x = -(window.innerWidth / 2 - paddingLeft)
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
    return {
      x,
      y,
      scale,
    }
  }

  const enter = () => {
    normalPlayerRef.current.style.display = 'block'
    const { x, y, scale } = _getPosAndScale()
    let animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
      },
      60: {
        transform: `translate3d(0,0,0) scale(1.1)`,
      },
      100: {
        transform: `translate3d(0,0,0) scale (1)`,
      },
    }
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 400,
        easing: 'linear',
      },
    })
    animations.runAnimation(cdWrapperRef.current, 'move')
  }

  const afterEnter = () => {
    // 进入后解绑帧动画
    const cdWrapperDom = cdWrapperRef.current
    animations.unregisterAnimation('move')
    cdWrapperDom.style.animation = ''
  }

  const leave = () => {
    if (!cdWrapperRef.current) return
    const cdWrapperDom = cdWrapperRef.current
    cdWrapperDom.style.transition = 'all 0.4s'
    const { x, y, scale } = _getPosAndScale()
    cdWrapperDom.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
  }

  const afterLeave = () => {
    if (!cdWrapperRef.current) return
    const cdWrapperDom = cdWrapperRef.current
    cdWrapperDom.style.transition = ''
    cdWrapperDom.style[transform] = ''
    normalPlayerRef.current.style.display = 'none'
  }

  return (
    <CSSTransition
      classNames="normal"
      in={fullScreen}
      timeout={400}
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div className="background">
          <img
            src={song.al.picUrl + '?param=300x300'}
            width="100%"
            height="100%"
            alt="歌曲图片"
          ></img>
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div
            className="back"
            onClick={() => {
              toggleFullScreen(false)
            }}
          >
            <i className="iconfont icon-back">&#xe662;</i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </Top>
        <Middle ref={cdWrapperRef}>
          <CDWrapper>
            <div className="cd">
              <img className="image play" src={song.al.picUrl + '?param=400x400'} alt=""></img>
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className="bottom">
          <Operators>
            <div className="icon i-left">
              <i className="iconfont">&#xe625;</i>
            </div>
            <div className="icon i-left">
              <i className="iconfont">&#xe6e1;</i>
            </div>
            <div className="icon i-center">
              <i className="iconfont">&#xe723;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe718;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe640;</i>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  )
}

export default React.memo(NormalPlayer)
