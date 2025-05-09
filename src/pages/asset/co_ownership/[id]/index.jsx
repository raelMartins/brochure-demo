'use client';
import {fetchEquity} from '@/api/listing';
import {LayoutView} from '@/components';
import ErrorState from '@/components/appState/error-state';
import Allocations from '@/components/page-components/manageAssets/allocation';
import {AnimateImagePresence} from '@/components/page-components/manageAssets/animateImagePresence';
import AssetCarousel from '@/components/page-components/manageAssets/assetCarousel';
import {AssetHeader} from '@/components/page-components/manageAssets/AssetHeader';
import {AssetOverview} from '@/components/page-components/manageAssets/AssetsOverview';
import CoownersTransactions from '@/components/page-components/manageAssets/coownership/coownersTransactions';
import {PaymentPlanAssetNavigation} from '@/components/page-components/manageAssets/navigation/paymentPlanAssetNavigation';
import {Spinner} from '@/ui-lib/ui-lib.components/Spinner';
import {formatPropertySize} from '@/utils/misc';
import {Box, Flex, Stack} from '@chakra-ui/react';
import {useParams} from 'next/navigation';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';

const CoOwnership = () => {
  const router = useRouter();
  const asset_id = router?.query?.id;
  const {data, isLoading, isError, refetch} = useQuery(
    ['fetchUserEquity', asset_id],
    () => fetchEquity(asset_id),
    {enabled: !!asset_id}
  );
  const assetDetail = data?.data;
  const [bigPhotoViewSrc, setBigPhotoViewSrc] = useState(null);
  const firstPhoto = assetDetail?.project?.photos[0]?.photo;

  useEffect(() => {
    if (firstPhoto) {
      setBigPhotoViewSrc(firstPhoto ?? imageFallback.src);
    }
  }, [firstPhoto, assetDetail?.project?.photos]);

  const OVERVIEWINFO = [
    {
      label: 'Property Type',
      value: assetDetail?.project?.building_type ?? '-',
    },
    {
      label: 'Land Title',
      value: assetDetail?.project?.land_title ?? '-',
    },
    {
      label: 'Development Stage',
      value: assetDetail?.project?.status ?? '-',
    },
    {
      label: 'Building size',
      value: formatPropertySize(assetDetail?.project?.land_size),
    },
    {
      label: 'Allocated Unit',
      component: <Allocations equity={assetDetail} refetch={refetch} />,
    },
  ];

  return (
    <LayoutView
      isLoading={isLoading}
      rightNavigation={<PaymentPlanAssetNavigation data={assetDetail} equityId={asset_id} />}
    >
      {isError || !data ? (
        <ErrorState />
      ) : (
        <Stack w="full" align="center" justify="center">
          <Flex
            w="full"
            pt={{lg: '40px'}}
            justify="space-between"
            maxW="1440px"
            gap="16px"
            direction={{base: 'column', lg: 'row'}}
          >
            <AssetHeader
              listingName={assetDetail?.project?.name}
              unitName={assetDetail?.unit?.unit_title}
              display={{base: 'block', lg: 'none'}}
              pl={4}
            />
            <Flex direction={{base: 'column', lg: 'row'}} gap="33px">
              <Stack>
                <AnimateImagePresence
                  sourceUrl={bigPhotoViewSrc}
                  w="full"
                  minW={{base: '545px'}}
                  maxW="full"
                  h="472px"
                  objectFit="cover"
                  cursor={'zoom-in'}
                  display={{base: 'none', lg: 'flex'}}
                />
                {assetDetail?.project?.photos?.length > 0 ? (
                  <AssetCarousel
                    photos={assetDetail?.project?.photos}
                    setBigPhotoViewSrc={setBigPhotoViewSrc}
                  />
                ) : null}
              </Stack>
            </Flex>
            <Box p={{base: '20px', lg: 0}} w="full">
              <Stack
                bg={{lg: '#FAFAFA'}}
                border={{lg: '1px solid'}}
                borderColor={{lg: 'border.1'}}
                borderTop={{base: '1px solid'}}
                borderTopColor="border.1"
                w="full"
                maxW={{lg: '650px'}}
                p={'20px'}
                px={{base: '10px', lg: '20px'}}
                maxH={{lg: '80vh'}}
              >
                <AssetOverview
                  listingName={assetDetail?.project?.name}
                  unitName={assetDetail?.unit?.unit_title}
                  overviewInfo={OVERVIEWINFO}
                />
                <CoownersTransactions equityInfo={assetDetail} />
              </Stack>
            </Box>
          </Flex>
        </Stack>
      )}
    </LayoutView>
  );
};

export default CoOwnership;
