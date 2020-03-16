import React, {
	forwardRef,
	useState,
	useRef,
	useEffect,
	useImperativeHandle
} from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import styled from 'styled-components'

const ScrollContainer = styled.div`
	height: 100%;
	width: 100%;
	overflow: hidden;
`

const Scroll = forwardRef((props, ref) => {
	const [bScroll, setBScroll] = useState()
	const scrollContainerRef = useRef()
	const { direction, click, refresh, bounceTop, bounceBottom } = props
	const { pullUp, pullDown, onScroll } = props

	// 创建better-scroll实例
	useEffect(() => {
		const scroll = new BScroll(scrollContainerRef.current, {
			scrollX: direction === 'horizental',
			scrollY: direction === 'vertical',
			probeType: 3,
			click,
			bounce: {
				top: bounceTop,
				bottom: bounceBottom
			}
		})
		setBScroll(scroll)
		return () => {
			setBScroll(null)
    }
	}, [direction, click, bounceTop, bounceBottom])

	// 绑定scroll事件
	useEffect(() => {
		if (!bScroll || !onScroll) return
		bScroll.on('scroll', scroll => {
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
			if (bScroll.y <= bScroll.maxScrollY+100) {
				pullUp()
			}
		})
		return () => {
			bScroll.off('scrollEnd')
		}
	}, [pullUp, bScroll])

	// 下拉刷新
	useEffect(() => {
		if (!bScroll || !pullDown) return
		bScroll.on('touchEnd', pos => {
			// 判断用户下拉的动作
			if (pos.y > 50) {
				pullDown()
			}
		})
		return () => {
			bScroll.off('touchEnd')
		}
  }, [pullDown, bScroll])
  
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
					bScroll.scollTo(0, 0)
				}
			},
			getBScroll() {
				if (bScroll) {
					return bScroll
				}
			}
		}),
		[bScroll]
	)

	return (
		<ScrollContainer ref={scrollContainerRef}>
			{props.children}
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
	bounceBottom: true
}

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,
  bounceBottom: PropTypes.bool
}

export default Scroll
