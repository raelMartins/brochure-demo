import {calculateFee} from '@/utils/calculateFee';
import {CopyIcon} from '@chakra-ui/icons';
import {Box, Center, Flex, Image, Stack, Text} from '@chakra-ui/react';
import processingLoader from '../../../images/processing-transaction.gif';

export const BankTransfer = ({amount, isLoading, transferDetails, handleCopy, setStep}) => {
  return (
    <>
      {isLoading ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'}>
          <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
          <Text
            color="text"
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            fontSize={'24px'}
            my={{base: '12px', md: '16px'}}
          >
            Fetching bank details
          </Text>
          <Text color="text" opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Box p="20px" w="full">
          <Stack
            p="24px 14px"
            w="full"
            maxH="91px"
            border="1px solid"
            borderColor={'custom_color.color_pop'}
            bg={`custom_color.opacity_pop._20`}
            align={'center'}
            justify={'center'}
            gapp="2px"
          >
            <Text color="text" fontSize={'12px'} fontWeight={400} textTransform="uppercase">
              amount to deposit
            </Text>
            <Text color="matador_text.300" fontSize="16px" fontWeight={500}>
              {calculateFee(amount)}
            </Text>
          </Stack>
          <Stack
            w="full"
            color="text"
            my="22px"
            minH="100px"
            justify={'center'}
            align="center"
            gap="23px"
            border="1px solid"
            borderColor={'custom_color.color_pop'}
            bg={`custom_color.opacity_pop._20`}
            p="14px"
          >
            <Box w="full">
              <Flex
                w="full"
                maxW="140px"
                mx="auto"
                p="8px"
                justify={'space-between'}
                align={'center'}
                rounded="4px"
              >
                <Stack w="full" justify="center" textAlign={'center'} gap={0}>
                  <Text fontSize={'10px'} fontWeight={500}>
                    {transferDetails?.account_bank_name ?? '-'}
                  </Text>
                  <Text fontSize={'14px'} fontWeight={600} letterSpacing={'0.12px'}>
                    {transferDetails?.account_number ?? '02'}
                  </Text>
                </Stack>
                <CopyIcon
                  onClick={handleCopy}
                  fontSize={'15'}
                  color="#FFFFFF"
                  cursor="pointer"
                  boxSize={4}
                />
              </Flex>
            </Box>
            <Text fontWeight={500}>Account Name: {transferDetails?.account_name}</Text>
          </Stack>
        </Box>
      )}
    </>
  );
};
