'use client';
import {fetchListOfCoowners, respondToCoOwnersRequest} from '@/api/co_owners';
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Text,
  useMediaQuery,
  useTheme,
} from '@chakra-ui/react';
import {useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import CoOwnSummary from './CoOwnSummary';
import Breakdown from './Breakdown';
import InviteesReaction from './InviteesReaction';
import CoOwnersList from './CoOwnersList';
import InviteRejection from './InviteesRejection';
import {Main} from './Main';
import {LoggedinUser} from '@/constants/routes';
import NotificationIcon from '../assets/NotificationIcon';
import {fetchNotifs} from '@/api/FetchNotif';
import {useLightenHex} from '@/utils/lightenColorShade';
import {drawer_styles} from '../drawers/styles';

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

export const Notification = ({isNotOpen, onNotClose, onDrawerOpen, onOpen}) => {
  const [type, setType] = useState('notification');
  const [requestInfo, setRequestInfo] = useState(null);
  const asset = requestInfo?.coownership_request?.equity;
  const [isNotMobile] = useMediaQuery('(min-width: 768px)');
  const {data, isLoading: coOwnerLoading} = useQuery(
    ['coowners', asset?.id],
    () => fetchListOfCoowners(asset?.id),
    {enabled: !!asset?.id}
  );
  const {data: notificationData, isLoading: notificationLoading} = useQuery(
    ['notifs'],
    fetchNotifs
  );
  const coowners = data?.data?.data ?? [];
  const isTheHost = coowners?.length
    ? coowners.find(item => item?.host?.id == LoggedinUser?.user?.id)
    : null;
  const theHost = coowners?.length
    ? coowners.find(item => item?.host?.id === item?.invitee?.id)
    : null;
  const coownerInfo = coowners?.length
    ? coowners.find(item => item?.invitee?.id == LoggedinUser?.user?.id)
    : null;

  const mutation = useMutation(data => respondToCoOwnersRequest(data, coownerInfo?.id), {
    onSuccess: async res => {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: err => {},
  });

  const handleAccept = () => {
    const acceptInvitePayload = {
      action: 'accept',
      space_id: requestInfo?.id,
    };

    mutation.mutate(acceptInvitePayload);
  };

  const handleReject = message => {
    const rejectionPayload = {
      action: 'decline',
      space_id: requestInfo?.id,
      decline_reason: message,
    };

    mutation.mutate(rejectionPayload);
  };

  const handleCloseModal = () => {
    setType('notification');
    setRequestInfo(null);
    mutation.reset();
  };

  const check_notif_status = () => {
    const notifData = notificationData?.data?.data;
    const currentDate = new Date();
    const recent_messages = notifData?.filter(el => new Date(el.created_at) > currentDate);
    const unread_messages = notifData?.filter(el => el.status === true);
    const notif = [...Array(recent_messages), ...Array(unread_messages)];
    return {hasUnread: notif?.some(item => item?.status === true), count: unread_messages?.length};
  };

  console.log(check_notif_status().count);
  const theme = useTheme();
  const primaryColor = theme?.colors?.custom_color?.color_pop;

  return (
    <>
      <Box w="full">
        <NotificationIcon cursor="pointer" onClick={onOpen} />
        {check_notif_status().hasUnread ? (
          <Box
            position="absolute"
            boxSize="20px"
            bg="#FFFFFF"
            border="1px solid"
            borderColor={`custom_color.opacity._10`}
            p={'3px 7px 2px 7px'}
            rounded="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            top="1rem"
            right="6.5rem"
          >
            <Text fontSize={'10px'} color="#D92D20">
              {check_notif_status().count > 99 ? '99+' : '99+'}
            </Text>
          </Box>
        ) : null}
      </Box>
      <Drawer
        autoFocus={false}
        scrollBehavior="inside"
        isOpen={isNotOpen}
        onClose={onNotClose}
        onCloseComplete={handleCloseModal}
        blockScrollOnMount={true}
        placement="right"
      >
        <DrawerOverlay />
        <DrawerContent {...drawer_styles}>
          {type === 'notification' ? (
            <Main
              setType={setType}
              setRequestInfo={setRequestInfo}
              onNotClose={onNotClose}
              onDrawerOpen={onDrawerOpen}
              data={notificationData}
              notificationLoading={notificationLoading}
            />
          ) : type === 'summary' ? (
            <CoOwnSummary
              asset={asset}
              setType={setType}
              onNotClose={onNotClose}
              customScrollbarStyles={customScrollbarStyles}
            />
          ) : type === 'breakdown' ? (
            <Breakdown
              asset={asset}
              setType={setType}
              onNotClose={onNotClose}
              customScrollbarStyles={customScrollbarStyles}
            />
          ) : type === 'inviteesReaction' ? (
            <InviteesReaction
              handleAccept={handleAccept}
              mutation={mutation}
              requestInfo={requestInfo}
              setType={setType}
              onNotClose={onNotClose}
              coOwnerLoading={coOwnerLoading}
              coowners={coowners}
              isTheHost={isTheHost}
              customScrollbarStyles={customScrollbarStyles}
            />
          ) : type === 'coOwnersList' ? (
            <CoOwnersList
              theHost={theHost}
              asset={asset}
              setType={setType}
              onNotClose={onNotClose}
              coOwnerLoading={coOwnerLoading}
              coowners={coowners}
              isTheHost={isTheHost}
              customScrollbarStyles={customScrollbarStyles}
            />
          ) : type === 'inviteRejection' ? (
            <InviteRejection
              handleReject={handleReject}
              mutation={mutation}
              theHost={theHost}
              asset={asset}
              setType={setType}
              onNotClose={onNotClose}
              coOwnerLoading={coOwnerLoading}
              isTheHost={isTheHost}
              customScrollbarStyles={customScrollbarStyles}
            />
          ) : null}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Notification;
