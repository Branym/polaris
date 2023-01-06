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
  useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { TableContent } from '../../../components/Table/TableContent';
import { TablePagination } from '../../../components/Table/TablePagination';
import { BsSearch } from 'react-icons/bs'
import { RiAddFill } from 'react-icons/ri'
import Empty from '../../../components/UI/Empty';
import {  BiPencil, BiPlus, BiTrash } from 'react-icons/bi';
import PageForm from '../../../components/PageForm/PageForm';
import Confirmation from '../../../components/Form Layouts/Confirmation';
import { deletePage, fetchPages } from '../../../services/pages';




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
        <PageForm onSuccess={props.reload}>
          <Button iconSpacing="1" leftIcon={<RiAddFill fontSize="1.25em" />}>
            Add Page
          </Button>
        </PageForm>
      </ButtonGroup>
    </Stack>
  )
}

export default function Pages() {

  const [pages, setPages] = useState([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState({page: 1});
  const [empty, setEmpty] = useState(false);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);

  const getData = (callback: any) => {
    setLoading(true);
    fetchPages(query).then((res:any) => {
      setPages(res.data.pages)
      setTotal(res.data.total);
      callback(res)
      setLoading(false);
    }).catch(err => {
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
    deletePage(slug).then((result: any) => {
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
      Header: 'Title',
      accessor: 'title',
      Cell: function ActionCell(data: any) {
        return <Heading size="md">{data.title}</Heading>
      },
    },
    {
      Header: '',
      accessor: 'page',
      Cell: function ActionCell(data: any) {
        return <ButtonGroup width={"100%"} justifyContent="end">
            <PageForm edit slug={data.slug} onSuccess={() => setReload(!reload)}><IconButton variant="ghost" colorScheme="gray" aria-label='Edit' icon={<BiPencil/>} /></PageForm>
            <Confirmation action={<Button colorScheme={"red"} onClick={() => {removeItem(data.slug)}}>Delete</Button>} title="Delete Page" text={`Are you sure you want to delete this page?`} >
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
                Pages
              </Heading>
              {!empty && <TableActions reload={() => setReload(!reload)} query={query} onChange={(v: any) => {setQuery(v)}} />}
          </HStack>
            {empty ? <Empty   title="Get More Engagement" 
                              text={<span>Start communicating with customers by telling them what you are up to.</span>} 
                              action={<PageForm onSuccess={() => setReload(!reload)}><Button colorScheme={"blue"} leftIcon={<BiPlus/>}>
                                      Add Page
                              </Button></PageForm>} />: <>
              {loading ? <VStack py={20} width={"100%"}>
                    <Spinner></Spinner>
              </VStack> : <TableContent items={pages} columns={columns} />}
              <TablePagination onNext={() => setQuery({...query, page: query.page + 1})} onPrevious={() => setQuery({...query, page: query.page - 1})} total={total} type={"item"} query={query} />
            </>}
          </Box>
        </Box>
      </Box>
  )
}
