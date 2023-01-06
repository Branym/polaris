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
import { deleteZone, fetchZones } from '../../../services/shipping';




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
            <Input value={props?.query?.title || ""} onChange={(e) => {props.onChange({page: props.query.page, title: e.target.value})}} rounded="base" type="search" placeholder="Search" />
          </InputGroup>
        </FormControl>
      </HStack>
      <ButtonGroup size="sm" variant="outline">
        <Link to={"/shipping/create"}>
          <Button iconSpacing="1" leftIcon={<RiAddFill fontSize="1.25em" />}>
            Add Shipping Zone
          </Button>
        </Link>
      </ButtonGroup>
    </Stack>
  )
}

export default function Zones() {

  const [zones, setZones] = useState([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState({page: 1});
  const [empty, setEmpty] = useState(false);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);

  const getData = (callback: any) => {
    setLoading(true);
    fetchZones(query).then((res:any) => {
      setZones(res.data.zones)
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

  const removeItem = (slug: string) => {
    deleteZone(slug).then((result: any) => {
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
            <Heading size="md" textTransform={"capitalize"}>{data.title}</Heading>
        </Box>
      },
    },
    {
      Header: '',
      accessor: 'zone',
      Cell: function ActionCell(data: any) {
        return <ButtonGroup width={"100%"} justifyContent="end">
            <Link to={"/shipping/" + data.slug}><IconButton variant="ghost" colorScheme="gray" aria-label='Edit' icon={<BiPencil/>} /></Link>
            <Confirmation action={<Button colorScheme={"red"} onClick={() => {removeItem(data.slug)}}>Delete</Button>} title="Delete Zone" text={`Are you sure you want to delete this shipping zone?`} >
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
                Shipping Zones
              </Heading>
              {!empty && <TableActions reload={() => setReload(!reload)} query={query} onChange={(v: any) => {setQuery(v)}} />}
          </HStack>
            {empty ? <Empty   title="Add shipping zones for your products" 
                              text={<span>Shipping zone helps user to choose the type of shipping service according to their budget.</span>} 
                              action={<Link to={"/shipping/create"}><Button colorScheme={"blue"} leftIcon={<BiPlus/>}>
                                      Add Shipping Zone
                              </Button></Link>} />: <>
              {loading ? <VStack py={20} width={"100%"}>
                    <Spinner></Spinner>
              </VStack> : <TableContent items={zones} columns={columns} />}
              <TablePagination onNext={() => setQuery({...query, page: query.page + 1})} onPrevious={() => setQuery({...query, page: query.page - 1})} total={total} type={"zone"} query={query} />
            </>}
          </Box>
        </Box>
      </Box>
  )
}
