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

const Category = ({ name, img,channel,link, height=240, ...props }) => {
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

          <img
            className="img-fluid"
            src={img + '?date=' + Date.now()}
            alt={name}
            style={{height: height, objectFit: "cover"}}
            width={530}
            height={795}
          />
          <div className="product-hover-overlay">
            <Link href={'/' + channel + '/explore?category=' + link}>
              <a className="product-hover-overlay-link" />
            </Link>
            {/* <div className="product-hover-overlay-buttons">
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
            </div> */}
          </div>
        </div>
        <div className="py-2">
          <h3 className="h6 text-uppercase mb-1">
            <Link href={'/' + channel + '/explore?category=' + link}>
              <a className="text-dark">{name}</a>
            </Link>
          </h3>
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

export default Category
