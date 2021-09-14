import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Connect to Database
const uri = `mongodb+srv://AAUEInformatica:${process.env.DATABASE_PASSWORD}@noticias-posts.gs1oj.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(uri,{ useNewUrlParser: true}, () => {
  console.log("connected to db")
})

const authRoute = require('./routes/auh');

app.use('/api/user', authRoute);

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log("app is live")
})