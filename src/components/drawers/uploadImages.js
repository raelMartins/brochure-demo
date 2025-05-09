import {Box, Flex, Icon, Image, Stack, Text, VStack, useToast, Center} from '@chakra-ui/react';
import React, {useCallback, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import {CloseIcon} from '@chakra-ui/icons';
import {FaPlus} from 'react-icons/fa';
import {UploadSettings} from '@/components/assets/UploadSettings';
import {encodeFileToBase64} from '@/utils/convertFileToBase64';

const UploadImages = props => {
  const {setFieldValue, files, setFiles, values, maxFiles, index, ...rest} = props;

  const toast = useToast();

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {'image/*': []},
    maxSize: 2 * 1024 * 1024,

    // maxFiles: maxFiles || 1,

    onDrop: useCallback(acceptedFiles => {
      console.log('acceptedFiles', acceptedFiles);
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  });
  const removeFile = index => {
    const copy = [...files];
    for (let i = 0; i < copy.length; i++) {
      if (i == index) {
        copy.splice(i, 1);
        i = copy.length;
      }
    }
    setFiles(copy);
  };

  useEffect(() => {
    if (files.length > maxFiles) {
      setFiles(files.slice(0, maxFiles));
      toast({
        description: `Sorry, you're limited to ${maxFiles} image uploads.`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [files, setFiles, toast, maxFiles]);

  const thumbs =
    files &&
    files?.slice(0, maxFiles)?.map((file, index) => (
      <Flex maxW="680px" wrap="flex-wrap" key={index} align="center" h="full">
        <Box pos="relative" h="full" pr="14.9px">
          <Center
            pos="absolute"
            right="50%"
            mx="0 auto"
            left="50%"
            transform="translateX(-50%)"
            zIndex={1000}
            bottom="0"
            cursor="pointer"
            bg="#d1d1d1"
            w="20px"
            h="20px"
            borderRadius="full"
            onClick={() => removeFile(index)}
          >
            <CloseIcon fontSize={8} />
          </Center>

          <Image
            alt="image preview"
            w="55px"
            maxW="55px"
            objectFit="cover"
            maxH="55px"
            h="55px"
            borderRadius="10px"
            src={file.preview}
            onLoad={() => {
              URL.revokeObjectURL(file.image);
            }}
          />
        </Box>
      </Flex>
    ));

  useEffect(() => {
    return () => files && files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Box
      h="120px"
      w="full"
      border="1px solid #D6D6D6"
      borderRadius="12px"
      display="flex"
      justifyContent="start"
      alignItems="center"
      flexWrap="wrap"
      overflowY="scroll"
      sx={customScrollbarStyles}
      {...rest}
    >
      {files && files.length > 0 ? (
        <Flex flexWrap="wrap" rowGap="20px" align={'center'} py="13px" px="20px">
          {thumbs}
          <input
            disabled={files.length >= maxFiles}
            // accept=".jpg, .png"
            accept="image/*"
            {...getInputProps()}
          />
          {files.length >= maxFiles ? null : (
            <div {...getRootProps({className: 'dropzone'})} style={{height: 'fit-content'}}>
              <Center cursor="pointer" bg="#d1d1d1" w="20px" h="20px" borderRadius="full">
                <FaPlus size={8} style={{cursor: 'pointer'}} />
              </Center>
            </div>
          )}
        </Flex>
      ) : (
        <VStack
          w="full"
          align="center"
          cursor="pointer"
          h="100%"
          spacing={6}
          justify="center"
          pos="relative"
          {...getRootProps({className: 'dropzone'})}
        >
          <input accept=".jpg, .png" {...getInputProps()} />

          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <Stack spacing="8px" align="center" mt={'0 !important'}>
              <UploadSettings />
              <Text w="full" textAlign="center" fontSize="12px" fontWeight="400" color="text.1">
                Upload Image
                <Text fontSize={'12px'} fontWeight={600} color="#FA6400" as="span">
                  {' '}
                  Click to upload
                </Text>
              </Text>
            </Stack>
          )}
        </VStack>
      )}
    </Box>
  );
};

export default UploadImages;
