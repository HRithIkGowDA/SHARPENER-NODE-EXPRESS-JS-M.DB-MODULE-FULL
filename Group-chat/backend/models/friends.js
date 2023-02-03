const { DataTypes } = require("sequelize");

const Friend = (sequelize) => {
  return sequelize.define("friend", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    toUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

module.exports = Friend;
