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
import DefaultProfileImage from '../assets/defaultProfileImage';
import {useRef, useState} from 'react';
import {FileUpload} from '@/ui-lib/ui-lib.components/fileUpload';

const genders = ['Male', 'Female'];
const maritalStatus = ['Married', 'Single'];
const educationQualification = [
  'High School Diploma',
  `Bachelor's Degree`,
  'Post-Secondary Certificate',
  'Some college',
  `Master's Degree`,
  'PHD',
];
const RealtorFirstRegistrationForm = ({handleScreen, formik}) => {
  const [isDateValid, setIsValid] = useState(true);
  const [date, setDate] = useState('');
  const [preview, setPreview] = useState(null);

  const inputRef = useRef();
  const handleFileSelection = fileObj => {
    console.log({fileObj});
    const base64 = fileObj?.base64;
    // ?.replace('data:', '').replace(/^.+,/, '');
    const preview = fileObj?.preview;

    formik.setFieldValue('avatar', base64);

    setPreview(preview);
  };

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
    const newDOB = `${y}-${m}-${d}`;
    formik.setFieldValue('date_of_birth', newDOB);
    handleScreen('kyc 2');
  };

  const isFormValid =
    !formik.errors.avatar &&
    !formik.errors.marital_status &&
    !formik.errors.highest_education &&
    !formik.errors.gender &&
    isDateValid &&
    date;
  return (
    <Center
      h={{base: 'full', md: 'initial'}}
      alignItems={{base: 'start', md: 'initial'}}
      mt={{base: '0px', md: '3.8vh'}}
    >
      <Stack
        // spacing="26.67px"
        w="full"
        borderRadius="4px"
        // pt={{ base: "0px", md: "62px" }}
        pb="30px"
        bg="#fff"
        maxW="533.333px"
      >
        <Stack w="full" as="form" onSubmit={handleSubmit} spacing={{base: '24px', md: '20px'}}>
          <Stack spacing="16px" w="full">
            <Text fontSize="21.333px" fontWeight="400" color="#F04438">
              Required<sup>*</sup>
            </Text>
            <HStack spacing="12px" w="full">
              {!preview ? (
                <DefaultProfileImage />
              ) : (
                <Image
                  src={preview}
                  borderRadius="full"
                  alt="regristration profile picture"
                  boxSize="99.408px"
                  objectFit="cover"
                />
              )}
              <HStack
                role="button"
                border="1px solid #D6D6D6"
                w="197.39px"
                h="38.65px"
                position="relative"
                p="13.159px 27.964px"
                borderRadius="41.123px"
                justify="center"
                cursor="pointer"
              >
                <FileUpload
                  inputRef={inputRef}
                  accept="image/*"
                  onFileSelect={handleFileSelection}
                />
                <Text fontSize="12px" fontWeight="400" color="#141414">
                  Upload Display Image
                </Text>
              </HStack>
            </HStack>
          </Stack>
          <Input
            w="full"
            type="text"
            id="date_of_birth"
            name="date_of_birth"
            onChange={handleChange}
            value={date}
            errorBorderColor="#D92D20"
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
            placeholder="Date of Birth (DD/MM/YYYY)"
            _placeholder={{
              color: '#737373',
            }}
            color="#141414"
          />
          <Select
            w="full"
            cursor="pointer"
            icon={<DropDownArrow />}
            onChange={formik.handleChange}
            value={formik.values.highest_education}
            id="highest_education"
            name="highest_education"
            h={{base: '48px', md: '60px'}}
            fontSize="16px"
            fontWeight="400"
            border="1px solid #D6D6D6"
            _focus={{
              border: '1px solid #D6D6D6',
            }}
            _active={{
              border: '1px solid #D6D6D6',
            }}
            _focusVisible={
              {
                // border: 'none',
              }
            }
            borderRadius="24px"
            placeholder="Highest Level Of Education"
            _placeholder={{
              color: '#737373',
              fontWeight: '400',
            }}
            color={formik.values.highest_education ? '#141414' : '#737373'}
          >
            {/* <option value={"Gender"} disabled={true}>
              {`Gender`}
            </option> */}
            {educationQualification.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {` ${item}`}
                </option>
              );
            })}
          </Select>
          <Select
            w="full"
            cursor="pointer"
            icon={<DropDownArrow />}
            h={{base: '48px', md: '60px'}}
            fontSize="16px"
            fontWeight="400"
            onChange={formik.handleChange}
            value={formik.values.gender}
            id="gender"
            name="gender"
            border="1px solid #D6D6D6"
            _focus={{
              border: '1px solid #D6D6D6',
            }}
            _active={{
              border: '1px solid #D6D6D6',
            }}
            _focusVisible={
              {
                // border: 'none',
              }
            }
            borderRadius="24px"
            placeholder="Gender"
            _placeholder={{
              color: '#737373',
              fontWeight: '400',
            }}
            color={formik.values.gender ? '#141414' : '#737373'}
          >
            {genders.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {` ${item}`}
                </option>
              );
            })}
          </Select>
          <Select
            w="full"
            cursor="pointer"
            icon={<DropDownArrow />}
            h={{base: '48px', md: '60px'}}
            fontSize="16px"
            fontWeight="400"
            onChange={formik.handleChange}
            value={formik.values.marital_status}
            id="marital_status"
            name="marital_status"
            border="1px solid #D6D6D6"
            _focus={{
              border: '1px solid #D6D6D6',
            }}
            _active={{
              border: '1px solid #D6D6D6',
            }}
            _focusVisible={
              {
                // border: 'none',
              }
            }
            borderRadius="24px"
            placeholder="Marital Status"
            _placeholder={{
              color: '#737373',
              fontWeight: '400',
            }}
            color={formik.values.marital_status ? '#141414' : '#737373'}
          >
            {maritalStatus.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {` ${item}`}
                </option>
              );
            })}
          </Select>

          <Button
            h={{base: '48px', md: '60px'}}
            fontSize="16px"
            fontWeight="400"
            color="#fff"
            isDisabled={!isFormValid}
            type="submit"
            border="none"
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
    </Center>
  );
};

export default RealtorFirstRegistrationForm;
