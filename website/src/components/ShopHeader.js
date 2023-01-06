import React from 'react'
import {Link} from "next/link"

const ShopHeader = (props) => {
  return (
    <header className="product-grid-header justify-content-center">
      {/* <div className="me-3 mb-3">
        Showing <strong>1-12 </strong>of <strong>158 </strong>products
      </div> */}
      <div className="me-3 mb-3">
        {/* <span className="me-2">Show</span> */}
        <a className="product-grid-header-show h5" href="#">
          All{" "}
        </a>
        {props.categories.map(item => <Link href={`/${props.channel}/explore?page=1&category=${item.slug}`}>
          <a className="product-grid-header-show mx-3 h5" href="#">
            {item.title}{" "}
          </a>
        </Link>)}
       
      </div>
      {/* <div className="mb-3 d-flex align-items-center">
        <span className="d-inline-block me-1">Sort by</span>
        <select className="custom-select w-auto border-0">
          <option value="orderby_0">Default</option>
          <option value="orderby_1">Popularity</option>
          <option value="orderby_2">Rating</option>
          <option value="orderby_3">Newest first</option>
        </select>
      </div> */}
    </header>
  )
}

export default ShopHeader
