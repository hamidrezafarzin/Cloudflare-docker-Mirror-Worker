# Docker Hub Mirror with Cloudflare Workers

This repository contains a Cloudflare Worker script to create a mirror for Docker Hub, allowing CORS access and including a `/ping` endpoint for health checks.

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Usage](#usage)
5. [Deployment](#deployment)
6. [License](#license)

## Overview

This Cloudflare Worker script allows requests to be mirrored to Docker Hub, adds CORS headers for greater accessibility, and provides a health-checking `/ping` endpoint.

## Features

- Docker Hub mirror with CORS
- Health-check endpoint (`/ping`)
- Simple deployment to Cloudflare Workers

## Usage

### Docker Pull Example

To use the mirror, pull an image by replacing Docker Hub’s URL with your Cloudflare Worker’s URL.

```bash
docker pull <your-worker-url>/library/ubuntu:latest
```

### Docker Compose Example

Use the Worker URL in your `docker-compose.yml` file as shown below:

```yaml
version: "3.8"
services:
  app:
    image: <your-worker-url>/library/nginx:latest
```

Replace `<your-worker-url>` with the URL of your deployed Cloudflare Worker.

## Deployment

1. **Log in to Cloudflare**  
   Sign in to your Cloudflare account.

2. **Navigate to Workers Section**  
   In your Cloudflare dashboard, go to **Workers** > **Manage Workers**.

3. **Create a New Worker**  
   Select **Create a Service** and enter a name for your Worker.

4. **Copy and Paste the Code**  
   In the Worker editor, delete any pre-existing code, then copy and paste the script from this repository.

5. **Save and Deploy**  
   Click **Save and Deploy**. You will receive a Worker URL (e.g., `https://your-worker-url.workers.dev`), which you can use for Docker pulls and in Docker Compose.

## License

This project is open-source and licensed under the MIT License.
