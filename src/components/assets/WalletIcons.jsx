import {Box, Tooltip, useTheme} from '@chakra-ui/react';
import {icon_tooltip_style} from '../page-components/listings/PropertySidebar';

export const DepositIcon = ({height = `20px`, width = `20px`, ...rest}) => {
  const theme = useTheme();
  const primaryColor = theme?.colors?.custom_color.color_pop;

  return (
    <Tooltip label={'Deposit'} placement="top" {...icon_tooltip_style}>
      <Box cursor={'pointer'} height={height} width={width} {...rest}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="24" r="24" fill={primaryColor} fill-opacity="0.05" />
          <circle
            cx="24"
            cy="24"
            r="23.6571"
            stroke={primaryColor}
            stroke-opacity="0.2"
            stroke-width="0.685714"
          />
          <path
            d="M26.6832 19.458H18.8165C18.5832 19.458 18.3665 19.4663 18.1665 19.4747C16.1915 19.5913 15.6665 20.3163 15.6665 22.5663V23.0497C15.6665 23.508 16.0415 23.883 16.4998 23.883H28.9998C29.4582 23.883 29.8332 23.508 29.8332 23.0497V22.5663C29.8332 20.083 29.1998 19.458 26.6832 19.458Z"
            fill={primaryColor}
          />
          <path
            d="M16.4998 25.1338C16.0415 25.1338 15.6665 25.5088 15.6665 25.9671V28.3921C15.6665 30.8755 16.2998 31.5005 18.8165 31.5005H26.6832C29.1582 31.5005 29.8082 30.9005 29.8332 28.5255V25.9671C29.8332 25.5088 29.4582 25.1338 28.9998 25.1338H16.4998ZM19.7998 29.4671H18.3748C18.0332 29.4671 17.7498 29.1838 17.7498 28.8421C17.7498 28.5005 18.0332 28.2171 18.3748 28.2171H19.8082C20.1498 28.2171 20.4332 28.5005 20.4332 28.8421C20.4332 29.1838 20.1498 29.4671 19.7998 29.4671ZM24.4582 29.4671H21.5915C21.2498 29.4671 20.9665 29.1838 20.9665 28.8421C20.9665 28.5005 21.2498 28.2171 21.5915 28.2171H24.4582C24.7998 28.2171 25.0832 28.5005 25.0832 28.8421C25.0832 29.1838 24.8082 29.4671 24.4582 29.4671Z"
            fill={primaryColor}
          />
          <path
            d="M32.3329 25.1083V20.7417C32.3329 18.1333 30.8412 17 28.5912 17H21.1495C20.5162 17 19.9495 17.0917 19.4495 17.2833C19.0579 17.425 18.7079 17.6333 18.4245 17.9083C18.2745 18.05 18.3912 18.2833 18.6079 18.2833H27.6662C29.5412 18.2833 31.0579 19.8 31.0579 21.675V27.65C31.0579 27.8583 31.2829 27.975 31.4329 27.825C32.0079 27.2167 32.3329 26.325 32.3329 25.1083Z"
            fill={primaryColor}
          />
        </svg>
      </Box>
    </Tooltip>
  );
};
export const WithdrawalIcon = ({height = `48px`, width = `48px`, ...rest}) => {
  const theme = useTheme();
  const primaryColor = theme?.colors?.custom_color.color_pop;

  return (
    <Tooltip label={'Withdrawal'} placement="top" {...icon_tooltip_style}>
      <Box cursor={'pointer'} height={height} width={width} {...rest}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="24" r="24" fill={primaryColor} fill-opacity="0.05" />
          <circle
            cx="24"
            cy="24"
            r="23.6571"
            stroke={primaryColor}
            stroke-opacity="0.2"
            stroke-width="0.685714"
          />
          <path
            d="M23.1665 27.458V29.708C23.1665 31.583 22.4165 32.333 20.5415 32.333H18.2915C16.4165 32.333 15.6665 31.583 15.6665 29.708V27.458C15.6665 25.583 16.4165 24.833 18.2915 24.833H20.5415C22.4165 24.833 23.1665 25.583 23.1665 27.458Z"
            fill={primaryColor}
          />
          <path
            d="M27.7333 15.667H21.1C18.5583 15.667 16.5 17.7253 16.5 20.267V22.7503C16.5 23.2087 16.875 23.5837 17.3333 23.5837H21.0833C22.925 23.5837 24.4167 25.0753 24.4167 26.917V30.667C24.4167 31.1253 24.7917 31.5003 25.25 31.5003H27.7333C30.6083 31.5003 32.3333 29.7837 32.3333 26.9003V20.267C32.3333 17.7253 30.275 15.667 27.7333 15.667ZM29.6333 22.3253C29.6333 22.667 29.35 22.9503 29.0083 22.9503C28.6667 22.9503 28.3833 22.667 28.3833 22.3253V20.492L25.275 23.6087C25.15 23.7337 24.9917 23.792 24.8333 23.792C24.675 23.792 24.5167 23.7337 24.3917 23.6087C24.15 23.367 24.15 22.967 24.3917 22.7253L27.5 19.6003H25.6667C25.3167 19.6003 25.0417 19.3253 25.0417 18.9753C25.0417 18.6337 25.3167 18.3503 25.6667 18.3503H29.0083C29.0833 18.3503 29.1583 18.3753 29.225 18.4003C29.25 18.4087 29.2667 18.417 29.2833 18.4253C29.3333 18.4503 29.375 18.4753 29.4167 18.517C29.4333 18.5253 29.45 18.542 29.4667 18.5587C29.5083 18.6087 29.5417 18.6587 29.575 18.717C29.575 18.7253 29.5833 18.7337 29.5833 18.742C29.6167 18.8087 29.625 18.8837 29.625 18.9587C29.6333 18.967 29.6333 18.967 29.6333 18.9753V22.3253Z"
            fill={primaryColor}
          />
        </svg>
      </Box>
    </Tooltip>
  );
};
export const NairaIcon = ({height = `40px`, width = `40px`, ...rest}) => {
  const theme = useTheme();
  const primaryColor = theme?.colors?.custom_color.color_pop;
  const background = theme?.colors?.matador_background?.[`100`];
  const borderColor = theme?.colors?.matador_border_color?.[`100`];
  const textColor = theme?.colors?.matador_text?.[`100`];

  return (
    <Box cursor={'pointer'} height={height} width={width} {...rest}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="20"
          cy="20"
          r="19.75"
          fill={rest.noFill ? '' : background}
          stroke={rest.noFill ? '' : borderColor}
          stroke-width="0.5"
        />
        <path
          d="M14.464 30V22.804H12.28V21.012H14.464V18.716H12.28V16.924H14.464V10.008H17.376L20.036 16.924H23.34V10.008H25.552V16.924H27.736V18.716H25.552V21.012H27.736V22.804H25.552V30H22.612L19.952 22.804H16.648V30H14.464ZM16.648 21.012H19.28L18.44 18.716H16.592L16.648 21.012ZM23.34 26.052H23.452L23.368 22.804H22.192L23.34 26.052ZM16.592 16.924H17.768L16.592 13.452H16.48L16.592 16.924ZM21.52 21.012H23.396L23.34 18.716H20.68L21.52 21.012Z"
          fill={textColor}
        />
      </svg>
    </Box>
  );
};

