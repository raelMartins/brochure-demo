import React, {useEffect, useState} from 'react';
import {Drawer, DrawerOverlay, DrawerContent, useMediaQuery, Text} from '@chakra-ui/react';
import {WalletContent} from './WalletContent';
import {DepositWallet} from './deposit';
import {WithdrawalWallet} from './withdrawal';
import MobileWalletHeader from './mobile_w_header';
import {drawer_styles} from '../styles';

export const WalletDrawer = ({WALLET_DRAWER_TOGGLE, avatar, onDrawerOpen}) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  const [page, setPage] = useState('wallet');
  const [step, setStep] = useState('method');

  return (
    <Drawer
      onCloseComplete={() => setPage('wallet')}
      blockScrollOnMount={true}
      isOpen={WALLET_DRAWER_TOGGLE.isOpen}
      onClose={WALLET_DRAWER_TOGGLE.onClose}
      placement={screenWidth >= 768 ? 'left' : `right`}
    >
      <DrawerOverlay />
      <DrawerContent {...drawer_styles} overflow={`auto`}>
        <MobileWalletHeader
          onDrawerClose={WALLET_DRAWER_TOGGLE.onClose}
          step={step}
          setPage={setPage}
          setStep={setStep}
          activePage={page}
          onDrawerOpen={onDrawerOpen}
        />
        {page === 'wallet' ? (
          <WalletContent
            avatar={avatar}
            setPage={setPage}
            onWalClose={WALLET_DRAWER_TOGGLE.onClose}
          />
        ) : null}
        {page === 'deposit' && (
          <DepositWallet
            step={step}
            setStep={setStep}
            setPage={setPage}
            onWalClose={WALLET_DRAWER_TOGGLE.onClose}
          />
        )}
        {page === 'withdrawal' && (
          <WithdrawalWallet setPage={setPage} onWalClose={WALLET_DRAWER_TOGGLE.onClose} />
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default WalletDrawer;
