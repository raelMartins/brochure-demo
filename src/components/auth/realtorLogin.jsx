import Link from 'next/link';
import AuthTermsCheck from '../assets/authTermsCheck';
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Input,
  Link as ChakraLink,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {useCustomerAuthContext} from '@/utils/auth/customerAuthContext';

const RealtorLogin = ({formik, isLoading}) => {
  const {onToggle, isOpen} = useDisclosure();
  const isValid = !formik.errors.email;
  const {AGENT_TERMS, AGENT_PRIVACY_POLICY} = useCustomerAuthContext();

  return (
    <Center
      h={{base: 'full', md: 'initial'}}
      alignItems={{base: 'start', md: 'initial'}}
      mt={{base: '0px', md: '3.8vh'}}
    >
      <Stack
        spacing={{base: '16px', md: '26.67px'}}
        w="full"
        pt={{base: '0px', md: '62px'}}
        pb="30px"
        bg="#fff"
        maxW="533.333px"
      >
        <Heading
          textAlign={{base: 'start', md: 'center'}}
          fontSize="24px"
          fontWeight="600"
          color="#141414"
          fontFamily={`var(--font_montserrat)`}
        >
          Realtor&apos;s Portal
        </Heading>

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
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            h={{base: '48px', md: '60px'}}
            fontSize="16px"
            fontWeight="400"
            p="13.333px 18.667px"
            border="1px solid #D6D6D6"
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
              color: '#737373',
            }}
            color="#141414"
          />
          <Stack w="full" spacing={{base: '24px', md: '20px'}}>
            <Stack w="full" spacing={{base: '16px', md: '20px'}}>
              <Button
                color="#fff"
                type="submit"
                isDisabled={!isValid}
                isLoading={isLoading}
                border="none"
                bg="#FA6400"
                h={{base: '48px', md: '60px'}}
                fontSize="16px"
                fontWeight="400"
                cursor="pointer"
                borderRadius="56.25px"
                transition="0.3s ease-in-out"
                _hover={{
                  bg: '#E35B00',
                }}
                _active={{
                  bg: '#E35B00',
                }}
              >
                Proceed
              </Button>
              {/* <HStack align="start" w="full" justify="space-between">
                <Box
                  minW="21.482px"
                  minH="21.482px"
                  h="fit-content"
                  w="fit-content"
                  border="1px solid"
                  display="flex"
                  justifyContent="center"
                  alignContent="center"
                  borderColor={isOpen ? 'transparent' : '#A3A3A3'}
                  cursor="pointer"
                  bg="#F5F5F5"
                  borderRadius="8px"
                  transition="0.3s ease-in-out"
                  onClick={onToggle}
                >
                  <AuthTermsCheck
                    transform={isOpen ? 'scale(1)' : 'scale(0.4)'}
                    opacity={isOpen ? '1' : '0'}
                    transition="0.3s ease-in-out"
                  />
                </Box>
                <Text
                  maxW="394.582px"
                  w="full"
                  fontSize={{base: '12px', md: '13.548px'}}
                  fontWeight="400"
                  color="#525252"
                >
                  By commencing usage, you hereby acknowledge and agree to abide by the{' '}
                  <Link
                    textDecor="none"
                    color="#FA6400"
                    href={AGENT_PRIVACY_POLICY ? AGENT_PRIVACY_POLICY : '#'}
                    target={AGENT_PRIVACY_POLICY ? '_blank' : ''}
                    display="inline-block"
                  >
                    <Text as="span" color="#FA6400">
                      Privacy Policy
                    </Text>
                  </Link>{' '}
                  <Text color="#FA6400" as="span">
                    &
                  </Text>{' '}
                  <Link
                    textDecor="none"
                    color="#FA6400"
                    href={AGENT_TERMS ? AGENT_TERMS : '#'}
                    target={AGENT_TERMS ? '_blank' : ''}
                    display="inline-block"
                  >
                    <Text as="span" color="#FA6400">
                      Terms of service
                    </Text>
                  </Link>
                </Text>
              </HStack> */}
            </Stack>
            <ChakraLink
              prefetch={true}
              as={Link}
              href="/auth/login"
              w="full"
              h={{base: '48px', md: '60px'}}
              fontSize="16px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="400"
              textDecoration="none"
              textAlign="center"
              color="#141414"
              p="20.25px 27px"
              border="1px solid #D6D6D6"
              _hover={{
                borderColor: '#FA6400',
              }}
              transition="0.3s ease-in-out 0.2s"
              borderRadius="56.25px"
              boxShadow=" 0px 1.5px 3px 0px rgba(16, 24, 40, 0.05)"
            >
              Sign in as a Client
            </ChakraLink>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
};

export default RealtorLogin;
