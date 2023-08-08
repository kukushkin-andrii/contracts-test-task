const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const services = require('./services');
const app = express();
app.use(bodyParser.json());
app.set('services', services(sequelize, sequelize.models));

require('./router')(app);

module.exports = app;
