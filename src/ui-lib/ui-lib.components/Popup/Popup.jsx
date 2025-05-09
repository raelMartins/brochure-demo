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
  ModalBody,
} from '@chakra-ui/react';

export const Popup = ({
  isOpen,
  size,
  onClose,
  hideCloseBtn,
  closeOnOverlayClick,
  children,
  overlayStyle,
  forModal,
  forBody,
  hideOverlay,
  ...restModalProps
}) => {
  const bg = useColorModeValue('#4545FE.80', 'gray.800');

  return (
    <Modal
      closeOnOverlayClick={closeOnOverlayClick ?? true}
      scrollBehavior="inside"
      isCentered
      size={size}
      motionPreset="slideInBottom"
      {...(forModal ? forModal : {})}
      isOpen={isOpen}
      onClose={onClose}
      style={{background: 'red'}}
    >
      {hideOverlay ? null : <ModalOverlay bg="rgba(0,0,0,0.2)" {...overlayStyle} />}
      <ModalContent
        px={4}
        pb={6}
        pt={8}
        shadow="lg"
        bgColor={bg}
        borderRadius="2xl"
        minW={{md: '400px'}}
        maxW={{base: '90%', md: '400px'}}
        {...restModalProps}
      >
        {hideCloseBtn ? null : <ModalCloseButton onClose={onClose} />}
        <ModalBody m="0px" p="0px" {...(forBody ? forBody : {})}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const PopupHeader = ({children, ...rest}) => {
  return (
    <ModalHeader p={0} {...rest}>
      <Text textStyle="h2" textAlign="left" pb={0}>
        {children}
      </Text>
    </ModalHeader>
  );
};

const PopupDescription = ({children, ...rest}) => {
  return (
    <Text textStyle="p" {...rest}>
      {children}
    </Text>
  );
};

const PopupBody = ({children, ...rest}) => {
  return (
    <VStack w="full" my={4} {...rest}>
      {children}
    </VStack>
  );
};

Popup.Body = PopupBody;
Popup.Header = PopupHeader;
Popup.Description = PopupDescription;
