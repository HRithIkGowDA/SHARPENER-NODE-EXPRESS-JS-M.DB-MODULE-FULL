const { DataTypes } = require("sequelize");

const Message = (sequelize) => {
  return sequelize.define("message", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.TEXT,
    },
    toUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

module.exports = Message;
