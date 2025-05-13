import {Box, Center, Stack, Tooltip, useDisclosure} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {Portfolio} from '../drawers/portfolio';
import {
  ContactSupportIcon,
  FeedbackIcon,
  PortfolioIcon,
  WalletIcon,
  WatchlistIcon,
} from '../assets/SideBarIcons';
import {icon_tooltip_style} from '../page-components/listings/PropertySidebar';
import {WatchList} from '../drawers/watchlist/Watchlist';
import {GeneralFeedback} from '../drawers/feedback_drawer/GeneralFeedback';
import {WalletDrawer} from '../drawers/wallet';
import {formatToHttps} from '@/utils/formatUrl';
import {TbLayoutGridFilled} from 'react-icons/tb';
import {IoCloseCircle} from 'react-icons/io5';
import {useQuery} from 'react-query';
import {storeDetails} from '@/api/auth';
import {useState} from 'react';
import {PaymentAccess} from '../payment_flow/PaymentAccess';

export const LayoutSidebar = () => {
  const menuDisclosure = useDisclosure();
  const WALLET_DRAWER_TOGGLE = useDisclosure();
  const {isOpen: isAssetOpen, onOpen: onAssetOpen, onClose: onAssetClose} = useDisclosure();
  const {isOpen: isWatchOpen, onOpen: onWatchOpen, onClose: onWatchClose} = useDisclosure();
  const {isOpen: isFeedOpen, onOpen: onFeedOpen, onClose: onFeedClose} = useDisclosure();
  const [showMenu, setShowMenu] = useState(false);

  const STOREINFO = useQuery(['storeInfo'], storeDetails);
  const store_data = STOREINFO.data?.data?.data;

  const WHATSAPP_URL = store_data?.whatsapp_url;

  const open_whatsapp = () => {
    if (WHATSAPP_URL) {
      return window.open(`${formatToHttps(WHATSAPP_URL)}`);
    }
  };

  const menuVariants = {
    closed: {y: 0},
    open: {y: 50},
  };

  const navItems = [
    {
      key: 'wallet',
      name: 'Wallet',
      icon: <WalletIcon />,
      onClick: WALLET_DRAWER_TOGGLE.onOpen,
    },
    {
      key: 'portfolio',
      name: 'Portfolio',
      icon: <PortfolioIcon />,
      onClick: () => onAssetOpen(),
    },
    {
      key: 'watchlist',
      name: 'Watchlist',
      icon: <WatchlistIcon />,
      onClick: () => onWatchOpen(),
    },
    {
      key: 'feedback',
      name: 'Feedback',
      icon: <FeedbackIcon />,
      onClick: () => onFeedOpen(),
    },
    {
      key: 'support',
      name: 'Contact Support',
      icon: <ContactSupportIcon />,
      onClick: open_whatsapp,
    },
  ];

  return (
    <Center
      gap="64px"
      flexDirection={`column`}
      minW="75px"
      onMouseOver={() => setShowMenu(true)}
      onMouseOut={() => setShowMenu(false)}
      display={{base: 'none', md: 'flex'}}
    >
      <Stack
        gap="64px"
        transition={`.3s`}
        h={`100%`}
        maxH={showMenu ? `500px` : `0px`}
        overflow={`hidden`}
      >
        {navItems.map(item => {
          return (
            <PaymentAccess
              key={item?.key}
              checkWallet={item?.name?.toLowerCase()?.includes(`wallet`)}
              content={
                <Tooltip key={item?.key} label={item?.name} placement="top" sx={icon_tooltip_style}>
                  <Box as="span" onClick={item?.onClick}>
                    <Center
                      overflow={`hidden`}
                      borderRadius={`50%`}
                      as={Center}
                      boxSize="48px"
                      border={`1px solid`}
                      borderColor={`custom_color.opacity_pop._20`}
                      cursor={`pointer`}
                      bg={`custom_color.opacity_pop._10`}
                    >
                      {item?.icon}
                    </Center>
                  </Box>
                </Tooltip>
              }
            />
          );
        })}
      </Stack>
      <Tooltip label={showMenu ? 'Close' : 'Menu'} placement="top" sx={icon_tooltip_style}>
        <Center fontSize={`32px`} color={`custom_color.color_pop`}>
          {showMenu ? (
            <Center onClick={() => setShowMenu(false)}>
              <IoCloseCircle fontSize={`52px`} />
            </Center>
          ) : (
            <TbLayoutGridFilled />
          )}
        </Center>
      </Tooltip>
      <Portfolio onAssetClose={onAssetClose} isAssetOpen={isAssetOpen} />
      <WalletDrawer WALLET_DRAWER_TOGGLE={WALLET_DRAWER_TOGGLE} />
      <WatchList isWatchOpen={isWatchOpen} onWatchClose={onWatchClose} />
      <GeneralFeedback isFeedOpen={isFeedOpen} onFeedClose={onFeedClose} />
    </Center>
  );
};
