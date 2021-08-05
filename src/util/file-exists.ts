import * as fs from 'fs';

export const fileExists = (path: string): Promise<boolean> => {
  return fs.promises.access(path, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
};
