import { storage } from '@extend-chrome/storage';

const saveToChrome = (key: string, value: any) => {
  try {
    storage.sync.set({ [key]: value });
  } catch (e) {
    console.error(e);
  }
};

const getFromChrome = async <T>(key: string) => {
  try {
    const result = await storage.sync.get();
    return result[key] as T;
  } catch (e) {
    console.error(e);
  }
};

const removeFromChrome = (key: string) => {
  try {
    storage.sync.remove(key);
  } catch (e) {
    console.error(e);
  }
};

export { saveToChrome, getFromChrome, removeFromChrome };
