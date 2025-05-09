import {Divider, HStack, Text, useMediaQuery, useTheme, VStack} from '@chakra-ui/react';
import {AssetHeader} from './AssetHeader';

export const AssetOverview = ({overviewInfo, listingName, unitName}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary?.color;
  const [isMobile] = useMediaQuery('(max-width: 1023px)');
  return (
    <>
      <AssetHeader
        listingName={listingName}
        unitName={unitName}
        display={{base: 'none', lg: 'block'}}
      />
      <VStack
        divider={
          isMobile ? (
            <Divider borderColor={{base: 'custom_color.color_pop', lg: 'transparent'}} />
          ) : null
        }
        bg={`custom_color.opacity_pop._10`}
        p="22px"
        align="flex-start"
        spacing="20px"
      >
        {overviewInfo.map((info, idx) => {
          return info?.hide ? (
            <></>
          ) : (
            <HStack key={idx} justify="space-between" w="full">
              <Text
                fontSize={{base: '12px', md: '13.664px'}}
                lineHeight={{base: '14px', md: '17px'}}
                fontWeight="400"
                color="matador_text.300"
              >
                {info.label}
              </Text>
              {info?.component || (
                <Text
                  fontSize={{base: '12px', md: '14px'}}
                  lineHeight={{base: '14px', md: '17px'}}
                  fontWeight="500"
                  color="text"
                  textTransform="capitalize"
                >
                  {info?.value}
                </Text>
              )}
            </HStack>
          );
        })}
      </VStack>
    </>
  );
};
