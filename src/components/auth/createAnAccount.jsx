import AuthTermsCheck from '../assets/authTermsCheck';
import {
  AbsoluteCenter,
  Box,
  Center,
  HStack,
  Heading,
  Input,
  Link as ChakraLink,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import LeftAngledArrow from '../assets/leftAngledArrow';
import Link from 'next/link';
import {Button} from '@/ui-lib/ui-lib.components/Button';

const CreateAnAccount = ({handleScreen, handleSwitch, formik}) => {
  const {onToggle, isOpen} = useDisclosure();
  const handleSubmit = e => {
    e.preventDefault();
    const navTo = handleScreen('verify email');
    return navTo();
  };

  const isValid = !formik.errors.email && isOpen;

  return (
    <Stack
      spacing={{base: '24px', md: '26.67px'}}
      borderRadius="4px"
      w="full"
      pt={{base: '0px', md: '62px'}}
      pb="30px"
      maxW="533.333px"
    >
      <Stack spacing="5.33px">
        <HStack alignSelf={{base: 'start', md: 'center'}} spacing="8px">
          {/* <LeftAngledArrow
              role="button"
              onClick={handleSwitch}
              display={{base: 'initial', md: 'none'}}
            /> */}
          <Heading
            textAlign={{base: 'start', md: 'center'}}
            fontSize="24px"
            fontWeight="600"
            fontFamily={`var(--font_montserrat)`}
          >
            CREATE AN ACCOUNT
          </Heading>
        </HStack>
        <Text
          display={{base: 'none', md: 'initial'}}
          textAlign="center"
          fontSize="16px"
          fontWeight="400"
          color="matador_text.300"
        >
          We&apos;ll send a secure sign-in link to your email
        </Text>
      </Stack>
      <Stack w="full" as="form" onSubmit={handleSubmit} spacing={{base: '24px', md: '20px'}}>
        <Input
          w="full"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="email"
          h={{base: '60px'}}
          fontSize="16px"
          fontWeight="400"
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

        <HStack align="start" w="full" justify="space-between">
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
            color="matador_text.500"
          >
            By commencing usage, you hereby acknowledge and agree to abide by the{' '}
            <ChakraLink
              as={Link}
              textDecor="none"
              color="custom_color.color_pop"
              href=""
              display="inline-block"
            >
              Privacy Policy
            </ChakraLink>{' '}
            <Text color="custom_color.color_pop" as="span">
              &
            </Text>{' '}
            <ChakraLink
              as={Link}
              textDecor="none"
              color="custom_color.color_pop"
              href=""
              display="inline-block"
            >
              Terms of service
            </ChakraLink>
          </Text>
        </HStack>
        <Button variation={`primary`} isDisabled={!isValid} type="submit">
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
        <HStack
          position={{base: 'fixed', md: 'initial'}}
          bottom="96px"
          left="0px"
          w="full"
          justify="center"
        >
          <Text textAlign="center" fontWeight="400" fontSize="15.484px" color="matador_text.500">
            Already have an account?
          </Text>
          {/* <ChakraLink
            as={Link}
            alignSelf="end"
            _hover={{
              textDecoration: 'underline',
            }}
            display="inline-block"
            color="custom_color.color_pop"
            href="login"
            textDecoration="none"
            fontWeight="500"
            fontSize="15.484px"
          >
            Log In
          </ChakraLink> */}
          <Text
            alignSelf="end"
            _hover={{
              textDecoration: 'underline',
            }}
            display="inline-block"
            color="custom_color.color_pop"
            href="login"
            textDecoration="none"
            fontWeight="500"
            fontSize="15.484px"
            cursor={`pointer`}
            onClick={handleSwitch}
          >
            Log In
          </Text>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default CreateAnAccount;
