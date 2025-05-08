import { Product } from './product';
import Customer from './customer';
import Order from './order';

// Define associations
Product.hasMany(Order, {
    foreignKey: 'productId',
    as: 'orders',
});
Order.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product',
});

Customer.hasMany(Order, {
    foreignKey: 'customerId',
    as: 'orders',
});
Order.belongsTo(Customer, {
    foreignKey: 'customerId',
    as: 'customer',
});

export { Product, Customer, Order };
