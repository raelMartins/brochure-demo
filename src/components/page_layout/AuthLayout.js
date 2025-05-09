import {Box, Center, Flex, HStack, Image, Stack, useTheme} from '@chakra-ui/react';
import {cloneElement, isValidElement, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import AgentRegister from '@/realtors_portal/components/auth/agent_register';
import useGetSession from '@/utils/hooks/getSession';
import {AuthFlow} from '../auth/flows/authFlow';
import {Spinner} from '@/ui-lib';
import {Footer2} from './Footer';
import {storeDetails} from '@/api/auth';
import {useQuery} from 'react-query';

export function AuthLayout({
  agent = false,
  authPage = false,
  screen = ``,
  disableClick = false,
  InnerComponent,
  children = null,
}) {
  const STOREINFO = useQuery(['storeInfo'], storeDetails);
  const store_data = STOREINFO?.data?.data?.data;

  const [loading, set_loading] = useState(false);
  const [clicked, set_clicked] = useState(true);
  const [mount, set_mount] = useState(true);
  const theme = useTheme();
  const router = useRouter();
  const {sessionData: LoggedinUser} = useGetSession('loggedIn');

  const handle_click = () => {
    if (authPage) return;
    // if (isNotMobile) {
    if (!clicked) {
      set_mount(true);
      setTimeout(() => {
        set_clicked(true);
      }, 50);
    } else {
      set_clicked(false);
      setTimeout(() => {
        set_mount(false);
      }, 600);
    }
    // } else if (clicked) {
    //   return;
    // } else {
    //   set_clicked(true);
    //   set_loading(true);
    //   set_mount(true);
    //   setTimeout(() => {
    //     set_loading(false);
    //   }, 600);
    // }
  };

  useEffect(() => {
    console.log(theme?.colors?.matador_background?.[`100`]);
    document.body.style.background = `${theme?.colors?.matador_background?.[`100`]}`;

    var css = `
      html { 
        background: ${theme?.colors?.matador_background?.[`100`]};
      } 
      *::-webkit-scrollbar {
        width: 10px;
      }
      *::-webkit-scrollbar-thumb {
        border: 2px solid rgba(0, 0, 0, 0);
        background-clip: padding-box;
        border-radius: 9999px;
        background-color: ${theme?.colors?.matador_form?.label};
      };
      `,
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

    head.appendChild(style);

    // style.type = 'text/css';
    if (style.styleSheet) {
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }, []);

  useEffect(() => {
    console.log(router?.query);
  }, [router?.query]);

  return LoggedinUser && !agent && (children || InnerComponent) ? (
    InnerComponent ? (
      isValidElement(InnerComponent) ? (
        cloneElement(InnerComponent, {
          openAuth: handle_click,
        })
      ) : (
        children
      )
    ) : (
      children
    )
  ) : loading ? (
    <Center h={`100vh`}>
      <Spinner />
    </Center>
  ) : (
    <Flex
      w="full"
      minH="100vh"
      h={clicked ? `100vh` : `100%`}
      overflow={clicked ? `hidden` : `auto`}
      position={`relative`}
      direction={`column`}
      color={`matador_text.100`}
    >
      {(mount || disableClick) && (
        <Flex
          position={'fixed'}
          alignItems={{lg: `center`}}
          justifyContent={{lg: `center`}}
          left={`0px`}
          top={`0px`}
          right={`0px`}
          bottom={`0px`}
          flexDir={`column`}
          bgColor={{base: `transparent`}} //allow popup auth effect on mobile
          transition={`.5s`}
          opacity={clicked ? `1` : `0`}
          zIndex={`2000`}
        >
          <Box
            position={`absolute`}
            top={`0px`}
            left={`0px`}
            bottom={`0px`}
            right={`0px`}
            width={`100%`}
            height={`100%`}
            bgColor={`matador_background.100`}
            opacity={{base: `1`, lg: clicked ? '.6' : `.6`}}
            onClick={handle_click}
            transition={`.5s`}
            zIndex={`1`}
            cursor={!authPage ? `pointer` : `auto`}
          />
          {agent ? (
            <Stack w={{base: `100%`}} overflow={`auto`} my={{base: `15px`}} zIndex={`1`} h={`100%`}>
              <HStack
                p={{base: `12px 24px`}}
                borderBottom={`0.5px solid`}
                borderColor={`matador_border_color.100`}
              >
                {store_data?.company_image && (
                  <Center
                    aspectRatio={`150 / 48`}
                    height={`24px`}
                    maxW={`75px`}
                    position={`relative`}
                  >
                    <Image
                      src={store_data?.company_image}
                      alt={'Company Image'}
                      height="100%"
                      width={`max-content`}
                    />
                  </Center>
                )}
              </HStack>
              <Stack flex={`1`} justify={{base: 'flex-start', md: 'center'}} pb={`40px`}>
                <AgentRegister screen={screen} my={{base: `0px`, md: `auto`}} />
              </Stack>
              <Footer2
                position={`fixed !important`}
                bottom={`0px`}
                left={`0px`}
                width={`100%`}
                zIndex={`2001`}
                py="12px"
              />
            </Stack>
          ) : (
            <Box
              w={{base: `100%`, lg: `max-content`}}
              overflow={`auto`}
              my={{base: `8px`, lg: `auto`}}
              mx={`auto`}
              zIndex={`2`}
            >
              <HStack
                p={{base: `12px 24px`}}
                display={{base: `flex`, lg: `none`}}
                borderBottom={`0.5px solid`}
                borderColor={`matador_border_color.100`}
              >
                {store_data?.company_image && (
                  <Center
                    aspectRatio={`150 / 48`}
                    height={`24px`}
                    maxW={`75px`}
                    position={`relative`}
                  >
                    <Image
                      src={store_data?.company_image}
                      alt={'Company Image'}
                      height="100%"
                      width={`max-content`}
                    />
                  </Center>
                )}
              </HStack>
              <AuthFlow zIndex={!clicked ? `0` : `1`} screen={screen} />
              <Footer2 position={`fixed !important`} bottom={`0px`} left={`0px`} width={`100%`} />
            </Box>
          )}
        </Flex>
      )}

      <Flex flex="1" h={`100%`} pointerEvents={disableClick ? `none` : `auto`}>
        {InnerComponent
          ? isValidElement(InnerComponent)
            ? cloneElement(InnerComponent, {
                openAuth: handle_click,
              })
            : children
          : children}
      </Flex>
    </Flex>
  );
}
