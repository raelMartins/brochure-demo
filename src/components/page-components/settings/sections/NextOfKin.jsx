import React from 'react';
import EditNextOfKinModal from '../modals/EditNextOfKinModal';
import {
  Box,
  SimpleGrid,
  Text,
  Button,
  IconButton,
  Stack,
  Flex,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import {boxStyle, textLeadStyle, textValueStyle} from './PersonalInfo';

export const NextOfKin = ({infoData, next_of_kinQuery, mutation}) => {
  const updateNextOfKinInfo = useDisclosure();

  return (
    <Stack w="full">
      <Flex w="full" justify={'space-between'} alignItems={'center'} pb="8px">
        <Text
          color="#000"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="500"
          letterSpacing="0.16px"
          textTransform={'uppercase'}
        >
          Next of Kin
        </Text>
        <Box cursor={'pointer'} onClick={updateNextOfKinInfo.onOpen}>
          <Image boxSize={'48px'} alt="" src="./images/icons/edit-icon.svg" />
        </Box>
      </Flex>

      <Stack>
        <SimpleGrid
          minChildWidth={{base: '', md: '300.25px'}}
          templateColumns={{base: '1fr', md: 'repeat(4, 1fr)'}}
          spacing={5}
        >
          <Box {...boxStyle}>
            <Text {...textLeadStyle}>Full Name</Text>
            <Text {...textValueStyle}>
              {infoData?.first_name?.trim()
                ? infoData?.first_name + ' ' + infoData?.last_name
                : '-'}
            </Text>
          </Box>
          <Box {...boxStyle}>
            <Text {...textLeadStyle}>Email</Text>
            <Text textTransform="none" {...textValueStyle}>
              {infoData?.email?.trim() ? infoData?.email : '-'}
            </Text>
          </Box>
          <Box {...boxStyle}>
            <Text {...textLeadStyle}>Phone Number</Text>
            <Text {...textValueStyle}>{infoData?.phone?.trim() ? infoData?.phone : '-'}</Text>
          </Box>
          <Box {...boxStyle}>
            <Text {...textLeadStyle}>Relationship</Text>
            <Text {...textValueStyle}>
              {infoData?.relationship?.trim() ? infoData?.relationship : '-'}
            </Text>
          </Box>
        </SimpleGrid>
        <Flex w="full" gap="24px" mt="15px" flexDirection={{base: 'column', md: 'row'}}>
          <Box {...boxStyle} flex={{base: '1'}}>
            <Text {...textLeadStyle}>Residential Address</Text>
            <Text {...textValueStyle}>
              {infoData?.residential_address?.trim() ? infoData?.residential_address : '-'}
            </Text>
          </Box>
        </Flex>
      </Stack>

      <EditNextOfKinModal
        isOpen={updateNextOfKinInfo.isOpen}
        onClose={updateNextOfKinInfo.onClose}
        infoData={infoData}
        // documentsData={documentDetail}
        mutation={mutation}
        next_of_kinQuery={next_of_kinQuery}
      />
    </Stack>
  );
};

export default NextOfKin;
