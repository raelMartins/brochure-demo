import React from 'react';
import {Flex, Image, Text, Box, Stack, Center} from '@chakra-ui/react';
import pending_approval from '@/images/approval_pending.gif';

const PendingApproval = ({...rest}) => {
  return (
    <Box w={`100%`} {...rest}>
      <Flex
        w="full"
        h="full"
        direction="column"
        justify={'center'}
        align="center"
        textAlign={'center'}
        gap={{base: `24px`, md: `12px`}}
      >
        <Center
          h={{base: `112px`, md: `172px`}}
          w={{base: `165px`, md: `250px`}}
          overflow={`hidden`}
        >
          <Image alt="next_image" src={pending_approval.src} />
        </Center>
        <Stack gap={`7px`}>
          <Text
            fontSize={'23px'}
            fontWeight={700}
            color="text"
            className="heading-text-regular"
            textAlign={`center`}
            lineHeight={`140%`}
            maxW={`80%`}
            mx={`auto`}
          >
            Approval Pending
          </Text>
          <Text
            textAlign={'center'}
            fontSize={'12px'}
            mt="0px !important"
            fontWeight={`500`}
            color="matador_text.300"
            lineHeight={`130%`}
          >
            Thank you for registering with us! We&apos;ve received your application and our team is
            currently reviewing it. We&apos;ll be in touch soon with an update.
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default PendingApproval;
