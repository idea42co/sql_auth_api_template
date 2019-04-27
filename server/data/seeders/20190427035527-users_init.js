const uuid = require('uuid/v1');

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: uuid(),
      userName: 'swagger',
      passwordHash: '0447c783c9e903a0b8c60a93665e6f5c9159dd1f4e2d2ad0456df83eab7fbd2c',
      createdAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', { userName: 'swagger' }, {});
  }
};
