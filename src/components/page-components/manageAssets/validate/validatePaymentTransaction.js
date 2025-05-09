import {fetchAllPurchaseHistory, fetchUpcomingPayments} from '@/api/payment';
import {toastForError} from '@/utils/toastForErrors';
import {Stack, Tab, TabIndicator, TabList, Tabs, useQuery} from '@chakra-ui/react';
import {useMutation} from 'react-query';
import TransactionHistory from '../assetTransactionHistory';
import {useState} from 'react';
import {PAYMENTPLANTRANSACTIONHISTORYCOLUMN} from '@/components/tables/paymentPlanTransactionHistoryColumn';
import {useParams} from 'next/navigation';

export const ValidatePaymentTransaction = () => {
  const query = useParams();
  const equityId = query?.id;
  const [activeTab, setActiveTab] = useState('previousPayment');
  const TRANSACTIONS_HISTORY = useMutation(() => fetchAllPurchaseHistory(equityId), {
    onSuccess: res => {},
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const UpcomingPayment = useQuery(['upcoming-payment', equityId], () =>
    fetchUpcomingPayments(equityId)
  );

  return (
    <Stack bg="matador_button_text.200">
      <Tabs position="relative" variant="unstyled">
        <TabList p="8px 24px" justifyContent={'space-between'}>
          <Tab
            pb={2}
            onClick={() => setActiveTab('previousPayment')}
            _selected={{color: 'custom_color.color_pop', fontWeight: '500'}}
          >
            Previous Payment
          </Tab>
          <Tab
            pb={2}
            onClick={() => setActiveTab('upcomingPayment')}
            _selected={{color: 'custom_color.color_pop', fontWeight: '500'}}
          >
            Upcoming Payment
          </Tab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="custom_color.color_pop" borderRadius="1px" />
      </Tabs>
      {activeTab === 'previousPayment' && (
        <TransactionHistory
          arrayData={TRANSACTIONS_HISTORY?.data?.data ?? []}
          isLoading={TRANSACTIONS_HISTORY?.isLoading}
          Column={PAYMENTPLANTRANSACTIONHISTORYCOLUMN}
          isError={TRANSACTIONS_HISTORY?.isError}
          error={TRANSACTIONS_HISTORY?.error}
          numberOfTransactions={TRANSACTIONS_HISTORY?.data?.data?.length}
          spacing={{xl: '15.66px', base: '10.68px'}}
        />
      )}
      {activeTab === 'upcomingPayment' && (
        <TransactionHistory
          arrayData={UpcomingPayment.data?.data?.data ?? []}
          isLoading={UpcomingPayment?.isLoading}
          Column={PAYMENTPLANTRANSACTIONHISTORYCOLUMN}
          isError={UpcomingPayment?.isError}
          error={UpcomingPayment?.error}
          numberOfTransactions={UpcomingPayment.data?.data?.data?.length}
          spacing={{xl: '15.66px', base: '10.68px'}}
        />
      )}
    </Stack>
  );
};
