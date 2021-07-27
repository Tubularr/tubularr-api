import { platform } from 'process';
import * as pjson from '../package.json';

export const application = {
  environment: process.env.NODE_ENV || 'development',
  name: pjson.name,
  version: pjson.version
};

export const youtubeDl = {
  platform: platform,
  downloadPath: process.env.YOUTUBE_DL_DOWNLOAD_PATH || 'bin'
};

export const server = {
  port: 8080
};

export const db = {
  folder: process.env.SQLITE_DB_FOLDER || 'db'
};
