import isMobile from '@/utils/extras';
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';

export const ResponsivePopup = ({children, ...rest}) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  return (
    <>
      {/* {screenWidth === 0 ? null : screenWidth < 992 ? ( */}
      {isMobile ? (
        <Drawer {...rest}>
          <DrawerOverlay />
          {children}
        </Drawer>
      ) : (
        <Modal {...rest}>
          <ModalOverlay />
          {children}
        </Modal>
      )}
    </>
  );
};

export const ResponsivePopupCloseButton = ({...rest}) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  return (
    <>
      {/* {screenWidth === 0 ? null : screenWidth < 992 ? ( */}
      {isMobile ? (
        <DrawerCloseButton _focusVisible={{outline: `none`}} {...rest} />
      ) : (
        <ModalCloseButton _focusVisible={{outline: `none`}} {...rest} />
      )}
    </>
  );
};
export const ResponsivePopupContent = ({children, ...rest}) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  return (
    <>
      {/* {screenWidth === 0 ? null : screenWidth < 992 ? ( */}
      {isMobile ? (
        <DrawerContent bg={`matador_background.200`} color={`text`} {...rest}>
          {children}
        </DrawerContent>
      ) : (
        <ModalContent bg={`matador_background.200`} color={`text`} position={`fixed`} {...rest}>
          {children}
        </ModalContent>
      )}
    </>
  );
};
