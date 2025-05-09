import {HStack, Text, useDisclosure, Box, VStack, Flex} from '@chakra-ui/react';
import React, {useState} from 'react';
import {useQuery} from 'react-query';
import DrawerForOffers from './drawer';
import {CloseIcon} from '@chakra-ui/icons';
import {fetchUserEquity} from '@/api/listing';
import PendingTransactionsIcon from '@/components/assets/pendingTransactions';
import {Button} from '@/ui-lib/ui-lib.components/Button';
import useGetSession from '@/utils/hooks/getSession';

export const PendingTransactionsBar = () => {
  const [willDisplay, setWillDisplay] = useState(true);
  const pendingQuery = useQuery(['fetchUserEquity', 'PENDING'], () => fetchUserEquity('PENDING'), {
    refetchOnMount: true,
  });
  const assetData = pendingQuery?.data?.data?.results;

  const drawerDisclosure = useDisclosure();

  const {sessionData: LoggedinUser} = useGetSession('loggedIn');
  const user = LoggedinUser;

  const firstname = user?.first_name;

  return (
    <Box w="full" my="10px">
      {assetData?.length ? (
        <>
          {willDisplay && (
            <Flex
              maxW={'600px'}
              direction={'column'}
              borderRadius={'4px'}
              border="1px solid"
              borderColor={`custom_color.opacity_pop._20`}
              bg="matador_background.200"
              color={`text`}
              p={{base: '12px', md: '24px'}}
              gap={{base: '4px', md: '12px'}}
              boxShadow={
                '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)'
              }
            >
              <HStack align={'flex-start'} spacing={{base: '16px', md: '24px'}}>
                <HStack p={{base: '4px', md: '10px'}} justify="center" align="center">
                  <PendingTransactionsIcon />
                </HStack>

                <VStack align={'flex-start'} spacing={'4px'}>
                  <Text fontSize={{base: '16px', md: '20px'}} fontWeight={{base: 500}}>
                    {`${firstname}, You have ${assetData?.length} pending transaction${
                      assetData?.length > 1 ? 's' : ''
                    }`}
                  </Text>
                  <Text fontSize={{base: '14px', md: '14px'}} fontWeight={400}>
                    Please proceed to complete the transaction at your earliest convenience.
                  </Text>
                </VStack>
              </HStack>
              <HStack alignSelf={'flex-end'} spacing={{base: '8px', md: '18px'}} pr="4px">
                <Button
                  variation={`tertiary`}
                  h={{base: '23px', md: '44px'}}
                  w={{base: '47px', md: '75px'}}
                  onClick={() => setWillDisplay(false)}
                  fontSize={{base: '13px', md: '16px'}}
                  fontWeight={{base: '500', md: '500'}}
                  px="32px"
                  py="13px"
                >
                  Skip
                </Button>
                <Button
                  variation={`primary`}
                  h={{base: '23px', md: '44px'}}
                  w={{base: '47px', md: '75px'}}
                  onClick={drawerDisclosure.onOpen}
                  fontSize={{base: '13px', md: '16px'}}
                  fontWeight={{base: '500', md: '500'}}
                  px="32px"
                  py="13px"
                >
                  View
                </Button>

                {/* <CloseIcon
                  display={{base: 'none', md: 'block'}}
                  fontSize="11px"
                  onClick={() => setWillDisplay(false)}
                  cursor="pointer"
                /> */}
              </HStack>
            </Flex>
          )}
          <DrawerForOffers
            refetch={pendingQuery?.refetch}
            assetData={assetData}
            isLoading={pendingQuery?.assetLoading}
            isOpen={drawerDisclosure.isOpen}
            drawer={drawerDisclosure}
            isError={pendingQuery?.isError}
          />
        </>
      ) : null}
    </Box>
  );
};

export default PendingTransactionsBar;
