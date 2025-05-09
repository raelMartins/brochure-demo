import React from 'react';
import {
  Box,
  Text,
  Modal,
  ModalProps,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  useColorModeValue,
  VStack,
  ModalFooter,
  ModalBody,
  HStack,
} from '@chakra-ui/react';

export const Popup2 = ({
  isOpen,
  onClose,
  noHeight,
  children,
  scrollBehavior,
  hideCloseButton,
  overLayStyle,
  ...restModalProps
}) => {
  const bg = useColorModeValue('blue.80', 'gray.800');

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      scrollBehavior={scrollBehavior || 'inside'}
      blockScrollOnMount={'true'}
      hideCloseButton
      size={'lg'}
      h={!noHeight && '550px'}
    >
      <ModalOverlay bg="rgba(0,0,0,0.2)" {...overLayStyle} />
      <ModalContent
        px={'38px'}
        py={'15px'}
        shadow="lg"
        borderRadius="2xl"
        // boxShadow="0px 40px 80px -1px rgba(31, 91, 242, 0.27)"
        {...restModalProps}
      >
        {!hideCloseButton && <ModalCloseButton onClose={onClose} />}

        {children}
      </ModalContent>
    </Modal>
  );
};

const PopupHeader = ({children, modalStyle, displayCloseBtn, ...rest}) => {
  return (
    <HStack spacing="none" justify="space-between" w="full">
      <ModalHeader px={'0px'} flex="1" pb={'0px'} {...modalStyle}>
        <Text
          fontSize={'24px'}
          lineHeight={'30px'}
          fontWeight={'600'}
          textAlign="left"
          fontFamily={'Euclid Circular B'}
          {...rest}
        >
          {children}
        </Text>
      </ModalHeader>
      {displayCloseBtn ? <ModalCloseButton position="initial" /> : null}
    </HStack>
  );
};
const PopupFooter = ({stackStyle, children, ...rest}) => {
  return (
    <ModalFooter pb={'90px'} px={'0px'} {...rest}>
      <VStack w={'100%'} {...stackStyle}>
        {children}
      </VStack>
    </ModalFooter>
  );
};

const PopupDescription = ({children, ...rest}) => {
  return (
    <Text p={'0px'} mt={'5px'} fontSize={'14px'} fontWeight={'300'} {...rest}>
      {children}
    </Text>
  );
};

const PopupBody = ({children, stackStyle, ...rest}) => {
  return (
    <ModalBody pl={'0px'} my={'10px'} py={'5px'} {...rest}>
      <VStack {...stackStyle}>{children}</VStack>
    </ModalBody>
  );
};

Popup2.Body = PopupBody;
Popup2.Header = PopupHeader;
Popup2.Description = PopupDescription;
Popup2.Footer = PopupFooter;
