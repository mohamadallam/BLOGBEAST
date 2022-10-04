export const getItemFromLocalStorage = (key, defaultValue = null) => {
  const saved = localStorage.getItem(key);
  const initialValue = JSON.parse(saved);
  return initialValue || defaultValue;
};
