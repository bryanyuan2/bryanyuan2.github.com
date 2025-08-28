module.exports = {
    "setupFiles": ['<rootDir>/jest.setup.ts'],
    "preset": "ts-jest",
    "collectCoverage": true,
    "testEnvironment": "jsdom", // for browser environments
    "testMatch": [
        "<rootDir>/test/app/**/*.test.(tsx|ts|js)"
    ],
    "collectCoverageFrom": [
        "<rootDir>/js/app/**/*.(tsx|ts|js)",
        "!<rootDir>/js/app/app.tsx"
    ],
    "coveragePathIgnorePatterns": [
        "node_modules"
    ]
};