import {Stack, VStack, Text, Flex} from '@chakra-ui/react';
import {formatToCurrency} from './formatAmount';
import {dayMonth, formatDateToString, fullDate, hourMinute} from './formatDate';

export const groupTransactionsByDate = (transactions = []) => {
  const grouped = transactions?.reduce((acc, transaction) => {
    // Extract the date part from the successful_at field
    const date = transaction?.successful_at?.split('T')[0];

    // If the date is not yet in the accumulator, add it
    if (!acc[date]) {
      acc[date] = [];
    }

    // Add the transaction to the correct date group
    acc[date]?.push(transaction);

    return acc;
  }, {});

  // Convert the grouped object back to an array of grouped transactions
  return Object?.keys(grouped)?.map(date => ({
    date,
    transactions: grouped[date],
  }));
};

export const formatTransactionDate = date => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const currentYear = new Date().getFullYear();
  const thisYear = new Date(date).getFullYear();

  if (date === today) {
    return 'Today';
  } else if (date === yesterday) {
    return 'Yesterday';
  } else if (thisYear === currentYear) {
    return dayMonth(date);
  } else {
    return fullDate(date);
  }
};

export const GroupedTransactions = ({groupedTransactions}) => {
  return (
    <Stack border="1px solid" borderColor="matador_border_color.100" rounded="4px" spacing={0}>
      {groupedTransactions.map((group, idx) => (
        <Stack w="full" key={group.date} bg="matador_background.200">
          <Text
            h="43px"
            fontSize="12px"
            fontWeight="400"
            lineHeight="16.8px"
            letterSpacing="0.01em"
            textAlign="left"
            color="custom_color.color_pop"
            p={3}
            bg="matador_background.100"
            roundedTop={idx !== 0 ? '0' : '8px'}
            textTransform="uppercase"
          >
            {formatTransactionDate(group.date)}
          </Text>

          {group.transactions.map((transaction, idx) => (
            <Flex key={transaction.id} p={'10px'} align="center" justify="space-between">
              <Text
                fontSize="12px"
                fontWeight="400"
                lineHeight="16.8px"
                letterSpacing="0.01em"
                textAlign="right"
                color="matador_text.400"
              >
                {transaction?.successful_at && hourMinute(transaction?.successful_at)}
              </Text>
              <Text
                fontSize="14px"
                fontWeight="500"
                lineHeight="19.6px"
                letterSpacing="0.01em"
                textAlign="right"
                color={transaction?.direction === 'debit' ? '#F04438' : '#12B76A'}
              >
                {transaction?.direction === 'debit' ? '-' : '+'}
                {formatToCurrency(transaction?.amount) || '0'}
              </Text>
            </Flex>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};
