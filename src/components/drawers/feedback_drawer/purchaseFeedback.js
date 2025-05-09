import {feedbackPurchase, getfeedbackHistory} from '@/api/navbarMenu';
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import {useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import {BsArrowLeft} from 'react-icons/bs';
import {RiStarFill} from 'react-icons/ri';
import {CloseIcon} from '@chakra-ui/icons';
import MobileHeader from '@/components/navbar/mobile_header';
import {drawer_styles, drawer_title_styles} from '../styles';
import {Button} from '@/ui-lib';

const PurchaseFeedback = ({feedModal, equityId}) => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [screen, setScreen] = useState('');
  const toast = useToast();
  // const [isMobile] = useMediaQuery('(max-width:700px)');

  const submitFeedback = useMutation(formData => feedbackPurchase(formData, equityId), {
    onSuccess: async res => {
      toast({
        title: 'Success',
        description: `Thanks for your feedback!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      feedModal?.onClose();
    },
    onError: err => {
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
    const body = {
      feedback: message,
      rating: rating.toFixed(1),
    };
    return submitFeedback.mutate(body);
  };

  const handleResetModal = () => {
    setMessage('');
    setRating(0);
    submitFeedback.reset();
    feedModal.onClose();
  };

  const isValid = !!message.trim();

  return (
    <Drawer
      autoFocus={false}
      isCentered
      onCloseComplete={handleResetModal}
      blockScrollOnMount={true}
      onClose={feedModal?.onClose}
      isOpen={feedModal?.isOpen}
    >
      <DrawerOverlay />
      <DrawerContent {...drawer_styles}>
        <Box py="20px" h="full">
          <MobileHeader pt={0} onDrawerClose={feedModal.onClose} activePage="Give feedback" />
          <Flex {...drawer_title_styles} display={{base: 'none', md: 'flex'}}>
            <Text>Give Feedback</Text>
            <CloseIcon
              color="text"
              cursor="pointer"
              fontSize="14px"
              onClick={feedModal?.onClose}
              mt={2}
            />
          </Flex>

          <Stack justify="space-between" p={{base: '12px', md: '20px'}} h="full">
            <Box flex={`1`}>
              <Text
                color="text"
                fontSize={{base: '12px', md: '14px'}}
                fontWeight={500}
                textTransform="uppercase"
                letterSpacing="0.14px"
                mb="6px"
              >
                Rate your experience
              </Text>
              <Flex gap="4px">
                {Array.from([1, 2, 3, 4, 5]).map(index => (
                  <RiStarFill
                    fontSize={'28px'}
                    color={index + 1 <= rating ? '#FA6100' : '#E5E5E5'}
                    key={index}
                    onClick={() => setRating(index + 1)}
                  />
                ))}
              </Flex>
              <Text
                color="text"
                fontSize={{base: '12px', md: '14px'}}
                fontWeight={500}
                textTransform="uppercase"
                letterSpacing="0.14px"
                mb="6px"
                mt="25px"
              >
                Tell us more about it
              </Text>
              <Textarea
                color={'text'}
                onChange={e => setMessage(e.target.value)}
                value={message}
                resize="none"
                border="0.3px solid"
                borderColor="matador_border_color.100 !important"
                borderRadius={'5px'}
                w="full"
                rounded="12px"
                boxShadow="0px 1.333px 2.667px 0px rgba(16, 24, 40, 0.05)"
                h="100px"
                p="12px"
                _focus={{
                  outline: 'none',
                  borderColor: 'matador_border_color.100 !important',
                }}
                _hover={{
                  border: '0.3px solid',
                  borderColor: 'matador_border_color.100 !important',
                }}
                placeholder="Drop comment"
                fontSize="12px"
              />
            </Box>
            <Flex py={`20px`}>
              <Button
                variation={`primary`}
                isDisabled={!message}
                isLoading={submitFeedback.isLoading}
                onClick={handleSubmit}
                my={{base: '30px', '2xl': '0'}}
              >
                Submit
              </Button>
            </Flex>
          </Stack>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default PurchaseFeedback;
