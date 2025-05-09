import {
  AbsoluteCenter,
  Center,
  Spinner as ChakraSpinner,
  resolveStyleConfig,
  useTheme,
} from '@chakra-ui/react';

export const Spinner = ({noAbsolute = false, absoluteStyle = {}, size = `300px`, ...rest}) => {
  const theme = useTheme();
  const primaryColor = theme?.colors?.custom_color?.color_pop;
  return noAbsolute ? (
    <RegularSpinner
      // thickness="10px"
      speed="0.65s"
      // emptyColor="gray.200"
      color={primaryColor}
      size={size || '300px'}
      {...resolveStyleConfig}
      {...rest}
    />
  ) : (
    <OvalLoader absoluteStyle={absoluteStyle} {...rest} />
  );
};

export const OvalLoader = ({absoluteStyle, ...rest}) => {
  const theme = useTheme();
  const primaryColor = theme?.colors?.custom_color?.color_pop;

  return (
    <AbsoluteCenter color={`text`} {...absoluteStyle}>
      {/* <Oval
        height={80}
        width={80}
        // color={primary}
        color={primaryColor}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        // secondaryColor={primaryShade}
        secondaryColor={primaryColor}
        strokeWidth={2}
        strokeWidthSecondary={2}
        {...rest}
      /> */}
      <ChakraSpinner
        height={`80px`}
        width={`80px`}
        ariaLabel="oval-loading"
        color={primaryColor}
        speed="0.65s"
        thickness={`3px`}
        // emptyColor="gray.200"
        {...rest}
      />
    </AbsoluteCenter>
  );
};
export const RegularSpinner = ({...rest}) => {
  const theme = useTheme();
  const primaryColor = theme?.colors?.custom_color?.color_pop;
  return (
    <Center color="text">
      {/* <Oval
        height={80}
        width={80}
        color={primaryColor}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor={primaryColor}
        strokeWidth={2}
        strokeWidthSecondary={2}
        {...rest}
      /> */}

      <ChakraSpinner
        height={`80px`}
        width={`80px`}
        ariaLabel="oval-loading"
        color={primaryColor}
        speed="0.65s"
        thickness={`3px`}
        // emptyColor="gray.200"
        {...rest}
      />
    </Center>
  );
};
