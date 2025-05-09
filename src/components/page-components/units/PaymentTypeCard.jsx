import {CustomExternalLinkIcon} from '@/components/assets/icons';
import {Box, Divider, HStack, Stack, Text, useTheme} from '@chakra-ui/react';
import ExploreArrow from '@/components/assets/exploreArrow';
import {PaymentAccess} from '@/components/payment_flow/PaymentAccess';

export const PaymentTypeCard = ({type, subHeading, variation = `primary`, ...rest}) => {
  const theme = useTheme();
  const color =
    variation === `primary` ? theme?.colors?.custom_color.contrast_pop : theme?.colors?.text;
  const borderColor =
    variation === `primary`
      ? theme?.colors?.custom_color.contrast_pop
      : theme?.colors?.custom_color.color_pop;
  const background =
    variation === `primary`
      ? theme?.colors?.custom_color.color_pop
      : theme?.colors?.custom_color.opacity_pop?._20;
  const backgroundHover =
    variation === `primary`
      ? theme?.colors?.custom_color.opacity_pop?._9add0
      : theme?.colors?.custom_color.opacity_pop?._30;

  return (
    <PaymentAccess
      checkWallet={type?.toLowerCase()?.includes(`wallet`)}
      content={
        <HStack
          h="fit-content"
          p={'10px 12px'}
          cursor={'pointer'}
          border={`1px solid`}
          bg={background}
          _hover={{background: backgroundHover}}
          transition={`.3s`}
          color={color}
          borderColor={variation === `primary` ? `transparent` : borderColor}
          maxW={{base: 'full', md: '602px'}}
          position={`relative`}
          {...rest}
        >
          <Stack gap="12px" minH="111px" flex={`2`}>
            <HStack flexWrap={`wrap`} flex={`1`}>
              <Text
                fontFamily="Montserrat"
                fontSize={{base: '12.625px', md: '20px'}}
                fontStyle="normal"
                fontWeight="500"
                letterSpacing="-0.2px"
                textTransform={'uppercase'}
              >
                {type}
              </Text>
              {/* {rest.tag && (
                <Text
                  fontSize={{base: '7.575px', md: '12px'}}
                  fontStyle="normal"
                  fontWeight="500"
                  p="4px 11px"
                  borderRadius={'4px'}
                  letterSpacing="-0.2px"
                  textTransform={'uppercase'}
                  border={`1px solid`}
                  borderColor={borderColor}
                  position={`absolute`}
                  top={`10px`}
                  right={`10px`}
                >
                  {rest.tag}
                </Text>
              )} */}
            </HStack>
            <Divider borderColor={borderColor} m={`0px !important`} />
            {subHeading && (
              <Text
                flex={`1`}
                fontSize={{base: '6.312px', md: '10px'}}
                fontStyle="normal"
                fontWeight="400"
                letterSpacing="0.6px"
                opacity={`.85`}
              >
                {subHeading}
              </Text>
            )}
          </Stack>
          <Box flex={`1`}>
            <ExploreArrow color={borderColor} />
          </Box>
        </HStack>
      }
    />
  );
};
