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
import Head from 'next/head';
import {capitalizeString} from '@/utils/misc';
import useGetSession from '@/utils/hooks/getSession';

export function LayoutView({
  children,
  rightNavigation = null,
  isLoading = false,
  metaData = {title: ``, image: ``, description: ``},
  ...rest
}) {
  const router = useRouter();
  const [showProgress, setShowProgress] = useState(false);
  const {sessionData: store_data} = useGetSession('store_data');

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
    <>
      <Head>
        {/* Basic */}
        {metaData?.title && (
          <title>{capitalizeString(`${metaData?.title} | ${store_data?.store_name}`)}</title>
        )}
        {metaData?.description && <meta name="description" content={metaData?.description} />}

        {/* Open Graph Meta Tags */}
        {metaData?.title && (
          <meta
            property="og:title"
            content={capitalizeString(`${metaData?.title} | ${store_data?.store_name}`)}
          />
        )}
        {metaData?.description && (
          <meta property="og:description" content={metaData?.description} />
        )}
        <meta
          property="og:image"
          content={
            metaData?.image?.photo ||
            metaData?.image?.original ||
            metaData?.image ||
            store_data?.company_image
          }
        />
        <meta property="og:site_name" content={store_data?.store_name} />

        {/* Twitter Meta Tags */}
        {metaData?.title && (
          <meta
            name="twitter:title"
            content={capitalizeString(`${metaData?.title} | ${store_data?.store_name}`)}
          />
        )}
        {metaData?.description && (
          <meta name="twitter:description" content={metaData?.description} />
        )}
        <meta
          name="twitter:image"
          content={
            metaData?.image?.photo ||
            metaData?.image?.photo?.[0] ||
            metaData?.image?.original ||
            metaData?.image ||
            store_data?.company_image
          }
        />
        <meta name="twitter:image:alt" content={`Image of ${store_data?.store_name}`} />
        <meta name="twitter:site" content={`@${store_data?.store_name}`} />
        <meta name="twitter:card" content={'summary_large_image'} />
      </Head>
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
    </>
  );
}
