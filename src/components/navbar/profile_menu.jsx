import React from 'react';
import {
  Flex,
  Image,
  Text,
  MenuList,
  Menu,
  MenuItem,
  useDisclosure,
  ModalOverlay,
  Modal,
  ModalContent,
  Stack,
  useTheme,
} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';
import {ExternalOpen} from '../assets/ExternalOpen';
import {deleteCookies} from '@/ui-lib/ui-lib.hooks/sessionmanagers';
import {ExternalLink} from '@/ui-lib';

export const ProfileMenu = ({
  TERMS,
  PRIVACY_POLICY,
  avatar,
  reportBugModal,
  suggestModal,
  userDetails,
}) => {
  const router = useRouter();
  const menuDisclosure = useDisclosure();
  const handleLogout = () => {
    deleteCookies(['token', 'loggedIn']);
    window.location.reload();
  };
  const theme = useTheme();
  const primaryColor = theme.colors.primary?.color;
  const fullName = userDetails ? `${userDetails?.first_name} ${userDetails?.last_name}` : '';

  return (
    <>
      <Image
        src={avatar}
        rounded="full"
        boxSize="48px"
        alt="user icon"
        cursor="pointer"
        onClick={menuDisclosure.onOpen}
      />
      <Modal isOpen={menuDisclosure.isOpen} onClose={menuDisclosure.onClose}>
        <ModalOverlay bg="rgba(0, 0, 0, 0.2)" />
        <ModalContent top="17px" left={{base: '30%', '2xl': '27%'}} bg="matador_background.100">
          <Menu isOpen={menuDisclosure.isOpen} onClose={menuDisclosure.onClose} h="fit-content">
            <MenuList
              bg="matador_background.100"
              color={`text`}
              display="flex"
              flexDirection="column"
              borderColor={`matador_border_color.200`}
              zIndex={200}
              // p="19px"
              w="370px"
              py={`15px`}
            >
              <Flex
                direction={'column'}
                alignItems={'center'}
                gap={'7px'}
                align="center"
                py="20px"
                w="full"
                mb="20px"
                textAlign={`center`}
              >
                <Image src={avatar} rounded="full" boxSize="65.797px" alt="user icon" />
                <Stack gap={`4px`}>
                  <Text fontWeight={500} fontSize={'20px'} lineHeight={`130%`} letterSpacing={`0%`}>
                    {fullName}
                  </Text>
                  <Text
                    fontWeight={400}
                    fontSize={'14px'}
                    lineHeight={`140%`}
                    letterSpacing={`1%`}
                    color={`matador_text.500`}
                  >
                    {userDetails?.email}
                  </Text>
                </Stack>
                <ExternalLink
                  text={`View Profile`}
                  iconSize={`18px`}
                  onClick={() => router.push('/settings')}
                  textTransform={`capitalize`}
                  fontWeight={`400`}
                  letterSpacing={`0.01em`}
                  textAlign={`left`}
                  fontSize={`14px`}
                  lineHeight={`140%`}
                />
              </Flex>
              <Stack gap={0} borderY="0.5px solid" borderColor={`matador_border_color.200`}>
                <MenuItem
                  p="10px 20px"
                  _hover={{
                    bg: `custom_color.opacity_pop._05`,
                  }}
                  onClick={suggestModal?.onOpen}
                  bg="transparent"
                >
                  <Text color="text.2" fontWeight="400" fontSize={'16px'}>
                    Suggest an Idea
                  </Text>
                </MenuItem>
                <MenuItem
                  p="10px 20px"
                  _hover={{
                    bg: `custom_color.opacity_pop._05`,
                  }}
                  onClick={reportBugModal?.onOpen}
                  bg="transparent"
                >
                  <Text color="text.2" fontWeight="400" fontSize={'16px'}>
                    Report a bug
                  </Text>
                </MenuItem>
              </Stack>
              <Stack gap={0} borderBottom="0.25px solid" borderColor={`matador_border_color.200`}>
                <MenuItem
                  p="10px 20px"
                  _hover={{
                    bg: `custom_color.opacity_pop._05`,
                  }}
                  onClick={TERMS ? () => window.open(`${TERMS}`, '_blank') : null}
                  bg="transparent"
                >
                  <Flex align="center" w="full" justify={'space-between'} alignItems={'center'}>
                    <Text color="text.2" fontWeight="400" fontSize={'16px'}>
                      Terms of Use
                    </Text>
                    <ExternalOpen />
                  </Flex>
                </MenuItem>
                <MenuItem
                  p="10px 20px"
                  _hover={{
                    bg: `custom_color.opacity_pop._05`,
                  }}
                  onClick={PRIVACY_POLICY ? () => window.open(`${PRIVACY_POLICY}`, '_blank') : null}
                  bg="transparent"
                >
                  <Flex align="center" w="full" justify={'space-between'} alignItems={'center'}>
                    <Text color="text.2" fontWeight="400" fontSize={'16px'}>
                      Privacy Policy
                    </Text>
                    <ExternalOpen />
                  </Flex>
                </MenuItem>
              </Stack>
              <MenuItem
                p="10px 20px"
                _hover={{
                  bg: `custom_color.opacity_pop._05`,
                }}
                onClick={handleLogout}
                bg="transparent"
              >
                <Flex align="center">
                  <Text color="#E6192A" fontWeight="400">
                    Log Out
                  </Text>
                </Flex>
              </MenuItem>
            </MenuList>
          </Menu>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileMenu;
