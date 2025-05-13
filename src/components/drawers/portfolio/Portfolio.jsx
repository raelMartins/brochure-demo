import {
  Image,
  VStack,
  HStack,
  Text,
  useToast,
  Flex,
  Stack,
  Divider,
  useTheme,
  Center,
} from '@chakra-ui/react';
import {useInfiniteQuery} from 'react-query';
import {useEffect, useRef, useState} from 'react';
import {Drawer, DrawerOverlay, DrawerContent, Box} from '@chakra-ui/react';
import {CloseIcon} from '@chakra-ui/icons';
import {fetchUserEquity} from '@/api/listing';
import thinArrow from '/src/images/icons/thinArrow.svg';
import {useRouter} from 'next/navigation';
import ErrorState from '@/components/appState/error-state';
import EmptyState from '@/components/appState/empty-state';
import {Footer} from '@/components/page_layout/Footer';
import MobileHeader from '@/components/navbar/mobile_header';
import {drawer_styles, drawer_title_styles} from '../styles';
import {FiArrowUpRight} from 'react-icons/fi';
import ThreeDots from '@/components/loaders/ThreeDots';

export const Portfolio = ({isAssetOpen, onAssetClose, onDrawerOpen}) => {
  const router = useRouter();
  const toast = useToast();
  const [screenWidth, setScreenWidth] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('PAID');
  const [scrollPosition1, setScrollPosition1] = useState(0);
  const [shouldScroll, setScrollDirection] = useState('down');
  const {data, isError, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage} =
    useInfiniteQuery({
      queryKey: ['infinitePaidAssets', 'PAID'],
      queryFn: ({pageParam = `PAID&page=1`}) => {
        return fetchUserEquity(pageParam);
      },
      getNextPageParam: (lastPage, pages) => {
        const maxPageNumber = Math.ceil(lastPage?.data?.count / 10);
        const nextPageNumber = pages.length + 1;
        return nextPageNumber <= maxPageNumber ? `PAID&page=${nextPageNumber}` : undefined;
      },
    });

  const USER_EQUITY = data?.pages?.flatMap(assetsData =>
    assetsData?.data?.results?.map(item => item)
  );

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  // const wrap = document?.getElementById('assetsWrap');

  const scrollToTop = () => {
    const wrap = document?.getElementById('assetsWrap');

    wrap.scrollTop = 0;
  };
  const numberOfAssets =
    data?.pages?.flatMap(assetsData => assetsData?.data?.results?.map(() => 0))?.length ?? 0;

  const handleAnimation = () => {
    const wrap = document?.getElementById('assetsWrap');

    const currentScrollY = wrap?.scrollTop;

    if (currentScrollY > 540 && numberOfAssets > 10) {
      setScrollDirection('up');
    } else {
      setScrollDirection('down');
    }
  };

  const handleScroll = () => {
    const wrap = document?.getElementById('assetsWrap');
    handleAnimation();
    if (!isFetchingNextPage && wrap?.clientHeight + wrap?.scrollTop >= wrap?.scrollHeight) {
      return hasNextPage ? fetchNextPage() : null;
    }
  };

  const readScollToRef1 = useRef();

  const handleMostReadScroll = scrollAmount => {
    const newScrollPosition = scrollPosition1 + scrollAmount;
    setScrollPosition1(newScrollPosition);
    readScollToRef1.current.scrollLeft = newScrollPosition;
  };

  if (data?.code === 'ERR_NETWORK') {
    toast({
      title: `${data?.message}`,
      description: ` please check your network connection`,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  }

  const handleManageAssets = property => {
    property?.type == 'WHOLE' &&
      !property?.payment_plan &&
      !property?.co_owners?.length &&
      router.push(`/asset/outright/${property?.id}?status=${paymentStatus}`);

    property?.type == 'WHOLE' &&
      property?.payment_plan &&
      !property?.co_owners?.length &&
      router.push(`/asset/payment_plan/${property?.id}?status=${paymentStatus}`);

    property?.type == 'WHOLE' &&
      property?.co_owners?.length &&
      router.push(`/asset/co_ownership/${property?.id}?status=${paymentStatus}`);

    property?.type == 'FRACTIONAL' &&
      property?.co_owners?.length > 0 &&
      router.push(`/asset/fractional/${property?.id}?status=${paymentStatus}`);

    property?.type == 'FRACTIONAL' &&
      router.push(`/asset/fractional/${property?.id}?status=${paymentStatus}`);
    onAssetClose();
  };

  const theme = useTheme();
  const primaryColor = theme.colors.primary?.color;

  return (
    <Drawer
      autoFocus={false}
      scrollBehavior="inside"
      isOpen={isAssetOpen}
      onClose={onAssetClose}
      placement={screenWidth >= 768 ? 'left' : `right`}
    >
      <DrawerOverlay />
      <DrawerContent {...drawer_styles}>
        <MobileHeader
          onDrawerClose={onAssetClose}
          activePage="Portfolio"
          onDrawerOpen={onDrawerOpen}
        />

        <Flex {...drawer_title_styles}>
          <Text>Portfolio</Text>
          <CloseIcon cursor="pointer" fontSize={11} onClick={onAssetClose} />
        </Flex>
        {isLoading ? (
          <Center minH={`200px`}>
            <ThreeDots />
          </Center>
        ) : isError ? (
          <ErrorState />
        ) : (
          <Box px={3} my={{base: '10px', md: '15px'}} overflowY={'auto'} onScroll={handleScroll}>
            {USER_EQUITY?.length > 0 ? (
              <>
                <Stack
                  scrollBehavior={'smooth'}
                  className="hide_scroll"
                  ref={readScollToRef1}
                  id="assetsWrap"
                >
                  <Stack spacing="14px" alignItems={'center'}>
                    {(USER_EQUITY || [])?.map((equity, idx) => (
                      <Flex
                        key={idx}
                        w={'full'}
                        maxW={{base: '95%', md: '370px'}}
                        h={{base: '98px', md: '80px'}}
                        onClick={() => handleManageAssets(equity)}
                        cursor="pointer"
                        align={'center'}
                        gap={4}
                        rounded={'2px'}
                        border={'1px solid'}
                        borderColor="custom_color.color_pop"
                        bg={`custom_color.opacity_pop._10`}
                        p={'16px'}
                        transition={`.3s`}
                        _hover={{
                          bg: `custom_color.opacity_pop._20`,
                        }}
                      >
                        <VStack
                          w="full"
                          maxW="80%"
                          divider={<Divider borderColor="custom_color.color_pop" />}
                          align="stretch"
                          spacing={'6px'}
                          px="8px"
                          py="9px"
                        >
                          <Text
                            fontWeight="500"
                            color="text"
                            textTransform="uppercase"
                            letterSpacing="0.14px"
                            // whiteSpace="nowrap"
                          >
                            {equity?.project?.name}
                          </Text>
                          <Text
                            fontSize={{base: 14, md: 12}}
                            fontWeight="500"
                            color="text.3"
                            letterSpacing="0.6px"
                            textTransform="uppercase"
                            // whiteSpace="nowrap"
                          >
                            {equity?.type === 'FRACTIONAL'
                              ? `${
                                  equity?.fractions_distributed - equity?.fractions_left
                                } fraction${
                                  equity?.fractions_distributed - equity?.fractions_left > 1
                                    ? `s`
                                    : ''
                                }`
                              : equity?.unit?.unit_title}
                          </Text>
                        </VStack>
                        <Center color={`custom_color.color_pop`}>
                          <FiArrowUpRight />
                        </Center>
                      </Flex>
                    ))}
                    {isFetchingNextPage && (
                      <Center p={`10px`}>
                        <ThreeDots boxSize={`16px`} />
                      </Center>
                    )}

                    <ScrollToTop shouldScroll={shouldScroll} scrollToTop={scrollToTop} />
                  </Stack>
                </Stack>
              </>
            ) : (
              <EmptyState
                height={{base: '200px', md: '300px'}}
                text={`Looks like you haven't bought anything yet.`}
              />
            )}
          </Box>
        )}
        {screenWidth <= 768 && <Footer />}
      </DrawerContent>
    </Drawer>
  );
};

const ScrollToTop = ({shouldScroll, scrollToTop}) => {
  return (
    <HStack
      justify="center"
      opacity={shouldScroll === 'up' ? 1 : 0}
      visibility={shouldScroll === 'up' ? 'visible' : 'hidden'}
      transition="ease-in-out 0.3s"
      transform={`translateY(${shouldScroll === 'up' ? '0px' : '20px'}) scale(${
        shouldScroll === 'up' ? 1 : 0.8
      })`}
      position="fixed"
      bottom="10"
      right={{base: '3%', md: '10'}}
      align="center"
      p="5px"
      role="button"
      onClick={scrollToTop}
      borderRadius="full"
      bg="rgba(255, 255, 255, 0.6)"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)"
    >
      <Image src={thinArrow.src} boxSize="20px" transform="rotate(-90deg)" alt="right arrow" />
    </HStack>
  );
};
