const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({credential: true, origin: 'http://localhost:3000'}));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }); // may need useCreateIndex: true
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
});

const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
app.use('/posts', postsRouter);
app.use('/auth', authRouter);

app.use(cookieParser());


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});