const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Course = require('./Course');
const Student = require('./Student');

const Review = sequelize.define('Review', {
  review_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rating: { type: DataTypes.DECIMAL(3, 2), allowNull: false },
  comment: { type: DataTypes.TEXT },
});

Review.belongsTo(Course, { foreignKey: 'course_id' });
Review.belongsTo(Student, { foreignKey: 'student_id' });

module.exports = Review;
