// Using MongoDB ATLAS
const mongoose = require('mongoose');
const DB = process.env.DBN;

mongoose.set('strictQuery', false);
mongoose.connect(DB).then(()=>{
    console.log("Connection Successful");
}).catch((err)=>{
    console.log("Connection Failed");
})