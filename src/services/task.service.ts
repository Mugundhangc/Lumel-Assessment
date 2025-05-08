import fs from 'fs';
import csv from 'csv-parser';
import { Customer, Order, Product } from '../models';
import logger from '../utils/logger';

export const uploadCSVAndSaveOrders = async (filePath: string): Promise<string> => {
  const results: any[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', async () => {
        try {
          // Extract unique products and customers
          const productIds = [...new Set(results.map(row => row['Product ID']))];
          const customerIds = [...new Set(results.map(row => row['Customer ID']))];

          console.log('productsids', results);

          // Helper function to clean and parse unit price
          const parseUnitPrice = (price: string): number => {
            // Remove non-numeric characters except for decimal points
            const cleanedPrice = price.replace(/[^\d.-]/g, '');
            return parseFloat(cleanedPrice);
          };

          // Bulk find or create products
          const products = await Product.bulkCreate(
            productIds.map(id => ({
              id,
              name: results.find(row => row['Product ID'] === id)['Product Name'],
              category: results.find(row => row['Product ID'] === id)['Category'],
              unitPrice: parseUnitPrice(results.find(row => row['Product ID'] === id)['Unit Price']),
            })),
            { ignoreDuplicates: true, returning: true }
          );

          // Bulk find or create customers
          const customers = await Customer.bulkCreate(
            customerIds.map(id => ({
              id,
              name: results.find(row => row['Customer ID'] === id)['Customer Name'],
              email: results.find(row => row['Customer ID'] === id)['Customer Email'],
              address: results.find(row => row['Customer ID'] === id)['Customer Address'],
            })),
            { ignoreDuplicates: true, returning: true }
          );

          // Create lookup for IDs (ensure the map values are strings)
          const productMap = products.reduce((acc: { [x: string]: any; }, product: { id: string | number; }) => {
            acc[product.id] = product.id;
            return acc;
          }, {} as Record<string, string>);  // product.id should be string

          const customerMap = customers.reduce((acc, customer) => {
            acc[customer.id] = customer.id;
            return acc;
          }, {} as Record<string, string>);  // customer.id should be string

          // Map orders for bulk create
          const ordersToInsert = results.map(row => ({
            orderId: row['Order ID'],
            productId: productMap[row['Product ID']],  // Ensure productId is a string
            customerId: customerMap[row['Customer ID']],  // Ensure customerId is a string
            quantitySold: parseInt(row['Quantity Sold'], 10),  // Ensure quantity is an integer
            discount: parseFloat(row['Discount']),  // Ensure discount is a number
            shippingCost: parseFloat(row['Shipping Cost']),  // Ensure shipping cost is a number
            paymentMethod: row['Payment Method'],
            dateOfSale: new Date(row['Date of Sale']),  // Ensure date is a Date object
          }));

          // Bulk create all orders
          await Order.bulkCreate(ordersToInsert, { ignoreDuplicates: true });
          logger.info('Orders uploaded successfully in bulk');
          resolve('Upload and insert successful');
        } catch (err) {
          logger.error('Bulk insert failed', err);
          reject('Upload failed');
        }
      })
      .on('error', (err) => {
        logger.error('CSV upload failed', err);
        reject('Upload failed');
      });
  });
};

export const refreshProductData = async (): Promise<string> => {
  try {
    // First, clear all product records from the database
    const deletedCount = await Product.destroy({ where: {} });

    if (deletedCount === 0) {
      logger.info('No product data found to clear.');
    } else {
      logger.info(`Cleared ${deletedCount} product records.`);
    }

    logger.info('Product data refresh successful');
    return 'Product data refresh successful';
  } catch (err: any) {
    // Log the error with more detailed information
    logger.error('Product data refresh failed', { error: err });

    // If it's a known error type, you can throw a more specific error
    throw new Error('Product data refresh failed: ' + err.message);
  }
};
