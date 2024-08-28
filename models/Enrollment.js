const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Course = require('./Course');
const Student = require('./Student');

const Enrollment = sequelize.define('Enrollment', {
  enrollment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  enrollment_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Enrollment.belongsTo(Course, { foreignKey: 'course_id' });
Enrollment.belongsTo(Student, { foreignKey: 'student_id' });

module.exports = Enrollment;
