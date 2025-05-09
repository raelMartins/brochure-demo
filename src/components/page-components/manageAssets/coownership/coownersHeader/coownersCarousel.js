import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  AspectRatio,
  Box,
  Flex,
  HStack,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import angledIcon from '/src/images/icons/angledArrow.svg';
import HoverText from '@/ui-lib/ui-lib.components/hover/hoverOnText';

// Custom-styled Carousel component
const StyledCarousel = styled(Carousel)`
  width: 100%;
  max-width: 608.81px;

  .slider-wrapper {
    width: 100%;
    overflow: hidden;
    max-width: 608.81px;
  }

  .slider {
    width: 100%;
    max-width: 608.81px;
  }

  .slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 608.81px;
  }
`;

const CoownersCarousel = ({isOpen, coownersList, setTransactionInfo, transactionInfo}) => {
  const status = tag => {
    switch (tag) {
      case 'DEFAULTING':
        return {
          text: 'Defaulting',
        };
      case 'NON-DEFAULTING':
        return {
          text: 'Not defaulting',
        };

      default:
        return {
          text: '-',
        };
    }
  };

  return (
    <Flex
      transition="0.6s ease-in-out"
      overflow="hidden"
      opacity={isOpen ? 1 : 0}
      height={{
        base: `${isOpen ? '66.5px' : '0px'}`,
        xl: `${isOpen ? '71px' : '0px'}`,
      }}
      minH={{
        base: `${isOpen ? '66.5px' : '0px'}`,
        xl: `${isOpen ? '71px' : '0px'}`,
      }}
      borderRadius="0px"
      width="100%"
      border=".5px solid"
      borderColor="custom_color.color_pop"
      rounded="4px"
      mt={2}
    >
      {coownersList?.length ? (
        <StyledCarousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          useKeyboardArrows
          showArrows={false}
          selectedItem={transactionInfo?.slideIndex}
        >
          {coownersList?.map((item, index) => (
            <HStack
              key={index}
              py="8px"
              px={{base: '10px', xl: '20px'}}
              width="100%"
              spacing="none"
              justifyContent="space-between"
            >
              <HStack spacing={{base: '10px', xl: '21px'}} width="100%">
                <HStack spacing={{base: '10px', xl: '20px'}} align="start" width="100%">
                  <Box
                    position="relative"
                    boxSize={{base: '45px', xl: '50px'}}
                    maxW={{base: '45px', xl: '50px'}}
                  >
                    <Image
                      src={item?.avatar}
                      alt="coowner image"
                      aspectRatio="1"
                      boxSize={{base: '45px', xl: '50px'}}
                      fontSize="8px"
                      objectFit="cover"
                      borderRadius="full"
                      bg="#4848484D"
                    />
                  </Box>
                  <Stack align="start" spacing={{md: '5px', base: '4.49px'}} minW="0" flex="1">
                    <HStack spacing={{base: '8.98px', md: '10px'}}>
                      <Stack gap="4px">
                        <HoverText
                          // lens={isBelowS ? 5 : isBelowXl ? 10 : 18}
                          lens={[10, 18]}
                          popStyle={{placement: 'right-end'}}
                          forPopUp={{textTransform: 'capitalize'}}
                          text={item?.name}
                          textAlign="start"
                          color="text.1"
                          textTransform="capitalize"
                          fontSize={{base: '14.374px', md: '16px'}}
                          fontWeight={{base: '500', md: '500'}}
                          lineHeight={{base: '17px', md: '19px'}}
                        />
                        <Text fontSize={{base: '10.78px', md: '12px'}} color="#525252">
                          {item?.email}
                        </Text>
                      </Stack>
                      <Text fontSize={{base: '12px', xl: '14px'}} color="text.1">
                        {`${item?.equityValue}`}
                      </Text>
                      <Tag
                        p={{base: '5.39px 9.405px', md: '10px'}}
                        maxH={{md: '18.78px', base: '23px'}}
                        minW={{base: '70px', md: '76px'}}
                        bg="transparent"
                        border="1px solid"
                        borderColor="custom_color.color_pop"
                        borderRadius="0px"
                        isTruncated={false}
                        letterSpacing="0.6px"
                      >
                        <TagLabel
                          isTruncated={false}
                          mx="auto"
                          fontSize={{base: '10.973px', md: '10.214px'}}
                          fontWeight="400"
                        >
                          {status(item?.status)?.text}
                        </TagLabel>
                      </Tag>
                    </HStack>
                  </Stack>
                </HStack>
              </HStack>
              <Stack h="full" align="end" justifyContent="center">
                <HStack
                  border="1px solid"
                  borderColor="custom_color.color_pop"
                  borderRadius="20px"
                  p="3px 13px"
                >
                  <Text fontSize="10px" fontWeight="400" color="text.1">
                    {index + 1}/{coownersList?.length}
                  </Text>
                </HStack>
                <HStack spacing="8px">
                  <Box
                    role="button"
                    transform="rotate(180deg)"
                    cursor={index === 0 ? 'not-allowed' : 'pointer'}
                    onClick={() =>
                      index === 0
                        ? null
                        : setTransactionInfo(prev => ({
                            ...coownersList?.[prev?.slideIndex - 1],
                            slideIndex: prev?.slideIndex - 1,
                          }))
                    }
                    display="flex"
                    align="center"
                    justifyContent="center"
                  >
                    <Image
                      src={angledIcon.src}
                      opacity={index === 0 ? 0.3 : 1}
                      alt="arrow icon"
                      boxSize="24px"
                    />
                  </Box>
                  <Box
                    role="button"
                    cursor={index + 1 === coownersList.length ? 'not-allowed' : 'pointer'}
                    onClick={() =>
                      index + 1 === coownersList.length
                        ? null
                        : setTransactionInfo(prev => ({
                            ...coownersList?.[prev?.slideIndex + 1],
                            slideIndex: prev?.slideIndex + 1,
                          }))
                    }
                    display="flex"
                    align="center"
                    justifyContent="center"
                  >
                    <Image
                      src={angledIcon.src}
                      opacity={index + 1 === coownersList.length ? 0.5 : 1}
                      alt="arrow icon"
                      boxSize="24px"
                    />
                  </Box>
                </HStack>
              </Stack>
            </HStack>
          ))}
        </StyledCarousel>
      ) : (
        <Text textAlign="center" width="full" alignSelf="center" fontSize="14px" fontWeight="400">
          Currently, there isn&apos;t an available co-owner. Kindly refresh.
        </Text>
      )}
    </Flex>
  );
};

export default CoownersCarousel;
