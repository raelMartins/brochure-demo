'use client';
import CreatePassword from '@/components/auth/create-password';
import CreateAnAccount from '@/components/auth/createAnAccount';
import InsertPhoneNumber from '@/components/auth/insertPhoneNumber';
import UserPersonalInfo from '@/components/auth/userPersonalInfo';
import VerifyEmail from '@/components/auth/verifyEmail';
import VerifyPhoneNumber from '@/components/auth/verifyPhoneNumber';
import HowDidYouHearAboutUs from '@/components/auth/HowDidYouHearAboutUs';
import {Stack, useToast} from '@chakra-ui/react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import React, {useState} from 'react';

import {AttemptLogin, outreach, registerUser} from '@/api/auth';
import Success from '@/components/auth/sucess';
import {useMutation} from 'react-query';
import {store_name} from '@/constants/routes';
import {toastForError} from '@/utils/toastForErrors';
import {CreateToast} from '@/ui-lib/ui-lib.hooks/createToast';
import {useRouter} from 'next/router';

export const UserRegistrationFlow = ({setAuthFlowScreen}) => {
  const [screen, setScreen] = useState('');
  // const searchParam = useSearchParams();
  // const ref_id = searchParam.get('ref_id');
  // const queryEmail = searchParam.get('email');
  const router = useRouter();
  const ref_id = router?.query?.ref_id;
  const queryEmail = router?.query?.email;

  // const toast = useToast();
  const toast = CreateToast();

  const storeName = store_name();

  const formSchema = Yup.object().shape({
    first_name: Yup.string().required('Please enter your First Name'),

    last_name: Yup.string().required('Please enter your Last Name'),
    gender: Yup.string().required('Please select a gender you identify as'),
    phone: Yup.string()
      .matches(
        /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[456789]\d{9}|(\d[ -]?){10}\d$/,
        'Please enter a valid phone number'
      )
      .required('Please enter a valid phone number'),
    email: Yup.string()
      .required('Please enter your Email address')
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid Email address'
      ),
  });

  const initialValues = {
    first_name: '',
    last_name: '',
    middle_name: '',
    phone: '',
    country: '1',
    gender: '',
    email: queryEmail || '',
    date_of_birth: '',
    password: '',
    outreach: '',
  };

  const formik = useFormik({
    initialValues,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: values => {
      mutate(values);
    },
    validationSchema: formSchema,
  });

  const email = formik.values.email;

  // login Mutation

  const successOnInitialLoginHandler = res => {
    if (res?.response?.data?.action == 'signup') {
    } else if (res?.data?.action == 'login') {
      setScreen('success for login');

      // return
    } else if (typeof res?.data === 'string') {
      router.push(`/auth/login?magic=${res?.data}`);
    } else {
      return toast({error: res, status: 'error', title: 'Oops...'});
    }
  };

  const loginForRegister = useMutation(
    formData => AttemptLogin(formData),

    {
      onError: err => {
        toast({error: err, status: 'error', title: 'Oops...'});
      },
    }
  );

  // register user mutation

  const {mutate, isLoading} = useMutation({
    mutationFn: formData => {
      return registerUser(formData);
    },
    onSuccess: res => {
      if (res?.status == 200) {
        if (ref_id) {
          return loginForRegister.mutate(
            {
              email,
              store_name: storeName,
            },
            {onSuccess: successOnInitialLoginHandler}
          );
        } else {
          setScreen('wDYHAM');
        }
      } else {
        toast({error: res, status: 'error', title: 'Oops...'});
      }
    },
    onError: err => {
      return toast({error: err, status: 'error', title: 'Oops...'});
    },
  });
  //outreach mutation
  const outreachMutation = useMutation({
    mutationFn: formData => {
      return outreach(formData);
    },
    onSuccess: res => {
      const payload = {
        email,
        store_name: storeName,
        ...(formik.values.password ? {password: formik.values.password} : {}),
      };

      return loginForRegister.mutate(payload, {
        onSuccess: successOnInitialLoginHandler,
      });
    },
    onError: error => {
      return toast({error: error, status: 'error'});
    },
  });

  const handleScreen = scrn => () => {
    setScreen(scrn);
  };

  const handleRegistration = password => {
    const {outreach, ...formData} = formik.values;
    const payload = {
      store_name: storeName,
      email,
      ...formData,
      password,
      ...(ref_id ? {ref_id} : {}),
    };
    mutate(payload);
  };

  const handleOutreach = outreachObj => {
    const payload = {
      ...outreachObj,
      store_name: storeName,
      email,
    };
    return outreachMutation.mutate(payload);
  };

  const handlResend = () => {
    const payload = {
      email,
      store_name: storeName,
    };
    return loginForRegister.mutate(payload, {
      onSuccess: () =>
        toast({
          description: `Link sent successfully`,
          status: 'success',
        }),
    });
  };
  const callLogin = () => {
    const payload = {
      email,
      store_name: storeName,
    };
    loginForRegister.mutate(payload, {onSuccess: successOnInitialLoginHandler});
  };

  // naweni5152@hostlace.com
  // cK8-6YA-2mj-Bxt

  // xihedig770@hostlace.com
  // pbkdf2_sha256$260000$6B6sNRohtUiyJrjvC9MRLy$BL7O++Sjf1ySxG5Zm7nJMPovYwCqVTdOU3Jy12+Nr8I=

  const routeBack = () => {
    setAuthFlowScreen('');
    return router.push('?');
  };
  const handleSwitch = scrn => () => {
    return setScreen(scrn);
  };
  const displayAccountCreationScreens = scrn => {
    switch (scrn) {
      case 'create an account':
        return (
          <CreateAnAccount handleSwitch={routeBack} formik={formik} handleScreen={handleScreen} />
        );

      case 'verify email':
        return (
          <VerifyEmail
            handlResend={callLogin}
            handleSwitch={handleSwitch('create an account')}
            email={formik.values.email}
            handleScreen={() => setScreen('insert phone number')}
          />
        );

      case 'insert phone number':
        return (
          <InsertPhoneNumber
            handleSwitch={handleSwitch('verify email')}
            formik={formik}
            handleScreen={handleScreen}
          />
        );
      case 'verify phone number':
        return (
          <VerifyPhoneNumber
            handleSwitch={handleSwitch('insert phone number')}
            phone={formik.values.phone}
            country={formik.values.country}
            handleScreen={setScreen}
          />
        );
      case 'personal info':
        return (
          <UserPersonalInfo
            handleSwitch={handleSwitch('verify phone number')}
            formik={formik}
            handleScreen={setScreen}
          />
        );
      case 'create password':
        return (
          <CreatePassword
            handleSwitch={handleSwitch('personal info')}
            mainFormik={formik}
            isLoading={isLoading}
            handleScreen={handleRegistration}
          />
        );
      case 'wDYHAM':
        return (
          <HowDidYouHearAboutUs
            handleSwitch={handleSwitch('create password')}
            handleScreen={handleOutreach}
            isLoading={outreachMutation.isLoading}
          />
        );
      case 'success for login':
        return (
          <Success
            handleSwitch={handleSwitch('create an account')}
            isSuccess={loginForRegister.isSuccess}
            resendLink={handlResend}
            email={email}
          />
        );

      default:
        return (
          <CreateAnAccount handleSwitch={routeBack} formik={formik} handleScreen={handleScreen} />
        );
    }
  };

  return displayAccountCreationScreens(screen);
};