export const CheckBoxIcon = ({height = `20px`, width = `21px`, ...rest}) => {
  const theme = useTheme();
  const primaryColor = theme?.colors?.custom_color.color_pop;

  return (
    <Box cursor={'pointer'} height={height} width={width} {...rest}>
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.458333"
          y="0.333333"
          width="19.3333"
          height="19.3333"
          rx="9.66667"
          stroke={primaryColor}
          stroke-width="0.666667"
        />
        <rect x="3.125" y="3" width="14" height="14" rx="7" fill={primaryColor} />
      </svg>
    </Box>
  );
};
export const CustomCopyIcon = ({height = `17px`, width = `16px`, ...rest}) => {
  const theme = useTheme();
  const primaryColor = theme?.colors?.custom_color.color_pop;

  return (
    <Box cursor={'pointer'} height={height} width={width} {...rest}>
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.7188 4.5H5.78125C4.79749 4.5 4 5.29749 4 6.28125V13.2188C4 14.2025 4.79749 15 5.78125 15H12.7188C13.7025 15 14.5 14.2025 14.5 13.2188V6.28125C14.5 5.29749 13.7025 4.5 12.7188 4.5Z"
          stroke={rest.color ?? primaryColor}
          stroke-linejoin="round"
        />
        <path
          d="M11.9844 4.5L12 3.75C11.9987 3.28628 11.8139 2.84192 11.486 2.51402C11.1581 2.18612 10.7137 2.00132 10.25 2H3.5C2.97005 2.00157 2.46225 2.21278 2.08752 2.58752C1.71278 2.96225 1.50157 3.47005 1.5 4V10.75C1.50132 11.2137 1.68612 11.6581 2.01402 11.986C2.34192 12.3139 2.78628 12.4987 3.25 12.5H4"
          stroke={rest.color ?? primaryColor}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Box>
  );
};
