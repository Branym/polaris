import { Spinner, useToast, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext } from 'react'
import { createContext } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { BASE_URL } from '../enviroments/enviroments';
import { fetchCategories } from '../services/category';
import { fetchChannels } from '../services/channels';
import { fetchAdminProfile } from '../services/customers';
import { fetchProductTypes } from '../services/product_types';

interface ContextInterface {
  user: any;
}

export const UserContext = createContext<ContextInterface | null>({user: {}});

export const UserProvider = ({children}:any) => {

  const location = useLocation()
  const [loading, setLoading] = React.useState(false)
  const [user, setUser]:any = React.useState({});
  const toast = useToast();
  const navigate = useNavigate();

  axios.defaults.baseURL = BASE_URL;

  React.useEffect(() => {
    setLoading(true);
    if(localStorage.getItem('token')){
      axios.defaults.headers.common['x-token'] = `${localStorage.getItem('token')}`;
      fetchAdminProfile().then((result:any) => {
        localStorage.setItem('user', JSON.stringify(result.user))
        console.log(result)
        if(result?.user?.role === "admin"){
          setUser(result.user)
          fetchCategories({})
          fetchProductTypes()
          fetchChannels()
          setLoading(false)
          
        }
        else{
          localStorage.removeItem('token');
          toast({
            status: "error",
            title: "You are not authorized",
            duration: 2000,
            position: "top-right"
          })
          navigate('login')
          setLoading(false)
          // window.location.href = '/login'
        }
      })
    }
    else{
      navigate('login')
      setLoading(false)
      // window.location.href = '/login'
    }
  }, [])

  return loading ? <VStack justify="center" width={"100%"} height="100vh"><Spinner/></VStack> :
    <UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>
}

export const useUser = () => useContext(UserContext)