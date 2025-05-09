import {
  HStack,
  Text,
  VStack,
  Box,
  Center,
  Stack,
  Divider,
  useClipboard,
  useToast,
} from '@chakra-ui/react';
import {Spinner} from '@/ui-lib/ui-lib.components';
import {useQuery} from 'react-query';
import {
  fetchStoreWalletTxns,
  fetchVirtualAccountNumber,
  fetchWalletCurrentBalance,
} from '@/api/Wallet';
import EmptyState from '@/components/appState/empty-state';
import ErrorState from '@/components/appState/error-state';
import {scrollBarStyles} from './deposit';
import {formatToCurrency} from '@/utils/formatAmount';
import {
  CustomCopyIcon,
  DepositIcon,
  NairaIcon,
  WithdrawalIcon,
} from '@/components/assets/WalletIcons';
import {GroupedTransactions, groupTransactionsByDate} from '@/utils/transactions';
import {PaymentAccess} from '@/components/payment_flow/PaymentAccess';

export const WalletContent = ({setPage}) => {
  const WALLET__ACCOUNT_BALANCE = useQuery(
    ['fetchWalletCurrentBalance'],
    fetchWalletCurrentBalance
  );
  const toast = useToast();
  const Account_balance = WALLET__ACCOUNT_BALANCE?.data?.data?.data?.naira_balance;
  const WALLET__TXNS = useQuery(['fetchStoreWalletTxns'], fetchStoreWalletTxns);
  const VIRTUAL_ACCOUNT_NUMBER = useQuery(['fetchVirtualAccountNumber'], fetchVirtualAccountNumber);
  const bankDetails = {
    bank_name: VIRTUAL_ACCOUNT_NUMBER?.data?.data?.data?.account_bank_name ?? '',
    account_number: VIRTUAL_ACCOUNT_NUMBER?.data?.data?.data?.account_number ?? '',
    account_name: VIRTUAL_ACCOUNT_NUMBER?.data?.data?.data?.account_name ?? '',
  };
  const {hasCopied, onCopy} = useClipboard(
    VIRTUAL_ACCOUNT_NUMBER?.data?.data?.data?.account_number
  );

  let TIME_OF_DAY = '';

  let time = new Date().getHours();

  if (time >= 5 && time < 12) {
    TIME_OF_DAY = 'morning';
  } else if (time >= 12 && time < 17) {
    TIME_OF_DAY = 'afternoon';
  } else if (time >= 17 || time < 5) {
    TIME_OF_DAY = 'evening';
  }

  const GROUPED_TXNS_BY_DATE = groupTransactionsByDate(WALLET__TXNS?.data?.data?.message);

  if (hasCopied) {
    toast({
      position: 'top-right',
      title: 'Account Number Copied',
      description: 'Your account number has been copied to your clipboard.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <Stack
      py="20px"
      bg="matador_background.200"
      h="100vh"
      minH={'fit-content'}
      overflowY={'auto'}
      css={scrollBarStyles}
      spacing={1}
      px={'16px'}
    >
      <Stack
        background="matador_background.100"
        display="flex"
        padding="25px 14px"
        alignItems="flex-start"
        justify={'center'}
        mx="auto"
        w="full"
        maxW={{md: '368px'}}
        h={{base: 'auto', md: '155px'}}
      >
        {bankDetails?.bank_name ? (
          <HStack
            color="text.3"
            fontSize="12px"
            fontStyle="normal"
            fontWeight="500"
            lineHeight="140%"
            letterSpacing="0.12px"
            bg={'matador_background.200'}
            padding={'5px'}
            borderRadius={'sm'}
          >
            <Text textTransform={'uppercase'}>{bankDetails?.bank_name}</Text>
            <Divider orientation="vertical" colorScheme={'gray'} />
            <Text>{bankDetails?.account_number}</Text>
            <CustomCopyIcon onClick={onCopy} />
          </HStack>
        ) : null}
        <Box mt={2}>
          <Text
            textTransform={'uppercase'}
            color="custom_color.color_pop"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="500"
          >
            Balance
          </Text>
          <Text mt={2} {...CURRENT_BAL_STYLE}>
            <NairaIcon />
            <span>
              {' '}
              {Account_balance ? formatToCurrency(Account_balance, 'naira', '', true) : '0.00'}
            </span>
          </Text>
        </Box>
      </Stack>
      <HStack
        mx="auto"
        w="full"
        gap={'45px'}
        maxW={{md: '368px'}}
        display="flex"
        background="matador_background.100"
        padding="12px 14px"
        alignItems="flex-start"
        borderTop="1px solid"
        borderColor={`matador_border_color.100`}
        h={{base: 'auto', md: '72px'}}
      >
        <PaymentAccess content={<DepositIcon onClick={() => setPage('deposit')} />} />
        <PaymentAccess
          checkWithdrawal
          content={<WithdrawalIcon onClick={() => setPage('withdrawal')} />}
        />
      </HStack>

      <Stack
        px={{base: 0, lg: '16px'}}
        pt={{base: 0, lg: 2}}
        w="full"
        alignSelf={'end'}
        justifySelf={'end'}
      >
        <Box>
          <Text
            mt="10px"
            color="text.3"
            fontWeight="500"
            letterSpacing="0.16px"
            textTransform={'uppercase'}
            fontSize={{base: 16, lg: 20}}
          >
            Transaction History
          </Text>
          <VStack spacing={{base: '6px', lg: '10px'}} align="stretch" mt="14px">
            {WALLET__TXNS?.isLoading ? (
              <Center h="200px" w="full">
                <Spinner noAbsolute />
              </Center>
            ) : WALLET__TXNS?.isError ? (
              <ErrorState />
            ) : (
              <>
                {WALLET__TXNS?.data?.data?.message?.length > 0 ? (
                  <GroupedTransactions groupedTransactions={GROUPED_TXNS_BY_DATE} />
                ) : (
                  <EmptyState
                    icon
                    textSize={16}
                    height={'200px'}
                    text={'No transactions yet'}
                    headerStyle={{fontSize: 18, fontWeight: 700}}
                  />
                )}
              </>
            )}
          </VStack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default WalletContent;

const CURRENT_BAL_STYLE = {
  color: 'matador_text.300',
  display: 'flex',
  alignItems: 'center',
  fontSize: '32px',
  fontStyle: 'normal',
  fontWeight: '500',
  gap: '10px',
};
