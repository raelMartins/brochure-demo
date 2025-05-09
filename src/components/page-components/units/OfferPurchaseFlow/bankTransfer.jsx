'use client';
import {CustomCopyIcon} from '@/components/assets/WalletIcons';
import {Button} from '@/ui-lib/ui-lib.components/Button';
import {calculateFee} from '@/utils/calculateFee';
import {Box, Center, Text, useClipboard, VStack} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';

export const BankTransfer = ({setStep, amountToPay, trasferDetails}) => {
  const router = useRouter();
  const {hasCopied, onCopy} = useClipboard(trasferDetails?.account_number);

  return (
    <>
      <VStack
        display="flex"
        padding="1rem"
        py={{base: '21px', md: 'unset'}}
        gap={{base: '16px', md: '25.347px'}}
        minH={{base: '255px', md: '402px'}}
        h={'fit-content'}
        justify={'center'}
        maxW={{base: 'full', md: '602px'}}
        background="custom_color.opacity_pop._10"
      >
        <Center flexDirection={'column'}>
          <Text {...keyTextStyle}>{`You'll Pay`}</Text>
          <Text display={'flex'} {...valTextStyle}>
            {calculateFee(amountToPay)}
          </Text>
        </Center>
        <Center flexDirection={'column'}>
          <Text {...keyTextStyle}>{`Bank`}</Text>
          <Text {...valTextStyle}>{trasferDetails?.account_bank_name}</Text>
        </Center>

        <Center flexDirection={'column'} position={'relative'} w="250px">
          <Text {...keyTextStyle}>{`Account Number`}</Text>
          <Text {...valTextStyle}> {trasferDetails?.account_number}</Text>
          <Box position={'absolute'} right={0}>
            {hasCopied ? (
              <Text color="custom_color.color_pop" fontSize="12px" fontWeight="500">
                Copied!
              </Text>
            ) : (
              <CustomCopyIcon color="text" onClick={onCopy} />
            )}
          </Box>
        </Center>
        <Center flexDirection={'column'}>
          <Text {...keyTextStyle}>{`Account Name`}</Text>
          <Text {...valTextStyle}>{trasferDetails?.account_name}</Text>
        </Center>
      </VStack>
      <Button
        w="full"
        color="custom_color.contrast"
        type="submit"
        border="none"
        bg="custom_color.color"
        h={{base: '48px', md: '60px'}}
        fontSize="16px"
        fontWeight="400"
        cursor="pointer"
        borderRadius="56.25px"
        transition="0.3s ease-in-out"
        _hover={{
          opacity: `1`,
        }}
        _active={{
          opacity: `1`,
        }}
        onClick={() => {
          setStep('paymentSummary');
          router.push('/');
        }}
      >
        Done
      </Button>
    </>
  );
};

const keyTextStyle = {
  color: 'matador_text.400',
  fontSize: {base: '12px', md: '19.011px'},
  fontStyle: 'normal',
  fontWeight: '400',
  letterSpacing: '0.19px',
  textTransform: 'uppercase',
};

const valTextStyle = {
  color: 'text',
  fontSize: {base: '15.15px', md: '24px'},
  fontStyle: 'normal',
  fontWeight: '500',
};
