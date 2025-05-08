import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Order extends Model {
    public orderId!: string;
    public productId!: string;
    public customerId!: string;
    public quantitySold!: number;
    public discount!: number;
    public shippingCost!: number;
    public paymentMethod!: string;
    public dateOfSale!: Date;
}

Order.init(
    {
        orderId: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        quantitySold: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        discount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        shippingCost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateOfSale: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
        timestamps: false,
    }
);

export default Order;
