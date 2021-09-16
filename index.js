const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();
const app = express();

app.use(cors(
  { 
      origin: ['https://www.aaue.pt', 'https://aaue.vercel.app', 'http://localhost:8080'],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ['Content-Type', 'auth-token'],
      optionsSuccessStatus: 200
  }));
  
app.options('*', cors())

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
app.use('/api', authenticateToken, postsRoute);

const PORT = process.env.PORT || 3000  ;

app.listen(PORT, () => {
  console.log("app is live")
})