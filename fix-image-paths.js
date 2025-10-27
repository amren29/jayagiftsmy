const fs = require('fs');

// Read product.json
const productData = JSON.parse(fs.readFileSync('./src/data/product.json', 'utf8'));

// Fix image paths - remove 'public/' prefix
productData.Product = productData.Product.map(product => {
  // Fix main images array
  if (product.images && Array.isArray(product.images)) {
    product.images = product.images.map(img => 
      img.startsWith('public/') ? img.replace('public/', '/') : img
    );
  }

  // Fix variants
  if (product.variants && Array.isArray(product.variants)) {
    product.variants = product.variants.map(variant => ({
      ...variant,
      image: variant.image && variant.image.startsWith('public/') 
        ? variant.image.replace('public/', '/') 
        : variant.image
    }));
  }

  return product;
});

// Write back
fs.writeFileSync('./src/data/product.json', JSON.stringify(productData, null, 2), 'utf8');

console.log('✓ Fixed image paths in product.json');
console.log('✓ Changed "public/images/..." to "/images/..."');
