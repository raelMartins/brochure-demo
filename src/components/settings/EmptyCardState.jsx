import {Box, HStack, Stack, Text, useTheme} from '@chakra-ui/react';
import {IoIosAdd} from 'react-icons/io';

const EmptyCardIcon = ({boxSize = `48px`, ...rest}) => {
  const theme = useTheme();
  const color = theme?.colors?.text;

  return (
    <Box boxSize={boxSize} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 48 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 17.29H27"
          stroke={color}
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 33.29H16"
          stroke={color}
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 33.29H29"
          stroke={color}
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M44 24.35V32.51C44 39.53 42.22 41.29 35.12 41.29H12.88C5.78 41.29 4 39.53 4 32.51V16.07C4 9.05004 5.78 7.29004 12.88 7.29004H27"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M33 12.79H44" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M38.5 18.29V7.29004" stroke={color} strokeWidth="3" strokeLinecap="round" />
      </svg>
    </Box>
  );
};

export const EmptyCardState = ({handleAddCard = () => {}}) => {
  return (
    <Stack align={`center`} gap={`12px`} p={{base: `24px`}}>
      <EmptyCardIcon />
      <Text
        color={`text`}
        fontSize={`20px`}
        fontWeight={`700`}
        lineHeight={`120%`}
        letterSpacing={`1.2px`}
      >
        NOTHING FOUND
      </Text>
      <HStack
        color={`custom_color.color_pop`}
        gap={`12px`}
        cursor={`pointer`}
        onClick={handleAddCard}
      >
        <IoIosAdd fontSize={`24px`} />
        <Text fontSize={`14px`} fontWeight={`500`} lineHeight={`130%`} textTransform={`uppercase`}>
          Add Card
        </Text>
      </HStack>
    </Stack>
  );
};
