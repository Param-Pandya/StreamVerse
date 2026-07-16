let tempStorage;
try {
  // eslint-disable-next-line global-require, import/no-unresolved
  tempStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  const cache = {};
  tempStorage = {
    getItem: async (key) => cache[key] || null,
    setItem: async (key, value) => {
      cache[key] = value;
    },
    removeItem: async (key) => {
      delete cache[key];
    },
    clear: async () => {
      Object.keys(cache).forEach((key) => delete cache[key]);
    }
  };
}

const AsyncStorage = tempStorage;
export default AsyncStorage;
