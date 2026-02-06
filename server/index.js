import http from "node:http";
import { WebSocketServer, WebSocket } from "ws";
import { mockEvents } from "../shared/events.js";
import { EventGenerator } from "../shared/eventGenerator.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const server = http.createServer((req, res) => {
  const host = req.headers.host ?? `localhost:${PORT}`;
  const url = new URL(req.url, `http://${host}`);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && url.pathname === "/events") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(mockEvents));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

const wss = new WebSocketServer({ server, path: "/ws" });

wss.on("connection", (socket) => {
  const generator = new EventGenerator((event) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(event));
    }
  });

  generator.start();

  const stopGenerator = () => generator.stop();
  socket.on("close", stopGenerator);
  socket.on("error", stopGenerator);
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mock events server listening on http://localhost:${PORT}`);
});
