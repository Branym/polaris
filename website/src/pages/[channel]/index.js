import { Container, Row, Col } from "react-bootstrap"
import Link from "next/link"
import Image from "../../components/CustomImage"
import React from 'react';
import Swiper from "../../components/Swiper"
import SwiperProducts from "../../components/SwiperProducts"
import SwiperBrands from "../../components/SwiperBrands"
import Post from "../../components/Post"
import data from "../../data/index.json"
import marqueeData from "../../data/marqueeData.json"
import products from "../../data/products.json"
import SwiperTest from "../../components/SwiperTest"
import Icon from "../../components/Icon"
import SwiperPopProducts from "../../components/SwiperPopProducts"
import HeroMain from "../../components/HeroMain"
import {ShopContext} from '../../components/ShopContext'
import {fetchProducts} from '../../services/products'
import SwiperCategory from "../../components/SwiperCategory";


export async function getServerSideProps(context) {

  const {channel} = context.params

  
  if(["USA", "IND"].includes(channel)){
    const popularProducts = await fetchProducts(channel, {tags: 'Popular'})
    const menCollection = await fetchProducts(channel, {tags: 'Men'})
    const womenCollection = await fetchProducts(channel, {tags: 'Women'})
    return {
      props: {
        populars: popularProducts?.data,
        collections:{ 
          men: menCollection?.data,
          women: womenCollection?.data
        },
        channel,
        nav: {
          light: true,
        },
        title: "Homepage",
      },
    }
  }
  else{
    return {
      notFound: true
    }
  }

  
}

