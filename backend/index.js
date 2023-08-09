require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 5500;

const server = express();
server.use(cors());
server.use(express.json());

server.use("/api/users", require("./routes/usersRoutes"));
server.use("/api/business", require("./routes/businessRoutes"));
server.use("/api/creditcard", require("./routes/creditCardsRoutes"));
server.use("/api/admin", require("./routes/adminRoutes"));

server.get("/", function (req, res) {
  const ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  res.send(ipAddress);
});

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
