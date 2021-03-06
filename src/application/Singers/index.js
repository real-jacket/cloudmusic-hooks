import React, { useEffect, useContext, useCallback } from 'react'
import HorizonItem from '../../baseUI/HorizonItem'
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
import { CategoryDataContext, CHANGE_ALPHA, CHANGE_CATEGORY } from './data'
import { renderRoutes } from 'react-router-config'

function Singers(props) {
  // const [category, setCategory] = useState('')
  // const [alpha, setAlpha] = useState('')
  const { data, dispatch } = useContext(CategoryDataContext)
  const { category, alpha } = data.toJS()

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
  const { songCount } = props

  const handleUpdateAlpha = (val) => {
    // setAlpha(val)
    dispatch({ type: CHANGE_ALPHA, data: val })
    updateDispatch(category, val)
  }

  const handleUpdateCategory = (val) => {
    // setCategory(val)
    dispatch({ type: CHANGE_CATEGORY, data: val })
    updateDispatch(val, alpha)
  }

  useEffect(() => {
    if (!singerList.size) {
      getHotSingerDispatch()
    }
    //eslint-disable-next-line
  }, [])

  const handlePullUp = useCallback(
    () => pullUpRefreshDispatch(category, alpha, category === '', pageCount),
    //eslint-disable-next-line
    [alpha, category, pageCount],
  )

  const handlePullDown = useCallback(
    () => pullDownRefreshDispatch(category, alpha),
    //eslint-disable-next-line
    [alpha, category],
  )

  const enterDetail = (id) => {
    props.history.push(`/singers/${id}`)
  }

  const renderSingerList = (singerList) => {
    const list = singerList ? singerList.toJS() : []
    return (
      <List>
        {list.map((item, index) => {
          const { name, picUrl, accountId, id } = item
          return (
            <ListItem key={accountId + '' + index} onClick={() => enterDetail(id)}>
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <img width="100%" height="100%" src={require('./singer.png')} alt="music" />
                  }
                >
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

  return (
    <div>
      <NavContainer>
        <HorizonItem
          list={categoryTypes}
          title="分类 (默认热门)："
          handleClick={handleUpdateCategory}
          oldVal={category}
        />
        <HorizonItem
          list={alphaTypes}
          title="首字母："
          handleClick={handleUpdateAlpha}
          oldVal={alpha}
        />
      </NavContainer>
      <ListContainer play={songCount}>
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
      {renderRoutes(props.route.routes)}
    </div>
  )
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singer', 'singerList']),
  enterLoading: state.getIn(['singer', 'enterLoading']),
  pullUpLoading: state.getIn(['singer', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singer', 'pullDownLoading']),
  pageCount: state.getIn(['singer', 'pageCount']),
  songCount: state.getIn(['player', 'playList']).size,
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
      console.log(category, alpha, hot, count)
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
