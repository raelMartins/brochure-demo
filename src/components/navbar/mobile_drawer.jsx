import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Image,
  Flex,
  Text,
  Box,
  VStack,
  Icon,
  Stack,
  StackDivider,
  DrawerCloseButton,
  Center,
} from '@chakra-ui/react';
import {PiMagnifyingGlassFill} from 'react-icons/pi';
import {useRouter} from 'next/navigation';
import {ExternalOpen} from '../assets/ExternalOpen';
import templateUserIcon from '@/images/user-icon.svg';
import {CloseIcon} from '@chakra-ui/icons';
import {BsWhatsapp} from 'react-icons/bs';
import {deleteCookies} from '@/ui-lib/ui-lib.hooks/sessionmanagers';
import {Button, ExternalLink} from '@/ui-lib';
import {drawer_styles} from '../drawers/styles';
import {PaymentAccess} from '../payment_flow/PaymentAccess';

export const MobileDrawer = ({
  feedBackModal,
  reportBugModal,
  suggestModal,
  onNotOpen,
  onAssetOpen,
  onWatchOpen,
  walletModal,
  isDrawerOpen,
  onFeedOpen,
  onDrawerClose,
  avatar,
  TERMS,
  PRIVACY_POLICY,
  fullName,
  userDetails,
}) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('LoggedinUser');
    deleteCookies(['token', 'loggedIn']);
    window.location.reload();
  };

  const auth_data = [
    {
      key: 'myAssets',
      title: 'Portfolio',
      onClick: () => {
        onDrawerClose();
        onAssetOpen();
      },
    },
    {
      key: 'wallet',
      title: 'Wallet',
      onClick: () => {
        onDrawerClose();
        walletModal.onOpen();
      },
    },
    {
      key: 'feedback',
      title: 'Feedback',
      onClick: () => {
        onDrawerClose();
        onFeedOpen();
      },
    },
    {
      key: 'watchlist',
      title: 'My watchlist',
      onClick: () => {
        onDrawerClose();
        onWatchOpen();
      },
    },
  ];

  const dropdown_data = [
    {
      key: 'suggest',
      title: 'Suggest an idea',
      onClick: () => {
        onDrawerClose();
        suggestModal.onOpen();
      },
    },
    {
      key: 'report',
      title: 'Report a bug',
      onClick: () => {
        onDrawerClose();
        reportBugModal.onOpen();
      },
    },
    {
      key: 'terms',
      title: 'Terms of Service',
      icon: <ExternalOpen />,
      onClick: () => window.open(`${TERMS ? TERMS : ''}`, '_blank'),
    },
    {
      key: 'terms',
      title: 'Privacy Policy',
      icon: <ExternalOpen />,
      onClick: () => window.open(`${PRIVACY_POLICY ? PRIVACY_POLICY : ''}`, '_blank'),
    },
    {
      key: 'logOut',
      title: 'Log Out',
      color: '#F04438',
      onClick: handleLogout,
    },
  ];

  return (
    <Drawer
      placement="right"
      isCentered={false}
      scrollBehavior="inside"
      isOpen={isDrawerOpen}
      onClose={onDrawerClose}
      autoFocus={false}
    >
      <DrawerOverlay />
      <DrawerContent {...drawer_styles} maxW="300px">
        <DrawerCloseButton />
        <Stack
          py={`77px`}
          w="full"
          h="full"
          gap={`24px`}
          divider={
            <StackDivider
              borderColor={`matador_border_color.100 !important`}
              margin={`0px !important`}
            />
          }
        >
          <Center flexDirection={'column'} gap={'7px'} p="0px 10px" w="full" textAlign={`center`}>
            <Image
              src={avatar ?? templateUserIcon.src}
              rounded="full"
              boxSize="56px"
              alt="user icon"
            />
            <Stack gap={`4px`}>
              <Text fontWeight={500} fontSize={'16px'} lineHeight={`130%`} letterSpacing={`0%`}>
                {fullName}
              </Text>
              <Text
                fontWeight={400}
                fontSize={'14px'}
                lineHeight={`140%`}
                letterSpacing={`1%`}
                color={`matador_text.500`}
              >
                {userDetails?.email}
              </Text>
            </Stack>
            <ExternalLink
              text={`View Profile`}
              iconSize={`18px`}
              onClick={() => router.push('/settings')}
              textTransform={`capitalize`}
              fontWeight={`400`}
              letterSpacing={`0.01em`}
              textAlign={`left`}
              fontSize={`14px`}
              lineHeight={`140%`}
            />
          </Center>

          <VStack px="16px" align={'stretch'} gap="32px">
            {auth_data.map(item => (
              <PaymentAccess
                key={item.key}
                checkWallet={item.title?.toLowerCase()?.includes(`wallet`)}
                content={
                  <Text
                    color="text"
                    fontSize={'16px'}
                    fontWeight={500}
                    cursor={'pointer'}
                    onClick={item.onClick}
                  >
                    {item.title}
                  </Text>
                }
              />
            ))}
          </VStack>

          <VStack px="16px" align={'stretch'} gap="32px">
            {dropdown_data.map(item => (
              <Flex key={item.key} align={'center'} w="full" justify={'space-between'}>
                <Text
                  color={item.color || 'matador_text.500'}
                  fontSize={'14px'}
                  fontWeight={400}
                  cursor={'pointer'}
                  key={item.key}
                  onClick={item.onClick}
                >
                  {item.title}
                </Text>
                {item.icon || null}
              </Flex>
            ))}
          </VStack>
        </Stack>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;
