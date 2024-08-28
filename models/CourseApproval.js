const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Course = require('./Course');
const Team = require('./Team');

const CourseApproval = sequelize.define('CourseApproval', {
  approval_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
  approval_date: { type: DataTypes.DATE },
  comments: { type: DataTypes.TEXT },
});

CourseApproval.belongsTo(Course, { foreignKey: 'course_id' });
CourseApproval.belongsTo(Team, { foreignKey: 'team_id' });

module.exports = CourseApproval;
