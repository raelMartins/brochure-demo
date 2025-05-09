import {Button, FormInput, FormSelect, UploadProfilePicture} from '@/ui-lib';
import {Box, Flex, FormLabel, Heading, HStack, Stack, Text} from '@chakra-ui/react';
import UploadUserDocuments from '../../UploadUserDocuments';
import {form_input_style} from '../registerForm';
import default_avatar from '@/realtors_portal/images/avatar.svg';

export const MoreRegistrationInfo = ({
  formik,
  isValid,
  handleUpdate,
  mutation,
  handleDate,
  handleDocument,
  doc,
  avatar,
  onAvatarChange,
  ...rest
}) => {
  return (
    <Stack gap={`8px`}>
      <Heading
        textAlign={{base: 'start', md: 'center'}}
        fontSize="24px"
        fontWeight="600"
        fontFamily={`var(--font_montserrat)`}
      >
        Let’s get to know you more{' '}
      </Heading>
      <Stack gap={`-10px`}>
        <Text
          color="red"
          fontSize={`18px`}
          fontWeight={`500`}
          lineHeight={`20px`}
          letterSpacing={`0.01em`}
        >
          * Required
        </Text>
        <HStack>
          <UploadProfilePicture
            containerStyle={{
              width: 'max-content',
              margin: 'auto',
            }}
            boxSize={`75px`}
            id="avatar"
            name="avatar"
            setFiles={onAvatarChange}
            // isAvatarLoading={AvatarMutation.isLoading}
            avatar={avatar || formik.values.avatar || default_avatar.src}
            numOfFiles={1}
            isProfilePic
            mt={{base: '20px', lg: ''}}
            showCamera={false}
          />

          <Box
            bg={`custom_color.color`}
            color={`custom_color.contrast`}
            p={{base: `7px 18px`}}
            fontSize={`10.5px`}
            fontWeight={`500`}
            lineHeight={`130%`}
            w={`max-content`}
            cursor={`not-allowed`}
          >
            <Text w={`max-content`}>Upload Passport Photograph</Text>
          </Box>
        </HStack>
      </Stack>
      <FormSelect
        {...form_input_style}
        p={`0px`}
        color={`matador_form.label`}
        opacity=".85"
        type="text"
        onChange={formik.handleChange('highest_education')}
        value={formik.values.highest_education}
        placeholder="Highest Level of Education "
        options={[
          'High School Diploma',
          `Bachelor's Degree`,
          'Post-Secondary Certificate',
          'Some college',
          `Master's Degree`,
          'PHD',
        ]}
      />
      <FormSelect
        {...form_input_style}
        p={`0px`}
        color={`matador_form.label`}
        opacity=".85"
        options={['Male', 'Female', 'Other']}
        placeholder="Gender"
        type="text"
        onChange={formik.handleChange('gender')}
        value={formik.values.gender}
      />
      <FormInput
        {...form_input_style}
        type="text"
        // onChange={formik.handleChange('date_of_birth')}
        onChange={handleDate}
        placeholder="Date of Birth (DD/MM/YYY)"
        value={formik.values.date_of_birth}
        fontSize={13}
      />
      <FormInput
        {...form_input_style}
        placeholder="Residential Address"
        type="text"
        onChange={formik.handleChange('address')}
        value={formik.values.address}
      />

      <FormSelect
        {...form_input_style}
        p={`0px`}
        color={`matador_form.label`}
        opacity=".85"
        options={['Married', 'Single']}
        placeholder="Marital Status"
        type="text"
        onChange={formik.handleChange('marital_status')}
        value={formik.values.marital_status}
      />
      {/* <FormSelect
          {...form_input_style}
          p={`0px`}
                    color={`matador_form.label`}
                    opacity=".85"
          
          placeholder="Employment Status"
          type="text"
          onChange={formik.handleChange('employment_status')}
          value={formik.values.employment_status}
          options={['Employed', 'Unemployed', 'Self employed']}
        /> */}
      <FormInput
        {...form_input_style}
        placeholder="Company's Name"
        type="text"
        onChange={formik.handleChange('company_name')}
        value={formik.values.company_name}
      />

      {/* <FormInput
          {...form_input_style}
          placeholder="Company Address"
          type="text"
          onChange={formik.handleChange('company_address')}
          value={formik.values.company_address}
        /> */}
      <UploadUserDocuments
        noNeedForType
        displayText={
          doc?.[0]
            ? // ? `Uploaded: ${toDateFormat(doc?.[0]?.created_at)}`
              `Image Uploaded`
            : 'Upload ID'
        }
        handleDocument={handleDocument}
      />
      <Button
        onClick={handleUpdate}
        isLoading={mutation.isLoading}
        isDisabled={!isValid}
        variation={`primary`}
      >
        Proceed
      </Button>
    </Stack>
  );
};
