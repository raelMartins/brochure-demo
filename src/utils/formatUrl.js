export const formatToHttps = url => {
  if (url?.startsWith('http://')) {
    return url;
  } else if (url?.startsWith('http://')) {
    return url;
  } else {
    return `https://${url}`;
  }
};
