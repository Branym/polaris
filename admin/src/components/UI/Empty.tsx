import { Box, Button, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { FieldGroup } from '../Form Layouts/FieldGroup'

export default function Empty({action, text, title}: any) {
  return (
    <VStack justify={"center"} pos="relative" width={"100%"} height="600px">
        <Image src="https://dashboard.chec.io/img/confetti.svg" pos="absolute" top="0" left={0} height="100%" width={"100%"} objectFit="cover"></Image>
        <FieldGroup title={title} minW={"550px"} maxW="600px" zIndex={1}>
                <Text>
                    {text}
                </Text>
                {action}
               
        </FieldGroup>   
    </VStack>
  )
}
