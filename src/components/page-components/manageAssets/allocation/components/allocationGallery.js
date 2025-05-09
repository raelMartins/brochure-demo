import {Box, Button, HStack, Icon, Image, useDisclosure, useMediaQuery} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import Carousel, {consts} from 'react-elastic-carousel';
import allocationExpandIcon from '/src/images/icons/expandIcon.svg';
import {FaChevronRight} from 'react-icons/fa6';
import {AnimatePresence} from 'framer-motion';
import ViewImage from './ViewImage';
// import galleryIcon from '/src/images/icons/gallery.svg';

const AllocationGallery = ({uploads}) => {
  const [isBelowMd] = useMediaQuery('(max-width: 913px)');

  const [expandedImage, setExpandedImage] = useState('');
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [bigPhotoViewSrc, setBigPhotoViewSrc] = useState(null);

  const firstPhoto = uploads[0]?.image_file;
  const VIEW_IMAGE = useDisclosure();

  useEffect(() => {
    if (firstPhoto) {
      setBigPhotoViewSrc(uploads[0]?.image_file);
    }
  }, [firstPhoto, uploads]);

  const renderArrows = ({type, onClick, isEdge}) => {
    const pointer =
      type === consts.PREV ? (
        <HStack
          boxSize="24px"
          justify="center"
          backdropFilter="blur(4px)"
          align="center"
          p="4px"
          bg="matador_button_text.200"
          borderRadius="full"
        >
          <Icon boxSize="12px" as={FaChevronRight} transform="rotate(180deg)" color="text.1" />
        </HStack>
      ) : (
        <HStack
          boxSize="24px"
          justify="center"
          backdropFilter="blur(4px)"
          align="center"
          p="8px"
          bg="matador_button_text.200"
          borderRadius="full"
        >
          <Icon boxSize="12px" as={FaChevronRight} color="text.1" />
        </HStack>
      );

    return (
      <Button
        onClick={onClick}
        minW="fit-content"
        maxW="fit-content"
        bg="transparent"
        _hover={{bg: 'transparent'}}
        _active={{bg: 'transparent'}}
        _focus={{bg: 'transparent'}}
        p="0px"
        pr="0px"
        left={type === consts.PREV ? '16px' : 'initial'}
        right={type === consts.PREV ? 'initial' : '16px'}
        zIndex={2}
        top={isBelowMd ? '47%' : '37.5%'}
        transform="translateY(-50%)"
        position="absolute"
        h="fit-content"
        isDisabled={isEdge}
        visibility={isEdge ? 'hidden' : 'visible'}
      >
        {pointer}
      </Button>
    );
  };

  useEffect(() => {
    if (expandedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    // return (document.body.style.overflow = "visible");
  }, [expandedImage]);
  const customScrollbarStyle = {
    '&::-webkit-scrollbar': {
      display: 'none', // Hide the scrollbar
    },
  };

  const handleSelectImage = (item, idx) => {
    setBigPhotoViewSrc(item?.image_file);
    setSelectedSlide(idx);
  };

  const handleImageExpansion = index => () => {
    setExpandedImage(true);
    return setExpandedImageSelectedSlide(index);
  };

  const resetCurrentImageIndex = () => {
    setBigPhotoViewSrc(bigPhotoViewSrc);
  };

  return (
    <>
      <Box>
        <Image
          alt=""
          h="205.395px"
          minW={{base: 'full', lg: '368px'}}
          maxW={{base: 'full', lg: '368px'}}
          src={bigPhotoViewSrc}
          objectFit={'cover'}
          lazy={true}
          rounded="4px"
        />
        <Image
          src={allocationExpandIcon.src}
          onClick={VIEW_IMAGE.onOpen}
          cursor="pointer"
          alt=""
          position={'absolute'}
          right={{base: '2rem', md: '1.5rem'}}
          mt="-2rem"
        />
      </Box>
      <Box w="full" maxW={{base: 'full', md: '325px'}}>
        <Carousel
          pagination={false}
          renderArrow={renderArrows}
          itemPosition="CENTER"
          itemsToShow={3}
        >
          {uploads?.map((item, idx) => (
            <AnimatePresence key={idx}>
              <Image
                alt=""
                objectFit={'cover'}
                justifySelf={'stretch'}
                cursor="pointer"
                onClick={() => handleSelectImage(item, idx)}
                h="63px"
                w="100px"
                border={selectedSlide === idx && '1px solid'}
                borderColor={selectedSlide === idx && 'custom_color.color_pop'}
                src={item?.image_file}
                rounded="2px"
              />
              {idx}
            </AnimatePresence>
          ))}
        </Carousel>
      </Box>
      <ViewImage
        modal={VIEW_IMAGE}
        src={bigPhotoViewSrc}
        currentImageIndex={setSelectedSlide}
        photos={uploads}
        setPhotoViewSrc={setBigPhotoViewSrc}
        setCurrentImageIndex={setSelectedSlide}
        resetCurrentImageIndex={resetCurrentImageIndex}
      />
    </>
  );
};

export default AllocationGallery;
