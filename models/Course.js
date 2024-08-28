const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Instructor = require('./Instructor');
const Category = require('./Category');

const Course = sequelize.define('Course', {
  course_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
  rating: { type: DataTypes.DECIMAL(3, 2) },
});

Course.belongsTo(Instructor, { foreignKey: 'instructor_id' });
Course.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Course;
