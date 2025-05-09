'use client';
import {fetchPaymentPlanDoc} from '@/api/listings';
import AuthTermsCheck from '@/components/assets/authTermsCheck';
import {PaymentExternalOpen} from '@/components/assets/PaymentExternalOpen';
import {formatToCurrency} from '@/realtors_portal/utils';
import {Button} from '@/ui-lib/ui-lib.components/Button';
import {Box, Flex, HStack, Icon, Text, useDisclosure, useTheme, VStack} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import Breakdown from './breakdown';
import {PaymentAccess} from '@/components/payment_flow/PaymentAccess';

export const PaymentSummary = ({assetToUse, setStep, setAmountToPay}) => {
  const {onToggle, isOpen} = useDisclosure();
  const breakdownDisclosure = useDisclosure();
  const theme = useTheme();
  const primaryColor = theme?.colors?.custom_color?.color_pop;
  const {initial_deposit_in_value, periodic_payment, payment_frequency, plan_type} =
    assetToUse?.payment_plan || {};
  console.log('assetToUse', assetToUse);

  const FEES = assetToUse?.payment_plan
    ? assetToUse?.payment_plan?.bundle?.fees
    : assetToUse?.unit?.fees;
  const amount = initial_deposit_in_value || assetToUse?.unit?.price;

  const handleProceed = () => {
    const accumulatedFeeAndAmount = FEES?.reduce(
      (acc, obj) => acc + Number(obj?.amount),
      Number(amount)
    );
    setAmountToPay(accumulatedFeeAndAmount);
    setStep('paymentMethod');
  };

  const param = !assetToUse?.payment_plan
    ? `unit=${assetToUse?.unit?.id}&purpose=outright`
    : `plan=${assetToUse?.payment_plan?.id}&purpose=paymentplan`;
  const projectDocQuery = useQuery(['fetchPaymentPlanDoc', param], () =>
    fetchPaymentPlanDoc(param)
  );
  const projectDocument =
    projectDocQuery.data?.data?.results?.[0]?.document_file ||
    projectDocQuery.data?.data?.results?.[0]?.document_url;

  return (
    <Box w="full">
      <VStack gap={'12px'} align={'stretch'} w="full" color={'text'}>
        <Flex
          border={`1px solid`}
          borderColor={`custom_color.color_pop`}
          bg={`custom_color.opacity_pop._10`}
          w="full"
          py={{base: '16px', md: '24px'}}
          direction="column"
          align={'center'}
        >
          <Text fontSize={{base: '12px', md: '16px'}} fontWeight={400} opacity={0.7}>
            {assetToUse?.payment_plan
              ? `Initial Deposit (${Math.round((amount / assetToUse?.total_unit_price) * 100)}%)`
              : 'Unit Price'}
          </Text>
          <Text fontSize={{base: '16px', md: '24px'}} fontWeight={500}>
            {formatToCurrency(amount)}
          </Text>
        </Flex>

        {(FEES?.length || assetToUse?.payment_plan) && (
          <VStack
            p={{base: '16px', md: '24px'}}
            bg={`custom_color.opacity_pop._10`}
            w="full"
            gap={{base: '17px', md: '28px'}}
            align={'stretch'}
          >
            {assetToUse?.payment_plan && (
              <Flex w="full" direction="column" align={'center'} gap={{base: '5px', md: '8px'}}>
                <Text fontSize={{base: '12px', md: '16px'}} fontWeight={400} opacity={0.7}>
                  Purchase Price
                </Text>
                <Text fontSize={{base: '16px', md: '24px'}} fontWeight={500}>
                  {formatToCurrency(assetToUse?.total_unit_price)}
                </Text>
              </Flex>
            )}

            {/* {assetToUse?.payment_plan && (
              <Flex w="full" direction="column" align={'center'} gap={{base: '5px', md: '8px'}}>
                <Text fontSize={{base: '12px', md: '16px'}} fontWeight={400} opacity={0.7}>
                  Initial deposit percentage
                </Text>
                <Text fontSize={{base: '16px', md: '24px'}} fontWeight={500}>
                  {Math.round((amount / assetToUse?.total_unit_price) * 100)}%
                </Text>
              </Flex>
            )} */}

            {FEES?.map((fee, i) => (
              <Flex
                key={i}
                w="full"
                direction="column"
                align={'center'}
                gap={{base: '5px', md: '8px'}}
              >
                <Text fontSize={{base: '12px', md: '16px'}} fontWeight={400} opacity={0.7}>
                  {fee?.name}
                </Text>
                <Text fontSize={{base: '16px', md: '24px'}} fontWeight={500}>
                  {formatToCurrency(fee?.amount)}
                </Text>
              </Flex>
            ))}
          </VStack>
        )}

        {plan_type === 'manual' && payment_frequency !== 'flexible' && (
          <Flex
            bg={`custom_color.opacity_pop._10`}
            w="full"
            py="24px"
            direction="column"
            align={'center'}
            gap="6.8px"
          >
            <Text fontSize={{base: '12px', md: '16px'}} fontWeight={400} opacity={0.7}>
              {payment_frequency
                ? payment_frequency?.charAt(0).toUpperCase() +
                  payment_frequency?.slice(1) +
                  ' Payment'
                : 'Periodic Payment'}
            </Text>
            <Text fontSize={{base: '16px', md: '24px'}} fontWeight={500}>
              {payment_frequency !== 'flexible' ? formatToCurrency(periodic_payment) : '-'}
            </Text>
          </Flex>
        )}

        {plan_type === 'custom' && (
          <Flex
            bg={'custom_color.opacity_pop._10'}
            w="full"
            py={{base: '15px', md: '24px'}}
            direction="column"
            align={'center'}
            gap={{base: '4.38px', md: '6.8px'}}
            cursor={'pointer'}
            onClick={breakdownDisclosure.onOpen}
          >
            <Text fontSize={{base: '12px', md: '16px'}} fontWeight={400} opacity={0.8}>
              Payment Breakdown
            </Text>
            <Flex gap="8px" align="center" cursor={'pointer'}>
              <Text
                fontSize={{base: '12px', md: '20px'}}
                fontWeight={500}
                color={'custom_color.color_pop'}
              >
                VIEW
              </Text>
              <PaymentExternalOpen />
            </Flex>
          </Flex>
        )}

        {projectDocument && (
          <Flex
            bg={'custom_color.opacity_pop._10'}
            w="full"
            py={{base: '15px', md: '24px'}}
            direction="column"
            align={'center'}
            gap={{base: '4.38px', md: '6.8px'}}
            cursor={'pointer'}
          >
            <Text fontSize={{base: '12px', md: '16px'}} fontWeight={400} opacity={0.8}>
              Terms of Agreement
            </Text>
            <Flex gap="8px" align="center">
              <a href={projectDocument} target="_blank">
                <Text
                  fontSize={{base: '12px', md: '20px'}}
                  fontWeight={500}
                  color={'custom_color.color_pop'}
                >
                  VIEW
                </Text>
              </a>
              <PaymentExternalOpen />
            </Flex>
          </Flex>
        )}
      </VStack>

      <Flex gap="8px" align="center" mt={{base: '8px'}} mb={{base: '12px'}} onClick={onToggle}>
        <Box
          minW="21.482px"
          minH="21.482px"
          h="fit-content"
          w="fit-content"
          border="1px solid"
          display="flex"
          justifyContent="center"
          alignContent="center"
          borderColor={isOpen ? 'transparent' : 'matador_form.label'}
          cursor="pointer"
          bg="#F5F5F5"
          borderRadius="8px"
          transition="0.3s ease-in-out"
        >
          <AuthTermsCheck
            transform={isOpen ? 'scale(1)' : 'scale(0.4)'}
            opacity={isOpen ? '1' : '0'}
            transition="0.3s ease-in-out"
          />
        </Box>
        <Text
          fontSize={{base: '14px', md: '20px'}}
          fontWeight={300}
          color="matador_text.300"
          lineHeight={'140%'}
        >
          I have thoroughly reviewed the terms of agreement
        </Text>
      </Flex>

      <Flex
        gap={{base: '12px', md: '20px'}}
        align={{base: 'stretch', md: 'center'}}
        mb="20px"
        direction={{base: 'column-reverse', md: 'row'}}
      >
        <PaymentAccess
          content={
            <Button variation={`primary`} isDisabled={!isOpen} onClick={handleProceed}>
              Proceed to payment
            </Button>
          }
        />
      </Flex>

      <Breakdown
        payment_plan={assetToUse?.payment_plan}
        setStep={setStep}
        modal={breakdownDisclosure}
        FEES={FEES}
      />
    </Box>
  );
};
