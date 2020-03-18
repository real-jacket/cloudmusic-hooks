import React, { useEffect } from 'react'
import Slider from '../../components/Slider'
import RecommendList from '../../components/List'
import { Content } from './style'
import Scroll from '../../baseUI/Scroll'
import { connect } from 'react-redux'
import * as actionCreators from './store/actionCreators'

function Recommend(props) {
	// mock数据
	// const bannerList = [1, 2, 3, 4].map(item => {
	// 	return {
	// 		imageUrl:
	// 			'http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg'
	// 	}
	// })

	// const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
	// 	return {
	// 		id: index,
	// 		picUrl:
	// 			'https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg',
	// 		playCount: 1223456,
	// 		name: '朴树、许巍、李建、郑钧、老狼、赵磊'
	// 	}
	// })
	const { bannerList, recommendList } = props
	const { getBannerListDispatch, getRecommenListDispatch } = props

	useEffect(() => {
			getBannerListDispatch()
			getRecommenListDispatch()
		//eslint-disable-next-line
	}, [])

	const bannerListJS = bannerList ? bannerList.toJS() : []
	const recommendListJS = recommendList ? recommendList.toJS() : []

	return (
		<Content>
			<Scroll className='list'>
				<div>
					<Slider bannerList={bannerListJS}></Slider>
					<RecommendList recommendList={recommendListJS} ></RecommendList>
				</div>
			</Scroll>
		</Content>
	)
}

const mapStateToProps = state => ({
	bannerList: state.getIn(['recommend', 'bannerList']),
	recommendList: state.getIn(['recommend','recommendList'])
})

const mapDispatchToProps = dispatch => {
	return {
		getBannerListDispatch() {
			dispatch(actionCreators.getBannerList())
		},
		getRecommenListDispatch() {
			dispatch(actionCreators.getRecommendList())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommend)
