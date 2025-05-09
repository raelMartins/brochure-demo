import {useCustomerAuthContext} from '@/utils/auth/customerAuthContext';
import AuthTermsCheck from '../assets/authTermsCheck';
import {
  Box,
  Center,
  HStack,
  Heading,
  Input,
  Link as ChakraLink,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import useLocalStorage from '@/ui-lib/ui-lib.hooks/useLocalStorage';
import Link from 'next/link';
import {Button} from '@/ui-lib/ui-lib.components/Button';

const UserLoginWithEmail = ({handleScreen, isLoading, formik}) => {
  const {onToggle, isOpen} = useDisclosure();
  const {TERMS, PRIVACY_POLICY} = useCustomerAuthContext();
  const [storeInfo] = useLocalStorage('storeThemeInfo');
  const isAgentActive = storeInfo?.agentActive;
  const isValid = !formik.errors.email;

  return (
    <Center h={{base: 'full', md: 'initial'}} alignItems={{base: 'start', md: 'initial'}}>
      <Stack
        spacing={{base: '29px', md: '26.67px'}}
        w="full"
        px={{base: '0px'}}
        pt={{base: '0px', md: '62px'}}
        pb="30px"
        maxW="533.333px"
      >
        <Stack spacing="5.33px">
          <Heading
            textAlign={{base: 'start', md: 'center'}}
            fontSize="24px"
            fontWeight="600"
            fontFamily={`var(--font_montserrat)`}
          >
            SIGN IN WITH LINK
          </Heading>
          <Text
            textAlign={{base: 'start', md: 'center'}}
            fontSize="16px"
            fontWeight="400"
            color="matador_text.300"
          >
            We&apos;ll send a secure sign-in link to your email
          </Text>
        </Stack>
        <Stack
          w="full"
          as="form"
          onSubmit={formik.handleSubmit}
          spacing={{base: '24px', md: '20px'}}
        >
          <Input
            w="full"
            type="email"
            id="email"
            name="email"
            h={{base: '60px'}}
            fontSize="16px"
            fontWeight="400"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            p="13.333px 18.667px"
            border="1px solid"
            borderColor={`matador_border_color.100`}
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
            borderRadius="24px"
            placeholder="Enter your email"
            _placeholder={{
              color: 'matador_text.300',
            }}
          />
          <Stack w="full" spacing={{base: '24px', md: '20px'}}>
            <Stack w="full" spacing={{base: '16px', md: '20px'}}>
              <Button
                variation={`primary`}
                isDisabled={!isValid}
                type="submit"
                isLoading={isLoading}
              >
                Proceed
              </Button>
            </Stack>

            <Stack mt={{base: '5px', md: '0px'}} spacing={{base: '24px', md: '13.5px'}}>
              <Button
                variation={`tertiary`}
                _hover={{
                  borderColor: 'custom_color.color_pop',
                }}
                onClick={() => handleScreen('sign in with password')}
              >
                Sign In with Password instead
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
              <Text
                textAlign="center"
                fontWeight="400"
                fontSize="15.484px"
                color="matador_text.500"
              >
                New Here?
              </Text>
              {/* <ChakraLink
              as={Link}
              alignSelf="end"
              _hover={{
                textDecoration: 'underline',
              }}
              display="inline-block"
              color="custom_color.color_pop"
              href="register"
              textDecoration="none"
              fontWeight="500"
              fontSize="15.484px"
            >
              Create an account
            </ChakraLink> */}
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
      </Stack>
    </Center>
  );
};

export default UserLoginWithEmail;
