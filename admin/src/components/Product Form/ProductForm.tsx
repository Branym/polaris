import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import * as React from 'react'
import { FaPlus } from 'react-icons/fa'
import { FieldGroup } from '../Form Layouts/FieldGroup'
import { CategorySelect } from './CategorySelect'
import { TypeSelect } from './TypeSelect'
import { Variants } from './Variants'
import MediaList from '../Media Manager/MediaList'
import { deleteProduct, editProduct } from '../../services/products'
import validate from '../../services/validator'
import VariantForm from '../VariantForm/VariantForm'
import Confirmation from '../Form Layouts/Confirmation'
import { useNavigate, useParams } from 'react-router-dom'
import Editor from '../EditorJS/EditorJS'
import ArrayInput from '../ArrayInput/ArrayInput'


let schema = [
  {
    name: "name",
    type: "text",
    required: true,
    rules: {
      min: 1,
      max: 50
    }
  },
  {
    name: "slug",
    type: "pattern",
    required: true,
    rules: {
      pattern: `^[a-zA-Z0-9-]+$`,
      message: "Slug must no contain any special characters (instead of hyphens) or spaces."
    }
  },
  {
    name: "description",
    type: "object",
    required: true,
  },
  {
    name: "category",
    type: "text",
    required: true,
  },
  {
    name: "product_type",
    type: "text",
    required: true,
  },
  {
    name: "media",
    type: "list",
    required: true,
    rules: {
      min: 1
    }
  },

]

let edit_schema = [
  {
    name: "name",
    type: "text",
    required: true,
    rules: {
      min: 1,
      max: 50
    }
  },
  {
    name: "slug",
    type: "pattern",
    required: true,
    rules: {
      pattern: `^[a-zA-Z0-9-]+$`,
      message: "Slug must no contain any special characters (instead of hyphens) or spaces."
    }
  },
  {
    name: "description",
    required: true,
    type: "object",
  },
  {
    name: "category",
    required: true,
    type: "text",
  },
  {
    name: "media",
    required: true,
    type: "list",
    rules: {
      min: 1
    },
  },
  {
    name: "variants",
    type: "list"
  }
]

