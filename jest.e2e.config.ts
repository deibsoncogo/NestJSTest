import type { Config } from 'jest'

const config: Config = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: './src/modules/',
  roots: ['../../tests/e2e/'],
  testRegex: ['.*\\.e2e\\.spec\\.ts$'],
  coverageDirectory: '../../tests/e2e/coverage',
  collectCoverageFrom: ['**/*.(t|j)s'],
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  testEnvironment: 'node',
}

export default config
