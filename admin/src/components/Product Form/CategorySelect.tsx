import { FormControl, FormLabel, Select, SelectProps } from '@chakra-ui/react'
import * as React from 'react'
import { getCategories } from '../../services/category';

export const CategorySelect = (props: SelectProps) => {

  const [array, setArray] = React.useState([]);

  React.useEffect(() => {
      const _a = getCategories();
      setArray(_a);
  }, [])
  
  return (
  <FormControl mb={"0px"} isRequired id="category">
    <FormLabel>Category</FormLabel>
    <Select {...props}>
    <option value="">Choose One</option>
      {array.map((item:any) => <option value={item.slug} key={item.slug}>{item.title}</option>)}
    </Select>
  </FormControl>
)}
