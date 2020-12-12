const express = require("express"); // to manipulate web server
const connectDB = require("./config/db");
const app = express();

connectDB(); // connect database
app.get("/", (req, res) => {
  res.send("Connected in port");
});

//Init Middleware
app.use(express.json({ extended: false }));

//Defines Routes
app.use("/api/users", require("./routes/api/users")); // the params is: /api/users
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/post", require("./routes/api/post"));
app.use("/api/profile", require("./routes/api/profile"));

//We need to add the port and listen to it so it can connect to the URL PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port:${PORT}`));
