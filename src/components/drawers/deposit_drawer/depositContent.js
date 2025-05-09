import {FormInput} from '@/ui-lib/ui-lib.components/Input';
import {Box, Text, VStack} from '@chakra-ui/react';
import {MY_COUNTRY} from '@/constants/country';
import {PaymentTypeCard} from '@/components/page-components/units/PaymentTypeCard';

export const DepositContent = ({setAmount, setAmountError, handleSelect, amount, amountError}) => {
  const methods = [
    {
      id: '2',
      title: 'Wallet',
      desc: 'Make payment from your wallet',
      variation: `secondary`,
    },
    {
      id: '3',
      title: 'Bank Transfer',
      desc: 'Transfer payment into a designated account',
      variation: `primary`,
    },
    {
      id: '1',
      title: 'Debit/Credit Card',
      desc: 'Use card to complete payment',
      variation: `primary`,
    },
  ];

  const handleInput = e => {
    const formatNumber = parseInt(e.target.value.replace(/,/g, '')).toLocaleString();
    setAmountError('');
    if (formatNumber !== 'NaN') {
      setAmount(formatNumber);
    } else {
      setAmount('');
    }
  };
  return (
    <Box p="20px">
      <FormInput
        leftAddon={
          <Text marginTop="1rem" color="text" fontSize={'20px'}>
            {MY_COUNTRY?.symbol}
          </Text>
        }
        label="Amount to deposit"
        onChange={handleInput}
        value={amount}
        error={amountError}
        h="60px"
        rounded="24px"
        labelStyle={{
          textTransform: 'uppercase',
          color: 'matador_text.300',
          letterSpacing: '.14px',
          fontWeight: '500',
        }}
        pl={`30px`}
      />
      <Text
        color="text"
        mt="16px"
        fontSize={{base: '13px', md: '16px'}}
        textTransform="uppercase"
        letterSpacing="0.14px"
        fontWeight={500}
      >
        Select a Payment Method
      </Text>
      <VStack spacing="12px" mt="16px" align={'stretch'}>
        {methods.map(method => (
          <PaymentTypeCard
            onClick={() => handleSelect(method)}
            type={method.title}
            variation={method.variation}
            subHeading={method.desc}
            tag={null}
          />
        ))}
      </VStack>
    </Box>
  );
};
