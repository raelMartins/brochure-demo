import {
  Box,
  Center,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import StateOfPswrdIcon from '../assets/stateOfPswrdIcon';
import ClosedEyeIcon from '../assets/closedEyeIcon';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';
import LeftAngledArrow from '../assets/leftAngledArrow';
import {Button} from '@/ui-lib/ui-lib.components/Button';

const CreatePassword = ({handleScreen, handleSwitch, forResetPwd, isLoading, mainFormik}) => {
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    upperCase: false,
    specialCharacter: false,
    number: false,
  });
  const eyeForCnPwd = useDisclosure();
  const eye = useDisclosure();

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9]).{8,}$/,
          'Password must include at least one uppercase letter, one special character (!+,-/:;<+>?@), and one number'
        ),
      confirmPassword: Yup.string()
        .required('')
        .oneOf([Yup.ref('password'), null], 'Both Password entries must be identical.'),
    }),
    onSubmit: values => {
      mainFormik.setFieldValue('password', values.password);

      handleScreen(values.password);
    },
  });

  const handlePasswordChange = event => {
    formik.handleChange(event);
    const name = event.target.name;
    const password = event.target.value;
    formik.touched[name] ? null : formik.setFieldTouched(name, true);

    // Update password validation states
    setPasswordValidations(prev => ({
      ...(name === 'confirmPassword'
        ? {...prev, confirmPassword: password === formik.values.password}
        : {
            minLength: password.length >= 8,
            upperCase: /[A-Z]/.test(password),
            specialCharacter: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
            number: /[0-9]/.test(password),
          }),
    }));
  };

  const canDisplayErrorIcon =
    (!passwordValidations.minLength ||
      !passwordValidations.upperCase ||
      !passwordValidations.specialCharacter ||
      !passwordValidations.number) &&
    formik.touched.password;

  return (
    <Stack
      spacing={{base: '27.93px', md: '26.67px'}}
      w="full"
      pt={{base: '0px', md: '62px'}}
      pb="30px"
      borderRadius="4px"
      maxW="533.333px"
    >
      <HStack alignSelf={{base: 'start', md: 'center'}} spacing="8px">
        <Heading
          textAlign={{base: 'start', md: 'center'}}
          fontSize="24px"
          fontWeight="600"
          fontFamily={`var(--font_montserrat)`}
        >
          CREATE NEW PASSWORD
        </Heading>
      </HStack>
      <Stack w="full" as="form" onSubmit={formik.handleSubmit} spacing={{base: '24px', md: '20px'}}>
        <Stack w="full" spacing={{base: '8px', md: '20px'}}>
          <InputGroup>
            <Input
              type={eye.isOpen ? 'text.1' : 'password'}
              w="430px"
              id="password"
              name="password"
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChange={handlePasswordChange}
              h={{base: '60px'}}
              fontSize="16px"
              fontWeight="400"
              _focus={{
                boxShadow: 'transparent',
                outline: 'none',
              }}
              _active={{
                boxShadow: 'transparent',
                outline: 'none',
              }}
              _focusVisible={{
                boxShadow: 'transparent',
                outline: 'none',
              }}
              p="13.333px 18.667px"
              pr="80px"
              border="1px solid"
              borderColor={`matador_border_color.100`}
              borderRadius="24px"
              placeholder="Create New Password"
              _placeholder={{
                color: 'matador_text.300',
                opacity: `1`,
              }}
            />
            <InputRightElement h={{base: '60px'}} mr="18.667px">
              <HStack spacing="11px">
                <ClosedEyeIcon cursor="pointer" onClick={eye.onToggle} isOpen={eye.isOpen} />
                {canDisplayErrorIcon ? <StateOfPswrdIcon /> : null}
              </HStack>
            </InputRightElement>
          </InputGroup>
          <Stack w="full" spacing="12px">
            <Text fontSize="14px" fontWeight="500" color="matador_text.300">
              Please make sure to use a secure password with
            </Text>
            <Stack spacing="10px">
              <HStack w="full" color={`matador_text.300`}>
                <StateOfPswrdIcon
                  cancelFillColor={!formik.touched.password ? '#737373' : '#D92D20'}
                  isOpen={passwordValidations.minLength}
                />
                <Text
                  fontSize="14px"
                  fontWeight="400"
                  color={
                    !formik.touched.password
                      ? 'matador_text.300'
                      : formik.touched.password && passwordValidations.minLength
                      ? '#12B76A'
                      : '#F04438'
                  }
                >
                  at least 8 characters
                </Text>
              </HStack>
              <HStack w="full">
                <StateOfPswrdIcon
                  cancelFillColor={!formik.touched.password ? '#737373' : '#D92D20'}
                  isOpen={passwordValidations.upperCase}
                />
                <Text
                  fontSize="14px"
                  fontWeight="400"
                  color={
                    !formik.touched.password
                      ? 'matador_text.300'
                      : formik.touched.password && passwordValidations.upperCase
                      ? '#12B76A'
                      : '#F04438'
                  }
                >
                  at least one upper case letter
                </Text>
              </HStack>
              <HStack w="full">
                <StateOfPswrdIcon
                  cancelFillColor={!formik.touched.password ? '#737373' : '#D92D20'}
                  isOpen={passwordValidations.specialCharacter}
                />
                <Text
                  fontSize="14px"
                  fontWeight="400"
                  color={
                    !formik.touched.password
                      ? 'matador_text.300'
                      : formik.touched.password && passwordValidations.specialCharacter
                      ? '#12B76A'
                      : '#F04438'
                  }
                >
                  at least one special character {'(!+,-/:;<+>?@)'}
                </Text>
              </HStack>
              <HStack w="full">
                <StateOfPswrdIcon
                  cancelFillColor={!formik.touched.password ? '#737373' : '#D92D20'}
                  isOpen={passwordValidations.number}
                />
                <Text
                  fontSize="14px"
                  fontWeight="400"
                  color={
                    !formik.touched.password
                      ? 'matador_text.300'
                      : formik.touched.password && passwordValidations.number
                      ? '#12B76A'
                      : '#F04438'
                  }
                >
                  at least one number
                </Text>
              </HStack>
            </Stack>
          </Stack>
        </Stack>
        <InputGroup>
          <Input
            type={eyeForCnPwd.isOpen ? 'text.1' : 'password'}
            w="full"
            id="confirmPassword"
            name="confirmPassword"
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            onChange={handlePasswordChange}
            h={{base: '60px'}}
            fontSize="16px"
            fontWeight="400"
            _focus={{
              boxShadow: 'transparent',
              outline: 'none',
            }}
            _active={{
              boxShadow: 'transparent',
              outline: 'none',
            }}
            _focusVisible={{
              boxShadow: 'transparent',
              outline: 'none',
            }}
            p="13.333px 18.667px"
            border="1px solid"
            borderColor={'matador_border_color.100'}
            borderRadius="24px"
            placeholder="Confirm New Password"
            _placeholder={{
              color: 'matador_text.300',
              opacity: `1`,
            }}
          />
          <InputRightElement
            cursor="pointer"
            onClick={eyeForCnPwd.onToggle}
            h={{base: '60px'}}
            mr="18.667px"
          >
            <ClosedEyeIcon
              cursor="pointer"
              onClick={eyeForCnPwd.onToggle}
              isOpen={eyeForCnPwd.isOpen}
            />
          </InputRightElement>
        </InputGroup>
        <Text mt="-15px" fontSize="12px" color="#F4B0A1" fontWeight="400">
          {formik.touched.confirmPassword && formik.errors.confirmPassword}
        </Text>
        <Button
          variation={`primary`}
          // isDisabled={true}
          isLoading={isLoading}
          type={`submit`}
          _hover={{
            bg: '#E35B00',
          }}
          _active={{
            bg: '#E35B00',
          }}
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
      </Stack>
    </Stack>
  );
};

export default CreatePassword;
