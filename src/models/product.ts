import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Product extends Model {
  public id!: string;
  public name!: string;
  public category!: string;
  public unitPrice!: number;
}

Product.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'products', // Make sure this is 'products', if you're using that name
  }
);

export { Product };
