import {fetchEquityPaymentBreakdown, getAllUpcomingPayment} from '@/api/listing';
import {
  fetchAllPurchaseHistory,
  fetchCustomPlanSummary,
  fetchCustomPlanSummaryForAssets,
} from '@/api/payment';
import {drawer_styles, drawer_title_styles} from '@/components/drawers/styles';
import ThreeDots from '@/components/loaders/ThreeDots';
import MobileHeader from '@/components/navbar/mobile_header';
import {Spinner} from '@/ui-lib/ui-lib.components/Spinner';
import {formatToCurrency} from '@/utils/formatAmount';
import {changeDateFormat} from '@/utils/formatDate';
import {useLightenHex} from '@/utils/lightenColorShade';
import {
  Box,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Stack,
  Text,
  useMediaQuery,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import {useQuery} from 'react-query';

const CustomPaymentBreakdownForAssets = ({equityInfo, modalDisclosure}) => {
  const plan_type = equityInfo?.payment_plan?.plan_type;
  const periodic_payment = equityInfo?.payment_plan?.periodic_payment;
  const payment_frequency = equityInfo?.payment_plan?.payment_frequency;
  const payment_period_in_months = equityInfo?.payment_plan?.payment_period_in_months;
  const FEES = equityInfo?.payment_plan?.bundle?.fees;

  const customPlanBreakDown = useQuery(
    ['customPLansummary', equityInfo?.payment_plan?.id],
    () => fetchCustomPlanSummary(equityInfo?.id),
    {isenabled: !!equityInfo?.payment_plan?.id && plan_type === 'custom', retry: 0}
  );

  const TRANSACTIONS_HISTORY = useQuery(['purchase_history', equityInfo?.id], () =>
    fetchAllPurchaseHistory(equityInfo?.id)
  );

  const upcomingPayments = useQuery(
    ['upcoming_payments', equityInfo?.id],
    () => fetchEquityPaymentBreakdown(equityInfo?.id),
    {isenabled: !!equityInfo?.id && plan_type === 'custom', retry: 0}
  );

  const upcomingPaymentsNew = useQuery(
    ['upcoming_payments_new', equityInfo?.id],
    () => getAllUpcomingPayment(equityInfo?.id),
    {isenabled: !!equityInfo?.id && plan_type === 'custom', retry: 0}
  );

  const [isMobile] = useMediaQuery('(max-width: 540px)');

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  // toastForError(customPlanBreakDown.error, customPlanBreakDown.isError, toast);

  function getOrdinal(number) {
    if (typeof number !== 'number') {
      return ''; // Return an empty string for invalid inputs
    }

    const suffixes = ['th', 'st', 'nd', 'rd'];
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    // Special cases for 11, 12, and 13, as they don't follow the usual pattern
    if (lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13) {
      return number + 'th';
    }

    // Use the appropriate suffix based on the last digit
    const suffix = suffixes[lastDigit] || 'th';

    return number + suffix;
  }

  const FEES_ARRAY = equityInfo?.equity_fees || FEES || [];
  // const FEES_ARRAY = FEES;

  const HISTORY = TRANSACTIONS_HISTORY.data?.data.filter(el => !el.is_fees)?.toReversed();
  // const UPCOMING = upcomingPayments.data?.data?.data.filter(el => !el.is_fees);
  const UPCOMING = upcomingPaymentsNew.data?.data?.results?.filter(el => !el.is_fees);

  const still_loading =
    upcomingPaymentsNew?.isLoading ||
    TRANSACTIONS_HISTORY?.isLoading ||
    customPlanBreakDown?.isLoading;

  const list_item_style = {
    w: 'full',
    p: '24px',
    bg: {base: `custom_color.opacity_pop._10`, md: 'matador_background.100'},
    position: 'relative',
    align: 'center',
    justify: 'space-between',
    color: `text`,
  };

  console.log({HISTORY, UPCOMING, FEES_ARRAY});

  return (
    <Drawer
      placement={isMobile ? 'bottom' : 'right'}
      onClose={modalDisclosure.onClose}
      isOpen={modalDisclosure.isOpen}
      autoFocus={false}
    >
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />
      <DrawerContent {...drawer_styles}>
        <MobileHeader
          pb="10px"
          onDrawerOpen={modalDisclosure.onOpen}
          onDrawerClose={modalDisclosure.onClose}
          activePage={`Payment Breakdown`}
        />
        <HStack {...drawer_title_styles}>
          <HStack align={'center'}>
            <Text>Payment Breakdown</Text>
          </HStack>

          <DrawerCloseButton
            right="0px"
            left="0px"
            position="initial"
            my="auto"
            top="0"
            bottom="0"
          />
        </HStack>
        <DrawerBody sx={customScrollbarStyles} p="0">
          <Box px="24px" h={'fit-content'}>
            {still_loading ? (
              <Center w="100%" minH="300px">
                <ThreeDots />
              </Center>
            ) : (
              <VStack
                divider={
                  <Divider
                    display={{md: 'none'}}
                    color="custom_color.color_pop"
                    bg="custom_color.color_pop"
                  />
                }
                border="1px solid"
                borderColor="matador_border_color.100"
                w="full"
                spacing={'none'}
              >
                {HISTORY?.map((item, idx) => (
                  <HStack {...list_item_style} key={idx}>
                    <Text fontSize={'14px'}>
                      {item?.transaction_action_type?.toLowerCase()?.includes(`initial`)
                        ? `Initial Deposit`
                        : `${getOrdinal(idx + 1)} payment`}{' '}
                    </Text>
                    <Stack gap={`3px`} textAlign={`right`}>
                      <Text fontSize={'19x'} fontWeight={500}>
                        {item?.amount ? formatToCurrency(item?.amount) : '-'}
                      </Text>
                      <Text>
                        Paid on: {item?.created_at ? changeDateFormat(item.created_at) : '-'}
                      </Text>
                    </Stack>
                  </HStack>
                ))}
                {plan_type === 'custom' ? (
                  UPCOMING?.map((item, idx) => (
                    <HStack {...list_item_style} key={idx}>
                      <Text fontSize={'14px'}>
                        {getOrdinal((HISTORY?.length || 0) + idx + 1)} payment
                      </Text>
                      <Stack gap={`3px`} textAlign={`right`}>
                        <Text fontSize={'19x'} fontWeight={500}>
                          {item?.amount ? formatToCurrency(item?.amount) : '-'}
                        </Text>
                        {item?.due_date && (
                          <Text>
                            Due date: {item?.due_date ? changeDateFormat(item.due_date) : '-'}
                          </Text>
                        )}
                      </Stack>
                    </HStack>
                  ))
                ) : (
                  <HStack {...list_item_style}>
                    <Text fontSize={'14px'}>
                      {payment_frequency
                        ? payment_frequency?.charAt(0).toUpperCase() +
                          payment_frequency?.slice(1) +
                          ' Payment'
                        : 'Periodic Payment'}{' '}
                    </Text>
                    <Text fontSize={'19x'} fontWeight={500}>
                      {payment_frequency !== 'flexible' ? formatToCurrency(periodic_payment) : '-'}
                    </Text>
                  </HStack>
                )}
                <HStack {...list_item_style}>
                  <Text fontSize={'14px'}>Total</Text>
                  <Text fontSize={'19x'} fontWeight={500}>
                    {formatToCurrency(equityInfo?.total_unit_price)}
                  </Text>
                </HStack>
                {FEES_ARRAY?.map((fee, idx) => (
                  <HStack {...list_item_style} key={idx}>
                    <Text fontSize={'14px'}>{fee?.name}</Text>
                    <Text fontSize={'19x'} fontWeight={500}>
                      {formatToCurrency(fee.amount)}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            )}
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomPaymentBreakdownForAssets;
