const express = require('express');
const mongoose = require('mongoose');
const postRouter = require('./routes/post');
const dotenv = require('dotenv');
const cors = require('cors'); //middleware
const cloudinary  = require('cloudinary').v2;

dotenv.config();
const port = process.env.PORT;
const app = express();
const mongodbUri = process.env.MONGODB_URI;
console.log(mongodbUri)
mongoose.connect(mongodbUri);

app.use(cors()); 
app.use("/posts", postRouter)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.listen(port, () => console.log(`Server started listening on port ${port}`))
module.exports = app;