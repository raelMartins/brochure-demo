import {Center, HStack, Heading, Stack, Text, Textarea} from '@chakra-ui/react';
import {useState} from 'react';
import DropDownArrow from '../assets/dropDownArrow';
import LeftAngledArrow from '../assets/leftAngledArrow';
import {Button} from '@/ui-lib/ui-lib.components/Button';

const HowDidYouHearAboutUs = ({handleScreen, handleSwitch, isLoading}) => {
  const [screen, setScreen] = useState('');
  const [selected, setSelected] = useState(null);
  const [othersText, setOthersText] = useState('');

  const handleSelection = info => () => {
    setSelected(info);

    return info === 'Others' ? setScreen('Others') : null;
  };
  const handleChange = e => {
    const val = e.target.value;
    return setOthersText(val);
  };
  const openOptions = () => {
    setSelected('');
    setOthersText('');
    setScreen(prev => (prev === 'select' ? '' : 'select'));
  };

  const sourcesToHearAboutUs = ['Facebook', 'Linkedin', 'Instagram', 'Via an Agent', 'Others'];
  const handleSubmit = e => {
    e.preventDefault();

    const outreachObj = {
      outreach: selected,
      ...(selected === 'Others' ? {others_field: othersText.toLowerCase()} : {}),
    };

    handleScreen(outreachObj);
  };
  const isValid = selected && (selected === 'Others' ? !!othersText.trim() : true);
  return (
    <Stack
      spacing={{base: '24px', md: '42.67px'}}
      w="full"
      pt={{base: '0px', md: '62px'}}
      pb="30px"
      maxW="533.333px"
    >
      <HStack alignSelf={{base: 'start', md: 'center'}} spacing="8px">
        <Heading
          textAlign={{base: 'start', md: 'center'}}
          fontSize="24px"
          fontWeight="600"
          textTransform="uppercase"
          maxW={{base: '334px', md: 'full'}}
          fontFamily={`var(--font_montserrat)`}
        >
          How did you hear about us?
        </Heading>
      </HStack>
      <Stack w="full" as="form" onSubmit={handleSubmit} spacing="none">
        <HStack
          w="full"
          h={{base: '48px', md: '60px'}}
          role="button"
          p="13.333px 18.667px"
          border="1px solid"
          borderColor={`matador_border_color.100`}
          onClick={openOptions}
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
          }}
          justify="space-between"
        >
          <Text fontSize="16px" fontWeight="400" color="matador_text.300">
            {selected || 'Select Option'}
          </Text>
          <DropDownArrow
            w={{base: '19.5px', md: '21px'}}
            h={{base: '19.5px', md: '20px'}}
            transition="0.3s ease-in-out"
            transform={`rotate(${screen ? '180deg' : '0deg'})`}
          />
        </HStack>
        <Stack
          transition=" 0.7s ease-in-out "
          mt={screen ? {base: '24px', md: '24px'} : '0px'}
          mb={screen ? {base: '50px', md: '16px'} : '0px'}
          opacity={screen ? 1 : 0}
          boxShadow="0px 1.333px 2.667px 0px rgba(16, 24, 40, 0.05)"
          border="1px solid"
          borderColor={`matador_border_color.100`}
          borderRadius="24px"
          w="full"
          h={`${screen === 'select' ? '202px' : screen === 'Others' ? '100px' : '0px'}`}
          p="14px 18px"
          spacing="16px"
          overflow="hidden"
        >
          {screen === 'Others' ? (
            <Textarea
              resize="none"
              p="0px"
              value={othersText}
              onChange={handleChange}
              id="othersText"
              name="othersText"
              placeholder="Kindly tell us how you heard about us"
              border="none"
              w="full"
              h="full"
              _focus={{
                boxShadow: 'transparent',
                outline: 'none',
                border: 'none',
              }}
              _active={{
                boxShadow: 'transparent',
                outline: 'none',
                border: 'none',
              }}
              _focusVisible={{
                boxShadow: 'transparent',
                outline: 'none',
                border: 'none',
              }}
            />
          ) : screen === 'select' ? (
            <Stack as="ul" spacing="16px" w="full">
              {sourcesToHearAboutUs.map((item, idx) => (
                <Text
                  as="li"
                  listStyleType="none"
                  _hover={{
                    opacity: '0.6',
                  }}
                  transition="0.3s ease-in-out"
                  role="button"
                  key={idx}
                  fontSize="16px"
                  lineHeight="22px"
                  fontWeight="400"
                  color="matador_text.300"
                  onClick={handleSelection(item)}
                >
                  {item}
                </Text>
              ))}
            </Stack>
          ) : null}
        </Stack>

        <Button variation={`primary`} type="submit" isDisabled={!isValid} isLoading={isLoading}>
          Finish
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

export default HowDidYouHearAboutUs;
