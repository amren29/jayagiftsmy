const fs = require('fs');
const path = require('path');

// Read the current products data
const productsPath = path.join(__dirname, 'src/data/products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Clean up the products data to ensure all specifications are strings
const cleanedProducts = products.map(product => {
  const cleanedSpecs = {};
  
  // Ensure all specification values are strings
  for (const [key, value] of Object.entries(product.specifications || {})) {
    if (value !== undefined && value !== null) {
      cleanedSpecs[key] = String(value);
    }
  }
  
  return {
    ...product,
    specifications: cleanedSpecs
  };
});

// Write the cleaned data back
fs.writeFileSync(productsPath, JSON.stringify(cleanedProducts, null, 2));
console.log('Products data cleaned successfully!');