const path=require('path');
const express=require('express');
const bodyparser=require('body-parser');
const sequelize=require('./util/database');
const User=require('./models/User')
const userRoutes=require('./routes/user')
var cors=require('cors')
const app=express();
app.use(bodyparser.json({extended:false}))
app.use(cors());
app.use('/user',userRoutes)

  sequelize
  .sync()
  .then(result => {
    console.log('result');
    app.listen(3500);
  })
  .catch(err => {
    console.log(err);
  });
