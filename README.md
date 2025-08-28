# Curriculum Vitae - 鄭鈞元 Bryan Chun-Yuan Cheng
- [http://bryanyuan2.github.io/](http://bryanyuan2.github.io/)

# Usage
- Below is a list of available npm scripts and their descriptions:

| Script Name      | Description                                                                          |
|------------------|--------------------------------------------------------------------------------------|
| `test`          | Runs tests using Jest.                                                              |
| `test-cov`      | Runs tests with coverage report using Jest.                                         |
| `clean`         | Deletes all JavaScript files in the `./js/build/` directory.                        |
| `eslint`        | Runs ESLint to check for linting issues in TypeScript files.                        |
| `eslint-fix`    | Runs ESLint and automatically fixes linting issues in TypeScript files.             |
| `jsonlint:data` | Validates JSON files in the `./asserts/data/` directory.                            |
| `jsonlint:mockdata` | Validates mock JSON files in the `./test/app/mock/data/` directory.              |
| `build:css`     | Compiles SCSS files to compressed CSS using Sass.                                    |
| `connect`       | Starts a Live Server on port 3000 and watches for file changes.                      |
| `watch:dev`     | Watches for changes in HTML, SCSS, and JavaScript files and rebuilds in development. |
| `build:dev:ts`  | Bundles TypeScript files using Browserify with development environment settings.     |
| `build:prod:ts` | Bundles and minifies TypeScript files using Browserify and UglifyJS for production.  |
| `start:dev`     | Runs JSON validation, builds CSS and TypeScript in development mode, and starts the server with watch mode. |
| `start:prod`    | Runs JSON validation, builds CSS and TypeScript in production mode, and starts the server. |