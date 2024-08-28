const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Coupon = sequelize.define('Coupon', {
  coupon_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  code: { type: DataTypes.STRING, unique: true, allowNull: false },
  discount_percentage: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
  expiration_date: { type: DataTypes.DATE, allowNull: false },
});

module.exports = Coupon;
