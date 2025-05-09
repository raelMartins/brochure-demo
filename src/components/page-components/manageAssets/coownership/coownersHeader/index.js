import {Box, Button, HStack, Image, Stack, Text, useMediaQuery} from '@chakra-ui/react';
import React from 'react';
import TransactionInfo from './transactionInfo';
import CoownersCarousel from './coownersCarousel';
import angledArrow from '/src/images/icons/angledArrow.svg';
import {useQuery} from 'react-query';
import useLocalStorage from '@/utils/hooks/useLocalStorage';
import {BUSINESS_ID} from '@/constants/routes';
import {
  fetchCustomersInfo,
  fetchIndividualCoOwnersData,
  fetchListOfCoowners,
} from '@/api/co_owners';
import {formatToCurrency} from '@/utils/formatAmount';
import {useParams} from 'next/navigation';
import {changeDateFormat} from '@/utils/formatDate';

const CoownersHeader = ({
  setTransactionInfo,
  equityInfo,
  transactionInfo,
  calculatePercentagePaid,
  groupTransactioninfo,
}) => {
  const query = useParams();
  const equity_id = query?.id;
  let coownersList = [];
  const [isBelowXl] = useMediaQuery('(max-width: 1024px)');
  const [objOfkeyValues] = useLocalStorage(['userToken', 'LoggedinUser', 'businessId']);
  const business_id = objOfkeyValues.businessId;
  const businessId = business_id || BUSINESS_ID();
  const userId = objOfkeyValues?.LoggedinUser?.user?.id;

  const listOfCoownersFetch = useQuery(
    ['coowners', query?.id],
    () => fetchListOfCoowners(query?.id),
    {enabled: !!equity_id}
  );

  const coowners = listOfCoownersFetch?.data?.data?.data ?? [];

  const queryForCustomersInfo = `${coowners
    .map(element => {
      return `user[]=${element?.invitee?.id}`;
    })
    .join('&')}&business_id=${businessId}`;

  const customersFetch = useQuery(
    ['users', queryForCustomersInfo],
    () => fetchCustomersInfo(queryForCustomersInfo),
    {enabled: !!coowners?.length}
  );

  const placeLoggedInCustomerFirstInArray = coownerArray =>
    coownerArray.sort((a, b) => {
      if (Number(a?.invitee?.id) === userId) {
        return -1;
      } else if (Number(b?.invitee?.id) === userId) {
        return 1;
      } else {
        return 0;
      }
    });

  const findCustomerObjOfCoowner = (email, key) =>
    customersFetch?.data?.data?.user.find(item => item.email === email)?.[key] ?? '-';

  if (customersFetch.data) {
    coownersList = placeLoggedInCustomerFirstInArray(coowners).map((item, index) => {
      return {
        infoFor: 'individual',
        slideIndex: index,
        userId: item?.invitee?.id,
        amount_paid_heading: 'Shared amount paid',
        amountPaid: '-',
        progress: '-',
        due_balance: '-',
        due_date: changeDateFormat(equityInfo?.next_due_date),
        outStanding_balance: '-',
        equityValue: `${item?.equity_value}%`,
        status: item?.status,
        email: item?.invitee?.email,
        avatar: findCustomerObjOfCoowner(item?.invitee?.email, 'avatar'),
        name: `${findCustomerObjOfCoowner(
          item?.invitee?.email,
          'first_name'
        )} ${findCustomerObjOfCoowner(item?.invitee?.email, 'last_name')}`,
      };
    });
  }

  const switchTransitonInfo = () => {
    const newTransactionInfo =
      transactionInfo.infoFor === 'individual' ? groupTransactioninfo : coownersList?.[0];
    setTransactionInfo(newTransactionInfo);
  };

  useQuery(
    ['coownerInfo', transactionInfo?.userId, equity_id],
    () => fetchIndividualCoOwnersData(transactionInfo?.userId, equity_id),
    {
      enabled: !!transactionInfo?.userId,
      onSuccess: res => {
        const updatedTransactionData = {
          amountPaid: formatToCurrency(res?.data?.user_amount_paid),
          progress: calculatePercentagePaid(
            res?.data?.user_total_share,
            res?.data?.user_amount_paid
          ),
          due_balance: formatToCurrency(res?.data?.next_due_payment),
          outStanding_balance: formatToCurrency(res?.data?.individual_outstanding_balance),
        };
        setTransactionInfo({
          ...transactionInfo,
          ...updatedTransactionData,
        });
      },
    }
  );

  return (
    <>
      <Button
        onClick={switchTransitonInfo}
        cursor={
          customersFetch?.isError || !equityInfo || listOfCoownersFetch?.isError
            ? 'not-allowed'
            : customersFetch?.isLoading || listOfCoownersFetch?.isLoading
            ? 'wait'
            : 'pointer'
        }
        isDisabled={
          !equityInfo ||
          customersFetch?.isError ||
          customersFetch?.isLoading ||
          listOfCoownersFetch?.isError ||
          listOfCoownersFetch?.isLoading
        }
        p={{ base: '5px 13.86px', md: '13.159px 27.964px'}}
        maxW={{ lg: "197.39px"}}
        fontWeight="400"
        _focus={{opacity: 1}}
        borderRadius="42px"
        _active={{
          opacity: 1,
        }}
        _hover={{opacity: 1}}
        iconSpacing="6.62px"
        position="absolute"
        mt={{base: '-2.5rem', xl: '-3rem'}}
        ml={{ base: '48%', sm: '65vw', lg: '28%', '2xl': '19.5%'}}
        bg="transparent"
        fontSize={{ base: '10px', md: '12px'}}
        border="1px solid"
        borderColor="#D6D6D6"
      >
        {`View ${!!(transactionInfo?.infoFor === 'individual') ? 'Group' : 'Individual'} Payment`}
      </Button>
      <Stack w="full" maxW={{base: 'full', lg: '650px'}} spacing={{base: 'none', xl: '10px'}}>
        <CoownersCarousel
          coownersList={coownersList}
          transactionInfo={transactionInfo}
          setTransactionInfo={setTransactionInfo}
          isOpen={!!(transactionInfo?.infoFor === 'individual')}
        />
        <Box
          position="relative"
          zIndex={1}
          transition={`0.5s ease-in-out`}
          mt={{
            base: '10px',
            xl: '0px',
          }}
        >
          <TransactionInfo equityInfo={equityInfo} transactionInfo={transactionInfo} />
        </Box>
      </Stack>
    </>
  );
};

export default CoownersHeader;
