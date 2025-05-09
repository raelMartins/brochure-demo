import {Box, Center, Flex, HStack, Stack, Text} from '@chakra-ui/react';
import {useRef} from 'react';
import {IoChevronDown, IoChevronUp} from 'react-icons/io5';

export const TimeSelect = ({time, setTime}) => {
  const scrollbar_ref = useRef();
  //prettier-ignore
  const times = [
    `08:00AM`,`09:00AM`,`10:00AM`,`11:00AM`,`12:00PM`,
    `01:00PM`,`02:00PM`,`03:00PM`,`04:00PM`,`05:00PM`,
  ];

  const scroll_up = () => {
    const target = scrollbar_ref.current;
    console.log(target?.scrollBy);
    const my_target = document.getElementById('schedule_time');
    console.log({my_target});
    my_target?.scrollBy(0, -100);
  };

  const scroll_down = () => {
    const target = scrollbar_ref.current;
    const my_target = document.getElementById('schedule_time');
    my_target?.scrollBy(0, 100);
  };
  return (
    <Flex
      direction={`column`}
      p={{base: `4px`, lg: `10px 13px`}}
      w={`134px`}
      maxW={`134px`}
      h={`380px`}
      flex={`1`}
      gap={`3.884px`}
      color={`text.5`}
      align={`center`}
    >
      <Center w={`26.5px`} h={`26.5px`} onClick={scroll_up} cursor={`pointer`}>
        <IoChevronUp fontSize={`20px`} />
      </Center>
      <Box
        id={`schedule_time`}
        ref={scrollbar_ref}
        flex={`1`}
        overflowY={`auto`}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
        scrollBehavior={`smooth`}
        scrollSnapType={`y mandatory`}
      >
        <Stack gap={`3.884px`}>
          {times.map((el, i) => (
            <HStack
              key={i}
              p={{base: `8px 13px`}}
              fontSize={`12px`}
              fontWeight={`400`}
              lineHeight={`17px`}
              letterSpacing={`.14px`}
              cursor={`pointer`}
              onClick={() => setTime(el.slice(0, 4))}
              color={time === el.slice(0, 4) ? `#ffffff` : `inherit`}
              bg={time === el.slice(0, 4) ? `custom_color.color_pop` : `transparent`}
              scrollSnapAlign={`start`}
              scrollSnapStop={`always`}
              userSelect={`none`}
              borderRadius={`20px`}
              transition={`.3s`}
            >
              <Text>{el}</Text>
            </HStack>
          ))}
        </Stack>
      </Box>
      <Center w={`26.5px`} h={`26.5px`} onClick={scroll_down} cursor={`pointer`}>
        <IoChevronDown fontSize={`20px`} />
      </Center>
    </Flex>
  );
};

export default TimeSelect;
