import React from 'react';
import {Morph} from '../../../../../ui-lib/ui-lib.components/morph';
import {
  Button,
  HStack,
  Stack,
  useMediaQuery,
  Text,
  Spinner,
  Center,
  Flex,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react';
import AllocationGallery from '../components/allocationGallery';
import SelectUnit from '../components/selectUnit';
import {CloseIcon} from '@chakra-ui/icons';
import MobileHeader from '@/components/navbar/mobile_header';

const SelectAllocation = ({
  handleScreen,
  uploads,
  handleClose,
  ALLOCATIONS,
  setAllocationVal,
  allocationVal,
  FETCH_UNIT_ALLOCATIONS,
  FETCH_UNIT_ALLOCATION_IMAGES,
  confirmationModal,
}) => {
  const [isBelowMd] = useMediaQuery('(max-width: 48em)');

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px #ffffff',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#cbcbcb',
    },
  };

  // switch component depending on the screen size
  const Morphed = Morph[isBelowMd ? 'drawer' : 'modal'];
  return FETCH_UNIT_ALLOCATIONS.isLoading || FETCH_UNIT_ALLOCATION_IMAGES.isLoading ? (
    <Center h="50vh">
      <Spinner />
    </Center>
  ) : FETCH_UNIT_ALLOCATIONS?.isError ? (
    <Center h="50vh">
      <Text fontSize="11px" color="text" fontWeight="400" textAlign="'center">
        Oops something went wrong fetching allocations,please try again later.
      </Text>
    </Center>
  ) : (
    <>
      <MobileHeader onDrawerClose={handleClose} activePage="Unit Allocation" />
      <Flex
        borderBottom="1px solid"
        borderBottomColor="matador_border_color.100"
        p="20px 16px"
        w="full"
        justify={'space-between'}
        align={'center'}
        display={{base: 'none', md: 'flex'}}
      >
        <Text
          fontSize={{base: '16px', lg: '20px'}}
          fontWeight={600}
          color={'text'}
          textTransform="uppercase"
          fontFamily="Montserrat"
          letterSpacing="-0.2px"
        >
          unit allocation
        </Text>
        <CloseIcon
          alignSelf={'flex-start'}
          cursor="pointer"
          fontSize={{base: 12, lg: 14}}
          color={'text'}
          onClick={handleClose}
          m={2}
        />
      </Flex>

      <DrawerBody
        sx={customScrollbarStyles}
        maxH="85vh"
        w="full"
        p={{base: '30px 18px 0px', md: '18px 18px 0px'}}
      >
        <Stack w="full" spacing="18px">
          <AllocationGallery uploads={uploads} />
          <SelectUnit
            ALLOCATIONS={ALLOCATIONS}
            setAllocationVal={setAllocationVal}
            allocationVal={allocationVal}
          />
        </Stack>
      </DrawerBody>
      <DrawerFooter p={{md: '30px 18px 22.25px', base: '18px 18px 55.25px'}}>
        <Button
          p={{base: '9.75px 24px', lg: '20.25px 27px'}}
          borderRadius="56.25px"
          h="48px"
          fontSize="16px"
          fontWeight="400"
          color="custom_color.contrast"
          isDisabled={!allocationVal}
          onClick={confirmationModal.onOpen}
          bg="custom_color.color"
          _hover={{
            bg: '',
          }}
          _focus={{
            bg: 'transparent',
            border: '0.75px solid !important',
            borderColor: 'custom_color.color !important',
          }}
          _active={{
            bg: 'transparent',
            border: '0.75px solid !important',
            borderColor: 'custom_color.color !important',
          }}
          variant="outline"
          w="full"
        >
          Proceed
        </Button>
      </DrawerFooter>
    </>
  );
};

export default SelectAllocation;
