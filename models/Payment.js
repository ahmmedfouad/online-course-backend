const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Course = require('./Course');
const Student = require('./Student');

const Payment = sequelize.define('Payment', {
  payment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  payment_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  payment_method: { type: DataTypes.ENUM('credit_card', 'paypal', 'bank_transfer'), allowNull: false },
});

Payment.belongsTo(Course, { foreignKey: 'course_id' });
Payment.belongsTo(Student, { foreignKey: 'student_id' });

module.exports = Payment;
