import {formatWithCommas} from './formatAmount';

export const randomBackgroundColor = () => {
  const colors = [
    '#2A2F36',
    '#183D3D',
    '#3B2338',
    `#000035`,
    `#4f276e`,
    `#225559`,
    `#c0eaed`,
    `#9e9e28`,
    `#5c5c47`,
    `#7d5f72`,
  ];

  return colors?.[Math.floor(Math.random() * colors?.length)];
};

export const capitalizeString = string => {
  const capitalized_string = string
    ?.split(' ')
    ?.map(el => el?.charAt(0).toUpperCase() + el?.slice(1))
    ?.join(' ')
    ?.split('-')
    ?.map(el => el?.charAt(0).toUpperCase() + el?.slice(1))
    ?.join('-')
    ?.split('_')
    ?.map(el => el?.charAt(0).toUpperCase() + el?.slice(1))
    ?.join('_');

  return capitalized_string;
};

export const formatPropertySize = string => {
  return !isNaN(string * 1) ? `${formatWithCommas(string * 1)} sqm` : string;
};

export const checkIfSFH = info => {
  const isSFH =
    info?.building_type === 'Detached' ||
    info?.building_type === 'Semi Detached' ||
    info?.building_type === 'Land' ||
    info?.unit?.project?.building_type === 'Detached' ||
    info?.unit?.project?.building_type === 'Semi Detached' ||
    info?.unit?.project?.building_type === 'Land';
  return isSFH;
};

export const displayTransactionTitle = ({data, index = 0, title}) => {
  console.log({data});

  function getOrdinal(number) {
    if (typeof number !== 'number') {
      return ''; // Return an empty string for invalid inputs
    }

    const suffixes = ['th', 'st', 'nd', 'rd'];
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    // Special cases for 11, 12, and 13, as they don't follow the usual pattern
    if (lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13) {
      return number + 'th';
    }

    // Use the appropriate suffix based on the last digit
    const suffix = suffixes[lastDigit] || 'th';

    return number + suffix;
  }

  return title
    ? title
    : data?.transaction_action_type?.toLowerCase()?.includes(`initial`)
    ? `Initial Deposit`
    : `${getOrdinal(index)} payment`;
};
