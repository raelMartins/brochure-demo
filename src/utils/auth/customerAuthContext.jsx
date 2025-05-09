import {storeDetails} from '@/api/auth';
import {useQuery} from 'react-query';
import React, {createContext, useContext, useEffect, useState} from 'react';

const defaultValue = {
  TERMS: '',
  PRIVACY_POLICY: '',
  AGENT_TERMS: '',
  AGENT_PRIVACY_POLICY: '',
};
const CustomerauthContext = createContext(defaultValue);
const CustomerContext = ({children}) => {
  const [termsAndPrivacy_policy, setTermsAndPrivacy_policy] = useState({});

  const providerPAyload = {
    ...termsAndPrivacy_policy,
    setTermsAndPrivacy_policy,
  };

  const STOREINFO = useQuery(['storeInfo'], storeDetails);
  const store_data = STOREINFO.data?.data?.data;
  
  // console.log({store_data});

  const TERMS = store_data?.customer_document;
  const PRIVACY_POLICY = store_data?.customer_privacy_policy;
  const AGENT_TERMS = store_data?.agent_document;
  const AGENT_PRIVACY_POLICY = store_data?.agent_privacy_policy;
  const WHATSAPP_URL = store_data?.whatsapp_url;

  useEffect(() => {
    if (STOREINFO.isSuccess) {
      const policyObj = {
        TERMS,
        PRIVACY_POLICY,
        AGENT_TERMS,
        AGENT_PRIVACY_POLICY,
        WHATSAPP_URL,
      };
      setTermsAndPrivacy_policy(policyObj);
    }
    //eslint-disable-next-line
  }, [STOREINFO.isSuccess]);

  return (
    <CustomerauthContext.Provider value={providerPAyload}>{children}</CustomerauthContext.Provider>
  );
};

export default CustomerContext;

export const useCustomerAuthContext = () => {
  const context = useContext(CustomerauthContext);
  return context;
};
