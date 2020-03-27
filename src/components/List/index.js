import React from 'react'
import { List, ListItem, ListWrapper } from './style'
import { getCount } from '../../utils'
import LazyLoad from 'react-lazyload'

function FakeImg() {
  return <img width="100%" height="100%" src={require('./music.png')} alt="music" />
}

function RecommendList(props) {
  const { recommendList } = props
  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {recommendList.map((item, index) => {
          const { playCount, name, id, picUrl } = item
          return (
            <ListItem key={id + index}>
              <div className="img_wrapper">
                <div className="decorate" />
                <LazyLoad placeholder={<FakeImg />}>
                  <img src={picUrl + '?param=300x300'} width="100%" height="100%" alt="music" />
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont play"> &#xe885; </i>
                  <span className="count"> {getCount(playCount)} </span>
                </div>
              </div>
              <div className="desc">{name}</div>
            </ListItem>
          )
        })}
      </List>
    </ListWrapper>
  )
}

export default React.memo(RecommendList)
