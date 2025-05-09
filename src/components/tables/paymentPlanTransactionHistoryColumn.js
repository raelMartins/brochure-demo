import HoverText from '@/ui-lib/ui-lib.components/hover/hoverOnText';
import {formatToCurrency} from '@/utils/formatAmount';
import {HStack, Text} from '@chakra-ui/react';
import moment from 'moment';

export const PAYMENTPLANTRANSACTIONHISTORYCOLUMN = [
  {
    Header: 'Date',
    accessor: row => {
      return (
        <HStack justify="end" py={{base: '5.34px', md: '7.83px'}}>
          <Text color="text" fontSize={{base: '10px', xl: '14px'}}>
            {moment(row?.created_at ?? '').format('MMMM D, YYYY')}
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'Amount',
    accessor: row => {
      return (
        <HStack justify="start" py={{base: '5.34px', md: '7.83px'}}>
          <HoverText
            color="text"
            lens={[12, 24]}
            fontSize={{base: '10px', xl: '12.968px'}}
            fontWeight="600"
            text={formatToCurrency(row?.amount ?? '-')}
          />
        </HStack>
      );
    },
  },
];
