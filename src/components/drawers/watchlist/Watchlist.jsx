import {useEffect, useState} from 'react';
import {
  VStack,
  Text,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Center,
  useDisclosure,
  Divider,
  Spinner,
  Flex,
  Box,
  Stack,
} from '@chakra-ui/react';
import {IoMdClose} from 'react-icons/io';
import {useQuery} from 'react-query';
import {fetchWatchlist} from '@/api/watchlist';
import {useRouter} from 'next/navigation';
import {formatToCurrency} from '@/utils/formatAmount';
import ErrorState from '@/components/appState/error-state';
import EmptyState from '@/components/appState/empty-state';
import MobileHeader from '@/components/navbar/mobile_header';
import {drawer_styles, drawer_title_styles} from '../styles';
import ThreeDots from '@/components/loaders/ThreeDots';

export const WatchList = ({isWatchOpen, onDrawerOpen, onWatchClose}) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const disclosure = useDisclosure();
  const watchlist_data = useQuery(
    ['watchlist_data', isWatchOpen, disclosure.isOpen],
    fetchWatchlist
  );
  const watchlist = watchlist_data?.data?.data?.watchlist;
  const router = useRouter();
  const handleManageListing = item => {
    router.push(`/listing/${item?.project?.id}`);
  };
  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  return (
    <Drawer
      autoFocus={false}
      onClose={onWatchClose}
      isOpen={isWatchOpen}
      placement={screenWidth >= 768 ? 'left' : `right`}
    >
      <DrawerOverlay />
      <DrawerContent {...drawer_styles}>
        <MobileHeader
          onDrawerClose={onWatchClose}
          activePage="Watchlist"
          onDrawerOpen={onDrawerOpen}
        />
        <HStack {...drawer_title_styles}>
          <Text
            color="text.1"
            fontSize={{base: `16px`, lg: '20px'}}
            fontWeight={`500`}
            textTransform={`uppercase`}
            letterSpacing={`-0.2px`}
            lineHeight={{base: `24px`}}
            fontFamily={'Montserrat'}
          >
            Watchlist
          </Text>
          <Center
            onClick={() => {
              disclosure.onClose();
              onWatchClose();
            }}
            cursor={`pointer`}
            fontSize={`20px`}
          >
            <IoMdClose />
          </Center>
        </HStack>
        <VStack align={'stretch'} gap={{base: '12px'}} p={{base: `16px`}}>
          {watchlist_data?.isLoading ? (
            <Center minH={`200px`}>
              <ThreeDots />
            </Center>
          ) : watchlist_data?.isError ? (
            <ErrorState />
          ) : !watchlist || watchlist?.length === 0 ? (
            <EmptyState height={{base: '200px', md: '300px'}} text={`No projects in watchlist`} />
          ) : (
            watchlist?.map((equity, idx) => (
              <Box
                key={idx}
                onClick={() => handleManageListing(equity)}
                border={`.6px solid`}
                borderColor={`custom_color.color_pop`}
                color={`custom_color.color_pop`}
                bg={`custom_color.opacity_pop._10`}
                borderRadius={'0px'}
                transition={`.3s`}
                _hover={{
                  bg: `custom_color.opacity_pop._20`,
                }}
              >
                <Flex>
                  <Stack
                    gap={'8px'}
                    cursor="pointer"
                    color={'text.1'}
                    // borderColor={lightenHex(80)}
                    w="full"
                    p={`14px`}
                    justify={'space-between'}
                    alignItems={`flex-start`}
                    divider={
                      <Divider
                        width={`60%`}
                        borderColor={`custom_color.color_pop`}
                        m={`0px !important`}
                      />
                    }
                  >
                    <Text
                      fontSize={'14px'}
                      fontWeight={500}
                      textAlign={`left`}
                      textTransform={`uppercase`}
                      letterSpacing={`0.01em`}
                      lineHeight={`19.6px`}
                    >
                      {equity?.project?.name}
                    </Text>
                    <Text
                      color="text.4"
                      fontSize={'10px'}
                      fontWeight={500}
                      textAlign={`left`}
                      letterSpacing={`6%`}
                      lineHeight={`16px`}
                    >
                      {equity?.project?.starting_from
                        ? `Price from ${formatToCurrency(equity?.project?.starting_from)}`
                        : 'Contact for Price'}
                    </Text>
                  </Stack>
                </Flex>
              </Box>
            ))
          )}
        </VStack>{' '}
      </DrawerContent>
    </Drawer>
  );
};
