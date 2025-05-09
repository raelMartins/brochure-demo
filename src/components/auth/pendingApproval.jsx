import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import pendingApproval from "/src/images/gif/pendingApproval.gif";

const PendingApproval = () => {
  return (
    <AbsoluteCenter w="100vw">
      <Stack
        borderRadius="4px"
        spacing="24px"
        w={{ base: "full" }}
        mx="auto"
        px={{ base: "24px", md: "72px" }}
        py="30px"
        bg="#fff"
        minW="full"
        // bg="red"
        maxW="601px"
      >
        <Stack w="full" align="center" spacing="32px">
          <Image boxSize="100px" src={pendingApproval.src} alt="success gif" />
          <Stack spacing="12px" w="full" align="center">
            <Text fontSize="25px" fontWeight="700" color="#141414">
              Approval Pending
            </Text>
            <Text
              textAlign="center"
              w={{ base: "full", md: "421px" }}
              fontSize={{ base: "14px", md: "16px" }}
              fontWeight={{ base: "400", md: "500" }}
              color="#737373"
            >
              Thank you for registering with us! We&apos;ve received your
              application and our team is currently reviewing it. We&apos;ll be
              in touch soon with an update.
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </AbsoluteCenter>
  );
};

export default PendingApproval;
