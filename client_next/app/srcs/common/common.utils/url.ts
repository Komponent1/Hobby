export const queryString = (url: string, params: {[key: string]: string | number}) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return `${url}?${query}`;
};
