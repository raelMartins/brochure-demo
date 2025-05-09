import {ExternalLink} from '@/ui-lib';
import {randomBackgroundColor} from '@/utils/misc';
import {Box, Center, Flex, HStack, Skeleton, SkeletonText, Stack, Text} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

export const PropertyCard = ({data = {}, index = 1, last, isLoading = false}) => {
  const loadColor = randomBackgroundColor();
  return isLoading ? (
    <Flex
      direction={{base: `column`, md: 'row'}}
      align={{base: `center`}}
      my={{base: `10px`, md: `-20px`}}
      position={`relative`}
    >
      <Skeleton
        flex={`2`}
        order={{base: `1`, md: index % 2 === 0 ? `1` : `2`}}
        position={`relative`}
        width={{base: `calc(100% - 24px)`, md: `100%`}}
        // height={`658.48px`}
        ml={index % 2 === 0 ? `auto` : `0px`}
        mr={index % 2 === 0 ? `0px` : `auto`}
        aspectRatio={{base: `803.33 / 658.48`}}
        // left={`19px`}
        border={{base: `none`, md: `20px solid`}}
        borderColor={{base: `none`, md: `#fff !important`}}
        startColor={`${loadColor}`}
        endColor={`${loadColor}66`}
      />
      <Stack
        flex={`1`}
        order={{base: `2`, md: index % 2 === 0 ? `2` : `1`}}
        p={`20px`}
        align={{base: `center`, lg: `flex-start`}}
        gap={{base: `8px`}}
        w={`80%`}
      >
        <SkeletonText
          mt="4"
          noOfLines={2}
          spacing="8px"
          skeletonHeight={{base: `30px`, lg: `60px`}}
          startColor={`${loadColor}e6`}
          endColor={`${loadColor}66`}
          w={`100%`}
        />
        <ExternalLink
          text={`Explore`}
          as={Link}
          href={`#`}
          textAlign={{base: `center`, lg: `left`}}
          isDisabled
        />

        {!last && (
          <Box
            bg={`custom_color.color_pop`}
            w={`50%`}
            h={`5px`}
            opacity={`.4`}
            pos={`absolute`}
            bottom={{base: `0px`, md: `60px`}}
            zIndex={`1`}
            right={{base: index % 2 === 0 ? `0px` : `auto`, md: index % 2 === 0 ? `20px` : `auto`}}
            left={{base: index % 2 === 0 ? `auto` : `0px`, md: index % 2 === 0 ? `auto` : `20px`}}
          />
        )}
      </Stack>
    </Flex>
  ) : (
    <Flex
      direction={{base: `column`, md: 'row'}}
      align={{base: `center`}}
      my={{base: `10px`, md: `-20px`}}
      position={`relative`}
    >
      <Center
        as={Link}
        prefetch={true}
        href={`/listing/${data.id}`}
        flex={`2`}
        order={{base: `1`, md: index % 2 === 0 ? `1` : `2`}}
        bg={`#fff`}
        position={`relative`}
        width={{base: `calc(100% - 24px)`, md: `100%`}}
        // height={`658.48px`}
        ml={index % 2 === 0 ? `auto` : `0px`}
        mr={index % 2 === 0 ? `0px` : `auto`}
        aspectRatio={{base: `803.33 / 658.48`}}
        // left={`19px`}
        border={{base: `none`, md: `20px solid`}}
        borderColor={{base: `none`, md: `#fff`}}
        opacity={`0px`}
      >
        <Image
          src={data?.photos?.[0]?.photo || data.image || '/'}
          alt={data.name}
          fill
          style={{objectFit: `cover`}}
        />
      </Center>
      <Stack
        flex={`1`}
        order={{base: `2`, md: index % 2 === 0 ? `2` : `1`}}
        p={`20px`}
        align={{base: `center`, lg: `flex-start`}}
        gap={{base: `8px`}}
      >
        <Text
          fontSize={
            data?.name?.length > 30 ? {base: `15px`, lg: `30px`} : {base: `30px`, lg: `60px`}
          }
          fontWeight={`500`}
          lineHeight={{base: `120%`}}
          letterSpacing={`-1%`}
          textAlign={{base: `center`, lg: `left`}}
          fontFamily={`var(--font_montserrat)`}
          textTransform={`uppercase`}
          noOfLines={`4`}
        >
          {data?.name}
        </Text>
        {data?.is_fractionalized && (
          <Box
            border={`1px solid`}
            borderColor={`custom_color.color_pop`}
            borderRadius={`40px`}
            padding={{base: `8px 12.5px`}}
            mb={{base: `40px`}}
            bg={`custom_color.opacity_pop._10`}
          >
            <Text //styleName: Body 3 Medium;
              fontFamily={`var(--font_poppins)`}
              fontSize={`12px`}
              fontWeight={`500`}
              lineHeight={`133%`}
              letterSpacing={`1%`}
              textAlign={`center`}
              textTransform={`uppercase`}
            >
              Fractional
            </Text>
          </Box>
        )}
        <ExternalLink
          text={`Explore`}
          as={Link}
          href={`/listing/${data.id}`}
          textAlign={{base: `center`, lg: `left`}}
        />

        {!last && (
          <Box
            bg={`custom_color.color_pop`}
            w={`50%`}
            h={`5px`}
            opacity={`.4`}
            pos={`absolute`}
            bottom={{base: `0px`, md: `60px`}}
            zIndex={`1`}
            right={{base: index % 2 === 0 ? `0px` : `auto`, md: index % 2 === 0 ? `20px` : `auto`}}
            left={{base: index % 2 === 0 ? `auto` : `0px`, md: index % 2 === 0 ? `auto` : `20px`}}
          />
        )}
      </Stack>
    </Flex>
  );
};
