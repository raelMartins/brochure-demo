import {AbsoluteCenter, Box, Center, HStack, Image, Stack, Text, useToast} from '@chakra-ui/react';
import successGif from '/src/images/gif/authSuccess.gif';
import {Button} from '@/ui-lib/ui-lib.components/Button';

const Success = ({email, resendLink, handleSwitch}) => {
  return (
    <Stack
      borderRadius="4px"
      spacing="24px"
      mx="auto"
      px={{base: '0px', md: '72px'}}
      py="30px"
      w="full"
      maxW="601px"
    >
      <Stack w="full" align="center" spacing="11px">
        <Stack spacing="none" w="full" align="center" textAlign={`center`}>
          <Image boxSize="120px" src={successGif.src} alt="success gif" />
          <Text fontFamily={`var(--font_montserrat)`} fontSize="24px" fontWeight="600">
            Link sent successfully
          </Text>
        </Stack>
        <Text
          textAlign="center"
          w={{base: 'full', md: '456px'}}
          fontSize="16px"
          fontWeight="400"
          color="matador_text.300"
        >
          A link has been sent to your email address{' '}
          <Text color="custom_color.color_pop" as="span">
            {email}
          </Text>
          <Box as="br" display={{base: 'initial', md: 'none'}} />. Please check your inbox to
          confirm the link.
        </Text>
      </Stack>
      <HStack justify="center">
        <Text textAlign="center" fontWeight="400" fontSize="16px" color="matador_text.500">
          Didn&apos;t get any mail? {` `}
          <Box
            as="span"
            cursor="pointer"
            alignSelf="end"
            onClick={resendLink}
            role="button"
            _hover={{
              textDecoration: 'underline',
            }}
            color="custom_color.color_pop"
            fontWeight="400"
            fontSize="16px"
          >
            Resend Link
          </Box>
        </Text>
      </HStack>
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
  );
};

export default Success;
