const KEY = '17order::auth';

export const getAppLocalStorage = () => (
  // new Array(window.localStorage.length)
  //   .fill(0)
  //   .map((cur, i) => window.localStorage.key(i))
  //   .filter(key => key.match(PREFIX))
  //   .reduce((obj, key) => {
  //     const value = window.localStorage.getItem(key);
  //     const ogKey = key.replace(PREFIX, '$1');
  //     const objectPrefix = 'object:'
  //     const isObject = ogKey.substr(0, objectPrefix.length) === objectPrefix;
  //     const storeKey = isObject ? ogKey.substr(objectPrefix.length) : ogKey;
  //     const storeValue = isObject ? JSON.parse(value) : value;

  //     return {
  //       ...obj,
  //       [storeKey]: storeValue,
  //     };
  //   }, {})
  JSON.parse(window.localStorage.getItem(KEY) || null)
);

export const setAppLocalStorage = (auth) => {
  // Object.entries(storage)
  //   .forEach(([key, value]) => {
  //     window.localStorage.setItem(
  //       `17order::${typeof value === 'object' ? 'object:' : ''}${key}`,
  //       typeof value === 'string' ? value : JSON.stringify(value)
  //     );
  //   });
  window.localStorage.setItem(KEY, JSON.stringify(auth));
};
