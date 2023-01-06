import Link from "next/link"
import React from "react"
import { Pagination } from "react-bootstrap"

const OrderPagination = ({total=50, limit=10, page= 1, channel}) => {

  const pages = Math.floor(total/limit)

  return (
    <nav
      className="d-flex justify-content-center mb-5 mt-3"
      aria-label="page navigation"
    >
      <Pagination>
        {console.log(Math.floor(total/limit), Array.from({length: Math.floor(total/limit)}).fill(1))}
        {/* {<Link href={"/" + channel + "/customer-orders?page=" + (page - 1)}>
            <Pagination.Prev disabled={page <= 1}>Prev</Pagination.Prev>
        </Link>} */}
        {Array.from({length: (Math.floor(total/limit) + 1)}).fill(1).map((item, index) => {
          return <Pagination.Item key={index} active={page === index + item ? true : false}>
              <Link href={"/" + channel + "/customer-orders?page=" + (index + item)}>
                <span>{index + item}</span>
              </Link>
          </Pagination.Item>
        })}
        {/* {<Link href={"/" + channel + "/customer-orders?page=" + (page + 1)}>
            <Pagination.Next disabled={page >= (Math.floor(total/limit) + 1)}>Next</Pagination.Next>
        </Link>} */}
      </Pagination>
    </nav>
  )
}

export default OrderPagination
