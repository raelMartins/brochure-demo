'use client';

import {Center, Divider, Text} from '@chakra-ui/react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

export const UnitCard = ({data}) => {
  // const router = useRouter();
  // const handle_click = () => {
  //   router.push(`/listing/${data?.project?.id}/unit/${data?.id}`);
  // };
  return (
    <Center
      as={Link}
      href={`/listing/${data?.project?.id}/unit/${data?.id}`}
      prefetch={true}
      maxW={{base: `650px`}}
      w={`100%`}
      mx={{base: `auto`}}
      aspectRatio={{base: `650 / 388`}}
      flexDir={`column`}
      alignItems={`flex-start`}
      p={{base: `24px`}}
      gap={`8px`}
      cursor={`pointer`}
      // onClick={handle_click}
      bg={`custom_color.opacity_pop._10`}
      _hover={{bg: `custom_color.opacity_pop._20`}}
      color={`custom_color.color_pop`}
      border="1px solid !important"
      borderColor={'custom_color.color_pop'}
      transition={`.3s`}
    >
      <Text
        fontSize={{base: `20px`, md: `32px`}}
        fontWeight={{base: `500`}}
        lineHeight={{base: `26px`, md: `29.28px`}}
        textAlign={{base: `left`}}
        fontFamily={{base: `var(--font_montserrat)`}}
      >
        {data?.unit_title || data?.name}
      </Text>
      <Divider borderColor={`custom_color.color_pop`} w={`70%`} />
      <Text
        fontSize={{base: `12px`, md: `16px`}}
        fontWeight={`600`}
        lineHeight={{base: `16px`, md: `22.4px`}}
        letterSpacing={`0.01em`}
        textAlign={`left`}
      >
        {data?.display_price
          ? `Price from #${Intl.NumberFormat('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(data?.price || data.starting_price || 0)}`
          : 'Contact for Price'}
      </Text>
    </Center>
  );
};
