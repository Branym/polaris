import {RadioGroup, Stack } from '@chakra-ui/react';
import React from 'react'

export default function RadioInput({ value, onChange, children, direction="column", spacing=4, ...props }: any) {
  return (
    <RadioGroup value={value} onChange={onChange} {...props}>
      <Stack direction={direction} spacing={spacing}>
          {children}
      </Stack>
    </RadioGroup>
  )
}
