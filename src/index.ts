import * as config from './config';

import * as youtubeDlWrapper from './wrappers/youtube-dl-wrapper';
import * as server from './server';
import * as sqliteDb from './db/sqlite-driver';

const initialize = async (): Promise<void> => {
  await youtubeDlWrapper.downloadYouTubeDl(config.youtubeDl.platform, config.youtubeDl.downloadPath);

  await sqliteDb.open(config.db.folder);

  server.start();
};

//TODO: Add top level error handler
(async () => {
  try {
    await initialize();

    const youtubeExecutable = youtubeDlWrapper.getYouTubeDlExecutable(`${config.youtubeDl.downloadPath}`);

    // await sqliteDb.insertSource({
    //   name: 'blah blah',
    //   sourceKey: 'some key',
    //   directory: '/blah blah',
    //   format: '{some}_{format}',
    //   indexSchedule: 'some time in ms?',
    //   download: 1,
    //   createdOn: 'some date',
    //   lastIndexedOn: 'another date',
    //   sourceResolution: 'some resolution',
    //   sourceVideoCodec: 'some video codec',
    //   sourceAudioCodec: 'some audio codec',
    //   prefer60fps: 1,
    //   preferHdr: 1,
    //   sourceFileExtension: '.butt',
    //   fallbackStrategy: 'some strategy',
    //   downloadThumbnails: 1,
    //   downloadNfo: 1,
    //   deleteSchedule: 'some time in ms'
    // });
  } catch (error) {
    //TODO: Use actual logger
    console.log(error);
  }
})();
