'use client';

import {fetchProjectsById} from '@/api/listing';
import {Landscape, Nature, Recreation, Security} from '@/components/assets/Amenities';
import {UnitCard} from '@/components/cards/UnitCard';
import {ListingUnits} from '@/components/page-components/listings/AllUnits';
import {AmenityIcon} from '@/components/page-components/listings/AmenityIcon';
import {PropertyImageDisplay} from '@/components/page-components/listings/PropertyImageDisplay';
import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import {FiArrowUpRight} from 'react-icons/fi';
import {fetchFractionalInfo} from '../../../api/listing';
import {formatToCurrency} from '@/realtors_portal/utils';
import {useQuery} from 'react-query';
import {ExternalLink, Spinner} from '../../../ui-lib';
import ErrorState from '../../../components/appState/error-state';
import useFractionalData from '../../../utils/hooks/useFractionalData';
import {PropertySidebar} from '@/components/page-components/listings/PropertySidebar';
import {useRouter} from 'next/router';
import {LayoutView} from '@/components';

export default function ListingPage({}) {
  const router = useRouter();
  const property_id = router?.query?.property_id;
  const projectQuery = useQuery(
    ['fetchProjectsById', property_id],
    () => fetchProjectsById(parseInt(property_id)),
    {
      enabled: !!property_id,
    }
  );
  const property = projectQuery?.data?.data?.project;
  const brochure = property?.property_document?.find(el => el.purpose === 'brochure');

  const {fractionedUnitData, fractionalDataLoading} = useFractionalData(property?.id);
  const leftFractions =
    Number(fractionedUnitData?.total_fractions) -
    Number(fractionedUnitData?.total_purchased_fractions);

  return (
    <LayoutView
      isLoading={projectQuery?.isLoading}
      rightNavigation={<PropertySidebar property_id={property?.id} />}
      metaData={{
        title: property?.name,
        description: property?.description,
        image: property?.photos?.[0],
      }}
    >
      {projectQuery?.isError ? (
        <ErrorState />
      ) : (
        <>
          <Box p={{base: `20px 0px`, md: `27px 41px`}}>
            <Heading
              fontSize={{base: `64px`, md: `120px`}}
              fontWeight={{base: `300`}}
              lineHeight={{base: `55px`, md: `110px`}}
              textTransform={`uppercase`}
              fontFamily={`var(--font_montserrat)`}
              my={{base: `0px`}}
              mb={{base: `20px`, md: `45px`}}
              color={`custom_color.color_pop`}
              pl={{base: `20px`, md: `0px`}}
            >
              {property?.name}
            </Heading>
            <Flex gap={`20px`} direction={{base: `column`, lg: `row`}}>
              <Box flex={`1`}>
                <Stack gap={{base: `16px`}} position={`sticky`} top={`5px`}>
                  <PropertyImageDisplay images={property?.photos} />
                  {brochure && (
                    <ExternalLink
                      as={Link}
                      href={brochure?.document_url || brochure?.document_file}
                      target="_blank"
                      rel="noopener"
                      text={`View Brochure`}
                      padding={{base: `24px 20px`, md: `0px`}}
                      display={{base: `none`, md: `flex`}}
                      fontFamily={{base: `var(--font_poppins)`, md: `var(--font_montserrat)`}}
                      fontSize={{base: `14px`, md: `16px`}}
                    />
                  )}
                </Stack>
              </Box>
              <Stack
                flex={`1`}
                divider={
                  <Divider borderColor={`matador_border_color.100`} margin={`0px !important`} />
                }
                gap={{base: `24px`, md: `73px`}}
                padding={{base: `0px 24px`, md: `nonw`}}
              >
                <Center
                  flexDirection={`column`}
                  alignItems={`flex-start`}
                  justifyContent={`center`}
                  p={{base: `0px 24px`, md: `108px 67px`}}
                  minH={{md: `470px`}}
                  gap={{base: `24px`, md: `0px`}}
                >
                  <Text //styleName: Display 1 Medium;
                    fontSize={{base: `30px`, md: `60px`}}
                    fontWeight={{base: `500`}}
                    lineHeight={{base: `120%`}}
                    letterSpacing={{base: `-1%`}}
                    textAlign={{base: `left`}}
                    fontFamily={{base: `var(--font_montserrat)`}}
                    textTransform={`uppercase`}
                  >
                    {property?.address}
                  </Text>
                  <HStack gap={{base: `28px`}}>
                    <ExternalLink
                      as={Link}
                      href={`https://maps.google.com/?q=${property?.latitude},${property?.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      text={`View Map`}
                      display={{base: `flex`, md: `none`}}
                      fontFamily={{base: `var(--font_poppins)`, md: `var(--font_montserrat)`}}
                      fontSize={{base: `14px`, md: `16px`}}
                    />

                    {brochure && (
                      <ExternalLink
                        as={Link}
                        href={brochure?.document_url || brochure?.document_file}
                        target="_blank"
                        rel="noopener"
                        text={`View Brochure`}
                        display={{base: `flex`, md: `none`}}
                        fontFamily={{base: `var(--font_poppins)`, md: `var(--font_montserrat)`}}
                        fontSize={{base: `14px`, md: `16px`}}
                      />
                    )}
                  </HStack>
                </Center>
                <Text
                  as={`h3`} //styleName: H3 Regular;
                  fontSize={{base: `14px`, md: `24px`}}
                  fontWeight={`400`}
                  lineHeight={{base: `18px`, md: `31.2px`}}
                  textAlign={`justified`}
                  px={{base: `14px`, md: `24px`}}
                >
                  {property?.description}
                </Text>
                {property?.amenities && property?.amenities?.length > 0 ? (
                  <Grid
                    templateColumns={`1fr 1fr`}
                    justifyContent={`center`}
                    alignItems={`center`}
                    px={{base: `40px`}}
                  >
                    {property?.amenities.map((el, i) => (
                      <GridItem
                        key={el.id}
                        colSpan={i % 2 === 0 && i === property?.amenities.length - 1 ? 2 : 1}
                      >
                        <VStack py={{md: `27px`}} px={{base: `24px`, md: `0px`}}>
                          {/* <Center>{el.icon}</Center> */}
                          <AmenityIcon
                            name={el.name || el.title}
                            width={{base: `29px`, md: `50px`}}
                            height={{base: `29px`, md: `50px`}}
                          />
                          <Text
                            color={`text`} //styleName: Display 5;
                            fontFamily={`var(--font_montserrat)`}
                            fontSize={{base: `12px`, md: `20px`}}
                            fontWeight={`400`}
                            lineHeight={{base: `14px`, md: `24px`}}
                            letterSpacing={`-1%`}
                            textAlign={`center`}
                          >
                            {el.name || el.title}
                          </Text>
                        </VStack>
                      </GridItem>
                    ))}
                  </Grid>
                ) : null}
                <Stack gap={`20px`}>
                  {property?.is_fractionalized && (
                    <>
                      {fractionalDataLoading ? (
                        <Center w="full" h="20vh">
                          <Spinner noAbsolute />
                        </Center>
                      ) : (
                        <Box
                          bg={`custom_color.opacity_pop._10`}
                          _hover={{bg: `custom_color.opacity_pop._20`}}
                          color={`custom_color.color_pop`}
                          border="1px solid !important"
                          borderColor={'custom_color.color_pop'}
                          onClick={() =>
                            leftFractions > 0 && router.push(`/listing/${property?.id}/fractional`)
                          }
                          transition={`.3s`}
                        >
                          <HStack
                            gap={`40px`}
                            maxW={{base: `650px`}}
                            w={`100%`}
                            mx={{base: `auto`}}
                            aspectRatio={{base: `650 / 388`}}
                            p={{base: `97px 22px`}}
                            cursor={`pointer`}
                          >
                            <Flex flexDir={`column`} alignItems={`flex-start`} gap={`8px`}>
                              <Text
                                fontSize={{base: '20px', md: `29.6px`}}
                                fontWeight={`500`}
                                lineHeight={{base: '130%', md: `27px`}}
                                textAlign={`left`}
                                fontFamily={`var(--font_montserrat)`}
                                textTransform={`uppercase`}
                                letterSpacing={`1%`}
                              >
                                {leftFractions <= 0 ? 'FRACTION SOLD OUT' : 'OWN A FRACTION'}
                              </Text>
                              <Divider borderColor={`custom_color.color_pop`} w={`100%`} />
                              <Text
                                fontSize={{base: '12px', md: `16px`}}
                                fontWeight={`600`}
                                lineHeight={{base: '140%', md: `22.4px`}}
                                textAlign={`left`}
                                letterSpacing={`1%`}
                              >
                                PRICE PER FRACTION{' '}
                                {formatToCurrency(fractionedUnitData?.price_per_fraction)}
                              </Text>
                            </Flex>
                            <Center>
                              <FiArrowUpRight fontSize={`16px`} />
                            </Center>
                          </HStack>
                        </Box>
                      )}
                    </>
                  )}
                  <ListingUnits property_id={property?.id} />
                </Stack>
              </Stack>
            </Flex>
          </Box>
        </>
      )}
    </LayoutView>
  );
}
