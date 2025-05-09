import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  SimpleGrid,
  useMediaQuery,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  useToast,
  Stack,
  Image,
  Text,
  Flex,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {useMutation} from 'react-query';
import {FormInput, FormSelect, PhoneInput} from '@/ui-lib';
import {postDoc, updateSettings} from '@/api/Settings';
import UploadImage from '../UploadImage';
import {formatDateStringDayFirst, isValidDate} from '@/realtors_portal/utils/formatDate';
import backArrow from '@/images/icons/backArrow.svg';

const EditPersonalInformationModal = ({
  isOpen,
  onClose,
  infoData,
  documentsData,
  documentsQuery,
  mutation,
}) => {
  const [isMobile] = useMediaQuery('(max-width: 767px)');

  return (
    <>
      {isMobile ? (
        <Drawer autoFocus={false} placement="right" isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent w="full" maxW="100vw">
            <DrawerHeader
              fontSize="16px"
              textTransform="uppercase"
              fontWeight={'500'}
              letterSpacing="0.16px"
              p="16px 24px"
              borderBottom="1px solid"
              borderBottomColor="border.2"
            >
              <Flex align="center" gap="8px">
                <Image boxSize="24px" src={backArrow.src} onClick={onClose} alt="back arrow" />
                <Text>Update Personal Information</Text>
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <PersonalInfo
                infoData={infoData}
                documentsData={documentsData}
                documentsQuery={documentsQuery}
                mutation={mutation}
                onClose={onClose}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal autoFocus={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent w="full" maxW="985px">
            <ModalHeader
              fontSize="16px"
              textTransform="uppercase"
              fontWeight={500}
              letterSpacing="0.16px"
              px="40px"
              pt="24px"
            >
              Update Personal Information
            </ModalHeader>
            <ModalCloseButton top={4} _hover={{bg: ''}} />
            <ModalBody px="40px">
              <PersonalInfo
                infoData={infoData}
                documentsData={documentsData}
                documentsQuery={documentsQuery}
                mutation={mutation}
                onClose={onClose}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default EditPersonalInformationModal;

const PersonalInfo = ({infoData, documentsData, documentsQuery, mutation, onClose}) => {
  const toast = useToast();

  const validateForm = values => {
    const errors = {};
    if (!values.phone || !(values.phone.length >= 10 && values.phone.length <= 15)) {
      errors.phone = 'Invalid input length !';
    } else if (!/^[0-9]+$/.test(values.phone)) {
      errors.phone = 'Please Enter Digits Only !';
    }

    const date = new Date();
    const [d, m, y] = values?.date_of_birth?.split('/');
    const inputDate = new Date(`${m}-${d}-${y?.padStart(4, '0')}`);

    // Validate date_of_birth
    if (isNaN(inputDate?.getTime())) {
      errors.date_of_birth = 'Invalid Date format';
    } else if (inputDate > date) {
      errors.date_of_birth = "Hmm, date selected can't be in the future";
    }

    let hasChanged = false; // Initialize a flag

    for (const [key, value] of Object.entries(values)) {
      const initialValue = formik.initialValues[key];
      const currentValue = values[key];
      if (initialValue !== currentValue) {
        hasChanged = true; // Set the flag if any value has changed
      }
    }

    if (!hasChanged) {
      errors._error = 'At least one value must be changed.';
    }
    return errors;
  };

  const handleInput = e => {
    const formatNumber = parseInt(e.target?.value?.replace(/,/g, ''))?.toLocaleString();
    formik.setFieldError('monthly_income', '');
    if (formatNumber !== 'NaN') {
      formik.setFieldValue('monthly_income', formatNumber);
    } else {
      formik.setFieldValue('monthly_income', '');
    }
  };

  const handleDate = e => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');

    const formattedValue = formatDateStringDayFirst(numericValue);

    if (!inputValue.trim()) {
      formik.setValues({
        ...formik.values,
        date_of_birth: '', // Set to empty string when input is cleared
      });
    } else {
      formik.setValues({
        ...formik.values,
        date_of_birth: formattedValue,
      });

      // Validate the formatted date
      const [d, m, y] = formattedValue.split('/');
      if (!isValidDate(d, m, y)) {
        formik.setErrors({
          ...formik.errors,
          date_of_birth: 'Please enter a valid date',
        });
      } else {
        formik.setErrors({
          ...formik.errors,
          date_of_birth: '',
        });
      }
    }

    formik.setFieldTouched('date_of_birth');
  };

  const handleBlur = e => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    const month = numericValue.substr(0, 2);
    const day = numericValue.substr(2, 2);
    const year = numericValue.substr(4);

    if (numericValue.length === 10 && !isValidDate(day, month, year)) {
      formik.setErrors({
        ...formik.errors,
        date_of_birth: 'Please enter a valid date',
      });
    } else if (numericValue.length === 10 && isValidDate(day, month, year)) {
      console.log();
    } else {
      formik.setErrors({
        ...formik.errors,
        date_of_birth: '',
      });
    }

    formik.setFieldTouched('date_of_birth');
  };

  const formik = useFormik({
    initialValues: {
      date_of_birth: infoData?.date_of_birth ?? '',
      marital_status: infoData?.marital_status ?? '',
      phone: infoData?.phone ?? '',
      highest_education: infoData?.highest_education ?? '',
      employment_status: infoData?.employment_status ?? '',
      company_name: infoData?.company_name ?? '',
      occupation: infoData?.occupation ?? '',
      monthly_income: infoData?.monthly_income ?? '',
      address: infoData?.address ?? '',
      company_address: infoData?.company_address ?? '',
    },
    validate: validateForm,
    validateOnMount: true,
    validateOnChange: true,
    onSubmit: values => {
      mutation.mutate(values);
      onClose();
    },
  });

  const handleUpdate = e => {
    e.preventDefault();
    let exp = {};

    for (const [key, value] of Object.entries(formik.values)) {
      let val = value?.toString();
      if (val?.trim() !== '') exp[key] = value;
    }
    exp = {
      profile_details: true,
      ...exp,
      date_of_birth: dateOfBirthBackendFormat(formik.values.date_of_birth),
    };
    delete exp.avatar;
    mutation.mutate(exp);
    onClose();
  };

  const {mutate, isLoading, isError} = useMutation(postDoc, {
    onSuccess: res => {
      documentsQuery.refetch();
    },
    onError: err => {
      return toast({
        description: `${err?.response?.data?.message || 'please check your network connection'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleDocument = data => {
    mutate({
      profile_details: true,
      document_update: true,
      document: data.map(item => item.replace('data:', '').replace(/^.+,/, '')),
    });
  };

  return (
    <Stack>
      <SimpleGrid
        templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}}
        spacing={{base: '16px', md: '24px'}}
        mb={{base: '100px', md: 0}}
        pt="12px"
      >
        <FormInput
          error={formik.errors.date_of_birth && formik.touched.date_of_birth}
          placeholder="Date of Birth"
          h={{base: '48px', md: '60px'}}
          p="13.333px 18.667px"
          rounded="24px"
          value={formik.values.date_of_birth}
          onChange={handleDate}
          onBlur={handleBlur}
        />
        <PhoneInput
          type="phone"
          error={formik.errors.phone && formik.touched.phone}
          placeholder="Phone Number"
          onChange={formik.handleChange('phone')}
          rounded="24px"
          value={formik.values.phone}
          formik={formik}
        />
        <FormSelect
          options={['Married', 'Single', 'Divorced', 'Rather not say']}
          type="text"
          onChange={formik.handleChange('marital_status')}
          placeholder="Marital Status"
          h={{base: '48px', md: '60px'}}
          rounded="24px"
          fontSize="16px"
          value={formik.values.marital_status}
        />
        <FormSelect
          type="text"
          onChange={formik.handleChange('highest_education')}
          value={formik.values.highest_education}
          placeholder="Highest Education Level"
          options={[
            'High School Diploma',
            `Bachelor's Degree`,
            'Post-Secondary Certificate',
            'Some college',
            `Master's Degree`,
            'PHD',
          ]}
          h={{base: '48px', md: '60px'}}
          rounded="24px"
          fontSize="16px"
        />
        <FormSelect
          fontSize="16px"
          type="text"
          onChange={formik.handleChange('employment_status')}
          value={formik.values.employment_status}
          placeholder="Employment Status"
          options={['Employed', 'Unemployed', 'Self employed']}
          h={{base: '48px', md: '60px'}}
          rounded="24px"
        />
        <FormInput
          error={formik.errors.occupation && formik.touched.occupation}
          placeholder="Occupation"
          h={{base: '48px', md: '60px'}}
          p="13.333px 18.667px"
          rounded="24px"
          value={formik.values.occupation}
          onChange={formik.handleChange('occupation')}
        />
        <FormInput
          error={formik.errors.monthly_income && formik.touched.monthly_income}
          placeholder="Monthly Income"
          h={{base: '48px', md: '60px'}}
          p="13.333px 18.667px"
          rounded="24px"
          value={formik.values.monthly_income}
          onChange={handleInput}
        />
        <FormInput
          error={formik.errors.company_name && formik.touched.company_name}
          placeholder="Company's Name"
          h={{base: '48px', md: '60px'}}
          p="13.333px 18.667px"
          rounded="24px"
          value={formik.values.company_name}
          onChange={formik.handleChange('company_name')}
        />
        <FormInput
          error={formik.errors.company_address && formik.touched.company_address}
          placeholder="Company's Address"
          h={{base: '48px', md: '60px'}}
          p="13.333px 18.667px"
          rounded="24px"
          value={formik.values.company_address}
          onChange={formik.handleChange('company_address')}
        />
        <FormInput
          error={formik.errors.address && formik.touched.address}
          placeholder="Residential Address"
          h={{base: '48px', md: '60px'}}
          p="13.333px 18.667px"
          rounded="24px"
          value={formik.values.address}
          onChange={formik.handleChange('address')}
        />
        <UploadImage
          handleDocument={handleDocument}
          documentsData={documentsData}
          isLoading={isLoading}
          isError={isError}
        />
      </SimpleGrid>
      <Stack
        w="full"
        position={{base: 'absolute', md: 'relative'}}
        bottom={0}
        left={3}
        bg={{base: 'background.1', md: 'unset'}}
        align="end"
        justify="end"
        my="10px"
        pt={{base: '12px', md: 0}}
        px={{base: '16px', md: 0}}
        pb={{base: '25px', md: 0}}
      >
        <Button
          onClick={handleUpdate}
          isDisabled={mutation.isLoading || !formik.isValid}
          bg="custom_color.color_pop"
          mr={3}
          rounded="41px"
          color="#fff"
          p="13.159px 27.964px"
          h="40px"
          w={{base: 'full', md: '198px'}}
          fontWeight={400}
          fontSize="12px"
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
};
