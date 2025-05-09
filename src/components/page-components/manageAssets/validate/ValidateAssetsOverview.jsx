import {useLightenHex} from '@/utils/lightenColorShade';
import {Box, Button, HStack, Stack, Text, useDisclosure, useTheme, VStack} from '@chakra-ui/react';
import {AssetHeader} from '../AssetHeader';
import PurchaseAgreement from '../purchaseAgreement';
import {ValidateEquity} from './validateEquity';
import {useState} from 'react';
import {DisputeCustomerEquity} from './dispute';
import {ValidateAlertIcon} from '@/components/assets/icons';
import {ValidatePaymentTransaction} from './validatePaymentTransaction';

const ValidateAssetOverview = ({
  overviewInfo,
  listingName,
  unitName,
  equityId,
  validation_requestsId,
  paymentPlan,
}) => {
  const [screen, setScreen] = useState('');
  const theme = useTheme();
  const primaryColor = theme.colors.primary?.color;
  const {lightenHex} = useLightenHex(primaryColor);
  const validateModal = useDisclosure();

  return (
    <Stack spacing="20px">
      {screen !== 'dispute' && (
        <HStack
          align="start"
          border="1px solid"
          borderColor="custom_color.color_pop"
          w="full"
          bg={lightenHex(90)}
          p="12px"
          gap="16px"
          display={{base: 'none', lg: 'flex'}}
        >
          <ValidateAlertIcon />
          <Text fontSize="12px" lineHeight="17px" fontWeight="400" color="text.1">
            We kindly request your confirmation regarding the property, amount paid, transaction
            date, and the ownership of the uploaded documents. If any information is inaccurate,
            please initiate a dispute. However, if all details are accurate, we kindly ask you to
            proceed with validation.
          </Text>
        </HStack>
      )}
      <AssetHeader
        listingName={listingName}
        unitName={unitName}
        display={{base: 'none', lg: 'block'}}
      />
      {screen === 'dispute' ? (
        <DisputeCustomerEquity
          setScreen={setScreen}
          validation_requestsId={validation_requestsId}
        />
      ) : (
        <Stack spacing="20px">
          <VStack bg={lightenHex(80)} p="22px" align="flex-start" spacing="20px">
            {overviewInfo.map((info, idx) => {
              return (
                <HStack key={idx} justify="space-between" w="full">
                  <Text
                    fontSize={{base: '12px', md: '13.664px'}}
                    lineHeight={{base: '14px', md: '17px'}}
                    fontWeight="400"
                    color="text.3"
                  >
                    {info.label}
                  </Text>
                  {info?.component || (
                    <Text
                      fontSize={{base: '12px', md: '14px'}}
                      lineHeight={{base: '14px', md: '17px'}}
                      fontWeight="500"
                      color="#191919"
                      textTransform="capitalize"
                    >
                      {info?.value}
                    </Text>
                  )}
                </HStack>
              );
            })}
          </VStack>
          <PurchaseAgreement equityId={equityId} />
          {paymentPlan && <ValidatePaymentTransaction />}
          <Stack
            w="full"
            justify="space-between"
            direction={{base: 'column', lg: 'row'}}
            gap="20px"
          >
            <Button
              w="full"
              p="20.25px 27px"
              fontWeight={400}
              rounded="full"
              h="60px"
              border="1px solid"
              borderColor="border.1"
              bg="none"
              boxShadow="0px 1.5px 3px 0px rgba(16, 24, 40, 0.05)"
              onClick={() => setScreen('dispute')}
            >
              Dispute
            </Button>
            <Button
              w="full"
              p="20.25px 27px"
              bg="custom_color.color_pop"
              color="#FFF"
              fontWeight={400}
              rounded="full"
              h="60px"
              order={{base: -1, lg: 0}}
              onClick={validateModal.onOpen}
            >
              Validate
            </Button>
          </Stack>
        </Stack>
      )}
      <ValidateEquity validateModal={validateModal} validation_requestsId={validation_requestsId} />
    </Stack>
  );
};

export default ValidateAssetOverview;

export const ValidateHeader = ({...rest}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary?.color;
  const {lightenHex} = useLightenHex(primaryColor);
  return (
    <HStack
      align="start"
      border="1px solid"
      borderColor="custom_color.color_pop"
      w="full"
      bg={lightenHex(80)}
      p="12px"
      gap="16px"
      {...rest}
    >
      <ValidateAlertIcon />
      <Text fontSize="12px" lineHeight="17px" fontWeight="400" color="text.1">
        We kindly request your confirmation regarding the property, amount paid, transaction date,
        and the ownership of the uploaded documents. If any information is inaccurate, please
        initiate a dispute. However, if all details are accurate, we kindly ask you to proceed with
        validation.
      </Text>
    </HStack>
  );
};
