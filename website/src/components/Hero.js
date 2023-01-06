import React from "react"
import Breadcrumbs from "./Breadcrumbs"

import { Container, Row, Col } from "react-bootstrap"

const Hero = ({ children, ...props }) => {
  return (
    <section className="hero">
      <Container>
        {props.breadcrumbs && <Breadcrumbs links={props.breadcrumbs} />}
        <div className="hero-content pb-5 text-center">
          <h1 className="hero-heading text-serif">{props.title && props.title}</h1>
          {props.content && (
            <Row>
              <Col
                xl={{
                  span: 8,
                  offset: 2,
                }}
                dangerouslySetInnerHTML={{ __html: props.content }}
              />
            </Row>
          )}

          {children}
        </div>
      </Container>
    </section>
  )
}

export default Hero