export const ProductForm = (props: any) => {

  var product = props.product;


  const [name, setName] = React.useState(product?.name || "");
  const [slug, setSlug] = React.useState(product?.slug || "");
  const [description, setDesc] = React.useState(product?.description === '' ? {blocks: [{type: "paragraph", data: {text: "Start writing here..."}}]} : product?.description);
  const [category, setCategory] = React.useState(product?.category || "");
  const [type, setType] = React.useState(product?.product_type || "");
  const [media, setMedia]:any = React.useState(product?.media || []);
  const [tags, setTags]:any = React.useState(product?.tags || []);
  const [errors, setErrors] :any = React.useState({});
  const [variants, setVariants] = React.useState(product?.variants)
  
  const toast = useToast();
  let navigate = useNavigate();
  const {id} = useParams()

  React.useEffect(() => {

    const data = {
      name,
      slug,
      description,
      category,
      product_type: type,
      media,
      tags,
      variants
    }

    validate(props.create ? schema : edit_schema, data).then(result => {
      props.onChange(data, result.valid, false)
      if(result?.valid === false){
        setErrors(result.errors)
      }
    });

  }, [name, slug, description, category,tags, media, type, variants])

 
  const onSave = (data: any) => {
    editProduct({variants: data}, `${id}`)
  }

  const addVariant = (data: any) => {
      if(variants.length){
        setVariants([...variants, data])
        editProduct({variants: [...variants, data]}, `${id}`)
      }
      else{
        setVariants([data])
        editProduct({variants: [data]}, `${id}`)
      }
  }

  const removeProduct = () => {
      deleteProduct(`${id}`).then((result: any) => {
        navigate('/products')
        toast({
          title: result.message,
          status: 'success',
          position: "top-right",
          isClosable: true,
          duration: 5000
        })
      })
      
  }
  
  return(
      <Grid columnGap={8} templateColumns={{lg: "1fr 1fr", xl: "1fr 420px"}}>
      <Stack spacing="4">
        <FieldGroup title="Product Info">
          <VStack width="full" spacing="6">
            <FormControl isInvalid={errors?.name && props.showErrors} isRequired id="name">
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => {setName(e.target.value)}} type="text" maxLength={255} />
              {props.showErrors && <FormErrorMessage textTransform={"capitalize"}>{errors?.name?.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={errors?.slug && props.showErrors} isRequired id="slug">
              <FormLabel>Slug</FormLabel>
              <Input value={slug} onChange={(e) => {setSlug(e.target.value)}} type="text" />
              {props.showErrors && <FormErrorMessage textTransform={"capitalize"}>{errors?.slug?.message}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errors?.description && props.showErrors} isRequired id="description">
              <FormLabel>Description</FormLabel>
              <Editor value={description} onChange={(v:any) => {setDesc(v)}} />
              {!props.showErrors ? <FormHelperText>
                Controlled by EditorJS. See how to write description here.
              </FormHelperText> :
              <FormErrorMessage textTransform={"capitalize"}>{errors?.description?.message}</FormErrorMessage>}
            </FormControl>
          </VStack>
        </FieldGroup>
       
        <MediaList canSelect={!props.create} media={media} onChange={(m:any) => {setMedia(m)}} error={(props.showErrors && media.length < 1) ? "Atleast one image is required." : false} />
          
        {!props.create && <FieldGroup title="Variants" action={
          <VariantForm onAdd={(data:any) => {addVariant(data);}}><Button size="xs" variant={"outline"} leftIcon={<FaPlus/>}>Add Variant</Button></VariantForm>
        }>
          <Stack direction="row" spacing="6" align="center" width="full">
              <Variants onChange={(v:any) => {setVariants(v); onSave(v)}} variants={variants}/>
          </Stack>
        </FieldGroup>}
        
        {/* <FieldGroup title="Notifications">
          <Stack width="full" spacing="4">
            <Checkbox>Get updates about the latest meetups.</Checkbox>
            <Checkbox>Get notifications about your account activities</Checkbox>
          </Stack>
        </FieldGroup>
        <FieldGroup title="Connect accounts">
          <HStack width="full">
            <Button variant="outline" leftIcon={<FaGithub />}>
              Connect Github
            </Button>
            <Button variant="outline" leftIcon={<Box as={FaGoogle} color="red.400" />}>
              Connect Google
            </Button>
          </HStack>
        </FieldGroup> */}
      </Stack>
      <Stack spacing="4" >
        <FieldGroup title="Organization">
          <VStack align={"start"} width="full" spacing="6">
            <CategorySelect value={category} onChange={(e) => {setCategory(e.target.value)}} />
            {(props.showErrors && errors.category) && <Text color="red.500" textTransform={"capitalize"} style={{marginTop: "6px"}}>{errors?.category?.message}</Text>}
            {props.create && <TypeSelect value={type} onChange={(e) => {setType(e.target.value)}} />}
            {(props.showErrors && errors.product_type ) && <Text color="red.500" textTransform={"capitalize"} style={{marginTop: "6px"}}>{errors?.product_type?.message.replace(/_/g, ' ')}</Text>}
          </VStack>
        </FieldGroup>
        <ArrayInput 
            modal_title="Add Tag" 
            onChange={(_v:any) => {setTags(_v)}} 
            value={tags}
            title="Tags"
            button_text="Add Tag"
            input_type="text"
        />
        {!props.create &&<FieldGroup title="Danger Zone">
          <VStack align={"start"} width="full" spacing="6">
            <Text color="gray.600">After you delete this product, it will be gone from all your channels.</Text>
            <Confirmation title="Delete Product" text="This action is irreversible."  action={ <Button onClick={() => {removeProduct()}} colorScheme={"red"}>Delete </Button>}>
              <Button colorScheme={"red"}>Delete Product</Button>
            </Confirmation>
          </VStack>
        </FieldGroup>}
      
      </Stack>
      </Grid>
)}
