import os from 'os';
import * as YoutubeDlWrap from 'youtube-dl-wrap';

import { getProjectRootDir } from '../util/get-project-root-dir';
import { fileExists } from '../util/file-exists';

const getYouTubeDlExecutableLocation = (downloadPath: string): string => {
  return `${getProjectRootDir()}\\${downloadPath}\\youtube-dl${os.platform() === 'win32' ? '.exe' : ''}`;
};

export const downloadYouTubeDl = async (downloadPath: string): Promise<void> => {
  try {
    const downloadLocation = getYouTubeDlExecutableLocation(downloadPath);

    //TODO: Make this configurable
    if (!(await fileExists(downloadLocation))) {
      const githubReleasesData = await YoutubeDlWrap.default.getGithubReleases(1, 5);

      await YoutubeDlWrap.default.downloadFromGithub(downloadLocation, githubReleasesData[0].tag_name, os.platform());
    }
  } catch (error) {
    console.error(error);
  }
};

export const getYouTubeDlExecutable = (executableLocation: string) => {
  const executable = getYouTubeDlExecutableLocation(executableLocation);

  return new YoutubeDlWrap.default(executable);
};

const generateFormatSelectionOption = () => {
  const bestVideo = 'bestvideo*';
  const bestAudio = 'bestaudio';
  const bestCombined = 'best';

  return `${bestVideo}+${bestAudio}/${bestCombined}`;
};

//NOTE: To list formats for a video, use --list-formats. It prints in a table format, so we'd need to parse it
// https://github.com/yt-dlp/yt-dlp#format-selection
export const generateYouTubeDlCommand = (
  directoryToSaveTo: string,
  videoFormat: string,
  sourceResolution: string,
  sourceVideoCodec: string,
  sourceAudioCodec: string,
  prefer60fps: number,
  preferHdr: number,
  sourceFileExtension: string,
  fallbackStrategy: string,
  downloadThumbnails: number,
  downloadNfo: number,
  downloadSubtitles: number,
  subtitleLanguage: string,
  videoId: string
): string => {
  const command = '';

  const pathToDownloadTo = `--paths "${directoryToSaveTo}"`;

  const formatOption = `-f "${generateFormatSelectionOption()}"`;

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return command;
};
