const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const port = process.env.PORT;

const app = express();

app.listen(port, () => {
  console.log(`Server started at port ${port}.`);
});
