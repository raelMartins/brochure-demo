'use client';
import {Box} from '@chakra-ui/react';
import {cloneElement, isValidElement} from 'react';

export const ColorBackground = ({InnerComponent, variant, backgroundOpacity, ...rest}) => {
  const background_opacity = () => {
    switch (variant) {
      case 1:
        return `.8`;
      case 2:
        return `.6`;
      case 3:
        return `.4`;
      case 4:
        return `.2`;
      case 5:
        return `.1`;
      case 6:
        return `.05`;
      default:
        return `1`;
    }
  };
  return (
    <Box position={`relative`} overflow={`hidden`} {...rest}>
      <Box
        position={`absolute`}
        left={`0px`}
        right={`0px`}
        bottom={`0px`}
        top={`0px`}
        backgroundColor={`custom_color.color_pop`}
        opacity={backgroundOpacity || background_opacity}
      />

      {InnerComponent
        ? isValidElement(InnerComponent)
          ? cloneElement(InnerComponent, {style: {position: 'relative', zIndex: `1`}})
          : null
        : null}
    </Box>
  );
};
