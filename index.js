const PORT = 3000;
const express = require("express");
const volleyball = require("volleyball");
const server = express();
const apiRouter = require("./api");
const bodyParser = require("body-parser");
const { client } = require("./db");
require("dotenv").config();

client.connect();
server.use(volleyball);
server.use(bodyParser.json());
server.use("/api", apiRouter);

server.get("/add/:first/to/:second", (req, res, next) => {
  res.send(
    `<h1>${req.params.first} + ${req.params.second} = ${
      Number(req.params.first) + Number(req.params.second)
    }</h1>`
  );
});

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
