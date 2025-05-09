'use client';
import React from 'react';
import {Box} from '@chakra-ui/react';

const LeftAngledArrow = ({baseColor = '#191919', ...rest}) => {
  return (
    <Box w="24px" h="25px" {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M15 18.1113L9 12.1113L15 6.11133"
          stroke={baseColor}
          stroke-width="2.004"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Box>
  );
};

export default LeftAngledArrow;
