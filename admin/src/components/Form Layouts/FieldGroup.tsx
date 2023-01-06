import {  Heading, VStack, StackProps, useColorModeValue as mode, HStack } from '@chakra-ui/react'
import * as React from 'react'

interface FieldGroupProps extends StackProps {
  title?: any,
  action?: any
}

export const FieldGroup = (props: FieldGroupProps) => {
  const { title,action, children, px=8, py=10, ...flexProps } = props
  return (
    <VStack align={"start"} bg={mode('white', 'gray.800')} direction={{ base: 'column', md: 'row' }} rounded="lg" spacing="6" px={px} py={py} {...flexProps}>
      <HStack width="100%" minW="3xs" justify={"space-between"} align="center">
        {title && (
          <Heading as="h2" fontWeight="semibold" color={mode('gray.500', 'gray.100')} fontSize="md" flexShrink={0}>
            {title}
          </Heading>
        )}
        {action && action}
      </HStack>
      {children}
    </VStack>
  )
}
