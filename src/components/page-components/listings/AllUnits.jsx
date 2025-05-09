'use client';

import {fetchAllUnits} from '@/api/listing';
import {UnitCard} from '@/components/cards/UnitCard';
import {useQuery} from 'react-query';
import {useRouter} from 'next/navigation';

export const ListingUnits = ({is_sold_out, property_id}) => {
  // const router = useRouter();
  const {data, isError, isLoading, error} = useQuery(
    ['fetchAllUnits', property_id],
    () => fetchAllUnits(parseInt(property_id)),
    {
      enabled: !!property_id,
    }
  );

  return data?.data?.results?.map(unit => (
    <>
      <UnitCard key={unit?.id} data={unit} />
    </>
  ));
};
