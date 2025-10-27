const fs = require('fs');

// Read products
const productData = JSON.parse(fs.readFileSync('./src/data/product.json', 'utf8'));

// Count products by category
const categoryMap = new Map();
productData.Product.forEach(product => {
  const catId = product.categoryId;
  if (!categoryMap.has(catId)) {
    categoryMap.set(catId, 0);
  }
  categoryMap.set(catId, categoryMap.get(catId) + 1);
});

// Create category data
const categories = [
  { id: 'bags', name: 'Bags', slug: 'bags', description: 'Corporate bags including tote bags, backpacks, and messenger bags', icon: '👜' },
  { id: 'notebooks', name: 'Notebooks', slug: 'notebooks', description: 'Professional notebooks and journals for corporate gifting', icon: '📓' },
  { id: 'pens', name: 'Pens', slug: 'pens', description: 'Quality pens and writing instruments', icon: '✒️' },
  { id: 'lanyard-&-id', name: 'Lanyard & ID', slug: 'lanyard-id', description: 'Lanyards and ID holders for events and corporate use', icon: '🎫' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories', description: 'Corporate accessories and gift items', icon: '🎁' },
  { id: 'electronic', name: 'Electronic', slug: 'electronic', description: 'Tech gadgets and electronic corporate gifts', icon: '📱' },
  { id: 'umbrella', name: 'Umbrella', slug: 'umbrella', description: 'Corporate umbrellas for promotional use', icon: '☂️' },
  { id: 'vacuum-flask', name: 'Vacuum Flask', slug: 'vacuum-flask', description: 'Insulated vacuum flasks and tumblers', icon: '🧉' },
  { id: 'bottles', name: 'Bottles', slug: 'bottles', description: 'Water bottles and drinkware', icon: '🍶' }
].map(cat => ({
  ...cat,
  productCount: categoryMap.get(cat.id) || 0
})).filter(cat => cat.productCount > 0);

// Write categories.json
fs.writeFileSync('./src/data/categories.json', JSON.stringify(categories, null, 2), 'utf8');

console.log('✓ Generated categories.json with', categories.length, 'categories');
categories.forEach(cat => {
  console.log(`  - ${cat.name}: ${cat.productCount} products`);
});
