import React from 'react';
import {Stack, Center} from '@chakra-ui/react';

export const Radio = ({isActive, onClick, children, space_between = `8px`, ...rest}) => {
  return (
    <Stack gap={space_between || '8px'} direction="row">
      <Center
        h={'20px'}
        w={'20px'}
        minW={'20px'}
        onClick={onClick}
        border={'2px solid'}
        borderColor={isActive ? 'custom_color.color_pop' : 'border.1'}
        borderRadius={'50%'}
        bg={`transparent`}
        cursor={`pointer`}
        color={`custom_color.color_pop`}
        transition={`.3s`}
        {...rest}
      >
        <Center
          h={`10px`}
          width={`10px`}
          minW={`10px`}
          borderRadius={`50%`}
          bg={isActive ? `custom_color.color_pop` : `transparent`}
        />
      </Center>
      {children}
    </Stack>
  );
};
