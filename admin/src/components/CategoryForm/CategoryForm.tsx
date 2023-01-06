import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,  SimpleGrid, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react';
import { Formik, Form, Field, FormikProps } from 'formik';
import { FieldGroup } from '../Form Layouts/FieldGroup';
import * as Yup from "yup";
import ImageUpload from '../Media Manager/ImageUpload';
import { upsertCategory } from '../../services/category';
import Editor from '../EditorJS/EditorJS';

const CategorySchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    slug: Yup.string().required('Slug is required.'),
    description: Yup.object().required("Please add description."),
    bg_image: Yup.string().required("Please Upload Backgorund Image")
  });

const MyInput = ({ field, form, ...props }: any) => {
    return <Input {...field} {...props} />;
};

export default (props: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [loading, setLoading] = useState(false)
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
                        validationSchema={CategorySchema}
                        initialValues={props?.edit ? props.category : { title: '', slug: '', bg_image: '', description: [] }}
                        onSubmit={(values, actions) => {
                            setLoading(true)
                            upsertCategory(props?.edit ? {
                                title: values.title,
                                bg_image: values.bg_image,
                                description: values.description
                            } : values, props?.edit, props.slug).then((result: any) => {
                                onClose();
                                toast({
                                    title: result.message,
                                    status: 'success',
                                    position: "top-right",
                                    isClosable: true,
                                    duration: 5000
                                  })
                                  setLoading(false);
                                  props.onSuccess();
                            }).catch(err => {
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
                        {({errors, touched, ...form_props}: FormikProps<any>) => (
                            <Form>
                                <ModalHeader>{props.edit? "Edit" : "Add New"} Category</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FieldGroup px={0} py={0} title="">
                                        <SimpleGrid width={"100%"} columns={1} spacing={6}>
                                            <FormControl isInvalid={(errors.title && touched.title) ? true : false} isRequired id="title">
                                                <FormLabel>Title</FormLabel>
                                                <Field name="title" placeholder="" component={MyInput} />
                                                <FormErrorMessage textTransform={"capitalize"}>{errors.title}</FormErrorMessage>
                                            </FormControl>
                                            <FormControl isDisabled={props.edit} isInvalid={(errors.slug && touched.slug) ? true : false} isRequired id="slug">
                                                <FormLabel>Slug</FormLabel>
                                                <Field name="slug" placeholder="" component={MyInput} />
                                                <FormErrorMessage textTransform={"capitalize"}>{errors.slug}</FormErrorMessage>
                                            </FormControl>
                                            <FormControl isInvalid={(errors.bg_image && touched.bg_image) ? true : false} id="bg_image">
                                                <FormLabel>Cover</FormLabel>
                                                <ImageUpload name="bg_image" props={form_props} />
                                                <FormErrorMessage textTransform={"capitalize"}>{errors.bg_image}</FormErrorMessage>
                                            </FormControl>
                                            <FormControl isRequired isInvalid={(errors.description && touched.description) ? true : false} id="description">
                                                <FormLabel>Description</FormLabel>
                                                <Editor value={form_props.values.description} onChange={(v:any) => {form_props.setFieldValue('description', v)}} />
                                                <FormErrorMessage textTransform={"capitalize"}>{errors.description}</FormErrorMessage>
                                            </FormControl>
                                        </SimpleGrid>
                                    </FieldGroup>
                                    {/* <Field name="bg_image">
                                        {({
                                        field, // { name, value, onChange, onBlur }
                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        meta,
                                        }: any) => (
                                        <div>
                                           <MediaList px={0} py={1} canSelect={props.edit} media={form_props.values["bg_image"]} onChange={(v: string[]) => {
                                               touched.bg_image = true;
                                               form_props.setFieldValue('bg_image', v)
                                            }} error={(meta.touched && meta.error) ? meta.error : false} />
                                        </div>
                                        )}
                                    </Field> */}
                                </ModalBody>
                                <ModalFooter justifyContent={"start"}>
                                    <Button isLoading={loading} loadingText='Loading' size="md" type="submit" variant={"solid"} colorScheme='blue' mr={3}>
                                        {props?.edit ? "Update" : "Create"}
                                    </Button>
                                </ModalFooter>
                            </Form>
                        )}
                    </Formik>
                </ModalContent>
            </Modal>
        </>
    )
}
