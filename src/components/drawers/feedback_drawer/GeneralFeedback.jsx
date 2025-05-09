'use client';

import {useEffect, useState} from 'react';
import {
  Text,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  Center,
  useDisclosure,
  Textarea,
  DrawerBody,
  DrawerFooter,
  Button,
  useToast,
  Box,
  Stack,
} from '@chakra-ui/react';
import {IoMdClose} from 'react-icons/io';
import {StarRating} from './StarRating';
import {useMutation} from 'react-query';
import {feedback} from '@/api/navbarMenu';
import MobileHeader from '@/components/navbar/mobile_header';
import {drawer_styles, drawer_title_styles} from '../styles';

export const GeneralFeedback = ({isFeedOpen, onFeedClose, onDrawerOpen}) => {
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  const disclosure = useDisclosure();

  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const toast = useToast();
  const submitFeedback = useMutation(feedback, {
    onSuccess: async res => {
      // await feedbackQuery.refetch();
      toast({
        title: 'Success',
        description: `Thanks for your feedback!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setRating(0);
      setMessage('');
      return onFeedClose();
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

  const isValid = !!message.trim() && rating > 0;

  return (
    <Drawer
      autoFocus={false}
      onClose={onFeedClose}
      isOpen={isFeedOpen}
      placement={screenWidth >= 768 ? 'left' : `right`}
    >
      <DrawerOverlay />
      <DrawerContent {...drawer_styles}>
        <MobileHeader
          pb="10px"
          onDrawerOpen={onDrawerOpen}
          onDrawerClose={onFeedClose}
          activePage={`General Feedback`}
        />
        <HStack {...drawer_title_styles}>
          <Text>Give Feedback</Text>
          <Center onClick={onFeedClose} cursor={`pointer`} fontSize={`20px`}>
            <IoMdClose />
          </Center>
        </HStack>
        <DrawerBody
          display={{base: `flex`}}
          flexDirection={`column`}
          h={`100%`}
          gap={{base: '12px'}}
          p={{base: `16px`}}
        >
          <Stack gap={`16px`}>
            <Text
              fontSize={`12px`}
              fontWeight={`400`}
              lineHeight={`16.8px`}
              letterSpacing={`0.01em`}
              textAlign={`left`}
            >
              Thank you for choosing us! We&apos;d love your feedback to help us enhance our
              service. Please share your thoughts with us!
            </Text>
            <Box as={Stack} gap={`8px`}>
              <Text
                fontSize={`14px`}
                fontWeight={`500`}
                lineHeight={`19.6px`}
                letterSpacing={`0.01em`}
                textAlign={`left`}
                textTransform={`uppercase`}
              >
                RATE OUR SERVICE
              </Text>
              <StarRating rating={rating} setRating={setRating} />
            </Box>
            <Text
              fontSize={`14px`}
              fontWeight={`500`}
              lineHeight={`19.6px`}
              letterSpacing={`0.01em`}
              textAlign={`left`}
              textTransform={`uppercase`}
            >
              LEAVE A COMMENT{' '}
            </Text>
            <Textarea
              width
              height={`100px`}
              padding={`12px`}
              gap={`10.67px`}
              borderRadius={`12px`}
              border={`1px solid`}
              borderColor={`matador_border_color.200`}
              boxShadow={`0px 1.33px 2.67px 0px #1018280D`}
              resize={`none`}
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </Stack>
        </DrawerBody>
        <DrawerFooter p={{base: '16px', lg: `24px 16px`}}>
          <Button
            isDisabled={submitFeedback?.isLoading || !isValid}
            isLoading={submitFeedback?.isLoading}
            onClick={handleSubmit}
            w="full"
            color="custom_color.contrast"
            bg="custom_color.color"
            h={`100%`}
            // maxH={`max-content`}
            p="13px"
            borderRadius={`56.25px`}
            _hover={{opacity: '1'}}
          >
            <Text fontSize={`16px`} fontWeight="400" lineHeight={`133%`} letterSpacing={`1%`}>
              Submit
            </Text>
          </Button>
        </DrawerFooter>{' '}
      </DrawerContent>
    </Drawer>
  );
};
