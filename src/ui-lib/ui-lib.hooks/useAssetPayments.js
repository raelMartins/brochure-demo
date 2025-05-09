import {useEffect, useRef, useState} from 'react';
import {Flex, Image, useToast, VStack, Text} from '@chakra-ui/react';
import {useMutation} from 'react-query';
import {makeEquityDeposit, makeEquityPayment} from '../../api/payment';
import {BUSINESS_ID, STORE__DOMAIN, storeName} from '../../constants/routes';
import openExternalUrl from '../../utils/openExternalLink';
import useLocalStorage from '../../utils/hooks/useLocalStorage';
import loadingImg from '@/images/bank-transfer-loading.gif';
import ErrorIcon from '@/components/assets/errorIcon';
import SuccessIcon from '@/components/assets/successIcon';

export const useAssetPayment = ({
  paymentType,
  amountToPay,
  modal,
  paymentDetails,
  onSuccessful,
  refetch,
  auth_code,
}) => {
  const toast = useToast();
  const [authUrl, setAuthUrl] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState('index');
  const [trasferDetails, setTransferDetails] = useState(null);
  const [business_id] = useLocalStorage('businessId');

  const toastIdRef = useRef();

  const closeToast = () => {
    if (toastIdRef.current) toast.close(toastIdRef.current);
    // toast.closeAll();
  };

  const updateToastForError = () => {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, {
        duration: 5000,
        render: () => (
          <Flex
            w="full"
            p="20px"
            gap="16px"
            borderRadius="12px"
            minH="80px"
            bg="#FFF5F3"
            border="1px solid #F4B0A1"
          >
            <ErrorIcon />
            <VStack align={'stretch'}>
              <Text fontSize={'14px'} fontWeight={600} color="#27303A" lineHeight={'140%'}>
                Error occurred
              </Text>
              <Text fontSize={'12px'} fontWeight={400} color="#2F3F53" lineHeight={'140%'}>
                Sorry, please try again later.
              </Text>
            </VStack>
          </Flex>
        ),
      });
    }
  };
  const updateToastForSuccess = () => {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, {
        duration: 5000,
        render: () => (
          <Flex
            w="full"
            p="20px"
            gap="16px"
            borderRadius="12px"
            minH="80px"
            bg="#F6FFF9"
            border="1px solid #48C1B5"
          >
            <SuccessIcon />
            <VStack align={'stretch'}>
              <Text fontSize={'14px'} fontWeight={600} color="#27303A" lineHeight={'140%'}>
                Transaction Successful
              </Text>
              <Text fontSize={'12px'} fontWeight={400} color="#2F3F53" lineHeight={'140%'}>
                Your payment has been successfully processed
              </Text>
            </VStack>
          </Flex>
        ),
      });
    }
  };

  const addToast = () => {
    toastIdRef.current = toast({
      position: 'top-right',
      duration: null,
      render: () => (
        <Flex
          w="full"
          p="20px"
          gap="16px"
          borderRadius="12px"
          minH="80px"
          bg="#FFF8EC"
          border="1px solid #F7D9A4"
        >
          <Image alt="loader" w="48px" h="48px" src={loadingImg.src} />
          <VStack align={'stretch'}>
            <Text fontSize={'14px'} fontWeight={600} color="#27303A" lineHeight={'140%'}>
              Processing Transaction
            </Text>
            <Text fontSize={'12px'} fontWeight={400} color="#2F3F53" lineHeight={'140%'}>
              Please wait...
            </Text>
          </VStack>
        </Flex>
      ),
    });
  };

  const depositMutation = useMutation(formData => makeEquityDeposit(formData), {
    onSettled: () => setLoading(false),
    onSuccess: res => {
      closeToast();
      refetch ? refetch() : null;
      onSuccessful ? onSuccessful(res.data) : null;
      setAuthUrl(res?.data?.data?.data?.link ?? res?.data?.data?.link);
      const details = res?.data?.bank_details;
      const link =
        res?.data?.data?.link || res?.data?.data?.data?.link || res?.data?.data?.data?.data?.link;
      const message = res?.data?.message;
      if (message) {
        updateToastForSuccess();
      }
      if (details) {
        setTransferDetails(details);
      }
      if (link) {
        modal?.onClose();
        openExternalUrl(link, '_blank');
      }
    },
    onError: err => {
      const msg = err?.response?.data?.message;
      updateToastForError();
    },
  });

  const paymentMutation = useMutation(formData => makeEquityPayment(formData), {
    onSettled: () => setLoading(false),
    onSuccess: res => {
      closeToast();
      refetch ? refetch() : null;

      onSuccessful ? onSuccessful(res.data) : null;
      setAuthUrl(res?.data?.data?.data?.link ?? res?.data?.data?.link);
      const details = res?.data?.bank_details;
      const link =
        res?.data?.data?.link || res?.data?.data?.data?.link || res?.data?.data?.data?.data?.link;
      const message = res?.data?.message;
      if (message) {
        updateToastForSuccess;
      }
      if (details) {
        setTransferDetails(details);
      }
      if (link) {
        modal?.onClose();
        openExternalUrl(link, '_blank');
      }
    },
    onError: err => {
      const msg = err?.response?.data?.message;
      updateToastForError();
    },
  });

  const handlePaywithCard = () => {
    setLoading(true);
    addToast();
    const newPaymentDetails = {
      ...paymentDetails,
      auth_code,
      redirect_url: `https://${STORE__DOMAIN}`,
      payment_option: 'card',
      amount_to_pay: Number(amountToPay),
      store_name: storeName,
      from_store: true,
      business_id,
    };

    switch (paymentType) {
      case 'deposit':
        return depositMutation.mutate(newPaymentDetails);
      case 'asset':
        return paymentMutation.mutate(newPaymentDetails);
      default:
        return;
    }
  };

  const handleBankTransfer = () => {
    setPaymentStep('bankDetails');
    setLoading(true);
    // addToast();
    const newPaymentDetails = {
      ...paymentDetails,
      auth_code,
      redirect_url: `https://${STORE__DOMAIN}`,
      payment_option: 'virtual_bank',
      amount_to_pay: Number(amountToPay),
      store_name: storeName,
      from_store: true,
      business_id,
    };

    switch (paymentType) {
      case 'deposit':
        return depositMutation.mutate(newPaymentDetails);
      case 'asset':
        return paymentMutation.mutate(newPaymentDetails);
      default:
        return;
    }
  };

  const handlePayFromWallet = () => {
    setLoading(true);
    addToast();
    const newPaymentDetails = {
      ...paymentDetails,
      auth_code,
      redirect_url: `https://${STORE__DOMAIN}`,
      payment_option: 'store_wallet',
      amount_to_pay: Number(amountToPay),
      store_name: storeName,
      from_store: true,
      business_id,
    };
    switch (paymentType) {
      case 'deposit':
        return depositMutation.mutate(newPaymentDetails);
      case 'asset':
        return paymentMutation.mutate(newPaymentDetails);
      default:
        return;
    }
  };

  const handleEndTransaction = () => {
    depositMutation?.reset();
    paymentMutation?.reset();
  };

  const formattedAmount = amountToPay && amountToPay?.toString()?.replace(',', '');
  const isAboveLimit = parseInt(formattedAmount) > 500000;

  return {
    handleBankTransfer,
    handlePayFromWallet,
    handlePaywithCard,
    authUrl,
    setAuthUrl,
    isLoading,
    setLoading,
    paymentStep,
    setPaymentStep,
    trasferDetails,
    setTransferDetails,
    formattedAmount,
    isAboveLimit,
    paymentMutation,
    depositMutation,
    handleEndTransaction,
  };
};
