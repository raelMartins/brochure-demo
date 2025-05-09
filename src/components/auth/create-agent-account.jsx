import AuthTermsCheck from '../assets/authTermsCheck';
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Input,
  Image,
  Link,
  Select,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import DropDownArrow from '../assets/dropDownArrow';
import {useCustomerAuthContext} from '@/utils/auth/customerAuthContext';

const PHONEPREFIX = [
  {
    id: '1',
    code: '+234',
    name: 'Nigeria',
  },
  {
    id: '5',
    code: '+1',
    name: 'Canada',
  },
  {
    id: '6',
    code: '+44',
    name: 'United Kingdom',
  },
  {
    id: '7',
    code: '+1',
    name: 'United States of America',
  },
];

const CreateAgentAccount = ({handleScreen, formik}) => {
  const {onToggle, isOpen} = useDisclosure();
  const {AGENT_TERMS, AGENT_PRIVACY_POLICY} = useCustomerAuthContext();

  const updateDisplayedValue = e => {
    const val = e.target.value;

    formik.setFieldValue('country', val);
  };
  const countryCode = PHONEPREFIX.find(item => item.id === formik?.values?.country)?.code;

  const handleSubmit = e => {
    e.preventDefault();
    console.log('rec');
    const navTo = handleScreen('kyc 1');
    return navTo();
  };

  const isFormValid =
    !formik.errors.last_name && !formik.errors.first_name && !formik.errors.phone && isOpen;
  return (
    <Center
      h={{base: 'full', md: 'initial'}}
      alignItems={{base: 'start', md: 'initial'}}
      mt={{base: '0px', md: '3.8vh'}}
    >
      <Stack
        spacing={{base: '16px', md: '26.67px'}}
        w="full"
        pt={{base: '0px', md: '62px'}}
        pb="30px"
        bg="#fff"
        borderRadius="4px"
        maxW="533.333px"
      >
        <Heading
          textAlign={{base: 'start', md: 'center'}}
          fontSize="24px"
          fontWeight="600"
          color="#141414"
          fontFamily={`var(--font_montserrat)`}
        >
          Create an account
        </Heading>

        <Stack w="full" as="form" onSubmit={handleSubmit} spacing={{base: '24px', md: '20px'}}>
          <Input
            w="full"
            type="text"
            id="first_name"
            name="first_name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            h={{base: '48px', md: '60px'}}
            fontSize="16px"
            fontWeight="400"
            p="13.333px 18.667px"
            border="1px solid #D6D6D6"
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
            placeholder="First Name"
            _placeholder={{
              color: '#737373',
            }}
            color="#141414"
          />
          <Input
            w="full"
            type="text"
            id="middle_name"
            name="middle_name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            h={{base: '48px', md: '60px'}}
            fontSize="16px"
            fontWeight="400"
            p="13.333px 18.667px"
            border="1px solid #D6D6D6"
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
            placeholder="Middle Name (optional)"
            _placeholder={{
              color: '#737373',
            }}
            color="#141414"
          />
          <Input
            w="full"
            type="text"
            id="last_name"
            name="last_name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            h={{base: '48px', md: '60px'}}
            fontSize="16px"
            fontWeight="400"
            p="13.333px 18.667px"
            border="1px solid #D6D6D6"
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
            placeholder="Last Name"
            _placeholder={{
              color: '#737373',
            }}
            color="#141414"
          />

          <HStack align="center" spacing="10px">
            <Box
              border="1px solid #D6D6D6"
              borderRadius="24px"
              position="relative"
              w={{base: '130px', md: '106px'}}
              overflow="hidden"
            >
              <HStack my="auto" spacing="10px" pl="16px" h="60px">
                <Text
                  fontSize="14px"
                  color="#606060"
                  fontWeight="400"
                  // {...countryCodeTextStyle}
                >
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
                color="#919191"
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
                    <option key={index} value={item.id}>
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
              fontSize="16px"
              fontWeight="400"
              p="13.333px 18.667px"
              onBlur={formik.handleBlur}
              border="1px solid #D6D6D6"
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
                color: '#737373',
              }}
              color="#141414"
            />
          </HStack>
          <Stack
            spacing={{base: '16px', md: '20px'}}
            flexDirection={{base: 'column-reverse', md: 'column'}}
          >
            <HStack align="start" w="full" justify="space-between">
              <Box
                minW="21.482px"
                minH="21.482px"
                h="fit-content"
                w="fit-content"
                border="1px solid"
                display="flex"
                justifyContent="center"
                alignContent="center"
                borderColor={isOpen ? 'transparent' : '#A3A3A3'}
                cursor="pointer"
                bg="#F5F5F5"
                borderRadius="8px"
                transition="0.3s ease-in-out"
                onClick={onToggle}
              >
                <AuthTermsCheck
                  transform={isOpen ? 'scale(1)' : 'scale(0.4)'}
                  opacity={isOpen ? '1' : '0'}
                  transition="0.3s ease-in-out"
                />
              </Box>
              <Text
                maxW="394.582px"
                w="full"
                fontSize={{base: '12px', md: '13.548px'}}
                fontWeight="400"
                color="#525252"
              >
                By commencing usage, you hereby acknowledge and agree to abide by the{' '}
                <Link
                  textDecor="none"
                  color="#FA6400"
                  href={AGENT_PRIVACY_POLICY ? AGENT_PRIVACY_POLICY : '#'}
                  target={AGENT_PRIVACY_POLICY ? '_blank' : ''}
                  display="inline-block"
                >
                  Privacy Policy
                </Link>{' '}
                <Text color="#FA6400" as="span">
                  &
                </Text>{' '}
                <Link
                  textDecor="none"
                  color="#FA6400"
                  href={AGENT_TERMS ? AGENT_TERMS : '#'}
                  target={AGENT_TERMS ? '_blank' : ''}
                  display="inline-block"
                >
                  Terms of service
                </Link>
              </Text>
            </HStack>

            <Button
              h={{base: '48px', md: '60px'}}
              fontSize="16px"
              fontWeight="400"
              color="#fff"
              type="submit"
              border="none"
              isDisabled={!isFormValid}
              bg="#FA6400"
              cursor="pointer"
              borderRadius="56.25px"
              transition="0.3s ease-in-out"
              _hover={{
                bg: '#E35B00',
              }}
              _active={{
                bg: '#E35B00',
              }}
            >
              Proceed
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
};

export default CreateAgentAccount;
