import React from 'react';
import {Text, Stack, Grid, Center, HStack, useDisclosure, useToast} from '@chakra-ui/react';
import {getSettingsData} from '@/api/Settings';
import {useQuery} from 'react-query';
import {HiPencil} from 'react-icons/hi';
import {UpdateProfileModal} from './UpdateModal';
import {SettingsDetail} from '../../SettingsDetails';
import {formatDateToString} from '@/utils/formatDate';

export const PersonalInfo = ({LoggedinUser}) => {
  const disclosure = useDisclosure();

  const profile_query = useQuery(['profile'], () => getSettingsData({profile: true}), {
    enabled: !!LoggedinUser,
  });

  const profile = profile_query?.data?.data?.data;

  return (
    <Stack gap={{base: `14px`}}>
      <HStack gap={`10px`} justify={`space-between`}>
        <Text
          color={`text`}
          fontSize={`16px`}
          fontWeight={`500`}
          lineHeight={`140%`}
          letterSpacing={`0.16px`}
          textTransform={`uppercase`}
        >
          PERSONAL INFORMATION
        </Text>
        <Center
          color={`custom_color.color_pop`}
          fontSize={`20px`}
          bg={`custom_color.opacity_pop._10`}
          border={`1px solid`}
          borderColor={`custom_color.opacity_pop._20`}
          boxSize={`48px`}
          borderRadius={`50%`}
          cursor={`pointer`}
          onClick={disclosure.onOpen}
        >
          <HiPencil />
        </Center>
      </HStack>
      <Grid
        templateColumns={{base: `repeat(6, 1fr)`, sm: `repeat(12, 1fr)`, xl: `repeat(24, 1fr)`}}
        gap={{base: `16px`}}
      >
        <SettingsDetail label={`Date of Birth`} value={profile?.date_of_birth} />
        <SettingsDetail label={`Phone Number`} value={profile?.phone} />
        <SettingsDetail label={`Marital Status`} value={profile?.marital_status} />
        <SettingsDetail label={`Highest Education Level`} value={profile?.highest_education} />
        <SettingsDetail label={`Employment Status`} value={profile?.employment_status} />
        <SettingsDetail label={`Occupation`} value={profile?.occupation} />
        <SettingsDetail
          label={`Monthly Income`}
          value={profile?.monthly_income ? `${profile?.monthly_income} ${profile?.currency}` : null}
        />
        <SettingsDetail label={`Company’s Name`} value={profile?.company_name} />
        <SettingsDetail
          label={`Company’s Address`}
          value={profile?.company_address}
          colSpan={{base: 6, xl: 9}}
        />
        <SettingsDetail
          label={`Residential Address`}
          value={profile?.address}
          colSpan={{base: 6, xl: 9}}
        />
        <SettingsDetail label={`Gender`} value={profile?.gender} />
        <SettingsDetail label={`Customer Ref`} value={profile?.customer_ref} />
        <SettingsDetail
          label={`Valid ID`}
          value={
            profile?.documents?.[0]?.created_at
              ? `Uploaded on: ${formatDateToString(profile?.documents?.[0]?.created_at)}`
              : null
          }
        />
        <SettingsDetail
          label={`Utility Bill`}
          value={
            profile?.utility_bill_updated_at
              ? `Uploaded on: ${formatDateToString(profile?.utility_bill_updated_at)}`
              : null
          }
        />
        {console.log({profile})}
      </Grid>
      {!profile_query?.isLoading && (
        <UpdateProfileModal profile_query={profile_query} disclosure={disclosure} />
      )}
    </Stack>
  );
};
