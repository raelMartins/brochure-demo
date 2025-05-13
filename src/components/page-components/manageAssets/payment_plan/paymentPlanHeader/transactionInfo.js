import {Box, HStack, Image, Stack, Text, useDisclosure} from '@chakra-ui/react';
import React from 'react';
import CustomPaymentBreakdownForAssets from './paymentBreakDown';
import ChakraBox from '../../chakraBox';
import HoverText from '@/ui-lib/ui-lib.components/hover/hoverOnText';
import thinArrow from '/src/images/icons/thinArrow.svg';
import progressLine from '@/images/icons/progressLine.svg';
import ExploreArrow from '@/components/assets/exploreArrow';

const TransactionInfo = ({equityInfo, transactionInfo}) => {
  const drawerDisclosure = useDisclosure();

  return (
    <>
      <Stack spacing="14px" w="full">
        <Stack
          p={{base: '8.661px 12.991px', md: '20.61px 23.907px'}}
          spacing="8.66px"
          justifyContent="center"
          w="full"
          bg="custom_color.color_pop"
          h={{md: '115.86px', base: '73.13px'}}
          boxShadow="0px 3.434px 8.584px 0px rgba(0, 0, 0, 0.03)"
          borderRadius="4px"
        >
          <Stack
            spacing={{base: '8.66px', lg: '16px'}}
            mt={{base: '9.05px', md: '12.88px'}}
            w="full"
          >
            <Stack gap="16px">
              <Text
                textAlign="end"
                maxW={transactionInfo?.progress}
                fontSize={{md: '16px', base: '10px'}}
                fontWeight="400"
                color="custom_color.contrast_pop"
                whiteSpace="nowrap"
              >
                {transactionInfo?.progress}
              </Text>
              <Box borderRadius="48px" h="8px" bg="custom_color.opacity._20" w="full">
                <ChakraBox
                  roundedLeft="48px"
                  h="full"
                  position="relative"
                  bg="custom_color.contrast_pop"
                  initial={{
                    width: '0%',
                  }}
                  animate={{
                    width: `${transactionInfo.progress}`,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.4,
                    ease: 'easeInOut',
                  }}
                  maxW="100%"
                >
                  <Box
                    h={`25px`}
                    width={`5px`}
                    borderRadius={`2.5px`}
                    bg={`custom_color.contrast_pop`}
                    ml={`0px`}
                    position={`absolute`}
                    top={`-9px`}
                    right={`0px`}
                  />
                </ChakraBox>
              </Box>
            </Stack>
          </Stack>
          <HStack w="full" align="center" justify="space-between">
            <Text
              fontSize={{base: '10px', md: '16px'}}
              fontWeight="400"
              color={'custom_color.contrast_pop'}
            >
              Total Paid
            </Text>
            <Text
              fontSize={{base: '10px', md: '16px'}}
              fontWeight="600"
              lineHeight={{base: '19px', md: '26px'}}
              color="custom_color.contrast_pop"
            >
              {transactionInfo?.amountPaid}
            </Text>
          </HStack>
        </Stack>
        {equityInfo?.payment_plan ? (
          <Stack
            direction={{base: 'column', lg: 'row'}}
            w="full"
            spacing={{base: '12.33px', md: '21.84px'}}
            pb="8px"
            align={`stretch`}
          >
            <HStack
              w="full"
              justify="space-between"
              border="1px solid"
              borderColor="custom_color.color_pop"
              borderRadius="4px"
              p={{md: '20.61px 23.907px', base: ' 13.88px 9.052px'}}
              minH="78px"
              alignSelf="stretch"
              align="center"
            >
              <Stack justify="center" h="full" spacing={{base: '2.41px', md: '3.43px'}}>
                <Text
                  textTransform="capitalize"
                  color="text.3"
                  fontSize={{md: '12px', base: '10px'}}
                  fontWeight="400"
                >
                  Due Balance
                </Text>
                <HoverText
                  lens={[8, 20]}
                  text={transactionInfo.due_balance}
                  fontSize={{md: '12px', base: '10px'}}
                  fontWeight={{base: '700', md: '500'}}
                  color="text.1"
                />
              </Stack>
              <Stack
                h="full"
                justify="center"
                spacing={{base: '2.41px', md: '3.43px'}}
                align="flex-end"
              >
                <Text
                  textTransform="capitalize"
                  color="text.3"
                  fontSize={{md: '12px', base: '10px'}}
                  fontWeight="400"
                >
                  Due Date
                </Text>

                <HoverText
                  text={transactionInfo.due_date}
                  fontSize={{md: '11px', base: '9px'}}
                  fontWeight={{base: '700', md: '500'}}
                  color="text.1"
                  textAlign="end"
                />
              </Stack>
            </HStack>
            <HStack
              w="full"
              justify="center"
              border="1px solid"
              borderColor="custom_color.color_pop"
              minH="78px"
              rounded="4px"
              p={{base: '12.019px 10.094px', md: '20.61px 23.907px'}}
            >
              <Stack spacing={{base: '2.41px', md: '3.43px'}} align="center">
                <Text
                  textTransform="capitalize"
                  color="text.3"
                  fontSize={{md: '12px', base: '9px'}}
                  fontWeight="400"
                >
                  Outstanding Balance
                </Text>
                <Text
                  fontSize={{md: '14px', base: '10px'}}
                  fontWeight={{base: '700', md: '500'}}
                  color="text.1"
                >
                  {transactionInfo?.outStanding_balance}
                </Text>
                {/* {equityInfo?.payment_plan?.plan_type === 'custom' ? ( */}
                {equityInfo?.payment_plan ? (
                  <HStack
                    role="button"
                    onClick={drawerDisclosure.onOpen}
                    spacing="3px"
                    justify={`center`}
                    flexWrap={`wrap`}
                  >
                    <Text
                      textTransform="uppercase"
                      color="custom_color.color_pop"
                      fontSize={{md: '10px', base: '8px'}}
                      fontWeight="400"
                      textAlign={`center`}
                    >
                      View Payment Breakdown
                    </Text>
                    <ExploreArrow boxSize="14px" />
                  </HStack>
                ) : null}
              </Stack>
            </HStack>
          </Stack>
        ) : null}
      </Stack>
      <CustomPaymentBreakdownForAssets modalDisclosure={drawerDisclosure} equityInfo={equityInfo} />
    </>
  );
};

export default TransactionInfo;
