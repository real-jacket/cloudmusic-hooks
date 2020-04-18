import React from 'react'
import styled, { keyframes } from 'styled-components'

const marquee = function (s) {
  return keyframes`
      from {
        transform: translateX(0),
      }
      to {
        transform: translateX(calc(-100% - ${s}em));
      }
    `
}

const Wrap = styled.div`
  overflow: hidden;
  width: ${(props) => props._width};
  > .wrap {
    width: 100%;
    white-space: nowrap;
    animation: ${(props) => marquee(props.length)} 6s linear infinite;
    > * {
      display: inline-block;
    }
    .division {
      width: 100%;
    }
  }
`

function Marquee(props) {
  const { length, width } = props
  return (
    <Wrap length={length} _width={width}>
      <div className="wrap">
        <p className="division"></p>
        {props.children}
      </div>
    </Wrap>
  )
}

export default React.memo(Marquee)
