import {
  Box,
  Center,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Select,
  Image,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import DropDownArrow from '../assets/dropDownArrow';
import LeftAngledArrow from '../assets/leftAngledArrow';
import {PHONEPREFIX} from '../constants/settings/phoneprefix';
import {Button} from '@/ui-lib/ui-lib.components/Button';

const InsertPhoneNumber = ({formik, handleSwitch, handleScreen}) => {
  const updateDisplayedValue = e => {
    const val = e.target.value;

    formik.setFieldValue('country', val);
  };
  const countryCode = PHONEPREFIX.find(item => item.id === formik?.values?.country)?.code;
  const handleSubmit = e => {
    e.preventDefault();
    const navTo = handleScreen('verify phone number');
    return navTo();
  };

  return (
    <Stack
      spacing={{base: '24px', md: '26.67px'}}
      w="full"
      pt={{base: '0px', md: '62px'}}
      pb="30px"
      borderRadius="4px"
      maxW="533.333px"
    >
      <HStack alignSelf={{base: 'start', md: 'center'}} spacing="8px">
        {/* <LeftAngledArrow
            role="button"
            onClick={handleSwitch}
            display={{base: 'initial', md: 'none'}}
          /> */}
        <Heading
          textAlign={{base: 'start', md: 'center'}}
          fontSize="24px"
          fontWeight="600"
          fontFamily={`var(--font_montserrat)`}
        >
          ENTER PHONE NUMBER
        </Heading>
      </HStack>
      <Stack w="full" as="form" onSubmit={handleSubmit} spacing={{base: '24px', md: '20px'}}>
        <HStack align="center" spacing={{base: '5px', md: '10px'}}>
          <Box
            border="1px solid"
            borderColor={`matador_border_color.100`}
            borderRadius="24px"
            position="relative"
            w={{base: '130px', md: '106px'}}
            overflow="hidden"
          >
            <HStack my="auto" spacing="10px" pl="16px" h="60px">
              <Text fontSize="14px" color="matador_form.label" fontWeight="400">
                {countryCode}
              </Text>
              <DropDownArrow />
            </HStack>
            <Select
              name="country"
              overflowX="hidden"
              opacity="0"
              icon={<Image opacity="0" src={''} alt="dropDown icon" />}
              onChange={updateDisplayedValue}
              w="100px"
              zIndex="2"
              position="absolute"
              p="0px"
              cursor="pointer"
              left="0"
              top={'2px'}
              // bottom="3px"

              value={formik.values.country}
              border="none"
              required
              errorBorderColor="#D92D20"
              id="countryPhoneNumber"
              lineHeight="18px "
              // color="#919191"
              fontSize="14px"
              height={'60px'}
              fontWeight="300"
              _focus={{
                border: 'none',
              }}
              _active={{
                border: 'none',
              }}
              _focusVisible={
                {
                  // border: 'none',
                }
              }
            >
              {PHONEPREFIX.map((item, index) => {
                return (
                  <option key={index} value={item.id} style={{color: `#000`}}>
                    {`${item.code}   ${item.name}`}
                  </option>
                );
              })}
            </Select>
          </Box>

          <Input
            maxW="315.17px"
            // minW={{ sm: "full", md: "266px" }}
            w="full"
            type="number"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            h="60px"
            p="13.333px 18.667px"
            onBlur={formik.handleBlur}
            border="1px solid"
            borderColor={`matador_border_color.100`}
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
            placeholder="Phone Number"
            _placeholder={{
              color: 'matador_text.300',
            }}
          />
        </HStack>

        <Button variation={`primary`} type="submit" isDisabled={formik.errors.phone}>
          Proceed
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

export default InsertPhoneNumber;
