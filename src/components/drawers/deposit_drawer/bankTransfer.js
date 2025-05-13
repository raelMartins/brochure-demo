import {calculateFee} from '@/utils/calculateFee';
import {CopyIcon} from '@chakra-ui/icons';
import {Box, Center, Flex, HStack, Image, Stack, Text, useToast, VStack} from '@chakra-ui/react';
import processingLoader from '../../../images/processing-transaction.gif';
import ThreeDots from '@/components/loaders/ThreeDots';
import {ToastTemplate} from '@/components/fullScreenPrerequisites/toastTemplate';
import {useState} from 'react';

export const BankTransfer = ({isLoading, transferDetails}) => {
  const toast = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator?.clipboard?.writeText(transferDetails?.account_number);
    toast({
      render: () => <ToastTemplate title={`Success!`} description={'Account Number Copied!'} />,
      duration: 1500,
      isClosable: true,
      position: 'top-right',
    });
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
    return;
  };

  return (
    <>
      {isLoading ? (
        <Center minH={`300px`} flexDirection={'column'}>
          <ThreeDots boxSize={{base: `15px`, lg: `30px`}} circular />
        </Center>
      ) : (
        <Box p="20px" w="full">
          <Stack
            w="full"
            color="text"
            minH="100px"
            justify={'center'}
            align="center"
            gap="16px"
            border="1px solid"
            borderColor={'custom_color.color_pop'}
            bg={`custom_color.opacity_pop._20`}
            p="20px"
          >
            <VStack gap={`5px`}>
              <Text
                fontWeight={`400`}
                fontSize={`11.62px`}
                lineHeight={`140%`}
                letterSpacing={`1%`}
                textTransform={`uppercase`}
              >
                Bank
              </Text>
              <Text
                fontWeight={`500`}
                fontSize={`13.56px`}
                lineHeight={`140%`}
                letterSpacing={`1%`}
              >
                {transferDetails?.account_bank_name ?? '--'}
              </Text>
            </VStack>
            <VStack gap={`5px`}>
              <Text
                fontWeight={`400`}
                fontSize={`11.62px`}
                lineHeight={`140%`}
                letterSpacing={`1%`}
                textTransform={`uppercase`}
              >
                Account Number
              </Text>
              <HStack justify={`center`} gap={`15px`} onClick={handleCopy} cursor={`pointer`}>
                <Text
                  fontWeight={`500`}
                  fontSize={`13.56px`}
                  lineHeight={`140%`}
                  letterSpacing={`1%`}
                >
                  {transferDetails?.account_number ?? '--'}
                </Text>
                <CopyIcon color={copied ? `custom_color.color_pop` : `text`} />
              </HStack>
            </VStack>
            <VStack gap={`5px`}>
              <Text
                fontWeight={`400`}
                fontSize={`11.62px`}
                lineHeight={`140%`}
                letterSpacing={`1%`}
                textTransform={`uppercase`}
              >
                Account Name
              </Text>
              <Text
                fontWeight={`500`}
                fontSize={`13.56px`}
                lineHeight={`140%`}
                letterSpacing={`1%`}
              >
                {transferDetails?.account_name ?? '--'}
              </Text>
            </VStack>
          </Stack>
        </Box>
      )}
    </>
  );
};
