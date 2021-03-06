'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV1, primaryKey: true },
    userName: DataTypes.STRING,
    passwordHash: DataTypes.STRING
  }, {});
  user.associate = function (models) {
    console.log(models)
    user.hasMany(models.token)
  };
  return user;
};