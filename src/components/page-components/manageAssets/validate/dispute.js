import {PostForCustomerEquityValidationoOrDispute} from '@/api/listing';
import {toastForError} from '@/utils/toastForErrors';
import {Button, Stack, Text, Textarea, useToast} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {useMutation} from 'react-query';

export const DisputeCustomerEquity = ({
  setScreen,
  customScrollbarStyles,
  validation_requestsId,
}) => {
  const [message, setMessage] = useState('');
  const toast = useToast();
  const router = useRouter();

  const disputeEquity = useMutation(
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

  const handleDispute = () => {
    const obj = {
      action: 'reject',
      reason: message,
      validation_request_id: validation_requestsId,
    };
    return disputeEquity.mutate(obj);
  };

  const handleMessage = e => {
    return setMessage(e.target.value);
  };

  const isValid = !!message.trim();
  return (
    <Stack spacing="20px">
      <Text lineHeight="21px" color="text.3">
        Oops! It looks like there might be a mix-up. Could you please share more details about
        what&apos;s going on below? We&apos;re here to help!
      </Text>
      <Textarea
        value={message}
        h="200px"
        placeholder="Tell us about this issue"
        p="18px"
        boxShadow="0px 1.333px 2.667px 0px rgba(16, 24, 40, 0.05)"
        rounded="12px"
        border="1px solid"
        borderColor="border.1"
        _focus={{
          outline: 'none',
          borderColor: 'border.1',
        }}
        resize="none"
        onChange={e => handleMessage(e)}
      />
      <Stack w="full" justify="space-between" direction={{base: 'column', lg: 'row'}} gap="20px">
        <Button
          w="full"
          p="20.25px 27px"
          fontWeight={400}
          rounded="full"
          h="60px"
          border="1px solid"
          borderColor="border.1"
          bg="none"
          boxShadow="0px 1.5px 3px 0px rgba(16, 24, 40, 0.05)"
          onClick={() => setScreen('')}
        >
          No, Go Back
        </Button>
        <Button
          w="full"
          p="20.25px 27px"
          bg="custom_color.color_pop"
          color="#FFF"
          fontWeight={400}
          rounded="full"
          h="60px"
          order={{base: -1, lg: 0}}
          onClick={handleDispute}
          isDisabled={!isValid}
          _hover={{
            background: '',
          }}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};
