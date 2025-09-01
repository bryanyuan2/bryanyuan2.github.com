# Curriculum Vitae - 鄭鈞元 Bryan Chun-Yuan Cheng
- [http://bryanyuan2.github.io/](http://bryanyuan2.github.io/)


# Installation

This project provides multiple ways to run the CV website. Choose the method that best fits your environment and needs.

## Method 1: Traditional Node.js Development

```bash
# Install all dependencies
npm install

# Start production server (builds and serves the website)
npm run start:prod
```

## Method 2: Automated Docker Setup (Recommended)

```bash
# Make the script executable (first time only)
chmod +x start-docker.sh

# Run the automated Docker setup
npm run docker:start
```

## Method 3: Docker Compose

```bash
# Start services in detached mode
docker-compose up -d

# View logs (optional)
docker-compose logs

# Stop services when done
docker-compose down
```

## Method 4: Manual Docker Build and Run

```bash
# Build the Docker image and run the container
npm run docker:build && npm run docker:run
```

**All Docker methods serve the website on http://localhost:8080**  
**Node.js method serves the website on http://localhost:3000**

# Usage
- Below is a list of available npm scripts and their descriptions:

| Script Name      | Description                                                                          |
|------------------|--------------------------------------------------------------------------------------|
| `test`          | Runs tests using Jest.                                                              |
| `test-cov`      | Runs tests with coverage report using Jest.                                         |
| `clean`         | Deletes all JavaScript files in the `./src/build/` directory.                        |
| `eslint`        | Runs ESLint to check for linting issues in TypeScript files.                        |
| `eslint-fix`    | Runs ESLint and automatically fixes linting issues in TypeScript files.             |
| `jsonlint:data` | Validates JSON files in the `./asserts/data/` directory.                            |
| `jsonlint:mockdata` | Validates mock JSON files in the `./test/app/mock/data/` directory.              |
| `build:css`     | Compiles SCSS files to compressed CSS using Sass.                                    |
| `connect`       | Starts a Live Server on port 3000 and watches for file changes.                      |
| `watch:dev`     | Watches for changes in HTML, SCSS, and JavaScript files and rebuilds in development. |
| `build:dev:ts`  | Bundles TypeScript files using Browserify with development environment settings.     |
| `build:prod:ts` | Bundles TypeScript files using Browserify for production, then minifies with UglifyJS.  |
| `start:dev`     | Runs JSON validation, builds CSS and TypeScript in development mode, and starts the server with watch mode. |
| `start:prod`    | Runs JSON validation, builds CSS and TypeScript in production mode, and starts the server. |
| **Docker Scripts** | |
| `docker:build`  | Builds the Docker image.                                                            |
| `docker:run`    | Runs the Docker container on port 8080.                                             |
| `docker:start`  | Runs the automated Docker setup script.                                             |
| `docker:up`     | Starts services using Docker Compose.                                               |
| `docker:down`   | Stops services using Docker Compose.                                                |
| `docker:logs`   | Shows Docker Compose logs.                                                          |