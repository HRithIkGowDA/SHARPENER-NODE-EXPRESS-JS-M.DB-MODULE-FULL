const http = require("http");
const fs = require('fs')
const express = require("express");
const bodyParser = require("body-parser");
const loginRoutes = require('./routes/login')
const messageRoutes = require('./routes/message')

const app = express();
let message 
app.use(bodyParser.urlencoded({ extended: false }));


app.use(loginRoutes)

app.use(messageRoutes)

app.use((req, res, next) => {
  res.send("<h1>Page Not Found</h1>");
});

app.listen(5000);

module.exports = message