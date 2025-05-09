import {useAssetPayment} from '@/ui-lib/ui-lib.hooks/useAssetPayments';
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  useClipboard,
  useToast,
} from '@chakra-ui/react';
import {useState} from 'react';
import {BankTransfer} from './bankTransfer';
import {CardMethod} from './cardMethod';
import {DepositContent} from './depositContent';
import {WalletContent} from './walletContent';
import backArrow from '/src/images/icons/backArrow.svg';
import MobileHeader from '@/components/navbar/mobile_header';
import {IoArrowBack} from 'react-icons/io5';
import {IoIosArrowBack} from 'react-icons/io';
import {drawer_styles, drawer_title_styles} from '../styles';

const MakeDepositDrawer = ({depositModal, refetch, info}) => {
  const toast = useToast();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [step, setStep] = useState('method');
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const amountToPay = amount?.replaceAll(',', '');

  const paymentDetails = {
    equity_id: info && info?.id,
    amount_to_pay: amountToPay,
    is_coown: false,
    pending: true,
  };

  const paymentType = 'deposit';

  const {
    handleBankTransfer,
    handlePayFromWallet,
    handlePaywithCard,
    isLoading,
    transferDetails,
    paymentMutation,
    depositMutation,
    handleEndTransaction,
  } = useAssetPayment({
    paymentType,
    refetch,
    amountToPay,
    modal: depositModal,
    paymentDetails,
  });
  const {onCopy} = useClipboard(transferDetails?.account_number ?? '');
  const handleCopy = () => {
    onCopy();
    return toast({
      title: 'Account Number Copied!',
      status: 'info',
      duration: 1500,
      isClosable: true,
      position: 'top-right',
    });
  };

  const handleSelect = el => {
    setSelectedMethod(el);
    const method = el || selectedMethod;
    if (!amount) return setAmountError('Enter an amount to proceed');
    if (method?.id === '1') {
      // setStep('card');
      // setSelectedMethod(null);

      handlePaywithCard();
      depositModal.onClose();
    } else if (method?.id === '2') {
      // setStep('wallet');
      // setSelectedMethod(null);
      handlePayFromWallet();
      depositModal.onClose();
    } else if (method?.id === '3') {
      handleBankTransfer();
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
  const success = paymentMutation.isSuccess || depositMutation.isSuccess;
  const word = step === 'bank' ? 'bank transfer' : 'make a deposit';

  const mainContent = (
    <Box>
      <MobileHeader onDrawerClose={depositModal.onClose} activePage={word} />

      <Flex {...drawer_title_styles}>
        {step === 'bank' ? (
          <Flex gap="8px" align="center">
            <IoIosArrowBack onClick={() => setStep('method')} fontSize={'18px'} />
            <Text>bank transfer</Text>
          </Flex>
        ) : (
          <Text>Make a Deposit</Text>
        )}
        <DrawerCloseButton
          color="text.1"
          top={{base: '12px', md: '17.5px'}}
          right={'15px'}
          fontSize={'14px'}
          onClick={depositModal?.onClose}
        />
      </Flex>
      {step === 'method' && (
        <DepositContent
          amount={amount}
          amountError={amountError}
          setAmount={setAmount}
          setAmountError={setAmountError}
          handleSelect={handleSelect}
        />
      )}

      {step === 'card' && <CardMethod success={success} handlePaywithCard={handlePaywithCard} />}

      {step === 'wallet' && (
        <WalletContent
          success={success}
          isLoading={isLoading}
          handlePayFromWallet={handlePayFromWallet}
          setStep={setStep}
        />
      )}

      {step === 'bank' && (
        <BankTransfer
          amount={amount}
          isLoading={isLoading}
          transferDetails={transferDetails}
          handleCopy={handleCopy}
          setStep={setStep}
        />
      )}
    </Box>
  );

  return (
    <Drawer
      onCloseComplete={() => {
        setAmount('');
        handleEndTransaction();
        setStep('method');
        setSelectedMethod(null);
      }}
      isOpen={depositModal?.isOpen}
      onClose={depositModal?.onClose}
      placement="right"
      autoFocus={false}
    >
      <DrawerOverlay />
      <DrawerContent {...drawer_styles}>{mainContent}</DrawerContent>
    </Drawer>
  );
};

export default MakeDepositDrawer;
