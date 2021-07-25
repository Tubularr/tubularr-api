import * as config from './config';

import * as youtubeDlWrapper from './wrappers/youtube-dl-wrapper';

const initialize = async (): Promise<void> => {
  await youtubeDlWrapper.downloadYouTubeDl(config.youtubeDl.platform, config.youtubeDl.downloadPath);
};

(async () => {
  await initialize();

  // const youtubeDl = youtubeDlWrapper.getYouTubeDlExecutable('\\bin\\youtube-dl.exe');

  const youtubeExecutable = youtubeDlWrapper.getYouTubeDlExecutable(`${config.youtubeDl.downloadPath}\\youtube-dl.exe`);

  console.log(youtubeExecutable);
})();
