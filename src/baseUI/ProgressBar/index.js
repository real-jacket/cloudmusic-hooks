import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import style from '../../assets/global-style'
import { prefixStyle } from '../../utils'

const ProgressBarWrapper = styled.div`
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: ${style['theme-color']};
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -15px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${style['border-color']};
        border-radius: 50%;
        background: ${style['theme-color']};
      }
    }
  }
`

const transform = prefixStyle('transform')

function ProgressBar(props) {
  const progressBar = useRef()
  const progress = useRef()
  const progressBtn = useRef()
  const [touch, setTouch] = useState({})

  // const progressBtnWidth = 16
  // 滚动条的最大长度
  // const barWidth = progressBar.current.clientWidth

  const { percent } = props
  const { percentChange } = props

  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBar.current.clientWidth
      const offsetWidth = percent * barWidth
      progress.current.style.width = `${offsetWidth}px`
      progressBtn.current.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    }
    //eslint-disable-next-line
  }, [percent])

  const _changePercent = () => {
    const barWidth = progressBar.current.clientWidth
    const curPercent = progress.current.clientWidth / barWidth
    percentChange(curPercent)
  }

  // 处理进度条的偏移
  const _offset = (offsetWidth) => {
    progress.current.style.width = `${offsetWidth}px`
    progressBtn.current.style.transform = `translate3d(${offsetWidth}px,0,0)`
  }

  const progressTouchStart = (e) => {
    const startTouch = {}
    startTouch.initiated = true
    startTouch.startX = e.touches[0].pageX
    startTouch.left = progress.current.clientWidth
    setTouch(startTouch)
  }
  const progressTouchMove = (e) => {
    if (!touch.initiated) return
    // 滑动距离
    const deltaX = e.touches[0].pageX - touch.startX
    const barWidth = progressBar.current.clientWidth
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth)
    _offset(offsetWidth)
  }
  const progressTouchEnd = (e) => {
    const endTouch = JSON.parse(JSON.stringify(touch))
    endTouch.initiated = false
    setTouch(endTouch)
    _changePercent()
  }

  const progressClick = (e) => {
    const rect = progressBar.current.getBoundingClientRect()
    const barWidth = progressBar.current.clientWidth
    const offset = Math.min(e.pageX - rect.left, barWidth)
    _offset(offset)
    _changePercent()
  }

  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBar} onClick={progressClick}>
        <div className="progress" ref={progress}></div>
        <div
          className="progress-btn-wrapper"
          ref={progressBtn}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  )
}

export default React.memo(ProgressBar)
