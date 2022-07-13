const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const port = process.env.PORT || 5000;
const db = require('./config/db');
const routes = require('./routes');
const errorHandleMiddlewares = require('./middlewares/errorHandleMiddlewares');
const cors = require('cors');
const WebSockets = require("./utils/WebSockets")
// For .env access
require("dotenv").config();

// Connect to DB
db.connect();

// Check mode
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// To recognize the incoming Request Object as a JSON Object
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


///////////////////////
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors());

//app.use(cors(corsOptions))

app.get("/", (req, res) => {
  res.send("Successfully running !");
});

// Route 
routes(app);

app.use(errorHandleMiddlewares.errorHandler);

const server = http.createServer(app);
/** Create socket connection */
global.io = require('socket.io')(server, {cors: {origin: "*"}});

global.io.use(WebSockets.socketAuth);
global.io.on('connection', WebSockets.connection)
/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});
