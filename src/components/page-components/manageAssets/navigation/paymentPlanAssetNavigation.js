import {Box, Center, Image, Stack, Tooltip, useDisclosure} from '@chakra-ui/react';
import PurchaseFeedback from '@/components/drawers/feedback_drawer/purchaseFeedback';
import {HomeOwnersPacket} from '../sections/HomeOwnersPackets';
import MakeDepositDrawer from '@/components/drawers/deposit_drawer';
import {
  AssetDocumentsIcon,
  FeedbackIcon,
  MakeDepositIcon,
  RecurringDepositIcon,
} from '@/components/assets/SideBarIcons';
import {icon_tooltip_style} from '../../listings/PropertySidebar';
import {PaymentAccess} from '@/components/payment_flow/PaymentAccess';

export const PaymentPlanAssetNavigation = ({data, equityId, refetch}) => {
  const feedModal = useDisclosure();
  const homeOwnersPacketModal = useDisclosure();
  const recurringModal = useDisclosure();
  const depositModal = useDisclosure();

  const navItems = [
    {
      key: 'homeOwner',
      name: "Home Owner's Packet",
      icon: <AssetDocumentsIcon />,
      onClick: () => homeOwnersPacketModal.onOpen(),
    },
    {
      key: 'deposit',
      name: 'Make Deposit',
      icon: <MakeDepositIcon />,
      onClick: () => depositModal.onOpen(),
    },
    // {
    //   key: 'recurring',
    //   name: 'Recurring Deposit',
    //   icon: <RecurringDepositIcon />,
    //   onClick: () => recurringModal.onOpen(),
    // },
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
          <PaymentAccess
            checkPayment={item?.name?.toLowerCase()?.includes(`deposit`)}
            key={item.key}
            content={
              <Tooltip label={item.name} placement="top" sx={icon_tooltip_style}>
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
            }
          />
        );
      })}
      <HomeOwnersPacket equityId={equityId} modal={homeOwnersPacketModal} />
      <MakeDepositDrawer info={data} depositModal={depositModal} refetch={refetch} />
      <PurchaseFeedback feedModal={feedModal} equityId={equityId} />
    </Center>
  );
};
