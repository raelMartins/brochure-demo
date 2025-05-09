'use client';
import {CustomCopyIcon} from '@/components/assets/WalletIcons';
import {Button} from '@/ui-lib/ui-lib.components/Button';
import {calculateFee} from '@/utils/calculateFee';
import {Box, Center, Text, useClipboard, VStack} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';
import {TbCopy, TbCopyCheckFilled} from 'react-icons/tb';

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
        <Center flexDirection={'column'} gap={`8px`}>
          <Text {...keyTextStyle}>{`You'll Pay`}</Text>
          <Text display={'flex'} {...valTextStyle}>
            {calculateFee(amountToPay)}
          </Text>
        </Center>
        <Center flexDirection={'column'} gap={`8px`}>
          <Text {...keyTextStyle}>{`Bank`}</Text>
          <Text {...valTextStyle}>{trasferDetails?.account_bank_name}</Text>
        </Center>

        <Center flexDirection={'column'} position={'relative'} w="250px">
          <Text {...keyTextStyle}>{`Account Number`}</Text>
          <Text {...valTextStyle}> {trasferDetails?.account_number}</Text>
          <Box position={'absolute'} right={0} color={`custom_color.color_pop`}>
            {hasCopied ? <TbCopyCheckFilled /> : <TbCopy onClick={onCopy} />}
          </Box>
        </Center>
        <Center flexDirection={'column'} gap={`8px`}>
          <Text {...keyTextStyle}>{`Account Name`}</Text>
          <Text {...valTextStyle}>{trasferDetails?.account_name}</Text>
        </Center>
      </VStack>
      <Button
        variation={`secondary`}
        type="submit"
        onClick={() => {
          setStep('plans');
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
