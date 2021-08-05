import * as config from './config';

import * as youtubeDlWrapper from './wrappers/youtube-dl-wrapper';
import * as server from './server';
import * as sqliteDb from './db/sqlite-driver';

const initialize = async (): Promise<void> => {
  await youtubeDlWrapper.downloadYouTubeDl(config.youtubeDl.downloadPath);

  await sqliteDb.open(config.db.folder);

  server.start();
};

//TODO: Add top level error handler
(async () => {
  try {
    await initialize();

    const youtubeExecutable = youtubeDlWrapper.getYouTubeDlExecutable(`${config.youtubeDl.downloadPath}`);

  } catch (error) {
    //TODO: Use actual logger
    console.log(error);
  }
})();
