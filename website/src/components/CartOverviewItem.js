import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

const CartOverviewItem = ({ toggleDropdown, item }) => {
  return (
    <div className="navbar-cart-product">
      <div className="d-flex align-items-center">
        <Link href={item.link}>
          <a onClick={() => toggleDropdown()}>
            <img
              className="img-fluid navbar-cart-product-image"
              src={item.img}
              alt="..."
            />
          </a>
        </Link>
        <div className="w-100">
          <a className="navbar-cart-product-close" href="#">
            <FontAwesomeIcon icon={faTimes} />
          </a>
          <div className="ps-3">
            <Link href={item.link}>
              <a
                className="navbar-cart-product-link"
                onClick={() => toggleDropdown()}
              >
                {item.name}
              </a>
            </Link>
            <small className="d-block text-muted">Quantity: {item.items}</small>
            <strong className="d-block text-sm">
              ${item.total.toFixed(2)}
            </strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartOverviewItem
