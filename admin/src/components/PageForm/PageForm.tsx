import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input,  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Spinner,  Textarea, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FormikProps } from 'formik';
import { FieldGroup } from '../Form Layouts/FieldGroup';
import * as Yup from "yup";
import ImageUpload from '../Media Manager/ImageUpload';
import { fetchPage, upsertPage } from '../../services/pages';
import Editor from '../EditorJS/EditorJS';

const PageSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    slug: Yup.string().required('Slug is required.'),
    description: Yup.object().required("Please add description."),
    bg_image: Yup.string().required("Please Upload Backgorund Image")
  });

const MyInput = ({ field, form, ...props }: any) => {
    return <Input {...field} {...props} />;
};
const AreaInput = ({ field, form, ...props }: any) => {
    return <Textarea {...field} {...props} />;
};

export default (props: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [initial, setInitial] = useState({ title: '', slug: '', bg_image: '', description: {}, seo_title: '', seo_description: '' });

    useEffect(() => {
        if(props?.edit){
            setFetching(true);
            fetchPage(props.slug).then((result: any) => {
                setInitial(result.page.data)
                setFetching(false);
            })
        }
        else{
            setFetching(false);
        }
    }, [])

    return (
        <>
            <Box onClick={onOpen}>
                {props.children}
            </Box>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="5xl"
            >
                <ModalOverlay />
                <ModalContent>
                    {fetching ? <VStack w="100%" py={24}><Spinner/></VStack>  : <Formik
                        validationSchema={PageSchema}
                        initialValues={initial}
                        onSubmit={(values: any, actions) => {
                            setLoading(true);
                            upsertPage(props?.edit ? {
                                title: values.title,
                                bg_image: values.bg_image,
                                description: values.description,
                                seo_description: values.seo_description,
                                seo_title: values.seo_title
                            } : values, props?.edit, props.slug).then((result: any) => {
                                setInitial(values)
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
                                <ModalHeader>{props.edit? "Edit" : "Add New"} Page</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody mx="auto" width={"90%"} maxW="1140px" pb={6}>
                                    <FieldGroup px={0} py={0} title="">
                                        <SimpleGrid width={"100%"} columns={1} spacing={6}>
                                            <FormControl isInvalid={(errors.title && touched.title) ? true : false} isRequired id="title">
                                                <Field name="title" borderWidth={0} p={0} fontSize="24px" placeholder="Enter Title Here" component={MyInput} />
                                                <FormErrorMessage textTransform={"capitalize"}>{errors.title}</FormErrorMessage>
                                            </FormControl>
                                           
                                            <FormControl isInvalid={(errors.bg_image && touched.bg_image) ? true : false} id="bg_image">
                                                <ImageUpload name="bg_image" props={form_props} />
                                                <FormErrorMessage textTransform={"capitalize"}>{errors.bg_image}</FormErrorMessage>
                                            </FormControl>
                                            <FormControl isRequired isInvalid={(errors.description && touched.description) ? true : false} id="description">
                                                <Editor value={form_props.values.description} onChange={(v:any) => {form_props.setFieldValue('description', v)}} />
                                                <FormErrorMessage textTransform={"capitalize"}>{errors.description}</FormErrorMessage>
                                            </FormControl>
                                        </SimpleGrid>
                                    </FieldGroup>
                                    <FieldGroup title="SEO" px={0}>
                                            <FormControl isDisabled={props.edit} isInvalid={(errors.slug && touched.slug) ? true : false} isRequired id="slug">
                                                <FormLabel>Slug</FormLabel>
                                                <Field name="slug" placeholder="" component={MyInput} />
                                                <FormErrorMessage textTransform={"capitalize"}>{errors.slug}</FormErrorMessage>
                                            </FormControl>
                                            <FormControl isInvalid={(errors.seo_title && touched.seo_title) ? true : false} isRequired id="seo_title">
                                                <FormLabel>Title</FormLabel>
                                                <Field name="seo_title" placeholder="" component={MyInput} />
                                                <FormErrorMessage textTransform={"capitalize"}>{errors.seo_title}</FormErrorMessage>
                                            </FormControl>
                                            <FormControl isInvalid={(errors.seo_description && touched.seo_description) ? true : false} isRequired id="seo_description">
                                                <FormLabel>Description</FormLabel>
                                                <Field name="seo_description" placeholder="" component={AreaInput} />
                                                <FormErrorMessage textTransform={"capitalize"}>{errors.seo_description}</FormErrorMessage>
                                            </FormControl>
                                        
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
                    </Formik>}
                </ModalContent>
            </Modal>
        </>
    )
}
