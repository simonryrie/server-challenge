const express = require("express");

const server = express();

server.use(express.urlencoded({ extended: true }));

const cheeseRatings = []; // array to store cheese ratings

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

server.get("/cheese", (request, response) => {
  const cheeseList = cheeseRatings
    .map((cheese) => {
      const { name, rating } = cheese;
      return `<li>${name}: ${rating}</li>`;
    })
    .join("");
  response.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Cheese Ratings</title>
        </head>
        <body>
          <h1>Cheese Ratings</h1>
          <h2>Add New Cheese Rating</h2>
          <form method="POST" action="/cheese">
            <label for="name">Cheese Name:</label>
            <input type="text" id="name" name="name" required><br><br>
            <label for="rating">Cheese Rating:</label>
            <input type="range" id="rating" name="rating" min="0" max="5" step="1" value="0"><br><br>
            <button type="submit">Submit</button>
          </form>
          <h2>Cheese Ratings:</h2>
          <ul>
            ${cheeseList}
          </ul>
        </body>
      </html>
    `);
});

server.post("/cheese", (request, response) => {
  const { name, rating } = request.body;
  cheeseRatings.push({ name, rating: parseInt(rating) });
  response.redirect("/cheese");
});

module.exports = server;
