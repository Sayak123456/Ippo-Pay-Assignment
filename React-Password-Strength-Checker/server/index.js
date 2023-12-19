require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const passwordRoute = require('./route/password');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', passwordRoute);

const URI = process.env.MONGODB_URI
try{
    mongoose.connect(URI);
    console.log('Connected to MongoDB!')
} catch (err) {
    console.error(err);
}

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Server is running on port', port)
});