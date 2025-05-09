'use client';

import {PropertyImageDisplay} from '@/components/page-components/listings/PropertyImageDisplay';
import {OfferPurchaseFlow} from '@/components/page-components/units/OfferPurchaseFlow';

import {Box, Flex, Heading, HStack, Show, Stack, Text} from '@chakra-ui/react';
import Link from 'next/link';
import {FiArrowUpRight} from 'react-icons/fi';
import {useQuery} from 'react-query';
import {fetchUserEquity} from '../../../api/listing';
import {useRouter} from 'next/router';
import {PropertySidebar} from '@/components/page-components/listings/PropertySidebar';
import {LayoutView} from '@/components';

export default function UnitPage({params}) {
  const router = useRouter();
  const pendingId = router?.query?.pending_id;

  const pendingQuery = useQuery(['fetchUserEquity', 'PENDING'], () => fetchUserEquity('PENDING'), {
    refetchOnMount: true,
  });
  const assetData = pendingQuery?.data?.data?.results;

  const assetToUse = assetData?.find(asset => `${asset?.id}` === `${pendingId}`);
  const property = assetToUse?.project;
  const unit = assetToUse?.unit;
  const brochure = property?.property_document?.find(el => el.purpose === 'brochure');

  return (
    <LayoutView rightNavigation={<PropertySidebar property_id={property?.id} />}>
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
                  color={`custom_color.color_pop`}
                  pl={{base: `20px`, md: `0px`}}
                >
                  {unit?.unit_title || unit?.name}
                </Heading>
                <PropertyImageDisplay images={unit?.photos} />
              </Show>
              {brochure && (
                <Link
                  href={brochure?.document_url || brochure?.document_file}
                  target="_blank"
                  rel="noopener"
                >
                  <HStack
                    gap={`10px`}
                    color={`custom_color.color_pop`}
                    padding={{base: `0px 20px`, md: `0px`}}
                  >
                    <Text
                      fontFamily={`var(--font_montserrat)`}
                      textTransform={`uppercase`}
                      fontWeight={`500`}
                      lineHeight={`24px`}
                      letterSpacing={`-0.01em`}
                      textAlign={`left`}
                    >
                      View Brochure
                    </Text>
                    <FiArrowUpRight />
                  </HStack>
                </Link>
              )}
            </Stack>
          </Box>
          <OfferPurchaseFlow assetToUse={assetToUse} />
        </Flex>
      </Box>
    </LayoutView>
  );
}
