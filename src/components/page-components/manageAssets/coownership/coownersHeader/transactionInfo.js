import {Box, HStack, Image, Stack, Text, useMediaQuery} from '@chakra-ui/react';
import ChakraBox from '../../chakraBox';
import HoverText from '@/ui-lib/ui-lib.components/hover/hoverOnText';
import progressLine from '@/images/icons/progressLine.svg';
import {progress} from 'framer-motion';

const TransactionInfo = ({equityInfo, transactionInfo}) => {
  const [isBelowXl] = useMediaQuery('(max-width: 535px)');

  return (
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
        <Stack spacing={{base: '8.66px', lg: '16px'}} mt={{base: '9.05px', md: '12.88px'}} w="full">
          <Stack gap="16px">
            <Text
              textAlign="end"
              maxW={transactionInfo?.progress}
              fontSize={{md: '16px', base: '10px'}}
              fontWeight="400"
              color="#ffffff"
            >
              {transactionInfo?.progress}
            </Text>
            <Box borderRadius="48px" h="8px" bg="#FFFFFF99" w="full">
              <Image
                w="14px"
                h="25px"
                mt="-0.55rem"
                position="absolute"
                left={transactionInfo.progress}
                src={progressLine.src}
                alt=""
              />
              <ChakraBox
                roundedLeft="48px"
                h="full"
                position="relative"
                bg="#ffffff"
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
              />
            </Box>
          </Stack>
        </Stack>
        <HStack w="full" align="center" justify="space-between">
          <Text fontSize={{base: '10px', md: '16px'}} fontWeight="400" color={'#ffffff'}>
            Total Paid
          </Text>
          <Text
            fontSize={{base: '10px', md: '16px'}}
            fontWeight="600"
            lineHeight={{base: '19px', md: '26px'}}
            color="#ffffff"
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
        >
          <HStack
            w="full"
            justify="space-between"
            border=" 0.5px solid"
            borderColor="custom_color.color_pop"
            rounded="4px"
            p={{md: '18.961px 24.366px', base: '8px'}}
            maxH={{base: '81.68px', md: '78px'}}
            align="center"
          >
            <Stack spacing={{base: '2.41px', md: '3.3px'}}>
              <Text
                textTransform="capitalize"
                color="text.3"
                fontSize={{base: '10px', md: '12px'}}
                fontWeight="400"
                whiteSpace="nowrap"
              >
                Due Balance
              </Text>
              <Text fontSize={{base: '12px', md: '14px'}} color="text.1" fontWeight={500}>
                {transactionInfo?.due_balance}
              </Text>
            </Stack>
            <Stack spacing={{base: '2.41px', md: '3.3px'}} align="end">
              <Text
                textTransform="capitalize"
                color="text.3"
                fontSize={{md: '12px', base: '10px'}}
                fontWeight="400"
              >
                Due Date
              </Text>

              <Text
                letterSpacing="0.12px"
                textAlign="right"
                fontSize={{base: '12px', md: '14px'}}
                color="text.1"
                fontWeight={500}
              >
                {transactionInfo?.due_date}
              </Text>
            </Stack>
          </HStack>

          <HStack
            w="full"
            justify="center"
            border=" 0.5px solid"
            borderColor="custom_color.color_pop"
            rounded="4px"
            maxH={{base: 'full', md: '78px'}}
            h="full"
            p={{base: '8px 51.818px', md: '18.961px 12.366px'}}
          >
            <Stack spacing={{base: '2.41px', md: '3.43px'}} align="center">
              <Text
                textTransform="capitalize"
                color="text.3"
                fontSize={{md: '12px', base: '10px'}}
                fontWeight="400"
              >
                Outstanding Balance
              </Text>
              <Text
                fontSize={{md: '16px', base: '10px'}}
                fontWeight={{base: '700', md: '500'}}
                color="text.1"
              >
                {transactionInfo?.outStanding_balance}
              </Text>
            </Stack>
          </HStack>
        </Stack>
      ) : null}
    </Stack>
  );
};

export default TransactionInfo;
