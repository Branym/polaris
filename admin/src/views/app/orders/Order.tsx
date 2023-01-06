import React, { useEffect, useState } from 'react'
import {
    Badge,
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Icon,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    SimpleGrid,
    Spinner,
    Stack,
    Text,
    Textarea,
    useColorModeValue as mode,
    useDisclosure,
    useToast,
    VStack,
} from '@chakra-ui/react'
import { CartItem } from '../../../components/LineItems/CartItem'
import {OrderSummaryItem } from '../../../components/OrderSummary'
import { FaArrowLeft, FaCheck, FaCloud, FaEdit, FaExternalLinkAlt } from 'react-icons/fa'
// import { useNavigate} from 'react-router-dom'
import { Link , useParams} from 'react-router-dom'
import { editOrder, fetchOrder } from '../../../services/orders'
import { getChannels } from '../../../services/channels'
import { FieldGroup } from '../../../components/Form Layouts/FieldGroup'
import { formatPrice } from '../../../components/LineItems/PriceTag'
import { STATUS_COLORS, STATUS_TEXT } from '../../../constants/app.constant'
import { Field } from 'formik'
import { BiCloud } from 'react-icons/bi'
import Confirmation from '../../../components/Form Layouts/Confirmation'
import { sendAdminMail, updateInventory } from '../../../services/products'


const MyInput = ({ field, form, ...props }: any) => {
    return <Input {...field} {...props} />;
};

const Refund = (props:any) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [refund, setRefund] = useState(props.refunded_amount === 0 ? props.total : props.refunded_amount)
    const [status, setStatus] = useState(props.refund_status);

    useEffect(() => {
        props.onChange({
            refunded_amount: refund,
            refund_status: status,
        })
    }, [refund, status])

    return <>
    
    <Box cursor={"pointer"} onClick={onOpen}>
        {props.children}
    </Box>

    <Modal size="xl" isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Refund Order
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <SimpleGrid columns={2}>
                <Text>
                    Amount to refund
                </Text>
                <NumberInput
                    ml="auto"
                    maxW="120px"
                    onChange={(valueString) => setRefund(valueString)}
                    value={refund}
                    max={props.total}
                    >
                    <NumberInputField />
                </NumberInput>
            </SimpleGrid>
            <SimpleGrid mt={5} columns={2}>
                <Text>
                    Refund Status
                </Text>
                <Select  value={status} onChange={(e) => {setStatus(e.target.value);}}>
                    <option value="PENDING">PENDING</option>
                    <option value="INITIATED">INITIATED</option>
                    <option value="REFUNDED">REFUNDED</option>
                </Select>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant='ghost'>Cancel</Button>
            <Confirmation title={"Confirm Revision"} text="Are you sure you want to continue?" action={<Button onClick={() => {props.save();onClose()}} colorScheme="blue">Confirm</Button>}>
                <Button colorScheme='blue' mr={3} >
                    Save
                </Button>
            </Confirmation>
          </ModalFooter>
        </ModalContent>
    </Modal>
    </>

}

