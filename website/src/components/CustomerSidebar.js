import ActiveLink from "./ActiveLink"
import { Badge, Col } from "react-bootstrap"
import Icon from "./Icon"
import { useContext } from "react"
import { UserContext } from "./UserContext"

const CustomerSidebar = ({channel="IND", ...props}) => {

  const {user, logout} = useContext(UserContext)

  return (
    <Col
      xl={props.xl ? props.xl : "3"}
      lg={props.lg ? props.lg : "4"}
      className="mb-5"
    >
      <div className="customer-sidebar card border-0">
        <div className="customer-profile">
          {/* <a className="d-inline-block" href="#">
            <img
              className="img-fluid rounded-circle customer-image"
              src="/img/photo/kyle-loftus-589739-unsplash-avatar.jpg"
              alt="Customer Profile Image"
            />
          </a> */}
          <h5>{user.first_name} {user.last_name}</h5>
          <p className="text-muted text-sm mb-0">Customer ID : {user.cust_id}</p>
        </div>
        <nav className="list-group customer-nav">
          <ActiveLink activeClassName="active" href={'/' + channel +  "/customer-orders"}>
            <a className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                <Icon icon="paper-bag-1" className=" svg-icon-heavy me-2" />
                Orders
              </span>
              {/* <Badge pill bg="dark" className=" fw-normal px-3">
                5
              </Badge> */}
            </a>
          </ActiveLink>
          <ActiveLink activeClassName="active" href={'/' + channel +  "/customer-account"}>
            <a className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                <Icon icon="male-user-1" className=" svg-icon-heavy me-2" />
                Profile
              </span>
            </a>
          </ActiveLink>
          <div onClick={() => {logout()}}>
            <a className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                <Icon icon="exit-1" className=" svg-icon-heavy me-2" />
                Log out
              </span>
            </a>
          </div>
        </nav>
      </div>
    </Col>
  )
}

export default CustomerSidebar
