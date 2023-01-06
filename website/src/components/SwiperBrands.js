import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
const SwiperBrands = (props) => {
  const params = {
    className: `brands-slider pb-5`,
    slidesPerView: 2,
    modules: [Pagination],
    spaceBetween: 15,
    loop: true,
    roundLengths: true,
    pagination: props.pagination !== undefined && {
      type: "bullets",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      1200: {
        slidesPerView: 6,
      },
      991: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
      },
    },
  }

  return (
    <Swiper {...params}>
      {props.brands.map((brand, index) => (
        <SwiperSlide
          key={index}
          className="h-auto d-flex align-items-center justify-content-center"
        >
          <img src={brand.img} alt={brand.title} className="img-fluid w-6rem" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SwiperBrands
