import {
    Button,
    chakra,
    FormControl,
    FormLabel,
    HTMLChakraProps,
    Input,
    Stack,
    useToast,
  } from '@chakra-ui/react'
  import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';
import { PasswordField } from '../UI/PasswordField'
  
  export const LoginForm = (props: HTMLChakraProps<'form'>) => { 
    
    const [loading, setLoading] = React.useState(false);
    const toast = useToast();

    const navigate = useNavigate()

    return(
    <chakra.form
        width="100%"
      onSubmit={(e:any) => {
        setLoading(true);
        e.preventDefault()
        const formData = new FormData(e.target);
        const {email, password}: any = Object.fromEntries(formData);
        
        login(email, password).then((result: any) => {
            localStorage.setItem('token', result.token)
            navigate('/')
        }).catch(err => {
            console.log(err)
            toast({
                title: err.message,
                status: "error",
                position: "top-right",
                isClosable: true,
                duration: 5000
              })
            setLoading(false);
        })
        

        // your login logic hereß
      }}
      {...props}
    >
      <Stack spacing="6" width={"100%"}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input name="email" type="email" autoComplete="email" required />
        </FormControl>
        <PasswordField />
        <Button isLoading={loading} loadingText="Signing..." type="submit" colorScheme="blue" size="lg" fontSize="md">
          Sign in
        </Button>
      </Stack>
    </chakra.form>
  )}
  