import {fetchPurchaseHistory} from '@/api/payment';
import {formatToCurrency} from '@/utils/formatAmount';
import {Divider, Stack, useTheme, useToast} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import TransactionHistory from '../assetTransactionHistory';
import PaymentPlanHeader from './paymentPlanHeader';
import {changeDateFormat} from '@/utils/formatDate';
import {useParams} from 'next/navigation';
import {useMutation} from 'react-query';
import {COOWNERSHIPTRANSACTIONHISTORYCOLUMN} from '@/components/tables/coownerShipTransactionHistoryColumn';
import {useLightenHex} from '@/utils/lightenColorShade';

const PaymentPlanTransaction = ({equityInfo}) => {
  const toast = useToast();
  const query = useParams();
  const equityId = query?.id;
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const {lightenHex} = useLightenHex(primaryColor);
  const calculatePercentagePaid = (amountToBePaid, amountPaid) => {
    let percentPaid;
    try {
      percentPaid = ((Number(amountPaid) / Number(amountToBePaid)) * 100).toFixed(2);

      if (percentPaid == 'NaN') {
        throw new Error('');
      }
      return `${percentPaid}%`;
    } catch (error) {
      return '-';
    }
  };

  const equityTransactionInfo = {
    infoFor: 'group',
    amount_paid_heading: 'Total paid',
    amountPaid: formatToCurrency(equityInfo?.amount_paid),
    progress: calculatePercentagePaid(equityInfo?.total_unit_price, equityInfo?.amount_paid),
    due_balance: formatToCurrency(equityInfo?.total_due_balance),
    due_date: changeDateFormat(equityInfo?.next_due_date),
    outStanding_balance: formatToCurrency(equityInfo?.current_outstanding_balance),
  };

  const [transactionInfo, setTransactionInfo] = useState(equityTransactionInfo);

  useEffect(() => {
    setTransactionInfo(equityTransactionInfo);
  }, [equityInfo]);

  //scrollbar style

  const TRANSACTIONS_HISTORY = useMutation(
    () => fetchPurchaseHistory(equityId, transactionInfo?.userId),
    {
      onError: err => {
        toast({
          title: 'Error fetching transaction history',
          description: err?.response?.message,
          status: 'error',
        });
      },
      mutationKey: ['transaction_history', equityId, transactionInfo?.userId],
      retry: 0,
    }
  );
  useEffect(() => {
    if (equityId && transactionInfo?.amountPaid !== '-') {
      TRANSACTIONS_HISTORY?.mutate();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionInfo]);

  const arrayData = TRANSACTIONS_HISTORY?.data?.data ?? [];

  return (
    <Stack>
      <TransactionHistory
        arrayData={arrayData}
        isLoading={TRANSACTIONS_HISTORY?.isLoading}
        Column={COOWNERSHIPTRANSACTIONHISTORYCOLUMN}
        isError={TRANSACTIONS_HISTORY?.isError}
        error={TRANSACTIONS_HISTORY?.error}
        numberOfTransactions={arrayData?.length}
        spacing="8px"
        w="full"
        border="none"
      >
        <Divider
          display={{base: 'none', lg: 'block'}}
          border="none"
          h="0.95px"
          bg="custom_color.color_pop"
        />

        <PaymentPlanHeader
          setTransactionInfo={setTransactionInfo}
          transactionInfo={transactionInfo}
          equityInfo={equityInfo}
          calculatePercentagePaid={calculatePercentagePaid}
          groupTransactioninfo={equityTransactionInfo}
        />
      </TransactionHistory>
    </Stack>
  );
};

export default PaymentPlanTransaction;
