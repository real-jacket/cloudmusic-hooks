import React, { useEffect, useState } from 'react'
import { SlideContainer } from './style'
import 'swiper/css/swiper.css'
import Swiper from 'swiper'

function Slider(props) {
  const [slideSwiper, setSlideSwiper] = useState(null)
  const { bannerList } = props

  useEffect(() => {
    if (bannerList.length && !slideSwiper) {
      let slidSwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: { el: '.swiper-pagination' },
      })
      setSlideSwiper(slidSwiper)
    }
  }, [bannerList.length, slideSwiper])

  return (
    <SlideContainer>
      <div className="before" />
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {bannerList.map((slider, index) => {
            const { imageUrl } = slider
            return (
              <div className="swiper-slide" key={imageUrl + index}>
                <div className="slider-nav">
                  <img src={imageUrl} width="100%" height="100%" alt="推荐" />
                </div>
              </div>
            )
          })}
        </div>
        <div className="swiper-pagination" />
      </div>
    </SlideContainer>
  )
}

export default React.memo(Slider)
