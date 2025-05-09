import ExploreArrow from '@/components/assets/exploreArrow';
import {HStack, Text} from '@chakra-ui/react';
import {useState} from 'react';

export const ExternalLink = ({text, iconSize, ...rest}) => {
  const [hovering, setHovering] = useState(false);

  return (
    <HStack
      gap={`8px`}
      color={`custom_color.color_pop`}
      borderBottom={`1px solid`}
      transition={`.3s`}
      pb={`10px`}
      borderColor={`transparent`}
      _hover={{borderColor: `custom_color.color_pop`}}
      cursor={`pointer`}
      fontFamily={`var(--font_montserrat)`}
      verticalAlign={`middle`}
      textDecor={`none !important`}
      textTransform={`uppercase`}
      fontWeight={`500`}
      lineHeight={{base: `150%`}}
      fontSize={{base: `12px`, lg: `16px`}}
      letterSpacing={`-1%`}
      w={`max-content`}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
      {...rest}
    >
      <Text>{text}</Text>
      <ExploreArrow
        boxSize={iconSize}
        transform={hovering ? `translate(2.5px, -2.5px)` : `translate(0px, 0px)`}
        transition={`.3s`}
      />
    </HStack>
  );
};
