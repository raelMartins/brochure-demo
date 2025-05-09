import {fetchProjectsWithFilters} from '@/api/listing';
import {PropertyCard} from '@/components/cards/PropertyCard';
import {Box, Center, Heading, Stack} from '@chakra-ui/react';
import ErrorState from '@/components/appState/error-state';
import PendingTransactionsBar from '@/components/drawers/pendingTransactions';
import OffersBar from '@/components/drawers/offers';
import ValidateEquityBar from '@/components/drawers/validateEquity';
import {LayoutView} from '@/components';
import ThreeDots from '@/components/loaders/ThreeDots';
import {useInfiniteQuery, useQuery} from 'react-query';
import useGetSession from '@/utils/hooks/getSession';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import EmptyState from '@/components/appState/empty-state';

const defaultFilterObj = {
  paymentPlan: false,
  propertyType: [],
  priceRange: {
    priceFrom: '',
    priceTo: '',
  },
  no_of_bedroom: [],
  searchString: '',
};

export default function PropertiesPage() {
  const {data, isLoading, isError} = useQuery(['all_properties'], fetchProjectsWithFilters);

  const properties = data?.data?.project || [];

  const [queryString, setQueryString] = useState(null);
  const [filterObj, setFilterObj] = useState(defaultFilterObj);

  const [scrollDirection, setScrollDirection] = useState('down');
  const [count, setCount] = useState(0);
  const router = useRouter();

  const {sessionData: LoggedinUser} = useGetSession('loggedIn');

  const isAppendable = (item: any) => {
    if (item === '' || item === undefined || item === null) return false;
    else return true;
  };

  const {
    data: infiniteData,
    error: infiniteError,
    isError: infiniteIsError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading: infiniteLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['infiniteListingData', queryString],
    queryFn: ({pageParam = `${queryString ? `${queryString}&` : ''}page=1`}) => {
      return fetchProjectsWithFilters(pageParam);
    },
    getNextPageParam: (lastPage: any, pages: any[]) => {
      const maxPageNumber = Math.ceil(lastPage?.data?.count / 10);
      const nextPageNumber = pages.length + 1;
      return nextPageNumber <= maxPageNumber
        ? `${queryString ? `${queryString}&` : ''}page=${nextPageNumber}`
        : undefined;
    },
  });

  const numberOfProjects =
    infiniteData?.pages?.flatMap((projectData: any) => projectData?.data?.project?.map(() => 0))
      ?.length ?? 0;

  const getQueryString = () => {
    const queryString = new URLSearchParams();

    const {
      paymentPlan,
      propertyType = [],
      priceRange,
      no_of_bedroom = [],
      searchString,
    } = filterObj ?? {};

    let {priceFrom, priceTo} = priceRange;
    const maxValue = infiniteData?.pages?.[0]?.data?.max_price;
    const minValue = infiniteData?.pages?.[0]?.data?.min_price;

    if (Number(priceFrom) > Number(priceTo)) {
      priceFrom = minValue;
      if (Number(priceFrom) > Number(priceTo)) {
        priceTo = maxValue;
        priceFrom = priceRange.priceFrom;
      }

      setFilterObj((prevState: any) => ({
        ...prevState,
        priceRange: {
          ...prevState.priceRange,
          priceFrom,
          priceTo,
        },
      }));
    }

    propertyType.forEach((item: any) => {
      queryString.append('building_type[]', item);
    });

    queryString.append('payment_plan_is_available', paymentPlan ? 'true' : 'false');

    if (isAppendable(priceFrom)) {
      queryString.append('price_from', priceFrom);
    }
    if (isAppendable(priceTo)) {
      queryString.append('price_to', priceTo);
    }

    no_of_bedroom.forEach((item: any) => {
      queryString.append('no_of_bedroom[]', item);
    });

    if (isAppendable(searchString)) {
      // queryString.append('search', searchString?.formatted_address ?? searchString);
      queryString.append('search', searchString);
    }

    return queryString.toString();
  };

  const handleFilter = () => {
    const queryString: any = getQueryString();
    return setQueryString(queryString);
  };
  const handleReset = () => {
    setFilterObj(defaultFilterObj);
    return setQueryString(null);
  };

  const handleAnimation = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 840 && numberOfProjects > 10) {
      setScrollDirection('up');
    } else {
      setScrollDirection('down');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      handleAnimation();
      if (
        !isFetchingNextPage &&
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 10
      ) {
        return hasNextPage ? fetchNextPage() : null;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  return (
    <LayoutView isLoading={isLoading}>
      <Stack h={`100%`} flex={`1`} gap={`0px`}>
        <Box
          zIndex={20}
          position={'fixed'}
          bottom={{base: 'unset', md: '30px'}}
          left={{base: '20px', md: '30px'}}
          right={{base: '20px', md: 'unset'}}
          top={{base: '100px', md: 'unset'}}
        >
          <PendingTransactionsBar />
          <OffersBar />
        </Box>
        <Heading
          fontSize={{base: '64px', lg: '120px', xl: `179px`}}
          fontWeight="300"
          textTransform="uppercase"
          lineHeight={{base: '48px', lg: '130px'}}
          fontFamily="var(--font_montserrat)"
          my={{base: '20px', md: '40px'}}
          pl={{base: '20px', md: '0px'}}
        >
          Our Portfolio
        </Heading>
        {/* <Stack gap="-20px">
          {isError ? (
            <ErrorState text={`Error loading properties.`} />
          ) : (
            properties.map((item: any, index: number) => (
              <PropertyCard
                key={item.id}
                data={item}
                index={index}
                last={index + 1 === properties?.length}
              />
            ))
          )}
        </Stack> */}
        <Stack gap={`-20px`}>
          {infiniteLoading ? (
            <>
              {Array(3)
                .fill({})
                ?.map((data, index) => (
                  <PropertyCard
                    key={index}
                    isLoading
                    index={index}
                    last={index + 1 === properties?.length}
                  />
                ))}
            </>
          ) : infiniteIsError ? (
            <ErrorState
              text={`${
                // infiniteError?.response?.status === 500
                //   ? "Apologies for the inconvenience. We're working on it. Please try again later."
                //   : infiniteError?.response?.status === 401
                //   ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                //   : infiniteError?.response?.data?.message ??
                //     infiniteError?.response?.message ??
                //     infiniteError?.message ??
                'Something went wrong'
              }`}
            />
          ) : (
            <>
              {numberOfProjects > 0 ? (
                <>
                  {infiniteData?.pages?.map((projectData, i) =>
                    projectData?.data?.project?.map((data: any, index: number) => (
                      <PropertyCard
                        key={data?.id}
                        data={data}
                        index={index}
                        last={index + 1 === properties?.length}
                      />
                    ))
                  )}
                  {isFetchingNextPage
                    ? Array(3)
                        ?.fill(``)
                        ?.map((item, index) => (
                          <PropertyCard
                            key={index}
                            isLoading
                            index={index}
                            last={index + 1 === properties?.length}
                          />
                        ))
                    : null}
                </>
              ) : (
                // ) : queryString ? (
                //   <EmptyStateForFlter handleReset={handleReset} />
                <EmptyState
                  icon
                  heading={'Nothing found'}
                  text={`No property was found`}
                  height={``}
                  noHeader={false}
                />
              )}
            </>
          )}
        </Stack>
      </Stack>
    </LayoutView>
  );
}
