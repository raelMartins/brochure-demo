import {HStack, Text} from '@chakra-ui/react';
import HoverText from '@/ui-lib/ui-lib.components/hover/hoverOnText';
import {formatToCurrency} from '@/utils/formatAmount';
import moment from 'moment';
// import PaymentTypeTag from '../../ui-lib/ui-lib.components/Tag/paymentTypeTag';

export const COOWNERSHIPTRANSACTIONHISTORYCOLUMN = [
  {
    Header: 'Amount',
    accessor: row => {
      return (
        <HStack justify="start" py={{base: '5.34px', md: '7.83px'}} fontFamily="Poppins">
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
  {
    Header: 'Date',
    accessor: row => {
      return (
        <HStack justify="end" py={{base: '5.34px', md: '7.83px'}}>
          <Text color="text" fontSize={{base: '10px', xl: '14px'}} fontWeight="500">
            {moment(row?.created_at ?? '').format('MMMM D, YYYY')}
          </Text>
        </HStack>
      );
    },
  },
];
