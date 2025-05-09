import {HStack, Text, useDisclosure, Box, VStack, Flex} from '@chakra-ui/react';
import React, {useState} from 'react';
import {useQuery} from 'react-query';
import DrawerForOffers from './drawer';
import {CloseIcon} from '@chakra-ui/icons';
import {fetchOffers} from '@/api/listing';
import OffersIcon from '@/components/assets/offers';
import {Button} from '@/ui-lib/ui-lib.components/Button';

export const OffersBar = () => {
  const [willDisplay, setWillDisplay] = useState(true);
  const pendingQuery = useQuery(['fetchUserEquity', 'OFFERS'], fetchOffers, {refetchOnMount: true});
  const assetData = pendingQuery?.data?.data?.data;

  const drawerDisclosure = useDisclosure();

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
              <HStack align={'flex-start'} spacing={{base: '12px', md: '24px'}}>
                <HStack p={{base: '4px', md: '10px'}} justify="center" align="center">
                  <OffersIcon />
                </HStack>

                <VStack align={'flex-start'} spacing={'4px'}>
                  <Text fontSize={{base: '16px', md: '20px'}} fontWeight={{base: 500}}>
                    We have sent you have an offer!
                  </Text>
                  <Text fontSize={{base: '14px', md: '14px'}} fontWeight={400}>
                    Please complete the transaction before it expires.
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

export default OffersBar;
