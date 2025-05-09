import {Radio} from '@/ui-lib';
import {Box, Center, Flex, FormLabel, Stack, Text} from '@chakra-ui/react';

export const InspectionTypeSelect = ({type, set_type}) => {
  return (
    <Flex
      gap={`17px`}
      direction={'column'}
      align={'stretch'}
      w="full"
      fontFamily={`var(--font_poppins)`}
      mt={{base: `12px`}}
    >
      <FormLabel
        color="text.5"
        m="0px"
        fontSize={'14px'} //styleName: Body 2 Medium;
        fontWeight={`500`}
        lineHeight={`19.6px`}
        letterSpacing={`1%`}
        textAlign={`left`}
        textTransform={`uppercase`}
      >
        Inspection type
      </FormLabel>
      <Flex gap={`59px`}>
        <Radio isActive={type === `in-person`} onClick={() => set_type('in-person')}>
          <Text
            color={`text.1`}
            fontSize="12px"
            fontWeight="400"
            lineHeight="133%"
            letterSpacing={`1%`}
            textTransform={`capitalize`}
          >
            In-Person
          </Text>
        </Radio>
        <Radio isActive={type === `virtual`} onClick={() => set_type('virtual')}>
          <Text
            color={`text.1`}
            fontSize="12px"
            fontWeight="400"
            lineHeight="133%"
            letterSpacing={`1%`}
            textTransform={`capitalize`}
          >
            virtual
          </Text>
        </Radio>
      </Flex>
    </Flex>
  );
};

export default InspectionTypeSelect;
