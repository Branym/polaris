import { Box, Button, Flex, HStack, Icon, Image, Input, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import React, { useState, useCallback } from "react";
import { FaPlus, FaTrash, FaUpload } from "react-icons/fa";
// import Gallery from "react-photo-gallery";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "../../constants/app.constant";
import { AWS_URL, BASE_URL } from "../../enviroments/enviroments";
import { uploadMedia } from "../../services/products";
import { FieldGroup } from "../Form Layouts/FieldGroup";


const Checkmark = ({ selected }) => (
    <div
      style={
        selected
          ? { left: "4px", top: "4px", position: "absolute", zIndex: "1" }
          : { display: "none" }
      }
    >
      <svg
        style={{ fill: "white", position: "absolute" }}
        width="24px"
        height="24px"
      >
        <circle cx="12.5" cy="12.2" r="8.292" />
      </svg>
      <svg
        style={{ fill: "#06befa", position: "absolute" }}
        width="24px"
        height="24px"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    </div>
  );
  
  const cont = {
    backgroundColor: "#fff",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative"
  };
  
  


export default function MediaList({media=[], ...props}) {
  const [selectAll, setSelectAll] = useState(false);
  const [selections, setSelections] = useState([])
  const [del, setDelete] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  const SelectedImage = ({
    index,
    photo,
    margin,
    direction = "row",
    top,
    left,
    selected,
    _selections,
    onSelect
  }) => {
    const [isSelected, setIsSelected] = useState(selected);
    //calculate x,y scale
  
    if (direction === "column") {
      cont.position = "absolute";
      cont.left = left;
      cont.top = top;
    }
    
    const handleOnClick = e => {
      if(props.canSelect){
        if(isSelected) _selections.splice(_selections.indexOf(index), 1)
        else _selections.push(index) ;
        onSelect(_selections);
        setIsSelected(!isSelected);
      }
    };
  
    React.useEffect(() => {
      setIsSelected(selected);
    }, [selected]);

    return (
      <div
        key={index}
        style={{ margin, height: "160px", width: "160px", ...cont }}
        className={!isSelected ? "not-selected" : ""}
      >
        <Checkmark selected={isSelected ? true : false} />
        <img
          alt={photo.title}
          src={photo.src.includes('https://') ? photo.src : (AWS_URL + photo.src)}
          style={
            {objectFit: "cover", height: "100%"}
          }
          height= "100%"
          width= "100%"
          onClick={handleOnClick}
        />
        <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
      </div>
    );
  };

  const deleteMedia = () => {
    // console.log(selections, del)
    props.onChange(media?.filter((item, index) => !selections.includes(index)))
    setSelections([])
    setDelete(false);
  }

  const handleFiles = async (e) => {
    setUploading(true);
    for (let index = 0; index < e.target?.files?.length; index++) {
      if(e.target.files[index].size > MAX_FILE_SIZE) return alert("Files' size must be less then 2MB.")
      if(!ALLOWED_FILE_TYPES.includes(e.target.files[index].type)) return alert("Files size must be in Image Format.")
    }
    var uploads = [];
    for (let index = 0; index < e.target?.files?.length; index++) {
        var url = await uploadMedia(e.target.files[index]);
        uploads.push(url.file.url)
    }
    props.onChange([...uploads, ...media])
    setUploading(false);
  } 

  return (
    <FieldGroup title={`Media`} action={
      del  ? <Button size="xs" variant={"outline"} onClick={() => {deleteMedia()}} colorScheme="red" leftIcon={<FaTrash/>}>Delete</Button> : <Box pos={"relative"}>
        <Button size="xs" variant={"outline"} leftIcon={<FaPlus/>}>Upload</Button>
        <Input onChange={handleFiles} multiple={true} cursor={"pointer"} type="file" pos={"absolute"} width="100%" height={"100%"} opacity="0" left="0" top="0"></Input>
      </Box>
    }>
      <Stack direction="row" spacing="6" align="center" width="full">
      {media?.length === 0 ? <VStack rounded={"lg"} pos="relative" width={"100%"} py={20} borderStyle={"dashed"} borderWidth={2} borderColor="gray.200">
      <Input onChange={handleFiles} multiple={true} cursor={"pointer"} type="file" pos={"absolute"} width="100%" height={"100%"} opacity="0" left="0" top="0"></Input>
        {uploading ? <Spinner/> : <>
          <Icon h="48px" w="48px"><FaUpload/></Icon>
          <Text>Click to upload, or drag and drop</Text>
          <Text fontSize={"12px"}>PNG, JPG, or JPEG up to 2MB</Text>
        </>}
      </VStack> : <Flex wrap={"wrap"}>
          {media?.map((item, index) => <SelectedImage
              selected={selections.includes(index)}
              _selections={selections}
              onSelect={(v) => {
                console.log(v);
                if(v.length > 0) setDelete(true)
                else setDelete(false)
                setSelections(v);
              }}
              key={index}
              margin={"2px"}
              index={index}
              photo={{title: "", src: item, width: 1, height: 1}}
              left={0}
              top={0}
            />
          )}
      </Flex>
      }
    </Stack>
    {props.error && <Text color="red.500" textTransform={"capitalize"} style={{marginTop: "6px", marginLeft: 0}}>{props.error}</Text>}
    </FieldGroup>
  );
}