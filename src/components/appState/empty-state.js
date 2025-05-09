import {Image, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import empty from '../../images/icons/empty-icon.svg';
const EmptyState = ({text, height, heading, noHeader, icon, ...rest}) => {
  return (
    <VStack
      h={height || {base: '300px', md: '450px'}}
      borderRadius="5px"
      w="full"
      justify="center"
      my={{base: '10px', md: '13px'}}
      mb={{base: '18px', md: '24px'}}
      {...rest}
    >
      {icon || (
        <Image
          w="auto"
          h={{base: '30px', md: '50px'}}
          src={empty.src}
          alt="notification empty state"
        />
      )}
      <Text
        mt="10px"
        fontWeight="600"
        fontSize={{base: '16px', md: '20px'}}
        textAlign="center"
        color="text"
        className="heading_text"
        textTransform="uppercase"
        {...rest.headerStyle}
      >
        {!noHeader && (heading || 'Nothing Found')}
      </Text>
      <Text
        fontWeight="400"
        color="text"
        fontSize={rest.textSize || {base: '12px', md: '16px'}}
        textAlign="center"
        {...rest.textStyle}
      >
        {text || 'No data yet'}
      </Text>
    </VStack>
  );
};

export default EmptyState;
