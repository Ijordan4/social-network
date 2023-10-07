const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const apiRoutes = require('./routes/api');
const PORT = process.env.PORT || 3001;

const app = express();

mongoose.connect('mongodb://localhost:27017/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('Connected successfully to MongoDB');


  app.use('/api', apiRoutes);


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('MongoDB connection error: ', err.message);
});