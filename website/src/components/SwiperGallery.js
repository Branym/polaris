import React, { useState, useRef } from "react"

import Lightbox from "react-image-lightbox"
import Magnifier from "react-magnifier"
import { Row, Col, Button } from "react-bootstrap"

import { Swiper, SwiperSlide } from "swiper/react"

const SwiperGallery = ({ data, vertical }) => {
  const [lightBoxOpen, setLightBoxOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const [dragged, setDragged] = useState(false)
  const gallerySwiperRef = useRef(null)

  const slideTo = (index) => {
    setActiveSlide(index)
    if (
      gallerySwiperRef.current !== null &&
      gallerySwiperRef.current.swiper !== null
    ) {
      gallerySwiperRef.current.swiper.slideToLoop(index)
    }
  }

  const onClick = (index) => {
    setActiveImage(index)
    setLightBoxOpen(!lightBoxOpen)
  }

  let sliderColumns = { xs: 12 },
    sliderClass = "detail-carousel",
    thumbsColumns = { xs: 12 },
    thumbsClass = ""

  if (vertical) {
    sliderColumns = { xs: 12, md: 10 }
    ;(sliderClass = "detail-carousel order-md-2"), (thumbsColumns = { md: 2 })
    thumbsClass = "d-none d-md-block pe-0 order-md-1"
  }

  const sliderParams = {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    on: {
      slideChange: () =>
        setActiveSlide(gallerySwiperRef.current.swiper.realIndex),
    },
  }

  const customStyles = {
    overlay: {
      zIndex: "1030",
    },
    bodyOpen: {
      position: "fixed",
    },
  }

  return (
    <>
      <Row>
        <Col className={sliderClass} {...sliderColumns}>
          <div className="ribbon ribbon-info">Fresh</div>
          <div className="ribbon ribbon-primary">Sale</div>
          <Swiper {...sliderParams} ref={gallerySwiperRef}>
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <Magnifier
                  mgShowOverflow={false}
                  mgWidth={2000}
                  mgHeight={2000}
                  className="img-fluid"
                  src={item.img}
                  alt={item.alt}
                  zoomFactor={0.11}
                  style={{ cursor: "default" }}
                  onTouchStart={() => setDragged(false)}
                  onTouchMove={() => setDragged(true)}
                  onClick={() => onClick(index)}
                  onTouchEnd={() => !dragged && onClick(index)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>

        <Col className={thumbsClass} {...thumbsColumns}>
          {data.map((item, index) => (
            <button
              key={index}
              onClick={() => slideTo(index)}
              className={`detail-thumb-item mb-3 ${
                activeSlide === index ? "active" : ""
              }`}
            >
              <img className="img-fluid" src={item.img} alt={item.alt} />
            </button>
          ))}
        </Col>

        {lightBoxOpen && (
          <Lightbox
            mainSrc={data[activeImage].img}
            nextSrc={data[(activeImage + 1) % data.length].img}
            prevSrc={data[(activeImage + data.length - 1) % data.length].img}
            onCloseRequest={() => setLightBoxOpen(false)}
            imageCaption={data[activeImage].caption}
            onMovePrevRequest={() =>
              setActiveImage((activeImage + data.length - 1) % data.length)
            }
            onMoveNextRequest={() =>
              setActiveImage((activeImage + 1) % data.length)
            }
            enableZoom={false}
            reactModalStyle={customStyles}
          />
        )}
      </Row>
    </>
  )
}

export default SwiperGallery
