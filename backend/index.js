const express = require('express');
const app = express()

//  import data from .env file

require('dotenv').config();
const PORT = process.env.PORT || 4000;

// cors setting allowing the frontend to access the backend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
//  body parser

app.use(express.json());
const fileupload = require('express-fileupload');
app.use(fileupload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
}
));


// import the database and call the connect function with which we can connect the mongodb server

require('./Config/database').connect();

//routes import and mount

const user = require('./Routes/user');
app.use("/api", user);

//cloud se connect krna h 
const cloudinary = require("./Config/Cloudinary");
cloudinary.cloudinaryConnect();

// api route mount krna h 
const Upload= require('./Routes/FileUpload');
app.use('/api/v1/upload', Upload);

//listen the port

app.listen((PORT), () => {
    console.log(`App is started at Port ${PORT}`)
})