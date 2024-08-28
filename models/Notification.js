const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Student = require('./Student');

const Notification = sequelize.define('Notification', {
  notification_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  message: { type: DataTypes.TEXT, allowNull: false },
  read_status: { type: DataTypes.BOOLEAN, defaultValue: false },
  sent_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Notification.belongsTo(Student, { foreignKey: 'student_id' });

module.exports = Notification;
