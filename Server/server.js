const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  transports: ["websocket"] //set to use websocket only
}); //this loads socket.io and connects it to the server.

//Personal Modules
const Player = require('./Player')

const port = process.env.PORT || 8080;

//this next line makes sure we can put all our html/css/javascript in the public directory
app.use(express.static(__dirname + "/../Client"));
//we just have 1 route to the home page rendering an index html
app.get("/", (req, res) => {
  res.render("index.html");
});

//run the server which uses express
http.listen(port, () => {
  console.log(`Server is active at port:${port}`);
});

//store the positions of each client in this object.
//It would be safer to connect it to a database as well so the data doesn't get destroyed when the server restarts
//but we'll just use an object for simplicity.
const players = {};

//Socket configuration
io.on("connection", (socket) => {
  //each time someone visits the site and connect to socket.io this function  gets called
  //it includes the socket object from which you can get the id, useful for identifying each client
  console.log(`${socket.id} connected`);

    socket.on('connected', () => {
        io.emit("id", socket.id)
    })
  

  //Add a starting position when the client connects
  players[socket.id] = {
    'x': 0,
    'y': 0,
    'size': 1,
    'cells': [],
    'xVel': 0,
    'yVel': 0
  }

  socket.on("disconnect", () => {
    //when this client disconnects, lets delete its position from the object.
    delete players[socket.id];
    console.log(`${socket.id} disconnected`);
  });

  //client can send a message 'updatePosition' each time the clients position changes
  socket.on("updateObject", (data) => {
    players[socket.id] = data;
  });
});

//send positions every framerate to each client
const frameRate = 1;
setInterval(() => {
  io.emit("players", players);
}, 1000 / frameRate);