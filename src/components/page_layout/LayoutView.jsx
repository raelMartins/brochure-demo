'use client';
import {Box, Center, Flex, HStack, Progress, Stack} from '@chakra-ui/react';
import {LayoutSidebar} from './Layout.Sidebar';
import {Navbar} from '../navbar';
import {Footer2} from './Footer';
import {Spinner} from '@/ui-lib';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import {poppins} from '@/theme/fonts';
import ThreeDots from '../loaders/ThreeDots';
import {FullScreenPreRequisites} from '../fullScreenPrerequisites/FullScreenPrerequisites';

export function LayoutView({children, rightNavigation = null, isLoading = false, ...rest}) {
  const router = useRouter();
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    router?.events?.on('routeChangeStart', url => {
      setShowProgress(true);
    });
    router?.events?.on('routeChangeComplete', url => {
      setShowProgress(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <FullScreenPreRequisites>
      <Flex
        className={`${poppins.className}`}
        minH={'100vh'}
        maxW={`2000px`}
        w={`100%`}
        mx={`auto`}
        bg={`matador_background.100`}
        color={`text`}
      >
        {showProgress && (
          <Progress
            w="full"
            variant={`main_store`}
            size="xs"
            left={'0'}
            top={`0px`}
            position="fixed"
            isIndeterminate
            zIndex={'10'}
            bg={`transparent`}
          />
        )}
        <Center
          h={`100vh`}
          pos={`sticky`}
          top={`0px`}
          zIndex={`1`}
          minW={{base: `0px`, md: '75px'}}
        >
          <LayoutSidebar />
        </Center>
        <Stack
          bg={`matador_background.200`}
          w={{base: `100%`}}
          maxW={{base: `1296px`}}
          mx={`auto`}
          pb={{base: `30px`, md: `0px`}}
        >
          <Box pos={`sticky`} top={`0px`} zIndex={`2`} bg={`matador_background.200`}>
            <Navbar />
          </Box>

          {isLoading ? (
            <Center flex={`1`} w={`100%`}>
              <ThreeDots
                boxSize={{base: `20px`, md: '25px'}}
                color="custom_color.color_pop"
                circular
              />
            </Center>
          ) : (
            <Box paddingInline={{lg: '40px'}} flex={`1`}>
              {children}
            </Box>
          )}
          <Footer2 />
        </Stack>
        <Center
          h={`100vh`}
          pos={`sticky`}
          top={`0px`}
          zIndex={`1`}
          minW={{base: `0px`, md: '75px'}}
        >
          {rightNavigation}
        </Center>
      </Flex>
    </FullScreenPreRequisites>
  );
}
