import React from 'react'
import styled from 'styled-components'
import style from '../../assets/global-style'
import PropTypes from 'prop-types'
import Marquee from '../Marquee'
import { HEADER_HEIGHT } from '../../config'

const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: ${HEADER_HEIGHT}px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${style['font-color-light']};
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  > h1 {
    font-size: ${style['font-size-l']};
    font-weight: 700;
  }
`

const Header = React.forwardRef((props, ref) => {
  const { handleClick, title, isMarquee } = props
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>
        &#xe655;
      </i>
      {isMarquee ? (
        <Marquee length={title.length} width="calc(100% - 20px - 10px)">
          <h1>{title}</h1>
        </Marquee>
      ) : (
        <h1>{title}</h1>
      )}
    </HeaderContainer>
  )
})

Header.defaultProps = {
  handleClick: () => {},
  title: '',
  isMarquee: false,
}

Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool,
}

export default React.memo(Header)
