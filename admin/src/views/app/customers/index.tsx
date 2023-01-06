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
  IconButton,
  useToast,
  Text
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { TableContent } from '../../../components/Table/TableContent';
import { TablePagination } from '../../../components/Table/TablePagination';
import { BsSearch } from 'react-icons/bs'
import { fetchCustomers } from '../../../services/customers';
import User from '../../../components/UI/User';
import Customer from '../../../components/Customer/Customer';




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
            <Input value={props?.query?.for_search || ""} onChange={(e) => {props.onChange({page: props.query.page, for_search: e.target.value})}} rounded="base" type="search" placeholder="Search" />
          </InputGroup>
        </FormControl>
      </HStack>
    </Stack>
  )
}

export default function Customers() {

  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState({page: 1});
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    setLoading(true);
    fetchCustomers(query).then((res:any) => {
      setCustomers(res.data.customers)
      setTotal(res.data.total);
      setLoading(false);
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getData()
  }, [query, reload])

  const columns = [
    {
      Header: 'Name',
      Cell: function UserCell(data: any) {
        return <User name={data.first_name + " " + data.last_name} email={data.email} />
      },
    },
    {
      Header: 'ID',
      accessor: 'cust_id'
    },
    {
      Header: 'Phone',
      accessor: 'customer',
      Cell: function UserCell(data: any) {
        return <Text>{data.country_code} {data.phone}</Text>
      },
    },
    {
      Header: 'Role',
      Cell: function UserCell(data: any) {
        return <Text textTransform={"uppercase"} color="gray.600" fontWeight={"800"}>{data.role}</Text>
      },
    },
    {
      Header: 'Country',
      accessor: 'country'
    },
    {
      Cell: function UserCell(data: any) {
        return <Customer user={data.user}><Button>View Details</Button></Customer>
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
                Customers
              </Heading>
              <TableActions reload={() => setReload(!reload)} query={query} onChange={(v: any) => {setQuery(v)}} />
          </HStack>
              {loading ? <VStack py={20} width={"100%"}>
                    <Spinner></Spinner>
              </VStack> : <TableContent items={customers} columns={columns} />}
              <TablePagination onNext={() => setQuery({...query, page: query.page + 1})} onPrevious={() => setQuery({...query, page: query.page - 1})} total={total} type={"item"} query={query} />
          </Box>
        </Box>
      </Box>
  )
}
