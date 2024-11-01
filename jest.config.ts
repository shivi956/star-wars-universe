module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: [
        "<rootDir>/jest.setup.ts"
    ],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/test/__mocks__/fileMock.js"
    },
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts",
        "!src/**/*.{spec,test}.{js,jsx,ts,tsx}",
        "!**/node_modules/**",
        "!**/vendor/**",
        "!**/dist/**",
        "!**/build/**",
        "!vite.config.ts",
        "!**/coverage/**"
    ],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "jest.setup.ts",
        "vite-env.d.ts",
        "main.tsx"
    ],
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': ['ts-jest', {
            tsconfig: 'tsconfig.app.json'
        }],
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
};

