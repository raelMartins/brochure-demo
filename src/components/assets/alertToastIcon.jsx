import {Box} from '@chakra-ui/react';
import React from 'react';

const AlertToastIcon = ({...rest}) => {
  return (
    <Box h="24px" w="24px" {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect width="24" height="24" rx="6" fill="#F04438" />
        <path
          d="M15 9.00002L9 15M8.99997 9L14.9999 15"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </Box>
  );
};

export default AlertToastIcon;
