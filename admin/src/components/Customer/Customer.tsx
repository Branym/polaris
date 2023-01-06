import { Box, Modal, ModalBody, ModalCloseButton, ModalContent,  ModalHeader, ModalOverlay, SimpleGrid, Spinner,  Text,  useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { FieldGroup } from '../Form Layouts/FieldGroup';

import { fetchProfile } from '../../services/customers';

export default (props: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [fetching, setFetching] = useState(true);
    const [user, setUser]:any = useState({});

    useEffect(() => {
        setFetching(true);
        fetchProfile(props.user).then((result: any) => {
            setUser(result.customer.data)
            setFetching(false);
        })

    }, [])

    return (
        <>
            <Box onClick={onOpen}>
                {props.children}
            </Box>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="3xl"
            >
                <ModalOverlay />
                <ModalContent>
                    {fetching ? <VStack w="100%" py={24}><Spinner /></VStack> : <>
                        <ModalHeader>{user.first_name} {user.last_name} </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <SimpleGrid columns={2}>
                                <FieldGroup px={0} py={8} title="Email Address">
                                    <Text fontWeight={"700"}>{user.email}</Text>
                                </FieldGroup>
                                <FieldGroup title="Phone" px={0} py={8}>
                                    <Text fontWeight={"700"}>{user.country_code} {user.phone}</Text>
                                </FieldGroup>
                                <FieldGroup px={0} py={8} title="Billing Address">
                                    <Text fontWeight={"700"}>
                                        {user.address_line_1} <br/>
                                        {user.address_line_2} {user.address_line_2 && <br/>}
                                        {user.city}, {user.state}, {user.country} <br/>
                                        {user.pincode}
                                    </Text>
                                </FieldGroup>
                                {user.shipping && <FieldGroup px={0} py={8} title="Shipping Address">
                                    <Text fontWeight={"700"}>
                                        {user.shipping?.address_line_1} <br/>
                                        {user.shipping?.address_line_2} {user.shipping?.address_line_2 && <br/>}
                                        {user.shipping?.city}, {user.shipping?.state}, {user.shipping?.country} <br/>
                                        {user.shipping?.pincode}
                                    </Text>
                                </FieldGroup>}
                            </SimpleGrid>
                        </ModalBody>
                    </>}
                </ModalContent>
            </Modal>
        </>
    )
}
