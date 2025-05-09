import {Box, Text, Stack, Flex, Image, useDisclosure, SimpleGrid} from '@chakra-ui/react';
import EditPersonalInformationModal from '../modals/EditPersonalInfoModal';
import {formatToCurrency} from '@/utils/formatAmount';
import Documents from './Documents';

export const PersonalInformation = ({infoData, documentsData, documentsQuery, mutation}) => {
  const updatePersonalInfo = useDisclosure();
  const documentDetail = documentsData?.[0];

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
          Personal Information
        </Text>
        <Box cursor={'pointer'} onClick={updatePersonalInfo.onOpen}>
          <Image boxSize={'48px'} alt="" src="./images/icons/edit-icon.svg" />
        </Box>
      </Flex>
      <Stack>
        <SimpleGrid
          minChildWidth={{base: '', md: '300.25px'}}
          templateColumns={{base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)'}}
          spacing={5}
        >
          <Box {...boxStyle}>
            <Text {...textLeadStyle}>Date of Birth</Text>
            <Text {...textValueStyle}>{infoData?.date_of_birth ?? '-'}</Text>
          </Box>
          <Box {...boxStyle}>
            <Text {...textLeadStyle}>Phone Number</Text>
            <Text {...textValueStyle}>{infoData?.phone ?? '-'}</Text>
          </Box>
          <Box {...boxStyle}>
            <Text {...textLeadStyle}>Marital Status</Text>
            <Text {...textValueStyle}>{infoData?.marital_status ?? '-'}</Text>
          </Box>
          <Box {...boxStyle}>
            <Text {...textLeadStyle}>Highest Education Level</Text>
            <Text {...textValueStyle}>{infoData?.highest_education ?? '-'}</Text>
          </Box>
          <Box {...boxStyle}>
            <Text {...textLeadStyle}>Employment Status</Text>
            <Text {...textValueStyle}>{infoData?.employment_status ?? '-'}</Text>
          </Box>
          <Box {...boxStyle}>
            <Text {...textLeadStyle}>Occupation</Text>
            <Text {...textValueStyle}>{infoData?.occupation ?? '-'}</Text>
          </Box>
          <Box {...boxStyle}>
            <Text {...textLeadStyle}>Monthly Income</Text>
            <Text {...textValueStyle}>{formatToCurrency(infoData?.monthly_income) ?? '-'}</Text>
          </Box>
          <Box {...boxStyle}>
            <Text {...textLeadStyle}>{`Company's Name`}</Text>
            <Text {...textValueStyle}>{infoData?.company_name ?? '-'}</Text>
          </Box>
        </SimpleGrid>
        <Flex w="full" gap="24px" mt="15px" flexDirection={{base: 'column', md: 'row'}}>
          <Box {...boxStyle} flex={{base: '1', md: '0.5'}}>
            <Text {...textLeadStyle}>{`Company's Address`}</Text>
            <Text {...textValueStyle}>{infoData?.company_address ?? '-'}</Text>
          </Box>
          <Box {...boxStyle} flex={{base: '1', md: '0.5'}}>
            <Text {...textLeadStyle}>Residential Address</Text>
            <Text {...textValueStyle}>{infoData?.address ?? '-'}</Text>
          </Box>
          <Box {...boxStyle} flex={{base: '1', md: '0.5'}}>
            <Text {...textLeadStyle}>Valid ID</Text>
            <Text {...textValueStyle}>{documentDetail?.document_name ?? '-'}</Text>
          </Box>
        </Flex>
      </Stack>

      <EditPersonalInformationModal
        isOpen={updatePersonalInfo.isOpen}
        onClose={updatePersonalInfo.onClose}
        infoData={infoData}
        documentsData={documentDetail}
        mutation={mutation}
        documentsQuery={documentsQuery}
      />
    </Stack>
  );
};

export default PersonalInformation;

export const boxStyle = {
  gap: '8px',
  flexShrink: '0',
  display: 'flex',
  width: 'full',
  background: '#FFF',
  padding: '16px 24px',
  flexDirection: 'column',
  alignDtems: 'flex-start',
  border: '1px solid #E5E5E5',
};
export const textLeadStyle = {
  color: '#525252',

  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: '400',
  letterSpacing: '0.14px',
};
export const textValueStyle = {
  color: '#141414',

  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '500',
  letterSpacing: '0.16px',
  textTransform: 'capitalize',
};
