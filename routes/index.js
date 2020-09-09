const express = require('express');

const locationRoutes = require('./location');
const weatherRoutes = require('./weather');

module.exports = (app) => {
  app.use(express.json());

  app.use('', locationRoutes);
  app.use('', weatherRoutes);
};
