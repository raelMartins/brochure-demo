'use client';
import {PostForCustomerEquityValidationoOrDispute} from '@/api/listing';
import {fetchPaymentPlanDoc} from '@/api/listings';
import {fetchAllPurchaseHistory, fetchInvestorPackets, fetchUpcomingPayments} from '@/api/payment';
import AuthTermsCheck from '@/components/assets/authTermsCheck';
import {PaymentExternalOpen} from '@/components/assets/PaymentExternalOpen';
import ThreeDots from '@/components/loaders/ThreeDots';
import {formatToCurrency} from '@/realtors_portal/utils';
import {formatDateString} from '@/realtors_portal/utils/formatDate';
import {Button} from '@/ui-lib/ui-lib.components/Button';
import {formatDateToString} from '@/utils/formatDate';
import {toastForError} from '@/utils/toastForErrors';
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Text,
  Textarea,
  useDisclosure,
  useTheme,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import Payments from './payments';
import {ValidateIcon} from '@/components/assets/ValidateIcon';
import {useState} from 'react';
import isMobile from '@/utils/isMobile';
import {formatPropertySize} from '@/utils/misc';

export const Summary = ({
  assetToUse,
  setStep,
  message,
  setMessage,
  isValid,
  handleValidation,
  handleDispute,
  isLoading,
}) => {
  const theme = useTheme();
  const validateDisclosure = useDisclosure();
  const disputeDisclosure = useDisclosure();
  const [showOptions, setShowOptions] = useState(false);
  const primaryColor = theme?.colors?.custom_color?.color_pop;

  const HOME__OWNERS__PACKETS = useQuery(['fetchInvestorPackets', assetToUse?.id], () =>
    fetchInvestorPackets(assetToUse?.id)
  );
  const packet =
    HOME__OWNERS__PACKETS?.data?.data?.received?.length &&
    HOME__OWNERS__PACKETS?.data?.data?.received[0];

  return (
    <Box w="full">
      <VStack gap={'20px'} align={'stretch'} w="full" color={'text'}>
        <VStack
          p={{base: '17px', md: '21px'}}
          bg={`custom_color.opacity_pop._10`}
          w="full"
          gap={{base: '17px', md: '20px'}}
          align={'stretch'}
        >
          <Flex w="full" align={'center'} justify={'space-between'}>
            <Text fontSize={{base: '12px', md: '14px'}} fontWeight={400} color="matador_text.400">
              {assetToUse?.payment_plan ? 'Offer Price' : 'Purchase price'}
            </Text>
            <Text fontSize={{base: '14px', md: '14px'}} fontWeight={500} color="text">
              {assetToUse?.payment_plan
                ? formatToCurrency(assetToUse?.payment_plan?.purchase_price)
                : formatToCurrency(assetToUse?.total_unit_price)}
            </Text>
          </Flex>
          <Flex w="full" align={'center'} justify={'space-between'}>
            <Text fontSize={{base: '12px', md: '14px'}} fontWeight={400} color="matador_text.400">
              Unit Size
            </Text>
            <Text fontSize={{base: '14px', md: '14px'}} fontWeight={500} color="text">
              {formatPropertySize(assetToUse?.unit?.unit_size)}
            </Text>
          </Flex>
          <Flex w="full" align={'center'} justify={'space-between'}>
            <Text fontSize={{base: '12px', md: '14px'}} fontWeight={400} color="matador_text.400">
              Purchase Date
            </Text>
            <Text fontSize={{base: '14px', md: '14px'}} fontWeight={500} color="text">
              {assetToUse?.project?.created_at &&
                formatDateToString(assetToUse?.project?.created_at)}
            </Text>
          </Flex>
        </VStack>

        {packet?.packet && (
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
              Terms of Purchase
            </Text>
            <Flex gap="8px" align="center">
              {
                <a rel="noreferrer" target="_blank" href={packet?.packet}>
                  <Text
                    fontSize={{base: '12px', md: '20px'}}
                    fontWeight={500}
                    color={'custom_color.color_pop'}
                  >
                    VIEW
                  </Text>
                </a>
              }
              <PaymentExternalOpen />
            </Flex>
          </Flex>
        )}

        {assetToUse?.payment_plan && <Payments assetToUse={assetToUse} />}

        <Flex
          gap={{base: '12px', md: '20px'}}
          align={{base: 'stretch', md: 'center'}}
          direction={{base: 'column-reverse', md: 'row'}}
        >
          <Button
            bg="transparent"
            color={`text`}
            h={{base: '48px', md: '60px'}}
            w={{base: 'full', md: '50%'}}
            fontSize="16px"
            fontWeight="400"
            borderRadius="full"
            border="1px solid"
            borderColor={`matador_border_color.100`}
            boxShadow="0px 1.5px 3px 0px rgba(16, 24, 40, 0.05)"
            onClick={() => (isMobile ? disputeDisclosure.onOpen() : setStep('dispute'))}
          >
            Dispute
          </Button>
          <Button
            bg={`custom_color.color`}
            color="custom_color.contrast"
            h={{base: '48px', md: '60px'}}
            w={{base: 'full', md: '50%'}}
            fontSize="16px"
            fontWeight="400"
            borderRadius="full"
            isLoading={isLoading}
            onClick={() => (isMobile ? validateDisclosure.onOpen() : setShowOptions(!showOptions))}
          >
            Validate
          </Button>
        </Flex>
      </VStack>

      {showOptions && (
        <Box
          zIndex={20}
          position={'fixed'}
          bottom={{base: 'unset', md: '30px'}}
          left={{base: '20px', md: '30px'}}
          right={{base: '20px', md: 'unset'}}
          top={{base: '100px', md: 'unset'}}
        >
          <Flex
            direction={'column'}
            borderRadius={'4px'}
            border="1px solid"
            borderColor={`custom_color.opacity_pop._10`}
            bg="matador_background.200"
            p={{base: '12px', md: '24px'}}
            gap={{base: '4px', md: '12px'}}
            boxShadow={
              '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)'
            }
          >
            <HStack align={'flex-start'} spacing={{base: '12px', md: '24px'}}>
              <ValidateIcon />

              <VStack align={'flex-start'} spacing={'4px'}>
                <Text fontSize={{base: '16px', md: '20px'}} fontWeight={{base: 500}}>
                  Are you sure?
                </Text>
                <Text fontSize={{base: '14px', md: '14px'}} fontWeight={400}>
                  Kindly review all the important details thoroughly.
                </Text>
              </VStack>
            </HStack>

            <HStack alignSelf={'flex-end'} spacing={{base: '8px', md: '24px'}} pr="4px">
              <Button
                bg="transparent"
                borderColor={`matador_border_color.100`}
                fontSize={{base: '13px', md: '16px'}}
                fontWeight={{base: '500', md: '500'}}
                color="matador_text.300"
                onClick={() => setShowOptions(false)}
              >
                Cancel
              </Button>

              <Button
                bg="custom_color.color"
                fontSize={{base: '13px', md: '16px'}}
                fontWeight={{base: '500', md: '500'}}
                color="custom_color.contrast"
                onClick={() => handleValidation()}
              >
                Validate
              </Button>
            </HStack>
          </Flex>
        </Box>
      )}

      <Drawer
        onClose={validateDisclosure?.onClose}
        isOpen={validateDisclosure?.isOpen}
        placement={'bottom'}
      >
        <DrawerOverlay />
        <DrawerContent
          borderTopRadius={'16px'}
          pt="30px"
          h="356px"
          bg="matador_background.200"
          color={`text`}
          px="24px"
        >
          <DrawerCloseButton />
          <VStack align={'center'} spacing={{base: '12px', md: '24px'}} w="full">
            <ValidateIcon />

            <Text fontSize={{base: '16px', md: '20px'}} fontWeight={{base: 500}}>
              Are you sure?
            </Text>
            <Text fontSize={{base: '14px', md: '14px'}} fontWeight={400} color="#525252">
              Kindly review all the important details thoroughly.
            </Text>
          </VStack>

          <Flex
            mt="26px"
            gap={{base: '12px', md: '20px'}}
            align={{base: 'stretch', md: 'center'}}
            direction={{base: 'column-reverse', md: 'row'}}
          >
            <Button
              bg="transparent"
              color={`text`}
              h={{base: '48px', md: '60px'}}
              w={{base: 'full', md: '50%'}}
              fontSize="16px"
              fontWeight="400"
              borderRadius="full"
              border="1px solid"
              borderColor={`matador_border_color.100`}
              boxShadow="0px 1.5px 3px 0px rgba(16, 24, 40, 0.05)"
              onClick={validateDisclosure.onClose}
            >
              Cancel
            </Button>
            <Button
              bg={`custom_color.color`}
              color="custom_color.contrast"
              h={{base: '48px', md: '60px'}}
              w={{base: 'full', md: '50%'}}
              fontSize="16px"
              fontWeight="400"
              borderRadius="full"
              isLoading={isLoading}
              onClick={handleValidation}
            >
              Validate
            </Button>
          </Flex>
        </DrawerContent>
      </Drawer>

      <Drawer
        onClose={disputeDisclosure?.onClose}
        isOpen={disputeDisclosure?.isOpen}
        placement={'bottom'}
      >
        <DrawerOverlay />
        <DrawerContent
          borderTopRadius={'16px'}
          pt="30px"
          h="456px"
          bg="matador_background.100"
          color={`text`}
          px="24px"
        >
          <DrawerCloseButton />
          <Text fontSize={{base: '16px', md: '20px'}} fontWeight={{base: 500}}>
            DISPUTE
          </Text>
          <Text mt="12px" fontSize={{base: '14px', md: '14px'}} fontWeight={400} color="#525252">
            {`Oops! It looks like there might be a mix-up. Could you please share more details about
            what's going on below? We're here to help!`}
          </Text>

          <Textarea
            mt="12px"
            onChange={e => setMessage(e.target.value)}
            value={message}
            resize="none"
            placeholder="Tell us about the issue..."
            border="0.5px solid !important"
            borderColor={`matador_border_color.100`}
            borderRadius="12px"
            _focusVisible={{outline: 'none'}}
            w="full"
            h={{base: '100px', md: '155px'}}
          />

          <Flex
            mt="26px"
            gap={{base: '12px', md: '20px'}}
            align={{base: 'stretch', md: 'center'}}
            direction={{base: 'column-reverse', md: 'row'}}
          >
            <Button
              bg="transparent"
              h={{base: '48px', md: '60px'}}
              w={{base: 'full', md: '50%'}}
              fontSize="16px"
              fontWeight="400"
              borderRadius="full"
              border="1px solid"
              color={`text`}
              borderColor={`matador_border_color.100`}
              boxShadow="0px 1.5px 3px 0px rgba(16, 24, 40, 0.05)"
              onClick={disputeDisclosure.onClose}
            >
              No,Go Back
            </Button>
            <Button
              bg={`custom_color.color`}
              color="custom_color.contrast"
              h={{base: '48px', md: '60px'}}
              w={{base: 'full', md: '50%'}}
              fontSize="16px"
              fontWeight="400"
              borderRadius="full"
              isLoading={isLoading}
              onClick={handleDispute}
              isDisabled={!isValid}
            >
              Submit
            </Button>
          </Flex>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
