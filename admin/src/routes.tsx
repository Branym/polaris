import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CATEGORIES, CREATE_PRODUCT, CUSTOMERS, DISCOUNT_FORM, EDIT_PRODUCT, PAGES, SHIPPING_ZONE, VIEW_DISCOUNTS, VIEW_ORDERS, VIEW_PRODUCTS, VIEW_SHIPPING, VIEW_SINGLE_ORDER } from './constants/routes.constant'
import { AppLayout } from "./layouts/app/App"
import Categories from './views/app/category'
import Customers from './views/app/customers'
import Dashboard from './views/app/Dashboard/Dashboard'
import Discounts from './views/app/discounts'
import Discount from './views/app/discounts/Discount'
import Orders from './views/app/orders'
import Order from './views/app/orders/Order'
import Pages from './views/app/pages'
import Products from "./views/app/products"
import CreateProduct from './views/app/products/CreateProduct'
import EditProduct from './views/app/products/EditProduct'
import Zones from './views/app/shipping'
import Zone from './views/app/shipping/Zone'
import Login from './views/auth/Login'


export default function Router() {

  return (
    <BrowserRouter>
    <Routes>
        <Route element={<AppLayout />}>
            <Route index element={<Dashboard/>}></Route>
            <Route path={VIEW_PRODUCTS} element={<Products/>} />
            <Route path={CREATE_PRODUCT} element={<CreateProduct/>} />
            <Route path={EDIT_PRODUCT} element={<EditProduct/>} />
            <Route path={CATEGORIES} element={<Categories/>} />
            <Route path={PAGES} element={<Pages/>} />
            <Route path={CUSTOMERS} element={<Customers/>} />
            <Route path={VIEW_ORDERS} element={<Orders/>} />
            <Route path={VIEW_SINGLE_ORDER} element={<Order/>} />
            <Route path={VIEW_DISCOUNTS} element={<Discounts/>} />
            <Route path={DISCOUNT_FORM} element={<Discount/>} />
            <Route path={VIEW_SHIPPING} element={<Zones/>} />
            <Route path={SHIPPING_ZONE} element={<Zone/>} />
        </Route>
        <Route path="/login" element={<Login />}/>
    </Routes>
  </BrowserRouter>
  )
}
