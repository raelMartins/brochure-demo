'use client';

import {fetchAllUnits, fetchProjectsById} from '@/api/listing';
import {LayoutView} from '@/components';
import {PropertyImageDisplay} from '@/components/page-components/listings/PropertyImageDisplay';
import {PropertySidebar} from '@/components/page-components/listings/PropertySidebar';
import {PurchaseFlow} from '@/components/page-components/units/PurchaseFlow';

import {Box, Flex, Heading, HStack, Show, Stack, Text} from '@chakra-ui/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FiArrowUpRight} from 'react-icons/fi';
import {useQuery} from 'react-query';

export default function UnitPage({}) {
  const router = useRouter();
  const property_id = router?.query?.property_id;
  const unit_id = router?.query?.unit_id;
  const {data: res, isLoading: projectLoading} = useQuery(['fetchProjectsById', property_id], () =>
    fetchProjectsById(parseInt(property_id))
  );
  const property = res?.data?.project;
  const {data: res2, isLoading: unitsLoading} = useQuery(['fetchAllUnits', property_id], () =>
    fetchAllUnits(parseInt(property_id))
  );
  const unit = res2?.data?.results?.find(item => parseInt(item.id) == parseInt(unit_id));
  const brochure = property?.property_document?.find(el => el.purpose === 'brochure');

  const loading = projectLoading || unitsLoading;

  return (
    <LayoutView
      isLoading={loading}
      rightNavigation={<PropertySidebar property_id={property?.id} />}
    >
      <Box p={{base: `20px 0px`, lg: `27px 41px`}}>
        <Flex
          p={{base: `20px 0px`, lg: `27px 41px`}}
          gap={{base: '0px', lg: `20px`}}
          direction={{base: `column`, lg: `row`}}
        >
          <Box flex={`1`} minW={`300px`}>
            <Stack gap={{base: `16px`}} position={`sticky`} top={`5px`}>
              <Show above="lg">
                <PropertyImageDisplay images={property?.photos} />
              </Show>
              <Show below="lg">
                <Heading
                  fontSize={{base: `60px`, lg: `120px`}}
                  fontWeight={{base: `300`}}
                  letterSpacing={`-1%`}
                  lineHeight={`120%`}
                  textTransform={`uppercase`}
                  fontFamily={`var(--font_montserrat)`}
                  my={{base: `0px`}}
                  mb={{base: `20px`, lg: `45px`}}
                  color={`custom_color.color_pop`}
                  pl={{base: `20px`, lg: `0px`}}
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
          <PurchaseFlow unit={unit} />
        </Flex>
      </Box>
    </LayoutView>
  );
}
