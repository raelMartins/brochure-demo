import {
  AbsoluteCenter,
  Box,
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
import {useEffect, useState} from 'react';

import axios from 'axios';
import {BUSINESS_ID, BaseURL_ONE} from '@/constants/routes';
import {CallIcon} from '../assets/callIcon';
import {toastForError} from '@/utils/toastForErrors';
import {useMutation} from 'react-query';
import LeftAngledArrow from '../assets/leftAngledArrow';
import {PHONEPREFIX} from '../constants/settings/phoneprefix';
import {CreateToast} from '@/ui-lib/ui-lib.hooks/createToast';
import {Button} from '@/ui-lib/ui-lib.components/Button';

const inputStyles = {
  fontSize: '32px',
  color: 'matador_text.500',
  fontWeight: '500',
  border: '1px solid',
  borderColor: `matador_border_color`,
  borderRadius: '16px',

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
const DEFAULTIMER = 30;
const VerifyPhoneNumber = ({handleScreen, handleSwitch, country, phone}) => {
  const [OTP, setOTP] = useState(null);
  const [shouldCount, setShouldCount] = useState(false);
  const [shouldDisplayResendCode, setShouldDisplayResendCode] = useState(false);
  const [shouldCountForCall, setShouldCountForCall] = useState(false);

  const [count, setCount] = useState(30);
  const [countForCall, setCountForCall] = useState(30);

  const business_id = BUSINESS_ID();

  // const toast = useToast();
  const toast = CreateToast();

  const handleResendCodeDisplay = () => {
    return shouldDisplayResendCode
      ? null
      : setTimeout(() => setShouldDisplayResendCode(true), DEFAULTIMER * 1000);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {
      phone,
      phone_verification_code: OTP,
      business_id,
    };

    mutation.mutate(payload);
  };

  const mutation = useMutation(
    formData => {
      return axios.post(`${BaseURL_ONE}/user/verify_totp_phone`, formData);
    },
    {
      onSuccess: res => {
        handleScreen('personal info');
      },
      onError: err => {
        toast({error: err, status: 'error', title: 'Oops...'});
      },
    }
  );

  const sendOTPMessageMutation = useMutation(
    () => {
      return axios.post(`${BaseURL_ONE}/user/create_totp_phone_developer`, {
        country: country,
        business_id,
        'sign-up': true,
        phone,
      });
    },
    {
      onSuccess: res => {
        setShouldCount(true);
        handleResendCodeDisplay();
      },
      onError: err => {
        handleResendCodeDisplay();

        toast({error: err, status: 'error', title: 'Oops...'});
      },
    }
  );

  const callMutationForOtp = useMutation(
    () => {
      return axios.post(`${BaseURL_ONE}/user/voice_otp`, {
        country: country,
        business_id,
        'sign-up': true,
        phone,
      });
    },
    {
      onSuccess: res => {
        setShouldCountForCall(true);
        // toaster('You will receive a call OTP shortly. Please be ready to receive the call.');
      },
      onError: err => {
        toast({error: err, status: 'error', title: 'Oops...'});
      },
    }
  );

  useEffect(() => {
    let timer;

    if (shouldCount) {
      if (count < 1) {
        setShouldCount(false);
        setCount(DEFAULTIMER);
      } else {
        timer = setInterval(() => {
          setCount(prev => prev - 1);
        }, 1000);
      }
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldCount, count]);

  useEffect(() => {
    let timed;

    if (shouldCountForCall) {
      if (countForCall < 1) {
        setShouldCountForCall(false);
        setCountForCall(DEFAULTIMER);
      } else {
        timed = setInterval(() => {
          setCountForCall(prev => prev - 1);
        }, 1000);
      }
    } else {
      clearInterval(timed);
    }

    return () => clearInterval(timed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldCountForCall, countForCall]);

  useEffect(() => {
    sendOTPMessageMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isValid = OTP?.length == 6;
  const phoneNumber = `${PHONEPREFIX.find(item => item.id === country)?.code}${phone}`;
  return (
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
            VERIFY PHONE NUMBER
          </Heading>
        </HStack>
        <Text
          textAlign={{base: 'start', md: 'center'}}
          fontSize="16px"
          fontWeight="400"
          w={{base: 'full', md: '435px'}}
          color="matador_text.500"
        >
          Enter 6-digits code
        </Text>
      </Stack>
      <Stack w="full" as="form" onSubmit={handleSubmit} spacing={{base: '24px', md: '16px'}}>
        <HStack spacing="10px">
          <PinInput placeholder="0" value={OTP} onChange={val => setOTP(val)}>
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
            {phoneNumber}
          </Text>{' '}
        </Text>
        <Button
          variation={`primary`}
          isDisabled={!isValid}
          type="submit"
          isLoading={mutation.isLoading}
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
        {shouldDisplayResendCode ? (
          <Stack w="full" align="center" spacing="12px">
            <Text
              position={{base: 'fixed', md: 'initial'}}
              bottom="86px"
              left="0px"
              w="full"
              justify="center"
              fontSize="14px"
              color="matador_text.500"
              textAlign="center"
              fontWeight="400"
            >
              {shouldCountForCall ? '' : "Didn't get any Code ?"}
              <Box as="br" display={{base: 'initial', md: 'none'}} />
              <Box as="br" display={{base: 'initial', md: 'none'}} />
              <Text
                as="span"
                pos={{base: 'relative', md: 'initial'}}
                top="-10px"
                color={
                  shouldCount
                    ? '#333'
                    : shouldCountForCall
                    ? 'matador_border_color.100'
                    : 'custom_color.color_pop'
                }
                cursor={shouldCount || shouldCountForCall ? 'default' : 'pointer'}
                onClick={() =>
                  shouldCount || shouldCountForCall ? null : sendOTPMessageMutation.mutate()
                }
              >
                {' '}
                {shouldCount ? (
                  <>
                    {`resend in `}{' '}
                    <Text as="span" color="custom_color.color_pop">
                      {' '}
                      {`0:${count} Sec`}{' '}
                    </Text>
                  </>
                ) : (
                  `Resend Code `
                )}
                |
              </Text>{' '}
              <Text
                pos={{base: 'relative', md: 'initial'}}
                top="-10px"
                as="span"
                cursor={shouldCount || shouldCountForCall ? 'default' : 'pointer'}
                color={shouldCount ? 'matador_border_color.100' : 'custom_color.color_pop'}
                onClick={() =>
                  shouldCount || shouldCountForCall ? null : callMutationForOtp.mutate()
                }
              >
                {' '}
                {shouldCountForCall ? (
                  <>
                    {`didn't receive a call? retry in`}
                    <Text as="span" color="custom_color.color_pop">
                      {' '}
                      {`0:${countForCall} Sec`}
                    </Text>
                  </>
                ) : (
                  <HStack display="inline-flex">
                    <Text
                      as="span"
                      color={shouldCount ? 'matador_border_color.100' : 'custom_color.color_pop'}
                    >
                      {'Call me instead'}
                    </Text>
                    <CallIcon
                      baseColor={
                        shouldCount ? 'matador_border_color.100' : 'custom_color.color_pop'
                      }
                    />
                  </HStack>
                )}
              </Text>
            </Text>

            {/* <Text
              textAlign="center"
              fontSize="14px"
              fontWeight="400"
              color="#525252"
            >
              Didn&apos;t get any mail?{" "}
              <Text role="button" cursor="pointer" color="custom_color.color_pop" as="span">
                Resend Mail
              </Text>{" "}
            </Text> */}
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  );
};

export default VerifyPhoneNumber;