const ReplaceOrder = ({total = 1000, refunded_amount=0, ...props}: any) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [revised, setRevised] = useState(props.cart_items);
    const [edit, setEdit] = useState(false);
    const [status, setStatus] = useState(props.status);

    // const [refunded, setRefunded] = useState(false);
    const [refund, setRefund] = useState(refunded_amount === 0 ? total : refunded_amount)

    const handleChange = (value:any) => {

        var _total = 0
        setRevised(value)
        value.map((item: any) => {
            if(item.replace !== true){
                _total += item.quantity * item.price
            }
        })
        setRefund(_total);
        
    }

    const handleClose = () => {
        props.onChange({
            revised_items: props.cart_items,
            refunded_amount: refunded_amount === 0 ? total : refunded_amount,
            status: props.status,
            revised_total: total
        })
        onClose()
    }

    useEffect(() => {
        props.onChange({
            revised_items: revised,
            refunded_amount: refund,
            status: status,
            refund_status: "PENDING",
            revised_total: total - refund 
        })
    }, [revised, status, refund, isOpen])

    return <>
    
    <Box onClick={onOpen}>
        {props.children}
    </Box>

    <Modal size="4xl" isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Revise Order
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            {revised?.map((item:any, index: number) => (
                <CartItem 
                    isEditing 
                    onChange={(v:any) => {
                        let _new = revised
                        _new[index].quantity = v
                        handleChange(_new)
                    }} 
                    max={props._cart_items[index].quantity}
                    onReplace={(v:any) => {
                        revised[index].replace = v
                        handleChange(revised)
                    }}
                    currency={item.currency} 
                    key={index} 
                    {...item} />
            ))}
            <Divider my={6} />
            <SimpleGrid columns={2}>
                    <Box>
                    {/* <FormControl isRequired id="link" isDisabled={["CANCELLED", "RETURNED", "FULFILLED", "REPLACE - FULFILLED"].includes(props?.status)}>
                            <FormLabel>Update Status</FormLabel>
                            <HStack maxW="300px">
                                <Select  value={status} onChange={(e) => {setStatus(e.target.value);}}>
                                    <option value={props.status}>Choose</option>
                                    <option value="RETURNED">RETURNED</option>
                                    <option value="REPLACE - ON THE WAY">REPLACE - ON THE WAY</option>
                                    <option value="REPLACE - FULFILLED">REPLACE - FULFILLED</option>
                                </Select>
                            </HStack>
                    </FormControl> */}
                    </Box>
                    <Stack textAlign={"right"} width={"100%"} spacing="2">
                        <Text fontSize="lg" fontWeight="semibold">
                        Total Amount To Refund
                        </Text>
                        <HStack justifyContent={"flex-end"}>
                            {!edit && <Text fontSize="xl" fontWeight="extrabold">
                            {formatPrice(refund, {currency: revised[0].currency})}
                            </Text>}
                            {edit && <Text fontSize="xl" fontWeight="extrabold">
                            {formatPrice(0, {currency: revised[0].currency}).split('')[0]}
                            </Text>}
                            {edit && <NumberInput
                                maxW="120px"
                                onChange={(valueString) => setRefund(valueString)}
                                value={refund}
                                max={total}
                                >
                                <NumberInputField />
                            </NumberInput>}
                            {/* <Button onClick={() => {setEdit(!edit)}} variant={"ghost"} colorScheme="blue">
                                {edit ? <FaCheck/> : <FaEdit/>}
                            </Button> */}
                        </HStack>
                    
                    </Stack>
                </SimpleGrid>
          </ModalBody>
                    
          <ModalFooter>
            <Button onClick={handleClose} variant='ghost'>Cancel</Button>
            <Confirmation title={"Confirm Revision"} text={<>
                <Text color="red.500">This action is irreversible.</Text>
                <br/>
                "We will send a mail to the customer regarding the revision of the order. <br/>
                Are you sure you want to continue?"
            </>} action={<Button onClick={() => {props.save();onClose()}} colorScheme="blue">Confirm</Button>}>
                <Button colorScheme='blue' mr={3} >
                Save Order
                </Button>
            </Confirmation>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
    </>

}


