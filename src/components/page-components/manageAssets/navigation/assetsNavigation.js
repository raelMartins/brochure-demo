import {Box, Center, Image, Stack, Tooltip, useDisclosure} from '@chakra-ui/react';
import PurchaseFeedback from '@/components/drawers/feedback_drawer/purchaseFeedback';
import {HomeOwnersPacket} from '../sections/HomeOwnersPackets';
import {AssetDocumentsIcon, FeedbackIcon, MakeDepositIcon} from '@/components/assets/SideBarIcons';
import {icon_tooltip_style} from '../../listings/PropertySidebar';

export const AssetNavigation = ({equityId, isFractional}) => {
  const feedModal = useDisclosure();
  const homeOwnersPacketModal = useDisclosure();
  const navItems = [
    {
      key: 'homeOwner',
      name: isFractional ? "Investor's Packet" : "Home Owner's Packet",
      icon: <AssetDocumentsIcon />,
      onClick: () => homeOwnersPacketModal.onOpen(),
    },
    {
      key: 'feedback',
      name: 'Give Feedback',
      icon: <FeedbackIcon />,
      onClick: () => feedModal.onOpen(),
    },
  ];

  return (
    <Center flexDirection={`column`} gap="64px" minW="75px" display={{base: 'none', md: 'flex'}}>
      {navItems.map(item => {
        return (
          <Tooltip key={item.key} label={item.name} placement="top" sx={icon_tooltip_style}>
            <Box as="span" onClick={item.onClick}>
              <Center
                overflow={`hidden`}
                borderRadius={`50%`}
                as={Center}
                boxSize="48px"
                border={`1px solid`}
                borderColor={`custom_color.opacity_pop._20`}
                cursor={`pointer`}
                bg={`custom_color.opacity_pop._10`}
              >
                {item.icon}
              </Center>
            </Box>
          </Tooltip>
        );
      })}
      <HomeOwnersPacket equityId={equityId} modal={homeOwnersPacketModal} />
      <PurchaseFeedback feedModal={feedModal} equityId={equityId} />
    </Center>
  );
};
