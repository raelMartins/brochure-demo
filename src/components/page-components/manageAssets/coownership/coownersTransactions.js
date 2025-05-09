import {Divider, Stack, useToast} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {useMutation} from 'react-query';
import CoownersHeader from './coownersHeader';
import {toastForError} from '@/utils/toastForErrors';
import TransactionHistory from '../assetTransactionHistory';
import {COOWNERSHIPTRANSACTIONHISTORYCOLUMN} from '@/components/tables/coownerShipTransactionHistoryColumn';
import {fetchPurchaseHistory} from '@/api/payment';
import {formatToCurrency} from '@/utils/formatAmount';
import {changeDateFormat} from '@/utils/formatDate';
import {useParams} from 'next/navigation';

const CoownersTransactions = ({displayTab, equityInfo}) => {
  const query = useParams();
  const equityId = query?.id;
  const toast = useToast();
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

  const TRANSACTIONS_HISTORY = useMutation(
    () => fetchPurchaseHistory(equityId, transactionInfo?.userId),
    {
      onError: err => {
        toastForError(err, true, toast);
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
        spacing="12px"
        w="full"
        maxW={{base: 'full', lg: '608.81px'}}
        border="none"
      >
        <Divider
          display={{base: 'none', lg: 'block'}}
          border="none"
          h="0.95px"
          bg="custom_color.color_pop"
        />

        <CoownersHeader
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

export default CoownersTransactions;
