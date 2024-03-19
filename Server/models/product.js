'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : "Price is required"
        },
        notNull: {
          msg : "Price is required"
        },
      }
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : "Image is required"
        },
        notNull: {
          msg : "Image is required"
        },
      }
    },
    status : {
      type: DataTypes.ENUM,
      values: ['active', 'inactive'],
      defaultValue: 'active'
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};