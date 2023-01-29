const Sequelize = require('sequelize');

const sequelize = new Sequelize('relationship', 'root', 'developer', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
