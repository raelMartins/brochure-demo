'use client';
import {LayoutView} from '@/components';
import ErrorState from '@/components/appState/error-state';
import Allocations from '@/components/page-components/manageAssets/allocation';
import {AnimateImagePresence} from '@/components/page-components/manageAssets/animateImagePresence';
import {Spinner} from '@/ui-lib/ui-lib.components/Spinner';
import {Box, Flex, Stack} from '@chakra-ui/react';
import {useParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {AssetOverview} from '@/components/page-components/manageAssets/AssetsOverview';
import {fetchEquity} from '@/api/listing';
import PaymentPlanTransaction from '@/components/page-components/manageAssets/payment_plan/paymentPlanTransaction';
import {PaymentPlanAssetNavigation} from '@/components/page-components/manageAssets/navigation/paymentPlanAssetNavigation';
import AssetCarousel from '@/components/page-components/manageAssets/assetCarousel';
import {AssetHeader} from '@/components/page-components/manageAssets/AssetHeader';
import {useRouter} from 'next/router';
import {PropertyImageDisplay} from '@/components/page-components/listings/PropertyImageDisplay';
import {formatPropertySize} from '@/utils/misc';

const PaymentPlan = () => {
  const router = useRouter();
  const asset_id = router?.query?.id;
  const {data, isLoading, isError, refetch} = useQuery(['fetchUserEquity', asset_id], () =>
    fetchEquity(asset_id)
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
      hide: assetDetail?.unit?.allocation_type === 'manual' && !assetDetail?.allocation,
    },
  ];

  return (
    <LayoutView
      isLoading={isLoading}
      rightNavigation={
        <PaymentPlanAssetNavigation data={assetDetail} equityId={asset_id} refetch={refetch} />
      }
    >
      {isError || !data ? (
        <ErrorState />
      ) : (
        <Stack w="full" align="center" justify="center">
          <Flex
            w="full"
            py="40px"
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
            <Box flex={`1`} h={`max-content`} position={`sticky`} top={`5px`}>
              <PropertyImageDisplay images={assetDetail?.project?.photos} />
            </Box>

            <Box p={{base: '20px', lg: 0}} w="full" flex={`1`}>
              <Stack
                bg={{lg: 'matador_background.100'}}
                border={{lg: '1px solid'}}
                borderColor={{lg: 'matador_border_color.100'}}
                borderTop={{base: '1px solid'}}
                borderTopColor="matador_border_color.100"
                w="full"
                maxW={{lg: '650px'}}
                p={'20px'}
                px={{base: '10px', lg: '20px'}}
              >
                <AssetOverview
                  listingName={assetDetail?.project?.name}
                  unitName={assetDetail?.unit?.unit_title}
                  overviewInfo={OVERVIEWINFO}
                />
                <PaymentPlanTransaction equityInfo={assetDetail} />
              </Stack>
            </Box>
          </Flex>
        </Stack>
      )}
    </LayoutView>
  );
};

export default PaymentPlan;
