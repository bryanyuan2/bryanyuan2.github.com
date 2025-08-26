# Curriculum Vitae - 鄭鈞元 Bryan Chun-Yuan Cheng
- [http://bryanyuan2.github.io/](http://bryanyuan2.github.io/)

# Usage
- Below is a list of available npm scripts and their descriptions:

| Script Name      | Description                                                                          |
|------------------|--------------------------------------------------------------------------------------|
| `test`          | Runs tests using Jest.                                                              |
| `test-cov`      | Runs tests with coverage report using Jest.                                         |
| `clean`         | Deletes all JavaScript files in the `./js/build/` directory.                        |
| `eslint`        | Runs ESLint to check for linting issues in JavaScript files.                        |
| `eslint-fix`    | Runs ESLint and automatically fixes linting issues in JavaScript files.             |
| `jsonlint:data` | Validates JSON files in the `./asserts/data/` directory.                            |
| `jsonlint:mockdata` | Validates mock JSON files in the `./test/app/mock/data/` directory.              |
| `build:dev:js`  | Bundles JavaScript files using Browserify with development environment settings.     |
| `build:prod:js` | Bundles and minifies JavaScript files using Browserify and UglifyJS for production.  |
| `build:css`     | Compiles SCSS files to compressed CSS using Sass.                                    |
| `connect`       | Starts a Live Server on port 3000 and watches for file changes.                      |
| `watch:dev`     | Watches for changes in HTML, SCSS, and JavaScript files and rebuilds in development. |
| `start:dev`     | Runs JSON validation, builds CSS and JavaScript in development mode, and starts the server with watch mode. |
| `start:prod`    | Runs JSON validation, builds CSS and JavaScript in production mode, and starts the server. |