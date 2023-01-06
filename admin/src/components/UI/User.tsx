import { Box } from '@chakra-ui/react'
import * as React from 'react'

interface UserProps {
    name: string
    email: string
}

export default (props: UserProps) => {
  const { name, email } = props
  return (
      <Box>
        <Box fontSize="sm" fontWeight="medium">
          {name}
        </Box>
        <Box fontSize="sm" color="gray.500">
          {email}
        </Box>
      </Box>
  )
}
