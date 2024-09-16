// const { log } = require('console');
// // Change the port to 3000 to match your server configuration

// var app = require('express')();
// var http = require('http').createServer(app)
// var io = require('socket.io')(http)

// io.on('connection',(socket)=>
// {
//     console.log("User Online");
//     socket.on("canvas-data",(data)=>
//     {
//         socket.broadcast.emit('canvas-data',data)
//     })
    
// })
// var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;

// http.listen(server_port,() => 
// {
//     console.log("Started on :"+ server_port);
    
// })

const { log } = require('console');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log("User Online");
  socket.on("canvas-data", (data) => {
    socket.broadcast.emit('canvas-data', data);
  });
});

const server_port = process.env.YOUR_PORT || process.env.PORT || 3000;

http.listen(server_port, () => {
  console.log("Started on :" + server_port);
});
