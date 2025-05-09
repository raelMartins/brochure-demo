import {PaymentOption} from '@/components/cards/PaymentOption';
import ThreeDots from '@/components/loaders/ThreeDots';
import {Box, Center, Divider, Flex, HStack, Spinner, Stack, Text} from '@chakra-ui/react';
import {useEffect} from 'react';
import {FiArrowUpRight} from 'react-icons/fi';

export const Plans = ({
  PAYMENT_PLAN_DATA,
  unit,
  setStep,
  planLoading,
  setSelectedPlan,
  setFullPayment,
}) => {
  const handle_outrightpay = () => {
    setFullPayment(true);
    setStep('paymentSummary');
    setSelectedPlan(null);
  };

  useEffect(() => {
    if (PAYMENT_PLAN_DATA && !PAYMENT_PLAN_DATA[0]?.id) {
      handle_outrightpay();
    }
  }, [PAYMENT_PLAN_DATA]);

  return planLoading || !PAYMENT_PLAN_DATA[0]?.id ? (
    <Center minH={`300px`}>
      <ThreeDots />
    </Center>
  ) : (
    <>
      <Text
        mt={{base: '0px', md: '8px'}}
        fontSize={{base: '16px', md: '20px'}}
        fontWeight={500}
        lineHeight={'130%'}
      >
        HOW WOULD YOU LIKE TO PAY?
      </Text>

      <Box my="11px" border="0.5px solid #D6D6D6" w="full" display={{base: 'block', md: 'none'}} />

      <Stack gap={`20px`}>
        <Box bg={`custom_color.opacity_pop._10`} color={`custom_color.color_pop`}>
          <HStack
            gap={`40px`}
            maxW={{base: '380px', md: `650px`}}
            w={`100%`}
            mx={{base: `auto`}}
            aspectRatio={{base: `380 / 226`, md: `650 / 388`}}
            p={{base: `97px 22px`}}
            cursor={`pointer`}
            border={'1px solid'}
            borderColor={'custom_color.color_pop'}
            onClick={handle_outrightpay}
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
                OUTRIGHT PURCHASE
              </Text>
              <Divider borderColor={`custom_color.color_pop`} w={`100%`} />
              <HStack gap={{base: `26px`}}>
                <Stack gap={`4px`}>
                  <Text
                    fontSize={{base: '10px', md: `12px`}}
                    fontWeight={`400`}
                    lineHeight={{base: '150%', md: `16.8px`}}
                    letterSpacing={`1%`}
                    textAlign={`left`}
                    textTransform={`uppercase`}
                  >
                    PURCHASE PRICE
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
                    }).format(unit?.price || 0)}
                  </Text>
                </Stack>
              </HStack>
            </Flex>
            <Center>
              <FiArrowUpRight fontSize={`16px`} />
            </Center>
          </HStack>
        </Box>
        {planLoading ? (
          <Center minH={`40vh`}>
            <Spinner />
          </Center>
        ) : (
          <>
            {PAYMENT_PLAN_DATA?.[0]?.id &&
              PAYMENT_PLAN_DATA?.map(plan => (
                <PaymentOption
                  setStep={setStep}
                  setFullPayment={setFullPayment}
                  setSelectedPlan={setSelectedPlan}
                  key={plan.id}
                  data={plan}
                />
              ))}
          </>
        )}
      </Stack>
    </>
  );
};
