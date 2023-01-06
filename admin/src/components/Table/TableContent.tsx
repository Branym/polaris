import {
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode,
  VStack,
} from '@chakra-ui/react'
import * as React from 'react'

export const TableContent = ({items = [], columns= [], ...props}: any) => {
  return items.length ? (
    <Table my="8" borderWidth="1px" fontSize="sm">
      <Thead bg={mode('gray.50', 'gray.800')}>
        <Tr>
          {columns.map((column :any, index: number) => (
            <Th whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
        </Tr>
      </Thead>
       <Tbody>
        {items?.map((row:any, index: number) => (
          <Tr key={index}>
            {columns.map((column: any, index: number) => {
              const cell = row[column.accessor as keyof typeof row]
              const element = column.Cell?.(row) ?? cell
              return (
                <Td whiteSpace="nowrap" key={index}>
                  {element}
                </Td>
              )
            })}
            {/* <Td textAlign="right">
              <Link to={'/products/edit/' + row._id}><Button variant="link" colorScheme="blue">
                Edit
              </Button></Link>
            </Td> */}
          </Tr>
        ))}
      </Tbody> 
    </Table>
  ) : <VStack py={8} width={"100%"}>
          <Image src=""></Image>
          <Text>No Items to show.</Text>
  </VStack>
}
