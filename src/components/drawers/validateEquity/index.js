import {HStack, Text, useDisclosure, Box, VStack, Flex} from '@chakra-ui/react';
import React, {useState} from 'react';
import {useQuery} from 'react-query';
import DrawerForOffers from './drawer';
import {CloseIcon} from '@chakra-ui/icons';
import {fetchForCustomerEquityValidation} from '@/api/listing';
import {Button} from '@/ui-lib/ui-lib.components/Button';
import useLocalStorage from '@/utils/hooks/useLocalStorage';
import ValidateEquityIcon from '@/components/assets/validateEquity';
import {LoggedinUser} from '@/constants/routes';

export const ValidateEquityBar = () => {
  const [willDisplay, setWillDisplay] = useState(true);
  const [business_id] = useLocalStorage('businessId');
  const fetchcustomeQuery = useQuery(
    ['fetchcustomervalidationEquity'],
    () => fetchForCustomerEquityValidation(business_id),
    {refetchOnMount: true}
  );
  const assetData = fetchcustomeQuery?.data?.data?.all_pending_requests;

  const drawerDisclosure = useDisclosure();

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
              p={{base: '12px', md: '24px'}}
              gap={{base: '4px', md: '12px'}}
              boxShadow={
                '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)'
              }
            >
              <HStack align={'flex-start'} spacing={{base: '16px', md: '24px'}}>
                <HStack p={{base: '4px', md: '10px'}} justify="center" align="center">
                  <ValidateEquityIcon />
                </HStack>

                <VStack align={'flex-start'} spacing={'4px'}>
                  <Text fontSize={{base: '16px', md: '20px'}} fontWeight={{base: 500}}>
                    Hi{firstname ? ` ${firstname}` : ``}, Welcome Onboard
                  </Text>
                  <Text fontSize={{base: '14px', md: '14px'}} fontWeight={400}>
                    Could you spare a moment to quickly verify some past transactions?.
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
            refetch={fetchcustomeQuery?.refetch}
            assetData={assetData}
            isLoading={fetchcustomeQuery?.assetLoading}
            isOpen={drawerDisclosure.isOpen}
            drawer={drawerDisclosure}
            isError={fetchcustomeQuery?.isError}
          />
        </>
      ) : null}
    </Box>
  );
};

export default ValidateEquityBar;
