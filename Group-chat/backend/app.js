// General Imports
const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const dotenv = require("dotenv");

// DOTENV CONFIG
dotenv.config();

// Application Module Import
const sequelize = require("./utils/database");

const app = express();

// All Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//      Registering Routers
const routers = [
  require("./routers/userRouter"),
  require("./routers/messageRouter"),
  require("./routers/friendsRouter"),
  require("./routers/groupRouter"),
];

for (const router of routers) {
  app.use(router);
}

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Listening on 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
