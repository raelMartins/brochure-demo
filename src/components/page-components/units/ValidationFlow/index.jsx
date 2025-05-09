'use client';

import {Dispute} from './dispute';
import {Box, HStack, Stack, Text, useToast} from '@chakra-ui/react';
import {useSearchParams, useRouter} from 'next/navigation';
import {Summary} from './summary';
import {ValidateAlertIcon} from '@/components/assets/icons';
import {useMutation} from 'react-query';
import {PostForCustomerEquityValidationoOrDispute} from '@/api/listing';
import {useState} from 'react';

export const ValidationFlow = ({assetToUse}) => {
  const unit = assetToUse?.unit;
  const [message, setMessage] = useState('');
  const toast = useToast();

  const disputeEquity = useMutation(
    formData => PostForCustomerEquityValidationoOrDispute(formData),
    {
      onSuccess: res => {
        router.push('/properties');
        toast({
          title: `Thank you for the feedback`,
          description: 'We’ll get back to you as soon as possible.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  const handleDispute = () => {
    const obj = {
      action: 'reject',
      reason: message,
      validation_request_id: validation_requestsId,
    };
    return disputeEquity.mutate(obj);
  };

  const validateEquity = useMutation(
    formData => PostForCustomerEquityValidationoOrDispute(formData),
    {
      onSuccess: async res => {
        router.push('/properties');
        toast({
          title: `Validated`,
          description: 'Validation successful',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  const handleValidation = () => {
    const obj = {
      action: 'accept',
      validation_request_id: validation_requestsId,
    };

    return validateEquity.mutate(obj);
  };

  const isValid = !!message.trim();

  const searchParams = useSearchParams();
  const router = useRouter();
  const step = searchParams.get('step');

  const validationRequestArray = assetToUse?.validation_requests || [];
  const validation_requestsId = validationRequestArray?.[validationRequestArray?.length - 1]?.id;

  const setStep = text => {
    const pushUrl = `${window?.location?.origin}${window?.location?.pathname}?step=${text}`;
    router.push(pushUrl);
  };

  const stepComponents = {
    summary: (
      <Summary
        isLoading={validateEquity.isLoading || disputeEquity.isLoading}
        isValid={isValid}
        handleDispute={handleDispute}
        message={message}
        setMessage={setMessage}
        handleValidation={handleValidation}
        assetToUse={assetToUse}
        setStep={setStep}
      />
    ),
    dispute: (
      <Dispute
        isLoading={validateEquity.isLoading || disputeEquity.isLoading}
        isValid={isValid}
        handleDispute={handleDispute}
        message={message}
        setMessage={setMessage}
        setStep={setStep}
      />
    ),
  };

  return (
    <Stack
      flex={`1`}
      spacing={{base: '13px', md: '20px'}}
      p="20px"
      bg={`matador_background.100`}
      border="1px solid"
      borderColor={`matador_border_color.200`}
      color={`text`}
    >
      <HStack
        align="start"
        spacing="7.42px"
        p="16px"
        w="full"
        borderRadius="2px"
        border="0.5px solid"
        borderColor={`custom_color.color_pop`}
        bg="custom_color.opacity_pop._10"
      >
        <ValidateAlertIcon />
        <Text mt="-2px" fontSize="12" fontWeight="400" color="text">
          We kindly request your confirmation regarding the property, amount paid, transaction date,
          and the ownership of the uploaded documents. If any information is inaccurate, please
          initiate a dispute. However, if all details are accurate, we kindly ask you to proceed
          with validation.
        </Text>
      </HStack>

      <Box>
        <Text
          fontSize={`48px`}
          fontWeight={`500`}
          lineHeight={`57.6px`}
          letterSpacing={`-0.01em`}
          textAlign={`left`}
          fontFamily={`var(--font_montserrat)`}
          textTransform={`uppercase`}
          color={`custom_color.color_pop`}
          display={{base: `none`, md: `block`}}
        >
          {unit?.unit_title}
        </Text>
        <Text
          mt="8px"
          fontSize={`20px`}
          fontWeight={`500`}
          textAlign={`left`}
          letterSpacing={`-0.01em`}
          fontFamily={`var(--font_montserrat)`}
          textTransform={`uppercase`}
          color="matador_text.400"
        >
          {unit?.project?.name}
        </Text>
      </Box>
      {stepComponents[step] || stepComponents['summary']}
    </Stack>
  );
};
