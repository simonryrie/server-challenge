const express = require("express");

const server = express();

server.get("/", (request, response) => {
  response.send(`<h1>Hello Express</h1>`);
});

server.get("/colour", (request, response) => {
  const hex = request.query.hex || "ffffff"; // default to white if hex is not present
  response.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { background-color: #${hex}; }
        </style>
      </head>
      <body>
        <h1>Colour: #${hex}</h1>
      </body>
    </html>
  `);
});

module.exports = server;
