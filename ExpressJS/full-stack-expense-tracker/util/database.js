const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'developer', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
