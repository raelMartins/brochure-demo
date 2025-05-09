import {useState} from 'react';
import {BankTransfer} from './bankTransfer';
import {PaymentSummary} from './paymentSummary';
import {PaymentMethod} from './paymentMethod';
import {useAssetPayment} from '@/ui-lib/ui-lib.hooks/useAssetPayments';
import {HStack, Stack, Text} from '@chakra-ui/react';
import {useSearchParams, useRouter} from 'next/navigation';

export const OfferPurchaseFlow = ({assetToUse}) => {
  const [amountToPay, setAmountToPay] = useState(
    assetToUse?.payment_plan?.initial_deposit_in_value || assetToUse?.total_unit_price
  );
  const fullPayment = !assetToUse?.payment_plan;
  const selectedPlan = assetToUse?.payment_plan;
  const unit = assetToUse?.unit;

  const searchParams = useSearchParams();
  const router = useRouter();
  const step = searchParams.get('step');

  const handleEndAllTransactionDetails = () => {
    setStep('type');
  };

  const paymentDetails = {
    paymentplan_id: selectedPlan?.id,
    bundle_id: selectedPlan?.bundle?.id || assetToUse?.unit?.id,
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
    paymentSummary: (
      <PaymentSummary setAmountToPay={setAmountToPay} assetToUse={assetToUse} setStep={setStep} />
    ),
    bankTransfer: (
      <BankTransfer amountToPay={amountToPay} step={step} trasferDetails={trasferDetails} />
    ),
    paymentMethod: (
      <PaymentMethod
        success={paymentMutation.isSuccess || depositMutation.isSuccess}
        setStep={setStep}
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
      {stepComponents[step] || stepComponents['paymentSummary']}
    </Stack>
  );
};
