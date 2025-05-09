import {Box, Flex, Button, Heading, HStack, Input, Text, VStack} from '@chakra-ui/react';
import {formatToCurrency} from '@/realtors_portal/utils';
import {useState} from 'react';
import {CollapseIcon} from '@/components/assets/icons';
import {PaymentExternalOpen} from '@/components/assets/PaymentExternalOpen';
import {PaymentAccess} from '@/components/payment_flow/PaymentAccess';

const FractionalDetails = ({
  setStep,
  fractionedUnitData,
  fractionalData,
  fractions,
  setFractions,
}) => {
  const [error, setError] = useState('');
  const [collapsed, setCollapsed] = useState(true);

  const fractionalPercent = Math.ceil(
    (Number(fractionedUnitData?.total_purchased_fractions) /
      Number(fractionedUnitData?.total_fractions)) *
      100
  ).toFixed(2);

  const leftFractions =
    Number(fractionedUnitData?.total_fractions) -
    Number(fractionedUnitData?.total_purchased_fractions);

  const handleFractionInput = e => {
    setError('');
    const value = e.target.value;
    if (value > leftFractions)
      setError('Apologies, but you cannot purchase more fractions than are currently available.');
    setFractions(value);
  };

  const toggleCollapse = () => setCollapsed(collapse => !collapse);

  return (
    <Box flex={`1`} padding={{base: `0px 24px`, md: `nonw`}}>
      <Heading
        fontSize={{base: `64px`, md: `48px`}}
        fontWeight={{base: `500`}}
        lineHeight={{base: `55px`, md: `120%`}}
        fontFamily={`var(--font_montserrat)`}
        color={`custom_color.color_pop`}
        display={{base: 'none', md: 'block'}}
      >
        FRACTIONAL PURCHASE
      </Heading>

      <VStack spacing={{base: '13px', md: '20px'}} align={'stretch'}>
        <Text
          mt={{base: '0px', md: '8px'}}
          fontSize={{base: '16px', md: '20px'}}
          fontWeight={500}
          lineHeight={'130%'}
        >
          HOW MANY FRACTION WOULD YOU LIKE TO BUY?
        </Text>

        <Box
          my="11px"
          border="0.5px solid"
          borderColor={`matador_border_color.100`}
          w="full"
          display={{base: 'block', md: 'none'}}
        />

        <Box
          px={{base: '13px', md: '20.58px'}}
          py={{base: '9px', md: '13.72px'}}
          w="full"
          bg="custom_color.opacity_pop._10"
        >
          <Box
            mt="39px"
            bg="#00000029"
            w="full"
            h="10px"
            borderRadius={'full'}
            position={'relative'}
          >
            <Box
              position={'absolute'}
              h="20px"
              w="2px"
              bg="custom_color.color_pop"
              left={`${fractionalPercent}%`}
              top="-5px"
            />

            <Text
              position={'absolute'}
              color="custom_color.color_pop"
              left={`${fractionalPercent}%`}
              transform={`translateX(-${
                fractionalPercent < 3 ? '0' : fractionalPercent > 95 ? '100' : '50'
              }%)`}
              top="-30px"
              fontSize={{base: '10px', md: '16px'}}
              fontWeight={400}
            >
              {`${fractionalPercent}%`}
            </Text>
            <Box
              w={`${fractionalPercent}%`}
              h="full"
              bg="custom_color.color_pop"
              borderRadius={'full'}
            />
          </Box>
          <HStack w="full" align="center" justify={'space-between'} mt="10px" px="4px">
            <Text fontSize={{base: '10px', md: '16px'}} fontWeight={400} color="matador_text.400">
              {fractionedUnitData?.total_purchased_fractions} fraction
              {fractionedUnitData?.total_purchased_fractions != 1 && `s`} sold
            </Text>
            <Text fontSize={{base: '10px', md: '16px'}} fontWeight={400} color="matador_text.400">
              {leftFractions} fraction{leftFractions != 1 && `s`} left
            </Text>
          </HStack>
        </Box>

        <Box w="full">
          <Input
            value={fractions}
            onChange={handleFractionInput}
            border="1px solid"
            borderColor={`matador_border_color.100 !important`}
            w="full"
            borderRadius="24px"
            type="number"
            outline={'none'}
            placeholder="0"
            h="60px"
          />
          {error ? (
            <Text fontSize={'12px'} fontWeight={400} color="red">
              {error}
            </Text>
          ) : (
            <Flex mt="8px" justify={'space-between'} w="full">
              <Text fontSize={{base: '10px', md: '14px'}} fontWeight={500} color="matador_text.200">
                {formatToCurrency(fractionedUnitData?.price_per_fraction)}/FRACTION
              </Text>
              <Text fontSize={{base: '10px', md: '14px'}} fontWeight={500} color="matador_text.300">
                TOTAL FRACTION{' '}
                {formatToCurrency(fractions * fractionedUnitData?.price_per_fraction)}
              </Text>
            </Flex>
          )}
        </Box>

        <PaymentAccess
          checkFractions
          content={
            <Button
              h="48px"
              w="full"
              bg={'custom_color.color_pop'}
              color="white"
              borderRadius={'full'}
              fontWeight={400}
              fontSize={'16px'}
              _hover={{bg: 'custom_color.color_pop'}}
              isDisabled={error || !Boolean(Number(fractions))}
              onClick={() => setStep('payment')}
            >
              Proceed
            </Button>
          }
        />

        <Flex
          w="full"
          px={{base: '13px', md: '22px'}}
          py={{base: '25px', md: '40px'}}
          align={'center'}
          justify={!collapsed ? 'space-between' : 'flex-start'}
          bg="custom_color.opacity_pop._10"
          cursor="pointer"
          gap={{base: '30px'}}
          onClick={toggleCollapse}
        >
          <Text
            fontWeight={500}
            fontSize={{base: '12px', md: '20px'}}
            lineHeight={'120%'}
            w="50%"
            color="custom_color.color_pop"
            borderBottom={'1.5px solid'}
            borderColor={'custom_color.color_pop'}
            paddingBottom={{base: '5px', md: '8px'}}
          >
            {collapsed ? 'VIEW MORE DETAILS' : 'MORE DETAILS'}
          </Text>

          {collapsed ? <PaymentExternalOpen /> : <CollapseIcon />}
        </Flex>

        {!collapsed && (
          <>
            <VStack
              w="full"
              p={{base: '15px 17px', md: '21px'}}
              spacing={{base: '17px', md: '20px'}}
              bg="custom_color.opacity_pop._10"
            >
              <Flex w="full" align={'center'} justify={'space-between'}>
                <Text fontWeight={400} fontSize="14px" color="matador_text.400">
                  Property Type
                </Text>
                <Text fontWeight={500} fontSize="14px" color="text">
                  {fractionalData?.fraction_data?.unit?.unit_title || '-'}
                </Text>
              </Flex>
              <Flex w="full" align={'center'} justify={'space-between'}>
                <Text fontWeight={400} fontSize="14px" color="matador_text.400">
                  Unit Price
                </Text>
                <Text fontWeight={500} fontSize="14px" color="text">
                  {formatToCurrency(fractionalData?.fraction_data?.unit?.price)}
                </Text>
              </Flex>
              <Flex w="full" align={'center'} justify={'space-between'}>
                <Text fontWeight={400} fontSize="14px" color="matador_text.400">
                  Holding Period
                </Text>
                <Text fontWeight={500} fontSize="14px" color="text">
                  {fractionedUnitData?.holding_period || '-'}
                </Text>
              </Flex>
              {fractionalData?.partners?.map(stakeholder => (
                <Flex
                  key={stakeholder?.stakeholder_name}
                  w="full"
                  align={'center'}
                  justify={'space-between'}
                >
                  <Text fontWeight={400} fontSize="14px" color="matador_text.400">
                    {stakeholder?.stakeholder_type ?? ''}
                  </Text>
                  <Text fontWeight={500} fontSize="14px" color="text">
                    {stakeholder?.stakeholder_name ?? ''}
                  </Text>
                </Flex>
              ))}
            </VStack>

            <VStack
              w="full"
              p={{base: '15px 17px', md: '21px'}}
              spacing={{base: '17px', md: '20px'}}
              bg="custom_color.opacity_pop._10"
            >
              <Flex w="full" align={'center'} justify={'space-between'}>
                <Text fontWeight={400} fontSize="14px" color="matador_text.400">
                  Dividend Payout
                </Text>
                <Text fontWeight={500} fontSize="14px" color="text">
                  {fractionalData?.extra_info?.dividend_payout}
                </Text>
              </Flex>
              <Flex w="full" align={'center'} justify={'space-between'}>
                <Text fontWeight={500} fontSize="16px" color="matador_text.400">
                  Dividend
                </Text>
                <Text fontWeight={500} fontSize="16px" color="text">
                  {formatToCurrency(fractionalData?.extra_info?.dividend_amount)}
                </Text>
              </Flex>
            </VStack>

            <Flex
              bg={'custom_color.opacity_pop._10'}
              w="full"
              py={{base: '15px', md: '24px'}}
              direction="column"
              align={'center'}
              gap={{base: '4.38px', md: '6.8px'}}
              cursor={'pointer'}
              onClick={() =>
                window.open(
                  `${
                    fractionalData?.packets?.[0]?.packet ? fractionalData?.packets?.[0]?.packet : ''
                  }`,
                  '_blank'
                )
              }
            >
              <Text fontSize={{base: '12px', md: '16px'}} fontWeight={400} opacity={0.8}>
                Investor’s Packet
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
          </>
        )}
      </VStack>
    </Box>
  );
};

export default FractionalDetails;
