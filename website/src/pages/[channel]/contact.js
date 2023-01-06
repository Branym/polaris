import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"

import { Container, Row, Col } from "react-bootstrap"

import Hero from "../../components/Hero"
import ContactForm from "../../components/ContactForm"

import UseWindowSize from "../../hooks/UseWindowSize"
import Icon from "../../components/Icon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTwitter,
  faVimeo,
} from "@fortawesome/free-brands-svg-icons"

export async function getServerSideProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "navbar-sticky bg-fixed-white",
        color: "white",
      },
      title: "Contact",
    },
  }
}

let Map

const breadcrumbLinks = [
  { name: "Home", link: "/" },
  { name: "Contact", active: true },
]

export default function Contact(props) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [tap, setTap] = useState(false)
  const size = UseWindowSize()

  useEffect(() => {
    Map = dynamic(() => import("../../components/Map"), { ssr: false })
    setMapLoaded(true)
    setTap(size.width > 700)
    setDragging(size.width > 700)
  }, [])

  return (
    <>
      <Hero
        title={props.title}
        breadcrumbs={breadcrumbLinks}
        content=""
      />

      <section className="py-6" style={{ background: "#fafafa" }}>
        <Container>
          <Row>
            <Col md="4" className="text-center text-md-start">
              <Icon
                className="svg-icon-light text-primary w-3rem h-3rem mb-3"
                icon="navigation-map-1"
              />
              <h4>Address</h4>
              <p className="text-muted">
                29, Golimar Garden, 
                <br />
                Sahakar Marg, 
                <br />
                Jaipur, <strong>India</strong><br/>302005
              </p>
            </Col>
            <Col md="4" className="text-center text-md-start">
              <Icon
                className="svg-icon-light text-primary w-3rem h-3rem mb-3"
                icon="audio-call-1"
              />
              <h4>Call center</h4>
              <p className="text-muted">
                You can reach out to us anytime between 9 A.M. to 7 P.M. from Monday to Saturday.
              </p>
              <p className="text-muted">
                <strong>+91 830 699 8921</strong>
              </p>
            </Col>
            <Col md="4" className="text-center text-md-start">
              <Icon
                className="svg-icon-light text-primary w-3rem h-3rem mb-3"
                icon="mail-1"
              />
              <h4>Digital support</h4>
              <p className="text-muted">
                Please feel free to write an email to us.
              </p>
              <ul className="list-unstyled text-muted">
                <li>support@polarismedfabrics.com</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-6">
        <Container>
          <header className="mb-5">
            <h2 className="text-uppercase h5">Contact form</h2>
          </header>
          <Row>
            <Col md="7" className="mb-5 mb-md-0">
              <ContactForm />
            </Col>
            {/* <Col md="5">
              <p className="text-muted">
                Effects present letters inquiry no an removed or friends. Desire
                behind latter me though in. Supposing shameless am he engrossed
                up additions. My possible peculiar together to. Desire so better
                am cannot he up before points. Remember mistaken opinions it
                pleasure of debating. Court front maids forty if aware their at.
                Chicken use are pressed removed.{" "}
              </p>
              <p className="text-muted">
                Able an hope of body. Any nay shyness article matters own
                removal nothing his forming. Gay own additions education
                satisfied the perpetual. If he cause manor happy. Without
                farther she exposed saw man led. Along on happy could cease
                green oh.{" "}
              </p>
              <div className="social">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a href="#" target="_blank">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" target="_blank">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" target="_blank">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" target="_blank">
                      <FontAwesomeIcon icon={faPinterest} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" target="_blank">
                      <FontAwesomeIcon icon={faVimeo} />
                    </a>
                  </li>
                </ul>
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
      {/* <div style={{ height: 300 }}>
        {mapLoaded && (
          <Map
            className="h-100"
            center={[40.732346, -74.0014247]}
            markerPosition={[40.732346, -74.0014247]}
            zoom={16}
            dragging={dragging}
            tap={tap}
          />
        )}
      </div> */}
    </>
  )
}
