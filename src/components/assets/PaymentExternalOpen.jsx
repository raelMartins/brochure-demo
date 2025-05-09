import {useTheme} from '@chakra-ui/react';

export const PaymentExternalOpen = () => {
  const theme = useTheme();
  const primaryColor = theme?.colors?.custom_color?.color_pop;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path
        d="M17.1856 7.50246C16.8171 6.61598 15.9402 6.0813 14.941 6.13387L6.54285 6.57483L6.46447 8.06555L17.1856 7.50246Z"
        fill={primaryColor}
      />
      <path
        d="M17.1862 7.50227C18.0727 7.87081 18.6074 8.74718 18.5548 9.74642L18.1186 18.0446L16.6279 18.123L17.1862 7.50227Z"
        fill={primaryColor}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.104 17.5762L16.6809 6.99926L17.6411 7.95948L7.06422 18.5364L6.104 17.5762Z"
        fill={primaryColor}
      />
    </svg>
  );
};
