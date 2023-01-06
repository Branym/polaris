import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    useDisclosure,
    ButtonGroup,
  } from '@chakra-ui/react'
  import React from 'react';

export default (props: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
        <Box onClick={onOpen}>{props.children}</Box>
  
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {props.text}
            </ModalBody>
            <ModalFooter>
                <ButtonGroup>
                    <Box onClick={() => {onClose();}}>{props.action}</Box>
                    <Button onClick={() => {onClose();}}>Cancel</Button>
                </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }