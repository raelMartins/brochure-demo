import { Box } from "@chakra-ui/react";
import React from "react";

const DefaultProfileImage = ({ fillColor = "#F77925", ...rest }) => {
  return (
    <Box w="101px" h="100px" {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 101 100"
        fill="none"
      >
        <rect
          x="0.666016"
          y="0.166992"
          width="99.4083"
          height="99.4083"
          rx="49.7041"
          fill="#F3F3F3"
        />
        <path
          d="M80.498 68.8327C65.498 91.3327 30.998 87.3327 21.998 68.8327C25.998 49.8331 71.498 49.332 80.498 68.8327Z"
          fill={fillColor}
        />
        <circle cx="50.998" cy="29.333" r="15.5" fill={fillColor} />
      </svg>
    </Box>
  );
};

export default DefaultProfileImage;
