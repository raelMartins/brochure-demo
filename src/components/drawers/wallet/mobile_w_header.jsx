import React from 'react';
import {Flex, Text, HStack, Image, Icon} from '@chakra-ui/react';
import {IoIosArrowBack} from 'react-icons/io';
import backArrow from '@/images/icons/backArrow.svg';
import menuIcon from '@/images/icons/menuIcon.svg';
import {BiMenu} from 'react-icons/bi';
import {ArrowBackIcon, HamburgerIcon} from '@chakra-ui/icons';

export const MobileWalletHeader = ({
  step,
  setPage,
  setStep,
  activePage,
  onDrawerOpen,
  onDrawerClose,
}) => {
  let page = '';

  switch (activePage) {
    case 'withdrawal':
      page = 'Withdrawal';
      break;
    case 'deposit':
      page = 'Make a deposit';
      if (step === 'card') {
        page = 'Deposit with card';
      }
      break;
    case 'wallet':
    default:
      page = 'Wallet';
  }

  const handleBack = () => {
    switch (activePage) {
      case 'withdrawal':
        return setPage('wallet');
      case 'deposit':
        if (step !== 'method') return setStep('method');
        else return setPage('wallet');
      case 'wallet':
      default:
        return onDrawerClose();
    }
  };

  return (
    <Flex
      justify={'space-between'}
      display={{base: 'flex', lg: 'none'}}
      align={'center'}
      p="16px"
      borderBottom="1px solid"
      borderColor="matador_border_color.100"
    >
      <HStack spacing="16px" onClick={handleBack} cursor="pointer">
        <ArrowBackIcon fontSize={`24px`} cursor={`pointer`} />
        <Text textTransform="uppercase" fontSize={'20px'} fontWeight={500} color="text">
          {page}
        </Text>
      </HStack>
      <HamburgerIcon onClick={onDrawerOpen} fontSize={'24px'} />
    </Flex>
  );
};

export default MobileWalletHeader;
