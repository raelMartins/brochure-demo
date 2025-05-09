import {formatToCurrency} from '@/utils/formatAmount';
import {demarcatedDateTime} from '@/utils/formatDate';
import {HStack, Text} from '@chakra-ui/react';

const FRACTIONTRANSACTIONHISTORYCOLUMN = [
  {
    Header: 'Amount',
    accessor: row => {
      return (
        <HStack w="full" justify="start" py={{base: '5.34px', md: '7.83px'}}>
          <Text
            color="text"
            fontSize={{base: '10px', md: '15.429px'}}
            fontWeight={{base: '400', md: '500'}}
          >
            {formatToCurrency(row?.equity_value)}
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'no of fraction',
    accessor: row => {
      return (
        <HStack
          w="full"
          border="1px solid"
          borderColor="custom_color.color_pop"
          rounded="4px"
          justify="center"
          p="8px 12px"
          maxW="45px"
        >
          <Text fontSize={{base: '12px', md: '14.5px'}} fontWeight="400" color="text.1">
            {row?.amount}
          </Text>
        </HStack>
      );
    },
  },

  {
    Header: 'Date',
    accessor: row => {
      return (
        <HStack w="full" justify="end" py={{base: '5.34px', md: '7.83px'}}>
          <Text color="text" fontSize={{base: '10px', md: '13.429px'}} fontWeight="400">
            {demarcatedDateTime(row?.created_at)}
          </Text>
        </HStack>
      );
    },
  },
];

export default FRACTIONTRANSACTIONHISTORYCOLUMN;
