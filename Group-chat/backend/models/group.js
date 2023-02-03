const { DataTypes } = require("sequelize");

const Group = (sequelize) => {
  return sequelize.define("group", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    creator: {
      type: DataTypes.INTEGER,
    },
  });
};

module.exports = Group;
