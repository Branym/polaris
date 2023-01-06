import { Container, Row, Col, Card } from "react-bootstrap"
import Link from "next/link"
import Image from "../components/CustomImage"
const HomeOurPicks = () => {
  return (
    <>
      <Container className="py-6">
        <Row>
          <Col xl="8" className="mx-auto text-center mb-5">
            <h2 className="text-uppercase">Our picks for Winter 2020</h2>
            <p className="lead text-muted">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Col>
        </Row>
        <Row className="align-items-md-stretch">
          <Col lg="4" className="d-flex align-items-lg-stretch">
            <div className="d-flex align-items-center text-white border-0 w-100 py-6 py-lg-4 text-center mb-4 mb-lg-0 position-relative">
              <Image
                className="bg-image"
                src="/img/photo/rahul-anil-214671-unsplash.jpg"
                alt=""
                layout="fill"
              />
              <Link href="/category">
                <a className="tile-link" />
              </Link>
              <div className="w-100 position-relative">
                <h1 className="text-uppercase">Men</h1>
                <p className="lead">
                  Consectetur adipisicing elit sed do eiusmod tempor.
                </p>
              </div>
            </div>
          </Col>
          <Col lg="8">
            <Card className="card light-overlay text-dark border-0 mb-4">
              <Image
                className="card-image"
                src="/img/photo/pete-bellis-189599-unsplash.jpg"
                alt="Card image"
                layout="responsive"
                width={700}
                height={467}
              />
              <Link href="/category-full">
                <a className="tile-link" />
              </Link>
              <Card.ImgOverlay className="d-flex align-items-center">
                <div className="text-center w-100 overlay-content">
                  <h1 className="text-uppercase">Ladies</h1>
                  <p className="lead">
                    Consectetur adipisicing elit sed do eiusmod tempor.
                  </p>
                </div>
              </Card.ImgOverlay>
            </Card>
            <Row>
              <Col lg="4">
                <Card className="text-white border-0 mb-lg-0 mb-4">
                  <Image
                    className="card-image"
                    src="/img/photo/haley-phelps-62815-unsplash.jpg"
                    alt="Card image"
                    layout="responsive"
                    width={2000}
                    height={1333}
                  />

                  <Link href="/category">
                    <a className="tile-link" />
                  </Link>
                  <Card.ImgOverlay className=" d-flex align-items-center">
                    <div className="text-center w-100">
                      <h2 className="text-uppercase mb-0">Denim</h2>
                    </div>
                  </Card.ImgOverlay>
                </Card>
              </Col>
              <Col lg="4">
                <Card className="dark-overlay text-white border-0 mb-lg-0 mb-4">
                  <Image
                    className="card-image"
                    src="/img/photo/matese-fields-233175-unsplash.jpg"
                    alt="Card image"
                    layout="responsive"
                    width={2000}
                    height={1330}
                  />

                  <Link href="/category-banner">
                    <a className="tile-link" />
                  </Link>
                  <Card.ImgOverlay className=" d-flex align-items-center">
                    <div className="text-center w-100 overlay-content">
                      <h4 className="text-uppercase mb-0">Accessories</h4>
                    </div>
                  </Card.ImgOverlay>
                </Card>
              </Col>
              <Col lg="4">
                <Card className="text-white border-0">
                  <Image
                    className="card-image"
                    src="/img/photo/brooke-cagle-195856-unsplash.jpg"
                    alt="Card image"
                    layout="responsive"
                    width={600}
                    height={400}
                  />
                  <Link href="/category-full">
                    <a className="tile-link" />
                  </Link>
                  <Card.ImgOverlay className=" d-flex align-items-center">
                    <div className="text-center w-100">
                      <h2 className="text-uppercase mb-0">Sales</h2>
                    </div>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomeOurPicks
