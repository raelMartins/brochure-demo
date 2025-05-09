import {Box, useTheme} from '@chakra-ui/react';

const PendingTransactionsIcon = ({isOpen, cancelFillColor = '#D92D20', ...rest}) => {
  const theme = useTheme();
  const primaryColor = theme?.colors?.custom_color?.color_pop;
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.66699 28.0013C6.66699 16.2192 16.2183 6.66797 28.0003 6.66797C39.7824 6.66797 49.3337 16.2192 49.3337 28.0013C49.3337 39.7834 39.7824 49.3346 28.0003 49.3346C16.2183 49.3346 6.66699 39.7834 6.66699 28.0013Z"
        fill={primaryColor}
        fill-opacity="0.1"
      />
      <path
        d="M27.67 19C22.89 19 19 22.89 19 27.67C19 32.45 22.89 36.35 27.67 36.35C32.45 36.35 36.34 32.46 36.34 27.68C36.34 22.9 32.45 19 27.67 19ZM28.42 27.35C28.42 27.76 28.08 28.1 27.67 28.1C27.26 28.1 26.92 27.76 26.92 27.35V22.35C26.92 21.94 27.26 21.6 27.67 21.6C28.08 21.6 28.42 21.94 28.42 22.35V27.35Z"
        fill={primaryColor}
      />
      <path
        d="M30.8901 19.45H25.1101C24.7101 19.45 24.3901 19.13 24.3901 18.73C24.3901 18.33 24.7101 18 25.1101 18H30.8901C31.2901 18 31.6101 18.32 31.6101 18.72C31.6101 19.12 31.2901 19.45 30.8901 19.45Z"
        fill={primaryColor}
      />
    </svg>
  );
};

export default PendingTransactionsIcon;
