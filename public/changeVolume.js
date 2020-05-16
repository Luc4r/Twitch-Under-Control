// Array with default pages on twtich (without video player)
const defaultPaths = ["", "directory", "p"];

window.addEventListener("load", function() {
	const path = window.location.pathname.slice(1).toLowerCase();
	// For now this app works only for channel pages (/example).
	// This conditional prevents it from trying to modify the video player settings 
	// on different pages with expanded paths (/example/videos/128256512).
	if (path.indexOf('/') !== -1 || defaultPaths.includes(path)) {
		return;
	}

	changeVolumeIfSettingsExist(path);
}, { once: true });

chrome.runtime.onMessage.addListener(path => {
	// For now this app works only for channel pages (/example).
	// This conditional prevents it from trying to modify the video player settings 
	// on different pages with expanded paths (/example/videos/128256512).
	if (path.indexOf('/') !== -1 || defaultPaths.includes(path)) {
		return;
	}

	changeVolumeIfSettingsExist(path);
});

const changeVolumeIfSettingsExist = (path) => { 
	const player = document.body.querySelector(".video-player video");
	const volumeSlider = document.body.querySelector(".tw-range");
	const volumeSliderFill = document.body.querySelector(".tw-range__fill-value");
	if (!player || !volumeSlider || !volumeSliderFill) {
		// path is correct, video player hasn't loaded yet
		setTimeout(() => changeVolumeIfSettingsExist(path), 800);
		return;
	}

	const key = "soundSettings";
	chrome.storage.sync.get(key, (result) => {
		const soundSettings = result && result[key];
		if (!soundSettings) {
			console.error("No settings found...");
			return;
		} else if (!soundSettings[path]) {
			console.error(`No settings found for channel ${path}`);
			return;
		}
		// Volume values
		const volumePercentage = `${soundSettings[path]}%`;
		const volumeFloat = parseFloat(volumePercentage) / 100;
		const volumeString = volumeFloat.toString();
		// Change volume
		player.volume = volumeFloat;
		// Update volume slider style
		volumeSlider.value = volumeString;
		volumeSliderFill.style.width = volumePercentage;
  });
};