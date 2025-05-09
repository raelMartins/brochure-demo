'use client';

import {cloneElement, isValidElement, useEffect, useState} from 'react';
import {
  DrawerBody,
  Flex,
  Text,
  Box,
  useToast,
  Center,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  HStack,
  Button,
  useDisclosure,
  Stack,
  Tooltip,
  useTheme,
} from '@chakra-ui/react';
import {storeName} from '@/constants/routes';
import {InspectionTypeSelect} from './InspectionTypeSelect';
import {IoMdClose} from 'react-icons/io';
import {TimeSelect} from './TimeSelect';
import DatePicker from 'react-datepicker';
import styled from '@emotion/styled';
import {appCurrentTheme, LIGHT} from '@/constants/names';
import {fetchProjectsById, getTourRequest, requestATour} from '@/api/listing';
import {useMutation, useQuery} from 'react-query';
import {icon_tooltip_style} from '@/components/page-components/listings/PropertySidebar';
import {drawer_styles, drawer_title_styles} from '../styles';
import MobileHeader from '@/components/navbar/mobile_header';
import moment from 'moment-timezone';
import {formatInTimeZone, fromZonedTime, toZonedTime} from 'date-fns-tz';
import {Spinner} from '@/ui-lib';
import {InspectionRequestCreated} from './InspectionRequestCreated';

