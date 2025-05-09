import {Box, Button, HStack, Modal, ModalContent, Stack, Text} from '@chakra-ui/react';
import {ValidateIcon} from '@/components/assets/ValidateIcon';

const ConfirmSelection = ({allocationVal, confirmationModal, mutation, handleSubmitAllocation}) => {
  const handleConfirm = () => {
    handleSubmitAllocation();
    confirmationModal.onClose();
  };

  return (
    <Modal isOpen={confirmationModal.isOpen} onClose={confirmationModal.onClose}>
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
                Are you sure you want{' '}
                <Text as="span" fontWeight={700}>
                  {allocationVal}
                </Text>
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
                onClick={confirmationModal.onClose}
                color="matador_text.300"
              >
                Cancel
              </Button>
              <Button
                as={Text}
                bg="none"
                w="max-content"
                fontWeight={500}
                isDisabled={mutation?.isLoading}
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

export default ConfirmSelection;
