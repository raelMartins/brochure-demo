'use client';
import {CustomExternalLinkIcon} from '@/components/assets/icons';
import {Box, Center, HStack, Image, Stack, Text} from '@chakra-ui/react';
import successImg from '@/images/successful-transaction.gif';

export const PaymentMethod = ({
  setStep,
  handleBankTransfer,
  handlePayFromWallet,
  handlePaywithCard,
}) => {
  const handleTransfer = () => {
    handleBankTransfer();
    setStep('bankTransfer');
  };

  return (
    <Stack spacing={'20px'}>
      <Text
        mt={{base: '0px', md: '8px'}}
        fontSize={{base: '16px', md: '20px'}}
        fontWeight={500}
        lineHeight={'130%'}
        color="matador_text.400"
        textTransform={'uppercase'}
      >
        Select a Payment Method
      </Text>

      <Box
        my="11px"
        border="0.5px solid"
        borderColor={`matador_border_color.100`}
        w="full"
        display={{base: 'block', md: 'none'}}
      />

      <PaymentTypeCard
        onClick={handlePayFromWallet}
        type="wallet"
        borderColor={'custom_color.color_pop'}
        bckgrnd="custom_color.opacity_pop._10"
        typeColor="text"
        tagColor="matador_text.400"
        subHeadingColor="#525252"
        subHeading="MAKE PAYMENT FROM YOUR WALLET"
        tag="Free"
      />
      <PaymentTypeCard
        onClick={handleTransfer}
        type="Bank Transfer"
        borderColor={'#F5F5F5'}
        bckgrnd="custom_color.color_pop"
        typeColor="#FFFFFF"
        tagColor="#F5F5F5"
        subHeadingColor="#F5F5F5"
        subHeading="TRANSFER PAYMENT TO A DESIGNATED ACCOUNT"
        tag="Charges Apply"
      />
      <PaymentTypeCard
        onClick={handlePaywithCard}
        type="Debit/Credit Card"
        borderColor={'#F5F5F5'}
        bckgrnd="custom_color.color_pop"
        typeColor="#FFFFFF"
        tagColor="#F5F5F5"
        subHeadingColor="#F5F5F5"
        subHeading="USE CARD TO COMPLETE PAYMENT"
        tag="Charges Apply"
      />
    </Stack>
  );
};

const PaymentTypeCard = ({type, ...rest}) => {
  return (
    <Box
      display="flex"
      gap="12px"
      minH="111px"
      h="fit-content"
      p={'10px 12px'}
      alignSelf="stretch"
      cursor={'pointer'}
      bg={`${rest.bckgrnd}`}
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      maxW={{base: 'full', md: '602px'}}
      border={`1px solid ${rest.borderColor}`}
      {...rest}
    >
      <HStack flexWrap={`wrap`}>
        <Text
          color={rest.typeColor}
          fontFamily="Montserrat"
          fontSize={{base: '12.625px', md: '20px'}}
          fontStyle="normal"
          fontWeight="500"
          letterSpacing="-0.2px"
          textTransform={'uppercase'}
        >
          {type}
        </Text>
        <Text
          color={rest.tagColor}
          fontSize={{base: '7.575px', md: '12px'}}
          fontStyle="normal"
          fontWeight="500"
          p="4px 11px"
          borderRadius={'4px'}
          letterSpacing="-0.2px"
          textTransform={'uppercase'}
          border={`1px solid ${rest.borderColor}`}
        >
          {rest.tag}
        </Text>
      </HStack>
      <Box
        position={'relative'}
        pt={2}
        borderTop={`1px solid ${rest.borderColor}`}
        w={{base: '65%', md: '50%'}}
      >
        <Text
          color={rest.subHeadingColor}
          fontSize={{base: '6.312px', md: '10px'}}
          fontStyle="normal"
          fontWeight="400"
          letterSpacing="0.6px"
        >
          {rest.subHeading}
        </Text>
        <CustomExternalLinkIcon
          right="-25%"
          bottom={'60%'}
          color={rest.borderColor}
          position={'absolute'}
        />
      </Box>
    </Box>
  );
};
