import { Box } from "@chakra-ui/react";

const StateOfPswrdIcon = ({ isOpen, cancelFillColor = "#D92D20", ...rest }) => {
  return (
    <Box w="17px" h="17px" {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 17 17"
        fill="none"
      >
        {isOpen ? null : (
          <path
            d="M5.17188 12.1625L8.66721 8.66721L12.1625 12.1625M12.1625 5.17188L8.66654 8.66721L5.17188 5.17188"
            stroke={cancelFillColor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {isOpen ? (
          <path
            d="M14.6667 5.33355L6.66667 13.3336L3 9.66689L3.94 8.72689L6.66667 11.4469L13.7267 4.39355L14.6667 5.33355Z"
            fill="#12B76A"
          />
        ) : null}
      </svg>
    </Box>
  );
};

export default StateOfPswrdIcon;
