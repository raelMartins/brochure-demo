import React, {useState} from 'react';

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import suggestAnIdeaIcon from '@/realtors_portal/images/icons/suggestAnIdeaIcon.svg';

import {UploadImages} from './UploadLoadDocForNavBar';
import {toastForError} from '@/realtors_portal/utils/toastForErrors';
import {suggestAFeature} from '@/realtors_portal/api/navbarMenu';
import {useMutation} from 'react-query';
import useLocalStorage from '@/realtors_portal/utils//Hook/useLocalStorage';
import {CreateToast} from '@/realtors_portal/ui-lib';

export const SuggestAnIdea = () => {
  const modalDisclosure = useDisclosure();
  const [document, setDocument] = useState([]);
  const [message, setMessage] = useState('');
  const toast = useToast();
  const toaster = CreateToast();
  const [objOfkeyValues] = useLocalStorage(['userToken', 'businessId']);

  const handleClosedModal = () => {
    modalDisclosure.onClose();
    setDocument([]);
    return setMessage('');
  };

  const suggestAFeatureMutation = useMutation(
    formData => suggestAFeature(formData, objOfkeyValues?.businessId, objOfkeyValues?.userToken),
    {
      onSuccess: res => {
        toaster("Thank you for your suggestion! It's now in our review process.");
        handleClosedModal();
      },
      onError: err => {
        toastForError(err, true, toast);
      },
      retry: 0,
    }
  );

  const handleMessage = e => {
    return setMessage(e.target.value);
  };
  const handleSubmit = () => {
    const image = document.map(item => item?.image.replace('data:', '').replace(/^.+,/, ''));
    const body = {image, message};
    return suggestAFeatureMutation.mutate(body);
  };

  const isValid = message.trim() && document.length;
  return (
    <>
      <HStack
        onClick={modalDisclosure.onOpen}
        cursor="pointer"
        w="full"
        spacing="5px"
        px="14px"
        py="10px"
        maxH="50px"
        _hover={{
          bg: '#f5f5f5',
        }}
        align="center"
      >
        {/* <FaSignOutAlt size={"26px"} color="red" /> */}
        <Image src={suggestAnIdeaIcon.src} alt="log out icon" />
        <Text color="#000000" fontSize="12px" fontWeight="400">
          Suggest an idea
        </Text>
      </HStack>
      <Drawer
        isOpen={modalDisclosure.isOpen}
        onClose={handleClosedModal}
        px="40px"
        pt="37px"
        pb="27px"
        darkMode
        minW="648px"
        minH="592px"
        borderRadius="16px"
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />

        <DrawerContent
          fontFamily="Euclid Circular B "
          minW="400px"
          bg="#0D0D0D"
          py="39"
          pl="22.75px"
          pr="21.34px"
        >
          <HStack mb="20px" justify="space-between" align="center" position="relative">
            <Heading
              bg="#0D0D0D"
              p="0px"
              // border="1px solid #EAECF0"
              fontSize="16px"
              fontWeight="600"
              borderBottom="none"
              color="#ffffff"
            >
              Suggest an idea
            </Heading>
            <VStack
              position="relative"
              justify="center"
              align="center"
              w="30px"
              h="30px"
              borderRadius="5px"
              transition="0.3s ease-in-out"
              _hover={{
                background: '#ffffff',

                width: '30px',
                height: '30px',
              }}
            >
              <DrawerCloseButton
                right="0px"
                left="0px"
                _hover={{
                  color: '#0D0D0D',
                }}
                my="auto"
                top="0"
                color="#fff"
                bottom="0"
              />
            </VStack>
          </HStack>
          <DrawerBody p="0px">
            <Stack w="full" spacing="none">
              <Text fontSize="12px" maxW="336.673px" fontWeight="300" color="#fff">
                Do you have any new ideas or desired enhancements for our app.
              </Text>
              <Text
                textAlign="start"
                w="full"
                mt="30.52px"
                mb="4.44px"
                as="label"
                htmlFor="message"
                fontSize="11.222px"
                color="#fff"
                fontWeight="300"
              >
                Comment
              </Text>
              <Textarea
                // w="291px"
                py="6.41px"
                color="#fff"
                id="message"
                value={message}
                w="full"
                h="105px"
                fontSize={'14px'}
                resize="none"
                name="message"
                mb="10px"
                // value={formik.values.message}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                borderRadius="3.09px"
                bg="rgba(217, 217, 217, 0.10)"
                border="1px solid #747474"
                _focus={{
                  border: `0.5px solid #747474 !important`,
                }}
                _hover={{
                  border: `0.5px solid #747474 !important`,
                }}
                _focusVisible={{
                  border: `0.5px solid #747474 !important`,
                }}
                onChange={handleMessage}
              />
              <Text
                textAlign="start"
                mb="4.44px"
                color="#fff"
                as="label"
                htmlFor="uploadImage"
                w="full"
                fontSize="11.222px"
                fontWeight="300"
              >
                Upload image
              </Text>
              <UploadImages
                maxFiles={5}
                id="document"
                name="document"
                files={document}
                setFiles={setDocument}
                lable={'Upload image'}
                message="Upload image"
                border={'0.3px solid #DADADA'}
                w="full"
                h="90px"
              />
              <HStack w="full" justify="end">
                <Button
                  bg="#FFFFFF"
                  mt="19.9px"
                  _hover={{
                    opacity: '1',
                  }}
                  borderRadius="4px"
                  isDisabled={!isValid}
                  onClick={handleSubmit}
                  h="44.088px"
                  w="121.042px"
                  fontSize="12.826px"
                  fontWeight="400"
                  isLoading={suggestAFeatureMutation.isLoading}
                  color="#0D0D0D"
                >
                  Submit
                </Button>
              </HStack>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SuggestAnIdea;
