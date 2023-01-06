import React, { useState, useRef, useEffect } from "react"
import { Nav } from "react-bootstrap"
import { Button, Modal} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import Icon from "./Icon"
import {useRouter} from 'next/router';
import Cart from './Cart'

const CartContext = React.createContext([{}, () => {}]);

const  CartProvider = (props) => {

  const [show, setShow] = useState(false);
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const handleClose = () => setShow(false);
  const showCart = () => {
   setShow(true);
  }

  useEffect(() => {
    setCart(localStorage?.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [])
  }, [])

  useEffect(() => {
    handleClose()
  }, [router])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    if(cart.filter(_item => JSON.stringify({..._item, quantity : 0}) === JSON.stringify({...item, quantity : 0})).length > 0){
        setCart(cart.map((_item, index) => {
          if(JSON.stringify({..._item, quantity : 0}) === JSON.stringify({...item, quantity : 0})){
            _item.quantity += item.quantity
          }
          return _item
        }))
    }
    else{
      setCart([...cart,item])
    }
   }

   const removeItem = (item) => {
    setCart(cart.filter(_item => JSON.stringify({..._item, quantity : 0}) !== JSON.stringify({...item, quantity : 0})))
   }

   const clearCart = () => {
     setCart([]);
   }

  return (
    <>
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      centered
    >
      <button
        className="close modal-close"
        type="button"
        onClick={handleClose}
        aria-label="Close"
      >
        <Icon
          icon="close-1"
          className="w-100 h-100 svg-icon-light align-middle"
        />
      </button>
      <Modal.Body className="p-0">
            <Cart onIncDec={(item, index) => {
                  setCart(cart.map((_item, i) => index === i ? item : _item))
            }} onRemove={item => removeItem(item)} items={cart}/>
      </Modal.Body>
      <Modal.Footer>
          <div className="my-2 d-flex justify-content-between w-100 flex-column flex-lg-row">
              <Button onClick={handleClose} variant="link" className="text-muted">
                <FontAwesomeIcon icon={faChevronLeft} /> Continue Shopping
              </Button>
              <Link href={'/' + router.query.channel + "/checkout-1"}>
                <Button variant="dark">
                  Proceed to checkout <FontAwesomeIcon icon={faChevronRight} />
                </Button>
              </Link>
            </div>
      </Modal.Footer>
    </Modal>
    <CartContext.Provider value={{cart, addToCart, clearCart, removeItem, setCart, showCart}}>
      {props.children}
    </CartContext.Provider>
    </>
  )
}

export { CartContext, CartProvider };
