'use client';
import {Button} from '@/ui-lib/ui-lib.components/Button';
import {Box, Flex, Text, Textarea, VStack} from '@chakra-ui/react';

export const Dispute = ({setStep, handleDispute, message, setMessage, isValid, isLoading}) => {
  return (
    <Box w="full">
      <VStack gap={'20px'} align={'stretch'} w="full">
        <Text
          fontSize={{base: '14px', md: '16px'}}
          fontWeight={400}
          color={'matador_text.500'}
          lineHeight={'130%'}
        >
          {`Oops! It looks like there might be a mix-up. Could you please share more details about
          what's going on below? We're here to help!`}
        </Text>

        <Textarea
          onChange={e => setMessage(e.target.value)}
          value={message}
          resize="none"
          placeholder="Tell us about the issue..."
          border="0.5px solid"
          borderColor={`matador_border_color.200  !important`}
          borderRadius="12px"
          _focusVisible={{outline: 'none'}}
          w="full"
          h={{base: '100px', md: '155px'}}
        />

        <Flex
          gap={{base: '12px', md: '20px'}}
          align={{base: 'stretch', md: 'center'}}
          direction={{base: 'column-reverse', md: 'row'}}
        >
          <Button
            bg="transparent"
            color={`text`}
            h={{base: '48px', md: '60px'}}
            w={{base: 'full', md: '50%'}}
            fontSize="16px"
            fontWeight="400"
            borderRadius="full"
            border="1px solid"
            borderColor={`matador_border_color.100`}
            boxShadow="0px 1.5px 3px 0px rgba(16, 24, 40, 0.05)"
            onClick={() => setStep('summary')}
          >
            No, Go Back
          </Button>
          <Button
            bg={'custom_color.color'}
            color="custom_color.contrast"
            h={{base: '48px', md: '60px'}}
            w={{base: 'full', md: '50%'}}
            fontSize="16px"
            fontWeight="400"
            borderRadius="full"
            isLoading={isLoading}
            isDisabled={!isValid}
            onClick={handleDispute}
          >
            Submit
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};
