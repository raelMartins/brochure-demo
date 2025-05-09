import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';
import {truncateLongText} from '../../../utils/truncateLongText';

const HoverText = ({
  text,
  forPopUp,
  popUpCom,
  lens,
  component,
  pContentStyle,
  pBodyStyle,
  popStyle,
  mediaQueryProp,
  ...rest
}) => {
  const {isOpen, onToggle, onOpen, onClose} = useDisclosure();

  const [isMobile] = useMediaQuery(`${mediaQueryProp || '(max-width:540px)'}`);

  const maxLengthToTruncate = isMobile ? lens?.[0] : lens?.[1];

  return (
    <Popover
      position="relative"
      zIndex={222222222}
      placement="auto"
      autoFocus={false}
      isOpen={isOpen}
      onClose={onClose}
      {...popStyle}
    >
      <PopoverTrigger>
        {component ? (
          component({
            onMouseLeave: () => (!text ? null : onClose()),
            onMouseEnter: () => (!text ? null : onOpen()),
          })
        ) : (
          <Text
            onMouseLeave={() => (text.length <= (maxLengthToTruncate ?? 17) ? null : onClose())}
            onMouseEnter={() => (text.length <= (maxLengthToTruncate ?? 17) ? null : onOpen())}
            fontSize={'16px'}
            fontWeight="500"
            textAlign={'left'}
            wordWrap="break-word"
            textTransform="capitalize"
            {...rest}
          >
            {truncateLongText(text, maxLengthToTruncate)?.truncatedText}
          </Text>
        )}
      </PopoverTrigger>

      <PopoverContent w="fit-content" {...pContentStyle}>
        <PopoverArrow />

        <PopoverBody boxShadow="0 1px 4px rgba(0, 0, 0, 0.08)" borderRadius="8px" {...pBodyStyle}>
          {popUpCom ? (
            popUpCom
          ) : (
            <Text
              w="fit-content"
              fontSize={{base: '8px', sm: '10px', xl: '16px'}}
              fontWeight="400"
              textAlign="center"
              whiteSpace="break-spaces"
              {...forPopUp}
            >
              {text}
            </Text>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default HoverText;
