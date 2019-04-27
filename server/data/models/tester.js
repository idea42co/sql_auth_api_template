'use strict';
module.exports = (sequelize, DataTypes) => {
  const tester = sequelize.define('tester', {
    testId: DataTypes.STRING
  }, {});
  tester.associate = function(models) {
    // associations can be defined here
  };
  return tester;
};