import React from "react"
import { Dropdown, Nav } from "react-bootstrap"
import ActiveLink from "../ActiveLink"
import Link from "next/link"
import CartOverviewDropdown from "../CartOverviewDropdown"
import Icon from "../Icon"
import {UserContext} from '../UserContext';
import {CartContext} from '../CartContext';
export default function Icons({
  loggedUser,
  searchToggle,
  channel,
  setSearchToggle,
}) {

  const {loggedIn, user, logout, guard} = React.useContext(UserContext)
  const {showCart, cart, addToCart} = React.useContext(CartContext)
  return (
    <div className="d-flex align-items-center justify-content-between justify-content-lg-end mt-1 mb-2 my-lg-0">
      {/* Search Button*/}
      <Nav.Item>
        <div
          className="nav-item navbar-icon-link"
          data-toggle="search"
          onClick={() => setSearchToggle(!searchToggle)}
        >
          <Icon icon="search-1" />
        </div>
      </Nav.Item>

      {loggedIn ? (
      
          <Dropdown
            as="div"
            className={
             "navbar-icon-link mt-n1 py-0" 
            }
          >
            {/* Logged User - Show User Menu */}
            <Dropdown.Toggle
                    as="a"
                    href="#"
                    className="topbar-link text-decoration-none d-none d-lg-flex text-dark h5 m-1 py-2 px-3"
                  >
                   {user.first_name}
            </Dropdown.Toggle>
            <Dropdown.Toggle

                    as="a"
                    href="#"
                    className="text-decoration-none d-flex d-lg-none text-dark h5 m-1 py-0 px-0"
                  >
                  <Icon icon="male-user-1" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              {
                [{
                  "title": "Orders",
                  "link": "customer-orders"
               },
               {
                  "title": "Profile",
                  "link": "customer-account"
               },
               {
                  "divider": true
               }
            ].map((dropdownItem, dropdownIndex) =>
                  dropdownItem.divider ? (
                    <Dropdown.Item key={dropdownIndex} divider="true" />
                  ) : (
                    <ActiveLink
                      key={dropdownIndex}
                      activeClassName="active"
                      href={'/'+ channel+'/'+dropdownItem.link}
                      passHref
                    >
                      <Dropdown.Item>
                        {dropdownItem.title}
                      </Dropdown.Item>
                    </ActiveLink>
                  )
                )}
                <Dropdown.Item onClick={() => {
                  logout()
                }}>
                  Sign Out
                </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

      ) : (
        <Nav.Item className="nav-item">
          {/* User Not Logged - link to login page*/}
          <div
            className="nav-item navbar-icon-link"
            data-toggle="search"
            onClick={guard}
          >
            <Icon icon="male-user-1" />

            <span className="text-sm ms-2 ms-lg-0 text-uppercase text-sm fw-bold d-none d-sm-inline d-lg-none">
              Log in
            </span>
          </div>
        </Nav.Item>
      )}

      {/* Cart Overview Dropdown*/}

        {loggedIn && <CartOverviewDropdown cart={cart} onClick={showCart}/>}

      {/* End Cart Overview Dropdown*/}
    </div>
  )
}
