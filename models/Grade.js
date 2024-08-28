const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Assignment = require('./Assignment');

const Grade = sequelize.define('Grade', {
  grade_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  score: { type: DataTypes.INTEGER, allowNull: false },
});

Grade.belongsTo(Assignment, { foreignKey: 'assignment_id' });

module.exports = Grade;
