import { Box, Button, Flex, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tag, TagCloseButton, TagLabel, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { FieldGroup } from '../Form Layouts/FieldGroup'

export default function ArrayInput({button_text = "Add",value, onChange, title = "Array Input", modal_title = "Add", boxStyle = {}, input_type = 'text', select_options=[]}:any) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [add, setAdd] = useState('');

  return (
      <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                {input_type === 'text' && <Input value={add} onChange={(e) => {setAdd(e.target.value)}} placeholder={modal_title}></Input>}
                {input_type === 'dropdown' && <Select value={add} onChange={(e) => {setAdd(e.target.value)}}>
                    <option value="">{modal_title}</option>    
                    {select_options.map((item: any) => <option value={item} key={item}>{item}</option>)}
                </Select>}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => {
                onChange(value.length > 0 ? [...value, add] : [add])
                onClose()
            }} variant='solid' colorScheme={"blue"}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    <FieldGroup title={title} action={<Button onClick={onOpen} size="sm" leftIcon={<FaPlus/>}>{button_text}</Button>}>
        <Flex wrap={"wrap"}>
            {value?.map((item: any, index: number) => (
                <Box mt={2} mr={2}>
                <Tag
                size={"lg"}
                key={index}
                borderRadius='lg'
                variant='solid'
                colorScheme='gray'
                {...boxStyle}
                >
                <TagLabel>{item}</TagLabel>
                <TagCloseButton onClick={() => {onChange(value?.filter((_item: any) => _item !== item))}} />
                </Tag>
                </Box>
            ))}
        </Flex>
    </FieldGroup>
    </>
  )
}
