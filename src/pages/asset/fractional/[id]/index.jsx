import {fetchEquity, fetchFractionalInfo} from '@/api/listing';
import {LayoutView} from '@/components';
import ErrorState from '@/components/appState/error-state';
import {PropertyImageDisplay} from '@/components/page-components/listings/PropertyImageDisplay';
import {AssetHeader} from '@/components/page-components/manageAssets/AssetHeader';
import {AssetOverview} from '@/components/page-components/manageAssets/AssetsOverview';
import {FractionalDetails} from '@/components/page-components/manageAssets/fractional/fractionalDetail';
import FractionalTransactionInfo from '@/components/page-components/manageAssets/fractional/fractionalTransactionInfo';
import {AssetNavigation} from '@/components/page-components/manageAssets/navigation/assetsNavigation';
import {formatToCurrency} from '@/utils/formatAmount';
import {formatPropertySize} from '@/utils/misc';
import {Box, Flex, Stack} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';

const FractionalAsset = () => {
  const router = useRouter();
  const asset_id = router?.query?.id;
  const {data, isLoading, isError} = useQuery(['fetchUserEquity', asset_id], () =>
    fetchEquity(asset_id)
  );
  const info = data?.data;
  const [bigPhotoViewSrc, setBigPhotoViewSrc] = useState(null);

  const firstPhoto = info?.project?.photos[0]?.photo;

  useEffect(() => {
    if (firstPhoto) {
      setBigPhotoViewSrc(firstPhoto ?? imageFallback.src);
    }
  }, [firstPhoto, info?.project?.photos]);
  const {data: fractionalDetail} = useQuery(
    ['fractional', info?.unit?.id],
    () => fetchFractionalInfo(info?.unit?.id),
    {enabled: !!info?.unit?.id}
  );

  const OVERVIEWINFO = [
    {label: 'Property type', value: info?.project?.building_type ?? '-'},
    {
      label: 'Building size',
      value: formatPropertySize(info?.project?.land_size),
    },
    {
      label: 'Strategy',
      value: info?.unit?.strategy?.replace(/_/g, ' ') ?? '-',
    },
    {label: 'Holding Period', value: info?.unit?.holding_period ?? '-'},
    {
      label: 'Legal Partner',
      value: info?.owner?.company_name ?? '-',
    },
  ];

  const FRACTIONALINFO = [
    {
      label: 'Dividend Payout',
      value: fractionalDetail?.data?.extra_info?.dividend_payout ?? '-',
    },
    {
      label: 'Dividend Amount',
      value: formatToCurrency(fractionalDetail?.data?.extra_info?.dividend_amount) ?? '-',
    },
  ];

  return (
    <LayoutView
      isLoading={isLoading}
      rightNavigation={<AssetNavigation isFractional equityId={asset_id} />}
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
              listingName={`${info?.amount_of_fractions} fraction${
                info?.amount_of_fractions > 1 ? 's' : ''
              }`}
              unitName={info?.project?.name}
              display={{base: 'block', lg: 'none'}}
              pl={4}
            />
            <Box flex={`1`} h={`max-content`} position={`sticky`} top={`5px`}>
              <PropertyImageDisplay images={info?.project?.photos} />
            </Box>
            <Box p={{base: '10px', lg: 0}} w="full" flex={`1`}>
              <Stack
                bg={{lg: 'matador_background.100'}}
                border={{lg: '1px solid'}}
                borderColor={{lg: 'matador_border_Color.100'}}
                borderTop={{base: '1px solid'}}
                borderTopColor="matador_border_Color.100"
                w="full"
                maxW={{lg: '650px'}}
                p={'20px'}
                px={{base: '10px', lg: '20px'}}
              >
                <AssetOverview
                  listingName={`${info?.amount_of_fractions} fraction${
                    info?.amount_of_fractions > 1 ? 's' : ''
                  }`}
                  unitName={info?.project?.name}
                  overviewInfo={OVERVIEWINFO}
                />
                {fractionalDetail?.data?.extra_info?.dividend_payout && (
                  <FractionalDetails overviewInfo={FRACTIONALINFO} />
                )}
                <FractionalTransactionInfo dividendObj={fractionalDetail?.data?.extra_info} />
              </Stack>
            </Box>
          </Flex>
        </Stack>
      )}
    </LayoutView>
  );
};

export default FractionalAsset;
