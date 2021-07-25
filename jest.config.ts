import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    testPathIgnorePatterns: [
      '<rootDir>/dist/'
    ],
    collectCoverageFrom: [
      '!**/src/**/interfaces/**',
      '!**/src/index.ts',
      '**/src/services/*.ts'
    ],
    coverageThreshold: {
      global: {
        branches: 85,
        functions: 85,
        lines: 85
      }
    },
    collectCoverage: true
  };
};
