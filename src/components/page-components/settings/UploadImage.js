import {Text, Stack, Image, useToast, HStack, Box, useMediaQuery} from '@chakra-ui/react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useCallback, useEffect, useState} from 'react';
import uploadIcon from '@/images/icons/uploadIcon.svg';
import fileIcon from '@/images/icons/fileIcon.svg';
import deleteIcon from '@/images/icons/deleteIcon.svg';
import {useDropzone} from 'react-dropzone';
import {encodeFileToBase64} from '@/utils/convertTo64';
import {Spinner} from '@/ui-lib/ui-lib.components/Spinner';

const UploadImage = ({handleDocument, documentsData, isLoading, isError}) => {
  const [progress, setProgress] = useState(0);
  const extractBase64 = arr => arr.map(file => file.image);
  const [files, setFiles] = useState([]);
  const toast = useToast();
  const [isMobile] = useMediaQuery('(max-width: 767px)');
  const {getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections} = useDropzone({
    accept: {'image/*': []},
    maxSize: 2 * 1024 * 1024,
    multiple: false,
    onDrop: useCallback(acceptedFiles => {
      acceptedFiles.forEach(file =>
        encodeFileToBase64(file).then(res => {
          setFiles(prevValue => [
            ...prevValue,
            Object.assign({image: res}, file, {
              preview: URL.createObjectURL(file),
              size: file.size,
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

  const formik = useFormik({
    initialValues: {
      validID: null,
    },
    validationSchema: Yup.object({
      validID: Yup.mixed().required('Required'),
    }),
    onSubmit: values => {
      const formData = new FormData();
      formData.append('validID', values.validID);
      mutation.mutate(formData);
    },
  });

  const removeFile = () => {
    setFiles([]);
  };

  return (
    <>
      {documentsData ? (
        <HStack
          align="center"
          justify="space-between"
          bg="background.1"
          border="1px solid"
          borderColor="custom_color.color_pop"
          p="13.438px 20.156px"
          rounded="56px"
          maxH="75px"
          maxW="430px"
          w="full"
          cursor="pointer"
        >
          <HStack gap="16px" align="start">
            <Image src={fileIcon.src} alt="" boxSize="30px" />
            <Stack gap={0} color="text.3">
              <Text letterSpacing="0.6px" fontSize="14px">
                {documentsData?.document_name ?? '-'}
              </Text>
              <Text fontWeight={300} letterSpacing="0.2px" fontSize="14px">
                {documentsData?.document_size ?? '-'}
              </Text>
            </Stack>
          </HStack>

          <Image src={deleteIcon.src} alt="" boxSize="20px" />
        </HStack>
      ) : files.length ? (
        <HStack
          align="center"
          justify="space-between"
          bg={isError ? '#FFFBFA' : 'background.1'}
          border={isError ? '0.84px solid' : '1px solid'}
          borderColor={isError ? '#FDA29B' : 'custom_color.color_pop'}
          p="13.438px 20.156px"
          rounded="56px"
          maxH="75px"
          maxW="430px"
          w="full"
        >
          <HStack gap="16px" align="start">
            <Image src={fileIcon.src} alt="" boxSize="30px" />
            <Stack gap={0} color="text.3">
              <Text color={isError ? '#B42318' : 'text.3'} letterSpacing="0.6px" fontSize="14px">
                {files?.[0]?.path}
              </Text>
              <Text
                color={isError ? '#D92D20' : 'text.3'}
                fontWeight={isError ? 600 : 300}
                letterSpacing="0.2px"
                fontSize="14px"
              >
                {isError ? 'Try Again' : formatFileSize(files?.[0]?.size)}
              </Text>
            </Stack>
          </HStack>
          <Box cursor={!isLoading && 'pointer'} onClick={!isLoading ? () => removeFile() : null}>
            {isLoading ? (
              <Spinner noAbsolute size={isMobile ? '20px' : '40px'} />
            ) : (
              <Image src={deleteIcon.src} alt="" boxSize="20px" />
            )}
          </Box>
        </HStack>
      ) : (
        <Stack
          align="center"
          justify="center"
          bg="background.1"
          border="1px solid"
          borderColor="border.1"
          p="13.438px 20.156px"
          rounded="56px"
          maxH="75px"
          maxW="430px"
          w="full"
          cursor="pointer"
          {...getRootProps({className: 'dropzone'})}
        >
          <Image src={uploadIcon.src} alt="" boxSize="30px" />
          {isDragActive ? (
            <Text fontSize="14px">Drop the files here...</Text>
          ) : (
            <Text fontSize="14px">
              Upload Valid ID{' '}
              <Text as="span" fontSize="12px" color="custom_color.color_pop" fontWeight={600}>
                Click to upload
              </Text>
            </Text>
          )}
          <input {...getInputProps()} />
        </Stack>
      )}
    </>
  );
};

export default UploadImage;

function formatFileSize(fileSizeInBytes) {
  if (fileSizeInBytes < 1024) {
    return `${fileSizeInBytes} bytes`;
  } else if (fileSizeInBytes < 1024 * 1024) {
    const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2);
    return `${fileSizeInKB} KB`;
  } else {
    const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
    return `${fileSizeInMB} MB`;
  }
}
