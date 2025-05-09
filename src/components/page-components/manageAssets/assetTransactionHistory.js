import ThreeDots from '@/components/loaders/ThreeDots';
import AssetsTransactionTable from '@/components/tables/assetsTransactionTable';
import StaggeredSkeleton from '@/components/tables/assetTableSkeleton';
import {Spinner} from '@/ui-lib';
import {useLightenHex} from '@/utils/lightenColorShade';
import {Box, Center, Divider, Skeleton, Stack, Text, useTheme} from '@chakra-ui/react';

const TransactionHistory = ({
  arrayData,
  shouldScroll,
  infiniteData,
  scrollToTop,
  isFetchingNextPage,
  numberOfTransactions,
  isLoading,
  Column,
  isError,
  error,
  children,
  ...rest
}) => {
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
      paddingRight: '4rem',
    },
  });
  const theme = useTheme();
  const primaryColor = theme.colors.custom_color?.color_pop;
  return (
    <Stack
      px={{base: '0px', xl: '18px'}}
      p={{base: '16px', xl: '23.5px'}}
      bg={`custom_color.opacity_pop._10`}
      spacing="none"
      h="fit-content"
      {...rest}
    >
      <Text
        fontSize={{base: '12px', md: '16px'}}
        color="matador_text.300"
        fontWeight="500"
        textTransform="uppercase"
      >
        Transaction History
      </Text>
      <Stack
        sx={customScrollbarStyles()}
        id="tnxsHistory"
        overflowY="auto"
        scrollBehavior="smooth"
        maxH={{base: 'full'}}
        spacing={{base: 'none', xl: '18px'}}
        pr={3}
      >
        {children}
        <Divider border="none" h="0.95px" bg="custom_color.color_pop" />
        <Box pt={{base: 4, lg: 0}}>
          {isLoading ? (
            <Center h={`100px`}>
              <ThreeDots />
            </Center>
          ) : (
            <AssetsTransactionTable
              shouldScroll={shouldScroll}
              scrollToTop={scrollToTop}
              isFetchingNextPage={isFetchingNextPage}
              forData={[isFetchingNextPage, infiniteData]}
              isLoading={isLoading}
              isError={isError}
              error={error}
              forColumn={[isFetchingNextPage, infiniteData]}
              pageSize={numberOfTransactions}
              DATA={arrayData}
              COLUMNS={Column}
            />
          )}
        </Box>
      </Stack>
    </Stack>
  );
};

export default TransactionHistory;
