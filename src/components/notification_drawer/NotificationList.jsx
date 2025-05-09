import React from 'react';
import {Flex, Stack, Text} from '@chakra-ui/react';
import {Box} from '@chakra-ui/react';
import EmptyState from '../appState/empty-state';

export const NotificationList = ({data, dateOrTimeAgo, dateFormat}) => {
  const listOfNotifications = data?.data?.data;
  let currentNotifications = {};
  listOfNotifications?.forEach(notif => {
    const date = notif?.created_at;
    if (!currentNotifications[date]) {
      currentNotifications[date] = [];
    }
    currentNotifications[date].push(notif);
  });

  return (
    <Box>
      {data?.data?.data?.length ? (
        <>
          {Object.entries(currentNotifications)?.map(([date, notif]) => (
            <Stack gap={0} key={date}>
              <Text
                fontSize={'12px'}
                textTransform="capitalize"
                letterSpacing="0.12px"
                color="custom_color.color_pop"
                p="16px 24px"
                lineHeight="16px"
                noOfLines={1}
              >
                {dateFormat(date)}
              </Text>
              {notif?.map(notif => (
                <Flex
                  bg="matador_background.100"
                  cursor="pointer"
                  w="100%"
                  px="15px"
                  py="10px"
                  gap="20px"
                  key={notif.title}
                  border="1px solid"
                  borderColor="matador_border_color.100"
                >
                  <Box w="100%" p="8px" color={'text.1'}>
                    <Flex justify="space-between" align="center" color={'text.1'} gap={'10px'}>
                      <Text fontSize="14px" fontWeight={600} as="h2" noOfLines={1}>
                        {notif.topic}
                      </Text>
                      <Text fontSize="12px">{dateOrTimeAgo(notif?.created_at)}</Text>
                    </Flex>
                    <Flex justify="space-between" align="flex-end" mb="10px">
                      <Text fontSize={'12px'} fontWeight={400}>
                        {notif.message}
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
              ))}
            </Stack>
          ))}
        </>
      ) : (
        <EmptyState
          text="No notification has been received yet."
          textSize={16}
          headerStyle={{fontSize: 18, fontWeight: 700}}
        />
      )}
    </Box>
  );
};

export default NotificationList;
