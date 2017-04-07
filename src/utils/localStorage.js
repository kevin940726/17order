const KEY = '17order::auth';

export const getAppLocalStorage = () => (
  JSON.parse(window.localStorage.getItem(KEY) || null)
);

export const setAppLocalStorage = (auth) => {
  window.localStorage.setItem(KEY, JSON.stringify(auth));
};

export const removeAppLocalStorage = () => {
  window.localStorage.removeItem(KEY);
};
