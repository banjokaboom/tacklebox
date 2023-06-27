import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'app/{pages,components,helpers}/**/*.{js,jsx,ts,tsx}',
    'app/page.{js,jsx,ts,tsx}',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/app/pages/what-to-fish/cityStates.json',
    '<rootDir>/app/pages/what-to-fish/tackle.json',
    '<rootDir>/app/pages/what-to-make/recipes.json',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
