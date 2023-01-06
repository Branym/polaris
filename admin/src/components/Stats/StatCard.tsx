import {
    Box,
    Heading,
    HStack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import * as React from 'react'
  
  export interface StatCardProps {
      label: any
      value: any
  }
  
  function format(value: number) {
    return new Intl.NumberFormat('en-US', { style: 'decimal', currency: 'USD' }).format(value)
  }
  
  export const StatCard = (props: StatCardProps) => {
    const { label , value } = props
  
    return (
      <Box bg={mode('white', 'gray.700')} px="6" py="4" shadow="base" rounded="lg">
        <HStack>
          <Text fontWeight="medium" color={mode('gray.500', 'gray.400')}>
            {label}
          </Text>
        </HStack>
  
        <Heading as="h4" size="lg" my="3" fontWeight="extrabold">
          {value}
        </Heading>
      </Box>
    )
  }
  