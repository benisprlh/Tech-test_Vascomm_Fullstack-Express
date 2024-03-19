'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : "Name is required"
        },
        notNull: {
          msg : "Name is required"
        },
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : "Phone Number is required"
        },
        notNull: {
          msg : "Phone Number is required"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg : "Email is required"
        },
        notNull: {
          msg : "Email is required"
        },
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : "Password is required"
        },
        notNull: {
          msg : "Password is required"
        },
      }
    },
    status : {
      type: DataTypes.ENUM,
      values: ['active', 'inactive'],
      defaultValue: 'active'
    },
    role : {
      type: DataTypes.ENUM,
      values: ['admin', 'user'],
      defaultValue: 'user'
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance) => {
    instance.password = hashPassword(instance.password);
  });

  return User;
};