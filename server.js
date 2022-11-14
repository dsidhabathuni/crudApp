const express = require('express');
//allows user to share source code but they can add own env variables
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path'); //inbuilt in node apps
const exp = require('constants');

const connectDB = require('./server/database/connection')

const app = express();

//use env port
dotenv.config({ path:'config.env' })
const PORT = process.env.PORT || 8080

//log requests on console
app.use(morgan('tiny'));

//mongoDb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }))

//set view engine as ejs/html/pug
app.set('view engine','ejs')
// app.set('views',path.resolve(__dirname,'views/ejs'))

//load assets,js,img
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))

//load routers
app.use('/',require('./server/routes/router'))

app.listen(8000,() => { console.log(`server is running on http://localhost:${PORT}`)})