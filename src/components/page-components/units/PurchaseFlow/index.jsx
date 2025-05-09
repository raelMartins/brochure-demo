'use client';

import {useEffect, useState} from 'react';
import {Plans} from './plans';
import {BankTransfer} from './bankTransfer';
import {PaymentSummary} from './paymentSummary';
import {PaymentMethod} from './paymentMethod';
import {fetchAllBundlePaymentPlan} from '@/api/listing';
import {useQuery} from 'react-query';
import {useAssetPayment} from '@/ui-lib/ui-lib.hooks/useAssetPayments';
import {Center, HStack, Icon, Stack, Text, useTheme} from '@chakra-ui/react';
import {BiArrowBack} from 'react-icons/bi';
import {useSearchParams, useRouter} from 'next/navigation';
import ThreeDots from '@/components/loaders/ThreeDots';

export const PurchaseFlow = ({unit}) => {
  const [fullPayment, setFullPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amountToPay, setAmountToPay] = useState(
    selectedPlan?.initial_deposit_in_value || unit?.price || 0
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const step = searchParams.get('step');

  useEffect(() => {
    setAmountToPay(selectedPlan?.initial_deposit_in_value || unit?.price);
  }, [selectedPlan]);

  const {data, isLoading} = useQuery(['payment_plan', unit?.id], () =>
    fetchAllBundlePaymentPlan(unit?.id)
  );
  const PAYMENT_PLAN_DATA = data && data?.data?.results;

  useEffect(() => {
    if (PAYMENT_PLAN_DATA && !PAYMENT_PLAN_DATA[0]?.id) {
      setFullPayment(true);
      setStep('paymentSummary');
      setSelectedPlan(null);
    }
  }, [PAYMENT_PLAN_DATA]);

  const handleEndAllTransactionDetails = () => {
    setSelectedPlan(null);
    setStep('type');
    setFullPayment(false);

    if (PAYMENT_PLAN_DATA && !PAYMENT_PLAN_DATA[0]?.id) {
      setFullPayment(true);
    }
  };

  const paymentDetails = {
    paymentplan_id: selectedPlan?.id,
    bundle_id: selectedPlan?.bundle?.id || unit?.id,
    type: 'WHOLE',
  };

  const {
    handleBankTransfer,
    handlePayFromWallet,
    handlePaywithCard,
    isLoading: transactionLoading,
    trasferDetails,
    paymentMutation,
    depositMutation,
    handleEndTransaction,
  } = useAssetPayment({
    paymentType: 'asset',
    amountToPay,
    paymentDetails,
  });

  const setStep = text => {
    const pushUrl = `${window?.location?.origin}${window?.location?.pathname}?step=${text}`;
    router.push(pushUrl);
    handleEndTransaction();
  };

  const stepComponents = {
    plans: (
      <Plans
        planLoading={isLoading}
        PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
        fullPayment={fullPayment}
        setFullPayment={setFullPayment}
        setSelectedPlan={setSelectedPlan}
        setStep={setStep}
        selectedPlan={selectedPlan}
        unit={unit}
        step={step}
      />
    ),
    paymentSummary: (
      <PaymentSummary
        setAmountToPay={setAmountToPay}
        PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
        fullPayment={fullPayment}
        setFullPayment={setFullPayment}
        setSelectedPlan={setSelectedPlan}
        setStep={setStep}
        selectedPlan={selectedPlan}
        unit={unit}
        step={step}
      />
    ),
    bankTransfer: (
      <BankTransfer
        fullPayment={fullPayment}
        paymentType={'asset'}
        selectedPlan={selectedPlan}
        amountToPay={amountToPay}
        paymentDetails={paymentDetails}
        setStep={setStep}
        loading={transactionLoading}
        unit={unit}
        step={step}
        trasferDetails={trasferDetails}
        onClick={handleBankTransfer}
      />
    ),
    paymentMethod: (
      <PaymentMethod
        unit={unit}
        success={paymentMutation.isSuccess || depositMutation.isSuccess}
        loading={transactionLoading}
        PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
        fullPayment={fullPayment}
        setFullPayment={setFullPayment}
        setSelectedPlan={setSelectedPlan}
        setStep={setStep}
        selectedPlan={selectedPlan}
        step={step}
        handleBankTransfer={handleBankTransfer}
        handlePayFromWallet={handlePayFromWallet}
        handlePaywithCard={handlePaywithCard}
      />
    ),
  };

  return (
    <Stack
      flex={`1`}
      spacing={{base: '13px', md: '20px'}}
      // bg={`background.3`}
      // border={`1px solid`}
      // borderColor={`border.1`}
      px={`24px`}
    >
      <HStack align={'center'} gap="20px">
        <Text
          fontSize={`48px`}
          fontWeight={`500`}
          lineHeight={`57.6px`}
          letterSpacing={`-0.01em`}
          textAlign={`left`}
          fontFamily={`var(--font_montserrat)`}
          textTransform={`uppercase`}
          color={`custom_color.color_pop`}
          display={{base: `none`, md: `block`}}
        >
          {unit?.unit_title || unit?.name}
        </Text>
      </HStack>
      {isLoading ? (
        <Center minH={`300px`}>
          <ThreeDots />
        </Center>
      ) : (
        stepComponents[step] || stepComponents?.plans
      )}
    </Stack>
  );
};
