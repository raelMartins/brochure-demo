import React from 'react';
import {Flex, Image, Text} from '@chakra-ui/react';
import backArrow from '@/images/icons/backArrow.svg';
import menuIcon from '@/images/icons/menuIcon.svg';
import {ArrowBackIcon, HamburgerIcon} from '@chakra-ui/icons';

export const MobileHeader = ({activePage, onDrawerOpen, onDrawerClose, ...rest}) => {
  return (
    <Flex
      display={{base: 'flex', md: 'none'}}
      w="full"
      bg={'matador_background.200'}
      justify={'space-between'}
      align={'center'}
      p="20px"
      borderBottom="1px solid"
      borderBottomColor="matador_border_color.100 !important"
      color="text"
      {...rest}
    >
      <Flex align={'center'} gap="8px" justify={'center'}>
        <ArrowBackIcon fontSize={`24px`} cursor={`pointer`} onClick={onDrawerClose} />
        <Text
          color="text"
          textTransform="uppercase"
          letterSpacing="0.16px"
          fontSize={'16px'}
          fontWeight={500}
        >
          {activePage}
        </Text>
      </Flex>
      {/* <HamburgerIcon onClick={onDrawerOpen} fontSize={'24px'} cursor={`pointer`} /> */}
    </Flex>
  );
};

export default MobileHeader;
