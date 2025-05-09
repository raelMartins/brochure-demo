import {Box, useTheme} from '@chakra-ui/react';
import React from 'react';

const AuthTermsCheck = ({...rest}) => {
  const theme = useTheme();
  const color = theme?.colors?.custom_color?.color;
  const contrast = theme?.colors?.custom_color?.contrast;
  return (
    <Box h="21.482px" w="21.482px" {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect x="0.5" y="0.5" width="23" height="23" rx="7.5" fill={color} stroke={color} />
        <path
          d="M6 12L10.0016 16L18.0017 8"
          stroke={contrast}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};

export default AuthTermsCheck;
