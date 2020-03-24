import React, { useState, useEffect } from 'react'
import HorizenItem from '../../baseUI/HorizenItem'
import { categoryTypes, alphaTypes } from '../../api/config'
import { NavContainer, ListContainer, List, ListItem } from './style'
import Scroll from '../../baseUI/Scroll'
import {
	getSingerList,
	getHotSingerList,
	changeEnterLoading,
	changePageCount,
	changePullDownLoading,
	changePullUpLoading,
	refreshMoreHotSingerList,
	refreshMoreSingerList
} from './store/actionCreators'
import { connect } from 'react-redux'

//mock 数据
// const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
// 	return {
// 		picUrl:
// 			'https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg',
// 		name: '隔壁老樊',
// 		accountId: 277313426
// 	}
// })

const renderSingerList = singerList => {
	return (
		<List>
			{singerList.map((item, index) => {
				return (
					<ListItem key={item.accountId + '' + index}>
						<div className='img_wrapper'>
							<img
								src={`${item.picUrl}?param=300x300`}
								width='100%'
								height='100%'
								alt='music'
							></img>
						</div>
						<span className='name'>{item.name}</span>
					</ListItem>
				)
			})}
		</List>
	)
}

function Singers(props) {
	const [category, setCategory] = useState('')
	const [alpha, setAlpha] = useState('')
	const singerList  = props.singerList.toJS()
	console.log(singerList)
	const { updateDispatch, getHotSingerDispatch } = props

	const handleUpdateAlpha = val => {
		setAlpha(val)
		updateDispatch(category, val)
	}

	const handleUpadateCatetory = val => {
		setCategory(val)
		updateDispatch(val, alpha)
	}

	useEffect(() => {
		getHotSingerDispatch()
		//eslint-disable-next-line
	}, [])

	return (
		<div>
			<NavContainer>
				<HorizenItem
					list={categoryTypes}
					title='分类 (默认热门)：'
					handleClick={handleUpadateCatetory}
					oldVal={category}
				></HorizenItem>
				<HorizenItem
					list={alphaTypes}
					title='首字母：'
					handleClick={handleUpdateAlpha}
					oldVal={alpha}
				></HorizenItem>
			</NavContainer>
			<ListContainer>
				<Scroll>{renderSingerList(singerList)}</Scroll>
			</ListContainer>
		</div>
	)
}

const mapStateToProps = state => ({
	singerList: state.getIn(['singer', 'singerList']),
	enterLoading: state.getIn(['singer', 'enterLoading']),
	pullUpLoading: state.getIn(['singer', 'pullUpLoading']),
	pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
	pageCount: state.getIn(['singers', 'pageCount'])
})

const mapDispatchToProps = dispatch => {
	return {
		getHotSingerDispatch() {
			dispatch(getHotSingerList())
		},
		updateDispatch(category, alpha) {
			dispatch(changePageCount(0))
			dispatch(changeEnterLoading(false))
			dispatch(getSingerList(category, alpha))
		},
		pullUpRefreshDispatch(category, alpha, hot, count) {
			dispatch(changePullUpLoading(true))
			dispatch(changePageCount(count + 1))
			if (hot) {
				dispatch(refreshMoreHotSingerList())
			} else {
				dispatch(refreshMoreSingerList(category, alpha))
			}
		},
		pullDownRefreshDispatch(category, alpha) {
			dispatch(changePullDownLoading(true))
			dispatch(changePageCount(0))
			if (category === '' && alpha === '') {
				dispatch(getHotSingerList())
			} else {
				dispatch(getSingerList(category, alpha))
			}
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
