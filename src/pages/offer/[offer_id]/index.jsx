import {fetchOffers} from '@/api/listing';
import {LayoutView} from '@/components';
import {PropertyImageDisplay} from '@/components/page-components/listings/PropertyImageDisplay';
import {PropertySidebar} from '@/components/page-components/listings/PropertySidebar';
import {OfferPurchaseFlow} from '@/components/page-components/units/OfferPurchaseFlow';
import {PurchaseFlow} from '@/components/page-components/units/PurchaseFlow';
import {ExternalLink} from '@/ui-lib';

import {Box, Flex, Heading, HStack, Show, Stack, Text} from '@chakra-ui/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FiArrowUpRight} from 'react-icons/fi';
import {useQuery} from 'react-query';

export default function OfferPage({params}) {
  const router = useRouter();
  const offerId = router?.query?.offer_id;
  const pendingQuery = useQuery(['fetchUserEquity', 'OFFERS'], fetchOffers, {refetchOnMount: true});
  const assetData = pendingQuery?.data?.data?.data;
  console.log({assetData});
  const assetToUse = assetData?.find(asset => `${asset?.id}` === `${offerId}`);
  const property = assetToUse?.project;
  const unit = assetToUse?.unit;
  const brochure = property?.property_document?.find(el => el.purpose === 'brochure');

  return (
    <LayoutView
      isLoading={pendingQuery?.isLoading}
      rightNavigation={<PropertySidebar property_id={property?.id} />}
    >
      <Box p={{base: `20px 0px`, md: `27px 41px`}}>
        <Flex
          p={{base: `20px 0px`, md: `27px 41px`}}
          gap={{base: '0px', md: `20px`}}
          direction={{base: `column`, md: `row`}}
        >
          <Box flex={`1`} minW={`300px`}>
            <Stack gap={{base: `16px`}} position={`sticky`} top={`5px`}>
              <Show above="md">
                <PropertyImageDisplay images={property?.photos} />
              </Show>
              <Show below="md">
                <Heading
                  fontSize={{base: `60px`, md: `120px`}}
                  fontWeight={{base: `300`}}
                  letterSpacing={`-1%`}
                  lineHeight={`120%`}
                  textTransform={`uppercase`}
                  fontFamily={`var(--font_montserrat)`}
                  my={{base: `0px`}}
                  mb={{base: `20px`, md: `45px`}}
                  color={`primary.color`}
                  pl={{base: `20px`, md: `0px`}}
                >
                  {unit?.unit_title || unit?.name}
                </Heading>
                <PropertyImageDisplay images={unit?.photos} />
              </Show>
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
          <OfferPurchaseFlow assetToUse={assetToUse} />
        </Flex>
      </Box>
    </LayoutView>
  );
}
