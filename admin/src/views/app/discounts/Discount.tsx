import { Box, Button, ButtonGroup, Checkbox, FormControl, FormErrorMessage, FormLabel, Grid, Heading, HStack, IconButton, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, Select, SimpleGrid, Spinner, Stack, Switch, Text, Textarea, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FormikProps } from 'formik';
import * as Yup from "yup";
import { FieldGroup } from '../../../components/Form Layouts/FieldGroup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { fetchDiscount, upsertDiscount } from '../../../services/discounts';
import { getChannels } from '../../../services/channels';
import PriceInput from '../../../components/UI/PriceInput';
import RadioInput from '../../../components/UI/RadioInput';

const Schema = Yup.object().shape({
    title: Yup.string().min(3).max(50).required('Title is required.'),
    code: Yup.string().matches(/^[A-Z0-9]+/, "Code must containt capital letters and numericals").min(1).max(20).required('Code is required.'),
    type: Yup.string().required(),
    start_date: Yup.string(),
    end_date: Yup.string(),
    price: Yup.object().required(),
    minimum_value: Yup.object(),
    availability: Yup.object().required(),
    one_use_per_user: Yup.boolean(),
    limit_uses: Yup.number(),
    requirement: Yup.string(),
    minimum_items: Yup.number()
});

const MyInput = ({ field, form, ...props }: any) => {
    return <Input {...field} {...props} />;
};
const SelectInput = ({ field, form, ...props }: any) => {
    return <Select {...field} {...props} />;
};

const MyCheckbox = ({ field, form, ...props }: any) => {
    return <Checkbox isChecked={field.value} {...field} {...props} />;
};


