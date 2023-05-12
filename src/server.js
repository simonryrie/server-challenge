const express = require("express");

const server = express();

server.get("/", (request, response) => {
  response.send(`<h1>Hello Express</h1>`);
});

server.get("/colour", (request, response) => {
  let hex = request.query.hex || "ffffff"; // default to white if hex is not present
  response.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { background-color: ${hex}; }
        </style>
      </head>
      <body>
        <h1>Colour: ${hex}</h1>    
        <form method="get" action="/colour">
            <label for="color-input">Enter a hex color code:</label>
            <input type="text" id="color-input" name="hex" pattern="#[0-9a-fA-F]{6}" required>
            <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
});

module.exports = server;
