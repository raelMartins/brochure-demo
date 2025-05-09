'use client';

import {fetchProjectsById} from '@/api/listing';
import {PropertyImageDisplay} from '@/components/page-components/listings/PropertyImageDisplay';
import {Box, Flex, Heading, HStack, Stack, Text} from '@chakra-ui/react';
import Link from 'next/link';
import {FiArrowUpRight} from 'react-icons/fi';
import {useQuery} from 'react-query';
import {ExternalLink, Spinner} from '@/ui-lib';
import ErrorState from '@/components/appState/error-state';
import FractionalDetails from './fractionalDetails';
import {useState} from 'react';
import {FractionalPaymentMethod} from './fractionalPaymentMethod';
import useFractionalData from '@/utils/hooks/useFractionalData';
import {useAssetPayment} from '@/ui-lib/ui-lib.hooks/useAssetPayments';
import {useRouter} from 'next/router';
import {PropertySidebar} from '@/components/page-components/listings/PropertySidebar';
import {LayoutView} from '@/components';

export default function ListingPage({}) {
  const router = useRouter();
  const property_id = router?.query?.property_id;
  const [step, setStep] = useState('details');
  const [fractions, setFractions] = useState('');

  const projectQuery = useQuery(
    ['fetchProjectsById', property_id],
    () => fetchProjectsById(parseInt(property_id)),
    {enabled: !!property_id}
  );
  const property = projectQuery?.data?.data?.project;
  const brochure = property?.property_document?.find(el => el.purpose === 'brochure');
  const {fractionedUnitData, fractionalData} = useFractionalData(property?.id);

  const paymentDetails = {
    bundle_id: fractionedUnitData?.id,
    amount_to_pay: Number(fractions * fractionedUnitData?.price_per_fraction),
    no_of_fractions: Number(fractions),
  };
  const amountToPay = Number(fractions * fractionedUnitData?.price_per_fraction);
  const paymentType = 'asset';
  const fractionPayloadForBankTransfer = {
    payment_option: 'bank_transfer',
  };

  const {
    handlePayFromWallet,
    handlePaywithCard,
    isLoading: transactionLoading,
    paymentMutation,
    depositMutation,
  } = useAssetPayment({
    amountToPay,
    paymentType,
    paymentDetails,
    fractionPayloadForBankTransfer,
  });

  return (
    <LayoutView
      isLoading={projectQuery?.isLoading}
      rightNavigation={<PropertySidebar property_id={property?.id} />}
    >
      {projectQuery?.isError ? (
        <ErrorState />
      ) : (
        <Flex
          p={{base: `20px 0px`, md: `27px 41px`}}
          gap={{base: '16px', md: `20px`}}
          direction={{base: `column`, md: `row`}}
        >
          <Box flex={`1`}>
            <Stack gap={{base: `16px`}} position={`sticky`} top={`5px`}>
              <Heading
                px="24px"
                fontSize={'42px'}
                fontWeight={{base: `500`}}
                lineHeight="120%"
                fontFamily={`var(--font_montserrat)`}
                color={`custom_color.color_pop`}
                display={{base: 'block', md: 'none'}}
              >
                FRACTIONAL PURCHASE
              </Heading>
              <PropertyImageDisplay images={property?.photos} />
              {brochure && (
                <ExternalLink
                  as={Link}
                  href={brochure?.document_url || brochure?.document_file}
                  target="_blank"
                  rel="noopener"
                  padding={{base: `0px 20px`, md: `0px`}}
                  text="View Brochure"
                />
              )}
            </Stack>
          </Box>

          {step === 'details' ? (
            <FractionalDetails
              step={step}
              setStep={setStep}
              fractions={fractions}
              setFractions={setFractions}
              property={property}
              fractionedUnitData={fractionedUnitData}
              fractionalData={fractionalData}
            />
          ) : (
            <FractionalPaymentMethod
              step={step}
              setStep={setStep}
              handlePayFromWallet={handlePayFromWallet}
              handlePaywithCard={handlePaywithCard}
              success={paymentMutation.isSuccess || depositMutation.isSuccess}
              loading={transactionLoading}
            />
          )}
        </Flex>
      )}
    </LayoutView>
  );
}
