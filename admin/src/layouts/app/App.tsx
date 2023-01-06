import { Box, Circle, Flex, Spinner, Stack, useColorModeValue as mode, VStack } from '@chakra-ui/react'
import * as React from 'react'
import {
  BiBuoy,
  BiHome,
} from 'react-icons/bi'
import { Link, Outlet, useLocation} from 'react-router-dom'
import { nav } from '../../config/nav'
import { AccountSwitcher } from './AccountSwitcher'
import { NavItem } from './NavItem'
import { UserProvider } from '../../contexts/useUser'

export const AppLayout = (props: any) => {

  const location = useLocation()
  
  return  <UserProvider>
    <Box height="100vh" overflow="hidden" position="relative">
      <Flex h="full" id="app-container">
        <Box w="64" bg="gray.900" color="white" fontSize="sm">
          <Flex h="full" direction="column" py="4">
            <Box px={4}>
              <AccountSwitcher />
            </Box>
            <Stack spacing="2" flex="1" overflow="auto" pt="8">
              <Stack mb={6} spacing="1">
                <Link to={"/"}><NavItem active={location.pathname === '/'} icon={<BiHome />} label="Dashboard" /></Link>
              </Stack>
              {nav.map((menu, index) =>  <Link key={index} to={menu.link}><NavItem active={location.pathname.includes(menu.key)}  icon={<menu.icon />} label={menu.name} /></Link>)}
            </Stack>
            <Box>
              <Stack as={"a"} href="https://help.codbrix.com" target="_blank" spacing="1">
                {/* <NavItem subtle icon={<BiCog />} label="Settings" /> */}
                <NavItem
                  subtle
                  icon={<BiBuoy />}
                  label="Help & Support"
                  endElement={<Circle size="2" bg="blue.400" />}
                />
              </Stack>
            </Box>
          </Flex>
        </Box>
        <Box bg={mode('gray.50', 'gray.800')} overflowY="auto" flex="1" p="6">
           {<Outlet />}
        </Box>
      </Flex>
    </Box>
    </UserProvider>
}