export default function Home3({populars,collections, channel, ...props}) {
  const {channels, categories} = React.useContext(ShopContext)
  return (
    <>
      <Col lg="6" className="p-lg-0 d-block d-lg-none about-image-column">
            <img
              className="bg-image"
              src="/images/cover_md.jpg"
              alt=""
              layout="fill"
            />
      </Col>
      <HeroMain
        data={data.hero}
        marqueeData={marqueeData.data}
        autoplay={{ delay: 5000 }}
        loop
        slidesPerView={1}
        spaceBetween={0}
        centeredSlides
        channel={channel}
        speed={1500}
        parallax
        navigation
        pagination
        className="home-classic-slider"
        containerclass="container mx-0 mx-lg-auto bg-primary h-100 px-sm-5 px-3 py-0 py-lg-5"
        paginationClass="swiper-pagination-white"
        sectionClass="position-relative py-lg-0 py-xl-5 overflow-hidden"
        style={{ minHeight: "600px" }}
      />


      <section className="pt-6 bg-gray-100">
          <Row className="left-space">
            <Col lg="4" className="mx-auto d-flex flex-column justify-content-center text-left px-lg-0 px-5 mb-5">
              <h1 className="text-serif">Our Popular <br /> Products</h1>
              <p style={{fontSize: "20px", paddingRight: "64px"}} className="text-muted mt-4" >
                The Garment products of Polaris Medfabrics has been delivered with confidence to the customers all across Globe.
              </p>
              <div className="mt-5">
                <Link href={`/${channel}/explore?collection=Popular`}>
                  <a type="button" className="btn btn-outline-dark">
                    VIEW ALL
                  </a>
                </Link>
              </div>
            </Col>
            
              <Col lg="8" className="d-flex justify-content-end mx-auto text-left mb-5">
              <SwiperPopProducts channel={channel} currency={channels?.filter(item => item.slug === channel)[0]?.currency} navigation products={populars} />
            </Col>
          </Row>
      </section>
      

      <section className="py-lg-6 py-5 bg-gray-100">
        <Container>
          <Row>
            <Col md="8" className="mx-auto text-center mb-5">
              <h2 className="text-serif">Shop By Category</h2>
            </Col>
          </Row>

          <SwiperCategory channel={channel} navigation categories={[
            {
              name: "Scrubs",
              bg_image: "https://polaris-cbx.s3.ap-south-1.amazonaws.com/scrub-v-neck-male-black-2.jpg",
              link: "scrubs"
            },
            {
              name: "Aprons",
              bg_image: "https://polaris-cbx.s3.ap-south-1.amazonaws.com/apron-short-female-white-0.jpg",
              link: "aprons"
            },
            {
              name: "Patient Dresses",
              bg_image: "https://polaris-cbx.s3.ap-south-1.amazonaws.com/patient-male-dress-for-lilac-4.jpg",
              link: "patient"
            },
            // {
            //   name: "Bedsheets",
            //   bg_image: "/img/categories/bedsheets.png",
            //   link: "bedsheets"
            // },

          ]} />
        </Container>
      </section>

      {/* <HomeOurPicks /> */}
      <section className="py-lg-6 py-5 bg-gray-100">
        <Container>
          <Row>
            <Col lg="6" className="mx-auto text-left mb-5">
              <h1 className="text-serif">Wear Your Style. <br /> Wear Your Colour.</h1>
              <Row className="mt-lg-6 mt-3">
                <Col xs="6" className="mt-5">
                  <img
                  src="/img/icons/feather.png"
                    className="svg-icon-light text-primary w-3rem h-3rem mb-3"
                  />
                  <h4 className="text-serif">Ultra Soft</h4>
                  <p className="pr-lg-5">
                  Fabric so soft and gentle on your body to give the desired comfort.
                  </p>
                </Col>
                <Col xs="6" className="mt-5">
                  <img
                  src="/img/icons/fabric.png"
                    className="svg-icon-light text-primary w-3rem h-3rem mb-3"
                  />
                  <h4 className="text-serif">Breathable Fabric</h4>
                  <p className="pr-lg-5">
                  For keeping your sweat free all day long.
                  </p>
                </Col>
                <Col xs="6" className="mt-5">
                  <img
                  src="/img/icons/wrinkles.png"
                    className="svg-icon-light text-primary w-3rem h-3rem mb-3"
                  />
                  <h4 className="text-serif">Wrinkle Resistant</h4>
                  <p className="pr-lg-5">
                  Looks professionally at your best with it’s wrinkle free fabric.
                  </p>
                </Col>
                <Col xs="6" className="mt-5">
                  <img
                  src="/img/icons/clock.png"
                    className="svg-icon-light text-primary w-3rem h-3rem mb-3"
                  />
                  <h4 className="text-serif">Made for Long Shifts</h4>
                  <p className="pr-lg-5">
                  Tailored for giving you hassle free movement for longer hours.
                  </p>
                </Col>
              </Row>
            </Col>
            <Col lg="6" className="d-flex justify-content-end mx-auto text-left mb-5">
              <img className="img-fluid" style={{objectFit:"cover"}} src="/images/features.jpg" alt="Modern Jacket" />
            </Col>
          </Row>
        </Container>
      </section>



      <section className="py-lg-6 py-5 bg-gray-100">
        <Container>
          <Row>
            <Col xs="8" className="mx-auto text-left mb-5">
              <h2 className="text-serif">Women Collection</h2>
            </Col>
            <Col xs="4" className="d-flex justify-content-end mx-auto text-left mb-5">
              <div>
              <Link href={`/${channel}/explore?collection=Women`}>
                  <a type="button" className="btn btn-outline-dark">
                    VIEW ALL
                  </a>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
        <SwiperProducts channel={channel} currency={channels?.filter(item => item.slug === channel)[0]?.currency} products={collections.women} pagination />
      </section>

      <section className="py-lg-6 py-5 bg-gray-100">
        <Container>
          <Row>
            <Col xs="8" className="mx-auto text-left mb-5">
              <h2 className="text-serif">Men Collection</h2>
            </Col>
            <Col xs="4" className="d-flex justify-content-end mx-auto text-left mb-5">
              <div>
              <Link href={`/${channel}/explore?collection=Men`}>
                  <a type="button" className="btn btn-outline-dark">
                    VIEW ALL
                  </a>
                </Link>
              </div>
            </Col>
          </Row>
          </Container>
          <SwiperProducts channel={channel} currency={channels?.filter(item => item.slug === channel)[0]?.currency} products={collections.men} pagination />
      </section>

      {/* <section className="py-lg-6 py-5">
        <Container>
          <Row>
            <Col xl="8" className="mx-auto text-center mb-5">
              <h3 className="text-uppercase">From our journal</h3>
              <p className="lead text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Col>
          </Row>

          <Row>
            {data.posts.map((post, index) => {
              // the first post is featured
              if (index >= 1) {
                return (
                  <Col xs="6" lg="4" key={index}>
                    <Post data={post} />
                  </Col>
                )
              }
            })}
          </Row>
        </Container>
      </section> */}

      {/* <section className="py-lg-6 py-5 d-none d-md-block bg-gray-100">
        {data.test && (
          <container>
            <h2 className="text-serif text-center mb-3">
              What our customers has to Say.
            </h2>
            <p className="lead text-normal text-center pb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <SwiperTest tests={data.test} pagination></SwiperTest>
          </container>
        )}
      </section> */}
      {/* Divider Section*/}
      {/* <section className="py-lg-6 py-5 position-relative light-overlay">
        <Image
          className="bg-image"
          src="/img/photo/benjamin-voros-260869-unsplash.jpg"
          alt=""
          layout="fill"
        />
        <Container>
          <div className="overlay-content text-center text-dark">
            <p className="text-uppercase fw-bold mb-1 letter-spacing-5">
              Old Collection{" "}
            </p>
            <h3 className="display-1 fw-bold text-serif mb-4">Summer Sales</h3>
            <Link href="/category">
              <a className="btn btn-dark">Shop Now</a>
            </Link>
          </div>
        </Container>
      </section>*/}
    </>
  )
}
