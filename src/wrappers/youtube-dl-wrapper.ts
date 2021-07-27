import * as YoutubeDlWrap from 'youtube-dl-wrap';

import { getProjectRootDir } from '../util/get-project-root-dir';
import { fileExists } from '../util/file-exists';

const getYouTubeDlExecutableLocation = (downloadPath: string) => {
  return `${getProjectRootDir()}\\${downloadPath}\\youtube-dl.exe`;
};

//TODO: Use the platform param
export const downloadYouTubeDl = async (platform: string, downloadPath: string): Promise<void> => {
  try {
    const downloadLocation = getYouTubeDlExecutableLocation(downloadPath);

    if (!(await fileExists(downloadLocation))) {
      //Get the data from the github releases API. In this case get page 1 with a maximum of 5 items.
      const githubReleasesData = await YoutubeDlWrap.default.getGithubReleases(1, 5);

      // console.log(githubReleasesData);

      //Download the youtube-dl binary for the given version and platform to the provided path.
      //By default the latest version will be downloaded to "./youtube-dl" and platform = os.platform().
      await YoutubeDlWrap.default.downloadFromGithub(downloadLocation, githubReleasesData[0].tag_name, 'win32');

      // //Same as above but always downloads the latest version from the youtube-dl website.
      // const response1 = await downloadFromWebsite(downloadLocation, platform);

      // console.log(response1);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getYouTubeDlExecutable = (executableLocation: string) => {
  const executable = getYouTubeDlExecutableLocation(executableLocation);

  return new YoutubeDlWrap.default(executable);
};
