import {
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { UserContext } from '../../contexts/useUser';
import { AccountSwitcherButton } from './AccountSwitcherButton'

export const AccountSwitcher = ({}: any) => {

  const user:any = React.useContext(UserContext);

  return  <Menu>
      <AccountSwitcherButton />
      <MenuList shadow="lg" py="4" color={mode('gray.600', 'gray.200')} px="3">
        <Text fontWeight="medium" mb="2">
            {user?.email}
        </Text>
        <MenuDivider />
        {/* <MenuItem rounded="md">View Profile</MenuItem>
        <MenuItem rounded="md">Edit Profile</MenuItem>
        <MenuItem rounded="md">Change Password</MenuItem> */}
        <MenuDivider />
        <MenuItem onClick = {() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user')
            window.location.reload()
        }} rounded="md">Logout</MenuItem>
      </MenuList>
    </Menu>
}
