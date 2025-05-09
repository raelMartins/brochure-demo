import {Box, useTheme} from '@chakra-ui/react';
import React from 'react';

const ExploreArrow = ({color, boxSize = {base: `16px`, lg: `24px`}, ...rest}) => {
  const theme = useTheme();
  const primaryColor = color || theme?.colors?.custom_color?.color_pop;
  return (
    <Box boxSize={boxSize} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 25 24"
        fill="none"
      >
        <path
          d="M17.484 6.86378C17.1154 5.9773 16.2385 5.44263 15.2393 5.4952L6.84118 5.93616L6.76281 7.42687L17.484 6.86378Z"
          fill={primaryColor}
        />
        <path
          d="M17.4846 6.86457C18.371 7.23311 18.9058 8.10948 18.8532 9.10873L18.4169 17.4069L16.9263 17.4853L17.4846 6.86457Z"
          fill={primaryColor}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.40234 16.9375L16.9793 6.36059L17.9395 7.32081L7.36256 17.8977L6.40234 16.9375Z"
          fill={primaryColor}
        />
      </svg>
    </Box>
  );
};

export default ExploreArrow;
