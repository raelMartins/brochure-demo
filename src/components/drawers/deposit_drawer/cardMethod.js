import {Box, Button, Center, Flex, Image, Text} from '@chakra-ui/react';
import processingLoader from '../../../images/processing-transaction.gif';
import successfulLoader from '../../../images/successful-transaction.gif';
import {CustomizableButton} from '@/ui-lib/ui-lib.components/Button';

export const CardMethod = ({success, isLoading, handlePaywithCard, setStep}) => {
  return (
    <Box my="30px">
      {success ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'} textAlign={'center'}>
          <Image alt="loader" w="150px" h="150px" src={successfulLoader.src} />
          <Text
            color="text.1"
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            className="gilda-display-regular"
            fontSize={'28px'}
            my={{base: '12px', md: '25px'}}
          >
            Transaction Successful
          </Text>
          <Text color="text.1" opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Your payment has been successfully processed
          </Text>
        </Center>
      ) : isLoading ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'} textAlign={'center'}>
          <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
          <Text
            color="text.1"
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            className="gilda-display-regular"
            fontSize={'28px'}
            my={{base: '12px', md: '25px'}}
          >
            Processing payment
          </Text>
          <Text color="text.1" opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Flex w="full" h="full" direction="column" justify={'center'} align={'center'} gap="20px">
          <Text
            color="text.1"
            fontWeight={500}
            fontSize={{base: '18px', md: '28px'}}
            className="gilda-display-semibold"
            lineHeight={{base: '24px', md: '36px'}}
          >
            Continue with card
          </Text>
          <Text
            color="text.1"
            textAlign={'center'}
            fontWeight={400}
            fontSize={{base: '13px', md: '16px'}}
            lineHeight={{base: '18px', md: '25px'}}
          >
            In order to finish the payment process, you will be charged through your debit/credit
            card.
          </Text>
          <Flex mt="27px" gap="26px" justify="space-between" align="center" w="full">
            <CustomizableButton
              border="1px solid"
              color="#191919"
              borderColor="#191919"
              bg="white"
              h="49px"
              w={{base: '50%', md: '250px'}}
              onClick={() => setStep('method')}
            >
              Cancel
            </CustomizableButton>
            <Button
              onClick={handlePaywithCard}
              color="white"
              w={{base: '50%', md: '250px'}}
              bg="custom_color.color_pop"
              h="49px"
            >
              Proceed
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};
