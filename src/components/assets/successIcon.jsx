import {Box} from '@chakra-ui/react';
import React from 'react';

const ErrorIcon = ({fillColor = '#FA6400', ...rest}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#48CA93" />
      <path
        d="M8.5 12.5L10.5 14.5L15.5 9.5"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ErrorIcon;
