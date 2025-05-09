import {fetchEquity} from '@/api/listing';
import {LayoutView} from '@/components';
import {Box, Flex, Stack} from '@chakra-ui/react';
import {useParams} from 'next/navigation';
import {useQuery} from 'react-query';
import {AnimateImagePresence} from '@/components/page-components/manageAssets/animateImagePresence';
import {useEffect, useState} from 'react';
import {Spinner} from '@/ui-lib/ui-lib.components/Spinner';
import ErrorState from '@/components/appState/error-state';
import AssetCarousel from '@/components/page-components/manageAssets/assetCarousel';
import {AssetHeader} from '@/components/page-components/manageAssets/AssetHeader';
import {formatToCurrency} from '@/utils/formatAmount';
import {fullDate} from '@/utils/formatDate';
import ValidateAssetOverview, {
  ValidateHeader,
} from '@/components/page-components/manageAssets/validate/ValidateAssetsOverview';
import {useRouter} from 'next/router';
import {formatPropertySize} from '@/utils/misc';

const ValidateOutrightAsset = () => {
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
      label: 'Purchase Price',
      value: formatToCurrency(assetDetail?.total_unit_price) ?? '-',
    },
    {
      label: 'Unit size',
      value: formatPropertySize(assetDetail?.unit?.unit_size),
    },
    {
      label: 'Purchase Date',
      value: fullDate(assetDetail?.purchase_date) ?? '-',
    },
  ];

  const validationRequestArray = assetDetail?.validation_requests || [];
  const validation_requestsId = validationRequestArray?.[validationRequestArray?.length - 1]?.id;
  return (
    <LayoutView isLoading={isLoading}>
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
            <Stack gap={4} px={4} display={{lg: 'none'}}>
              <ValidateHeader />
              <AssetHeader
                listingName={assetDetail?.project?.name}
                unitName={assetDetail?.unit?.unit_title}
              />
            </Stack>

            <Flex direction={{base: 'column', lg: 'row'}} gap="33px">
              <Stack>
                <AnimateImagePresence
                  sourceUrl={bigPhotoViewSrc}
                  w="full"
                  minW={{base: '545px', '2xl': '650px'}}
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
                <ValidateAssetOverview
                  listingName={assetDetail?.project?.name}
                  unitName={assetDetail?.unit?.unit_title}
                  overviewInfo={OVERVIEWINFO}
                  equityId={asset_id}
                  validation_requestsId={validation_requestsId}
                />
              </Stack>
            </Box>
          </Flex>
        </Stack>
      )}
    </LayoutView>
  );
};

export default ValidateOutrightAsset;