const ScheduleInspectionContent = ({disclosure, info}) => {
  const toast = useToast();
  const [time, setTime] = useState('');
  const [tourMode, setTourMode] = useState(``);
  const [mainDate, setMainDate] = useState('');
  const theme = useTheme();

  const inspectionRequestQuery = useQuery(['requestsQuery', info?.id], () =>
    getTourRequest(info?.id)
  );

  const inspectionRequest = inspectionRequestQuery?.data?.data?.data;

  const proceedRequest = useMutation(body => requestATour(body, info.id), {
    onSuccess: () => {
      toast({
        description: `Inspection Scheduled Successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      disclosure.onClose();
      inspectionRequestQuery?.refetch();
    },
    onError: err => {
      toast({
        title: 'An error occured',
        description: `${err?.response?.data?.message || 'Something went wrong, try again'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleSelectedDate = date => {
    return setMainDate(date);
  };
  const is_complete = mainDate && time && tourMode;
  const isDisabled = !is_complete || proceedRequest.isLoading;

  const presentDay = toZonedTime(new Date(), info?.listing_timezone);

  const filterPassedTime = time => {
    const selectedDate = toZonedTime(time, info?.listing_timezone);
    return presentDay < selectedDate;
  };

  const handleRequest = () => {
    if (is_complete) {
      const formattedDate = moment(mainDate).format('YYYY-MM-DD');
      const sanitizedTime = time.trim().toUpperCase(); // make sure it's '09:00 AM'
      const dateToUse = moment.tz(
        `${formattedDate} ${sanitizedTime}`,
        'YYYY-MM-DD hh:mm A',
        info?.listing_timezone
      );

      // Check if it's valid
      const utcDate = fromZonedTime(new Date(dateToUse), info?.listing_timezone).toISOString();
      const selectedDate = toZonedTime(new Date(dateToUse), info?.listing_timezone);
      const isPastDate = selectedDate < presentDay;
      if (isPastDate) {
        toast({
          title: 'Invalid Date',
          description: 'Please select a future date.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        return;
      }
      const body = {
        time: utcDate,
        store_name: storeName,
        type: tourMode?.toLowerCase(),
        mode: tourMode?.toLowerCase(),
      };
      if (!isDisabled) {
        proceedRequest.mutate(body);
      }
    } else
      toast({
        description: `Please select a date, time and a tour mode`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
  };

  const incomplete = !mainDate || !time || !tourMode || proceedRequest.isLoading;
  return (
    <>
      <DrawerHeader p={`0px`}>
        <MobileHeader
          pb="10px"
          onDrawerOpen={disclosure?.onOpen}
          onDrawerClose={disclosure?.onClose}
          activePage={`Schedule Inspection`}
        />
        <HStack {...drawer_title_styles}>
          <Text>Schedule Inspection</Text>
          <Center onClick={() => disclosure.onClose()} color="text.1" cursor={`pointer`}>
            <IoMdClose fontSize={`20px`} />
          </Center>
        </HStack>
      </DrawerHeader>

      <DrawerBody
        display={{base: `flex`}}
        flexDir={`column`}
        p={{base: '16px', lg: `24px 16px`}}
        gap={`12px`}
        overflow={`auto`}
        color="matador_text.500"
      >
        {inspectionRequestQuery?.isLoading ? (
          <Center minH={`200px`} p={`16px`}>
            <Spinner boxSize={{base: '10px', md: '14px'}} />
          </Center>
        ) : inspectionRequest?.tour_method ? (
          <Box>
            <InspectionRequestCreated data={inspectionRequest} />
          </Box>
        ) : (
          <>
            <Text
              fontSize="14px"
              fontWeight="500"
              color="matador_text.500"
              lineHeight={`20px`}
              textTransform={`uppercase`}
              letterSpacing={`1%`}
            >
              Select Date & Time ({formatInTimeZone(Date.now(), info?.listing_timezone, 'zzz')})
            </Text>
            <Flex border={`1px solid`} borderColor={`matador_border_color.200`}>
              <TimeSelect time={time} setTime={setTime} />
              <Box bg={`matador_border_color.200`} w={`1px`} />
              {/* <Box padding={{base: `18px 2px`, lg: `19px 23px`}}> */}
              <Flex
                direction={`column`}
                align="center"
                justify="center"
                padding={{base: `18px 2px`, lg: `0px`}}
                w={`100%`}
              >
                <Wrap
                  color={theme?.colors?.custom_color?.color_pop}
                  contrast={theme?.colors?.custom_color?.contrast_pop}
                  text={theme?.colors?.text}
                >
                  <DatePicker
                    inline
                    // showTimeSelect
                    minDate={presentDay}
                    selected={mainDate}
                    portalId="root-portal"
                    filterTime={filterPassedTime}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    onChange={handleSelectedDate}
                    fixedHeight

                    // {...datePickerObj}
                  />
                </Wrap>
              </Flex>
            </Flex>
            <InspectionTypeSelect set_type={setTourMode} type={tourMode} />
            <Button
              isDisabled={incomplete}
              isLoading={proceedRequest.isLoading}
              onClick={handleRequest}
              w="full"
              color="custom_color.contrast"
              bg="custom_color.color"
              // h={`100%`}
              h={`max-content`}
              // maxH={`max-content`}
              p="13px"
              borderRadius={`56.25px`}
              _hover={{opacity: incomplete ? `auto` : '1'}}
            >
              <Text
                fontSize={`16px`}
                fontWeight="400"
                lineHeight={`133%`}
                letterSpacing={`1%`}
                textTransform={`uppercase`}
              >
                Schedule Date
              </Text>
            </Button>
          </>
        )}
      </DrawerBody>
      {/* <DrawerFooter p={{base: '16px', lg: `24px 16px`}}>
      <Button
        isDisabled={proceedRequest.isLoading}
        isLoading={proceedRequest.isLoading}
        onClick={handleRequest}
        w="full"
        color="custom_color.contrast"
        bg="custom_color.color"
        // h={`100%`}
        // maxH={`max-content`}
        p="13px"
        borderRadius={`56.25px`}
        _hover={{opacity: '1'}}
      >
        <Text
          fontSize={`16px`}
          fontWeight="400"
          lineHeight={`133%`}
          letterSpacing={`1%`}
          textTransform={`uppercase`}
        >
          Schedule Date
        </Text>
      </Button>
      </DrawerFooter> */}
    </>
  );
};

export const ScheduleInspection = ({InnerComponent, info, property_id}) => {
  // const {data, isError, isLoading, error} = useQuery(
  //   ['project_data', property_id],
  //   () => fetchProjectsById(parseInt(property_id)),
  //   {
  //     enabled: !!property_id,
  //   }
  // );

  // const info = data?.data?.project;
  const [screenWidth, setScreenWidth] = useState(0);

  const disclosure = useDisclosure();

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  return (
    info && (
      <>
        <Tooltip label={`Schedule Inspection`} placement="top" sx={icon_tooltip_style}>
          <span>
            {InnerComponent
              ? isValidElement(InnerComponent)
                ? cloneElement(InnerComponent, {
                    onClick: () => {
                      disclosure.onOpen();
                    },
                    style: {cursor: 'pointer'},
                  })
                : null
              : null}
          </span>
        </Tooltip>
        <Drawer
          autoFocus={false}
          onClose={disclosure?.onClose}
          isOpen={disclosure?.isOpen}
          // placement={screenWidth >= 768 ? 'right' : `bottom`}
          placement={'right'}
        >
          <DrawerOverlay />
          <DrawerContent {...drawer_styles} maxW={{base: 'full', md: '450px'}}>
            <ScheduleInspectionContent disclosure={disclosure} info={info} />
          </DrawerContent>
        </Drawer>
      </>
    )
  );
};

export default ScheduleInspectionContent;

const Wrap = styled.div`
  .react-datepicker {
    border: none;
    // border-bottom: #f5f5f5 solid 1px;
    // height: 100%;
    width: max-content;
    background-color: transparent;
  }
  .react-datepicker__time-container {
    display: none;
  }
  .react-datepicker__month-container {
    max-width: 100%;
    width: 100%;
    background-color: transparent;
  }
  .react-datepicker__current-month {
    font-size: 14px;
    font-weight: 500 !important;
    line-height: 19.6px;
    letter-spacing: 0.01em;
    text-align: center;
    margin-bottom: 20px;
    color: ${props => props.text};
  }

  .react-datepicker__day-names {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    color: ${props => props.text};
  }

  .react-datepicker__week {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    color: ${props => props.text};
  }

  .react-datepicker__day-name {
    font-size: 12px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 9px;
    font-weight: 500;
    color: ${props => props.text} !important;
  }
  .react-datepicker__day-name:hover {
    background-color: transparent !important;
  }

  .react-datepicker__month {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    background-color: transparent;
  }
  .react-datepicker__day {
    width: 30px;
    font-size: 11.5px;
    font-weight: 400;
    height: 30px;
    transition: 0.3s ease-in-out;
    color: ${props => props.text};
    padding-top: 3px;
  }
  .react-datepicker__day--selected {
    // background-color: #fa6400;
  }
  .react-datepicker__day--keyboard-selected {
    background: transparent;
  }
  .react-datepicker__day--selected {
    border-radius: 100%;
    background: ${props => props.color};
    color: ${props => props.contrast};
  }
  .react-datepicker__day {
    border-radius: 50%;
  }
  .react-datepicker__day:hover {
    background: ${props => props.color};
    color: ${props => props.contrast};
    border-radius: 50%;
  }
  .react-datepicker__day--disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .react-datepicker__day--disabled:hover {
    background: transparent;
    color: ${props => props.text};
    border-radius: 50%;
  }
  .react-datepicker__navigation {
    outline: none !important;
  }
  .react-datepicker__navigation:focus {
    outline: none !important;
  }

  .react-datepicker__navigation-icon::before {
    top: 0px;
  }
  .react-datepicker__header {
    background: transparent;
    border: none;
    padding-top: 0;
  }
`;
