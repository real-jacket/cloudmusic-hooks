import styled from 'styled-components'
import style from '../../assets/global-style'

export const SlideContainer = styled.div`
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	margin: auto;
	background: white;
	.before {
		position: absolute;
		height: 60%;
		width: 100%;
		background: ${style['theme-color']};
	}
	.swiper-container {
		position: relative;
		width: 98%;
		height: 160px;
		overflow: hidden;
		margin: auto;
		border-radius: 6px;
		.slider-nav {
			position: absolute;
			display: block;
			width: 100%;
			height: 100%;
		}
		.swiper-pagenation-bullet-active {
			background: ${style['theme-color']};
		}
	}
`
