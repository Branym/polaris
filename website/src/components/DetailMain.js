import { Row, Col, Form, Button, Accordion , Image} from "react-bootstrap"
import Editor from "./Editor"
import Link from "next/link"
import {UserContext} from './UserContext';
import {CartContext} from './CartContext';
import SelectBox from "./SelectBox"
import Stars from "./Stars"
import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faCheck, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { formatPrice } from "../services/formatPrice"
import { uploadMedia } from "../services/products";
import { useRouter } from "next/router";
import colors from  '../data/colors.json';

export default function DetailMain({ product, channel, activeVariant, channels, categories, onChange }) {
  
  const currency = channels.filter(item => item.slug === channel)[0]?.currency;
  const [size, setSize] = useState('')
  const [items, setItems] = useState(1)
  const [text, setText] = useState('')
  const [displayText, setDisplay] = useState('')
  const [error, setError] = useState(false)
  const [addon, setAddOn] = useState(-1) 
  const [stock, setStock] = useState(product.variants[activeVariant]?.stock[channel]?.inventory) 
  const {loggedIn, user, guard} = React.useContext(UserContext)
  const {showCart, cart, addToCart} = React.useContext(CartContext)


  const router = useRouter();

  useEffect(() => {
    if(addon > -1 && text === ''){
      setError(true)
    }
    else setError(false)
  }, [addon, text])

  useEffect(() => {
    setStock(product.variants[activeVariant].stock[channel].inventory)
  }, [activeVariant])

  useEffect(() => {

    setText('');
    setError(false)
    setDisplay('')

    if(product.product_type === "Scrub"){
        setSize('M,M')
    }

  }, [router])

  const changeSize = (i, opt) => {

      if(product.product_type === "Scrub"){
        if(i == 0) setSize(`${opt},${size.split(',')[1]}`)
        else setSize(`${size.split(',')[0]},${opt}`)
      }
      else{
        setSize(opt)
      }

  }

  const handleFile = (file) => {
    setError("Uploading...")    
    if(["image/png", "image/jpeg", "image/jpg"].includes(file.type) && file.size < (2 * 1024 * 1024)){
      setDisplay("Uplaoding...")
      uploadMedia(file).then(res => {
        setDisplay(file.name);
        setText(res.file.url);
      }).catch(err => {
        setDisplay('Some Error Occured. Please Try Again.')
        setError(true);
      })
    }
    else{
      alert("File must be jpg/png with maximum size of 2MB.")
    }
  }

  const add = () => {
    if(!error){
      var _item = {
        quantity: items,
        name: product.name,
        stock: Number(product.variants[activeVariant].stock[channel].inventory),
        weight: product.variants[activeVariant].weight,
        img: (product.variants[activeVariant].media[0].includes('https://') ?  product.variants[activeVariant].media[0] : ('https://polaris-cbx.s3.ap-south-1.amazonaws.com/' + product.variants[activeVariant].media[0])) + '?date=' + Date.now() ,
        price: product.variants[activeVariant].stock[channel].price,
        variant_name: product.variants[activeVariant].name,
        sku: product.variants[activeVariant].sku,
        information: {
          size: size
        }
      }
      if(addon >= 0){
  
        _item.sub_products = [{
          name: product.addons[0].name,
          price: product.addons[0].variants[addon].stock[channel].price,
          variant_name: product.addons[0].variants[addon].name,
          sku: product.addons[0].variants[addon].sku,
          information: {
            text: text
          }
        }]
        _item.price = product.variants[activeVariant].stock[channel].price + product.addons[0].variants[addon].stock[channel].price
      }
      _item.total_price = items * _item.price;
      _item.currency = currency
      addToCart(_item);
      setText('');
      showCart()
    }
  }

  return (
    <>
      <h2 className="mb-4 text-serif d-lg-block d-none">{product.name} - {product?.variants[activeVariant]?.name}</h2>
      <div className="d-lg-flex d-none flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-4">
        <ul className="list-inline mb-2 mb-sm-0">
          <li className="list-inline-item h4 fw-light mb-0">
            {formatPrice(product.variants[activeVariant]?.stock[channel]?.price, {currency: currency})}
          </li>

          {/* <li className="list-inline-item text-muted fw-light">
            <del>${product.priceBefore.toFixed(2)}</del>
          </li> */}
        </ul>
        {/* <div className="d-flex align-items-center">
          <Stars
            stars={4}
            secondColor="gray-300"
            starClass="me-1"
            className="me-2"
          />

          <span className="text-muted text-uppercase text-sm mt-1">
            {product.reviewscount} reviews
          </span>
        </div> */}
      </div>
      {/* <p className="mb-4 text-muted">{product.description.short}</p> */}
        <Row>
       {product.variants.length > 1 && <Col sm="12" lg="12" xl="12" className="detail-option mb-4">
            <h6 className="detail-option-heading">
              Color
            </h6>
            <div className="d-flex">
            {product.variants.map((variant, index) => (
              <Button
                key={index}
                as="label"
                variant="outline"
                size="sm"
                style={{background: colors.filter(color => variant.name === color.color)[0].hex}}
                className={`detail-option-color-label me-2 ${
                  activeVariant === index ? "active" : ""
                }`}
                htmlFor={index}
                onClick={() => {
                  onChange(index)
                }}
              >
                {activeVariant === index && <FontAwesomeIcon style={{color: "white"}} icon={faCheck} />}
                <Form.Control
                  className="input-invisible"
                  type="radio"
                  name="material"
                  id={index}
                />
              </Button>
            ))}
            </div>
          </Col>}
        {product.attributes?.map((attribute, index) => (
          <Col sm="12" lg="12" xl="12" key={index} className="detail-option mb-4">
            <h6 className="detail-option-heading">
              {attribute.name} <span>(required)</span>
            </h6>
            {attribute.rules.options.map((option, i) => {
            return <Button
            key={i}
            disabled={stock < 1}
            variant="outline-secondary"
            size="sm"
            className={`detail-option-btn-label me-2 ${
              (size.split(',')[index] === option) ? "active" : ""
            } ${stock < 1 && 'opacity-3'}`}
            onClick={() => {
              changeSize(index, option)
            }}
          >
            {option}
          </Button>
            })}
           
          </Col>
          ))}
         {stock > 0 ? <Col xs="12" lg="6" className="detail-option mb-5">
            <label className="detail-option-heading fw-bold">
              Items <span>(required)</span>
            </label>
            <Form.Control
              className="detail-quantity"
              name="items"
              type="number"
              value={items}
              onChange={(e) => {
                if(Number(e.target.value) > stock) setItems(Number(stock))
                else setItems(Number(e.target.value)) 
              }}
            />
            {stock < 20 && <div className="pt-3 text-success h5">
              Only {stock} left in stock.
            </div>}
          </Col>: <div className="d-flex py-4">
            <div className="py-3 px-5 border" style={{borderStyle: "dashed"}}>
                <h3 className="opacity-6">Sold Out</h3>
            </div>
            </div>}
          <Col xs="12" lg="12" className={`${stock < 1 && 'opacity-6'} detail-option mb-5`}>
          <span className="detail-option-heading fw-bold">
              Add Embroidery <span>(optional)</span>
          </span>
          <div className="mt-3 embroidery">
            <Editor value={product.addons[0]?.description} />
          </div>
          <Accordion activeKey={addon} flush>
            {product.addons.length > 0 && product.addons[0].variants.map((variant, index) => <Accordion.Item key={index} eventKey={index}>
              <Accordion.Header onClick={() => {addon === index ? setAddOn(-1) : setAddOn(index)}}>{variant.name} ({formatPrice(variant.stock[channel].price, {currency: currency})})</Accordion.Header>
              <Accordion.Body>
              <div className="position-relative">
              <Form.Control
                 type={"text"}
                 disabled={stock < 1}
                 value={variant.name.includes("Logo") ? displayText : text}
                 onChange={(e) => setText(e.target.value) }
                 placeholder={variant.name.includes("Logo") ? "Upload Image here" : "Type your text here.."}
                 id={index}
               />
               {variant.name.includes("Logo") && 
                <input type="file" style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                  opacity: 0,
                  cursor: "pointer"
                }} onChange={(e) => handleFile(e.target.files[0])} accept=".jpg, .jpeg, .png">
               </input>}
              </div>
               {(error && stock > 0) && <div className="py-3 text-danger">
                  This field is required.
               </div>}
              </Accordion.Body>
            </Accordion.Item>)}
          </Accordion>
          </Col>
        </Row>
        <ul className="list-inline mb-5">
          <li className="list-inline-item">
            <Button disabled={stock < 1} onClick={() => loggedIn ? add() : guard()} variant="dark" size="lg" className="mb-1" type="submit">
              <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
              Add to Cart
            </Button>
          </li>
          <li className="list-inline-item">
            {/* <Button variant="outline-secondary" className="mb-1" href="#">
              <FontAwesomeIcon icon={faHeart} className="me-2" />
              Add to wishlist
            </Button> */}
          </li>
        </ul>

        <ul className="list-unstyled">
          <li>
            <strong>Category:&nbsp;</strong>
            <a className="text-muted" href="#">
              {categories.filter(item => item.slug === product.category)[0]?.title}
            </a>
          </li>
          {/* <li>
            <strong>Tags:&nbsp;</strong>
            {product.tags.map((tag, index) => (
              <React.Fragment key={tag.name}>
                <Link href={tag.link}>
                  <a className="text-muted">{tag.name}</a>
                </Link>
                {index < product.tags.length - 1 ? ",\u00A0" : ""}
              </React.Fragment>
            ))}
          </li> */}
        </ul>
    </>
  )
}
