const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const port = process.env.PORT;
const MongoDB = require('./database/db');
const {errorHandler} = require('./middleware/errorMiddleware')

const app = express();
MongoDB();

app.use(express.urlencoded({extended: false}))
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server started at port ${port}.`);
});
