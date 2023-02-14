const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const cors = require('cors')
require('./config/db/connectdb');
const userRoutes = require('./routes/userRoutes')

const app = express();
const port = process.env.PORT


// JSON
app.use(express.json())

// Load Routes
app.use("/api/user",userRoutes)

app.use(cors());
app.listen(port,()=>{
    console.log(`Connected to the Port ${port}`);
})