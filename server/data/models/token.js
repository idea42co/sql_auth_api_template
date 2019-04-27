'use strict';
module.exports = (sequelize, DataTypes) => {
  const token = sequelize.define('token', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV1, primaryKey: true },
    token: DataTypes.STRING,
    issuedOn: DataTypes.DATE,
    expiresOn: DataTypes.DATE
  }, {
      timestamps: false
    });
  token.associate = function (models) {
    token.belongsTo(models.user)
  };
  return token;
};