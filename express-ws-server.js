// ----
// You shouldn't need to modify this file.
// ----
// Config
const port = process.env.PORT || 8080;
const quiet = process.env.QUIET || true;
// ---

import { fileURLToPath } from 'node:url';
import Express  from 'express';
import ExpressWs from 'express-ws';
import BodyParser from 'body-parser';
import path, { dirname }  from 'node:path';

const ews = ExpressWs(Express());
const app = ews.app;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up the '/ws' resource to handle web socket connections
app.ws(`/ws`, function (ws, request) {
  if (!quiet) console.log(`New websocket connection`);

  // A message has been received from a client
  ws.on(`message`, function (message) {
    // @ts-ignore
    var clients = ews.getWss(`/ws`).clients;
    // Debug print it
    if (!quiet)
      console.log(new Date().toLocaleTimeString() + `> ` + message);

    // Broadcast it to all other clients
    for (const c of clients) {
      if (c === ws) continue;
      try {
        c.send(message);
      } catch {
        // can happen when client disconnects
        // console.error(e);
      }
    }
  });
});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
  extended: false
}));
//app.use(CookieParser());
app.use(Express.static(path.join(__dirname, `./`)));

// catch 404 and forward to error handler
app.use(function (request, resource, next) {
  var error = new Error(`Not Found`);
  // @ts-ignore
  error.status = 404;
  next(error);
});

// error handler
app.use(function (error, request, resource, next) {
  if (error.status)
    resource.sendStatus(error.status);
  else
    resource.sendStatus(500);
});


app.listen(port);
console.log(`Server started on port ` + port);