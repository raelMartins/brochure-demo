import React from 'react';
import {HStack, Heading, Image, Stack, Text, useToast} from '@chakra-ui/react';
import {Box} from '@chakra-ui/react';
import AlertToastIcon from '@/components/assets/alertToastIcon';
import CancelForToast from '@/components/assets/cancelForToast';
import SuccessToastIcon from '@/components/assets/successToastIcon';

export const CreateToast = () => {
  const toast = useToast();
  const toastIdRef = React.useRef();

  const renderToastObj = ({title, description, status, error}) => {
    switch (status) {
      case 'error':
        return {
          icon: <AlertToastIcon />,
          text: title || 'An Error occurred',
          subText:
            description ||
            `${
              error?.response?.status === 500
                ? "Apologies for the inconvenience. We're working on it. Please try again later."
                : error?.response?.status === 401
                ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                : error?.response?.data?.message ??
                  error?.response?.message ??
                  error?.message ??
                  'Something went wrong'
            }`,
          primary: '#FFF5F3',
          secondary: '#F4B0A1',
          primaryLight: '#FFF5F3',
        };
      case 'success':
        return {
          icon: <SuccessToastIcon />,
          text: title,
          subText: description,
          primary: '#F6FFF9',
          secondary: '#48C1B5',
          primaryLight: '#F6FFF9',
        };

      default:
        return {
          icon: <AlertToastIcon />,
          text: title || 'An Error occurred',
          subText:
            description ||
            `${
              error?.response?.status === 500
                ? "Apologies for the inconvenience. We're working on it. Please try again later."
                : error?.response?.status === 401
                ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                : error?.response?.data?.message ??
                  error?.response?.message ??
                  error?.message ??
                  'Something went wrong'
            }`,
          primary: '#FFF5F3',
          secondary: '#F4B0A1',
          primaryLight: '#FFF5F3',
        };
    }
  };

  const close = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  };

  const addToast = ({description, error, title, status, ...toastPropObj}) =>
    (toastIdRef.current = toast({
      position: 'top-right',
      containerStyle: {
        color: renderToastObj({status}).primaryLight,
        p: '10px',
        bg: `${renderToastObj({status}).primary}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: '20px',
        // maxW: '343px',
        maxW: '416px',
        w: 'full',
        borderRadius: '12px',

        borderWidth: '1px',
        borderColor: `${renderToastObj({status}).secondary}`,
      },
      duration: 8000,
      render: () => (
        <Box position="relative" w="full">
          <HStack alignItems="start" spacing="16px">
            {renderToastObj({status}).icon}
            <Stack spacing="4px">
              <Text fontSize="16px" fontWeight="600" color="#27303A">
                {renderToastObj({title, status}).text}{' '}
              </Text>
              <Text fontSize="12px" fontWeight="400" color="#2F3F53">
                {renderToastObj({error, description, status}).subText}
              </Text>
            </Stack>
          </HStack>

          {/* <Box position="absolute" onClick={close} top="6px" right="16px">

              <CancelIcon baseColor={renderToastObj().secondary} />
            </Box> */}
          <CancelForToast cursor="pointer" position="absolute" onClick={close} top="0" right="0" />
        </Box>
      ),
      title,
      description,
      status,
      ...toastPropObj,
    }));
  return addToast;
};
