const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT

const cors = require('cors')

require('./config/db/connectdb');

app.use(cors());
app.listen(port,()=>{
    console.log(`Connected to the Port ${port}`);
})