import {Flex, Box, HStack, Image, useDisclosure, Center} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {storeDetails} from '@/api/auth';
import {Notification} from '../notification_drawer';
import ProfileMenu from './profile_menu';
import {ReportBug} from '../drawers/report_bug/index';
import {SuggestIdea} from '../drawers/suggest_idea/index';
import {HamburgerIcon} from '@chakra-ui/icons';
import MobileDrawer from './mobile_drawer';
import {WalletDrawer} from '../drawers/wallet';
import {Portfolio} from '../drawers/portfolio';
import {WatchList} from '../drawers/watchlist/Watchlist';
import {GeneralFeedback} from '../drawers/feedback_drawer/GeneralFeedback';
import Link from 'next/link';
import useGetSession from '@/utils/hooks/getSession';

export const Navbar = () => {
  const STOREINFO = useQuery(['storeInfo'], storeDetails);

  const store_data = STOREINFO?.data?.data?.data;
  const {sessionData: LoggedinUser, fetching} = useGetSession('loggedIn');

  const userDetails = LoggedinUser;
  const fullName = userDetails ? `${userDetails?.first_name} ${userDetails?.last_name}` : '';
  const avatar = userDetails?.avatar;
  const {isOpen, onOpen, onClose} = useDisclosure();
  const TERMS = store_data?.customer_document;
  const PRIVACY_POLICY = store_data?.customer_privacy_policy;

  const reportBugModal = useDisclosure();
  const suggestModal = useDisclosure();
  const walletModal = useDisclosure();
  const {isOpen: isAssetOpen, onOpen: onAssetOpen, onClose: onAssetClose} = useDisclosure();
  const {isOpen: isWatchOpen, onOpen: onWatchOpen, onClose: onWatchClose} = useDisclosure();
  const {isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose} = useDisclosure();
  const {isOpen: isFeedOpen, onOpen: onFeedOpen, onClose: onFeedClose} = useDisclosure();

  return (
    <>
      <HStack
        borderBottom="1px solid"
        borderColor={`matador_border_color.100`}
        align="center"
        justify="space-between"
        p="16px"
        mx={{lg: '26px'}}
      >
        <Center as={Link} href={LoggedinUser ? '/properties' : '/'}>
          <HStack gap={'20px'}>
            <Center
              w={`auto`}
              maxW={{base: `100px`, md: '150px'}}
              h={{base: `50px`, md: '75px'}}
              position={`relative`}
              overflow={`hidden`}
            >
              {store_data?.company_image && (
                <Image
                  src={store_data?.company_image}
                  alt={'Company Image'}
                  fill
                  style={{objectFit: `contain`, height: `100%`}}
                />
              )}
            </Center>
          </HStack>
        </Center>
        <Flex gap={4} align="center">
          {fetching ? (
            <></>
          ) : userDetails ? (
            <>
              <Notification
                onOpen={onOpen}
                isNotOpen={isOpen}
                onNotClose={onClose}
                onDrawerOpen={onDrawerOpen}
              />

              <Box w="full" display={{base: 'none', md: 'flex'}}>
                <ProfileMenu
                  reportBugModal={reportBugModal}
                  suggestModal={suggestModal}
                  TERMS={TERMS}
                  PRIVACY_POLICY={PRIVACY_POLICY}
                  avatar={avatar}
                  fullName={fullName}
                  userDetails={userDetails}
                />
              </Box>
            </>
          ) : (
            <></>
          )}
          <HamburgerIcon
            onClick={onDrawerOpen}
            display={{base: 'block', md: 'none'}}
            fontSize={'30px'}
          />
        </Flex>
      </HStack>
      <ReportBug reportBugModal={reportBugModal} onDrawerOpen={onDrawerOpen} />
      <SuggestIdea suggestModal={suggestModal} onDrawerOpen={onDrawerOpen} />
      <WalletDrawer WALLET_DRAWER_TOGGLE={walletModal} onDrawerOpen={onDrawerOpen} />
      <Portfolio isAssetOpen={isAssetOpen} onAssetClose={onAssetClose} />
      <WatchList
        isWatchOpen={isWatchOpen}
        onWatchClose={onWatchClose}
        onDrawerOpen={onDrawerOpen}
      />
      <GeneralFeedback
        isFeedOpen={isFeedOpen}
        onFeedClose={onFeedClose}
        onDrawerOpen={onDrawerOpen}
      />
      <MobileDrawer
        fullName={fullName}
        userDetails={userDetails}
        TERMS={TERMS}
        PRIVACY_POLICY={PRIVACY_POLICY}
        reportBugModal={reportBugModal}
        suggestModal={suggestModal}
        avatar={avatar}
        walletModal={walletModal}
        isDrawerOpen={isDrawerOpen}
        onAssetOpen={onAssetOpen}
        onWatchOpen={onWatchOpen}
        onDrawerClose={onDrawerClose}
        onDrawerOpen={onDrawerOpen}
        onFeedOpen={onFeedOpen}
      />
    </>
  );
};
