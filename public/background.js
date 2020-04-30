/**
 * Listens for every tab update - if the twitch tab's URL changes, send data to content scripts.
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  const updatedURL = changeInfo.url;
  const regex = /^(https|http):\/\/www.twitch.tv.*$/;
  if (regex.test(updatedURL)) {
    const newURL = new URL(updatedURL);
    const path = newURL.pathname.slice(1).toLowerCase();

    path && chrome.tabs.sendMessage(tabId, path);
  }
});