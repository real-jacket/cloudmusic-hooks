import React from 'react'
import { renderRoutes } from 'react-router-config'
import { Top, Tap, TabItem } from './style'
import { NavLink } from 'react-router-dom'
import Player from '../Player'

function Home(props) {
  const { route } = props

  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tap>
        <NavLink to="/recommend" activeClassName="selected">
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </NavLink>
        <NavLink to="/singers" activeClassName="selected">
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </NavLink>
        <NavLink to="/rank" activeClassName="selected">
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </NavLink>
      </Tap>
      {renderRoutes(route.routes)}
      <Player></Player>
    </div>
  )
}

export default React.memo(Home)