const DiscountForm = ({id}: any) => {
    const [discount, setDiscount]:any = useState({});
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [channels, setChannels]: any = useState(getChannels);
    const _price: any = {}
    const _min: any = {}
    const _a: any = {}
    let navigate = useNavigate();
    const toast = useToast();
    channels.map((item: any) => {
        _price[item.slug] = 0
        _min[item.slug] = 0
        _a[item.slug] = true
    })

    useEffect(() => {
        setChannels(getChannels())
        if (id !== "create") {
            setFetching(true)
            fetchDiscount(id).then((result: any) => {
                setDiscount(result.discount.data)
                setFetching(false)
            })
        }
    }, [])

    return (
        <>
            {fetching ? <VStack width={"100%"} height="600px" justify={"center"}><Spinner /></VStack> : <Formik
                validationSchema={Schema}
                initialValues={id === "create" ? {
                    title: '',
                    code: '',
                    type: 'Fixed',
                    start_date: '', 
                    end_date: '', 
                    price: _price, 
                    minimum_value: _min, 
                    minimum_items: 1, 
                    requirement: 'Minimum Items',
                    one_use_per_user: false,
                    limit_uses: 0,
                    limit: false,
                    availability: _a
                } : discount}
                validate = {(values: any) => {
                }}
                onSubmit={(values, actions) => {
                    setLoading(true);
                    upsertDiscount(values, id !== "create", id).then((result: any) => {
                        toast({
                            title: result.message,
                            status: 'success',
                            position: "top-right",
                            isClosable: true,
                            duration: 5000
                        })
                        setLoading(false);
                        if (id === "create") navigate('/discount/' + result.discount.data.code)
                    }).catch((err: any) => {
                        toast({
                            title: err.message,
                            status: "error",
                            position: "top-right",
                            isClosable: true,
                            duration: 5000
                        })
                        setLoading(false);
                    })
                }}
            >
                {({ errors, touched, values, setFieldValue }: FormikProps<any>) => (
                    <Form>
                        <HStack align={"center"} justify="space-between" mb="10">
                            <HStack>
                                <Link to="/discounts"><IconButton aria-label="back-to-discounts" variant={"ghost"} icon={<FaArrowLeft />}></IconButton></Link>
                                <Heading size="lg" >
                                    {id !== 'create' ? discount?.code : "Create Discount"}
                                </Heading>
                            </HStack>
                            <ButtonGroup spacing={2}>
                                <Button isLoading={loading} loadingText='Loading' size="md" type="submit" variant={"solid"} colorScheme='blue'>
                                    {id !== 'create' ? "Update" : "Create"}
                                </Button>
                                <Link to={"/discounts"}><Button variant={"outline"} colorScheme={"gray"}>Discard</Button></Link>
                            </ButtonGroup>
                        </HStack>
                        <Grid columnGap={8} templateColumns={{ lg: "1fr 1fr", xl: "1fr 420px" }}>
                            <Stack spacing="4">
                                <FieldGroup title="Coupon Details">
                                     <FormControl isInvalid={(errors.code && touched.code) ? true : false} isDisabled={id !== "create"} isRequired id="code">
                                            <FormLabel>Code</FormLabel>
                                            <Field name="code" placeholder="" component={MyInput} />
                                            <FormErrorMessage textTransform={"capitalize"}>{errors.code}</FormErrorMessage>
                                    </FormControl>
                                    <SimpleGrid width={"100%"} columns={2} spacing={6}>
                                     
                                        <FormControl isInvalid={(errors.title && touched.title) ? true : false} isRequired id="title">
                                            <FormLabel>Title</FormLabel>
                                            <Field name="title" placeholder="" component={MyInput} />
                                            <FormErrorMessage textTransform={"capitalize"}>{errors.title}</FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={(errors.type && touched.type) ? true : false} isRequired id="type">
                                            <FormLabel>Type</FormLabel>
                                            <Field name="type" children={
                                                <>
                                                    <option value="Fixed">Fixed</option>
                                                    <option value="Percentage">Percentage</option>
                                                </>
                                            }  component={SelectInput} />
                                            <FormErrorMessage textTransform={"capitalize"}>{errors.type}</FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={(errors.start_date && touched.start_date) ? true : false} id="start_date">
                                            <FormLabel>Start Date</FormLabel>
                                            <Field name="start_date" type="date" placeholder="" component={MyInput} />
                                            <FormErrorMessage textTransform={"capitalize"}>{errors.start_date}</FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={(errors.end_date && touched.end_date) ? true : false} id="end_date">
                                            <FormLabel>End Date</FormLabel>
                                            <Field name="end_date" type="date" placeholder="" component={MyInput} />
                                            <FormErrorMessage textTransform={"capitalize"}>{errors.end_date}</FormErrorMessage>
                                        </FormControl>
                                    </SimpleGrid>
                                </FieldGroup>
                                <FieldGroup title={"Price"} >
                                    {channels.map((item: any, index: number) =>
                                        <FormControl width={"100%"} key={index}>
                                            <HStack width={"100%"} justify={"space-between"} align="center">
                                                <FormLabel>{item.name}</FormLabel>
                                                <Field name={"price." + item.slug} type="number" width="160px" pl={14} currency={values.type === 'Fixed' ? item.currency : "%"} component={PriceInput} />
                                            </HStack>
                                            <FormErrorMessage textTransform={"capitalize"}>{errors.slug}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </FieldGroup>
                                <FieldGroup title={"Requirements"}>
                                    <RadioInput width="100%" direction="column" onChange={(e: any) => { setFieldValue('requirement', e) }} value={values['requirement']}>
                                        <HStack width={"100%"} justify={"space-between"} align="center">
                                            <Radio value="Minimum Items">Minimum Number of Items </Radio>
                                            <NumberInput onChange={(e: any) => { setFieldValue('minimum_items', e) }} value={values['minimum_items']} maxW={40} isDisabled={values['requirement'] !== 'Minimum Items'} min={1}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </HStack>
                                        <FormErrorMessage textTransform={"capitalize"}>{errors.slug}</FormErrorMessage>
                                        <Radio value="Minimum Value">Minimum Value of Order</Radio>
                                    </RadioInput>
                                    {values['requirement'] !== 'Minimum Items' && channels.map((item: any, index: number) =>
                                        <FormControl width={"100%"} key={index}>
                                            <HStack width={"100%"} justify={"space-between"} align="center">
                                                <FormLabel>{item.name}</FormLabel>
                                                <Field name={"minimum_value." + item.slug} type="number" width="160px" pl={14} currency={item.currency} placeholder="" component={PriceInput} />
                                            </HStack>
                                            <FormErrorMessage textTransform={"capitalize"}>{errors.slug}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </FieldGroup>
                            </Stack>
                            <Stack spacing="4">
                                <FieldGroup title="Limits">
                                    <VStack align={"start"} width={"100%"} spacing="4">
                                        <HStack width={"100%"} justify={"space-between"} align="center">
                                            <Text>Limit to One User</Text>
                                            <Switch onChange={(e: any) => { setFieldValue('one_use_per_user', e.target.checked) }} isChecked={values['one_use_per_user']}></Switch>
                                        </HStack>
                                        <HStack width={"100%"} justify={"space-between"} align="center">
                                            <Text>Limit Number of Uses</Text>
                                            <Switch onChange={(e: any) => { setFieldValue('limit', e.target.checked) }} isChecked={values.limit}></Switch>
                                        </HStack>
                                        {values.limit && <NumberInput onChange={(e: any) => { setFieldValue('limit_uses', Number(e)) }} value={values['limit_uses']} min={1}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>}
                                    </VStack>
                                </FieldGroup>
                                <FieldGroup title="Availability">
                                    <VStack align={"start"} width={"100%"} spacing="4">
                                        {channels.map((item: any, index: number) =>
                                            <HStack key={index} width={"100%"} justify={"space-between"} align="center">
                                                <Text>{item.name}</Text>
                                                <Field name={"availability." + item.slug} type="number" component={MyCheckbox} />
                                            </HStack>
                                        )}
                                    </VStack>
                                </FieldGroup>
                            </Stack>
                        </Grid>
                    </Form>
                )}
            </Formik>}
        </>
    )
}

export default (props: any) => {

  
    
    const { id } = useParams()

  

    return (
        <>
            <Box as="section" py="12">
                <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                    <DiscountForm id={id} />
                </Box>
            </Box>

        </>
    )
}
