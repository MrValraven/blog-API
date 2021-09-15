const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// Middleware
const authenticateToken = require('./validation/verifyToken');
app.use(express.json());

// Connect to Database
const uri = `mongodb+srv://AAUEInformatica:${process.env.DATABASE_PASSWORD}@noticias-posts.gs1oj.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(uri,{ useNewUrlParser: true}, () => {
  console.log("connected to db")
})

const authRoute = require('./routes/auth');
app.use('/api/user', authRoute);

const postsRoute = require('./routes/posts');
app.use('/api', postsRoute);

app.get('/', (req, res) => {
  res.send("Hello");
})

const PORT = process.env.PORT || 3000  ;

app.listen(PORT, () => {
  console.log("app is live")
})