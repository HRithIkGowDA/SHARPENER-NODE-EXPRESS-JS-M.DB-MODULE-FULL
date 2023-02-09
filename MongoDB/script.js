
const path = require('path');
const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config();
const mongoose = require('mongoose')
const cors = require('cors');
// const Expense = require("./models/expense");
// const User = require("./models/user");
// const Order = require("./models/order");
// const Forgotpassword = require('./models/forgotpassword')
const bodyParser = require('body-parser');

app.use(bodyParser.json({ extended: false}));


app.use(cors());

const loginRoutes = require('./routes/login')
 const expenseRoutes = require('./routes/expense')
 const purchaseRoutes = require('./routes/purchase')
 const premiumRoutes = require('./routes/premium');
 const forgotpasswordRoutes = require('./routes/forgotpassword')
// const DownloadRoutes = require('./routes/download')
 app.use(loginRoutes);
 app.use(expenseRoutes);
 app.use(purchaseRoutes);
 app.use(premiumRoutes);
 app.use(forgotpasswordRoutes);
// app.use(DownloadRoutes)

app.use((req,res)=>{
    let link = req.url;
    res.sendFile(path.join(__dirname,`/views/${link.split('?')[0]}`))
})


mongoose.connect('mongodb+srv://viru:sharpener@cluster0.ve9jzpz.mongodb.net/?retryWrites=true&w=majority').then((result)=>{
app.listen(3000)
}).catch((err)=>{
  console.log(err);
})