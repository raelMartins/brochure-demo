import {useState} from 'react';
import {
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  Box,
  Center,
  useClipboard,
  useToast,
  Spinner,
  Icon,
  Stack,
} from '@chakra-ui/react';
import {CheckIcon, CopyIcon, ArrowBackIcon, CloseIcon} from '@chakra-ui/icons';
import {BiPlus} from 'react-icons/bi';
import {useMutation, useQuery} from 'react-query';
import {fetchVirtualAccountNumber, makeeDepositToWallet} from '@/api/Wallet';
import {BUSINESS_ID, storeName, store_name} from '@/constants/routes';
import {formatToCurrency} from '@/utils';
import {RegularSpinner} from '@/ui-lib/ui-lib.components/Spinner/spinner';
import {fetchSavedCards, makePaymentWithSavedCard} from '@/api/payment';
import {BsExclamationCircle} from 'react-icons/bs';
import openExternalUrl from '@/utils/openExternalLink';
import EmptyState from '@/components/appState/empty-state';
import {FormInput} from '@/ui-lib/ui-lib.components/Input';
import {Button} from '@/ui-lib/ui-lib.components/Button';
import {IoIosArrowBack} from 'react-icons/io';
import {CheckBoxIcon} from '@/components/assets/WalletIcons';
import {useRouter} from 'next/navigation';
import cardEmptyIcon from '@/images/icons/cardEmptyState.svg';
import {MY_COUNTRY} from '@/constants/country';
import {drawer_title_styles} from '../styles';

