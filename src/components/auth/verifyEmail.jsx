import {BUSINESS_ID, BaseURL_ONE} from '@/constants/routes';
import {toastForError} from '@/utils/toastForErrors';
import {
  AbsoluteCenter,
  Center,
  HStack,
  Heading,
  Input,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import {useMutation} from 'react-query';
import axios from 'axios';
import {useEffect, useState} from 'react';
import LeftAngledArrow from '../assets/leftAngledArrow';
import {useRouter} from 'next/navigation';
import {CreateToast} from '@/ui-lib/ui-lib.hooks/createToast';
import {Button} from '@/ui-lib/ui-lib.components/Button';

const inputStyles = {
  fontSize: '32px',
  color: 'matador_text.500',
  fontWeight: '500',
  border: '1px solid',
  borderColor: `matador_border_color.100`,
  borderRadius: '16px',
  // w: "60px",
  // h: "60px",
  w: {base: 'full', md: '60px'},

  h: {base: 'auto', md: '60px'},
  textAlign: 'center',
  _focusVisible: {
    outline: 'none',
  },
  _placeholder: {
    color: 'matador_form.label',
  },
};

const VerifyEmail = ({handleScreen, handlResend, handleSwitch, forForgotPassword, email}) => {
  const [emailOTP, setEmailOTP] = useState('');
  // const toast = useToast();
  const toast = CreateToast();

  const router = useRouter();
  const business_id = BUSINESS_ID();

  const mutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/verify_totp_email`, formData);
    },
    {
      onSuccess: res => {
        handleScreen();
      },
      onError: error => {
        toast({error});
      },
    }
  );

  mutation.isSuccess ? handleScreen() : null;

  const sendOTPMutation = useMutation(
    payload => {
      return axios.post(`${BaseURL_ONE}/user/create_totp_email_extended`, payload);
    },

    {
      onError: error => {
        if (
          error.response?.data?.message === 'Email already belongs to a user' &&
          !forForgotPassword
        ) {
          return router.push('login');
        } else if (
          error.response?.data?.message === 'Customer does not exist' ||
          error.response?.data?.message === 'Email already belongs to a user'
        ) {
          const switchHandler = () => handleSwitch();
          setTimeout(
            () => switchHandler(),

            500
          );
        }
        return toast({error, status: 'error', title: 'Oops...'});
      },
    }
  );

  useEffect(() => {
    const payload = {
      email: email,
      business_id,
      ...(forForgotPassword ? {} : {'sign-up': true}),
    };
    sendOTPMutation.mutate(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerify = e => {
    e.preventDefault();

    return mutation.mutate({
      email: email,
      email_verification_code: emailOTP,
      business_id,
    });
  };

  const resendOtp = () => {
    const payload = {
      email: email,
      business_id,
      ...(forForgotPassword ? {} : {'sign-up': true}),
    };
    return sendOTPMutation.mutate(payload, {
      onSuccess: () =>
        toast({
          description: `Otp sent successfully`,
          status: 'success',
        }),
    });
  };

  const isValid = emailOTP?.length == 6;
  return (
    <Center>
      <Stack
        spacing={{base: '36.97px', md: '26.67px'}}
        w="full"
        pt={{base: '0px', md: '62px'}}
        pb="30px"
        maxW="533.333px"
      >
        <Stack spacing="5.33px">
          <HStack alignSelf={{base: 'start', md: 'center'}} spacing="8px">
            <Heading
              textAlign={{base: 'start', md: 'center'}}
              fontSize="24px"
              fontWeight="600"
              fontFamily={`var(--font_montserrat)`}
            >
              VERIFY E-MAIL ADDRESS
            </Heading>
          </HStack>
          <Text
            textAlign={{base: 'start', md: 'center'}}
            fontSize="16px"
            fontWeight="400"
            color="matador_text.500"
          >
            Enter 6-digits code
          </Text>
        </Stack>
        <Stack w="full" as="form" onSubmit={handleVerify} spacing={{base: '24px', md: '16px'}}>
          <HStack spacing="10px">
            <PinInput value={emailOTP} onChange={value => setEmailOTP(value)} placeholder="0">
              <PinInputField {...inputStyles} />
              <PinInputField {...inputStyles} />
              <PinInputField {...inputStyles} />
              <Text color="matador_text.300" fontSize="32px" fontWeight="500">
                -
              </Text>
              <PinInputField {...inputStyles} />
              <PinInputField {...inputStyles} />
              <PinInputField {...inputStyles} />
            </PinInput>
          </HStack>
          <Text
            maxW="502px"
            textAlign="center"
            fontSize="14px"
            fontWeight="400"
            color="matador_text.500"
          >
            Please enter the verification code we sent to{' '}
            <Text color="custom_color.color_pop" as="span">
              {email}
            </Text>{' '}
          </Text>
          <Button
            variation={`primary`}
            isDisabled={!isValid}
            isLoading={mutation.isLoading}
            type="submit"
          >
            Proceed
          </Button>
          <Button
            variation={`tertiary`}
            _hover={{
              borderColor: 'custom_color.color_pop',
            }}
            onClick={handleSwitch}
          >
            Go Back
          </Button>

          <Text
            position={{base: 'fixed', md: 'initial'}}
            bottom="96px"
            left="0px"
            w="full"
            justify="center"
            textAlign="center"
            fontSize="14px"
            fontWeight="400"
            color="matador_text.500"
          >
            Didn&apos;t get any mail?{' '}
            <Text
              onClick={resendOtp}
              role="button"
              cursor="pointer"
              color="custom_color.color_pop"
              as="span"
            >
              Resend Mail
            </Text>{' '}
          </Text>
        </Stack>
      </Stack>
    </Center>
  );
};

export default VerifyEmail;
