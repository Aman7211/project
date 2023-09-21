const mongoose = require('mongoose');

require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.DatabaseUrl,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("Db connected Successfully")
    })
    .catch((error)=>{
        console.log("Db connection unsuccessfull");
        console.error(error);
        process.exit(1);
    })
}