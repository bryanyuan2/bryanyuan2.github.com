# Curriculum Vitae - 鄭鈞元 Bryan Chun-Yuan Cheng
- [http://bryanyuan2.github.io/](http://bryanyuan2.github.io/)


# Installation

This project provides multiple ways to run the CV website. Choose the method that best fits your environment and needs.

## Method 1: Traditional Node.js Development

Install dependencies and run the development server with live reload:

```bash
# Install all dependencies
npm install

# Start production server (builds and serves the website)
npm run start:prod
```

This will:
- Validate JSON data files
- Compile SCSS to CSS
- Bundle TypeScript/React code for production
- Start a live server on http://localhost:3000

## Method 2: Automated Docker Setup (Recommended)

Use the intelligent startup script that automatically detects your environment:

```bash
# Make the script executable (first time only)
chmod +x start-docker.sh

# Run the automated Docker setup
npm run docker:start
```

This script will:
- Check if Docker and Docker Compose are installed
- Automatically choose between Docker Compose or plain Docker
- Build the image and start the container
- Display management commands for easy control

## Method 3: Docker Compose (Production Ready)

Use Docker Compose for a complete containerized solution:

```bash
# Start services in detached mode
docker-compose up -d

# View logs (optional)
docker-compose logs

# Stop services when done
docker-compose down
```

Benefits:
- Easy container management
- Automatic restart policies
- Production-ready configuration

## Method 4: Manual Docker Build and Run

Build and run the Docker container manually for full control:

```bash
# Build the Docker image and run the container
npm run docker:build && npm run docker:run

# Alternative: Manual Docker commands
docker build -t bryanyuan2-cv .
docker run -d -p 8080:80 --name bryanyuan2-cv bryanyuan2-cv
```

This method provides:
- Full control over the build process
- Detailed build output for debugging
- Custom container configuration options

---

**All Docker methods serve the website on http://localhost:8080**  
**Node.js method serves the website on http://localhost:3000**

For detailed Docker setup and troubleshooting, see [DOCKER_README.md](./DOCKER_README.md)


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
| **🐳 Docker Scripts** | |
| `docker:build`  | Builds the Docker image.                                                            |
| `docker:run`    | Runs the Docker container on port 8080.                                             |
| `docker:start`  | Runs the automated Docker setup script.                                             |
| `docker:up`     | Starts services using Docker Compose.                                               |
| `docker:down`   | Stops services using Docker Compose.                                                |
| `docker:logs`   | Shows Docker Compose logs.                                                          |