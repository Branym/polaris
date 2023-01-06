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
  useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { TableContent } from '../../../components/Table/TableContent';
import { TablePagination } from '../../../components/Table/TablePagination';
import { BsSearch } from 'react-icons/bs'
import { RiAddFill } from 'react-icons/ri'
import { deleteCategory, fetchCategories, getCategories } from '../../../services/category';
import Empty from '../../../components/UI/Empty';
import {  BiPencil, BiPlus, BiTrash } from 'react-icons/bi';
import CategoryForm from '../../../components/CategoryForm/CategoryForm';
import Confirmation from '../../../components/Form Layouts/Confirmation';




const TableActions = (props: any) => {

  const categories = getCategories();

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
        <CategoryForm onSuccess={props.reload}>
          <Button iconSpacing="1" leftIcon={<RiAddFill fontSize="1.25em" />}>
            Add Category
          </Button>
        </CategoryForm>
      </ButtonGroup>
    </Stack>
  )
}

export default function Categories() {

  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState({page: 1});
  const [empty, setEmpty] = useState(false);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);

  const getData = (callback: any) => {
    setLoading(true);
    fetchCategories(query).then((res:any) => {
      setCategories(res.data.categories)
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
    deleteCategory(slug).then((result: any) => {
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
      accessor: 'category',
      Cell: function ActionCell(data: any) {
        return <ButtonGroup width={"100%"} justifyContent="end">
            <CategoryForm edit slug={data.slug} onSuccess={() => setReload(!reload)} category={data}><IconButton variant="ghost" colorScheme="gray" aria-label='Edit' icon={<BiPencil/>} /></CategoryForm>
            <Confirmation action={<Button colorScheme={"red"} onClick={() => {removeItem(data.slug)}}>Delete</Button>} title="Delete Category" text={`Products associated to this ${data.title} will remain untouched. Are you sure you want to delete this category.`} >
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
                Categories
              </Heading>
              {!empty && <TableActions reload={() => setReload(!reload)} query={query} onChange={(v: any) => {setQuery(v)}} />}
          </HStack>

            {empty ? <Empty   title="Add a Category and Get Started" 
                              text={<span>Category helps you in organizing your products.</span>} 
                              action={<CategoryForm onSuccess={() => setReload(!reload)}><Button colorScheme={"blue"} leftIcon={<BiPlus/>}>
                                      Add Category
                              </Button></CategoryForm>} />: <>
              {loading ? <VStack py={20} width={"100%"}>
                    <Spinner></Spinner>
              </VStack> : <TableContent items={categories} columns={columns} />}
              <TablePagination onNext={() => setQuery({...query, page: query.page + 1})} onPrevious={() => setQuery({...query, page: query.page - 1})}  total={total} type={"item"} query={query} />
            </>}
          </Box>
        </Box>
      </Box>
  )
}
