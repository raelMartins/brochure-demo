import {Box, Center, Heading, HStack, Image, Stack, Text} from '@chakra-ui/react';
import loadingImg from '@/images/processing-transaction.gif';
import successImg from '@/images/successful-transaction.gif';
import {PaymentTypeCard} from '@/components/page-components/units/PaymentTypeCard';

export const FractionalPaymentMethod = ({
  handlePayFromWallet,
  handlePaywithCard,
  success,
  loading,
}) => {
  return (
    <Box flex={`1`} padding={{base: `0px 24px`, md: `nonw`}}>
      <Heading
        fontSize={{base: `64px`, md: `48px`}}
        fontWeight={{base: `500`}}
        lineHeight={{base: `55px`, md: `120%`}}
        fontFamily={`var(--font_montserrat)`}
        display={{base: 'none', md: 'block'}}
        color={`custom_color.color_pop`}
      >
        FRACTIONAL PURCHASE
      </Heading>

      {success ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'}>
          <Image alt="loader" w="150px" h="150px" src={successImg.src} />
          <Text
            color="text"
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            className="Poppins"
            fontSize={'28px'}
            my={{base: '12px', md: '25px'}}
          >
            Transaction Successful
          </Text>
          <Text color="text" opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Your payment has been successfully processed
          </Text>
        </Center>
      ) : loading ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'}>
          <Image alt="loader" w="150px" h="150px" src={loadingImg.src} />
          <Text
            color="text"
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            className="Poppins"
            fontSize={'28px'}
            my={{base: '12px', md: '25px'}}
          >
            Processing payment
          </Text>
          <Text color="text" opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Stack
          mt={{base: 'none', md: '20px'}}
          fontFamily="Poppins"
          spacing={{base: '13px', md: '20px'}}
        >
          <Text
            mt={{base: '0px', md: '8px'}}
            fontSize={{base: '16px', md: '20px'}}
            fontWeight={500}
            lineHeight={'130%'}
          >
            SELECT A PAYMENT METHOD
          </Text>

          <Box
            my="11px"
            border="0.5px solid #D6D6D6"
            w="full"
            display={{base: 'block', md: 'none'}}
          />

          <PaymentTypeCard
            onClick={handlePayFromWallet}
            type="wallet"
            subHeading="MAKE PAYMENT FROM YOUR WALLET"
            tag="Free"
          />
          <PaymentTypeCard
            onClick={handlePaywithCard}
            type="Debit/Credit Card"
            subHeading="USE CARD TO COMPLETE PAYMENT"
            tag="Charges Apply"
          />
        </Stack>
      )}
    </Box>
  );
};

export default FractionalPaymentMethod;
