const { useMediaQuery, Image, Stack, HStack, Icon, Button } = require("@chakra-ui/react");
import { AnimatePresence } from "framer-motion";
import Carousel, {consts} from "react-elastic-carousel";
import {FaChevronRight} from 'react-icons/fa6';

const AssetCarousel = ({ photos, setBigPhotoViewSrc }) => {
const [isBelowLg] = useMediaQuery('(max-width: 1023px)');
const renderArrows = ({type, onClick, isEdge}) => {
    const pointer =
      type === consts.PREV ? (
        <HStack
          boxSize="36px"
          justify="center"
          backdropFilter="blur(4px)"
          align="center"
          p="8px"
          bg="rgba(0, 0, 0, 0.60)"
          borderRadius="full"
        >
          <Icon boxSize="15px" as={FaChevronRight} transform="rotate(180deg)" color='#FFF' />
        </HStack>
      ) : (
        <HStack
          boxSize="36px"
          justify="center"
          backdropFilter="blur(4px)"
          align="center"
          p="8px"
          bg="rgba(0, 0, 0, 0.60)"
          borderRadius="full"
        >
          <Icon boxSize="15px" as={FaChevronRight} color='#FFFFFF' />
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
        top="30%"
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
  return (
    <>
      {isBelowLg ? (
        <Carousel
          itemsToShow={1}
          pagination={false}
          renderArrow={renderArrows}
          className="m-0"
        >
          {photos?.map((item, idx) => (
            <Image
            alt=""
            objectFit={"cover"}
            justifySelf={"stretch"}
            cursor="pointer"
            onClick={() => setBigPhotoViewSrc(item?.photo)}
            w='full'
            h='260px'
            // {...themeStyles.imageFallback}
            src={item?.photo}
            key={idx}
          />
          ))}
        </Carousel>
      ) : (
        <Stack minW={photos?.length < 4 ? "200px" : "390px"} w="full" pt="10px">
          <Carousel
            pagination={false}
            itemPadding={[0, 0]}
            showEmptySlots={true}
            disableArrowsOnEnd={true}
            enableAutoPlay={false}
            autoPlaySpeed={1500}
            showArrows={false}
            itemPosition="START"
          >
            {photos?.map((item, idx) => (
              <AnimatePresence key={idx}>
                <Image
                  alt=""
                  objectFit={"cover"}
                  justifySelf={"stretch"}
                  cursor="pointer"
                  onClick={() => setBigPhotoViewSrc(item?.photo)}
                  h="90px"
                  w="100px"
                  // {...themeStyles.imageFallback}
                  src={item?.photo}
                />
              </AnimatePresence>
            ))}
          </Carousel>
        </Stack>
      )}
    </>
  );
};

export default AssetCarousel;