import Link from "next/link"
import { useRouter } from "next/router"
import { Container, Row, Col, Button } from "react-bootstrap"
import Image from "../../components/CustomImage"
import Icon from "../../components/Icon"

export async function getServerSideProps(context) {
  return {
    props: {
      nav: {
        light: true,
      },
      title: "About Us",
    },
  }
}

export default function About(props) {

  const router = useRouter()

  return (
    <>
      {/* Hero Section*/}
      <section className="dark-overlay d-none d-lg-flex py-7 d-flex align-items-center justify-content-center">
        <img
          className="bg-image"
          src="/images/cover.jpg"
          alt=""
          layout="fill"
        />
        <div className="overlay-content py-7 w-100">
          <Container>
            <Row>
              <Col xl="6" className="text-white">
                <h6 className="text-uppercase text-white letter-spacing-5 mb-3">
                  About us
                </h6>
                <h1 className="display-3 fw-bold text-shadow mb-5">
                  We are Polaris
                </h1>
                <p className="text-lg">
                Polaris Medifabrics is on its way of designing the most fashionable and colorful clothing for our real-life heroes: Medical Professionals. We bring you a collection of comfy and trendy hospital-attire because fashion tarts with the medical professionals!
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      <section>
        <Container fluid>
          <Row className="d-lg-none d-flex">
            <Col lg="6" className="about-text-column text-white bg-primary">
              <div className="about-text">
                <h6 className="text-uppercase text letter-spacing-5 mb-1">
               About Us
                </h6>
                <h1 className="mb-2" style={{fontSize: "36px"}}>We are <br/> Polaris Medfabrics</h1>
                <p className="text-lg">
                Polaris Medifabrics is on its way of designing the most fashionable and colorful clothing for our real-life heroes: Medical Professionals. We bring you a collection of comfy and trendy hospital-attire because fashion tarts with the medical professionals!
                </p>
              </div>
            </Col>
            <Col lg="6" className="p-lg-0 about-image-column">
              <img
                className="bg-image"
                src="/images/cover_md.jpg"
                alt=""
                layout="fill"
              />
            </Col>
          </Row>
          <Row>
            <Col lg="6" className="about-text-column bg-gray-100">
              <div className="about-text">
                <h6 className="text-uppercase text-muted letter-spacing-5 mb-1">
                  Quality Fabrics
                </h6>
                <h2 className="mb-4">The Attire of Confidence</h2>
                <p className="text-lg text-muted">
                The Garment products of Polaris Medifabrics have been delivered with confidence to customers all across India. The fabrics most suited to the needs of the customers are offered along with choices of colours and designs.
                </p>
              </div>
            </Col>
            <Col lg="6" className="p-lg-0 about-image-column">
              <img
                className="bg-image"
                src="/images/about-1.jpg"
                alt=""
                layout="fill"
              />
            </Col>
          </Row>
          <Row>
            <Col lg="6" className="p-lg-0 about-text-column bg-gray-200 order-lg-2">
              <div className="about-text">
                <h6 className="text-uppercase text-muted letter-spacing-5 mb-1">
                  Trendy designs
                </h6>
                <h2 className="mb-4">Shop Your Style </h2>
                <p className="text-lg text-muted">
                The customer choice of Designs and styles in various shades of colours are delivered from our unit.
                </p>
              </div>
            </Col>
            <Col lg="6" className="p-lg-0 about-image-column order-lg-1">
              <img
                className="bg-image"
                src="/images/about-2.jpg"
                alt=""
                layout="fill"
              />
            </Col>
          </Row>
          {/* <Row>
            <Col lg="6" className="about-text-column bg-gray-100">
              <div className="p-5">
                <blockquote className="mb-5">
                  <p className="text-xl text-serif mb-4">
                    Samsa was a travelling salesman - and above it there hung a
                    picture that he had recently cut out of an illustrated
                    magazine and housed in a nice, gilded frame.
                  </p>
                  <h6 className="text-lg text-uppercase text-primary">
                    — Franz Kafka, Founder
                  </h6>
                </blockquote>
                <p className="text-lg text-muted">
                  He must have tried it a hundred times, shut his eyes so that
                  he wouldn't have to look at the floundering legs, and only
                  stopped when he began to feel a mild, dull pain there that he
                  had never felt before.
                </p>
              </div>
            </Col>
            <Col lg="6" className="p-lg-0 about-image-column">
              <Image
                className="bg-image"
                src="/img/photo/marco-xu-496929-unsplash.jpg"
                alt=""
                layout="fill"
              />
            </Col>
          </Row> */}
        </Container>
      </section>
      {/* <section className="py-6">
        <Container>
          <Row>
            <Col lg="5">
              <h6 className="text-uppercase text-muted letter-spacing-5 mb-1">
                Our history
              </h6>
              <h2 className="mb-4">Inspired comfort</h2>
              <p className="text-lg text-muted">
              We have always aspired to create a company where talented individuals collaborate to deliver extraordinary results that reflect the values we place on diverse opinions, experiences and backgrounds. Our guiding principles are present in every decision and essential to our journey of becoming a responsible brand: Featuring elevated design, advanced fabrics.
              </p>
            </Col>
            <Col lg="6" className="ms-lg-auto">
              <Row>
                <Col sm="6" className="mb-4">
                  <h4>1995</h4>
                  <p className="text-muted">
                    One morning, when Gregor Samsa woke from troubled dreams, he
                    found himself transformed in his bed into a horrible vermin
                  </p>
                </Col>
                <Col sm="6" className="mb-4">
                  <h4>2000</h4>
                  <p className="text-muted">
                    The bedding was hardly able to cover it and seemed ready to
                    slide off any moment. His many legs, pitifully thin compared
                  </p>
                </Col>
                <Col sm="6" className="mb-4">
                  <h4>2010</h4>
                  <p className="text-muted">
                    His room, a proper human room although a little too small,
                    lay peacefully between its four familiar walls. A collection
                  </p>
                </Col>
                <Col sm="6" className="mb-4">
                  <h4>2018</h4>
                  <p className="text-muted">
                    Samsa was a travelling salesman - and above it there hung a
                    picture that he had recently cut out of an illustrated magaz
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section> */}
      <section>
        <Container>
          <Row className="justify-content-center pt-4">
            <Col lg="6" className="d-flex align-items-center">
              <div className="w-100 d-none d-lg-block">
                <img
                  src="/images/about-3.jpg"
                  alt=""
                  style={{objectFit:"cover"}}
                  width={690}
                  height={460}
                  sizes="(max-width:992px) 100vw, 690px"
                />
              </div>
            </Col>
            <Col lg="5" className="d-none d-lg-block">
              <img
                 src="/images/about-4.jpg"
                alt=""
                width={445}
                height={556}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section style={{marginTop: "-96px"}} className="pb-lg-7 pb-0">
        <Container>
          <Row>
            <Col lg="8" className="mx-auto p-5 bg-primary">
              <h2 className="mb-3 text-white">
              At Polaris Medifabrics, We Sell Modern Medical Uniform that Reflects Profession 
              </h2>
              <Link href={`/${router.query.channel}/explore`}>
                <Button className="p-3" variant="outline-light">
                  Explore Products
                </Button>
              </Link>
            </Col>
            {/* <Col lg="6">
              <p className="text-lg text-muted">
                One morning, when Gregor Samsa woke from troubled dreams, he
                found himself transformed in his bed into a horrible vermin. He
                lay on his armour-like back, and if he lifted his head a little
                he could see his brown belly, slightly domed and divided by
                arches into stiff sections
              </p>
            </Col>
            <Col lg="6">
              <p className="text-lg text-muted">
                The bedding was hardly able to cover it and seemed ready to
                slide off any moment. His many legs, pitifully thin compared
                with the size of the rest of him, waved about helplessly as he
                looked. "What's happened to me?" he thought. It wasn't a dream.
              </p>
            </Col> */}
          </Row>
        </Container>
      </section>
    </>
  )
}
