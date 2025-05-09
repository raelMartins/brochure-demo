import {Center, GridItem, Stack, Text} from '@chakra-ui/react';

const container_style = {
  bg: {base: `matador_background.100`},
  border: `1px solid`,
  borderColor: `matador_border_color.100`,
  padding: {base: `16px 24px`},
  justifyContent: `space-between`,
};

export const SettingsDetail = ({label, value, action, ...rest}) => {
  return (
    <GridItem
      {...container_style}
      display={`flex`}
      gap={`10px`}
      justifyContent={`flex-end`}
      alignItems="center"
      colSpan={{base: 6}}
      {...rest}
    >
      <Stack w={`100%`} alignItems="flex-start" justifyContent={`flex-start`} overflow={`hidden`}>
        <Text
          // color={`matador_text.400`}
          color={`matador_form.label`}
          fontSize={{base: `8px`, md: `14px`}}
          fontWeight={`400`}
          lineHeight={`140%`}
          letterSpacing={`2%`}
          textAlign={`left`}
        >
          {label}
        </Text>
        <Text
          color={`text`}
          fontSize={{base: `12px`, md: `16px`}}
          fontWeight={`500`}
          lineHeight={`140%`}
          letterSpacing={`1%`}
          textAlign={`left`}
        >
          {value || `--`}
        </Text>
      </Stack>
      {action && (
        <Center
          onClick={action?.handleClick}
          cursor={`pointer`}
          color={`custom_color.color`}
          fontSize={`24px`}
        >
          {action?.icon}
        </Center>
      )}
    </GridItem>
  );
};
