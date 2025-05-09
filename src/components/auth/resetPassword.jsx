import {AbsoluteCenter, Center, HStack, Heading, Input, Stack, Text} from '@chakra-ui/react';
import LeftAngledArrow from '../assets/leftAngledArrow';
import {Button} from '@/ui-lib/ui-lib.components/Button';

const ResetPassword = ({handleScreen, handleSwitch, formik}) => {
  const handleSubmit = e => {
    e.preventDefault();
    const navTo = handleScreen('verify email');
    return navTo();
  };
  const isValid = !formik.errors.email;
  return (
    <Stack
      spacing={{base: '16px', md: '26.67px'}}
      w="full"
      pt={{base: '0px', md: '62px'}}
      pb="30px"
    >
      <Stack spacing="5.33px">
        <HStack alignSelf={{base: 'start', md: 'center'}} spacing="8px">
          <Heading
            textAlign={{base: 'start', md: 'center'}}
            fontSize="24px"
            fontWeight="600"
            fontFamily={`var(--font_montserrat)`}
          >
            RESET PASSWORD
          </Heading>
        </HStack>
        <Text
          textAlign={{base: 'start', md: 'center'}}
          fontSize="16px"
          fontWeight="400"
          maxW="435px"
          color="matador_text.500"
        >
          It happens sometimes. Enter your email and we&apos;d send you an OTP
        </Text>
      </Stack>
      <Stack w="full" as="form" onSubmit={handleSubmit} spacing={{base: '24px', md: '20px'}}>
        <Input
          w="full"
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
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
            opacity: `1`,
          }}
        />

        <Button variation={`primary`} isDisabled={!isValid} onClick={handleSubmit} type="submit">
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

export default ResetPassword;
