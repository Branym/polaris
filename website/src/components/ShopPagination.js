import React from "react"
import { Pagination } from "react-bootstrap"

const ShopPagination = (props) => {
  return (
    <nav
      className="d-flex justify-content-center mb-5 mt-3"
      aria-label="page navigation"
    >
      <Pagination>
        <Pagination.Prev>Prev</Pagination.Prev>
        <Pagination.Item active>1</Pagination.Item>
        <Pagination.Item>2</Pagination.Item>
        <Pagination.Item>3</Pagination.Item>
        <Pagination.Item>4</Pagination.Item>
        <Pagination.Item>5</Pagination.Item>
        <Pagination.Next>Next</Pagination.Next>
      </Pagination>
    </nav>
  )
}

export default ShopPagination
