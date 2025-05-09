import {fetchInvestorPackets, sendInvestorPackets} from '@/api/payment';
import {encodeFileToBase64} from '@/utils/convertFileToBase64';
import {formatDateToString} from '@/utils/formatDate';
import {
  AbsoluteCenter,
  Box,
  Center,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Input,
  Link,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {useRef} from 'react';
import {useMutation, useQuery} from 'react-query';
import warning_icon from '/src/images/icons/warning-alert.svg';
import uploadIcon from '/src/images/icons/uploadForHomeOwnerPacket.svg';
import thinArrow from '/src/images/icons/thinArrow.svg';
import {useRouter} from 'next/navigation';
import EmptyState from '@/components/appState/empty-state';
import MobileHeader from '@/components/navbar/mobile_header';
import {drawer_styles, drawer_title_styles} from '@/components/drawers/styles';
import ThreeDots from '@/components/loaders/ThreeDots';
import ExploreArrow from '@/components/assets/exploreArrow';
import {Button} from '@/ui-lib';
import ErrorState from '@/components/appState/error-state';

export const HomeOwnersPacket = ({equityId, modal}) => {
  const HOME__OWNERS__PACKETS = useQuery(['fetchInvestorPackets', equityId], () =>
    fetchInvestorPackets(equityId)
  );
  const inputRef = useRef(null);
  const toast = useToast();
  const router = useRouter();
  const packetData = HOME__OWNERS__PACKETS?.data?.data;

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const {mutate, isLoading} = useMutation(formData => sendInvestorPackets(equityId, formData), {
    onSuccess: async res => {
      await HOME__OWNERS__PACKETS.refetch();
      toast({
        description: `Packet Uploaded successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      inputRef.current.value = '';
    },
    onError: err => {
      inputRef.current.value = '';
      toast({
        description: `Failed to upload packet`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleUpload = e => {
    let based = [];
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      encodeFileToBase64(files[i]).then(filed => {
        const body = {
          packet: filed.replace('data:', '').replace(/^.+,/, ''),
          packet_name: files[i]?.name,
        };
        based.push(body);
        if (files.length === based.length) {
          return mutate(based);
        }
      });
    }
  };

  const ReceivedPacket = () => {
    return (
      <>
        {packetData?.received?.length > 0 ? (
          <VStack
            // mt="20px"
            align={'stretch'}
            mx="auto"
            w="full"
            spacing="12px"
            h="full"
            overflowY={'auto'}
          >
            {packetData?.received?.map((item, index) => (
              <Flex
                key={index}
                align={'center'}
                w="full"
                p={'16px'}
                gap="12px"
                justify="space-between"
                h="full"
                maxH="70px"
              >
                <VStack align={'flex-start'} spacing="0">
                  <Text
                    color="text.1"
                    fontWeight={500}
                    textTransform="uppercase"
                    letterSpacing="0.16px"
                  >
                    {item?.packet_name}
                  </Text>
                  <Text color="text.1" fontSize={'12px'} fontWeight={400}>
                    {item?.added_at ? `Uploaded: ${formatDateToString(item?.added_at)}` : 'n/a'}
                  </Text>
                </VStack>
                <Link
                  _hover={{border: 'none'}}
                  textDecoration="none"
                  href={item?.packet ?? '#'}
                  target="_blank"
                >
                  <Flex gap="4px" align={'start'}>
                    <Text color="custom_color.color_pop">VIEW</Text>
                    <ExploreArrow boxSize="20px" />
                  </Flex>
                </Link>
              </Flex>
            ))}
          </VStack>
        ) : (
          <EmptyState
            icon
            text="No home owner's packet has been uploaded yet"
            textSize={12}
            headerStyle={{
              textTransform: 'uppercase',
              fontWeight: 700,
              fontSize: '14px',
            }}
            height={{base: '200px', md: '300px'}}
          />
        )}
      </>
    );
  };

  const SentPacket = () => {
    return (
      <>
        {packetData?.sent?.length ? (
          <VStack
            // mt="20px"
            align={'stretch'}
            mx="auto"
            w="full"
            spacing="12px"
            h="full"
            overflowY={'auto'}
          >
            {packetData?.received?.map((item, index) => (
              <Flex
                key={index}
                align={'center'}
                w="full"
                p={'16px'}
                gap="12px"
                justify="space-between"
                h="full"
                maxH="70px"
              >
                <VStack align={'flex-start'} spacing="0">
                  <Text
                    color="text.1"
                    fontWeight={500}
                    textTransform="uppercase"
                    letterSpacing="0.16px"
                  >
                    {item?.packet_name}
                  </Text>
                  <Text color="text.1" fontSize={'12px'} fontWeight={400}>
                    {item?.added_at ? `Uploaded: ${formatDateToString(item?.added_at)}` : 'n/a'}
                  </Text>
                </VStack>
                <Link
                  _hover={{border: 'none'}}
                  textDecoration="none"
                  href={item?.packet ?? '#'}
                  target="_blank"
                >
                  <Flex gap="4px" align={'start'}>
                    <Text color="custom_color.color_pop">VIEW</Text>
                    <ExploreArrow boxSize={`20px`} />
                  </Flex>
                </Link>
              </Flex>
            ))}
          </VStack>
        ) : (
          <EmptyState
            icon
            text="No home owner's packet has been uploaded yet"
            textSize={12}
            headerStyle={{
              textTransform: 'uppercase',
              fontWeight: 700,
              fontSize: '14px',
            }}
            height={{base: '200px', md: '300px'}}
          />
        )}
      </>
    );
  };

  const packetTabs = [
    {
      tablist: 'Received',
      component: <ReceivedPacket />,
    },
    {
      tablist: 'Sent',
      component: <SentPacket />,
    },
  ];

  const mainContent = (
    <Stack h={`100%`}>
      <MobileHeader onDrawerClose={modal.onClose} activePage={`Home owner's Packet`} />

      <Flex {...drawer_title_styles} display={{base: 'none', md: 'flex'}}>
        <Text>Home owner&apos;s Packet</Text>
        <DrawerCloseButton position="initial" onClick={modal.onClose} />
      </Flex>
      {HOME__OWNERS__PACKETS?.isLoading ? (
        <Center flex={`1`}>
          <ThreeDots />
        </Center>
      ) : HOME__OWNERS__PACKETS?.isError ? (
        <ErrorState text={`There was a problem retrieving the document. Please try again.`} />
      ) : (
        <Box w="full" h="full">
          <Tabs
            isFitted
            variant="enclosed"
            align="center"
            isLazy
            h="full"
            bg="matador_background.200"
          >
            <TabList
              bg="matador_background.100"
              boxShadow="none"
              fontWeight="600"
              fontSize="18px"
              lineHeight="23px"
              maxW="100%"
              px="32px"
              py="10px"
              justifyContent={'space-between'}
            >
              {packetTabs.map((item, index) => (
                <Tab
                  key={index}
                  wordBreak="keep-all"
                  pb="10px"
                  _focusVisible={{
                    boxShadow: 'none',
                  }}
                  fontWeight={400}
                  border="none"
                  maxW="85px"
                  color="matador_text.400"
                  textTransform="uppercase"
                  _selected={{
                    color: 'custom_color.color_pop',
                    border: 'none',
                    fontWeight: '500',
                  }}
                >
                  {item.tablist}
                </Tab>
              ))}
            </TabList>
            <TabIndicator mt="-2px" height="2px" bg="custom_color.color_pop" borderRadius="27px" />
            <TabPanels sx={customScrollbarStyles} h="45vh" overflow="auto">
              {packetTabs.map((item, index) => (
                <TabPanel key={index} px="0px" py="18px" h="full">
                  {item.component}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      )}

      {HOME__OWNERS__PACKETS?.isError ? null : (
        <Box px="22px" mb="40px">
          <Button
            variation={`primary`}
            // borderRadius="4px"
            position="relative"
          >
            <Input
              type="file"
              w="full"
              opacity="0"
              h="full"
              position="absolute"
              ref={inputRef}
              onChange={handleUpload}
              top="0"
              cursor="pointer"
              left="0"
              accept=".pdf"
              multiple
              isDisabled={isLoading}
              _disabled={{bg: 'transparent', opacity: '0'}}
            />
            <Image boxSize="19.238px" src={uploadIcon.src} alt="upload icon" />
            <Text color="#fff" fontSize="14.429px" fontWeight="400">
              {isLoading ? 'Uploading...' : 'Upload'}
            </Text>
          </Button>
        </Box>
      )}
    </Stack>
  );

  return (
    <Drawer placement="right" autoFocus={false} isOpen={modal?.isOpen} onClose={modal?.onClose}>
      <DrawerOverlay />
      <DrawerContent {...drawer_styles}>{mainContent}</DrawerContent>
    </Drawer>
  );
};
