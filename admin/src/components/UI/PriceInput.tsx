import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react'

export default function PriceInput({ field, form, ...props }: any) {
  return (
    <InputGroup width={"auto"}>
        <InputLeftElement color="gray.300" fontWeight={"700"} mx={3}>{props.currency}</InputLeftElement>
        <Input type="number" pl={14} {...field} {...props} />
    </InputGroup>
  )
}
