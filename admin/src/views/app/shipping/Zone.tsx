import { Box, Button, ButtonGroup, Checkbox, FormControl, FormErrorMessage, FormLabel, Grid, Heading, HStack, IconButton, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, Select, SimpleGrid, Spinner, Stack, Switch, Text, Textarea, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FormikProps } from 'formik';
import * as Yup from "yup";
import { FieldGroup } from '../../../components/Form Layouts/FieldGroup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getChannels } from '../../../services/channels';
import PriceInput from '../../../components/UI/PriceInput';
import { fetchZone, upsertZone } from '../../../services/shipping';
import ArrayInput from '../../../components/ArrayInput/ArrayInput';

const Schema = Yup.object().shape({
    title: Yup.string().min(3).max(50).required('Title is required.'),
    type: Yup.string().required(),
    rate: Yup.object().required(),
    countries: Yup.array().required(),
});

const MyInput = ({ field, form, ...props }: any) => {
    return <Input {...field} {...props} />;
};


const Zone = ({id}: any) => {
    const [zone, setZone]:any = useState({});
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [channels, setChannels]: any = useState(getChannels);
    const _price: any = {}
    let navigate = useNavigate();
    const toast = useToast();
    channels.map((item: any) => {
        _price[item.slug] = 0
    })

    useEffect(() => {
        setChannels(getChannels())
        if (id !== "create") {
            setFetching(true)
            fetchZone(id).then((result: any) => {
                setZone(result.zone.data)
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
                    type: 'Fixed',
                    rate: _price, 
                    countries: [],
                } : zone}
                validate = {(values: any) => {
                }}
                onSubmit={(values, actions) => {
                    setLoading(true);
                    upsertZone(values, id !== "create", id).then((result: any) => {
                        toast({
                            title: result.message,
                            status: 'success',
                            position: "top-right",
                            isClosable: true,
                            duration: 5000
                        })
                        setLoading(false);
                        if (id === "create") navigate('/shipping/' + result.zone.data.slug)
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
                                <Link to="/shipping"><IconButton aria-label="back-to-shipping" variant={"ghost"} icon={<FaArrowLeft />}></IconButton></Link>
                                <Heading size="lg" >
                                    {id !== 'create' ? zone?.title : "Create Shipping Zone"}
                                </Heading>
                            </HStack>
                            <ButtonGroup spacing={2}>
                                <Button isLoading={loading} loadingText='Loading' size="md" type="submit" variant={"solid"} colorScheme='blue'>
                                    {id !== 'create' ? "Update" : "Create"}
                                </Button>
                                <Link to={"/shipping"}><Button variant={"outline"} colorScheme={"gray"}>Discard</Button></Link>
                            </ButtonGroup>
                        </HStack>
                        <Grid columnGap={8} templateColumns={{ lg: "1fr 1fr", xl: "1fr 420px" }}>
                            <Stack spacing="4">
                                <FieldGroup title="Zone Details">
                                    <FormControl isInvalid={(errors.title && touched.title) ? true : false} isRequired id="title">
                                            <FormLabel>Title</FormLabel>
                                            <Field name="title" placeholder="" component={MyInput} />
                                            <FormErrorMessage textTransform={"capitalize"}>{errors.title}</FormErrorMessage>
                                    </FormControl>
                                </FieldGroup>
                                <FieldGroup title={"Price"} >
                                    {channels.map((item: any, index: number) =>
                                        <FormControl width={"100%"} key={index}>
                                            <HStack width={"100%"} justify={"space-between"} align="center">
                                                <FormLabel>{item.name}</FormLabel>
                                                <Field name={"rate." + item.slug} type="number" width="160px" pl={14} currency={item.currency} component={PriceInput} />
                                            </HStack>
                                            <FormErrorMessage textTransform={"capitalize"}>{errors.rate}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </FieldGroup>
                                <ArrayInput 
                                    modal_title="Add Country" 
                                    onChange={(_v:any) => {setFieldValue('countries', _v)}} 
                                    value={values.countries}
                                    title="Countires"
                                    button_text="Add Country"
                                    input_type="dropdown"
                                    select_options={["India", "China", "USA"]}
                                />
                            </Stack>
                            <Stack spacing="4">
                                        
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
                    <Zone id={id} />
                </Box>
            </Box>

        </>
    )
}
