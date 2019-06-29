const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { PORT } = require('./constants');
const connectDb = require('./db');

const users = require('./Rooter/users');
const login = require('./Rooter/login/index.js');
const projects = require('./Rooter/projects');


const app = express();
app.use(helmet());
app.use(bodyParser.json());

app.use('/users', users);
app.use('/login', login);
app.use('/projects', projects);
connectDb().then(async () => {
  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`)); // eslint-disable-line
}).catch((e) => {
  console.error(`db connection error: ${JSON.stringify(e)}`);
});
