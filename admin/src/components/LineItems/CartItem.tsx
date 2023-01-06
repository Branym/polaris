import { Box, Checkbox, Flex, Grid, Heading, NumberInput, Select,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SelectProps, Text, useColorModeValue, HStack } from '@chakra-ui/react'
import * as React from 'react'
import { PriceTag } from './PriceTag'
import { CartProductMeta } from './CartProductMeta'

type CartItemProps = {
  isEditing?: boolean
  name: string
  quantity: number
  price: number
  currency: string
  img: string,
  sku: string,
  addons: any[],
  variant_name: string,
  sub_product: number,
  sub_products: any[],
  information: any,
  item_id: number,
  replace: boolean,
  onChange?: (item: any) => void
  onReplace?: (item: any) => void
}


const QuantitySelect = (props: SelectProps) => {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      {...props}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  )
}

export const CartItem = (props: any) => {

  const [replace, setReplace]:any = React.useState(props.replace);
  const [q, setQ]:any = React.useState(props.quantity);
  const {
    name,
    variant_name,
    information,
    sku,
    isEditing,
    quantity,
    img,
    sub_products,
    currency,
    price,
    max = 1,
    onReplace,
    onChange,
  } = props

  React.useEffect(() => {

    onReplace?.(replace)
    onChange?.(q)

  }, [replace, q])

  return (
    <Grid templateColumns={"300px 1fr"} width="100%">
      <CartProductMeta
        name={name}
        description={"Variant: " + variant_name}
        image={img}
        addons={sub_products}
      />

      {/* Desktop */}
      <Flex width="100%" height={"100%"} py={1} pr={6} justify="space-between" display={{ base: 'none', md: 'flex' }}>
        <Box>
            <Heading size="sm" mb={2}>Information</Heading>
           {Object.entries(information).map((item:any, index: number) =>  <Text key={index} textTransform={"capitalize"}>{item[0]} : {item[1]}</Text>)}    
        </Box>
        {isEditing ? <Box>
          <Heading size="sm" mb={2}>Items to Return</Heading>
          <HStack>
            <NumberInput
            size="sm"
            maxW="96px"
            value={q}
            onChange={(value) => {
              setQ(Number(value))
            }}
            min={0}
            max={max}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Heading size="md" mb={2}> / {max}</Heading>
          </HStack>
        <Checkbox isChecked={replace} onChange={(e:any) => {setReplace(e.target.checked)}} mt={3}>
              Replace Item
        </Checkbox>
        </Box> :<Box>
       
            <Heading size="sm" mb={2}>Quantity</Heading>
            <Text>{quantity}</Text>
        </Box>}
        <Box>
            <Heading size="sm" mb={2}>Total</Heading>
            <PriceTag price={price * quantity} currency={currency} />
        </Box>
      </Flex>

     
    </Grid>
  )
}