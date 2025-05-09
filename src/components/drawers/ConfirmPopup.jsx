import {Box, Button, HStack, Modal, ModalContent, Stack, Text} from '@chakra-ui/react';
import {ValidateIcon} from '@/components/assets/ValidateIcon';

export const ConfirmPopup = ({value, disclosure, isLoading, handleProceed}) => {
  const handleConfirm = () => {
    handleProceed();
    disclosure.onClose();
  };

  return (
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      <ModalContent
        position={`fixed`}
        left={`20px`}
        bottom={`20px`}
        margin={`0px !important`}
        boxShadow="0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03) !important"
        p="24px"
        rounded="4px"
        bg="matador_background.200"
        border="1px solid"
        borderColor={`custom_color.opacity_pop._20`}
        h="full"
        maxH="132px"
        w="full"
        maxW="545px"
      >
        <HStack align="start" spacing="24px">
          <ValidateIcon />
          <Stack spacing="12px" w="full">
            <Box>
              <Text fontWeight={500} fontSize={{base: '16px', lg: '20px'}} color="matador_text.300">
                Are you sure {value ? `you want ` : null}
                {value && (
                  <Text as="span" fontWeight={700}>
                    {value}
                  </Text>
                )}
                ?
              </Text>
              <Text color="matador_text.200" fontSize={14}>
                Kindly review all the important details thoroughly.
              </Text>
            </Box>
            <HStack justify="end">
              <Button
                as={Text}
                bg="none"
                w="max-content"
                fontWeight={400}
                onClick={disclosure.onClose}
                color="matador_text.300"
              >
                Cancel
              </Button>
              <Button
                as={Text}
                bg="none"
                w="max-content"
                fontWeight={500}
                isDisabled={isLoading}
                onClick={handleConfirm}
                color="custom_color.color_pop"
              >
                Yes, Proceed
              </Button>
            </HStack>
          </Stack>
        </HStack>
      </ModalContent>
    </Modal>
  );
};
