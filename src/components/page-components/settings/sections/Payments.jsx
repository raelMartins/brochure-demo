import React, {useState} from 'react';
import {
  Box,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  useToast,
  Spinner as ChakraSpinner,
  Center,
  useMediaQuery,
  Stack,
} from '@chakra-ui/react';

import {useMutation, useQuery} from 'react-query';
import deleteIcon from '@/images/icons/settingsDeleteIcon.svg';
import {BiPlus} from 'react-icons/bi';
import {themeStyles} from '@/theme';
import {Spinner} from '@/ui-lib';
import {Button} from '@/ui-lib/ui-lib.components/Button';
import EmptyState from '@/components/appState/empty-state';
import {RemoveBankAccount} from '@/api/Settings';
import {makeeDepositToWallet} from '@/api/Wallet';
import {storeName} from '@/constants/routes';
import {fetchSavedCards} from '@/api/payment';
import {useRouter} from 'next/navigation';
// import {DebitCardSVG} from '../../../components/assets/svgs';

export const PaymentMethod = () => {
  const toast = useToast();
  const route = useRouter();
  const {data, isLoading: fetchingCard, refetch} = useQuery(['cardSaved'], fetchSavedCards);

  const {mutate: removeCardMutate, isLoading: removingCard} = useMutation(
    values => RemoveBankAccount(values),
    {
      onSuccess: async res => {
        toast({
          description: `Account removed successfully`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });

        await refetch();
      },
      onError: err => {
        toast({
          title: err?.message === 'Network Error' ? 'Network Error' : 'Oops something went wrong',
          description: `${err?.response?.data?.message ?? 'please check your network connection'}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );
  const MAKE_DEPOSITS_MUTATION = useMutation(formData => makeeDepositToWallet(formData), {
    onSuccess: res => {
      const link = res?.data?.data?.data?.link;
      if (link) {
        route.push(link, '_blank');
      }
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

  const handleRemove = id => {
    removeCardMutate(id);
  };

  const handleMakeDeposits = () => {
    const body = {
      amount: 50,
      channel: 'card',
      store: storeName,
    };
    MAKE_DEPOSITS_MUTATION.mutate(body);
  };

  const [isNotMobile] = useMediaQuery('(min-width: 768px)');
  return (
    <Stack
      w="full"
      py={{base: '18px'}}
      borderRadius={'2px'}
      px={{base: '15px', md: '8px'}}
      border={{md: '1px solid #EAECF0}'}}
      boxShadow={
        isNotMobile
          ? '0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)'
          : 'none'
      }
      flex={1}
    >
      <Text
        color="#000"
        fontSize="16px"
        fontStyle="normal"
        fontWeight="500"
        letterSpacing="0.16px"
        textTransform={'uppercase'}
      >
        Payment Methods
      </Text>

      {fetchingCard ? (
        <Center w="full" h="30vh">
          <Spinner noAbsolute />
        </Center>
      ) : (
        <VStack spacing="6px" align={'stretch'} mt={{base: '10px', md: '24px'}}>
          {data?.data?.results?.length ? (
            <>
              {data?.data?.results.map((card, index) => (
                <Flex
                  key={card?.id}
                  direction={'row'}
                  p="24px"
                  cursor="pointer"
                  justify="space-between"
                  border="1px solid"
                  borderColor="border.1"
                  align="center"
                  bg="background.1"
                  w="full"
                  maxW="422px"
                >
                  <HStack spacing={'14px'}>
                    <VStack align={'stretch'} spacing={'8px'}>
                      <Text letterSpacing="0.14px" fontSize="14px" color="text.3">
                        Debit Card
                      </Text>
                      <HStack fontWeight={500}>
                        <Text color="text.1">{card?.bank}</Text>
                        <Text letterSpacing="0.16px" color="text.1">
                          **** **** {card?.last4}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  {removingCard ? (
                    <Spinner noAbsolute />
                  ) : (
                    <Image
                      onClick={() => handleRemove(card.id)}
                      cursor="pointer"
                      _disabled={removingCard}
                      src={deleteIcon.src}
                      alt=""
                    />
                  )}
                </Flex>
              ))}
              <Flex
                w="full"
                direction={'row'}
                mt={{base: '60px !important', md: '24px !important'}}
                justify={'flex-end'}
                align={'end'}
              >
                <Button
                  onClick={handleMakeDeposits}
                  fontWeight="500"
                  color="white"
                  leftIcon={<BiPlus color="#FFFFFF" size={20} />}
                  mx="auto"
                  borderRadius={{base: '8px', md: '24px'}}
                  bg="#FA6400"
                  w={{base: 'full', md: '225px'}}
                  fontSize={16}
                  h="48px"
                >
                  {MAKE_DEPOSITS_MUTATION?.isLoading ? <ChakraSpinner /> : 'Add Card'}
                </Button>
              </Flex>
            </>
          ) : (
            <Center w="full" flexDirection={'column'} mt={{base: '0px', md: '24px'}}>
              <EmptyState
                gap={0}
                icon
                text={'No card added yet'}
                height={{base: '150px', md: 'unset'}}
                mb={0}
              />
              <Button
                h="56px"
                mx="auto"
                bg="#FA6400"
                color="white"
                fontSize={16}
                fontWeight="400"
                borderRadius="56px"
                onClick={handleMakeDeposits}
                w={{base: '80%', md: '160px'}}
                leftIcon={<BiPlus color="#FFFFFF" size={20} />}
              >
                {MAKE_DEPOSITS_MUTATION?.isLoading ? <ChakraSpinner /> : 'Add Card'}
              </Button>
            </Center>
          )}
        </VStack>
      )}
    </Stack>
  );
};

export default PaymentMethod;
