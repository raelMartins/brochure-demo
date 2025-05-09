import {useLightenHex} from '@/utils/lightenColorShade';
import {HStack, Text, useTheme, VStack} from '@chakra-ui/react';

export const FractionalDetails = ({overviewInfo}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary?.color;
  const {lightenHex} = useLightenHex(primaryColor);
  return (
    <HStack justify="space-between" bg={lightenHex(80)} p="22px" align="flex-start">
      {overviewInfo.map((info, idx) => {
        return (
          <VStack
            align={overviewInfo.length - 1 === idx ? 'flex-end' : 'flex-start'}
            key={idx}
            justify="space-between"
            w="full"
          >
            <Text
              fontSize={{base: '12px', md: '13.664px'}}
              lineHeight={{base: '14px', md: '17px'}}
              fontWeight="400"
              color="#606060"
            >
              {info.label}
            </Text>
            {info?.component || (
              <Text
                fontSize={{base: '12px', md: '14px'}}
                lineHeight={{base: '14px', md: '17px'}}
                fontWeight="500"
                color="#191919"
                textTransform="capitalize"
              >
                {info?.value}
              </Text>
            )}
          </VStack>
        );
      })}
    </HStack>
  );
};
