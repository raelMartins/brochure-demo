import {fetchAllPurchaseHistory, fetchUpcomingPayments} from '@/api/payment';
import {formatToCurrency} from '@/utils/formatAmount';
import {changeDateFormat} from '@/utils/formatDate';
import {Box, Center, Flex, Spinner, Text, useTheme, VStack} from '@chakra-ui/react';
import React, {useState} from 'react';
import {useQuery} from 'react-query';

const Payments = ({assetToUse}) => {
  const theme = useTheme();
  const primaryColor = theme?.colors?.custom_color?.color_pop;
  const [isPrevious, setIsPrevious] = useState(true);
  const TRANSACTIONS_HISTORY = useQuery(['fetchAllPurchaseHistory', assetToUse?.id], () =>
    fetchAllPurchaseHistory(assetToUse?.id)
  );
  const UpcomingPayment = useQuery(['fetchUpcomingPayments', assetToUse?.id], () =>
    fetchUpcomingPayments(assetToUse?.id)
  );

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

  return (
    <Box>
      <Flex px={{base: '16px', md: '24px'}} w="full" justify={'space-between'} align={'center'}>
        <Text
          cursor={'pointer'}
          py={{base: '8px', md: '14px'}}
          px={{base: 'unset', md: '8px'}}
          fontSize={{base: '14px', md: '16px'}}
          fontWeight={{base: 400, md: 500}}
          color={isPrevious ? 'custom_color.color_pop' : 'matador_text.400'}
          borderBottom={isPrevious && '1px solid'}
          borderColor={'custom_color.color_pop'}
          onClick={() => setIsPrevious(true)}
        >
          Previous Payment
        </Text>
        <Text
          cursor={'pointer'}
          py="14px"
          px="8px"
          fontSize={{base: '14px', md: '16px'}}
          fontWeight={{base: 400, md: 500}}
          onClick={() => setIsPrevious(false)}
          color={!isPrevious ? 'custom_color.color_pop' : 'matador_text.400'}
          borderBottom={!isPrevious && '1px solid'}
          borderColor={'custom_color.color_pop'}
        >
          Upcoming Payment
        </Text>
      </Flex>

      {isPrevious ? (
        <Box>
          {TRANSACTIONS_HISTORY?.isLoading ? (
            <Center w="full" h="20vh" gap="10px">
              <Spinner color="custom_color.color_pop" />
              <Text>Fetching past payments</Text>
            </Center>
          ) : (
            <VStack
              p={{base: '17px', md: '21px'}}
              bg={`custom_color.opacity_pop._10`}
              w="full"
              gap={{base: '17px', md: '20px'}}
              align={'stretch'}
            >
              {TRANSACTIONS_HISTORY?.data?.data?.map((item, idx) => (
                <Flex key={idx} w="full" align={'center'} justify={'space-between'}>
                  <Text
                    fontSize={{base: '12px', md: '14px'}}
                    fontWeight={400}
                    color="matador_text.400"
                  >
                    {item?.created_at ? changeDateFormat(item.created_at) : '-'}
                  </Text>
                  <Text fontSize={{base: '14px', md: '14px'}} fontWeight={500} color={`text`}>
                    {item?.amount ? formatToCurrency(item?.amount) : '-'}
                  </Text>
                </Flex>
              ))}
            </VStack>
          )}
        </Box>
      ) : (
        <Box>
          {UpcomingPayment.isLoading ? (
            <Center w="full" h="20vh" gap="10px">
              <Spinner color="custom_color.color_pop" />
              <Text>Fetching upcoming payments</Text>
            </Center>
          ) : (
            <VStack
              p={{base: '17px', md: '21px'}}
              bg={'custom_color.opacity_pop._10'}
              w="full"
              gap={{base: '17px', md: '20px'}}
              align={'stretch'}
            >
              {UpcomingPayment.data?.data?.data?.map((item, idx) => (
                <Flex key={idx} w="full" align={'center'} justify={'space-between'}>
                  <Text
                    fontSize={{base: '12px', md: '14px'}}
                    fontWeight={400}
                    color="matador_text.400"
                  >
                    {item?.created_at ? changeDateFormat(item.due_date) : '-'}
                  </Text>
                  <Text fontSize={{base: '14px', md: '14px'}} fontWeight={500} color={`text`}>
                    {item?.amount ? formatToCurrency(item?.amount) : '-'}
                  </Text>
                </Flex>
              ))}
            </VStack>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Payments;
