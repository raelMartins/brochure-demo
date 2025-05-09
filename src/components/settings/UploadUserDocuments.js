import {Box, Center, Flex, HStack, Stack, Text, useToast, VStack} from '@chakra-ui/react';
import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {encodeFileToBase64} from '@/utils';
import {Button, Spinner} from '@/ui-lib';
import {appCurrentTheme} from '@/utils/localStorage';
import {LIGHT} from '@/constants/names';
import {settings_input_field_style} from '.';
import {FiUploadCloud} from 'react-icons/fi';
import {LuImage} from 'react-icons/lu';

export const UploadUserDocuments = ({
  handleDocument,
  doc,
  loading,
  uploading,
  displayText,
  isDisabled = false,
  type,
}) => {
  const extractBase64 = arr => arr.map(file => file.image);
  const [files, setFiles] = useState([]);
  const toast = useToast();

  const {getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections} = useDropzone({
    accept: {'image/*': [], 'application/pdf': []},
    // accept: type === `utility_bill` ? {'image/*': [], 'application/pdf': []} : {'image/*': []},
    maxSize: 2 * 1024 * 1024,
    disabled: isDisabled,
    multiple: false,
    onDrop: useCallback(acceptedFiles => {
      acceptedFiles.forEach(file =>
        encodeFileToBase64(file).then(res => {
          setFiles(prevValue => [
            ...prevValue,
            Object.assign({image: res}, file, {
              preview: URL.createObjectURL(file),
            }),
          ]);
        })
      );
    }),
  });

  useEffect(() => {
    if (fileRejections.length) {
      toast({
        description: `${fileRejections[0].errors[0].code}: file is larger than 2MB`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [fileRejections, acceptedFiles]);

  useEffect(() => {
    if (files.length) {
      handleDocument(extractBase64(files));
    }
  }, [files]);

  useEffect(() => {
    return () => files && files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  const toDateFormat = dateString => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <Flex
      {...settings_input_field_style}
      w="full"
      // p="11.5px 16px"
      align={'center'}
      gap="7px"
      justify="space-between"
      {...getRootProps({className: 'dropzone'})}
    >
      <input {...getInputProps()} disabled={isDisabled} />
      {/* 
      {isDragActive ? (
        <Text letterSpacing="0.52px" fontWeight={500} fontSize={13}>
          Drop the files here ...
        </Text>
      ) : (
        <Text letterSpacing="0.52px" fontWeight={500} fontSize={13}>
          {displayText}
        </Text>
      )}
      <Text letterSpacing="0.52px" fontWeight={500} fontSize={13}>
        {displayText}
      </Text>
      <Button
        bg={'#919191'}
        color={'#fff'}
        borderRadius="4px"
        isDisabled={isDisabled}
        p={`4px 10px`}
        fontSize={`12px`}
        lineHeight={`140%`}
        fontWeight={`400`}
        h={`100%`}
      >
        Choose file
      </Button> */}
      {loading ? (
        <Center w={`100%`}>
          <Spinner noAbsolute height="25px" width="25px" />
        </Center>
      ) : uploading ? (
        <HStack gap={`10px`} w={`100%`}>
          <Center
            color={`custom_color.color_pop`}
            fontSize={`12px`}
            bg={`custom_color.opacity._10`}
            border={`1px solid`}
            borderColor={`custom_color.opacity._20`}
            boxSize={`24px`}
            borderRadius={`50%`}
            cursor={`pointer`}
          >
            <LuImage />
          </Center>

          <Text
            color={`matador_form.label`}
            gap={`0px`}
            fontSize={`12px`}
            fontWeight={`400`}
            lineHeight={`140%`}
            letterSpacing={`0.12px`}
          >
            Uploading File
          </Text>
          <Center ml={`auto`}>
            <Spinner noAbsolute height="20px" width="20px" />
          </Center>
        </HStack>
      ) : doc && doc?.document && doc?.created_at ? (
        <HStack gap={`10px`}>
          <Center
            color={`custom_color.color_pop`}
            fontSize={`12px`}
            bg={`custom_color.opacity._10`}
            border={`1px solid`}
            borderColor={`custom_color.opacity._20`}
            boxSize={`24px`}
            borderRadius={`50%`}
            cursor={`pointer`}
          >
            <LuImage />
          </Center>
          <Stack
            gap={`0px`}
            fontSize={`12px`}
            fontWeight={`400`}
            lineHeight={`140%`}
            letterSpacing={`0.12px`}
          >
            <Text color={`matador_form.label`} textTransform={`capitalize`}>
              {type?.split(`_`)?.join(` `)} Uploaded
            </Text>
            <Text color={`custom_color.color_pop`} fontWeight={`300`}>
              Uploaded on {toDateFormat(doc?.created_at)}
            </Text>
          </Stack>
        </HStack>
      ) : (
        <VStack w={`100%`} gap={`2px`} cursor={`pointer`}>
          <Center
            color={`custom_color.color_pop`}
            fontSize={`12px`}
            bg={`custom_color.opacity._10`}
            border={`1px solid`}
            borderColor={`custom_color.opacity._20`}
            boxSize={`24px`}
            borderRadius={`50%`}
            cursor={`pointer`}
          >
            <FiUploadCloud />
          </Center>
          <Text
            textTransform={`capitalize`}
            color={`matador_form.label`}
            fontSize={`12px`}
            fontWeight={`400`}
            lineHeight={`140%`}
            letterSpacing={`0.12px`}
          >
            Upload Valid {type?.split(`_`)?.join(` `)}
            <Box
              as={`span`}
              color={`custom_color.color_pop`}
              fontSize={`10px`}
              fontWeight={`600`}
              letterSpacing={`0.101px`}
            >
              {' '}
              Click or drag to upload
            </Box>
          </Text>
        </VStack>
      )}
    </Flex>
  );
};

export default UploadUserDocuments;
