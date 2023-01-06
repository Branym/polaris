import { Box, Button, ButtonGroup, Heading, HStack, IconButton, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ProductForm } from '../../../components/Product Form/ProductForm'
import {createProduct as create} from '../../../services/products';

export default function CreateProduct() {

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [showErrors, setErrors] = useState(false)
  const [validity, setValidity] = useState(false)

  const toast = useToast()
  let navigate = useNavigate();

  const handleChange = (payload: any, valid: any) => {
    setData(payload);
    setValidity(valid);
  }

  const createProduct = (payload:any) => {
      console.log(payload);
      setErrors(!validity);
      if(validity){
        setLoading(true);
        create(payload).then((result: any) => {
          toast({
            title: result.message,
            status: 'success',
            position: "top-right",
            isClosable: true,
            duration: 5000
          })
          setLoading(false);
          navigate('/products/edit/' + result.product._id);
        }).catch(err => {
          toast({
            title: err.message,
            status: "error",
            position: "top-right",
            isClosable: true,
            duration: 5000
          })
          setLoading(false);
        })
      } 
      else toast({
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
              Create Product
            </Heading>
          </HStack>
          <ButtonGroup>
            <Button isLoading={loading} loadingText='Loading' onClick={(e)=> {createProduct(data)}} colorScheme={"blue"}>Create</Button>
            <Link to={"/products"}><Button variant={"outline"} colorScheme={"gray"}>Discard</Button></Link>

          </ButtonGroup>
        </HStack>
        <ProductForm showErrors={showErrors} create onChange={handleChange}/>
      </Box>
    </Box>
  )
}
