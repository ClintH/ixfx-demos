import WebSocket, { WebSocketServer } from 'ws';
const port = 8080;
const wss = new WebSocketServer({ port });

wss.on(`connection`, function connection(ws) {
  console.log(`Connection!`);
  ws.on(`error`, console.error);

  ws.on(`message`, function message(data, isBinary) {
    for (const client of wss.clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    }
  });
});

console.log(`Websocket server started on port ${port}`);