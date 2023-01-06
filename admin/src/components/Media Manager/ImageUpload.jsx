import { Box, Icon, Image, Input, Spinner,  Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "../../constants/app.constant";
import { uploadMedia } from "../../services/products";

export default function ImageUpload({ name, props }) {
  const [uploading, setUploading] = React.useState(false);

  const handleFile = async (e) => {
    setUploading(true);
    if(e.target.files[0].size > MAX_FILE_SIZE) {setUploading(false);return alert("Files' size must be less then 2MB.")}
    if(!ALLOWED_FILE_TYPES.includes(e.target.files[0].type)) {setUploading(false);return alert("Files size must be in Image Format.")}
    var url = await uploadMedia(e.target.files[0]);
    console.log(url)
    props.setFieldValue(name, url.file.url)
    setUploading(false);
  } 

  return <Box pos="relative">{!props.values[name] ? <VStack rounded={"lg"} width={"100%"} py={20} borderStyle={"dashed"} borderWidth={2} borderColor="gray.200">
        {uploading ? <Spinner/> : <>
          <Icon><FaUpload/></Icon>
          <Text>Click to upload, or drag and drop</Text>
          <Text fontSize={"12px"}>PNG, JPG, or JPEG up to 2MB</Text>
        </>}
  </VStack> : <Image src={props.values[name]} objectFit="cover" rounded="lg" width="100%" height={"200px"}></Image>}
  <Input onChange={handleFile} cursor={"pointer"} type="file" pos={"absolute"} width="100%" height={"100%"} opacity="0" left="0" top="0"></Input>
  </Box>
}