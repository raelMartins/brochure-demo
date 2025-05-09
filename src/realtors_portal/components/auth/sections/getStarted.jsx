import React, {useState} from 'react';
import {Box, Flex, Heading, Stack, Text, useToast} from '@chakra-ui/react';
import {Button, FormInput} from '@/ui-lib';
import {agentLogin} from '@/realtors_portal/api/auth';
import {STORENAMEFROMDOMAIN} from '@/constants/routes';
import {useMutation} from 'react-query';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';

const storeName = STORENAMEFROMDOMAIN;
const GetStarted = ({onAuthClose, setPage, setEmail, ...rest}) => {
  const [checked, setChecked] = useState(false);

  const toast = useToast();
  const router = useRouter();

  const validateForm = values => {
    const errors = {};

    if (!values.email) errors.email = 'Please enter the email address';
    else if (!values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      errors.email = 'Please enter valid email address';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      mutate({
        email: values?.email,
        store_name: storeName,
      });
    },
    validateOnChange: true,
    validate: validateForm,
  });

  const {mutate, isLoading} = useMutation(formData => agentLogin(formData), {
    onSuccess: res => {
      if (
        res?.response?.data?.action == 'signup' ||
        res?.response?.data?.action == 'not_customer'
      ) {
        setEmail(formik.values.email);
        setPage('registerForm');
        // localStorage.removeItem('temp_register_email');
        // localStorage.setItem('temp_register_email', formik.values.email);
        // router.push('/agents/auth/register');
      } else if (res?.data?.action == 'login') {
        setPage('successLink');
        setEmail(formik.values.email);
      } else {
        return toast({
          title: `Oops...`,
          description: `${
            res?.response?.data?.message ??
            res?.response?.message ??
            res?.message ??
            'Something went wrong,we are working to resolve it'
          }`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    },
    onError: err => {
      const data = err?.response?.data;
      if (data?.action == 'signup' || data?.action == 'not_customer') {
        setEmail(formik.values.email);
        // localStorage.removeItem('temp_register_email');
        // localStorage.setItem('temp_register_email', formik.values.email);
        // router.push('/agents/auth/register');
        setPage('registerForm');
      } else if (data?.action == 'login') {
        setPage('successLink');
        setEmail(formik.values.email);
      } else {
        return toast({
          title: `Oops...`,
          description: `${data?.message || 'Something went wrong,we are working to resolve it'}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    },
  });

  const button_style = {
    padding: `13.5px 18px`,
    textTransform: 'capitalize',
    color: `text`,
    fontSize: `12px`,
    fontStyle: `normal`,
    fontWeight: `400`,
    lineHeight: `150%`,
    letterSpacing: `0.36px`,
    background: `transparent`,
    border: `1px solid`,
    width: `100%`,
  };

  return (
    <Box w={`100%`} {...rest}>
      <Flex h="full" direction="column" textAlign={{base: 'left', md: 'center'}}>
        <Heading fontSize="24px" fontWeight="600" fontFamily={`var(--font_montserrat)`}>
          Realtors Portal
        </Heading>
        <Stack w={`100%`} gap={{base: `24px`, md: `16px`}} mt={`8px`}>
          <Text color="matador_text.500" fontSize={{base: '13px', lg: '16px'}} lineHeight={`140%`}>
            Enter your email address
          </Text>
          <FormInput
            // mt="24px"
            type="email"
            name="email"
            id="email"
            lable={'Email address'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
            placeholder="Email Address"
            _placeholder={{fontSize: '13px'}}
            fontSize="16px"
            padding={{base: `12px 14px`, md: '14px 15px'}}
            height="100%"
            lineHeight="140%"
          />
          <Button variation={`primary`} onClick={formik.handleSubmit} isLoading={isLoading}>
            Proceed
          </Button>
          <Button
            variation={`tertiary`}
            _hover={{
              borderColor: 'custom_color.color_pop',
            }}
            onClick={() => router.push('/')}
          >
            Sign in as Client
          </Button>
        </Stack>
        {/* <Text color='text' textAlign={'center'} fontSize={'16px'} mt='12px'>
          Already have an account?{` `}
          <Link as='span' color="custom_color.color">
            Login
          </Link>
        </Text>
        <Text color='text' textAlign={'center'} fontSize={'16px'} mt='12px'>
          Are you an agent?{` `}
          <Link as='span' color="custom_color.color">
            Signup as an agent
          </Link>
        </Text> */}
      </Flex>
    </Box>
  );
};

export default GetStarted;
