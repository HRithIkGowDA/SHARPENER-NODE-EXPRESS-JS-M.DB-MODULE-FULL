const { DataTypes } = require("sequelize");

const GroupUser = (sequelize) => {
  return sequelize.define("groupUser", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    admin: {
      type: DataTypes.BOOLEAN,
      default: 0,
    },
  });
};

module.exports = GroupUser;
