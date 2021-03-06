import React, { useEffect } from 'react'
import Slider from '../../components/Slider'
import RecommendList from '../../components/List'
import { Content } from './style'
import Scroll from '../../baseUI/Scroll'
import { connect } from 'react-redux'
import * as actionCreators from './store/actionCreators'
import { forceCheck } from 'react-lazyload'
import Loading from '../../baseUI/Loading'
import { renderRoutes } from 'react-router-config'

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
  const { bannerList, recommendList, enterLoading } = props
  const { getBannerListDispatch, getRecommendListDispatch } = props
  const { songCount } = props

  useEffect(() => {
    // immutable 数据结构中的size表示长度属性
    if (!bannerList.size) {
      getBannerListDispatch()
    }
    if (!recommendList.size) {
      getRecommendListDispatch()
    }

    //eslint-disable-next-line
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  return (
    <Content play={songCount}>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS} />
          <RecommendList recommendList={recommendListJS} />
        </div>
      </Scroll>
      {enterLoading ? <Loading /> : null}
      {renderRoutes(props.route.routes)}
    </Content>
  )
}

const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading']),
  songCount: state.getIn(['player', 'playList']).size,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getBannerListDispatch() {
      dispatch(actionCreators.getBannerList())
    },
    getRecommendListDispatch() {
      dispatch(actionCreators.getRecommendList())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommend)
