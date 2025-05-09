import {useLightenHex} from '@/utils/lightenColorShade';
import {Flex, RadioGroup, HStack, Text, Tooltip, Radio, useTheme, Grid} from '@chakra-ui/react';
import React from 'react';

const SelectUnit = ({ALLOCATIONS, setAllocationVal, allocationVal}) => {
  return ALLOCATIONS?.length ? (
    <RadioGroup onChange={setAllocationVal} value={allocationVal}>
      <Text fontSize="14px" textTransform="uppercase" fontWeight="500" color="text.1">
        Select a Unit
      </Text>
      <Grid pt="10px" gap="12px" templateColumns={{base: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)'}}>
        {ALLOCATIONS.map((allocation, idx) => {
          return (
            <Radio
              w="fit-content"
              minW="fit-content"
              key={idx}
              isDisabled={allocation?.allocated}
              value={allocation?.name}
              hidden
            >
              <Tooltip
                borderRadius="3px"
                fontSize="12px"
                hasArrow
                isDisabled={!allocation.allocated}
                placement="auto"
                label="This unit has been allocated"
              >
                <HStack
                  cursor={allocation.allocated ? 'not-allowed' : 'pointer'}
                  bg={allocationVal == allocation?.name ? 'custom_color.color_pop' : 'transparent'}
                  color={allocationVal == allocation?.name ? 'custom_color.contrast_pop' : 'text'}
                  justify="center"
                  p={{base: '10.5px 13.5px;', md: '8px 12px'}}
                  minH="33.27px"
                  minW="54.5px"
                  rounded="8px"
                  border={'1px solid'}
                  borderColor={
                    allocation?.allocated ? 'matador_border_color.100' : 'custom_color.color_pop'
                  }
                  _hover={{
                    bg: !allocation?.allocated ? `custom_color.opacity_pop._20` : '',
                  }}
                >
                  <Text fontSize={{base: '14px', md: '12px'}} fontweight="500">
                    {allocation?.name}
                  </Text>
                </HStack>
              </Tooltip>
            </Radio>
          );
        })}
      </Grid>
    </RadioGroup>
  ) : null;
};

export default SelectUnit;
