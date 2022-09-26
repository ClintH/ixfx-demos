// ----
// You shouldn't need to modify this file. Work in the 'public' folder instead.
// ----
// Config
const port = process.env.PORT || 8080;
const quiet = process.env.QUIET || false;
// ---

import { fileURLToPath } from 'url';
import Express  from 'express';
import ExpressWs from 'express-ws';
import CookieParser from 'cookie-parser';
import BodyParser from 'body-parser';
import path, { dirname }  from 'path';
//const path = require(`path`);
//const cookieParser = require(`cookie-parser`);
//const bodyParser = require(`body-parser`);
//const expressWs = require(`express-ws`);

const ews = ExpressWs(Express());
const app = ews.app;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up the '/ws' resource to handle web socket connections
app.ws(`/ws`, function (ws, req) {
  // A message has been received from a client
  ws.on(`message`, function (msg) {
    var clients = ews.getWss(`/ws`).clients;
    // Debug print it
    if (!quiet)
      console.log(new Date().toLocaleTimeString() + `> ` + msg);

    // Broadcast it to all other clients
    clients.forEach(c => {
      if (c === ws) return;
      try {
        c.send(msg);
      } catch (e) {
        // can happen when client disconnects
        // console.error(e);
      }
    });
  });
});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
  extended: false
}));
app.use(CookieParser());
app.use(Express.static(path.join(__dirname, `./`)));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error(`Not Found`);
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  if (err.status)
    res.sendStatus(err.status);
  else
    res.sendStatus(500);
});


app.listen(port);
console.log(`Server started on port ` + port);