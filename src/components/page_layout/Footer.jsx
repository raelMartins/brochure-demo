'use client';
import WhatsappIconforAuth from '@/components/assets/whatsappIconforAuth';
import {useCustomerAuthContext} from '@/utils/auth/customerAuthContext';
import {formatToHttps} from '@/utils/formatUrl';
import {HStack, Text} from '@chakra-ui/react';
import Link from 'next/link';

export const Footer = () => {
  const {TERMS, PRIVACY_POLICY, WHATSAPP_URL} = useCustomerAuthContext();

  return (
    <HStack
      pl={{base: '19px', md: '4.9vw'}}
      pr={{base: '19px', md: '7.8vw'}}
      // bg="#fff"
      justify="space-between"
      h={{base: '52px', md: '56px'}}
      borderTop={{base: '1px solid #E6E6E6', md: 'none'}}
      pos="fixed"
      zIndex={3}
      bottom="0"
      w="full"
      bg="background.1"
    >
      <Text fontSize={{base: '8px', md: '12px'}} fontWeight="400" color="#737373">
        Built by Myxellia
      </Text>
      <HStack spacing={{md: '21.96px'}}>
        <HStack spacing={{base: '16px', md: '18.69px'}}>
          <Link href={TERMS ? TERMS : '#'} target={TERMS ? '_blank' : ''}>
            <Text fontSize={{base: '12px'}} fontWeight="400" color="#A3A3A3">
              Terms of service
            </Text>
          </Link>
          <Link
            href={PRIVACY_POLICY ? PRIVACY_POLICY : '#'}
            target={PRIVACY_POLICY ? '_blank' : ''}
          >
            <Text fontSize={{base: '12px'}} fontWeight="400" color="#A3A3A3">
              Privacy Policy
            </Text>
          </Link>
        </HStack>

        <HStack
          as={Link}
          href={`${formatToHttps(WHATSAPP_URL)}`}
          spacing="8.63px"
          px="15px"
          bg="#000000E5"
          display={{base: 'none', md: 'flex'}}
          borderRadius="50px"
          h={{md: '35.59px'}}
        >
          <WhatsappIconforAuth />
          <Text fontSize={{md: '13px'}} fontWeight="400" color="#fff">
            Quick Response
          </Text>
        </HStack>
      </HStack>
    </HStack>
  );
};

export const Footer2 = ({...rest}) => {
  const {TERMS, PRIVACY_POLICY, WHATSAPP_URL} = useCustomerAuthContext();

  return (
    <HStack
      bg="matador_background.100"
      justify="space-between"
      h={{base: '52px', md: '56px'}}
      borderTop={{base: '1px solid', md: 'none'}}
      borderColor={`matador_border_color.100`}
      pos={{base: `fixed`, md: 'relative'}}
      zIndex={{base: 1400, md: `1`}} //below 1400 it is still under drawers and modal overlays
      bottom="0px"
      w="full"
      p={{base: `20px`}}
      {...rest}
    >
      <Text
        as={Link}
        href={`https://www.myxellia.io/`}
        target="_blank"
        rel="noopener noreferrer"
        fontSize={{base: '12px'}}
        fontWeight="400"
        color="matador_text.300"
      >
        Created with Myxellia.io
      </Text>
      <HStack spacing={{md: '21.96px'}}>
        <HStack spacing={{base: '16px', md: '18.69px'}}>
          {TERMS && (
            <Link href={TERMS ? TERMS : '#'} target={TERMS ? '_blank' : ''}>
              <Text fontSize={{base: '12px'}} fontWeight="400" color="matador_form.label">
                Terms of service
              </Text>
            </Link>
          )}
          {PRIVACY_POLICY && (
            <Link
              href={PRIVACY_POLICY ? PRIVACY_POLICY : '#'}
              target={PRIVACY_POLICY ? '_blank' : ''}
            >
              <Text fontSize={{base: '12px'}} fontWeight="400" color="#A3A3A3">
                Privacy Policy
              </Text>
            </Link>
          )}
        </HStack>

        {WHATSAPP_URL && (
          <HStack
            as={Link}
            href={`${formatToHttps(WHATSAPP_URL)}`}
            target="_blank"
            rel="noreferrer noopener"
            spacing="8.63px"
            px="15px"
            bg="#000000E5"
            // display={{base: 'none', md: 'flex'}}
            position={{base: `fixed`, md: `relative`}}
            right={{base: `24px`, md: `0px`}}
            top={{base: `62vh`, md: `0px`}}
            borderRadius="50px"
            h={{base: `45px`, md: '35.59px'}}
            w={{base: `45px`, md: `auto`}}
            justify={{base: `center`}}
            cursor={`pointer`}
          >
            <WhatsappIconforAuth />
            <Text
              fontSize={{md: '13px'}}
              fontWeight="400"
              color="#fff"
              display={{base: `none`, md: `block`}}
            >
              Quick Response
            </Text>
          </HStack>
        )}
      </HStack>
    </HStack>
  );
};
