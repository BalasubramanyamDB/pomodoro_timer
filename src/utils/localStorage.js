export const getLocalStorage = (item) => JSON.parse(localStorage.getItem(item));
export const setLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
export const deleteLocalStorage = (item) => localStorage.removeItem(item);
