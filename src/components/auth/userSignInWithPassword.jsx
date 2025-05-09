import {Center, HStack, Heading, Stack, Text, useDisclosure} from '@chakra-ui/react';
import ClosedEyeIcon from '../assets/closedEyeIcon';
import {useCustomerAuthContext} from '@/utils/auth/customerAuthContext';
import useLocalStorage from '@/ui-lib/ui-lib.hooks/useLocalStorage';
import Link from 'next/link';
import {Button} from '@/ui-lib/ui-lib.components/Button';
import {FormInput} from '@/ui-lib';

const UserSignInWithPassword = ({handleScreen, isLoading, formik}) => {
  const {onToggle, isOpen} = useDisclosure();
  const eye = useDisclosure();
  const {TERMS, PRIVACY_POLICY} = useCustomerAuthContext();

  const [storeInfo] = useLocalStorage('storeThemeInfo');
  const isAgentActive = storeInfo?.agentActive;

  const handleSwitch = () => {
    handleScreen('sign in with email');
    formik.resetForm();
  };

  const isValid = !!formik.values.password.trim() && !formik.errors.email;

  return (
    <Center alignItems={{base: 'start', md: 'initial'}}>
      <Stack
        borderRadius="4px"
        spacing={{base: '27px', md: '30px'}}
        w="full"
        pb="29px"
        position="relative"
        zIndex={1}
        maxW="600px"
      >
        <Heading
          textAlign={{base: 'start', md: 'center'}}
          fontSize="24px"
          fontWeight="600"
          fontFamily={`var(--font_montserrat)`}
        >
          SIGN IN
        </Heading>
        <Stack
          w="full"
          as="form"
          onSubmit={formik.handleSubmit}
          spacing={{base: '16px', md: '22.5px'}}
        >
          <FormInput
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your email"
          />
          <FormInput
            type={eye.isOpen ? 'text' : 'password'}
            id="password"
            name="password"
            onChange={formik.handleChange}
            placeholder="Enter your password"
            rightAddon={
              <ClosedEyeIcon cursor="pointer" onClick={eye.onToggle} isOpen={eye.isOpen} />
            }
            rightAddonStyle={{h: {base: '60px'}, mr: '18.667px'}}
          />
          <Text
            alignSelf="end"
            textDecoration="none"
            fontWeight="500"
            fontSize={{base: '14px', md: '15.484px'}}
            color="custom_color.color_pop"
            _hover={{
              textDecoration: 'underline',
            }}
            onClick={() => handleScreen(`forgot_password`)}
          >
            Forgot password?
          </Text>
          <Button variation={`primary`} isDisabled={!isValid} isLoading={isLoading} type="submit">
            Sign In
          </Button>
          <Stack mt={{base: '5px', md: '0px'}} spacing={{base: '24px', md: '13.5px'}}>
            <Button
              variation={`tertiary`}
              _hover={{
                borderColor: 'custom_color.color_pop',
              }}
              onClick={handleSwitch}
            >
              Sign In with Link Instead
            </Button>
            {isAgentActive ? (
              <Button
                variation={`tertiary`}
                _hover={{
                  borderColor: 'custom_color.color_pop',
                }}
                as={Link}
                href="/agents/auth/login"
              >
                Go To Realtor&apos;s Portal
              </Button>
            ) : null}
          </Stack>

          <HStack
            position={{base: 'fixed', md: 'initial'}}
            bottom="96px"
            left="0px"
            w="full"
            justify="center"
          >
            <Text textAlign="center" fontWeight="400" fontSize="15.484px" color="matador_text.400">
              New Here?
            </Text>
            <Text
              alignSelf="end"
              _hover={{
                textDecoration: 'underline',
              }}
              display="inline-block"
              color="custom_color.color_pop"
              textDecoration="none"
              fontWeight="500"
              fontSize="15.484px"
              cursor={`pointer`}
              onClick={() => handleScreen(`user_registration`)}
            >
              Create an account
            </Text>
          </HStack>
        </Stack>
      </Stack>
    </Center>
  );
};

export default UserSignInWithPassword;
