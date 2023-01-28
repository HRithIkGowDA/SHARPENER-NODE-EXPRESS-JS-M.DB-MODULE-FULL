const http = require('http')
const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const contactRoutes = require('./routes/contact')
const rootDir = require('./utils/path')



const app =express()

app.use(bodyParser.urlencoded({extended : false}))

app.use(express.static(path.join(__dirname , 'public')))

app.use('/admin',adminRoutes)

app.use(shopRoutes)
app.use(contactRoutes)

app.use((req , res , next)=>{
  res.sendFile(path.join(rootDir ,'views', 'pageNotFound.html'))
 // res.send('<h1>Page Not Found</h1>')
})



app.listen(3000)