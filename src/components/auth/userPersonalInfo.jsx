import {
  Box,
  Center,
  HStack,
  Heading,
  Input,
  Link,
  Select,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import DropDownArrow from '../assets/dropDownArrow';
import {useState} from 'react';
import LeftAngledArrow from '../assets/leftAngledArrow';
import {Button} from '@/ui-lib/ui-lib.components/Button';

const genders = [
  {name: 'Male', value: 'male'},
  {name: 'Female', value: 'female'},
  // {name: 'Other', value: 'other'},
];

const UserPersonalInfo = ({handleScreen, handleSwitch, formik}) => {
  const [isDateValid, setIsValid] = useState(true);
  const [date, setDate] = useState('');

  const handleChange = event => {
    let value = event.target.value;

    value = value.replace(/\D/g, '');

    if (value.length <= 2) {
      value = value.replace(/^(\d{0,2})/, '$1');
    } else if (value.length <= 4) {
      value = value.replace(/^(\d{2})(\d{0,2})/, '$1/$2');
    } else {
      value = value.replace(/^(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3').slice(0, 10);
    }

    const parts = value.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const dateObject = new Date(year, month, day);
    let isValidDate = dateObject.getDate() === day && dateObject.getMonth() === month;

    setDate(value);
    setIsValid(isValidDate);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const [d, m, y] = date.split('/');
    const newDOB = `${d}-${m}-${y}`;
    formik.setFieldValue('date_of_birth', date);

    return handleScreen('create password');
  };

  const isFormValid =
    !formik.errors.last_name &&
    !formik.errors.first_name &&
    !formik.errors.gender &&
    isDateValid &&
    date;

  return (
    <Stack
      spacing={{base: '38px', md: '26.67px'}}
      w="full"
      pt={{base: '0px', md: '62px'}}
      pb="30px"
      maxW="533.333px"
    >
      <HStack alignSelf={{base: 'start', md: 'center'}} spacing="8px">
        <Heading
          textAlign={{base: 'start', md: 'center'}}
          fontSize="24px"
          maxW={{base: '334px', md: 'full'}}
          fontWeight="600"
          fontFamily={`var(--font_montserrat)`}
        >
          ENTER YOUR PERSONAL DETAILS
        </Heading>
      </HStack>
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
          placeholder="First Name"
          _placeholder={{
            color: 'matador_text.300',
          }}
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
          placeholder="Middle Name (optional)"
          _placeholder={{
            color: 'matador_text.300',
          }}
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
          placeholder="Last Name"
          _placeholder={{
            color: 'matador_text.300',
          }}
        />
        <Select
          w="full"
          cursor="pointer"
          icon={<DropDownArrow />}
          h={{base: '48px', md: '60px'}}
          fontSize="16px"
          fontWeight="400"
          id="gender"
          name="gender"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.gender}
          border="1px solid"
          borderColor={`matador_border_color.100`}
          _focus={{
            border: '1px solid',
            borderColor: `matador_border_color.100`,
          }}
          _active={{
            border: '1px solid',
            borderColor: `matador_border_color.100`,
          }}
          _focusVisible={
            {
              // border: 'none',
            }
          }
          borderRadius="24px"
          placeholder="Gender"
          _placeholder={{
            color: 'matador_text.300',
            fontWeight: '400',
          }}
          color={formik.values.gender ? 'text' : 'matador_text.300'}
        >
          {genders.map((item, index) => {
            return (
              <option key={index} value={item.value} style={{color: `#000`}}>
                {` ${item.name}`}
              </option>
            );
          })}
        </Select>
        <Input
          w="full"
          type="text"
          id="date_of_birth"
          name="date_of_birth"
          onChange={handleChange}
          value={date}
          h={{base: '48px', md: '60px'}}
          fontSize="16px"
          fontWeight="400"
          p="13.333px 18.667px"
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
          placeholder="Date of Birth (DD/MM/YYYY)"
          _placeholder={{
            color: 'matador_text.300',
          }}
        />

        <Button variation={`primary`} type="submit" isDisabled={!isFormValid}>
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

export default UserPersonalInfo;
