const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Donation extends Model {}

  Donation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: { msg: "Value must be a number" },
          min: { args: [1], msg: "Donation value must be at least 1" },
        },
      },
      payment_method: {
        type: DataTypes.ENUM("QRIS", "TF"),
        allowNull: true,
        validate: {
          isIn: {
            args: [["QRIS", "TF"]],
            msg: "Payment method must be 'QRIS' or 'TF'",
          },
        },
      },
      bank: {
        type: DataTypes.ENUM("BNI", "BRI", "BCA", "Mandiri", "BSI"),
        allowNull: true, // Optional
        validate: {
          isIn: {
            args: [["BNI", "BRI", "BCA", "Mandiri", "BSI"]],
            msg: "Bank must be one of: BNI, BRI, BCA, Mandiri, BSI",
          },
        },
      },
      id_crowdfund: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "crowdfunds", // Reference to the 'crowdfunds' table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Reference to the 'users' table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "donations",
      modelName: "Donation",
      underscored: true,
      timestamps: true, // Automatically manage createdAt and updatedAt
      createdAt: "created_at", // Map 'createdAt' to 'created_at'
      updatedAt: "updated_at", // Map 'updatedAt' to 'updated_at'
    }
  );

  return Donation;
};
