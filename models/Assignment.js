const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Course = require('./Course');
const Student = require('./Student');

const Assignment = sequelize.define('Assignment', {
  assignment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  submission_date: { type: DataTypes.DATE, allowNull: false },
});

Assignment.belongsTo(Course, { foreignKey: 'course_id' });
Assignment.belongsTo(Student, { foreignKey: 'student_id' });

module.exports = Assignment;
