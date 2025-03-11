import type { Config } from 'jest';
import presets from 'jest-preset-angular/presets';

export default {
  ...presets.createCjsPreset(),
  // rootDir: './src/',
  // modulePaths: ['<rootDir>'],
  // setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  setupFilesAfterEnv: ['./setup-jest.ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
} satisfies Config;
