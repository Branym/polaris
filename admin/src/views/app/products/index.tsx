import { Box, Button, Heading,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  VStack,
  Spinner,
  Text
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Product from '../../../components/UI/Product';
import { TableContent } from '../../../components/Table/TableContent';
import { TablePagination } from '../../../components/Table/TablePagination';
import {viewProducts} from '../../../services/products';
import { BsSearch } from 'react-icons/bs'
import { RiAddFill } from 'react-icons/ri'
import { getCategories } from '../../../services/category';
import Empty from '../../../components/UI/Empty';
import { BiPlus } from 'react-icons/bi';


export const columns = [
  {
    Header: 'Product',
    accessor: 'product',
    Cell: function ProductCell(data: any) {
      return <Product image={data.media[0]} name={data.name} product_type={data.product_type} />
    },
  },
  {
    Header: 'Category',
    Cell: function ProductCell(data: any) {
      return <Text>{getCategories().filter((item: any) => item.slug === data.category)[0]?.title}</Text>
    }
  },
  {
    Header: 'Actions',
    accessor: 'product',
    Cell: function ProductCell(data: any) {
      return <Link to={'/products/edit/' + data._id}>
        <Button variant="link" colorScheme="blue">
          Edit
        </Button>
      </Link>
    },
  },
]

const TableActions = (props: any) => {

  const categories = getCategories();

  return (
    <Stack spacing="4" direction={{ base: 'column', md: 'row' }} justify="space-between">
      <HStack>
        <FormControl minW={{ md: '320px' }} id="search">
          <InputGroup size="sm">
            <FormLabel srOnly>Filter by name</FormLabel>
            <InputLeftElement pointerEvents="none" color="gray.400">
              <BsSearch />
            </InputLeftElement>
            <Input value={props?.query?.name || ""} onChange={(e) => {props.onChange({page: props.query.page, category: props.query.category, name: e.target.value})}} rounded="base" type="search" placeholder="Filter by name..." />
          </InputGroup>
        </FormControl>
        <Select w={{ base: '300px', md: '200px' }} value={props?.query?.category || ""} onChange={(e) => {props.onChange({page: props.query.page, name: props.query.name , category: e.target.value})}} rounded="base" size="sm" placeholder="All categories">
          {categories.map((item:any) => <option value={item.slug} key={item.slug}>{item.title}</option>)}
        </Select>
      </HStack>
      <ButtonGroup size="sm" variant="outline">
        <Link to="/products/create">
          <Button iconSpacing="1" leftIcon={<RiAddFill fontSize="1.25em" />}>
            New Product
          </Button>
        </Link>
      </ButtonGroup>
    </Stack>
  )
}

export default function Products() {

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState({page: 1});
  const [empty, setEmpty] = useState(false);
  const [firstLoad, setLoad] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if(firstLoad) setLoading(true);
      viewProducts(query).then((res:any) => {
        setProducts(res.data.products)
        setTotal(res.data.total);
        if(res.data.total === 0 && firstLoad) setEmpty(true)
        setLoad(false);
        setLoading(false);
      }).catch(err => {
        console.log(err)
      })
  }, [query])
  
  return (
        // <ProductTable query={query} onQueryChange={(_q: any) => {setQuery(_q);}} total={total} items={products}/>
        <Box as="section" py="12">
        <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
          <Box overflowX="auto">
            <Heading size="lg" mb="6">
              Products
            </Heading>
            {empty ? <Empty   title="Add a Product and Get Started" 
                              text={<span>Add your product and variants manually via the dashboard. 
                                Products must have at least one image and basic details. Learn more.</span>} 
                              action={<Link to="/products/create"><Button colorScheme={"blue"} leftIcon={<BiPlus/>}>
                                      Add Product
                              </Button></Link>} />: <>
              <TableActions query={query} onChange={(v: any) => {setQuery(v)}} />
              {loading ? <VStack py={20} width={"100%"}>
                    <Spinner></Spinner>
              </VStack> : <TableContent items={products} columns={columns} />}
              <TablePagination onNext={() => setQuery({...query, page: query.page + 1})} onPrevious={() => setQuery({...query, page: query.page - 1})} total={total} type={"product"} query={query} />
            </>}
          </Box>
        </Box>
      </Box>
  )
}
