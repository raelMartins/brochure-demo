import {Stack} from '@chakra-ui/react';
import UserSignInWithPassword from '../userSignInWithPassword';
import Success from '../sucess';
import UserLoginWithEmail from '../userLoginWithEmail';
import {useMutation} from 'react-query';
import {AttemptLogin} from '@/api/auth';
import {useFormik} from 'formik';
import {store_name} from '@/constants/routes';
import {useRouter} from 'next/router';
import {CreateToast} from '@/ui-lib/ui-lib.hooks/createToast';
import {useState} from 'react';
import {ForgotPasswordFlow} from './forgotPasswordFlow';
import {UserRegistrationFlow} from './registrationFlow';

export const AuthFlow = ({...rest}) => {
  const [screen, setScreen] = useState('');

  // const toast = useToast();
  const toast = CreateToast();

  const router = useRouter();
  const ref_id = router.query?.ref_id;

  const storeName = store_name();

  const validateForm = values => {
    const errors = {};

    if (!values.email?.trim()) errors.email = 'Please enter the email address';
    else if (!values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      errors.email = 'Please enter valid email address';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      const payload = {
        email: values?.email,
        store_name: storeName,
        ...(values.password ? {password: values.password} : {}),
      };
      mutation.mutate(payload, {
        onSuccess: res => {
          if (
            res?.response?.data?.action == 'signup' ||
            res?.response?.data?.action == 'not_customer'
          ) {
            setScreen('user_registration');
            router.push(
              `?screen=register&email=${formik.values.email}${ref_id ? `&ref_id=${ref_id}` : ''}`
            );
          } else if (res?.data?.action == 'login') {
            setScreen('success');
          } else if (typeof res?.data === 'string') {
            router.push(`/auth/login?magic=${res?.data}`);
          } else {
            return toast({status: 'error', error: res, title: 'Oops...'});
          }
        },
      });
    },
    validateOnChange: true,
    validateOnMount: true,
    validate: validateForm,
  });
  const email = formik.values.email;

  const mutation = useMutation(formData => AttemptLogin(formData), {
    onError: err => {
      const data = err?.response?.data;
      if (data?.action == 'signup' || data?.action == 'not_customer') {
        setScreen('user_registration');
        router.push(
          `?screen=register&email=${formik.values.email}${ref_id ? `&ref_id=${ref_id}` : ''}`
        );
      } else if (data?.action == 'login') {
        setScreen('success');
      } else {
        return toast({status: 'error', error: err, title: 'Oops...'});
      }
    },
  });

  const handlResend = () => {
    const payload = {
      email: email,
      store_name: storeName,
    };
    return mutation.mutate(payload, {
      onSuccess: () =>
        toast({
          description: `Link sent successfully`,
          status: 'success',
        }),
    });
  };

  const handleScreen = scrn => () => {
    setScreen(scrn);
  };

  const disPlaySignInScreens = scrn => {
    switch (scrn) {
      case 'sign in with password':
        return (
          <UserSignInWithPassword
            isLoading={mutation.isLoading}
            formik={formik}
            handleScreen={setScreen}
          />
        );

      case 'sign in with email':
        return (
          <UserLoginWithEmail
            isLoading={mutation.isLoading}
            formik={formik}
            handleScreen={setScreen}
          />
        );

      case 'success':
        return (
          <Success
            handleSwitch={() => setScreen('sign in with email')}
            resendLink={handlResend}
            email={email}
          />
        );
      case 'forgot_password':
        return <ForgotPasswordFlow setAuthFlowScreen={setScreen} />;
      case 'user_registration':
        return <UserRegistrationFlow setAuthFlowScreen={setScreen} />;

      default:
        return (
          <UserSignInWithPassword
            isLoading={mutation.isLoading}
            formik={formik}
            handleScreen={setScreen}
          />
        );
    }
  };

  return (
    <Stack
      w={{base: `90%`, md: `600px`}}
      mx={`auto`}
      alignItems="stretch"
      px={{base: '24px', md: '100px'}}
      py={{base: '24px', md: '50px'}}
      bg={{base: 'matador_background.100', lg: 'matador_background.200'}}
      color={`text`}
      zIndex={`3`}
      {...rest}
    >
      {disPlaySignInScreens(screen)}
    </Stack>
  );
};
