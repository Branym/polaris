import { Container, Row, Col, Button } from "react-bootstrap"
import React from "react"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from "swiper"
import Image from "./CustomImage"
export default function SwiperComponent(props) {
  const breakpoints = []
  if (props.sm) {
    breakpoints[565] = {
      slidesPerView: props.sm,
    }
  }
  if (props.md) {
    breakpoints[768] = {
      slidesPerView: props.md,
    }
  }
  if (props.lg) {
    breakpoints[991] = {
      slidesPerView: props.lg,
    }
  }
  if (props.xl) {
    breakpoints[1200] = {
      slidesPerView: props.xl,
    }
  }
  if (props.xxl) {
    breakpoints[1400] = {
      slidesPerView: props.xxl,
    }
  }
  if (props.xxxl) {
    breakpoints[1600] = {
      slidesPerView: props.xxxl,
    }
  }
  const params = {
    className: props.className,
    modules: [Navigation, Pagination, Autoplay, EffectFade, Parallax],
    slidesPerView: props.perView ? props.perView : 1,
    effect: props.effect,
    allowTouchMove: props.allowTouchMove === false ? false : true,
    spaceBetween: props.spaceBetween ? props.spaceBetween : 0,
    centeredSlides: props.centeredSlides,
    roundLengths: props.roundLengths,
    loop: props.loop,
    speed: props.speed ? props.speed : 400,
    parallax: props.parallax,
    breakpoints: breakpoints,
    autoplay: props.autoplay,
    pagination:
      props.pagination !== undefined
        ? {
            clickable: true,
            dynamicBullets: true,
          }
        : false,
    navigation: props.navigation !== undefined,
  }
  return props.data ? (
    <section className={props.sectionClass ? props.sectionClass : ""}>
      <Swiper {...params}>
        {props.data.map((slide, index) => (
          <SwiperSlide
            key={index}
            className={`${slide.itemclass ? slide.itemclass : ""} ${
              slide.darkOverlay ? `dark-overlay` : ""
            }`}
            style={{
              ...props.style,
            }}
          >
            {slide.img && (
              <Image
                src={slide.img}
                className="bg-image"
                layout="fill"
                alt="..."
                loading={props.eager && index === 0 ? "eager" : "lazy"}
              />
            )}
            <Container
              fluid={props.containerFluid}
              className={`${!props.columns ? "px-lg-6" : ""} ${
                props.containerclass ? props.containerclass : ""
              } h-100`}
              style={slide.containerStyle}
            >
              <Row
                className={`overlay-content align-items-center ${
                  slide.rowclass ? slide.rowclass : ""
                }`}
                data-swiper-parallax="-500"
              >
                <Col
                  lg={{
                    span: 8,
                    offset: slide.contentoffset,
                  }}
                  className={slide.contentclass ? slide.contentclass : ""}
                >
                  {slide.subtitle && (
                    <h5
                      className={`h-100 subtitle letter-spacing-5 ${
                        slide.subtitleclass ? slide.subtitleclass : ""
                      }`}
                    >
                      {slide.subtitle}
                    </h5>
                  )}
                  <h2
                    className={slide.titleclass ? slide.titleclass : ""}
                    style={{ lineHeight: "1" }}
                  >
                    {slide.name}
                  </h2>
                  {slide.text && (
                    <p
                      className={`lead mb-5`}
                      dangerouslySetInnerHTML={{ __html: slide.text }}
                    />
                  )}
                  <Link href={slide.link} passHref>
                    <Button variant={props.columns ? "outline-dark" : "light"}>
                      {slide.button}
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  ) : (
    "loading"
  )
}
