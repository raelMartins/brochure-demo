import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Input,
  Image,
  Link,
  Select,
  Stack,
  Text,
  useDisclosure,
  Textarea,
} from '@chakra-ui/react';
import UploadDocIcon from '../assets/uploadDocIcon';
import ImageIcon from '../assets/imageIcon';
import TrashIcon from '../assets/trashIcon';
import {FileUpload} from '@/ui-lib/ui-lib.components/fileUpload';
import {useRef, useState} from 'react';

const RealtorSecondRegistrationForm = ({formik, isLoading, handleScreen}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const inputRef = useRef(null);

  const handleFileSelection = fileObj => {
    const base64 = fileObj?.base64;
    // ?.replace('data:', '').replace(/^.+,/, '');

    const file = fileObj?.selectedFile;
    const error = fileObj?.error;
    formik.setFieldValue('document', base64);

    setFile(file);
    setError(error);
  };

  const handleClearSelectedFile = () => {
    setFile(null);
    formik.setFieldValue('document', '');

    setError(null);
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  const displayFileSize = size => {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    let index = 0;

    while (size >= 1024 && index < units.length - 1) {
      size /= 1024;
      index++;
    }

    return `${size.toFixed(2)} ${units[index]}`;
  };

  const isValid = !formik.errors.address && !formik.errors.document && !error;
  return (
    <Center
      h={{base: 'full', md: 'initial'}}
      alignItems={{base: 'start', md: 'initial'}}
      mt={{base: '0px', md: '3.8vh'}}
    >
      <Stack // spacing="26.67px"
        w="full"
        // pt={{ base: "0px", md: "62px" }}
        pb="30px"
        bg="#fff"
        maxW="533.333px"
      >
        <Stack
          w="full"
          as="form"
          onSubmit={formik.handleSubmit}
          spacing={{base: '24px', md: '20px'}}
        >
          <Stack spacing="16px" w="full">
            <Stack
              role="button"
              border="1px solid"
              borderColor={file ? '#FA6400' : error ? '#FDA29B' : '#D6D6D6'}
              w="full"
              h={{base: '48px', md: '60px'}}
              p="13.438px "
              bg={error ? '#FFFBFA' : 'transparent'}
              borderRadius="24px"
              justify="center"
              pos="relative"
            >
              {file && !error ? null : (
                <FileUpload
                  inputRef={inputRef}
                  accept="image/*"
                  onFileSelect={handleFileSelection}
                />
              )}
              {!file && !error ? (
                <Stack w="full" spacing="none">
                  <Box
                    alignSelf="center"
                    p="6px"
                    w="fit-content"
                    borderRadius="100%"
                    bg="rgba(250, 100, 0, 0.1)"
                  >
                    <UploadDocIcon />
                  </Box>
                  <HStack alignSelf="center" spacing="3.36px">
                    <Text fontSize="12px" fontWeight="400" color="#525252">
                      Upload Valid ID
                    </Text>
                    <Text color="rgba(250, 100, 0, 1)" fontSize="10px" fontWeight="600">
                      Click to upload
                    </Text>
                  </HStack>
                </Stack>
              ) : (
                <HStack w="full" justify="space-between">
                  <HStack spacing="11.76px">
                    <Box borderRadius="full" bg={error ? '#FEE4E2' : '#FA64001A'} p=" 6.719px">
                      <ImageIcon />
                    </Box>
                    <Stack spacing="none">
                      <Text color={error ? '#B42318' : 'text.3'} fontSize="12px" fontWeight="400">
                        {file?.name}
                      </Text>
                      <Text
                        color={error ? '#D92D20' : '#525252'}
                        fontSize="12px"
                        fontWeight={error ? '600' : '300'}
                      >
                        {error ? 'Try Again' : displayFileSize(file?.size)}
                      </Text>
                    </Stack>
                  </HStack>
                  {file && !error ? (
                    <TrashIcon role="button" onClick={handleClearSelectedFile} />
                  ) : null}
                </HStack>
              )}
            </Stack>
          </Stack>
          <Input
            w="full"
            type="text"
            id="company_name"
            name="company_name"
            onChange={formik.handleChange}
            value={formik.values.company_name}
            h={{base: '48px', md: '60px'}}
            fontSize="16px"
            fontWeight="400"
            p="13.333px 18.667px"
            border="1px solid #D6D6D6"
            _focus={{
              boxShadow: 'transparent',
              outline: 'none',
            }}
            _active={{
              boxShadow: 'transparent',
              outline: 'none',
            }}
            _focusVisible={{
              boxShadow: 'transparent',
              outline: 'none',
            }}
            borderRadius="24px"
            placeholder="Company's Name (optional)"
            _placeholder={{
              color: '#737373',
            }}
            color="#141414"
          />

          <Textarea
            w="full"
            type="text"
            h="100px"
            resize="none"
            id="company_address"
            name="company_address"
            onChange={formik.handleChange}
            value={formik.values.company_address}
            p="18px"
            border="1px solid #D6D6D6"
            _focus={{
              boxShadow: 'transparent',
              outline: 'none',
            }}
            _active={{
              boxShadow: 'transparent',
              outline: 'none',
            }}
            _focusVisible={{
              boxShadow: 'transparent',
              outline: 'none',
            }}
            borderRadius={{base: '12px', md: '24px'}}
            placeholder="Company's Address (optional)"
            _placeholder={{
              color: '#737373',
            }}
            color="#141414"
          />

          <Textarea
            w="full"
            type="text"
            h="100px"
            id="address"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
            onBlur={formik.handleBlur}
            resize="none"
            p="18px"
            border="1px solid #D6D6D6"
            _focus={{
              boxShadow: 'transparent',
              outline: 'none',
            }}
            _active={{
              boxShadow: 'transparent',
              outline: 'none',
            }}
            _focusVisible={{
              boxShadow: 'transparent',
              outline: 'none',
            }}
            borderRadius={{base: '12px', md: '24px'}}
            placeholder="Residential Address"
            _placeholder={{
              color: '#737373',
            }}
            color="#141414"
          />

          <Button
            h={{base: '48px', md: '60px'}}
            color="#fff"
            type="submit"
            border="none"
            bg="#FA6400"
            fontWeight="400"
            fontSize="16px"
            cursor="pointer"
            borderRadius="56.25px"
            transition="0.3s ease-in-out"
            _hover={{
              bg: '#E35B00',
            }}
            isLoading={isLoading}
            isDisabled={!isValid}
            _active={{
              bg: '#E35B00',
            }}
          >
            Proceed
          </Button>
        </Stack>
      </Stack>
    </Center>
  );
};

export default RealtorSecondRegistrationForm;
