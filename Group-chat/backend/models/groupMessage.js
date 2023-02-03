const { DataTypes } = require("sequelize");

const GroupMessage = (sequelize) => {
  return sequelize.define("groupMessage", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.TEXT,
    },
  });
};

module.exports = GroupMessage;
