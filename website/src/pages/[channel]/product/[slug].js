import React, { useContext, useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"

import Breadcrumbs from "../../../components/Breadcrumbs"
import DetailSimilar from "../../../components/DetailSimilar"
import DetailTabs from "../../../components/DetailTabs"
import DetailMain from "../../../components/DetailMain"

import {ShopContext} from '../../../components/ShopContext'
import Lightbox from "react-image-lightbox"
import Magnifier from "react-magnifier"
import {useRouter} from "next/router";
import { renderProduct } from "../../../services/products"
import { formatPrice } from "../../../services/formatPrice"

export async function getServerSideProps(context) {

  const {channel, slug} = context.query;

  const data = await renderProduct(slug, channel)


  if(data.type === 'success'){
    return {
      props: {
        channel: channel,
        type: data.type,
        reviews: [],
        product: data.product,
        nav: {
          light: true,
        },
        title: "Homepage",
      } // will be passed to the page component as props
    }
  }
  else{
    return {
      notFound: true,
    }
  }
}

export default function Detail3({product, channel, ...props}) {
  const [lightBoxOpen, setLightBoxOpen] = useState(false)
  const [activeVariant, setVariant] = useState(-1);
  const [images, setImages] = useState([])
  const [activeImage, setActiveImage] = useState(0)
  const router = useRouter()
  const {channels, categories} = useContext(ShopContext)


  useEffect(async () => {

    setVariant(Number(router?.query?.active) || 0)

  }, [router])

  useEffect(() => {

    if(activeVariant >= 0){
      setImages(product?.variants[activeVariant]?.media.map(item => {return {img: '/img/loading.jpeg'}}))
      setTimeout(() => {
        setImages(product?.variants[activeVariant]?.media.map(item => {return {
          img: (item.includes('https://') ?  item : ('https://polaris-cbx.s3.ap-south-1.amazonaws.com/' + item)) + '?date=' + Date.now(),
          caption: product.name + " " + product.variants[activeVariant].name,
          alt: product.name + " " + product.variants[activeVariant].name
        }}))
      }, 100)
    }

  }, [activeVariant, router])

  const changeImages = (i) => {
    router.push(`/${router.query.channel}/product/${router.query.slug}?active=` + i)
  }
  
  const currency = channels.filter(item => item.slug === channel)[0]?.currency;

  const onClick = (e, index) => {
    e.preventDefault()
    setActiveImage(index)
    setLightBoxOpen(!lightBoxOpen)
  }

  const customStyles = {
    overlay: {
      zIndex: "1000",
    },
    bodyOpen: {
      position: "fixed",
    },
  }

  return activeVariant !== -1 && (
    <>
      <section className="product-details">
        <div className="container">
          <Row className="d-flex d-lg-none">
            <Col className="pt-3">
            <Breadcrumbs
                links={[
                  {
                    name: "Home",
                    link: "/" + channel,
                  },
                  {
                    name: categories.filter(item => item.slug === product.category)[0]?.title,
                    link: "/" + channel
                  }
                ]}
                className="justify-content-start py-2"
              />
              <h2 className="mb-4 text-serif">{product.name} - {product?.variants[activeVariant]?.name}</h2>
                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-0">
                  <ul className="list-inline mb-2 mb-sm-0">
                    <li className="list-inline-item h4 fw-light mb-0">
                      {formatPrice(product.variants[activeVariant]?.stock[channel]?.price, {currency: currency})}
                    </li>
                  </ul>
                </div>
            </Col>
          </Row>
          <Row>
            <Col
              lg={{ span: 6, order: 1 }}
              xl={7}
              xs={{ order: 1 }}
              className="pt-4"
            >
              <Row className="d-none d-lg-flex">
              {images.map((image, index) => (
                <Col lg="6" >
                <a
                  key={index}
                  // onClick={(e) => onClick(e, index)}
                  className="d-block mb-4"
                  // href={image.img}
                >
                  <Magnifier
                    mgShowOverflow={false}
                    mgWidth={2000}
                    mgHeight={2000}
                    className="img-fluid"
                    src={image.img}
                    alt={image.alt}
                    zoomFactor={0.11}
                    style={{ cursor: "pointer" }}
                  />
                </a>
                </Col>
              ))}
              </Row>
              <div className="w-100" style={{overflowX: "scroll"}}>
                <Row className="d-flex flex-nowrap d-lg-none">
                  {images.map((image, index) => (
                    <div className="col-10 px-1">
                        <img src={image.img} width="100%" style={{objectFit: "cover"}}></img>
                    </div>
                  ))}
                  </Row>
              </div>
              {lightBoxOpen && (
                <Lightbox
                  mainSrc={images[activeImage].img}
                  nextSrc={images[(activeImage + 1) % images.length].img}
                  prevSrc={
                    images[(activeImage + images.length - 1) % images.length]
                      .img
                  }
                  onCloseRequest={() => setLightBoxOpen(false)}
                  imageCaption={images[activeImage].caption}
                  onMovePrevRequest={() =>
                    setActiveImage(
                      (activeImage + images.length - 1) % images.length
                    )
                  }
                  onMoveNextRequest={() =>
                    setActiveImage((activeImage + 1) % images.length)
                  }
                  enableZoom={false}
                  reactModalStyle={customStyles}
                />
              )}
            </Col>
            <Col
              lg={{ span: 6, order: 2 }}
              xl={5}
              xs={{ order: 2 }}
              className=" ps-lg-5 pt-4"
            >
             
              <div className="sticky-top" style={{ top: "100px" }}>
                <DetailMain channel={channel} channels={channels} categories={categories} product={product} onChange={(i) => {setVariant(i); changeImages(i)}} activeVariant={activeVariant} />
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <DetailTabs product={product} reviews={[]} />

      {channel && <DetailSimilar products={product.related} channel={channel} currency={channels?.filter(item => item.slug === channel)[0]?.currency} />}
    </>
  )
}
