import React, { useState } from "react"

import { Button, Dropdown } from "react-bootstrap"

import Link from "next/link"

import CartOverviewItem from "./CartOverviewItem"

import Icon from "./Icon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

export default function CartDropdown({cart, onClick}) {
  return cart.length ? (
    <>
      <div className="nav-item">
          <a onClick={() => onClick()} className="navbar-icon-link d-lg-none">
            <Icon icon="cart-1" />

            <span className="text-sm ms-2 ms-lg-0 text-uppercase text-sm fw-bold d-none d-sm-inline d-lg-none">
              View cart
            </span>
          </a>
        <div className="d-none d-lg-block">
          {/* Cart Dropdown*/}
          <div
              className="nav-item navbar-icon-link"
              data-toggle="search"
              onClick={() => onClick()}
            >
              <Icon icon="cart-1" />
              <div className="navbar-icon-link-badge">{cart.length}</div>
            </div>
         
        </div>
      </div>
    </>
  ) : <></>
}
