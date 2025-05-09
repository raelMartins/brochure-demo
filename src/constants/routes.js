export const appWindow = typeof window !== 'undefined' ? window : null;

export const BUSINESS_ID = () => {
  if (appWindow && localStorage) {
    const businessId = localStorage.getItem('businessId');
    try {
      return businessId ? JSON.parse(businessId) : null;
    } catch (error) {
      console.error('Failed to parse businessId from localStorage', error);
      return null;
    }
  }
  return null;
};

export const getLocalStorageData = key => {
  if (appWindow && localStorage) {
    const storedDAta = localStorage.getItem(key);
    try {
      return storedDAta ? JSON.parse(storedDAta) : null;
    } catch (error) {
      console.error(`Failed to parse ${storedDAta} from localStorage`, error);
      return null;
    }
  }
  return null;
};
// : global?.location?.reload();

const ENV_PREFIX =
  process.env.NEXT_PUBLIC_SERVER_ENV === 'development'
    ? 'dev'
    : process.env.NEXT_PUBLIC_SERVER_ENV === 'staging'
    ? 'staging'
    : process.env.NEXT_PUBLIC_SERVER_ENV === 'production'
    ? 'api'
    : 'dev';

export const BaseURL_ONE = `https://${ENV_PREFIX}.matadortrust.com/v1`;
export const BaseURL_TWO = `https://${ENV_PREFIX}.matadortrust.com/v2`;
export const ROUTES = {};

export const EXTERNAL_ROUTES = {};

export const BASE_ROUTE = 'https://matadortrust.com';

const isEnvDev = process && process.env.NODE_ENV === 'development';

let storeDomain;

if (process.env.NODE_ENV === 'development') {
  //Store Domain for development

  // storeDomain = "orangetestapp.6787878.com";
  // storeDomain = 'dickson-store.6787878.com';
  // storeDomain = "ahmedibraheem.6787878.com";
  // storeDomain = 'tolulope.6787878.com';
  // storeDomain = 'https://app.adozillionhomesng.com'?.split('//')[1];
  // storeDomain = 'https://lapd-demo.6787878.com'?.split('//')[1];
  // storeDomain = 'jola.6787878.com';
  // storeDomain = 'zularichproperties-dev.6787878.com';
  // storeDomain = 'evermarkhomes-dev.6787878.com';
  // storeDomain = 'kollinconquer-dev.6787878.com';
  // storeDomain = 'joseph_store-demo-dev.6787878.com';
  // storeDomain = 'portfolio-dev.6787878.com';
  // storeDomain = 'landwey.6787878.com';
  storeDomain = 'malikproperties-dev.6787878.com';
  // storeDomain = 'albertandwand.6787878.com';
  // storeDomain = 'albertandwand.6787878.com';
  // storeDomain = 'thenewjola-dev.6787878.com';
  // storeDomain = 'adozillion.6787878.com';
  // storeDomain = 'adozillion-dev.6787878.com';

  // storeDomain = 'mainstone.6787878.com';
  // storeDomain = 'proptech.6787878.com';

  // storeDomain = 'piushomes.6787878.com';
  // storeDomain = 'joseph_store.6787878.com';
  // storeDomain = 'ethernit.6787878.com';
} else {
  //Store Domain for Production

  storeDomain =
    typeof window !== 'undefined' && window.location.origin && !isEnvDev
      ? window.location.origin?.split('//')[1]
      : null;
}
export const STORE__DOMAIN = storeDomain;

export const store_name = () =>
  appWindow && localStorage && JSON?.parse(localStorage.getItem('storeName'));

export const company_image = () =>
  appWindow && localStorage && JSON?.parse(localStorage.getItem('companyImage'));

export const STORENAMEFROMDOMAIN = store_name();
// STORE__DOMAIN?.split('.')[0];

export const storeName = store_name();
// STORENAMEFROMDOMAIN;
// typeof window !== 'undefined' &&
// localStorage.getItem('storeDetails') &&
// JSON?.parse(localStorage?.getItem('storeDetails'))['store_name'];

export const LoggedinUser =
  typeof window !== 'undefined' &&
  localStorage.getItem('storeDetails') &&
  JSON?.parse(localStorage?.getItem('LoggedinUser'));

export const STORE =
  typeof window !== 'undefined' &&
  localStorage.getItem('storeDetails') &&
  JSON?.parse(localStorage?.getItem('storeDetails'));
