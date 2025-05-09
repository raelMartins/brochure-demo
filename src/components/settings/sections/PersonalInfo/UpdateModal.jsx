import {updateSettings} from '@/api/Settings';
import {isValidDate} from '@/realtors_portal/utils/formatDate';
import {
  CurrencyInput,
  PhoneInput,
  ResponsivePopup,
  ResponsivePopupCloseButton,
  ResponsivePopupContent,
} from '@/ui-lib';
import {formatWithCommas} from '@/utils';
import {Center, Flex, Grid, HStack, Stack, Text, useToast} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {useMutation} from 'react-query';
import {settings_input_field_style, settings_select_field_style} from '../..';
import {formatDateStringDayFirst} from '@/utils/formatDate';
import Documents from '../../Documents';
import {FormInput, FormSelect} from '@/ui-lib';
import {Button} from '@/ui-lib/ui-lib.components/Button';

export const UpdateProfileModal = ({disclosure, profile_query}) => {
  const toast = useToast();
  const data = profile_query?.data?.data?.data;

  const handleClose = () => {
    disclosure.onClose();
  };

  const validateForm = values => {
    const errors = {};
    let hasChanged = false; // Initialize a flag
    const date = new Date();
    const [d, m, y] = values?.date_of_birth?.split('/');
    const inputDate = new Date(`${m}-${d}-${y?.padStart(4, '0')}`);

    // Validate date_of_birth
    if (isNaN(inputDate?.getTime())) {
      errors.date_of_birth = 'Invalid Date format';
    } else if (inputDate > date) {
      errors.date_of_birth = "Hmm, date selected can't be in the future";
    }

    // Check if any other value has changed
    for (const [key, value] of Object.entries(values)) {
      if (['first_name', 'last_name', 'phone', 'avatar', 'country', 'email'].includes(key)) {
        continue; // Skip these keys
      }
      const initialValue = formik?.initialValues[key];
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

  const handleDate = e => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');

    const formattedValue = formatDateStringDayFirst(numericValue);

    if (!inputValue.trim()) {
      formik?.setValues({
        ...formik?.values,
        date_of_birth: '', // Set to empty string when input is cleared
      });
    } else {
      formik?.setValues({
        ...formik?.values,
        date_of_birth: formattedValue,
      });

      // Validate the formatted date
      const [d, m, y] = formattedValue.split('/');
      if (!isValidDate(d, m, y)) {
        formik?.setErrors({
          ...formik?.errors,
          date_of_birth: 'Please enter a valid date',
        });
      } else {
        formik?.setErrors({
          ...formik?.errors,
          date_of_birth: '',
        });
      }
    }

    formik?.setFieldTouched('date_of_birth');
  };

  const handleAmount = e => {
    const inputValue = e.target.value;
    const currency = inputValue.slice(0, 1);
    const numericValue = inputValue.replace(/\D/g, '');
    if (!inputValue.trim()) {
      formik?.setValues({
        ...formik?.values,
        monthly_income: '', // Set to empty string when input is cleared
      });
    } else {
      formik?.setValues({
        ...formik?.values,
        monthly_income: numericValue * 1,
      });
    }

    formik?.setFieldTouched('monthly_income');
  };

  const handleBlur = e => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    const month = numericValue.substr(0, 2);
    const day = numericValue.substr(2, 2);
    const year = numericValue.substr(4);

    if (numericValue.length === 10 && !isValidDate(day, month, year)) {
      formik?.setErrors({
        ...formik?.errors,
        date_sold: 'Please enter a valid date',
      });
    } else {
      formik?.setErrors({
        ...formik?.errors,
        date_sold: '',
      });
    }

    formik?.setFieldTouched('date_sold');
  };

  const [y, m, d] = data?.date_of_birth ? data?.date_of_birth?.split('-') : [``, ``, ``];

  const formik = useFormik({
    initialValues: {
      phone: data?.phone,
      date_of_birth: data?.date_of_birth ? `${d}/${m}/${y}` : '',
      gender: data?.gender,
      marital_status: data?.marital_status,
      highest_education: data?.highest_education,
      employment_status: data?.employment_status,
      company_name: data?.company_name,
      occupation: data?.occupation,
      monthly_income: data?.monthly_income,
      address: data?.address,
      company_address: data?.company_address,
      currency: data?.currency,
    },
    onSubmit: values => {
      console.log({values});
      let exp = {};
      const [d, m, y] = values?.date_of_birth?.split('/');

      // for (const [key, value] of Object.entries(values)) {
      //   let val = value?.toString();
      //   if (val.trim() !== '') {
      //     exp[key] = value;
      //   }
      // }
      // exp = {profile_details: true, ...exp, date_of_birth: `${y}-${m}-${d}`};

      exp = {profile_details: true, ...values, date_of_birth: `${y}-${m}-${d}`};
      console.log({exp});
      mutation.mutate(exp);
    },
    validateOnChange: true,
    validate: validateForm,
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
      await profile_query?.refetch();
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
              Update Personal Information
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
            {!data?.date_of_birth && (
              <FormInput
                {...settings_input_field_style}
                placeholder="Date of Birth (DD/MM/YYYY)"
                type="text"
                onChange={handleDate}
                value={formik?.values?.date_of_birth}
                error={formik?.touched.date_of_birth && formik?.errors.date_of_birth}
                onBlur={handleBlur}
              />
            )}

            {!data?.phone && (
              <PhoneInput
                {...settings_input_field_style}
                placeholder="Phone number"
                type="phone"
                onChange={formik?.handleChange('phone')}
                value={formik?.values?.phone?.replace('+234', '')}
                formik={formik}
              />
            )}

            <FormSelect
              {...settings_select_field_style}
              options={['Married', 'Single', 'Divorced', 'Rather not say']}
              placeholder="Marital Status"
              _placeholder={{color: `red`}}
              type="text"
              onChange={formik?.handleChange('marital_status')}
              value={formik?.values?.marital_status}
              formik={formik}
            />
            <FormSelect
              {...settings_select_field_style}
              placeholder="Highest Education Level"
              type="text"
              onChange={formik?.handleChange('highest_education')}
              value={formik?.values?.highest_education}
              options={[
                'High School Diploma',
                `Bachelor's Degree`,
                'Post-Secondary Certificate',
                'Some college',
                `Master's Degree`,
                'PHD',
              ]}
              borderColor={`matador_border_color.100`}
              formik={formik}
            />

            <FormSelect
              {...settings_select_field_style}
              placeholder="Employment Status"
              type="text"
              onChange={formik?.handleChange('employment_status')}
              value={formik?.values?.employment_status}
              options={['Employed', 'Unemployed', 'Self employed']}
              borderColor={`matador_border_color.100`}
              formik={formik}
            />

            <FormInput
              {...settings_input_field_style}
              placeholder="Occupation"
              type="text"
              onChange={formik?.handleChange('occupation')}
              value={formik?.values?.occupation}
              formik={formik}
            />

            <CurrencyInput
              {...settings_input_field_style}
              placeholder="Monthly Income"
              formik={formik}
              onChange={handleAmount}
              changeCurrency={formik.handleChange('currency')}
              selectedCurrency={formik.values.currency}
              value={formatWithCommas(`${formik.values.monthly_income}`.replace(/\D/g, ''), true)}
            />

            <FormInput
              {...settings_input_field_style}
              placeholder="Company Name"
              type="text"
              onChange={formik?.handleChange('company_name')}
              value={formik?.values?.company_name}
              formik={formik}
            />

            {!data?.gender && (
              <FormSelect
                {...settings_select_field_style}
                options={['male', 'female']}
                placeholder="Gender"
                type="text"
                onChange={formik?.handleChange('gender')}
                value={formik?.values?.gender?.toLowerCase()}
                defaultValue={formik?.values?.gender?.toLowerCase()}
                textTransform={`capitalize`}
                formik={formik}
              />
            )}

            <FormInput
              {...settings_input_field_style}
              placeholder="Company Address"
              type="text"
              onChange={formik?.handleChange('company_address')}
              value={formik?.values?.company_address}
              formik={formik}
            />
            {console.log({errors: formik?.errors})}

            <FormInput
              {...settings_input_field_style}
              placeholder="Residential Address"
              type="text"
              onChange={formik?.handleChange('address')}
              value={formik?.values?.address}
            />

            <Documents type="id" profile_query={profile_query} />
            <Documents type="utility_bill" profile_query={profile_query} />
          </Grid>
          <HStack justify={`flex-end`}>
            <Button
              variation={`primary`}
              width={{base: `100%`, sm: `180px`}}
              padding={`13px 28px`}
              fontSize={`14px`}
              fontWeight={`500`}
              onClick={formik?.handleSubmit}
              isLoading={mutation.isLoading}
              isDisabled={!formik?.isValid}
            >
              Save
            </Button>
          </HStack>
        </Stack>
      </ResponsivePopupContent>
    </ResponsivePopup>
  );
};
