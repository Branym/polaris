const express = require('express')
const app = express()
require('dotenv').config()

//requiring  basic middlewares
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const session = require("express-session")
const MongoStore = require("connect-mongo")(session);
const path = require("path");
const morgan = require('morgan')
const extensions = require('./routes')
const { uploadToS3 } = require('./helpers/uploadMedia');


//database
const {connectionDB} = require('./config/db');
const { verifyPayment } = require('./helpers/stripe');
connectionDB()

app.post('/upload', uploadToS3);


app.use(cookieParser())
app.use(cors());
app.use(morgan('dev'))

app.use('/images', express.static('uploads'))

app.use('/template', express.static('pages'))

app.post('/webhook', express.raw({type: '*/*'}), verifyPayment)

//bodyparser
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))


// Express Session
app.use(
    session({
      secret: "secret-key",
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60
      }),
      cookie: {
        maxAge: 24 * 60 * 60 * 1000
      }
    })
  );

  

//extensions
app.use(extensions)

//exporting the file 
module.exports = app 
