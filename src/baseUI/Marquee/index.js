import React from 'react'
import styled, { keyframes } from 'styled-components'

const marquee = function (s) {
  return keyframes`
      from {
        margin-left:0;
      }
      to {
        margin-left:calc(-100% - ${s}em);
      }
    `
}

const Wrap = styled.div`
  overflow: hidden;
  width: ${(props) => props._width};
  > div {
    width: 100%;
    white-space: nowrap;
    animation: ${(props) => marquee(props.length)} 6s linear infinite;
    > * {
      display: inline-block;
    }
    > p {
      display: inline-block;
      width: 100%;
    }
  }
`

function Marquee(props) {
  const { length, width } = props
  return (
    <Wrap length={length} _width={width}>
      <div>
        {props.children}
        <p></p>
        {props.children}
      </div>
    </Wrap>
  )
}

export default React.memo(Marquee)
