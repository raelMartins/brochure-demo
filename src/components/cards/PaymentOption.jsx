'use client';

import {ColorBackground} from '@/ui-lib/ui-lib.components/ColorBackground';
import {Box, Center, Divider, Flex, HStack, Stack, Text} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';
import {FiArrowUpRight} from 'react-icons/fi';

export const PaymentOptionContent = ({data, setStep, setSelectedPlan, setFullPayment}) => {
  const handle_click = () => {
    setFullPayment(false);
    setStep('paymentSummary');
    setSelectedPlan(data);
  };

  return (
    <HStack
      gap={`40px`}
      maxW={{base: `650px`}}
      w={`100%`}
      mx={{base: `auto`}}
      aspectRatio={{base: `650 / 388`}}
      p={{base: `97px 22px`}}
      cursor={`pointer`}
      onClick={handle_click}
    >
      <Flex flexDir={`column`} alignItems={`flex-start`} gap={`8px`}>
        <Text
          fontSize={{base: '20px', md: `29.6px`}}
          fontWeight={`500`}
          lineHeight={{base: '130%', md: `27px`}}
          textAlign={`left`}
          fontFamily={`var(--font_montserrat)`}
          textTransform={`uppercase`}
          letterSpacing={`1%`}
        >
          {data?.plan_type === `outright purchase` || data?.plan_type === `outright`
            ? data?.plan_type
            : `${data?.payment_period_in_months} months plan`}
        </Text>
        <Divider
          borderColor={
            data?.plan_type === `outright purchase` || data?.plan_type === `outright`
              ? `custom_color.color_pop`
              : `custom_color.contrast_pop`
          }
          w={`100%`}
        />
        <HStack gap={{base: `26px`}}>
          {data?.initial_deposit_in_value && (
            <Stack gap={`4px`}>
              <Text
                fontSize={{base: '10px', md: `12px`}}
                fontWeight={`400`}
                lineHeight={{base: '150%', md: `16.8px`}}
                letterSpacing={`1%`}
                textAlign={`left`}
                textTransform={`uppercase`}
              >
                Initial Deposit
              </Text>

              <Text
                fontSize={{base: '12px', md: `16px`}}
                fontWeight={`600`}
                lineHeight={{base: '140%', md: `22.4px`}}
                textAlign={`left`}
                letterSpacing={`1%`}
              >
                #
                {Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }).format(data?.initial_deposit_in_value || 0)}
              </Text>
            </Stack>
          )}
          {data?.plan_type === 'manual' && data?.payment_frequency && (
            <Stack gap={`4px`}>
              <Text
                fontSize={{base: '10px', md: `12px`}}
                fontWeight={`400`}
                lineHeight={{base: '150%', md: `16.8px`}}
                letterSpacing={`1%`}
                textAlign={`left`}
                textTransform={`uppercase`}
              >
                Monthly Payment
              </Text>

              <Text
                fontSize={{base: '12px', md: `16px`}}
                fontWeight={`600`}
                lineHeight={{base: '140%', md: `22.4px`}}
                textAlign={`left`}
                letterSpacing={`1%`}
              >
                #
                {Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }).format(data?.periodic_payment * 1 || 0)}
              </Text>
            </Stack>
          )}
          {data?.purchase_price && (
            <Stack gap={`4px`}>
              <Text
                fontSize={{base: '10px', md: `12px`}}
                fontWeight={`400`}
                lineHeight={{base: '150%', md: `16.8px`}}
                letterSpacing={`1%`}
                textAlign={`left`}
                textTransform={`uppercase`}
              >
                Purchase Price
              </Text>

              <Text
                fontSize={{base: '12px', md: `16px`}}
                fontWeight={`600`}
                lineHeight={{base: '140%', md: `22.4px`}}
                textAlign={`left`}
                letterSpacing={`1%`}
              >
                #
                {Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }).format(data?.purchase_price * 1 || 0)}
              </Text>
            </Stack>
          )}
        </HStack>
      </Flex>
      <Center display={{base: 'none', md: 'block'}}>
        <FiArrowUpRight fontSize={`16px`} />
      </Center>
    </HStack>
  );
};

export const PaymentOption = ({data, setStep, setSelectedPlan, setFullPayment}) => {
  return (
    <Box bg={`custom_color.color_pop`} color={`custom_color.contrast_pop`}>
      <PaymentOptionContent
        setFullPayment={setFullPayment}
        setSelectedPlan={setSelectedPlan}
        setStep={setStep}
        data={data}
      />
    </Box>
  );
};
