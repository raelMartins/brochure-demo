import {useLightenHex} from '@/utils/lightenColorShade';
import {Button, Image, Link, Stack, Text, useTheme} from '@chakra-ui/react';
import thinArrow from '/src/images/icons/thinArrow.svg';
import {useQuery} from 'react-query';
import {fetchInvestorPackets} from '@/api/payment';

const PurchaseAgreement = ({equityId}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary?.color;
  const {lightenHex} = useLightenHex(primaryColor);
  const HOME__OWNERS__PACKETS = useQuery(['fetchInvestorPackets', equityId], () =>
    fetchInvestorPackets(equityId)
  );
  const packet =
    HOME__OWNERS__PACKETS?.data?.data?.received?.length &&
    HOME__OWNERS__PACKETS?.data?.data?.received[0];
  return (
    <Stack
      align="center"
      justify="center"
      bg={lightenHex(80)}
      spacing="7px"
      p="24px"
      h="full"
      maxH="102px"
    >
      <Text fontSize={{md: '16px', base: '14px'}}>Purchase Agreement</Text>
      <Link href={packet?.packet} _hover={{border: 'none'}} textDecoration="none" target="_blank">
        <Button
          isDisabled={HOME__OWNERS__PACKETS?.isLoading}
          bg="none"
          _hover={{bg: 'none'}}
          gap="1px"
        >
          <Text
            textTransform={'uppercase'}
            color="custom_color.color_pop"
            fontSize={{md: '20px', base: '14px'}}
            fontWeight="500"
          >
            View
          </Text>
          <Image src={thinArrow.src} boxSize="26px" alt="arrow" />
        </Button>
      </Link>
    </Stack>
  );
};

export default PurchaseAgreement;
