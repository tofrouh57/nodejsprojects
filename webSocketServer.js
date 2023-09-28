const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ port: 4040 });

wss.on('connection', function connection(ws) {
  console.log('new connection ');

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    ws.send('you have sent : ' + data);

    var fs = require('fs'),
      binary = fs.readFileSync('./binfile.txt');
    ws.send(binary);




  });

  //  ws.send('something');
});













/*const http = require('http');
const url = require('url');
const wsServer = require('ws').Server;

const HTTP_PORT = 8080;
const WS_PORT = 4040;

const ws = new wsServer({ port: WS_PORT }, function() {
    console.log("WS Server listening on: ws://localhost:%s", WS_PORT);
});

ws.on('connection', function connection(ws) {
    console.log('new client connected');
    ws.client.send('welcome');
    console.log("send ,sg");
//    ws.client.send()
});


function broadcast(msg) {
    ws.clients.forEach(function each(client) {
        client.send(msg);

    });
};*/