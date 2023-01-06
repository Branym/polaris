import {
    Box,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { FieldGroup } from '../../components/Form Layouts/FieldGroup'
import { LoginForm } from '../../components/LoginForm'

export default () => (
    <Box
        bg={useColorModeValue('gray.50', 'inherit')}
        minH="100vh"
        py="12"
        px={{ base: '4', lg: '8' }}
    >
        <Box maxW="md" mx="auto">
            {/* <Logo mx="auto" h="8" mb={{ base: '10', md: '20' }} /> */}
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
                Sign in to your account
            </Heading>
            <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
            </Text>
            <FieldGroup width={"100%"}>
                <LoginForm />
            </FieldGroup>
        </Box>
    </Box>
)
