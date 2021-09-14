const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');


// Middleware
app.use(express.json());
/* app.use(express.urlencoded()); */

dotenv.config();
const PORT = 3000 || process.env.PORT;
const uri = `mongodb+srv://AAUEInformatica:${process.env.DATABASE_PASSWORD}@noticias-posts.gs1oj.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(uri,{ useNewUrlParser: true}, () => {
  console.log("connected to db")
})

const authRoute = require('./routes/auth');

app.use('/api/user', authRoute);

app.listen(PORT, () => {
  console.log("app is live")
})