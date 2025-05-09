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
  Stack,
  Image,
  Flex,
  Text,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {FormInput, FormSelect, PhoneInput} from '@/ui-lib';
import backArrow from '@/images/icons/backArrow.svg';

export const EditNextOfKinModal = ({isOpen, onClose, infoData, next_of_kinQuery, mutation}) => {
  const [isMobile] = useMediaQuery('(max-width: 767px)');

  return (
    <>
      {isMobile ? (
        <Drawer autoFocus={false} placement="bottom" isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent w="full" maxW="100vw" h="full">
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
                <Text>Update Next of Kin</Text>
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <NexOfKinInfo
                onClose={onClose}
                infoData={infoData}
                mutation={mutation}
                next_of_kinQuery={next_of_kinQuery}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal autoFocus={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent w="full" maxW="985px" py={5} px={3}>
            <ModalHeader
              fontSize="16px"
              textTransform="uppercase"
              fontWeight={500}
              letterSpacing="0.16px"
            >
              Update Next of Kin
            </ModalHeader>
            <ModalCloseButton _hover={{bg: ''}} right={5} top={4} fontWeight={'bold'} />
            <ModalBody>
              <NexOfKinInfo
                onClose={onClose}
                infoData={infoData}
                mutation={mutation}
                next_of_kinQuery={next_of_kinQuery}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default EditNextOfKinModal;

const NexOfKinInfo = ({infoData, documentsData, next_of_kinQuery, mutation, onClose}) => {
  const validateForm = values => {
    const errors = {};
    if (!values.phone || !(values.phone.length >= 10 && values.phone.length <= 15)) {
      errors.phone = 'Invalid input length !';
    } else if (!/^[0-9]+$/.test(values.phone)) {
      errors.phone = 'Please Enter Digits Only !';
    }

    let hasChanged = false;

    for (const [key, value] of Object.entries(values)) {
      const initialValue = formik.initialValues[key];
      const currentValue = values[key];
      if (initialValue !== currentValue) {
        hasChanged = true;
      }
    }

    if (!hasChanged) {
      errors._error = 'At least one value must be changed.';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      first_name: infoData?.first_name ?? '',
      last_name: infoData?.last_name ?? '',
      phone: infoData?.phone ?? '',
      email: infoData?.email ?? '',
      relationship: infoData?.relationship ?? '',
      residential_address: infoData?.residential_address ?? '',
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
      next_of_kin: true,
      ...exp,
    };
    delete exp.avatar;
    mutation.mutate(exp);
    onClose();
  };

  return (
    <Stack>
      <SimpleGrid
        templateColumns={{base: '1fr', md: 'repeat(2, 1fr)'}}
        spacing={{base: '16px', md: '24px'}}
        mb={{base: '100px', md: 0}}
      >
        <FormInput
          type="text"
          rounded="24px"
          p="13.333px 18.667px"
          placeholder="First Name"
          h={{base: '48px', md: '60px'}}
          value={formik.values.first_name}
          onChange={formik.handleChange('first_name')}
          error={formik.errors.first_name && formik.touched.first_name}
        />
        <FormInput
          type="text"
          rounded="24px"
          p="13.333px 18.667px"
          placeholder="Last Name"
          h={{base: '48px', md: '60px'}}
          value={formik.values.last_name}
          onChange={formik.handleChange('last_name')}
          error={formik.errors.last_name && formik.touched.last_name}
        />
        <FormInput
          type="email"
          name="email"
          id="email"
          fontSize="16px"
          rounded="24px"
          lable={'Email address'}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Email Address"
          h={{base: '48px', md: '60px'}}
          onChange={formik.handleChange}
          _placeholder={{fontSize: '13px'}}
          padding={{base: `12px 14px`, md: '14px 15px'}}
          error={formik.touched.email && formik.errors.email}
        />

        <FormSelect
          type="text"
          rounded="24px"
          fontSize="16px"
          placeholder="Relationship"
          h={{base: '48px', md: '60px'}}
          value={formik.values.relationship}
          onChange={formik.handleChange('relationship')}
          options={['Brother', `Sister`, 'Father', 'Mother', `Cousins`]}
        />
        <PhoneInput
          type="phone"
          rounded="24px"
          placeholder="Phone Number"
          value={formik.values.phone}
          formik={formik}
          onChange={formik.handleChange('phone')}
          error={formik.errors.phone && formik.touched.phone}
        />
        <FormInput
          rounded="24px"
          p="13.333px 18.667px"
          h={{base: '48px', md: '60px'}}
          placeholder="Company's Address"
          value={formik.values.residential_address}
          onChange={formik.handleChange('residential_address')}
          error={formik.errors.residential_address && formik.touched.residential_address}
        />
      </SimpleGrid>
      <Stack
        w="full"
        left={3}
        bottom={0}
        align="end"
        justify="end"
        my="10px"
        pt={{base: '12px', md: 0}}
        px={{base: '16px', md: 0}}
        pb={{base: '25px', md: 0}}
        bg={{base: 'background.1', md: 'unset'}}
        position={{base: 'absolute', md: 'relative'}}
      >
        <Button
          mr={3}
          h="40px"
          color="#fff"
          rounded="41px"
          fontSize="12px"
          fontWeight={400}
          bg="custom_color.color_pop"
          p="13.159px 27.964px"
          onClick={handleUpdate}
          w={{base: 'full', md: '198px'}}
          isDisabled={mutation.isLoading || !formik.isValid}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
};
