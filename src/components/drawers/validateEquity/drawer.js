import {DrawerContent, Flex, Box, Text, Drawer, DrawerOverlay, Center} from '@chakra-ui/react';
import {CloseIcon} from '@chakra-ui/icons';
import {VStack} from '@chakra-ui/react';
import {formatDateToString} from '@/utils/formatDate';
import {Spinner} from '@/ui-lib';
import EmptyState from '@/components/appState/empty-state';
import ErrorState from '@/components/appState/error-state';
import {useRouter} from 'next/navigation';
import {drawer_styles, drawer_title_styles} from '../styles';
import MobileHeader from '@/components/navbar/mobile_header';

const PendingTransactionDrawer = ({assetData, drawer, isError, isLoading}) => {
  const router = useRouter();

  const handleItemClick = equity => {
    drawer.onClose();
    router.push(`/validate/${equity?.id}`);
  };

  return (
    <Drawer onClose={drawer?.onClose} isOpen={drawer?.isOpen} placement={'left'}>
      <DrawerOverlay />
      <DrawerContent {...drawer_styles}>
        <MobileHeader
          pb="10px"
          onDrawerOpen={drawer?.onOpen}
          onDrawerClose={drawer?.onClose}
          activePage={`Validate Equity`}
        />
        <Flex {...drawer_title_styles}>
          <Text fontSize={'20px'} fontWeight={500}>
            VALIDATE EQUITY
          </Text>
          <CloseIcon cursor={'pointer'} fontSize={'20px'} onClick={drawer?.onClose} />
        </Flex>

        <Box px="18px" pb="38px" mt="20px">
          {isLoading ? (
            <Center w="full" h="full">
              <Spinner />
            </Center>
          ) : isError ? (
            <ErrorState />
          ) : (
            <>
              {assetData?.length > 0 ? (
                <VStack spacing={'12px'}>
                  {(assetData || [])?.map(equity => (
                    <Flex
                      key={equity?.id}
                      onClick={() => handleItemClick(equity)}
                      cursor="pointer"
                      w="full"
                      p="14px"
                      bg="custom_color.opacity_pop._10"
                      _hover={{bg: 'custom_color.opacity_pop._20'}}
                      border="0.611px solid"
                      borderColor={`custom_color.color_pop`}
                      align="stretch"
                      spacing={'12px'}
                    >
                      <VStack
                        align="stretch"
                        spacing={'2px'}
                        w="60%"
                        divider={
                          <Box
                            w="full"
                            borderBottom="0.611px solid"
                            borderColor={`custom_color.color_pop`}
                          />
                        }
                        textTransform={'uppercase'}
                      >
                        <Text fontSize={'14px'} fontWeight="500">
                          {equity?.project?.name}
                        </Text>
                        <Text fontSize={'10px'} fontWeight="500">
                          {equity?.unit?.unit_title}
                        </Text>
                      </VStack>
                    </Flex>
                  ))}
                </VStack>
              ) : (
                <EmptyState text={`No pending transactions yet`} />
              )}
            </>
          )}
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

export default PendingTransactionDrawer;
