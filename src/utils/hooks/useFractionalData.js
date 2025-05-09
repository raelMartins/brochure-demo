import {useQuery} from 'react-query';
import {fetchAllUnits, fetchFractionalInfo} from '../../api/listing';

const useFractionalData = property_id => {
  const {data: allUnits} = useQuery(
    ['fetchAllUnits', property_id],
    () => fetchAllUnits(parseInt(property_id)),
    {enabled: !!property_id}
  );

  const unitsData = allUnits?.data?.results;
  const unitThatWasFractionalized = unitsData?.find(item => item?.is_fraction_sale_available);

  const fractionalQuery = useQuery(
    ['fractional', unitThatWasFractionalized?.id],
    () => fetchFractionalInfo(unitThatWasFractionalized?.id),
    {
      enabled: !!unitThatWasFractionalized?.id,
    }
  );
  const fractionalData = fractionalQuery?.data?.data;
  const fractionedUnitData = fractionalData?.fraction_data?.unit;

  return {fractionedUnitData, fractionalData, fractionalDataLoading: fractionalQuery?.isLoading};
};

export default useFractionalData;
