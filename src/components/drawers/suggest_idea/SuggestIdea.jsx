import React, {useState} from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Flex,
  Text,
  Box,
  Image,
  Center,
  Textarea,
  useToast,
  HStack,
  Stack,
} from '@chakra-ui/react';
import processingLoader from '@/images/processing-transaction.gif';
import successfulLoader from '@/images/successful-transaction.gif';
import {ChevronLeftIcon, CloseIcon} from '@chakra-ui/icons';
import {useMutation} from 'react-query';
import {suggestAFeature} from '@/api/navbarMenu';
import UploadImages from '../uploadImages';
import {Button} from '@/ui-lib/ui-lib.components/Button';
import MobileHeader from '@/components/navbar/mobile_header';
import {drawer_styles, drawer_title_styles} from '../styles';

export const scrollBarStyles = {
  '&::-webkit-scrollbar': {
    width: '4px',
    marginRight: '10px',
  },
  '&::-webkit-scrollbar-track': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'transparent',
    borderRadius: '24px',
  },
};

export const SuggestIdea = ({suggestModal, onDrawerOpen}) => {
  const [message, setMessage] = useState('');
  const toast = useToast();
  const [document, setDocument] = useState([]);

  const suggestMutation = useMutation(suggestAFeature, {
    onSuccess: async res => {},
    onError: err => {
      console.log('err', err);
      toast({
        title: 'Oops...',
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.response?.data[0] ??
          'Something went wrong'
        }`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleSubmit = () => {
    if (!isValid)
      return toast({
        description: `Please leave a comment`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    const image = document.map(item => item?.image.replace('data:', '').replace(/^.+,/, ''));
    const body = {image, message, error: ''};
    return suggestMutation.mutate(body);
  };

  const handleResetModal = () => {
    setMessage('');
    setDocument([]);
    suggestMutation.reset();
    suggestModal.onClose();
  };

  const isValid = !!message.trim();

  return (
    <Drawer
      autoFocus={false}
      isCentered
      onCloseComplete={handleResetModal}
      blockScrollOnMount={true}
      onClose={suggestModal?.onClose}
      isOpen={suggestModal?.isOpen}
    >
      <DrawerOverlay />
      <DrawerContent {...drawer_styles}>
        <MobileHeader
          onDrawerOpen={onDrawerOpen}
          onDrawerClose={suggestModal.onClose}
          activePage="Suggest an Idea"
        />
        <Flex {...drawer_title_styles}>
          <Text>SUGGEST AN IDEA</Text>
          <CloseIcon
            color={'text.1'}
            cursor="pointer"
            fontSize="14px"
            onClick={suggestModal?.onClose}
          />
        </Flex>

        <Box overflowY={'auto'} css={scrollBarStyles} h="full">
          {suggestMutation.isSuccess ? (
            <Center
              px="30px"
              mt="5px"
              w="full"
              h="full"
              flexDirection={'column'}
              textAlign={'center'}
            >
              <Image alt="success" w="150px" h="150px" src={successfulLoader.src} mx="auto" />
              <Text color={'text.1'} fontWeight={500} fontSize={'28px'} my="25px">
                Thank you
              </Text>
              <Text color={'text.1'} fontSize={'16px'} fontWeight="400">
                Our technical team will review and get back to you as soon as possible
              </Text>
              <Button
                fontWeight="500"
                disabled={suggestMutation.isLoading}
                loading={suggestMutation.isLoading}
                onClick={handleResetModal}
                variation={`primary`}
              >
                OK
              </Button>
            </Center>
          ) : suggestMutation.isLoading ? (
            <Center mt="5px" w="full" h="full" flexDirection={'column'}>
              <Image alt="success" w="150px" h="150px" src={processingLoader.src} mx="auto" />
              <Text
                color={'text.1'}
                fontWeight={500}
                fontSize={'28px'}
                my="25px"
                className="gilda-display-regular"
              >
                Sending feedback
              </Text>
              <Text color={'text.1'} fontSize={'16px'} fontWeight="400">
                Wait a moment
              </Text>
            </Center>
          ) : (
            <Stack p="16px" justify={'space-between'} h="full">
              <Stack gap="16px">
                <Text
                  fontSize={{base: '12px', md: '12px'}}
                  lineHeight="16.8px"
                  letterSpacing="0.12px"
                  fontWeight={400}
                  color="text"
                >
                  {`Got any fresh ideas you'd like to see in our app? We're always looking to improve
                  and would love to hear your suggestions!`}
                </Text>
                <Box>
                  <Text
                    fontSize={{base: '12px', md: '14px'}}
                    fontWeight={500}
                    color="text.1"
                    mt="14px"
                  >
                    LEAVE A COMMENT
                  </Text>
                  <Textarea
                    borderRadius="12px"
                    mt="8px"
                    p="12px"
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                    w="full"
                    resize="none"
                    h="100px"
                    outline={'none !important'}
                    placeholder="Drop comment"
                    _focusVisible={{
                      border: '0.3px solid',
                      borderColor: `matador_border_color.100 !important`,
                      outline: 'none !important',
                    }}
                    border="0.3px solid "
                    borderColor={`matador_border_color.100 !important`}
                    bg="transparent"
                    autoFocus={false}
                    fontSize="12px"
                  />
                </Box>

                <Box>
                  <Text
                    fontSize={{base: '12px', md: '14px'}}
                    fontWeight={500}
                    color="text.1"
                    mt="14px"
                    mb="5px"
                  >
                    UPLOAD IMAGE
                  </Text>
                  <UploadImages
                    maxFiles={5}
                    id="document"
                    name="document"
                    files={document}
                    setFiles={setDocument}
                    lable={'Upload image'}
                    message="Upload image"
                    border={'0.3px solid'}
                    borderColor={`matador_border_color.100 !important`}
                    w="full"
                    h="80px"
                    mt={0}
                  />
                </Box>
              </Stack>

              <Button
                fontWeight="500"
                isDisabled={!message}
                loading={suggestMutation.isLoading}
                onClick={handleSubmit}
                // mb="64px"
                // fontSize={'14px'}
                variation={`primary`}
              >
                Submit
              </Button>
            </Stack>
          )}
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default SuggestIdea;
