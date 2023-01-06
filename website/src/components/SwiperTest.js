import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
const SwiperTest = (props) => {
  const params = {
    className: `mySwiper`,
    slidesPerView: 2,
    modules: [Pagination],
    spaceBetween: 1,
    centeredSlides: true,
    grabCursor: true,
    loop: true,
    roundLengths: true,
    pagination: props.pagination !== undefined && {
      type: "bullets",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      1200: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
    },
  }

  return (
    <Swiper {...params}>
      {props.tests.map((test, index) => (
        <SwiperSlide
          key={index}
          className="h-auto d-flex align-items-center justify-content-center"
        >
          <div className="eachdiv">
            <div className="userdetails">
              <div className="imgbox">
                <img src={test.img} alt="" />
              </div>
              <div className="detbox">
                <p className="name">{test.name}</p>
                <p className="designation">Verified Graduate</p>
              </div>
            </div>
            <div className="review">
              <h4>{test.text}</h4>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SwiperTest
