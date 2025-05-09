import {getSettingsData, updateSettings} from '@/api/Settings';
import {LayoutView} from '@/components';
import {PaymentAccess} from '@/components/payment_flow/PaymentAccess';
import {NextOfKin} from '@/components/settings/sections/NextOfKin';
import {Payments} from '@/components/settings/sections/Payments';
import {PersonalInfo} from '@/components/settings/sections/PersonalInfo';
import {Spinner} from '@/ui-lib';
import {UploadProfilePicture} from '@/ui-lib/ui-lib.components/UploadProfilePicture';
import useGetSession from '@/utils/hooks/getSession';
import {Center, Flex, Grid, GridItem, HStack, Stack, Text, useToast} from '@chakra-ui/react';
import Image from 'next/image';
import {HiOutlineCamera, HiPencil} from 'react-icons/hi';
import {MdAccountCircle} from 'react-icons/md';
import {useMutation, useQuery} from 'react-query';

const container_style = {
  bg: `matador_background.200`,
  border: `1px solid`,
  borderColor: `matador_border_color.100`,
  padding: {base: `16px 24px`},
  justifyContent: `space-between`,
};

export default function SettingsPage() {
  const toast = useToast();
  const {sessionData: LoggedinUser} = useGetSession('loggedIn');

  const profile_query = useQuery(['profile'], () => getSettingsData({profile: true}));

  const profile = profile_query?.data?.data?.data;
  const avatar = profile?.avatar;

  const AvatarMutation = useMutation(data => updateSettings(data), {
    onSuccess: res => {
      toast({
        title: 'Profile Picture Updated Successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      profile_query.refetch();
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
    AvatarMutation.mutate({
      profile_avatar: true,
      avatar: file[0]?.image.replace('data:', '').replace(/^.+,/, ''),
    });
    return profile_query.refetch();
  };

  return (
    <LayoutView isLoading={profile_query?.isLoading}>
      {
        <Stack gap={`22px`} py={{base: `30px`}} px={{base: `24px`, lg: `0px`}}>
          <HStack {...container_style} borderRadius={{base: `8px`}}>
            <Flex gap={`10px`} align={`center`}>
              <Center boxSize={`72px`} position="relative" borderRadius={`50%`} overflow={`hidden`}>
                {avatar ? (
                  <Image alt="profile_icon" src={avatar} fill style={{objectFit: `cover`}} />
                ) : (
                  <MdAccountCircle fontSize={`72px`} />
                )}
                <Center
                  position="absolute"
                  top="0px"
                  left="0px"
                  right="0px"
                  bottom="0px"
                  bg={`rgba(255,255,255,0.5)`}
                  zIndex={`1`}
                  transition={`.3s`}
                  opacity={AvatarMutation?.isLoading ? `1` : `0`}
                >
                  <Spinner noAbsolute height={`15px`} width={`15px`} />
                </Center>
              </Center>
              <Stack gap={`4px`}>
                <Text fontSize={`20px`} fontWeight={`500`} lineHeight={`130%`}>
                  {LoggedinUser?.first_name} {LoggedinUser?.last_name}
                </Text>
                <Text
                  fontSize={`14px`}
                  fontWeight={`400`}
                  lineHeight={`140%`}
                  letterSpacing={`0.14px`}
                  color={`matador_text.400`}
                >
                  {LoggedinUser?.email}
                </Text>
              </Stack>
            </Flex>
            <UploadProfilePicture
              containerStyle={{
                width: 'max-content',
                margin: 'auto',
              }}
              id="avatar"
              name="avatar"
              setFiles={onAvatarChange}
              isAvatarLoading={AvatarMutation.isLoading}
              avatar={profile?.avatar}
              numOfFiles={1}
              isProfilePic
              mt={{base: '20px', lg: 0}}
              // showCamera={false}
            >
              <Center
                color={`custom_color.color_pop`}
                fontSize={`20px`}
                bg={`custom_color.opacity_pop._10`}
                border={`1px solid`}
                borderColor={`custom_color.opacity_pop._20`}
                boxSize={`48px`}
                borderRadius={`50%`}
                cursor={`pointer`}
              >
                <HiOutlineCamera />
              </Center>
            </UploadProfilePicture>
          </HStack>

          <PersonalInfo LoggedinUser={LoggedinUser} />
          <NextOfKin LoggedinUser={LoggedinUser} />
          <PaymentAccess content={<Payments LoggedinUser={LoggedinUser} />} />
        </Stack>
      }
    </LayoutView>
  );
}
