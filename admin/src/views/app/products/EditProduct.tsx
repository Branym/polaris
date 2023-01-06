import { Box, Button, ButtonGroup, Heading, HStack, IconButton, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ProductForm } from '../../../components/Product Form/ProductForm'
import {editProduct as edit, viewProduct} from '../../../services/products';

export default function EditProduct() {

  const [data, setData] = useState({})
  const [disable, setDisable] = useState(true)
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false)
  const [showErrors, setErrors] = useState(false)
  const [validity, setValidity] = useState(false)

  const [product, setProduct]:any = useState({})

  const toast = useToast();
  let navigate = useNavigate();
  const {id} = useParams()

    useEffect(() => {
        setFetching(true);
        viewProduct(`${id}`).then((res:any) => {
            setProduct(res.product);
            setData(res.product);
            setFetching(false)
        }).catch(err => {
            navigate('/notfound')
        })
    }, [])

  const handleChange = (payload: any, valid: any, save: boolean) => {
      console.log(payload);
      if(product === payload || product === data){
            setDisable(true);
      }
      else{
          setDisable(false)
      }
      setData(payload);
      setValidity(valid);
  }

  const editProduct = (payload:any, notify=true) => {
      console.log(payload);
      setErrors(!validity);
      if(validity){
        setLoading(true);
        edit(payload, `${id}`).then((result: any) => {
          if(notify) toast({
            title: result.message,
            status: 'success',
            position: "top-right",
            isClosable: true,
            duration: 5000
          })
          setLoading(false);
        }).catch(err => {
          if(notify) toast({
            title: err.message,
            status: "error",
            position: "top-right",
            isClosable: true,
            duration: 5000
          })
          setLoading(false);
        })
      } 
      else if(notify) toast({
        title: "Please fill the required fields.",
        status: 'error',
        position: "top-right",
        isClosable: true,
        duration: 5000
      })
  }

  return (
    <Box as="section" py="12">
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <HStack align={"center"} justify="space-between" mb="10">
          <HStack>
            <Link to="/products"><IconButton aria-label="back-to-products" variant={"ghost"} icon={<FaArrowLeft/>}></IconButton></Link>
            <Heading size="lg" >
              {product.name}
            </Heading>
          </HStack>
          <ButtonGroup>
            <Button isDisabled={disable} isLoading={loading} loadingText='Updating...' onClick={(e)=> {editProduct(data, true)}} colorScheme={"blue"}>Update</Button>
            <Link to={"/products"}><Button variant={"outline"} colorScheme={"gray"}>Discard</Button></Link>
          </ButtonGroup>
        </HStack>
       {!fetching && <ProductForm product={product} onSave={() => {}} showErrors={showErrors} onChange={handleChange}/>}
      </Box>
    </Box>
  )
}
