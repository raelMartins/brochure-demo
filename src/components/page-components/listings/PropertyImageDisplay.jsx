'use client';

import {Center, Grid, Stack, Text, useDisclosure} from '@chakra-ui/react';
import Image from 'next/image';
import {useState} from 'react';
import {IoChevronBack, IoChevronForward} from 'react-icons/io5';
import {AssetPopup} from './AssetPopup';

export const PropertyImageDisplay = ({images}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const gallery_disclosure = useDisclosure();

  const previous_image = () => {
    if (imageIndex <= 0) {
      setImageIndex(0);
    } else {
      setImageIndex(imageIndex - 1);
    }
  };

  const next_image = () => {
    if (imageIndex >= images?.length - 1) {
      setImageIndex(images?.length - 1);
    } else {
      setImageIndex(imageIndex + 1);
    }
  };

  const handlePreview = () => {
    gallery_disclosure?.onOpen();
  };

  return (
    <Stack gap={{base: `16px`}} minW={{base: `100%`, md: `300px`}}>
      <Center
        bg={`matador_background.200`}
        p={`10px`}
        aspectRatio={{base: `428 / 260`, md: `1 / 1`}}
        w={{base: `100%`}}
        position={`relative`}
        onClick={handlePreview}
      >
        <Image
          src={images?.[imageIndex]?.photo || images?.[imageIndex]}
          alt={``}
          fill
          style={{objectFit: `cover`}}
        />
        <Center
          height={`30px`}
          width={`30px`}
          borderRadius={`50%`}
          bg={`rgba(0,0,0,.6)`}
          color={`#fff`}
          fontSize={`24px`}
          position="absolute"
          top={`calc(50% - 15px)`}
          left={`8px`}
          display={{base: imageIndex <= 0 ? `none` : `flex`, md: `none`}}
          cursor={`pointer`}
          onClick={previous_image}
        >
          <IoChevronBack />
        </Center>
        <Center
          height={`24px`}
          width={`24px`}
          borderRadius={`50%`}
          bg={`rgba(0,0,0,.6)`}
          color={`#fff`}
          fontSize={`20px`}
          position="absolute"
          top={`calc(50% - 12px)`}
          right={`8px`}
          display={{base: imageIndex >= images?.length - 1 ? `none` : `flex`, md: `none`}}
          cursor={`pointer`}
          onClick={next_image}
        >
          <IoChevronForward />
        </Center>
      </Center>
      <Grid
        templateColumns={{base: `1fr 1fr 1fr 1fr 1fr`}}
        gap={`11px`}
        display={{base: `none`, md: `grid`}}
      >
        {images?.slice(0, 5)?.map((el, i) => (
          <Center
            key={i}
            bg={`matador_background.100`}
            p={`10px`}
            aspectRatio={{base: `1 / 1`}}
            w={{base: `100%`}}
            position={`relative`}
            // maxH={`100px`}
            onClick={() => setImageIndex(i)}
            // top={`0px`}
          >
            {images?.length > 5 && i == 4 && (
              <Center
                pos={`absolute`}
                left={`0px`}
                top={`0px`}
                right={`0px`}
                bottom={`0px`}
                zIndex={`1`}
                bg={`rgba(0,0,0,.4)`}
                color={`#fff`}
              >
                <Text fontSize={`18px`}>+{images?.length - 5}</Text>
              </Center>
            )}
            <Image src={el.photo || el} alt={``} fill style={{objectFit: `cover`}} />
          </Center>
        ))}
      </Grid>
      <AssetPopup disclosure={gallery_disclosure} images={images} />
    </Stack>
  );
};
