module.exports = {
    clearMocks: true,
    testMatch: [
        '<rootDir>/src/**/*.spec.(ts|tsx)'
    ],
    // This configuration is used to defeat the problem:
    //  jest-haste-map: @providesModule naming collision:
    //   Duplicate module name: core-ui-kit
    //   Paths: C:\dev\projects\ams\core-ui-kit\dist\package.json collides with
    //      C:\dev\projects\ams\core-ui-kit\package.json
    //  This warning is caused by a @providesModule declaration with the same name across two different files.
    modulePathIgnorePatterns: [
        '<rootDir>/built/'
    ],
    testURL: 'http://localhost',
    transform: {
        '^(?!.*\\.(js|ts|tsx|css|json)$)': '<rootDir>/config/jest/transform/file.transform.js',
        '^.+\\.tsx?$': '<rootDir>/config/jest/transform/typescript.transform.js'
    },
    moduleFileExtensions: [
        'web.ts',
        'ts',
        'tsx',
        'web.js',
        'js',
        'json',
        'node'
    ],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.spec.json'
        }
    },
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }
};
