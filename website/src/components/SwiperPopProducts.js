import React from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import Product from "./Product"

const SwiperPopProducts = ({ products, channel, currency, ...props }) => {
  const sliderParams = {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    modules: [Pagination],
    loop: true,
    breakpoints: {
      1200: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1.5,
      },
    },
    pagination:
      props.pagination !== undefined
        ? {
            clickable: true,
            dynamicBullets: true,
          }
        : false,
  }

  return (
    <Swiper {...sliderParams} className="product-slider">
      {products.map((product, index) => (
        <SwiperSlide key={index}>
          <div className="product-slider-item">
            <Product
              key={index}
              height={380}
              data={product}
              channel={channel}
              currency={currency}
              showQuickView={false}
              onlyViewButton={true}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SwiperPopProducts
