import {Box, useTheme} from '@chakra-ui/react';

export const ValidateAlertIcon = ({...rest}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.custom_color?.color_pop;

  return (
    <Box {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M9.99817 7.50019V10.8335M9.99817 14.1669H10.0065M8.84427 3.24329L1.99019 15.0821C1.61002 15.7388 1.41994 16.0671 1.44803 16.3366C1.47254 16.5716 1.59568 16.7852 1.78681 16.9242C2.00594 17.0835 2.38533 17.0835 3.1441 17.0835H16.8522C17.611 17.0835 17.9904 17.0835 18.2095 16.9242C18.4007 16.7852 18.5238 16.5716 18.5483 16.3366C18.5764 16.0671 18.3863 15.7388 18.0061 15.0821L11.1521 3.24329C10.7733 2.58899 10.5839 2.26184 10.3368 2.15196C10.1212 2.05612 9.87513 2.05612 9.65959 2.15196C9.41248 2.26184 9.22307 2.58899 8.84427 3.24329Z"
          stroke={primaryColor}
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Box>
  );
};
export const CustomExternalLinkIcon = ({...rest}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.custom_color?.color_pop;

  return (
    <Box {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
      >
        <path
          d="M15.9192 6.94111C15.5778 6.12009 14.7657 5.6249 13.8402 5.67359L6.0623 6.08198L5.98972 7.46262L15.9192 6.94111Z"
          fill={rest.color || primaryColor}
        />
        <path
          d="M15.9197 6.94042C16.7407 7.28175 17.2359 8.0934 17.1873 9.01886L16.7832 16.7043L15.4026 16.7769L15.9197 6.94042Z"
          fill={rest.color || primaryColor}
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.58887 16.4199L15.3847 6.62408L16.274 7.51338L6.47817 17.3092L5.58887 16.4199Z"
          fill={rest.color || primaryColor}
        />
      </svg>
    </Box>
  );
};
export const CollapseIcon = ({...rest}) => {
  const theme = useTheme();
  const primaryColor = theme.colors?.custom_color?.color_pop;

  return (
    <Box {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
      >
        <path
          d="M26.6663 27.1009L19.9997 20.4342M19.9997 20.4342V25.7676M19.9997 20.4342H25.333M5.33301 27.1009L11.9997 20.4342M11.9997 20.4342V25.7676M11.9997 20.4342H6.66634M26.6663 5.76758L19.9997 12.4342M19.9997 12.4342V7.10091M19.9997 12.4342H25.333M5.33301 5.76758L11.9997 12.4342M11.9997 12.4342V7.10091M11.9997 12.4342H6.66634"
          stroke={primaryColor}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Box>
  );
};
