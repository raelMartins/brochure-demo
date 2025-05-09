import {Center, useToast} from '@chakra-ui/react';
import {
  NextOfKin,
  PaymentMethod,
  PersonalInformation,
  Profile,
} from '@/components/page-components/settings/sections';
import {useMutation, useQuery} from 'react-query';
import {getSettingsData, updateSettings} from '@/api/Settings';
import {Spinner} from '@/ui-lib';
import {LayoutView} from '@/components';

const Settings = () => {
  const toast = useToast();
  const settingsQuery = useQuery(['getSettingsData', 'profile'], () =>
    getSettingsData({profile: true})
  );
  const next_of_kinQuery = useQuery(['getSettingsData', 'next_of_kin'], () =>
    getSettingsData({next_of_kin: true})
  );
  const documentsQuery = useQuery(['getSettingsData', 'documents'], () =>
    getSettingsData({documents: true})
  );
  const documentsData = documentsQuery?.data?.data?.data;

  const mutation = useMutation(forlgata => updateSettings(forlgata), {
    onSuccess: res => {
      toast({
        title: 'changes updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      settingsQuery.refetch();
      next_of_kinQuery.refetch();
      documentsQuery.refetch();
    },
    onError: res => {
      toast({
        title: err?.message === 'Network Error' ? 'Network Error' : 'Oops something went wrong',
        description: `${err?.response?.data?.message ?? 'please check your network connection'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const onAvatarChange = file => {
    mutation.mutate({
      profile_avatar: true,
      avatar: file[0]?.image.replace('data:', '').replace(/^.+,/, ''),
    });
    return profileQuery.refetch();
  };
  const profileData = settingsQuery?.data?.data?.data;
  const nextOfKinData = next_of_kinQuery?.data?.data?.data;

  return (
    <LayoutView>
      {settingsQuery?.isLoading || next_of_kinQuery?.isLoading || documentsQuery?.isLoading ? (
        <Spinner />
      ) : (
        <Center flexDirection={'column'} gap="35px" mt="25px">
          <Profile
            profileData={profileData}
            setFiles={onAvatarChange}
            isAvatarLoading={mutation?.isLoading}
          />
          <PersonalInformation
            infoData={profileData}
            documentsData={documentsData}
            mutation={mutation}
            documentsQuery={documentsQuery}
          />
          <NextOfKin
            infoData={nextOfKinData}
            mutation={mutation}
            next_of_kinQuery={next_of_kinQuery}
          />
          <PaymentMethod />
        </Center>
      )}
    </LayoutView>
  );
};

export default Settings;
