import React from 'react';
import {
  Box,
  VStack,
  Flex,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Center,
} from '@chakra-ui/react';
import {fetchCustomPlanSummary} from '@/api/payment';
import {useQuery} from 'react-query';
import {CloseIcon} from '@chakra-ui/icons';
import {Spinner} from '@/ui-lib';
import {formatToCurrency} from '../../../../utils/formatAmount';
import {drawer_styles} from '@/components/drawers/styles';

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
const Breakdown = ({payment_plan, modal, onCloseModal, FEES}) => {
  const customPlanBreakDown = useQuery(
    ['customPLansummary', payment_plan?.id],
    () => fetchCustomPlanSummary(payment_plan?.id),
    {
      enabled: !!payment_plan,
    }
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
    <Drawer
      autoFocus={false}
      onCloseComplete={onCloseModal}
      isCentered
      onClose={modal?.onClose}
      isOpen={modal?.isOpen}
    >
      <DrawerOverlay />
      <DrawerContent {...drawer_styles}>
        <Flex py="20px" px="24px" justify={'space-between'} align={'center'} w="full">
          <Text
            className="gilda-display-regular"
            fontSize={{base: '18px', md: '20px'}}
            fontWeight={500}
          >
            PAYMENT BREAKDOWN
          </Text>
          <CloseIcon fontSize={'15px'} cursor="pointer" color="text" onClick={modal?.onClose} />
        </Flex>

        <Box
          overflowY={'scroll'}
          __css={customScrollbarStyles}
          p="16px"
          bg="matador_background.100"
          h="full"
        >
          <VStack
            w="full"
            gap={'12px'}
            maxH="50vh"
            overflowY="scroll"
            __css={customScrollbarStyles}
            h="fit-content"
            px="14px"
            bg="matador_background.200"
          >
            <Flex w="full" py="24px" align={'center'} justify={'space-between'}>
              <Text fontSize={'14px'} fontWeight={400} color="matador_text.500">
                Initial Deposit
              </Text>
              <Text color="matador_text.200" fontSize={'16px'} fontWeight={500}>
                {formatToCurrency(payment_plan?.initial_deposit_in_value)}
              </Text>
            </Flex>
            {customPlanBreakDown?.isLoading ? (
              <Center w="full" h="full">
                <Spinner noAbsolute />
              </Center>
            ) : (
              <>
                {customPlanBreakDown.data?.data?.data?.map((item, idx) => (
                  <Flex key={idx} w="full" py="24px" align={'center'} justify={'space-between'}>
                    <Text fontSize={'14px'} fontWeight={400} color="matador_text.500">
                      {`After ${item?.period_in_months} month${
                        Number(item?.period_in_months) > 1 ? 's' : ''
                      }`}
                    </Text>
                    <Text color="matador_text.200" fontSize={'16px'} fontWeight={500}>
                      {item?.amount ? formatToCurrency(item?.amount) : '-'}
                    </Text>
                  </Flex>
                ))}
              </>
            )}
          </VStack>

          {Boolean(FEES?.length) && (
            <VStack
              mt="12px"
              w="full"
              gap={'12px'}
              maxH="50vh"
              overflowY="scroll"
              __css={customScrollbarStyles}
              h="fit-content"
              px="14px"
              bg="matador_background.200"
            >
              {FEES?.map((fee, i) => (
                <Flex key={i} w="full" py="24px" align={'center'} justify={'space-between'}>
                  <Text fontSize={'14px'} fontWeight={400} color="matador_text.500">
                    {fee?.name}
                  </Text>
                  <Text color="matador_text.200" fontSize={'16px'} fontWeight={500}>
                    {formatToCurrency(fee?.amount)}
                  </Text>
                </Flex>
              ))}
            </VStack>
          )}
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default Breakdown;
