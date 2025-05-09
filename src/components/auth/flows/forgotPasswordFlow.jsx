'use client';

import CreatePassword from '@/components/auth/create-password';
import ResetPassword from '@/components/auth/resetPassword';
import VerifyEmail from '@/components/auth/verifyEmail';
import {Stack, useToast} from '@chakra-ui/react';
import {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {toastForError} from '@/utils/toastForErrors';
import {useMutation} from 'react-query';
import {resetPassword} from '@/api/auth';
import {BUSINESS_ID} from '@/constants/routes';
import {CreateToast} from '@/ui-lib/ui-lib.hooks/createToast';
import {useRouter} from 'next/router';

export const ForgotPasswordFlow = ({setAuthFlowScreen}) => {
  const [screen, setScreen] = useState('');
  const router = useRouter();
  // const toast = useToast();
  const toast = CreateToast();
  const business_id = BUSINESS_ID();
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required('Please enter your Email address')
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid Email address'
      ),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,

    validationSchema: formSchema,
  });
  const handleScreen = scrn => () => {
    setScreen(scrn);
  };

  const {mutate, isLoading} = useMutation(formData => resetPassword(formData), {
    onSuccess: () => {
      toast({description: 'Password reset successfully', status: 'success'});
      router.push('login');
    },
    onError: error => {
      return toast({error, title: 'Oops...', status: 'error'});
    },
  });
  const handleResetPassword = password => {
    const {email} = formik.values;
    const payload = {
      email,
      password,
      business_id,
      'forget-password': true,
    };

    mutate(payload);
  };
  const routeBack = () => {
    setAuthFlowScreen('');
    return router.push('?');
  };
  const handleSwitch = scrn => () => {
    return setScreen(scrn);
  };
  const displayResetPasswordScreens = scrn => {
    switch (scrn) {
      case 'reset password':
        return (
          <ResetPassword handleSwitch={routeBack} formik={formik} handleScreen={handleScreen} />
        );

      case 'verify email':
        return (
          <VerifyEmail
            forForgotPassword
            handleSwitch={handleSwitch('resetPassword')}
            email={formik.values.email}
            handleScreen={() => setScreen('create password')}
          />
        );

      case 'create password':
        return (
          <CreatePassword
            handleSwitch={handleSwitch('verify email')}
            mainFormik={formik}
            handleScreen={handleResetPassword}
            isLoading={isLoading}
            forResetPwd
          />
        );

      default:
        return (
          <ResetPassword handleSwitch={routeBack} formik={formik} handleScreen={handleScreen} />
        );
    }
  };

  return displayResetPasswordScreens(screen);
};
