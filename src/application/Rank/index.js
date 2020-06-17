import React, { useEffect } from 'react'
import { getRankList } from './store'
import { connect } from 'react-redux'
import { filterIndex } from '../../utils'
import { Container, List, ListItem, SongList } from './style'
import Scroll from '../../baseUI/Scroll'
import { renderRoutes } from 'react-router-config'
import Loading from '../../baseUI/Loading'

function Rank(props) {
  const { rankList: list, loading } = props
  const { getRankListDispatch } = props
  const { songCount } = props

  const rankList = list ? list.toJS() : []

  useEffect(() => {
    getRankListDispatch()
    //eslint-disable-next-line
  }, [])

  const enterDetail = (detail) => {
    props.history.push(`/rank/${detail.id}`)
  }

  let globalStartIndex = filterIndex(rankList)
  let officialList = rankList.slice(0, globalStartIndex)
  let globalList = rankList.slice(globalStartIndex)

  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map((item,index) => {
          return (
            <ListItem key={item.coverImgId + index} tracks={item.tracks} onClick={() => enterDetail(item)}>
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt=""></img>
                <div className="decorate"></div>
                <span className="update_frequency"></span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          )
        })}
      </List>
    )
  }

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index + item.first + item.second}>
              {index + 1}.{item.first} - {item.second}
            </li>
          )
        })}
      </SongList>
    ) : null
  }

  let displayStyle = loading ? { display: 'none' } : { display: '' }

  return (
    <Container play={songCount}>
      <Scroll>
        <div>
          <h1 className="official" style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
      {loading ? <Loading></Loading> : null}
    </Container>
  )
}

const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading']),
  songCount: state.getIn(['player', 'playList']).size,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDispatch() {
      dispatch(getRankList())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))
