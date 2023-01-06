import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Switch, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react';
import { Formik, Form, Field, FormikProps } from 'formik';
import { FieldGroup } from '../Form Layouts/FieldGroup';
import * as Yup from "yup";
import MediaList from '../Media Manager/MediaList';
import { getChannels } from '../../services/channels';
import PriceInput from '../UI/PriceInput';

const Schema = Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    sku: Yup.string().required('SKU is required.'),
    weight: Yup.number(),
    dimensions: Yup.string(),
    media: Yup.array().min(1).of(Yup.string()),
    stock: Yup.object()
  });

const MyInput = ({ field, form, ...props }: any) => {
    return <Input {...field} {...props} />;
};

const SwitchInput = ({ field, form, ...props }: any) => {
    return <Switch isChecked={field.value} {...field} {...props} />;
};


export default (props: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [channels, setChannels] = useState(getChannels());
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
                    <Formik
                        validationSchema={Schema}
                        initialValues={props?.edit ? props.variant : { name: '', sku: '', weight: '', dimensions: '', media: [] }}
                        onSubmit={(values, actions) => {
                            props.edit ? props.onEdit(values) : props.onAdd(values);
                            onClose()
                        }}
                    >
                        {({errors, touched, ...form_props}: FormikProps<any>) => (
                            <Form>
                                <ModalHeader>{props.edit? "Edit" : "Add New"} Variant</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FieldGroup px={4} py={8} title="Variant Details">
                                        <SimpleGrid width={"100%"} columns={2} spacing={6}>
                                            <FormControl isInvalid={(errors.name && touched.name) ? true : false} isRequired id="name">
                                                <FormLabel>Name</FormLabel>
                                                <Field name="name" placeholder="" component={MyInput} />
                                                <FormErrorMessage textTransform={"capitalize"}>{errors.name}</FormErrorMessage>
                                            </FormControl>
                                            <FormControl isInvalid={(errors.sku && touched.sku) ? true : false} isRequired id="sku">
                                                <FormLabel>Stock Keeping Unit (SKU)</FormLabel>
                                                <Field name="sku" placeholder="" component={MyInput} />
                                                <FormErrorMessage textTransform={"capitalize"}>{errors.sku}</FormErrorMessage>
                                            </FormControl>
                                            <FormControl isInvalid={(errors.weight && touched.weight) ? true : false} id="weight">
                                                <FormLabel>Weight (KG)</FormLabel>
                                                <Field name="weight" placeholder="" component={MyInput} />
                                                <FormErrorMessage textTransform={"capitalize"}>{errors.weight}</FormErrorMessage>
                                            </FormControl>
                                            <FormControl isInvalid={(errors.weight && touched.weight) ? true : false} id="name">
                                                <FormLabel>Dimensions (cm)</FormLabel>
                                                <Field name="dimensions" placeholder="LxBxH" component={MyInput} />
                                                <FormErrorMessage textTransform={"capitalize"}>{errors.dimensions}</FormErrorMessage>
                                            </FormControl>
                                        </SimpleGrid>
                                    </FieldGroup>
                                    <Field name="media">
                                        {({
                                        field, // { name, value, onChange, onBlur }
                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        meta,
                                        }: any) => (
                                        <div>
                                           <MediaList canSelect={props.edit} media={form_props.values["media"]} onChange={(v: string[]) => {
                                               touched.media = true;
                                               form_props.setFieldValue('media', v)
                                            }} error={(meta.touched && meta.error) ? meta.error : false} />
                                        </div>
                                        )}
                                    </Field>
                                    {channels.map((item: any, index: number) => <FieldGroup py={4} title={item.name} action={<>
                                        <Field children={"Available"} name={"stock." + item.slug + ".availability"} component={SwitchInput}  />
                                        </>
                                    }>
                                    <SimpleGrid key={index} width={"100%"} columns={2} spacing={6}>
                                            <FormControl isInvalid={false} isRequired id="name">
                                                <FormLabel>Price</FormLabel>
                                                <Field name={"stock." + item.slug + ".price"} type="number" pl={14} currency={item.currency} placeholder="" component={PriceInput} />
                                                <FormErrorMessage textTransform={"capitalize"}>error</FormErrorMessage>
                                            </FormControl>
                                            <FormControl isInvalid={false} isRequired id="sku">
                                                <FormLabel>Inventory</FormLabel>
                                                <Field name={"stock." + item.slug + ".inventory"} type="number" placeholder="" component={MyInput} />
                                                <FormErrorMessage textTransform={"capitalize"}>error</FormErrorMessage>
                                            </FormControl>
                                        </SimpleGrid>
                                    </FieldGroup>)}
                                </ModalBody>
                                <ModalFooter>
                                    <Button type="submit" colorScheme='blue' mr={3}>
                                        {props?.edit ? "Update" : "Create"}
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </Form>
                        )}
                    </Formik>
                </ModalContent>
            </Modal>
        </>
    )
}
