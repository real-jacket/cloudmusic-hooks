import React, { useState, useEffect, useCallback, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Container, ImgWrapper, CollectButton, SongListWrapper, BgLayer } from './style'
import Header from '../../baseUI/Header'
import SongsList from '../../components/SongsList'
import Scroll from '../../baseUI/Scroll'
import { HEADER_HEIGHT } from '../../config'
import { changeEnterLoading, getSingerInfo } from './store/actionCreators'
import { connect } from 'react-redux'
import Loading from '../../baseUI/Loading'
import MusicNote from '../../baseUI/MusicNote'

function Singer(props) {
  const [showStatus, setShowStatus] = useState(true)

  const collectButton = useRef()
  const imageWrapper = useRef()
  const songScrollWrapper = useRef()
  const songScroll = useRef()
  const header = useRef()
  const layer = useRef()

  const initialHeight = useRef(0)

  const OFFSET = 10

  // mock数据
  // const artist = {
  //   picUrl: 'https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg',
  //   name: '薛之谦',
  //   hotSongs: [
  //     {
  //       name: '我好像在哪见过你',
  //       id: '33',
  //       ar: [{ name: '薛之谦' }],
  //       al: {
  //         name: '薛之谦专辑',
  //       },
  //     },
  //     {
  //       name: '我好像在哪见过你',
  //       id: '35',
  //       ar: [{ name: '薛之谦' }],
  //       al: {
  //         name: '薛之谦专辑',
  //       },
  //     },
  //   ],
  // }

  const { artist: immutableArtist, songs: immutableSongs, loading } = props
  const { getSingerInfoDispatch } = props

  const artist = immutableArtist.toJS()
  const songs = immutableSongs.toJS()

  useEffect(() => {
    const id = props.match.params.id
    getSingerInfoDispatch(id)
    let h = imageWrapper.current.offsetHeight
    songScrollWrapper.current.style.top = `${h - OFFSET}px`
    initialHeight.current = h
    // 把遮罩层放在下面，以裹住歌曲列表
    layer.current.style.top = `${h - OFFSET}px`
    songScroll.current.refresh()
    // eslint-disable-next-line
  }, [])

  const handleBack = useCallback(() => {
    setShowStatus(false)
  }, [])

  const handleScroll = useCallback((pos) => {
    let height = initialHeight.current
    const newY = pos.y
    const imageDom = imageWrapper.current
    const buttonDom = collectButton.current
    const headerDom = header.current
    const layerDom = layer.current
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT

    // 滑动距离占图片高度的白百分比
    const percent = Math.abs(newY / height)

    if (newY > 0) {
      imageDom.style['transform'] = `scale(${1 + percent})`
      buttonDom.style['transform'] = `translate3d(0,${newY}px,0)`
      layerDom.style.top = `${height - OFFSET + newY}px`
    } else if (newY >= minScrollY) {
      //往上滑动，但是还没超过Header部分
      layerDom.style.top = `${height - OFFSET - Math.abs(newY)}px`
      // 这时候保证遮罩层的层叠优先级比图片高，不至于被图片挡住
      layerDom.style.zIndex = 1
      imageDom.style.paddingTop = '75%'
      imageDom.style.height = 0
      imageDom.style.zIndex = -1
      // 按钮跟着图片移动且慢慢边透明
      buttonDom.style['transform'] = `translate3d(0,${newY}px,0)`
      buttonDom.style['opacity'] = `${1 - percent * 2}`
    } else if (newY < minScrollY) {
      // 往上滑动，但是超过Header部分
      layerDom.style.top = `${HEADER_HEIGHT - OFFSET}px`
      layerDom.style.zIndex = 1
      //防止溢出的歌单内容遮住Header
      headerDom.style.zIndex = 100
      //此时图片高度与Header一致
      imageDom.style.height = `${HEADER_HEIGHT}px`
      imageDom.style.paddingTop = 0
      imageDom.style.zIndex = 99
    }
  }, [])

  const musicNoteRef = useRef()

  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({ x, y })
  }

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
        <Header title={artist.name} handleClick={handleBack} ref={header}></Header>
        <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapper}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text">收藏</span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll} onScroll={handleScroll}>
            <SongsList
              songs={songs}
              showCollect={false}
              musicAnimation={musicAnimation}
            ></SongsList>
          </Scroll>
        </SongListWrapper>
        {loading ? <Loading></Loading> : null}
        <MusicNote ref={musicNoteRef}></MusicNote>
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => ({
  artist: state.getIn(['singerInfo', 'artist']),
  songs: state.getIn(['singerInfo', 'songOfArtists']),
  loading: state.getIn(['singerInfo', 'loading']),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getSingerInfoDispatch(id) {
      dispatch(changeEnterLoading(true))
      dispatch(getSingerInfo(id))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer))
