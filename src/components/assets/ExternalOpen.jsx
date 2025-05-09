import {useTheme} from '@chakra-ui/react';

export const ExternalOpen = () => {
  const theme = useTheme();
  const primaryColor = theme?.colors?.custom_color?.color_pop;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <g clip-path="url(#clip0_1167_1545)">
        <path
          d="M17.3673 0.700195V14.7334H14.1289V17.9718H0.0957031V3.93862H3.33413V0.700195H17.3673ZM16.2878 13.6539V1.77967H4.41361V3.93862H6.57256V5.0181H1.17518V16.8923H13.0494V11.495H14.1289V13.6539H16.2878ZM8.03154 10.795L7.27253 10.036L12.282 5.0181H8.73151V3.93862H14.1289V9.33601H13.0494V5.78554L8.03154 10.795Z"
          fill={primaryColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_1167_1545">
          <rect
            width="17.2716"
            height="17.2716"
            fill="white"
            transform="translate(0.0957031 0.699707)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
