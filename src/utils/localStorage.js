import { MY_PREFERRED_THEME } from "../constants/names";

export const getItemFromLS = (key) => {
  if (typeof window === 'undefined') return null;
  const item = window.localStorage.getItem(key);
  if (!item) return null;
  try {
    return JSON.parse(item);
  } catch (error) {
    if (typeof item === 'string') return item;
    return null;
  }
};

export const setItemInLS = (key, value) => {
  if (typeof window === 'undefined') return;
  if (typeof value === 'string') {
    window.localStorage.setItem(key, value);
  } else {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeItemFromLS = (key) => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(key);
};


export const appCurrentTheme = getItemFromLS(MY_PREFERRED_THEME);
