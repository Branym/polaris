import {
    Box,
    Heading,
    HStack,
    Icon,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import * as React from 'react'
import { BiAddToQueue } from 'react-icons/bi'
  import { FiGift } from 'react-icons/fi'
import { AWS_URL } from '../../enviroments/enviroments'
import TableObjectRenderer from '../ObjectDisplay/object'
  
  export type CartProductMetaProps = {
    addons: any[]
    name: string
    description: string
    image: string
  }
  
  export const CartProductMeta = (props: CartProductMetaProps) => {
    const { addons, image, name, description } = props
    return (
      <Stack direction="row" align={"start"} spacing="5">
        <Image
          rounded="lg"
          width="72px"
          height="72px"
          fit="cover"
          src={image.includes('https://') ? image : (AWS_URL + image)}
          alt={name}
          draggable="false"
          loading="lazy"
        />
        <Box pt="1">
          <Stack spacing="0.5">
            <Heading size="sm">{name}</Heading>
            <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
              {description}
            </Text>
          </Stack>
          {addons?.length > 0 && (
            <TableObjectRenderer title="Addons" display="" fields={["name","type", "text"]} value={{
              name: "Embroidery",
              type: addons[0]?.variant_name,
              text: addons[0]?.information.text,
            }}>
                <HStack spacing="1" mt="2" color={mode('gray.600', 'gray.400')}>
                <Icon as={BiAddToQueue} boxSize="4" />
                <Link fontSize="sm" textDecoration="underline">
                  View Addon
                </Link>
              </HStack>
            </TableObjectRenderer>
          )}
        </Box>
      </Stack>
    )
  }