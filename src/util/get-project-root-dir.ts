import { resolve } from 'path';

export const getProjectRootDir = (): string => {
  return resolve(`${__dirname}\\..\\..\\`);
};
