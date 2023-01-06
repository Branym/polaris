import { Box, Img, Stack } from '@chakra-ui/react'
import * as React from 'react'
import { AWS_URL } from '../../enviroments/enviroments'

interface ProductProps {
    image: string
    name: string
    product_type: string
}

export default (props: ProductProps) => {
  const { image, name, product_type } = props
  return (
    <Stack direction="row" spacing="4" align="center">
      <Box flexShrink={0} h="10" w="10">
        <Img
          objectFit="cover"
          htmlWidth="160px"
          htmlHeight="160px"
          w="10"
          h="10"
          rounded="lg"
          src={image.includes('https://') ? image : (AWS_URL + image)}
          alt=""
        />
      </Box>
      <Box>
        <Box fontSize="sm" fontWeight="medium">
          {name}
        </Box>
        <Box fontSize="sm" color="gray.500">
          {product_type}
        </Box>
      </Box>
    </Stack>
  )
}
