import { fractionalEquityTransactionHistory } from "@/api/listing";
import { Divider, HStack, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import TransactionHistory from "../assetTransactionHistory";
import FRACTIONTRANSACTIONHISTORYCOLUMN from "@/components/tables/fractionsTransactionHistoryColumns";
import { formatToCurrency } from "@/utils/formatAmount";

const FractionalTransactionInfo = ({displayTab, dividendObj}) => {
  const query = useParams();
  const [shouldScroll, setScrollDirection] = useState('down');
  const [isBelowXl] = useMediaQuery('(max-width: 1270px)');
  const customScrollbarStyles = (trackColor = '#fff', thumbColor = '#cbcbcb') => ({
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: `inset 0 0 6px ${trackColor}`,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: thumbColor,
    },
  });

  const {
    data: infiniteData,
    error,
    isError,

    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fraction transaction', query?.id],
    queryFn: ({pageParam = `${query.id}&page=1`}) => {
      return fractionalEquityTransactionHistory(pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      const maxPageNumber = Math.ceil(lastPage?.data?.count / 10);
      const nextPageNumber = pages.length + 1;

      return nextPageNumber <= maxPageNumber ? `${query.id}&page=${nextPageNumber}` : undefined;
    },
  });

  const scrollToTop = () => {
    const wrap = document?.getElementById('tnxsHistory');

    wrap.scrollTop = 0;
  };
  const numberOfTransactions =
    infiniteData?.pages?.flatMap(trnx => trnx?.data?.results?.map(() => 0))?.length ?? 0;

  const handleAnimation = wrap => {
    const currentScrollY = wrap?.scrollTop;

    if (currentScrollY > 840 && numberOfTransactions > 10) {
      setScrollDirection('up');
    } else {
      setScrollDirection !== 'down' ? setScrollDirection('down') : null;
    }
  };

  const handleScroll = () => {
    const wrap = document?.getElementById('tnxsHistory');

    handleAnimation(wrap);

    if (
      !isFetchingNextPage &&
      numberOfTransactions >= 10 &&
      wrap?.clientHeight + wrap?.scrollTop >= wrap?.scrollHeight
    ) {
      return hasNextPage ? fetchNextPage() : null;
    }
  };
  const arrayData = infiniteData?.pages?.flatMap(transHistory =>
    transHistory?.data?.results?.map(item => item)
  );

  return (
    <Stack
      onScroll={handleScroll}
      sx={customScrollbarStyles()}
      id="tnxsHistory"
      overflowY="auto"
      scrollBehavior="smooth"
      maxH={{base: '500px', xl: '600px'}}
      spacing={{base: 'none', xl: '18px'}}
    >
      {dividendObj?.enable_dividend && isBelowXl ? (
        <Divider
          border="none"
          display={{xl: 'none'}}
          my={{base: '10.68px', xl: '0px'}}
          h="0.95px"
          bg="#e4e4e4"
        />
      ) : null}
      <TransactionHistory
        arrayData={arrayData || []}
        isLoading={isLoading}
        Column={FRACTIONTRANSACTIONHISTORYCOLUMN}
        isError={isError}
        error={error}
        infiniteData={infiniteData}
        shouldScroll={shouldScroll}
        scrollToTop={scrollToTop}
        isFetchingNextPage={isFetchingNextPage}
        numberOfTransactions={numberOfTransactions}
        spacing={{xl: '15.66px', base: '10.68px'}}
      />
    </Stack>
  );
};

export default FractionalTransactionInfo;
