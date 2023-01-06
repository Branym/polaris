import {
  HStack,
  IconButton,
  Table,
  Tbody,
  Td,
  Tr,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import VariantForm from '../VariantForm/VariantForm'
import { columns, data } from './_data'

export const Variants = (props: any) => {

  // const moveUp = (index: number) => {
  //     var _variants = variants
  //     const temp = _variants[index - 1];
  //     _variants[index - 1] = _variants[index];
  //     _variants[index] = temp;
  //     setVariants(_variants)
  //     props.onChange(_variants)
  // }

  return (
    <Table borderWidth="1px" fontSize="sm">
      {/* <Thead bg={mode('gray.50', 'gray.800')}>
        <Tr>
          {columns.map((column, index) => (
            <Th whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
          <Th />
        </Tr>
      </Thead> */}
      {<Tbody>
        {props.variants?.map((row:any, index: number) => (
          <Tr key={index}>
            {columns.map((column, index) => {
              const cell = row[column.accessor as keyof typeof row]
              const element = column.Cell?.(row) ?? cell
              return (
                <Td whiteSpace="nowrap" key={index}>
                  {element}
                </Td>
              )
            })}
            <Td textAlign="right">
              <HStack justify={"flex-end"}>
              {/* {index !== (props?.variants?.length - 1) && <IconButton variant={"ghost"} aria-label='Down' icon={<FaCaretDown/>} />} */}
                {/* {index !== 0 && <IconButton variant={"ghost"} onClick={() => {moveUp(index)}} aria-label='Up' icon={<FaCaretUp/>} />} */}
                <VariantForm variant={row} onEdit={(variant: any) => {
                    props.onChange(props.variants.map((item:any, i: number) => {
                      if(i === index) return variant
                      else return item
                    }))
                }} edit={true}><IconButton variant={"ghost"} aria-label='Edit' icon={<MdEdit/>} /></VariantForm>
                <IconButton onClick={() => {props.onChange(props.variants.filter((item: any, i: number) => i != index))}} variant={"ghost"} aria-label='Delete' icon={<MdDelete/>} />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>}
    </Table>
  )
}
