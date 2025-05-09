import {Box} from '@chakra-ui/react';
import React from 'react';

const CancelForToast = ({...rest}) => {
  return (
    <Box h="12px" w="12px" {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M11 1.00004L1 11M0.999958 1L10.9999 11"
          stroke="#979FA9"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </Box>
  );
};

export default CancelForToast;
