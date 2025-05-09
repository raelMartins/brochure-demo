import { Box } from "@chakra-ui/react";
import React from "react";

const UploadDocIcon = ({ fillColor = "#FA6400", ...rest }) => {
  return (
    <Box w="12px" h="13px" {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 12 13"
        fill="none"
      >
        <g clipPath="url(#clip0_565_29)">
          <path
            d="M4 8.5L6 6.5M6 6.5L8 8.5M6 6.5V11M10 8.87142C10.6108 8.36702 11 7.60397 11 6.75C11 5.23122 9.76878 4 8.25 4C8.14074 4 8.03853 3.943 7.98306 3.84887C7.33103 2.74242 6.12722 2 4.75 2C2.67893 2 1 3.67893 1 5.75C1 6.78305 1.41772 7.71854 2.09347 8.39677"
            stroke={fillColor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_565_29">
            <rect
              width="12"
              height="12"
              fill="white"
              transform="translate(0 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};

export default UploadDocIcon;
