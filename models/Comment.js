const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comment = sequelize.define(
  'Comment',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_crowdfund: {
      type: DataTypes.INTEGER,
      references: {
        model: 'crowdfunds', // Adjust this to your actual crowdfund table name
        key: 'id',
      },
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },
  },
  {
    tableName: 'comments', // Name of the table in the database
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    underscored: true, // Use snake_case for column names
  }
);

module.exports = Comment;