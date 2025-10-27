const fs = require('fs');
const path = require('path');

// Read the raw product data
const rawData = JSON.parse(fs.readFileSync('./src/data/product-original-backup.json', 'utf8'));

// Helper function to create slug from product code and name
function createSlug(productCode, name) {
  return `${productCode.toLowerCase()}-${name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50)}`;
}

// Helper function to extract category ID from category name
function getCategoryId(categoryName) {
  const categoryMap = {
    'Bag': 'bags',
    'Notebook': 'notebooks',
    'Bottle': 'bottles',
    'Mug': 'mugs',
    'Pen': 'pens',
    'Tumbler': 'tumblers',
    'Eco-Friendly': 'eco-friendly',
    'Technology': 'technology',
    'Drinkware': 'drinkware',
    'Stationery': 'stationery'
  };
  return categoryMap[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-');
}

// Helper function to get tags from product data
function getTags(product) {
  const tags = [];

  // Add category as tag
  if (product.Category) tags.push(product.Category.toLowerCase());

  // Add material as tag
  if (product.Material && typeof product.Material === 'string') {
    const materials = product.Material.split(/[,\/]+/).map(m => m.trim().toLowerCase());
    tags.push(...materials);
  }

  // Add features as tags
  if (product['Function / Feature'] && typeof product['Function / Feature'] === 'string') {
    const features = product['Function / Feature'].toLowerCase();
    if (features.includes('eco')) tags.push('eco-friendly');
    if (features.includes('sustainable')) tags.push('sustainable');
    if (features.includes('branded')) tags.push('branded');
  }

  // Add printing types as tags
  if (product['Printing Type'] && typeof product['Printing Type'] === 'string') {
    const printingTypes = product['Printing Type'].split(/[,\/]+/).map(p => p.trim().toLowerCase());
    tags.push(...printingTypes);
  }

  return [...new Set(tags)]; // Remove duplicates
}

// Transform each product
const transformedProducts = rawData.Product.map((rawProduct, index) => {
  const productCode = rawProduct['Product Code'];
  const name = rawProduct.Name;
  const slug = createSlug(productCode, name);

  // Build MOQ pricing tiers
  const moqTiers = [];
  const priceKeys = [
    { key: 'Price for 100 - 299', minQty: 100 },
    { key: 'Price for 300 - 499', minQty: 300 },
    { key: 'Price for 500 - 699', minQty: 500 },
    { key: 'Price for 700 - 899', minQty: 700 },
    { key: 'Price for 900 - 999', minQty: 900 },
    { key: 'Price for 1000 above', minQty: 1000 }
  ];

  priceKeys.forEach(({ key, minQty }) => {
    if (rawProduct[key]) {
      moqTiers.push({
        minQuantity: minQty,
        unitPrice: rawProduct[key]
      });
    }
  });

  // Build printing pricing tiers
  const printingTiers = [];
  if (rawProduct['Printing Cost - Silkscreen']) {
    printingTiers.push({
      printMethod: 'Silkscreen',
      pricePerUnit: rawProduct['Printing Cost - Silkscreen']
    });
  }
  if (rawProduct['Printing Cost - Pad Print']) {
    printingTiers.push({
      printMethod: 'Pad Print',
      pricePerUnit: rawProduct['Printing Cost - Pad Print']
    });
  }
  if (rawProduct['Printing Cost - UV Print']) {
    printingTiers.push({
      printMethod: 'UV Print',
      pricePerUnit: rawProduct['Printing Cost - UV Print']
    });
  }
  if (rawProduct['Printing Cost - UV Sticker']) {
    printingTiers.push({
      printMethod: 'UV Sticker',
      pricePerUnit: rawProduct['Printing Cost - UV Sticker']
    });
  }
  if (rawProduct['Printing Cost - Engraving']) {
    printingTiers.push({
      printMethod: 'Engraving',
      pricePerUnit: rawProduct['Printing Cost - Engraving']
    });
  }

  const printingPricing = printingTiers.length > 0 ? { tiers: printingTiers } : undefined;

  // Build specifications
  const specifications = {
    material: rawProduct.Material,
    size: rawProduct['Size (cm)'],
    weight: rawProduct.Weight ? `${rawProduct.Weight}g` : undefined,
    printingArea: rawProduct['Printing Area (cm)'],
    printingType: rawProduct['Printing Type'],
    features: rawProduct['Function / Feature']
  };

  // Transform variants from our image mapping
  let transformedVariants = undefined;
  if (rawProduct.variants && rawProduct.variants.length > 0) {
    transformedVariants = rawProduct.variants.map((variant, vIndex) => ({
      id: `${productCode}-${variant.variant}`,
      name: variant.variant === 'default' ? 'Default' : `Variant ${variant.variant}`,
      value: variant.variant,
      type: 'color', // You can adjust this based on your needs
      sku: variant.variant === 'default' ? productCode : `${productCode}${variant.variant}`,
      inStock: true,
      stockQuantity: 100,
      image: variant.image
    }));
  }

  // Get color options
  const colorOptions = rawProduct['Colour Options'] && typeof rawProduct['Colour Options'] === 'string'
    ? rawProduct['Colour Options'].split(',').map(c => c.trim())
    : [];

  return {
    id: productCode,
    name: `${productCode} - ${name}`,
    slug: slug,
    description: `${name} - ${rawProduct.Material || ''} ${rawProduct['Size (cm)'] || ''}. ${rawProduct['Function / Feature'] || ''}`,
    shortDescription: `${name} made from ${rawProduct.Material || 'quality materials'}`,
    categoryId: getCategoryId(rawProduct.Category),
    price: moqTiers.length > 0 ? moqTiers[0].unitPrice : 0,
    originalPrice: undefined,
    currency: 'SGD',
    sku: productCode,
    inStock: true,
    stockQuantity: 1000,
    featured: index < 10, // Mark first 10 as featured
    bestseller: index < 5, // Mark first 5 as bestsellers
    newArrival: index < 8,
    rating: 4.5,
    reviewCount: 0,
    images: rawProduct['Image URL'] ? [rawProduct['Image URL']] : [],
    variants: transformedVariants,
    moqPricing: {
      tiers: moqTiers,
      minimumOrderQuantity: moqTiers.length > 0 ? moqTiers[0].minQuantity : 100
    },
    printingPricing: printingPricing,
    specifications: specifications,
    tags: getTags(rawProduct),
    seo: {
      title: `${name} - ${rawProduct.Category} | Corporate Gifts`,
      description: `Order ${name} in bulk. ${rawProduct.Material || ''} ${rawProduct['Size (cm)'] || ''}. Customizable with logo printing.`,
      keywords: [
        productCode,
        name.toLowerCase(),
        rawProduct.Category.toLowerCase(),
        ...(rawProduct.Material ? [rawProduct.Material.toLowerCase()] : [])
      ]
    },
    colorOptions: colorOptions
  };
});

// Write transformed data
const outputData = {
  Product: transformedProducts
};

fs.writeFileSync(
  './src/data/product-transformed.json',
  JSON.stringify(outputData, null, 2),
  'utf8'
);

console.log(`✓ Transformed ${transformedProducts.length} products`);
console.log('✓ Output written to: src/data/product-transformed.json');
console.log('\nNext steps:');
console.log('1. Review the transformed data in product-transformed.json');
console.log('2. If it looks good, rename it to product.json (backup the original first)');
console.log('3. Or update your imports to use product-transformed.json instead');
