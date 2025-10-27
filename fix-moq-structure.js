const fs = require('fs');
const path = require('path');

// Read the products data
const productsPath = path.join(__dirname, 'src/data/products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Update MOQ pricing structure
const updatedProducts = products.map(product => {
  if (product.moqPricing && Array.isArray(product.moqPricing)) {
    // Convert array to object with tiers property
    const tiers = product.moqPricing.map(tier => ({
      minQuantity: tier.quantity,
      unitPrice: tier.price
    }));
    
    product.moqPricing = {
      tiers: tiers
    };
  }
  
  return product;
});

// Write the updated data back
fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2));

console.log('MOQ pricing structure updated successfully!');
console.log(`Updated ${updatedProducts.length} products`);