const path = require('path');
const express=require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const userRoutes=require('./routes/user')
const User = require('./models/User');
const app=express();
var cors=require('cors')
app.use(bodyParser.json({ extended: false }));
app.use(cors());
app.use(userRoutes)


  sequelize
    .sync()
    .then(result => {
      console.log('result');
      app.listen(4000);
    })
    .catch(err => {
      console.log(err);
    });
  