interface StorageInterface {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  clear: () => Promise<void>;
}

let tempStorage: StorageInterface;
try {
  // eslint-disable-next-line global-require, import/no-unresolved
  tempStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  const cache: Record<string, string> = {};
  tempStorage = {
    getItem: async (key: string) => cache[key] || null,
    setItem: async (key: string, value: string) => {
      cache[key] = value;
      return Promise.resolve();
    },
    removeItem: async (key: string) => {
      delete cache[key];
      return Promise.resolve();
    },
    clear: async () => {
      Object.keys(cache).forEach((key) => delete cache[key]);
      return Promise.resolve();
    }
  };
}

const AsyncStorage = tempStorage;
export default AsyncStorage;
