import React, { useEffect, useState } from 'react'
import HorizonItem from '../../baseUI/HorizenItem'
import { alphaTypes, categoryTypes } from '../../api/config'
import { List, ListContainer, ListItem, NavContainer } from './style'
import Scroll from '../../baseUI/Scroll'
import {
  changeEnterLoading,
  changePageCount,
  changePullDownLoading,
  changePullUpLoading,
  getHotSingerList,
  getSingerList,
  refreshMoreHotSingerList,
  refreshMoreSingerList,
} from './store/actionCreators'
import { connect } from 'react-redux'
import LazyLoad, { forceCheck } from 'react-lazyload'
import Loading from '../../baseUI/Loading'

//mock 数据
// const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
// 	return {
// 		picUrl:
// 			'https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg',
// 		name: '隔壁老樊',
// 		accountId: 277313426
// 	}
// })

const renderSingerList = (singerList) => {
  const list = singerList ? singerList.toJS() : []
  return (
    <List>
      {list.map((item, index) => {
        const { name, picUrl, accountId } = item
        return (
          <ListItem key={accountId + '' + index}>
            <div className="img_wrapper">
              <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music" />}>
                <img src={`${picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
              </LazyLoad>
            </div>
            <span className="name">{name}</span>
          </ListItem>
        )
      })}
    </List>
  )
}

function Singers(props) {
  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')
  const {
    singerList,
    updateDispatch,
    getHotSingerDispatch,
    pullUpRefreshDispatch,
    pullDownRefreshDispatch,
    pageCount,
    pullDownLoading,
    pullUpLoading,
    enterLoading,
  } = props

  const handleUpdateAlpha = (val) => {
    setAlpha(val)
    updateDispatch(category, val)
  }

  const handleUpdateCategory = (val) => {
    setCategory(val)
    updateDispatch(val, alpha)
  }

  useEffect(() => {
    if (!singerList.size) {
      getHotSingerDispatch()
    }
    //eslint-disable-next-line
  }, [])

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount)
  }

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha)
  }

  return (
    <div>
      <NavContainer>
        <HorizonItem
          list={categoryTypes}
          title="分类 (默认热门)："
          handleClick={handleUpdateCategory}
          oldVal={category}
        />
        <HorizonItem list={alphaTypes} title="首字母：" handleClick={handleUpdateAlpha} oldVal={alpha} />
      </NavContainer>
      <ListContainer>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          {renderSingerList(singerList)}
        </Scroll>
      </ListContainer>
      {enterLoading ? <Loading /> : null}
    </div>
  )
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singer', 'singerList']),
  enterLoading: state.getIn(['singer', 'enterLoading']),
  pullUpLoading: state.getIn(['singer', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singer', 'pullDownLoading']),
  pageCount: state.getIn(['singer', 'pageCount']),
})

const mapDispatchToProps = (dispatch) => {
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
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
