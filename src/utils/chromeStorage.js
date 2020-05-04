/* global chrome */

const saveToChrome = (key, value) => {
  try {
    chrome.storage.sync.set({ [key]: value });
  } catch (e) {
    console.error(e);
  }
};

const getFromChrome = async (key, callback) => {
  try {
    await chrome.storage.sync.get(key, (result) => {
      callback(result[key]);
    });
  } catch (e) {
    console.error(e);
  }
};

const removeFromChrome = (key) => {
  try {
    chrome.storage.sync.remove(key);
  } catch (e) {
    console.error(e);
  }
};

export {
  saveToChrome,
  getFromChrome,
  removeFromChrome
};
