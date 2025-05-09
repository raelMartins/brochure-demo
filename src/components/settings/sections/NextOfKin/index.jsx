import React from 'react';
import {Text, Stack, Grid, Center, HStack, useDisclosure} from '@chakra-ui/react';
import {getSettingsData} from '@/api/Settings';
import {useQuery} from 'react-query';
import {HiPencil} from 'react-icons/hi';
import {UpdateNextOfKinModal} from './UpdateModal';
import {SettingsDetail} from '../../SettingsDetails';

export const NextOfKin = ({LoggedinUser}) => {
  const disclosure = useDisclosure();

  const next_of_kin_query = useQuery(['next_of_kin'], () => getSettingsData({next_of_kin: true}), {
    enabled: !!LoggedinUser,
  });

  const next_of_kin = next_of_kin_query?.data?.data?.data;

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
          Next of Kin
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
        <SettingsDetail
          label={`Full Name`}
          value={next_of_kin?.first_name && `${next_of_kin?.first_name} ${next_of_kin?.last_name}`}
        />
        <SettingsDetail label={`Email Address`} value={next_of_kin?.email} />
        <SettingsDetail label={`Phone Number`} value={next_of_kin?.phone} />
        <SettingsDetail label={`Relationship`} value={next_of_kin?.relationship} />
        <SettingsDetail
          label={`Residential Address`}
          value={next_of_kin?.residential_address}
          colSpan={{base: 6, xl: 24}}
        />
      </Grid>
      {!next_of_kin_query?.isLoading && (
        <UpdateNextOfKinModal next_of_kin_query={next_of_kin_query} disclosure={disclosure} />
      )}
    </Stack>
  );
};
