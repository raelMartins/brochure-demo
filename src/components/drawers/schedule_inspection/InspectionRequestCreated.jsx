import {hourMinute, monthDayYear} from '@/utils/formatDate';
import {Box, HStack, Stack, StackDivider, Text} from '@chakra-ui/react';
import {formatInTimeZone} from 'date-fns-tz';

export const InspectionRequestCreated = ({data}) => {
  return (
    <Stack
      bg={`custom_color.opacity._05`}
      gap={{base: `0px`}}
      fontSize={{base: `16px`}}
      lineHeight={{base: `140%`}}
      textTransform={`capitalize`}
      letterSpacing={{base: `0.159px`}}
      divider={<StackDivider borderColor={`custom_color.opacity._10`} margin={`0px !important`} />}
    >
      <HStack justify={`space-between`} gap={`4px`} p={{base: `16px`}}>
        <Text color={{base: `matador_text.400`}} fontWeight={{base: `400`}}>
          Inspection Type
        </Text>
        <Text color={{base: `text`}} fontWeight={{base: `600`}}>
          {data?.tour_method}
        </Text>
      </HStack>
      <HStack justify={`space-between`} gap={`4px`} p={{base: `16px`}}>
        <Text color={{base: `matador_text.400`}} fontWeight={{base: `400`}}>
          Date
        </Text>
        <Text color={{base: `text`}} fontWeight={{base: `600`}}>
          {monthDayYear(data?.time)}
        </Text>
      </HStack>
      <HStack justify={`space-between`} gap={`4px`} p={{base: `16px`}}>
        <Text color={{base: `matador_text.400`}} fontWeight={{base: `400`}}>
          Time
        </Text>
        <Text color={{base: `text`}} fontWeight={{base: `600`}}>
          {/* {hourMinute(data?.time)} */}
          {formatInTimeZone(data?.time, data?.timezone, 'h:mm aa zzz ')}
        </Text>
      </HStack>
      <HStack justify={`space-between`} gap={`4px`} p={{base: `16px`}}>
        <Text color={{base: `matador_text.400`}} fontWeight={{base: `400`}}>
          Status
        </Text>
        <Text
          color={
            data?.status?.toLowerCase() === `approved` || data?.status?.toLowerCase() === `accepted`
              ? `#12B76A`
              : `#F79009`
          }
          fontWeight={{base: `600`}}
        >
          {data?.status}
        </Text>
      </HStack>
    </Stack>
  );
};
