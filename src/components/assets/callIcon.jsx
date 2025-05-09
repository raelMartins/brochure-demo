import {Box} from '@chakra-ui/react';
import React from 'react';

export const CallIcon = ({baseColor = '#FA6400', ...rest}) => {
  return (
    <Box w="13px" h="12px" {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 13 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Call">
          <path
            id="Stroke 1"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.2275 6.4725C8.55447 8.79882 9.08235 6.10753 10.5639 7.58808C11.9923 9.01605 12.8133 9.30214 11.0035 11.1114C10.7769 11.2935 9.33659 13.4853 4.275 8.42508C-0.787211 3.36427 1.40324 1.92253 1.58547 1.69591C3.39957 -0.118317 3.68074 0.707413 5.1091 2.13538C6.5907 3.61656 3.90053 4.14618 6.2275 6.4725Z"
            fill={baseColor}
          />
        </g>
      </svg>
    </Box>
  );
};
