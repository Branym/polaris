import React from "react"

import Link from "next/link"
import Image from "../components/CustomImage"

import { Container, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"

export async function getStaticProps() {
  return {
    props: {
    
      hideHeader: true,
      hideFooter: true,
      title: "404",
    },
  }
}

const PageNotFound = () => {
  return (
    <>
      <div className="mh-full-screen d-flex align-items-center dark-overlay pt-header-height">
        <Image
          className="bg-image"
          src="/img/photo/pete-bellis-189599-unsplash-big.jpg"
          alt=""
          layout="fill"
        />
        <Container className="text-white text-lg overlay-content py-6 py-lg-0">
          <h1 className="display-3 fw-bold mb-5">
            Oops, that page is not here.
          </h1>
          <p className="fw-light mb-5">
           Seems like your are lost.
          </p>
          <p className="mb-6">
            <Link href="/">
              <Button href="/" variant="outline-light">
                <FontAwesomeIcon icon={faHome} className="me-2" />
                Start from the Homepage
              </Button>
            </Link>
          </p>
          <p className="h4 text-shadow">Error 404</p>
        </Container>
      </div>
    </>
  )
}

export default PageNotFound
