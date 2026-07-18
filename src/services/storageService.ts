import storage from '../utils/storage';

export const getStorageItem = async <T>(key: string): Promise<T | null> => {
  const value = await storage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const setStorageItem = async (key: string, value: any): Promise<void> => {
  await storage.setItem(key, JSON.stringify(value));
};

export const removeStorageItem = async (key: string): Promise<void> => {
  await storage.removeItem(key);
};

export default {
  getStorageItem,
  setStorageItem,
  removeStorageItem
};
