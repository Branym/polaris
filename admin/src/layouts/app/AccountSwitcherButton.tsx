import { Box, Flex, HStack,  useMenuButton } from '@chakra-ui/react'
import * as React from 'react'
import { HiSelector } from 'react-icons/hi'
import { UserContext } from '../../contexts/useUser'

export const AccountSwitcherButton = ({props}: any) => {

  const buttonProps = useMenuButton(props)
  const user:any = React.useContext(UserContext);

  return (
    <Flex
      as="button"
      {...buttonProps}
      w="full"
      display="flex"
      alignItems="center"
      rounded="lg"
      bg="gray.700"
      px="3"
      py="2"
      fontSize="sm"
      userSelect="none"
      cursor="pointer"
      outline="0"
      transition="all 0.2s"
      _active={{ bg: 'gray.600' }}
      _focus={{ shadow: 'outline' }}
    >
      <HStack flex="1" spacing="3">
        <Box textAlign="start">
          <Box fontWeight="semibold">
            {user?.first_name} {user?.last_name}
          </Box>
          <Box textTransform={"capitalize"} fontSize="xs" color="gray.400">
          {user?.role}
          </Box>
        </Box>
      </HStack>
      <Box fontSize="lg" color="gray.400">
        <HiSelector />
      </Box>
    </Flex>
  )
}
