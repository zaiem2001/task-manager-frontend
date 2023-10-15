export const saveToLocalStorage = (storageData: {
  key: string;
  value: any;
}) => {
  const { key, value } = storageData;

  localStorage.setItem(key, JSON.stringify(value));
};

export const getDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const removeDataFromStorage = (key: string) =>
  localStorage.removeItem(key);
