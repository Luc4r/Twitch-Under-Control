// Array with default pages on twtich (without video player)
const DEFAULT_PATHS = ['', 'directory', 'p'];
const ADDON_SOUND_SETTINGS_KEY = 'soundSettings';
const RETRY_TIME_MS = 500;
const MAX_RETRY_COUNT = 5;
let retryCount = 0;

const changeVolumeIfSettingsExist = (path) => {
  const playerElements = document.body.querySelectorAll('video');
  const volumeSliderElements = document.body.querySelectorAll(
    'input[type="range"]',
  );
  const volumeSliderFillElements = document.body.querySelectorAll(
    '.tw-range__fill-value',
  );

  if (playerElements?.length === 0 || volumeSliderElements?.length === 0) {
    // path is correct, video player hasn't loaded yet
    if (retryCount < MAX_RETRY_COUNT) {
      setTimeout(() => changeVolumeIfSettingsExist(path), RETRY_TIME_MS);
      retryCount += 1;
    } else {
      retryCount = 0;
    }
    return;
  }

  chrome.storage.sync.get(ADDON_SOUND_SETTINGS_KEY, (result) => {
    const soundSettings = result && result[ADDON_SOUND_SETTINGS_KEY];
    retryCount = 0;

    if (!soundSettings) {
      console.error('No settings found...');
      return;
    } else if (!soundSettings[path]) {
      console.error(`No settings found for channel ${path}`);
      return;
    }
    // Volume values
    const volumePercentage = `${soundSettings[path]}%`;
    const volumeFloat = parseFloat(volumePercentage) / 100;
    const volumeString = volumeFloat.toString();
    // Update volume multiple times due to aggresive data fetching and caching
    const updateVolumeInterval = window.setInterval(() => {
      // Change localStorage volume value
      localStorage.setItem('volume', volumeString);
      // Change player volume
      playerElements.forEach((playerElement) => {
        playerElement.volume = volumeFloat;
      });
      // Update volume slider style
      volumeSliderElements.forEach((volumeSliderElement) => {
        volumeSliderElement.value = volumeString;
      });
      if (volumeSliderFillElements?.length > 0) {
        volumeSliderFillElements.forEach((volumeSliderFillElement) => {
          volumeSliderFillElement.style.width = volumePercentage;
        });
      }

      if (retryCount >= MAX_RETRY_COUNT) {
        clearInterval(updateVolumeInterval);
      }
      retryCount += 1;
    }, RETRY_TIME_MS);
  });
};

window.addEventListener(
  'load',
  () => {
    const path = window.location.pathname.slice(1).toLowerCase();
    console.log({ path });
    // For now this app works only for channel pages (/example).
    // This conditional prevents it from trying to modify the video player settings
    // on different pages with expanded paths (/example/videos/128256512).
    if (path.indexOf('/') !== -1 || DEFAULT_PATHS.includes(path)) {
      return;
    }

    changeVolumeIfSettingsExist(path);
  },
  { once: true },
);

chrome.runtime.onMessage.addListener((path) => {
  // For now this app works only for channel pages (/example).
  // This conditional prevents it from trying to modify the video player settings
  // on different pages with expanded paths (/example/videos/128256512).
  console.log(path);
  if (path.indexOf('/') !== -1 || DEFAULT_PATHS.includes(path)) {
    return;
  }

  changeVolumeIfSettingsExist(path);
});
