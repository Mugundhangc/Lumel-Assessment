import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Customer extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public address?: string;
}

Customer.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Customer',
    tableName: 'customers',
    timestamps: false,
  }
);

export default Customer;
