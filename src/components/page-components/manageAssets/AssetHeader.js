import {Box, Heading, Text, useMediaQuery} from '@chakra-ui/react';

export const AssetHeader = ({listingName, unitName, children, ...rest}) => {
  const [isMobile] = useMediaQuery('(max-width: 1024px)');
  return (
    <Box {...rest}>
      {isMobile && children}
      <Heading
        fontFamily="Montserrat"
        textTransform="uppercase"
        fontSize="48px"
        color="custom_color.color_pop"
        letterSpacing="-0.48px"
        fontWeight={500}
      >
        {listingName}
      </Heading>
      <Text fontSize="20px" fontWeight={500} color="text" textTransform="uppercase">
        {unitName}
      </Text>
    </Box>
  );
};
