# Real-Time Data Dashboard

Simple realtime events UI.

Data sources:

- WebSocket server: `ws://localhost:4000/ws`
- Local generator: runs in the browser

## Requirements

- Node.js 18+
- npm

## Install

```bash
npm install
```

## Run (server + client)

```bash
npm start
```

Endpoints:

- REST: `http://localhost:4000/events`
- WebSocket: `ws://localhost:4000/ws`

## Run (client only)

```bash
npm run dev
```

Or:

```bash
cd client
npm install
npm run dev
```

## How it works

- On load: try `GET http://localhost:4000/events`, else use `mockEvents`.
- Connect = server stream, Start = local generator.
- Only one mode at a time.

## Scripts

- `npm install` - install deps
- `npm start` - server + client
- `npm run dev` - client only
- `npm run lint` / `npm run test` / `npm run build`

## Notes

- Server default port: `4000` (use `PORT` to change).
