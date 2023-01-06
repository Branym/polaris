import React from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper"
import Product from "./Product"
import Category from "./Category"

const SwiperCategory = ({ categories, channel, ...props }) => {
  const sliderParams = {
    slidesPerView: 1,
    spaceBetween: 0,
    modules: [Pagination, Navigation],
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
      500: {
        slidesPerView: 1,
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
      <div className="row justify-content-center">
        {categories.map((category, index) => <div className="product-slider-item px-3">
            <Category
              key={index}
              img={category.bg_image}
              name={category.name}
              link={category.link}
              height={360}
              channel={channel}
              showQuickView={false}
              onlyViewButton={true}
            />
          </div>
        )}
      </div>
  )
}

export default SwiperCategory
