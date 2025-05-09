import {Button, FormInput} from '@/ui-lib';
import {Box, Flex, Heading, Text} from '@chakra-ui/react';
import {form_input_style} from '../registerForm';

export const BasicRegistrationInfo = ({formik, setScreen, setCountryCode, ...rest}) => {
  return (
    <>
      <Flex h="full" direction="column" justify={'center'} align="center" gap={`12px`}>
        <Heading
          textAlign={{base: 'start', md: 'center'}}
          fontSize="24px"
          fontWeight="600"
          fontFamily={`var(--font_montserrat)`}
        >
          Input basic details to create an account{' '}
        </Heading>
        <FormInput
          {...form_input_style}
          type="text"
          error={formik.errors.first_name && formik.touched.first_name}
          onChange={formik.handleChange('first_name')}
          value={formik.values.first_name}
          placeholder="First Name"
          formik={formik}
        />
        <FormInput
          {...form_input_style}
          type="text"
          error={formik.errors.middle_name && formik.touched.middle_name}
          onChange={formik.handleChange('middle_name')}
          value={formik.values.middle_name}
          placeholder="Middle Name"
        />
        <FormInput
          {...form_input_style}
          type="text"
          error={formik.errors.last_name && formik.touched.last_name}
          onChange={formik.handleChange('last_name')}
          value={formik.values.last_name}
          placeholder="Last Name"
        />

        <Box w="full">
          <Flex w="full" align={'center'} gap={`12px`}>
            <FormInput
              type="phone"
              value={formik.values.phone}
              onChange={formik.handleChange('phone')}
              // getDialCode={el => setCountryCode(el)}
              pattern="[0-9]"
              placeholder={'Phone number'}
              error={formik.errors.phone && formik.touched.phone}
            />
          </Flex>
          {/* <Text color={`red`} my={'5px'} fontSize={'14px'}>
            {formik.errors.phone && formik.touched.phone}
          </Text> */}
        </Box>
        <Button
          onClick={() => setScreen('moreInfo')}
          // isLoading={isLoading}
          isDisabled={
            !formik.values.phone ||
            !formik.values.last_name ||
            !formik.values.middle_name ||
            !formik.values.first_name
          }
          variation={`primary`}
        >
          <Text>Proceed</Text>
        </Button>
      </Flex>
    </>
  );
};