export default function Order() {

    const [data, setData]:any = useState({})
    const [payload, setPayload]:any = useState({})
    const [mail, sendMail]:any = useState(true)
    const [mailNotes, setNotes]:any = useState("")
    //   const [channels, setChannels] = useState(getChannels())
    //   const [disable, setDisable] = useState(true)
    //   const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true)
    const [saving, setSaving] = useState(0)
    const [errors, setErrors]:any = useState({})
    //   const [validity, setValidity] = useState(false)

    //   const toast = useToast();
    //   let navigate = useNavigate();
    const {id} = useParams()

    useEffect(() => {
        setFetching(true);
        fetchOrder(`${id}`).then((res:any) => {
            setData(res.order);
            setPayload({
                payment_status: res.order.payment_status,
                status: res.order.status,
                track_link: res.order?.track_link || '',
                refund_status: res.order?.refund_status,
                revised_total: res.order?.revised_total,
                refunded_amount: res.order?.refunded_amount,
                revised_items: res.order?.revised_items?.length > 0 ? res.order.revised_items : res.order.cart_items
            })
            setFetching(false)
        }).catch(err => {
            // navigate('/notfound')
        })
    }, [])

    useEffect(() => {
           
            if(saving === 1 || saving === 3){
                var addons:any = {
                    restock: false
                }
                if(payload.status === "ON THE WAY"){
                    addons.inventory_update = true
                }
                if(payload.status === "RETURNED"){
                    addons.restock = true
                }
                editOrder(`${id}`, {...payload, ...addons}).then((res: any) => {
                    if(res.type === "danger"){
                        setErrors(res.errors);
                        setSaving(0);
                    }
                    else{
                        if(data.inventory_update !== true){
                            if(addons?.inventory_update){
                                updateInventory(data.channel, data.cart_items, false)
                                //Update Inventory
                            }
                        }
                        if(addons.restock){
                            updateInventory(data.channel, payload.revised_items, true)
                        }
                        setData({...data, ...payload, ...addons})
                        if(mail && saving === 3){
                            sendAdminMail(data.customer.email, {...data,
                                currency: data.cart_items[0].currency,
                                status_text: STATUS_TEXT[payload.status],
                                description: mailNotes
                            })
                        }
                        setSaving(2);
                        setTimeout(() => {setSaving(0)}, 3000)
                    }
                })
                
            }
            
    }, [saving])

//   const editProduct = (payload:any) => {
//       console.log(payload);
//       setErrors(!validity);
//       if(validity){
//         setLoading(true);
//         edit(payload, `${id}`).then((result: any) => {
//           toast({
//             title: result.message,
//             status: 'success',
//             position: "top-right",
//             isClosable: true,
//             duration: 5000
//           })
//           setLoading(false);
//         }).catch(err => {
//           toast({
//             title: err.message,
//             status: "error",
//             position: "top-right",
//             isClosable: true,
//             duration: 5000
//           })
//           setLoading(false);
//         })
//       } 
//       else toast({
//         title: "Please fill the required fields.",
//         status: 'error',
//         position: "top-right",
//         isClosable: true,
//         duration: 5000
//       })
//   }

    return fetching ? <VStack width={"100%"} height="100vh" justify={"center"}><Spinner /></VStack> : (
        <Box as="section" py="12">
            <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <HStack align={"center"} justify="space-between" mb="10">
                    <HStack>
                        <Link to="/orders"><IconButton aria-label="back-to-products" variant={"ghost"} icon={<FaArrowLeft />}></IconButton></Link>
                        <Box>
                        <HStack>
                        {id && <Heading size="lg" >
                            {id}
                        </Heading>}
                        <Badge colorScheme={STATUS_COLORS[data.status]?.split('.')[0]}>{data?.status}</Badge>
                        </HStack>
                        <Text>
                            Requested On {data.created_on}
                        </Text>
                        </Box>
                    </HStack>
                    <ButtonGroup>
                        {saving > 0 && <Button variant={"unstyled"} mr={4} leftIcon={saving === 2 ? <BiCloud/> : <></>} isLoading={saving === 1} color="gray.400">Saved</Button>}
                        <ReplaceOrder 
                        refunded_amount={payload.refunded_amount} 
                        total={data.sub_total} 
                        status={data.status} 
                        save={() => {
                            setPayload({...payload, status: "RETURNED"})
                            setSaving(3)}
                        } 
                        onChange={(v:any) => {setPayload({...payload, ...v})}} 
                        _cart_items = {data.cart_items} 
                        cart_items={payload?.revised_items}>
                            <Button isDisabled={["PENDING", "CANCELLED", "RETURNED", "FULFILLED", "REPLACE - ON THE WAY", "REPLACE - FULFILLED"].includes(data?.status)} variant={"solid"} colorScheme={"blue"}>Return/Replace Order</Button>
                        </ReplaceOrder>
                    </ButtonGroup>
                </HStack>
           
                <Box
                    py={{ base: '6', md: '8', lg: '12' }}
                >
                    <Stack
                        direction={{ base: 'column', lg: 'row' }}
                        align={{ lg: 'flex-start' }}
                        spacing={{ base: '8', md: '8' }}
                    >
                        <Stack spacing={{ base: '8', md: '8' }} flex="2">
                            <FieldGroup px={10} title={`Ordered Items (${data.total_items} items)`}>
                                <Stack width={"100%"} spacing="10">
                                    {data?.cart_items?.map((item:any, index: number) => (
                                        <CartItem  currency={item.currency} key={index} {...item} />
                                    ))}
                                </Stack>
                            </FieldGroup>
                            <FieldGroup title="Tracking Information">
                                
                                <FormControl isRequired id="link" isDisabled={["CANCELLED", "RETURNED", "FULFILLED", "REPLACE - FULFILLED"].includes(data?.status)} isInvalid={errors?.track_link ? true : false}>
                                        <FormLabel>Tracking Link</FormLabel>
                                        <HStack>
                                            <Input value={payload.track_link} onChange={(e) => setPayload({...payload, track_link: e.target.value})}></Input>
                                            <Button isDisabled={["CANCELLED", "RETURNED", "FULFILLED", "REPLACE - FULFILLED"].includes(data?.status)} onClick={() => {setSaving(1)}} variant={"solid"} colorScheme="blue">Save</Button>
                                        </HStack>
                                        <FormErrorMessage textTransform={"capitalize"}>{errors?.track_link}</FormErrorMessage>
                                </FormControl>
                                
                            </FieldGroup>
                            <SimpleGrid width="100%" columns={2} spacing="6">

                            <FieldGroup width={"100%"} title={"Billing Address"}>
                                    <Text>
                                        {data.billing_address?.address_line_1} <br />
                                        {data.billing_address?.address_line_2} {data.billing_address?.address_line_2 && <br />}
                                        {data.billing_address?.city}, {data.billing_address?.state},  <br />
                                        {data.billing_address?.country}, {data.billing_address?.pincode}  <br />
                                    </Text>
                            
                            </FieldGroup>
                            <FieldGroup width={"100%"} title={"Shipping Address"}>
                        
                                    <Text>
                                        {data.shipping_address?.address_line_1} <br />
                                        {data.shipping_address?.address_line_2} {data.shipping_address?.address_line_2 && <br />}
                                        {data.shipping_address?.city}, {data.shipping_address?.state},  <br />
                                        {data.shipping_address?.country}, {data.shipping_address?.pincode}  <br />
                                    </Text>
                            </FieldGroup>
                                </SimpleGrid>
                        </Stack>
                        <VStack direction="column" align="center" flex="1" spacing={6}>
                            <FieldGroup title="Customer Details" width={"100%"}>
                                    <HStack width="100%" justifyContent={"space-between"}>
                                        <Text>Name</Text>
                                        <Text fontWeight={"700"}>{data?.customer?.name}</Text>
                                    </HStack>
                                    <HStack width="100%" justifyContent={"space-between"}>
                                        <Text>Email</Text>
                                        <Button variant={"link"} as={"a"} href={"mailto::" + data?.customer?.email} fontWeight={"500"}>{data?.customer?.email}</Button>
                                    </HStack>
                                    <HStack width="100%" justifyContent={"space-between"}>
                                        <Text>Phone</Text>
                                        <Text fontWeight={"700"}>{data?.customer?.country_code}{data?.customer?.phone}</Text>
                                    </HStack>
                            </FieldGroup>

                            <FieldGroup action={<Button onClick={() => {
                                setSaving(3)
                            }} isDisabled={data.status === payload.status} variant={"outline"} size="sm">Save</Button>} title="Order Status" py={8} width="full">
                                        <Select value={payload.status} onChange={(e) => setPayload({...payload, status: e.target.value})}>
                                            {/* {1 &&<option value="PENDING">PENDING</option>} */}
                                            {["PENDING"].includes(data.status) &&<option value="PENDING">PENDING</option>}
                                            {["PENDING", "ON THE WAY"].includes(data.status) && <option value="ON THE WAY">ON THE WAY</option>}
                                            {["FULFILLED", "PENDING", "ON THE WAY"].includes(data.status) &&<option value="FULFILLED">FULFILLED</option>}
                                            {["PENDING", "CANCELLED"].includes(data.status) && <option value="CANCELLED">CANCELLED</option>}
                                            {["RETURNED"].includes(data.status) &&<option value="RETURNED">RETURNED</option>}
                                            {["RETURNED", "REPLACE - ON THE WAY"].includes(data.status) &&<option value="REPLACE - ON THE WAY">REPLACE - ON THE WAY</option>}
                                            {["REPLACE - ON THE WAY", "REPLACE - FULFILLED"].includes(data.status) && <option value="REPLACE - FULFILLED">REPLACE - FULFILLED</option>}
                                        </Select>
                                        <Checkbox isChecked={mail} onChange={(e:any) => {
                                            sendMail(e.target.checked)
                                        }}>Send Mail to Customer</Checkbox>
                                        {mail && <Textarea value={mailNotes} onChange={(e) => {setNotes(e.target.value)}} placeholder='Write some notes to send with email..'>
                                        </Textarea>}
                            </FieldGroup>
                      
                            <FieldGroup action={<Button onClick={() => {
                                setPayload({
                                    ...payload,
                                    payment_status: data.payment_status === "PAID" ? "UNPAID" : "PAID"
                                })
                                setSaving(1)
                            }} isDisabled={["CANCELLED", "RETURNED", "FULFILLED", "REPLACE - FULFILLED"].includes(data?.status)} variant={"outline"} size="sm">MARK AS {data?.payment_status === "PAID" ? "UNPAID": "PAID"}</Button>} title="Order Summary" py={8} width="full">
                                <Stack width={"100%"} spacing="6">
                                    <OrderSummaryItem label="Payment Method" children={<Text>{data?.payment_method}</Text>} />
                                    <OrderSummaryItem label="Subtotal" value={formatPrice(data?.sub_total, {currency: getChannels()?.filter((item: any) => item.slug === data.channel)[0]?.currency})} />
                                    <OrderSummaryItem label="Shipping Charges" value={formatPrice(data?.shipping_charges, {currency: getChannels()?.filter((item: any) => item.slug === data.channel)[0]?.currency})} />
                                    <OrderSummaryItem label="Tax" value={formatPrice(data?.tax, {currency: getChannels()?.filter((item: any) => item.slug === data.channel)[0]?.currency})} />
                                    {data?.coupon_discount && <OrderSummaryItem label="Discount" children={<Text color="green.500">{formatPrice(data?.coupon_discount, {currency: getChannels()?.filter((item: any) => item.slug === data.channel)[0]?.currency})}</Text>} />}
                                    {data?.coupon_discount && <OrderSummaryItem label="Discount" children={<Text color="green.500">{formatPrice(data?.coupon_discount, {currency: getChannels()?.filter((item: any) => item.slug === data.channel)[0]?.currency})}</Text>} />}
                                    {data?.refunded_amount > 0 && <OrderSummaryItem label={data.refund_status !== "REFUNDED" ? 'Amount to Refund' : 'Refunded Amount'} children={<Text color="green.500">{formatPrice(data?.refunded_amount, {currency: getChannels()?.filter((item: any) => item.slug === data.channel)[0]?.currency})}</Text>} />}
                                    {data?.refunded_amount > 0 && <OrderSummaryItem label="Revised Total" children={<Text color="gray.900">{formatPrice(data?.revised_total + data.total - data.sub_total, {currency: getChannels()?.filter((item: any) => item.slug === data.channel)[0]?.currency})}</Text>} />}
                                    {data?.refunded_amount > 0 && <OrderSummaryItem label="Refund Status" children={
                                        <Refund
                                            refunded_amount={payload.refunded_amount} 
                                            total={data.total} 
                                            refund_status={data.refund_status} 
                                            save={() => {setSaving(1)}} 
                                            onChange={(v:any) => {setPayload({...payload, ...v})}} 
                                        >
                                            <HStack>
                                                <Text color="gray.500">{data.refund_status}</Text>
                                                <FaEdit color='gray.500'/>
                                            </HStack>
                                        </Refund>
                                    } />}
                                    <Flex justify="space-between">
                                        <Text fontSize="lg" fontWeight="semibold">
                                        Total
                                        </Text>
                                        <Text fontSize="xl" fontWeight="extrabold">
                                            {formatPrice(data?.total, {currency: getChannels()?.filter((item: any) => item.slug === data.channel)[0]?.currency})}
                                        </Text>
                                    </Flex>
                                </Stack>
                            </FieldGroup>
                        </VStack>
                    </Stack>
                </Box>
            </Box>
        </Box>

    )
}
