import { FormControl, FormLabel, Select, SelectProps } from '@chakra-ui/react'
import * as React from 'react'
import { getProductTypes } from '../../services/product_types';

export const TypeSelect = (props: SelectProps) => {

  const [array, setArray] = React.useState([]);

  React.useEffect(() => {
      const _a = getProductTypes();
      setArray(_a);
  }, [])
  
  return (
  <FormControl mb={"0px"} isRequired id="category">
    <FormLabel>Product Type</FormLabel>
    <Select {...props}>
      <option value="">Choose One</option>
      {array.map((item:any) => <option value={item.name} key={item.name}>{item.name}</option>)}
    </Select>
  </FormControl>
)}
