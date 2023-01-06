import React from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import Product from "./Product"

const SwiperProducts = ({ products, channel, currency, ...props }) => {
  const sliderParams = {
    slidesPerView: 1,
    spaceBetween: 0,
    modules: [Pagination],
    centeredSlides:true,
    loop: true,
    breakpoints: {
      1200: {
        slidesPerView: 5
      },
      992: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
      },
      520: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1.5,
        centeredSlides: true
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
              data={product}
              height={380}
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

export default SwiperProducts
