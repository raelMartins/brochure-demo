import React, {useEffect, useState} from 'react';
import {Morph} from '../../../../ui-lib/ui-lib.components/morph';
import {
  HStack,
  Text,
  useDisclosure,
  useMediaQuery,
  useToast,
  Center,
  Image,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import SelectAllocation from './screens/selectAllocation';
import ConfirmSelection from './screens/confirmSelection';
import {useMutation, useQuery} from 'react-query';
import {
  addAllocationToEquity,
  fetchUnitAllocationImages,
  fetchUnitAllocations,
} from '../../../../api/allocations';
import {drawer_styles} from '@/components/drawers/styles';
import {ConfirmPopup} from '@/components/drawers/ConfirmPopup';

const Allocations = ({equity, refetch}) => {
  const toast = useToast();
  const defaultScrn = 'select allocation';
  const [isBelowMd] = useMediaQuery('(max-width: 913px)');
  const [screen, setScreen] = useState(defaultScrn);
  const {isOpen, onClose, onOpen} = useDisclosure();
  const [allocationVal, setAllocationVal] = useState('');
  const confirmationModal = useDisclosure();
  const [uploads, setUploads] = useState([]);

  const FETCH_UNIT_ALLOCATIONS = useQuery(
    ['fetchUnitAllocations'],
    () => fetchUnitAllocations(equity?.unit?.id),
    {
      enabled: !!equity?.unit?.id,
    }
  );

  const FETCH_UNIT_ALLOCATION_IMAGES = useQuery(
    ['fetchUnitAllocationImages'],
    () => fetchUnitAllocationImages(equity?.unit?.id),
    {
      enabled: !!equity?.unit?.id,
    }
  );
  if (FETCH_UNIT_ALLOCATIONS?.isError) {
    toast({
      description: FETCH_UNIT_ALLOCATIONS?.error,
      status: 'error',
      position: 'top-right',
      duration: 8000,
      isClosable: false,
    });
  }

  useEffect(() => {
    FETCH_UNIT_ALLOCATION_IMAGES?.data?.data?.length > 0
      ? setUploads(FETCH_UNIT_ALLOCATION_IMAGES?.data?.data)
      : null;
  }, [FETCH_UNIT_ALLOCATION_IMAGES.data]);

  const ALLOCATIONS = FETCH_UNIT_ALLOCATIONS?.data?.data?.data;

  const mutation = useMutation(formData => addAllocationToEquity(formData), {
    onSuccess: async res => {
      refetch();
      toast({
        description: `${allocationVal} has been allocated succesfully`,
        status: 'success',
        position: 'top-right',
        duration: 8000,
        isClosable: true,
      });
      onClose();
    },
    onError: err => {
      toast({
        description: err?.response?.message,
        status: 'error',
        position: 'top-right',
        duration: 8000,
        isClosable: true,
      });
    },
  });
  const handleSubmitAllocation = () => {
    mutation.mutate({equity_id: equity?.id, allocation: allocationVal});
  };
  const handleScreen = scrn => () => {
    return setScreen(scrn);
  };

  const handleClose = () => {
    setScreen(defaultScrn);
    return onClose();
  };

  // switch component depending on the screen size
  const Morphed = Morph[isBelowMd ? 'drawer' : 'modal'];

  return (
    <>
      {equity?.unit?.allocation_type === 'manual' && equity?.allocation ? (
        <Center
          fontSize={{base: '12px', md: '13.664px'}}
          lineHeight={{base: '14px', md: '17px'}}
          fontWeight="400"
          color="text"
        >
          {equity?.allocation}
        </Center>
      ) : equity?.unit?.allocation_type === 'auto' ? (
        equity?.allocation ? (
          <Center
            fontSize={{base: '12px', md: '13.664px'}}
            lineHeight={{base: '14px', md: '17px'}}
            fontWeight="400"
            color="text"
          >
            {equity?.allocation}
          </Center>
        ) : equity?.can_allocate == true ? (
          <Button
            bg="custom_color.color"
            color={`custom_color.contrast`}
            onClick={ALLOCATIONS?.length ? onOpen : null}
            p={{lg: '13.159px 27.964px', base: '6.58px 13.982px'}}
            rounded="21px"
            w="full"
            maxW={{base: '125px', lg: '198px'}}
            _hover={{
              bg: '',
            }}
          >
            <Text fontSize={{base: '10px', md: '11.297px'}} fontWeight="400">
              Select Allocation
            </Text>
          </Button>
        ) : (
          <Center>
            <HStack spacing="4px">
              <Text
                fontSize={{base: '12px', md: '13.664px'}}
                lineHeight={{base: '14px', md: '17px'}}
                fontWeight="600"
                color="text"
              >
                Eligible at {equity?.unit?.allocation_milestone ?? '-'}%
              </Text>
            </HStack>
          </Center>
        )
      ) : (
        <Text color="text" fontSize={{base: '10px', md: '14px'}} fontWeight="400">
          Not allocated yet
        </Text>
      )}
      <Drawer
        isOpen={isOpen}
        onClose={handleClose}
        placement={{base: 'bottom', md: ''}}
        autofocus={false}
      >
        <DrawerOverlay />
        <DrawerContent {...drawer_styles}>
          <SelectAllocation
            ALLOCATIONS={ALLOCATIONS}
            FETCH_UNIT_ALLOCATION_IMAGES={FETCH_UNIT_ALLOCATION_IMAGES}
            FETCH_UNIT_ALLOCATIONS={FETCH_UNIT_ALLOCATIONS}
            setAllocationVal={setAllocationVal}
            allocationVal={allocationVal}
            uploads={uploads}
            handleClose={handleClose}
            handleScreen={handleScreen}
            confirmationModal={confirmationModal}
          />
        </DrawerContent>
      </Drawer>
      <ConfirmPopup
        disclosure={confirmationModal}
        value={allocationVal}
        handleProceed={handleSubmitAllocation}
        isLoading={mutation.isLoading}
      />
    </>
  );
};

export default Allocations;
