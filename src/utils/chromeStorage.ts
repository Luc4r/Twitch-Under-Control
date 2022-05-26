import { storage } from '@extend-chrome/storage';

const storageSystem = storage.sync || chrome.storage.sync || localStorage;

const saveToChrome = (key: string, value: any) => {
  try {
    console.log(key, value);
    storageSystem.set({ [key]: value });
  } catch (e) {
    console.error(e);
  }
};

const getFromChrome = async <T>(key: string) => {
  try {
    const data = await storageSystem.get([key]);
    console.log(data[key]);
    return data[key] as T;
  } catch (e) {
    console.error(e);
  }
};

const removeFromChrome = (key: string) => {
  try {
    storageSystem.remove(key);
  } catch (e) {
    console.error(e);
  }
};

export { saveToChrome, getFromChrome, removeFromChrome };
