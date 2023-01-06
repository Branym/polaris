import React, { useState } from "react"

import Link from "next/link"
import Image from "./CustomImage"

import ModalQuickView from "./ModalQuickView"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faExpandArrowsAlt,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons"
import { Button } from "react-bootstrap"
import { formatPrice } from "../services/formatPrice"

const Product = ({ data, channel, currency, height=240, ...props }) => {
  const [quickView, setQuickView] = useState(false)
  let loading = "lazy"

  if (props.loading) {
    loading = props.loading
  }

  return (
    <>
      <div className="product">
        <div className="product-image">
          {/* {data.new && <div className="ribbon ribbon-info">Fresh</div>}
          {data.sale && <div className="ribbon ribbon-primary">Sale</div>}
          {data.soldout && <div className="ribbon ribbon-danger">Sold out</div>} */}

          {typeof data.img === "object" ?
            (masonry ? (
              <img
                className="img-fluid"
                src={data.img.masonry[0].img}
                alt={data.img.masonry[0].alt}
              />
            ) : (
              <Image
                className="img-fluid"
                src={data.img.category[0].img}
                alt={data.img.category[0].alt}
                width={530}
                height={795}
                sizes="(max-width: 576px) 100vw, 530px"
              />
            )) : <img
            className="img-fluid"
            src={(data.media[0].includes('https://') ?  data.media[0] : ('https://polaris-cbx.s3.ap-south-1.amazonaws.com/' + data.media[0])) + '?date=' + Date.now()}
            alt={data.name}
            style={{height: height, objectFit: "cover"}}
            width={530}
            height={795}
          />}
          <div className="product-hover-overlay">
            {/* <Link href={channel + '/product/' + data.slug}>
              <a className="product-hover-overlay-link" />
            </Link> */}
            <div className="product-hover-overlay-buttons">
              {!props.onlyViewButton && (
                <Button
                  variant="outline-dark"
                  className="btn-product-left"
                  href="#"
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                </Button>
              )}
              <Link href={'/' + channel + '/product/' + data.slug} passHref>
                <Button variant="dark" className="btn-buy">
                  <FontAwesomeIcon icon={faSearch} />
                  <span className="btn-buy-label ms-2">View</span>
                </Button>
              </Link>
              {!props.onlyViewButton && (
                <Button
                  variant="outline-dark"
                  className="btn-product-right"
                  onClick={() => setQuickView(!quickView)}
                >
                  <FontAwesomeIcon icon={faExpandArrowsAlt} />
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="py-2">
          {data.category && (
            <p className="text-muted text-sm mb-1">{data.category}</p>
          )}
          <h3 className="h6 text-uppercase mb-1">
            <Link href={'/' + channel + '/product/' + data.slug}>
              <a className="text-dark">{data.name}</a>
            </Link>
          </h3>
          <span className="text-muted">{formatPrice(data.variants[0].stock[channel].price, {currency})}</span>
        </div>
      </div>

      {/* {props.showQuickView !== false && (
        <ModalQuickView
          quickView={quickView}
          setQuickView={setQuickView}
          product={data}
        />
      )} */}
    </>
  )
}

export default Product
