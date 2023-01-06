import React, { useState, useEffect } from "react"
import Breadcrumbs from "./Breadcrumbs"

import { Container, Row, Col } from "react-bootstrap"
import { Parallax, Background } from "react-parallax"
import Image from "./CustomImage"

const HeroParallax = (props) => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])
  return (
    <section className="overflow-hidden position-relative dark-overlay">
      <Parallax strength={500} bgStyle={{ height: "120%" }}>
        <Background className="vw-100">
          <Image
            src="/img/photo/erii-gutierrez-487083-unsplash.jpg"
            alt="Autumn vibes"
            layout="fill"
            className="bg-image"
            priority
            objectPosition="right bottom"
          />
        </Background>
        <Container className="overlay-content hero hero-page text-white py-3 py-lg-7">
          <div className="hero-content pb-5 text-center">
            {props.breadcrumbs && (
              <Breadcrumbs
                className="text-white justify-content-center no-border mb-0"
                links={props.breadcrumbs}
                linkClass="text-white"
                spanClass="text-white"
              />
            )}
            <h1 className="mb-5">{props.title && props.title}</h1>
            {props.content && (
              <Row>
                <Col xl="8" className="mx-auto">
                  <p className="lead mb-0">{props.content}</p>
                </Col>
              </Row>
            )}
          </div>
        </Container>
      </Parallax>
    </section>
  )
}

export default HeroParallax
