import {Spinner} from '@/ui-lib/ui-lib.components/Spinner';
import {encodeFileToBase64} from '@/utils/convertTo64';
import {Avatar, Box, Flex, HStack, Image, Stack, Text} from '@chakra-ui/react';
import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

export const Profile = props => {
  const {profileData, setFiles, isAvatarLoading, ...restProps} = props;
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 1 || '',
    onDrop: useCallback(acceptedFiles => {
      acceptedFiles.forEach(file =>
        encodeFileToBase64(file)
          .then(res => {
            setFiles([Object.assign({image: res}, {preview: URL.createObjectURL(file)})]);
          })
          .catch(err => {
            return err;
          })
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  });

  return (
    <Flex
      borderRadius="8px"
      display="flex"
      maxW="1298px"
      w="full"
      alignItems="center"
      padding="16px 30px"
      border="1px solid"
      borderColor="border.1"
      justifyContent="space-between"
      bg={`background.1`}
      h="132px"
    >
      {isAvatarLoading ? (
        <Spinner noAbsolute />
      ) : (
        <>
          <HStack gap="16px" w="full">
            <Image
              rounded="full"
              objectFit="cover"
              src={profileData?.avatar}
              alt="avatar"
              boxSize={'80px'}
            />
            <Stack gap="4px">
              <Text fontSize="20px" fontWeight={500} color="text/1" textTransform="capitalize">
                {profileData?.first_name} {profileData?.last_name}
              </Text>
              <Text fontSize="14px" color="text.4">
                {profileData?.email}
              </Text>
            </Stack>
          </HStack>
          <Box cursor="pointer" {...getRootProps({className: 'dropzone'})}>
            <Image src="./images/icons/camera-icon.svg" boxSize={'48px'} alt="" />
          </Box>
          <input {...getInputProps()} />
        </>
      )}
    </Flex>
  );
};

export default Profile;
