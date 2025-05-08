-- Customer Table
CREATE TABLE customers (
    id VARCHAR(255) PRIMARY KEY,      -- Customer ID (e.g., UUID or custom identifier)
    name VARCHAR(255) NOT NULL,       -- Customer name
    email VARCHAR(255) NOT NULL,      -- Customer email
    address TEXT NOT NULL,            -- Customer address
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Automatically set when inserted
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Automatically update when modified
);

-- Indexes for performance
CREATE INDEX idx_customers_name ON customers (name);
CREATE INDEX idx_customers_email ON customers (email);

-- Products Table
CREATE TABLE products (
    id VARCHAR(255) PRIMARY KEY,     -- Product ID (e.g., UUID or custom identifier)
    name VARCHAR(255) NOT NULL,      -- Product name
    category VARCHAR(255) NOT NULL,  -- Product category
    unitPrice DECIMAL(10, 2) NOT NULL,  -- Unit price of the product
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Automatically set when inserted
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Automatically update when modified
);

-- Indexes for performance
CREATE INDEX idx_products_name ON products (name);
CREATE INDEX idx_products_category ON products (category);
CREATE INDEX idx_products_unitPrice ON products (unitPrice);


-- Order Table
CREATE TABLE orders (
    orderId INT PRIMARY KEY,                    -- Order ID (primary key for orders)
    productId VARCHAR(255) NOT NULL,             -- Foreign key to products
    customerId VARCHAR(255) NOT NULL,            -- Foreign key to customers
    quantitySold INT NOT NULL,                   -- Quantity of product sold
    discount DECIMAL(5, 2) DEFAULT 0.0,          -- Discount applied to the order
    shippingCost DECIMAL(10, 2) DEFAULT 0.0,     -- Shipping cost for the order
    paymentMethod VARCHAR(50) NOT NULL,          -- Payment method used
    dateOfSale TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date of sale
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,  -- Foreign key constraint on productId
    FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE CASCADE -- Foreign key constraint on customerId
);

-- Indexes for performance
CREATE INDEX idx_orders_productId ON orders (productId);
CREATE INDEX idx_orders_customerId ON orders (customerId);
CREATE INDEX idx_orders_paymentMethod ON orders (paymentMethod);
CREATE INDEX idx_orders_dateOfSale ON orders (dateOfSale);
