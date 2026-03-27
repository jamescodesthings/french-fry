# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`french-fry-the-agent` is a static HTML/CSS/JS microsite served by a minimal Node.js/Express static file server. The server has no API routes or templating — it only serves files from `docs/`. Docker Compose handles containerisation; Make wraps all common operations.

## Layout

```
├── server.js          # Express static file server (keep thin)
├── package.json
├── Dockerfile         # Single-stage node:22-alpine build
├── docker-compose.yml # Single `app` service on port 3000
├── Makefile           # All dev/ops commands
└── docs/            # Everything served to the browser
    ├── index.html
    ├── css/styles.css
    └── js/main.js
```

## Makefile targets

| Target | What it does |
|--------|-------------|
| `make install` | `npm install` — run once after cloning |
| `make dev` | Start server locally without Docker (`http://localhost:3000`) |
| `make build` | `docker compose build` |
| `make up` | Start container in the background |
| `make down` | Stop and remove container |
| `make logs` | Tail container logs |
| `make restart` | Restart running container |
| `make clean` | Remove container and local Docker image |
| `make shell` | Shell into the running container |
| `make lint` | ESLint on `docs/js/` |

## Running locally (no Docker)

```
make install
make dev
# open http://localhost:3000
```

## Running with Docker

```
make build
make up
# open http://localhost:3000
make logs   # follow output
make down   # stop
```

## Environment variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `3000` | Port Express listens on |
| `NODE_ENV` | `development` | Set to `production` inside Docker |

## Conventions

- All static assets must live under `docs/`. The server will not serve files from outside this directory.
- `server.js` must stay thin — no business logic, no routes, no templates.
- CSS goes in `docs/css/`, JS in `docs/js/`. Do not put scripts or styles inline in HTML.
- The port is always `3000`. Change it only via the `PORT` env var — never hardcode an alternate.

## Adding pages

Drop a new `.html` file in `docs/` and link to it from `index.html`. No server changes needed.
