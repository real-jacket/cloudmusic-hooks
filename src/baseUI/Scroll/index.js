import React, { forwardRef, useState, useRef, useEffect, useImperativeHandle, useMemo } from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import styled from 'styled-components'
import Loading from '../Loading'
import Loading2 from '../Loading-v2'
import { debounce } from '../../utils'

const ScrollContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`

export const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 30px;
  margin: auto;
  z-index: 100;
`
const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState()
  const scrollContainerRef = useRef()
  const { direction, click, refresh, bounceTop, bounceBottom } = props
  const { pullUp, pullDown, onScroll, pullUpLoading, pullDownLoading, handlePullDown, handlePullUp } = props

  const PullUpDisplayStyle = pullUpLoading ? { display: 'block' } : { display: 'none' }

  const PullDownDisplayStyle = pullDownLoading ? { display: 'block' } : { display: 'none' }

  const pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 300, true)
    // eslint-disable-next-line
  }, [])

  const pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300, true)
    // eslint-disable-next-line
  }, [])

  // 创建better-scroll实例
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3,
      click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    })
    setBScroll(scroll)
    return () => {
      setBScroll(null)
    }
    // eslint-disable-next-line
  }, [])

  // 绑定scroll事件
  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll)
    })
    return () => {
      bScroll.off('scroll')
    }
  }, [onScroll, bScroll])

  // 上拉刷新
  useEffect(() => {
    if (!bScroll || !pullUp) return
    bScroll.on('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce()
      }
    })
    bScroll.on('scrollEnd', handlePullUp)
    return () => {
      bScroll.off('scrollEnd', handlePullUp)
    }
  }, [pullUp, bScroll, pullUpDebounce, handlePullUp])

  // 下拉刷新
  useEffect(() => {
    if (!bScroll || !pullDown) return
    bScroll.on('touchEnd', (pos) => {
      // 判断用户下拉的动作
      if (pos.y > 50) {
        pullDownDebounce()
      }
    })
    bScroll.on('touchEnd', handlePullDown)
    return () => {
      bScroll.off('touchEnd', handlePullDown)
    }
  }, [pullDown, bScroll, pullDownDebounce, handlePullDown])

  // 重新渲染时刷新实例，防止无法滑动
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  useImperativeHandle(
    ref,
    () => ({
      refresh() {
        if (bScroll) {
          bScroll.refresh()
          bScroll.scrollTo(0, 0)
        }
      },
      getBScroll() {
        if (bScroll) {
          return bScroll
        }
      },
    }),
    [bScroll],
  )

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      <PullUpLoading style={PullUpDisplayStyle}>
        <Loading />
      </PullUpLoading>
      <PullDownLoading style={PullDownDisplayStyle}>
        <Loading2 />
      </PullDownLoading>
    </ScrollContainer>
  )
})

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
}

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,
  bounceBottom: PropTypes.bool,
}

export default Scroll
