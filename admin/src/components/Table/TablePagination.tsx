import { Button, ButtonGroup, Flex, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'

export const TablePagination = ({type, limit=10, ...props}:any) => {
  return (
    <Flex align="center" justify="space-between">
      <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
        {props.total} {type}{props.total > 1 ? "s" : ""}
      </Text>
      <ButtonGroup variant="outline" size="sm">
        <Button onClick={props.onPrevious} isDisabled={props?.query?.page === 1} as="a" rel="prev">
          Previous 
        </Button>
        <Button onClick={props.onNext} isDisabled={props?.query?.page === Math.floor((props.total + limit)/limit)} as="a" rel="next">
          Next 
        </Button>
      </ButtonGroup>
    </Flex>
  )
}
