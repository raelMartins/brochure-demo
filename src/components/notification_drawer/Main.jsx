import {Space} from './Space';
import React from 'react';
import {VStack} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import NotificationList from './NotificationList';
import {Flex, DrawerCloseButton, Text, Box} from '@chakra-ui/react';
import {fetchNotifs, fetchSpace} from '@/api/FetchNotif';
import {Spinner} from '@/ui-lib/ui-lib.components/Spinner';
import {dayMonth, fullDate} from '@/utils/formatDate';
import MobileHeader from '../navbar/mobile_header';
import {drawer_title_styles} from '../drawers/styles';

export const Main = ({onNotClose, onDrawerOpen, data, notificationLoading}) => {
  const {data: spaceData, isLoading: spaceLoading} = useQuery(['spaces'], fetchSpace);

  const dateOrTimeAgo = ts => {
    const d = new Date(); // Gets the current time
    const nowTs = Math.floor(d.getTime() / 1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
    const seconds = nowTs - Math.floor(new Date(ts).getTime() / 1000);

    if (seconds > 2 * 24 * 3600) {
      const period = new Date(ts).getHours() >= 12 ? 'PM' : 'AM';

      // Convert to 12-hour clock
      const formattedHours = new Date(ts).getHours() % 12 || 12;
      const formattedMinutes = new Date(ts).getMinutes().toString().padStart(2, '0');
      return `${formattedHours}:${formattedMinutes} ${period}`;
    }

    if (seconds > 3600) {
      const h = seconds / 3600;
      return `${Math.floor(h)} hour${h > 1 ? 's' : ''} ago`;
    }

    if (seconds > 60) {
      const m = seconds / 60;
      return `${Math.floor(m)} minute${m > 1 ? 's' : ''} ago`;
    }
  };

  const dateFormat = date => {
    const currentDate = new Date();
    const notifDate = new Date(date);
    const timeDifference = currentDate - notifDate;
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    if (timeDifference < oneDayInMilliseconds) {
      // If the notification date is today, return "Today"
      return 'Today';
    } else if (timeDifference < 2 * oneDayInMilliseconds) {
      // If the notification date is within the last 24-48 hours, return "Yesterday"
      return 'Yesterday';
    } else if (notifDate.getFullYear() < currentDate.getFullYear()) {
      // If the notification date is from a previous year, return the full date
      return fullDate(date);
    } else {
      // Otherwise, format the date (e.g., "Jul 26")
      return dayMonth(date);
    }
  };

  return (
    <Box w="full">
      <MobileHeader
        onDrawerOpen={onDrawerOpen}
        onDrawerClose={onNotClose}
        activePage={`Activities`}
      />

      <Flex {...drawer_title_styles}>
        <Text>Activities</Text>
        <DrawerCloseButton outline={'none'} autoFocus={false} _hover={{bg: ''}} mt={2} />
      </Flex>
      <VStack spacing={'15px'} stretch h="100vh" overflowY="auto">
        {notificationLoading ? (
          <Spinner />
        ) : (
          <NotificationList dateOrTimeAgo={dateOrTimeAgo} dateFormat={dateFormat} data={data} />
        )}
      </VStack>
    </Box>
  );
};
