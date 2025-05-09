import {
  Box,
  Button,
  HStack,
  Image,
  Modal,
  ModalContent,
  Stack,
  Text,
  useTheme,
  useToast,
} from '@chakra-ui/react';
import validateAssetIcon from '/src/images/icons/validateAssets.svg';
import {useLightenHex} from '@/utils/lightenColorShade';
import {useMutation} from 'react-query';
import {PostForCustomerEquityValidationoOrDispute} from '@/api/listing';
import {useRouter} from 'next/navigation';
import {toastForError} from '@/utils/toastForErrors';
import {ValidateIcon} from '@/components/assets/ValidateIcon';

export const ValidateEquity = ({validateModal, validation_requestsId}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary?.color;
  const {lightenHex} = useLightenHex(primaryColor);
  const toast = useToast();
  const router = useRouter();

  const validateEquity = useMutation(
    formData => PostForCustomerEquityValidationoOrDispute(formData),
    {
      onSuccess: async res => {
        toast({
          title: `Thank you for the feedback`,
          description: `We'll get back to you as soon as possible.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        setTimeout(() => {
          router.push('/');
        }, 5000);
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  const handleValidation = () => {
    const obj = {
      action: 'accept',
      validation_request_id: validation_requestsId,
    };

    return validateEquity.mutate(obj);
  };

  return (
    <Modal isOpen={validateModal.isOpen} onClose={validateModal.onClose}>
      <ModalContent
        position={`fixed`}
        left={`20px`}
        bottom={`20px`}
        margin={`0px !important`}
        boxShadow="0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03) !important"
        p="24px"
        rounded="4px"
        bg="background.1"
        border="1px solid"
        borderColor={lightenHex(80)}
        h="full"
        maxH="132px"
        w="full"
        maxW="545px"
      >
        <HStack align="start" spacing="24px">
          <ValidateIcon />
          <Stack spacing="12px" w="full">
            <Box>
              <Text fontWeight={500} fontSize={{base: '16px', lg: '20px'}} color="text.3">
                Are you sure?
              </Text>
              <Text color="text_two" fontSize={14}>
                Kindly review all the important details thoroughly.
              </Text>
            </Box>
            <HStack justify="end">
              <Button
                as={Text}
                bg="none"
                w="max-content"
                fontWeight={400}
                onClick={validateModal.onClose}
                color="text.3"
              >
                Cancel
              </Button>
              <Button
                as={Text}
                bg="none"
                w="max-content"
                fontWeight={400}
                isDisabled={validateEquity?.isLoading}
                onClick={handleValidation}
                color="custom_color.color_pop"
              >
                Validate
              </Button>
            </HStack>
          </Stack>
        </HStack>
      </ModalContent>
    </Modal>
  );
};