export const DepositWallet = ({step, setStep, setPage, onWalClose}) => {
  const toast = useToast();
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const VIRTUAL_ACCOUNT_NUMBER = useQuery(['fetchVirtualAccountNumber'], fetchVirtualAccountNumber);
  const bankDetails = {
    bank_name: VIRTUAL_ACCOUNT_NUMBER?.data?.data?.data?.account_bank_name ?? '',
    account_number: VIRTUAL_ACCOUNT_NUMBER?.data?.data?.data?.account_number ?? '',
    account_name: VIRTUAL_ACCOUNT_NUMBER?.data?.data?.data?.account_name ?? '',
  };
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const {hasCopied, onCopy} = useClipboard(
    VIRTUAL_ACCOUNT_NUMBER?.data?.data?.data?.account_number
  );
  const [selectedCard, setSelectedCard] = useState(null);
  // VIRTUAL_ACCOUNT_NUMBER?.data?.data?.data?.data;

  const MAKE_DEPOSITS_MUTATION = useMutation(formData => makeeDepositToWallet(formData), {
    onSuccess: res => {
      const link = res?.data?.data?.data?.link;
      if (link) router.push(link, '_blank');
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

  const payWithSavedCardMutation = useMutation(formData => makePaymentWithSavedCard(formData), {
    onSuccess: res => {
      toast({
        title: 'Deposit successful👍🏻',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setPage('wallet');
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

  const {data: savedCards} = useQuery(['cardSaved'], fetchSavedCards);
  const storeName = store_name();

  const handleAddNewCard = () => {
    const body = {
      amount: Number(amount.replaceAll(',', '')),
      channel: 'card',
      store: storeName,
    };
    MAKE_DEPOSITS_MUTATION.mutate(body);
  };

  const showToast = () => {
    // toast({
    //   title: 'Account Number Copied!',
    //   status: 'info',
    //   duration: 1500,
    //   isClosable: true,
    //   position: 'top-right',
    // });
    return (
      <CopyIcon
        onClick={onCopy}
        fontSize={'25'}
        color="custom_color.color_pop"
        cursor="pointer"
        h={8}
        w={8}
      />
    );
  };

  const copy = () => {
    onCopy();
    toast({
      title: 'Account Number Copied!',
      status: 'info',
      duration: 1500,
      isClosable: true,
      position: 'top-right',
    });
  };

  const handleMakeDeposits = () => {
    if (!BUSINESS_ID) return;

    if (!selectedCard?.authorization_code)
      return toast({
        description: 'Please select a card',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });

    const paymentDetailsObj = {
      auth_code: selectedCard?.authorization_code,
      amount: Number(amount.replaceAll(',', '')),
      payment_data: {payment_type: 'wallet'},
      business_id: BUSINESS_ID(),
    };

    payWithSavedCardMutation.mutate(paymentDetailsObj);
  };

  const methods = [
    {
      id: 1,
      title: 'Debit Card',
      desc: 'Deposit limit 👉 NGN 3,000,000 ',
      //   icon: <CreditCardShieldSVG />,
      img: '/public/images/icons/deposit-icon.svg',
    },
    {
      id: 2,
      title: 'Bank Transfer',
      desc: 'Transfer into designated account',
      //   icon: <PaymentWithBankSVG />,
      // img: bank.src,
    },
  ];

  const handleSelect = () => {
    if (selectedMethod?.id === 1) {
      if (!amount) return setAmountError('Enter an amount to proceed');
      setStep('card');
      setSelectedMethod(null);
    } else if (selectedMethod?.id === 2) {
      setStep('bank');
      setSelectedMethod(null);
    } else {
      toast({
        title: 'Select a payment method',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleBack = () => {
    if (step !== 'method') setStep('method');
    else setPage('wallet');
  };

  const disabledOption = !selectedMethod || (selectedMethod?.id === 1 && !amount);

  const handleInput = e => {
    const formatNumber = parseInt(e.target?.value?.replace(/,/g, ''))?.toLocaleString();
    setAmountError('');
    if (formatNumber !== 'NaN') {
      setAmount(formatNumber);
    } else {
      setAmount('');
    }
  };

  const isSavedCardsAvailable = savedCards?.data?.results?.length > 0;

  return (
    <Stack
      position="relative"
      h="full"
      bg="background.2"
      overflowY={'scroll'}
      css={scrollBarStyles}
    >
      <Flex {...drawer_title_styles}>
        <HStack spacing="8px" onClick={handleBack} cursor="pointer">
          <IoIosArrowBack fontSize={'22px'} cursor="pointer" color="text" />
          <Text>{step === 'card' ? 'Deposit with card' : 'Deposit to wallet'}</Text>
        </HStack>
        <CloseIcon
          color="text"
          cursor="pointer"
          fontSize={'15px'}
          onClick={onWalClose}
          display={{base: 'none', md: 'flex'}}
        />
      </Flex>
      {step === 'method' && (
        <>
          <Stack mt="20px" w={'full'} px={6}>
            <FormInput
              leftAddon={
                <Text marginTop={{base: '.7rem', md: '1.3rem'}} color="text" fontSize={'20px'}>
                  {MY_COUNTRY.symbol}
                </Text>
              }
              label="Amount to deposit"
              onChange={handleInput}
              value={amount}
              error={amountError}
              h={{base: '48px', md: '60px'}}
              rounded="24px"
              labelStyle={{
                textTransform: 'uppercase',
                color: 'matador_text.300',
                letterSpacing: '.14px',
                fontWeight: '500',
              }}
              border="1px solid"
              borderColor={`matador_border_color.100`}
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
              _hover={{borderColor: `custom_color.color_pop`}}
              focusBorderColor="transparent"
              placeholder="0.00"
              bg="transparent"
            />
          </Stack>

          <Stack fontFamily={'Poppins'} justify="space-between" px={6} gap="12px">
            <Text mt="25px" color="matador_text.300" fontSize={{base: '11px', md: '13px'}}>
              Select Payment Method
            </Text>
            <VStack spacing={{base: '10px', md: '14px'}} align={'stretch'}>
              {methods.map(method => (
                <Flex
                  key={method.id}
                  justify="space-between"
                  onClick={() => setSelectedMethod(method)}
                  cursor="pointer"
                  gap="5px"
                  direction={'row'}
                  px={{base: '10px', md: '14px'}}
                  py={{base: '11px', md: '16px'}}
                  w="full"
                  border={'1px solid'}
                  borderColor={
                    selectedMethod?.id === method?.id
                      ? 'custom_color.color_pop'
                      : 'matador_border_color.100'
                  }
                  _hover={{border: '1px solid', borderColor: 'custom_color.color_pop'}}
                  bg="matador_background.300"
                  align="center"
                  rounded="12px"
                >
                  <HStack spacing={'14px'}>
                    {method.icon}
                    <VStack align={'stretch'} spacing={0}>
                      <Text
                        color="text"
                        fontSize={{base: '13px', md: '14px'}}
                        fontWeight={{base: '400', md: '600'}}
                      >
                        {method.title}
                      </Text>
                      <Text color="text" fontSize={{base: '13px', md: '14px'}} fontWeight={400}>
                        {method.desc}
                      </Text>
                    </VStack>
                  </HStack>
                  {selectedMethod?.id === method?.id ? (
                    <CheckBoxIcon />
                  ) : (
                    // <div />
                    <Center
                      w="16px"
                      h="16px"
                      borderRadius={'full'}
                      border="1px solid"
                      borderColor={'matador_border_color.100'}
                    />
                  )}
                </Flex>
              ))}
            </VStack>
            <Button
              variation={`primary`}
              isDisabled={disabledOption}
              onClick={handleSelect}
              h={{base: '44px', md: '50px'}}
              bottom="7.5%"
              left={{base: '3%', md: '6%'}}
              type="submit"
              position="absolute"
              borderRadius="24px"
              w={{base: '95vw', md: '350px'}}
            >
              Proceed
            </Button>
          </Stack>
        </>
      )}
      {step === 'card' && (
        <Stack px="24px" w="full">
          <Stack align="center" justify="center" py={4}>
            <FormInput
              leftAddon={
                <Text marginTop={{base: '0.25rem', md: '1rem'}} color="text" fontSize={'20px'}>
                  ₦
                </Text>
              }
              label="Amount to deposit"
              onChange={handleInput}
              value={amount}
              error={amountError}
              h={{base: '48px', md: '60px'}}
              rounded="24px"
              labelStyle={{
                textTransform: 'uppercase',
                color: 'matador_text.300',
                letterSpacing: '.14px',
                fontWeight: '500',
              }}
              border="1px solid"
              borderColor={`matador_border_color.100`}
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
              disabled
              _disabled={{
                color: 'text',
              }}
              focusBorderColor="transparent"
              placeholder="0.00"
              bg="transparent"
            />
          </Stack>

          <Box>
            <Text
              textTransform="uppercase"
              letterSpacing="0.14px"
              fontWeight={500}
              color="matador_text.300"
              mb={{base: '6px', md: '10px'}}
            >
              Select Card
            </Text>
            <VStack spacing="10px" mt="6px" align={'stretch'}>
              {savedCards?.data?.results?.length ? (
                <VStack spacing={{base: '6px', md: '10px'}} align={'stretch'}>
                  {savedCards?.data?.results?.map(card => (
                    <Flex
                      key={card?.id}
                      onClick={() => setSelectedCard(card)}
                      cursor="pointer"
                      gap="5px"
                      justify="space-between"
                      direction={'row'}
                      px={{base: '10px', md: '14px'}}
                      py={{base: '12px', md: '16px'}}
                      w="full"
                      p={{base: '12px', md: '16px'}}
                      border={'1px solid'}
                      borderColor={'matador_border_color.100'}
                      rounded="4px"
                      align="center"
                    >
                      <HStack spacing={{base: '10px', md: '14px'}}>
                        {/* <Image w={{base: '25px', md: 'auto'}} alt="next_image" src={cardImg.src} /> */}
                        <VStack align={'stretch'} spacing="8px">
                          <Text
                            fontSize={'14px'}
                            fontWeight={{base: '400', md: '500'}}
                            color="text.4"
                            letterSpacing="0.14px"
                          >
                            {card?.bank}
                          </Text>
                          <Text
                            fontSize={{base: '14px', md: '16px'}}
                            fontWeight={{base: '400', md: '500'}}
                            color="text"
                          >
                            **** **** {card?.last4}
                          </Text>
                        </VStack>
                      </HStack>

                      {selectedCard?.id === card?.id ? (
                        <CheckBoxIcon />
                      ) : (
                        // <div />
                        <Center
                          w="16px"
                          h="16px"
                          borderRadius={'full'}
                          border="1px solid"
                          borderColor={'matador_border_color.100'}
                        />
                      )}
                    </Flex>
                  ))}
                </VStack>
              ) : (
                <EmptyState
                  icon={<Image src={cardEmptyIcon.src} alt="no cards available" />}
                  text={
                    <Text fontSize={'12px'} fontWeight={400}>
                      No card added yet
                    </Text>
                  }
                  height={{base: '90px', md: '120px'}}
                />
              )}
            </VStack>

            <Stack
              gap="16px"
              mt="12px"
              position={'absolute'}
              bottom={'8%'}
              w="full"
              left={0}
              px={6}
            >
              {isSavedCardsAvailable && (
                <Button
                  variation={`primary`}
                  borderRadius="24px"
                  onClick={handleMakeDeposits}
                  isLoading={payWithSavedCardMutation?.isLoading}
                  mt={{base: '19px', lg: '36px'}}
                  w={{base: '300px', md: '350px'}}
                >
                  Proceed
                </Button>
              )}
              <Button
                variation={`tertiary`}
                fontWeight={400}
                alignSelf="center"
                borderRadius="24px"
                fontSize="14px"
                onClick={handleAddNewCard}
                disabled={MAKE_DEPOSITS_MUTATION?.isLoading}
                isLoading={MAKE_DEPOSITS_MUTATION?.isLoading}
                leftIcon={<BiPlus color="text" size={20} />}
                align="center"
              >
                {MAKE_DEPOSITS_MUTATION?.isLoading ? <Spinner /> : 'Add New Card'}
              </Button>
            </Stack>
          </Box>
        </Stack>
      )}
      {step === 'bank' && (
        <>
          {VIRTUAL_ACCOUNT_NUMBER.isLoading ? (
            <RegularSpinner />
          ) : (
            <Stack px={4}>
              <Box border="1px solid" borderColor={`matador_border_color.100`} mt="22px">
                <Flex
                  color="text"
                  direction={'column'}
                  p="22px"
                  w="full"
                  minH="260px"
                  fontSize={'14px'}
                  fontWeight={400}
                  justify={'space-between'}
                  align="stretch"
                  gap="23px"
                >
                  <Text fontSize={{base: '12px', md: '14px'}} fontWeight={500}>
                    To add funds to your wallet, simply transfer from your bank account using the
                    details provided below.
                  </Text>
                  <Box>
                    <Text
                      fontSize={{base: '12px', md: '14px'}}
                      fontWeight={500}
                      textAlign={'center'}
                      mb="11px"
                    >
                      Your wallet account number
                    </Text>
                    <Flex
                      bg="matador_background.300"
                      p="10px 35px"
                      justify={'space-between'}
                      align={'center'}
                      h="85px"
                    >
                      <Box color="text" textAlign={'center'} flex={1}>
                        <Text fontSize={{base: '12px', md: '14px'}} fontWeight={600}>
                          {bankDetails?.bank_name}
                        </Text>
                        <Text fontSize={{base: '20px', md: '26px'}} fontWeight={600}>
                          {bankDetails?.account_number}
                        </Text>
                      </Box>
                      {
                        <CopyIcon
                          onClick={copy}
                          fontSize={'10'}
                          color={hasCopied ? 'custom_color.color_pop' : 'text'}
                          cursor="pointer"
                          h={5}
                          w={5}
                        />
                      }
                    </Flex>
                    <Text
                      color="text"
                      fontSize={{base: '12px', md: '13px'}}
                      fontWeight={500}
                      textAlign={'center'}
                      mt="11px"
                    >
                      {bankDetails.account_name}
                    </Text>
                  </Box>
                  <Flex gap="5px" w="full">
                    <Icon mt="2px" color="text" as={BsExclamationCircle} fontSize={'13px'} />
                    <Text fontSize={12} fontWeight={400} color="matador_text.300">
                      While most transfers are processed almost immediately, please note that it may
                      take longer in some cases. Be rest assured that we will notify you via email
                      as soon as the transfer is complete.
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
};

export default DepositWallet;

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
