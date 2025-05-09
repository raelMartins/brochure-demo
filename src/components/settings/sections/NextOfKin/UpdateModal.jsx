import {updateSettings} from '@/api/Settings';
import {
  PhoneInput,
  ResponsivePopup,
  ResponsivePopupCloseButton,
  ResponsivePopupContent,
} from '@/ui-lib';
import {Center, Flex, Grid, HStack, Stack, Text, useToast} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {useMutation} from 'react-query';
import {settings_input_field_style, settings_select_field_style} from '../..';
import {Button} from '@/ui-lib/ui-lib.components/Button';
import {FormInput, FormSelect} from '@/ui-lib';

export const UpdateNextOfKinModal = ({disclosure, next_of_kin_query}) => {
  const toast = useToast();
  const data = next_of_kin_query?.data?.data?.data;

  const handleClose = () => {
    disclosure.onClose();
  };

  const formik = useFormik({
    initialValues: {
      first_name: data?.first_name,
      last_name: data?.last_name,
      email: data?.email,
      phone: data?.phone,
      relationship: data?.relationship,
      residential_address: data?.residential_address,
    },
    onSubmit: values => {
      let exp = {};
      for (const [key, value] of Object.entries(values)) {
        let val = value.toString();
        if (val.trim() !== '') {
          exp[key] = value;
        }
      }
      exp = {next_of_kin: true, ...exp};
      mutation.mutate(exp);
    },
  });

  const mutation = useMutation(data => updateSettings(data), {
    onSuccess: async res => {
      toast({
        title: 'Changes Updated Successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      await next_of_kin_query?.refetch();
      handleClose();
    },
    onError: err => {
      toast({
        description: `${err?.response?.data?.message || 'Please check your network connection'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  return (
    <ResponsivePopup isOpen={disclosure.isOpen} onClose={handleClose} isCentered>
      <ResponsivePopupContent maxW={{base: `100%`, lg: `905px`}}>
        <Stack w={`100%`} p={{base: `24px`, lg: `24px 40px`}} gap={`24px`} h={`100%`}>
          <Flex
            justifyContent={`space-between`}
            alignItems={`center`}
            alignSelf={`stretch`}
            gap={`10px`}
          >
            <Text
              color={`text`}
              className="heading-text-regular"
              fontSize={{base: `24px`, lg: `28px`}}
              fontWeight={`550`}
              lineHeight={`120%`}
              letterSpacing={`-0.28px`}
            >
              Update Next of Kin
            </Text>
            <ResponsivePopupCloseButton
              position={`relative`}
              top={`0px`}
              left={`0px`}
              right={`0px`}
              bottom={`0px`}
              fontSize={`16px`}
            />
          </Flex>
          <Grid
            templateColumns={{base: `1fr`, sm: `1fr 1fr`}}
            gap={{base: '24px 43px'}}
            overflow={`auto`}
          >
            <FormInput
              {...settings_input_field_style}
              type="text"
              placeholder="First Name"
              onChange={formik.handleChange('first_name')}
              value={formik.values.first_name}
            />
            <FormInput
              {...settings_input_field_style}
              type="text"
              placeholder="Last Name"
              onChange={formik.handleChange('last_name')}
              value={formik.values.last_name}
            />
            <FormInput
              {...settings_input_field_style}
              placeholder="Email address"
              type="email"
              onChange={formik.handleChange('email')}
              value={formik.values.email}
            />
            <PhoneInput
              {...settings_input_field_style}
              placeholder="Phone number"
              type="phone"
              formik={formik}
              onChange={formik.handleChange('phone')}
              value={formik.values.phone}
            />

            <FormSelect
              {...settings_select_field_style}
              options={['Father', 'Mother', 'Brother', 'Sister', 'Partner']}
              placeholder="Relationship"
              type="text"
              onChange={formik.handleChange('relationship')}
              value={formik.values.relationship}
              borderColor={`matador_border_color.100`}
            />
            {/* <GridItem colSpan={{base: 1, lg: 2}}> */}
            <FormInput
              {...settings_input_field_style}
              placeholder="Residential Address"
              type="email"
              onChange={formik.handleChange('residential_address')}
              value={formik.values.residential_address}
            />
          </Grid>
          <HStack justify={`flex-end`}>
            <Button
              variation={`primary`}
              width={{base: `100%`, sm: `180px`}}
              padding={`13px 28px`}
              fontSize={`14px`}
              fontWeight={`500`}
              onClick={formik.handleSubmit}
              isLoading={mutation.isLoading}
            >
              Save
            </Button>
          </HStack>
        </Stack>
      </ResponsivePopupContent>
    </ResponsivePopup>
  );
};
