'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [{
         name: 'Admin',
         email: 'admin@gmail.com',
         phoneNumber: '0323032432',
         password: '$2a$10$AAOFpiMxJJZdUITQznp/x.Q1SVCUoeGbF2Z3d9OwcKJ8fzZEQdCT2', // admin1
         role: 'admin' ,
         status: 'active',
         createdAt: new Date(),
         updatedAt: new Date()
        }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
