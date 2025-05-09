import React from 'react';
import {Box, Center} from '@chakra-ui/react';
import {Carousel} from 'react-responsive-carousel';
import {ResponsivePopup, ResponsivePopupCloseButton, ResponsivePopupContent} from '@/ui-lib';
import {ArrowBackIcon, ArrowForwardIcon} from '@chakra-ui/icons';
import Image from 'next/image';

const buttonStyles = {
  zIndex: 2,
  top: '50%',
  display: 'flex',
  aspectRatio: 1 / 1,
  position: 'absolute',
  borderRadius: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 'xl',
  border: '1px solid #EAEAEA',
  backgroundColor: '#FFFFFFB2',
  color: `#000`,
};

export const AssetPopup = ({disclosure, images}) => {
  return (
    <ResponsivePopup
      isOpen={disclosure?.isOpen}
      onClose={disclosure?.onClose}
      isCentered
      placement={`right`}
    >
      <ResponsivePopupContent
        maxW={{base: `100%`, lg: `50vw`, xl: `1000px`}}
        bg={{base: `#222222`, lg: `transparent`}}
        boxShadow={`none`}
      >
        <ResponsivePopupCloseButton color={`#fff`} display={{lg: `none`}} />
        <Box my={`auto`}>
          <Carousel
            showThumbs={false}
            showStatus={false}
            useKeyboardArrows
            renderArrowPrev={(clickHandler, hasPrev) => (
              <>
                {hasPrev && (
                  <Box
                    {...buttonStyles}
                    onClick={clickHandler}
                    cursor={'pointer'}
                    right={{base: '90%', md: '94%'}}
                    position="fixed"
                    width={{base: '30px'}}
                  >
                    <Center w="full" h="full" p={{base: '5px'}}>
                      <ArrowBackIcon />
                    </Center>
                  </Box>
                )}
              </>
            )}
            renderArrowNext={(clickHandler, hasNext) => (
              <>
                {hasNext && (
                  <Box
                    {...buttonStyles}
                    onClick={clickHandler}
                    cursor={'pointer'}
                    left={{base: '90%', md: '94%'}}
                    position="fixed"
                    width={{base: '30px'}}
                  >
                    <Center w="full" h="full" p={{base: '5px'}}>
                      <ArrowForwardIcon />
                    </Center>
                  </Box>
                )}
              </>
            )}
          >
            {images?.map((photo, id) => (
              <Center key={id} position="relative" margin="auto auto" h={`80vh`}>
                <Image
                  src={photo?.photo || photo?.original || photo}
                  alt="image"
                  fill
                  style={{objectFit: `contain`}}
                />
              </Center>
            ))}
          </Carousel>
        </Box>
      </ResponsivePopupContent>
    </ResponsivePopup>
  );
};
