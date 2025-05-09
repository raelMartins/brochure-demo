'use client';

import {cloneElement, isValidElement, useEffect, useState} from 'react';
import {
  VStack,
  Text,
  Box,
  HStack,
  useClipboard,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  Center,
  useDisclosure,
  Stack,
  Divider,
  Tooltip,
  Flex,
} from '@chakra-ui/react';
import {IoMdClose} from 'react-icons/io';
import {fetchProjectsById} from '@/api/listing';
import {ColorBackground} from '@/ui-lib';
import {icon_tooltip_style} from '@/components/page-components/listings/PropertySidebar';
import {useQuery} from 'react-query';
import EmptyState from '@/components/appState/empty-state';
import {drawer_styles, drawer_title_styles} from '../styles';
import {getAllContactPersons} from '@/api/listings';
import isMobile from '@/utils/extras';
import MobileHeader from '@/components/navbar/mobile_header';

const ContactPersonContent = ({info, disclosure}) => {
  const [copiedContact, setCopiedContact] = useState(null);
  const toast = useToast();

  const ALL_CONTACT_PERSONS_QUERY = useQuery(['allContactPersons', info?.id], () =>
    getAllContactPersons(info?.id)
  );

  const ALL_CONTACT_PERSONS_DATA = ALL_CONTACT_PERSONS_QUERY?.data?.data?.results || [];

  const contact_people = !ALL_CONTACT_PERSONS_DATA?.length
    ? info?.contact_persons
    : ALL_CONTACT_PERSONS_DATA;

  const handleClick = number => {
    navigator.clipboard.writeText(number);
    setCopiedContact(number);
    toast({
      title: `Success`,
      duration: `5000`,
      position: `top-right`,
      status: `success`,
      description: `Contact Copied`,
    });
    setTimeout(() => {
      setCopiedContact(``);
    }, 2000);
  };

  return (
    <Box>
      <DrawerHeader p={`0px`}>
        <MobileHeader
          pb="10px"
          onDrawerOpen={disclosure.onOpen}
          onDrawerClose={disclosure.onClose}
          activePage={`Contact Person`}
        />
        <HStack {...drawer_title_styles}>
          <Text>Contact Person</Text>
          <Center onClick={() => disclosure.onClose()} cursor={`pointer`} fontSize={`20px`}>
            <IoMdClose />
          </Center>
        </HStack>
      </DrawerHeader>

      <VStack align={'stretch'} gap={{base: '12px'}} p={{base: `16px`}}>
        {contact_people?.length === 0 ? (
          <EmptyState height={{base: '200px', md: '300px'}} text={`No contact person found`} />
        ) : (
          contact_people?.map(person => (
            <Stack
              key={person?.id}
              border={`.6px solid`}
              borderColor={`custom_color.color_pop`}
              borderRadius={'0px'}
              transition={`.3s`}
              _hover={{
                bg: copiedContact ? `custom_color.opacity_pop._30` : `custom_color.opacity_pop._20`,
              }}
              bg={copiedContact ? `custom_color.opacity_pop._30` : `custom_color.opacity_pop._10`}
              as={'a'}
              href={isMobile ? `tel:${person?.phone_number}` : null}
              onClick={() => handleClick(person?.phone_number)}
              gap={'8px'}
              cursor="pointer"
              color={'text'}
              w="full"
              p={`14px`}
              justify={'space-between'}
              alignItems={`flex-start`}
              divider={
                <Divider
                  width={`60%`}
                  borderColor={`custom_color.color_pop`}
                  m={`0px !important`}
                />
              }
            >
              <Text
                fontSize={'14px'}
                fontWeight={500}
                textAlign={`left`}
                textTransform={`uppercase`}
                letterSpacing={`0.01em`}
                lineHeight={`19.6px`}
              >
                {person?.name}
                {/* PETER JOHN */}
              </Text>
              <Text
                color="matador_text.400"
                fontSize={'10px'}
                fontWeight={500}
                textAlign={`left`}
                letterSpacing={`6%`}
                lineHeight={`16px`}
              >
                {person?.phone_number}
              </Text>
            </Stack>
          ))
        )}
      </VStack>
    </Box>
  );
};

export const ContactPerson = ({InnerComponent, info, property_id}) => {
  const [screenWidth, setScreenWidth] = useState(0);

  const contactModal = useDisclosure();

  // const {data, isError, isLoading, error} = useQuery(
  //   ['project_data', property_id],
  //   () => fetchProjectsById(parseInt(property_id)),
  //   {
  //     enabled: !!property_id,
  //   }
  // );

  // const info = data?.data?.project;

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  return (
    info && (
      <>
        <Tooltip label={`Contact Person`} placement="top" sx={icon_tooltip_style}>
          <span>
            {InnerComponent
              ? isValidElement(InnerComponent)
                ? cloneElement(InnerComponent, {
                    onClick: () => {
                      contactModal.onOpen();
                    },
                    style: {cursor: 'pointer'},
                  })
                : null
              : null}
          </span>
        </Tooltip>
        <Drawer
          autoFocus={false}
          onClose={contactModal?.onClose}
          isOpen={contactModal?.isOpen}
          // placement={screenWidth >= 768 ? 'right' : `bottom`}
          placement={'right'}
        >
          <DrawerOverlay />
          <DrawerContent {...drawer_styles}>
            <ContactPersonContent info={info} disclosure={contactModal} />
          </DrawerContent>
        </Drawer>
      </>
    )
  );
};
