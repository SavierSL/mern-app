const express = require("express"); // to manipulate web server
const mongoose = require("mongoose"); // to have a control in the database

const app = express();

app.get("/", (req, res) => {
  res.send("Connected in port");
});

//We need to add the port and listen to it so it can connect to the URL PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port:${PORT}`));
