import { Box, Button, Heading,
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
import { TableContent } from '../../../components/Table/TableContent';
import { TablePagination } from '../../../components/Table/TablePagination';
import { BsSearch } from 'react-icons/bs'
import User from '../../../components/UI/User';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../../../services/orders';
import { getChannels } from '../../../services/channels';
import { STATUS_COLORS } from '../../../constants/app.constant';
import { formatPrice } from '../../../components/LineItems/PriceTag';




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
            <Input value={props?.query?.id || ""} onChange={(e) => {
              props.onChange({...props.query, id: e.target.value})
              }} rounded="base" type="search" placeholder="Search" />
          </InputGroup>
     
        </FormControl>
        <FormControl>
        <FormLabel srOnly>Status</FormLabel>
          <Select value={props?.query?.status || ""} onChange={(e) => {
              props.onChange({...props.query, status: e.target.value})
              }}  size="sm">
                <option value="">All</option>
            {Object.entries(STATUS_COLORS).map((item:any) => <option key={item[0]} value={item[0]}>{item[0]}</option>)}
          </Select>
        </FormControl>
        <FormControl>
        <FormLabel srOnly>Channel</FormLabel>
          <Select value={props?.query?.channel || ""} onChange={(e) => {
              props.onChange({...props.query, channel: e.target.value})
              }} size="sm">
            {props?.channels?.map((item:any) => <option key={item.slug} value={item.slug}>{item.name} ({item.currency})</option>)}
          </Select>
        </FormControl>
      </HStack>
    </Stack>
  )
}

export default function Orders() {
  const [channels, setChannels] = useState(getChannels())
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState({page: 1, channel: "IND"});
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    setLoading(true);
    fetchOrders(query).then((res:any) => {
      setOrders(res.data.orders)
      setTotal(res.data.total);
      setLoading(false);
    }).catch(err => {
      console.log(err)
      setLoading(false);
    })
  }

  useEffect(() => {
    getData()
  }, [query, reload])

  const columns = [
    {
      Header: 'ID',
      Cell: function UserCell(data: any) {
        return <Text textTransform={"uppercase"} color="gray.600" fontWeight={"800"}>{data.id}</Text>
      },
    },
    {
      Header: 'Date',
      accessor: 'created_on'
    },
    {
      Header: 'Status',
      accessor: 'order',
      Cell: function UserCell(data: any) {
        return <Text textTransform={"uppercase"} color={STATUS_COLORS[data.status]} fontWeight={"800"}>{data.status}</Text>
      },
    },
    {
      Header: 'Total Items',
      accessor: 'total_items'
    },
    {
      Header: 'Customer',
      Cell: function UserCell(data: any) {
        return <User name={data.customer.name} email={data.customer.email} />
      },
    },
    {
      Header: 'Total',
      Cell: function UserCell(data: any) {
        return <User name={formatPrice(data.total, {currency: channels?.filter((item: any) => item.slug === query.channel)[0].currency})} email={data.payment_status} />
      },
    },
    {
      Cell: function UserCell(data: any) {
        return <Link to={"/order/" + data.id}><Button>View Details</Button></Link>
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
                Orders
              </Heading>
              <TableActions channels={channels} reload={() => setReload(!reload)} query={query} onChange={(v: any) => {setQuery(v)}} />
          </HStack>
              {loading ? <VStack py={20} width={"100%"}>
                    <Spinner></Spinner>
              </VStack> : <TableContent items={orders} columns={columns} />}
              <TablePagination onNext={() => setQuery({...query, page: query.page + 1})} onPrevious={() => setQuery({...query, page: query.page - 1})} total={total} type={"item"} query={query} />
          </Box>
        </Box>
      </Box>
  )
}
