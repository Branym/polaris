import { Box, Button, Heading,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  VStack,
  Spinner,
  IconButton,
  useToast,
  Text
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { TableContent } from '../../../components/Table/TableContent';
import { TablePagination } from '../../../components/Table/TablePagination';
import { BsSearch } from 'react-icons/bs'
import { RiAddFill } from 'react-icons/ri'
import Empty from '../../../components/UI/Empty';
import {  BiPencil, BiPlus, BiTrash } from 'react-icons/bi';
import Confirmation from '../../../components/Form Layouts/Confirmation';
import { deleteDiscount, fetchDiscounts } from '../../../services/discounts';




const TableActions = (props: any) => {


  return (
    <Stack spacing="2" direction={{ base: 'column', md: 'row' }} justify="end">
      <HStack>
        <FormControl minW={{ md: '160px' }} id="search">
          <InputGroup size="sm">
            <FormLabel srOnly>Search</FormLabel>
            <InputLeftElement pointerEvents="none" color="gray.400">
              <BsSearch />
            </InputLeftElement>
            <Input value={props?.query?.code || ""} onChange={(e) => {props.onChange({page: props.query.page, code: e.target.value})}} rounded="base" type="search" placeholder="Search" />
          </InputGroup>
        </FormControl>
      </HStack>
      <ButtonGroup size="sm" variant="outline">
        <Link to={"/discount/create"}>
          <Button iconSpacing="1" leftIcon={<RiAddFill fontSize="1.25em" />}>
            Add Discount
          </Button>
        </Link>
      </ButtonGroup>
    </Stack>
  )
}

export default function Discounts() {

  const [discounts, setDiscounts] = useState([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState({page: 1});
  const [empty, setEmpty] = useState(false);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);

  const getData = (callback: any) => {
    setLoading(true);
    fetchDiscounts(query).then((res:any) => {
      setDiscounts(res.data.discounts)
      setTotal(res.data.total);
      callback(res)
      setLoading(false);
    }).catch((err: any) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getData((res: any) => {if(res.data.total === 0) setEmpty(true)})
  }, [])

  useEffect(() => {
    getData((res: any) => {if(res.data.total > 0) setEmpty(false)})
  }, [query, reload])

  const toast = useToast()

  const removeItem = (code: string) => {
    deleteDiscount(code).then((result: any) => {
      toast({
        title: result.message,
        status: 'success',
        position: "top-right",
        isClosable: true,
        duration: 5000
      })
      setReload(!reload);
    })
  }

  const columns = [
    {
      Header: 'Code',
      Cell: function ActionCell(data: any) {
        return <Box>
            <Heading size="md" textTransform={"capitalize"}>{data.code}</Heading>
            <Text>{data.title}</Text>
        </Box>
      },
    },
    {
      Header: '',
      accessor: 'page',
      Cell: function ActionCell(data: any) {
        return <ButtonGroup width={"100%"} justifyContent="end">
            <Link to={"/discount/" + data.code}><IconButton variant="ghost" colorScheme="gray" aria-label='Edit' icon={<BiPencil/>} /></Link>
            <Confirmation action={<Button colorScheme={"red"} onClick={() => {removeItem(data.code)}}>Delete</Button>} title="Delete Coupon" text={`Are you sure you want to delete this coupon?`} >
                <IconButton variant="ghost" colorScheme="red" aria-label='Delete' icon={<BiTrash/>} />
            </Confirmation>
        </ButtonGroup>
      },
    },
  ]
  
  return (
        // <ProductTable query={query} onQueryChange={(_q: any) => {setQuery(_q);}} total={total} items={products}/>
        <Box as="section" py="12">
        <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
          <Box overflowX="auto">
           <HStack justify={"space-between"}>
            <Heading size="lg" mb="6">
                Discounts
              </Heading>
              {!empty && <TableActions reload={() => setReload(!reload)} query={query} onChange={(v: any) => {setQuery(v)}} />}
          </HStack>
            {empty ? <Empty   title="Add a discount code and run a promotion." 
                              text={<span>Add $ or % based discount codes, their quantity, start and end dates.</span>} 
                              action={<Link to={"/discount/create"}><Button colorScheme={"blue"} leftIcon={<BiPlus/>}>
                                      Add Discount
                              </Button></Link>} />: <>
              {loading ? <VStack py={20} width={"100%"}>
                    <Spinner></Spinner>
              </VStack> : <TableContent items={discounts} columns={columns} />}
              <TablePagination onNext={() => setQuery({...query, page: query.page + 1})} onPrevious={() => setQuery({...query, page: query.page - 1})} total={total} type={"item"} query={query} />
            </>}
          </Box>
        </Box>
      </Box>
  )
}
