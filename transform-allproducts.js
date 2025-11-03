const fs = require('fs');

// Read allproducts.json
const allProducts = JSON.parse(fs.readFileSync('./allproducts.json', 'utf8'));

// Category mapping based on product code prefixes
const categoryMapping = {
  'AM': 'bottles',
  'BP': 'bags',
  'CB': 'notebooks',
  'CE': 'accessories',
  'CR': 'accessories',
  'EC': 'electronic',
  'HL': 'accessories',
  'ID': 'lanyard-&-id',
  'JB': 'notebooks',
  'LD': 'lanyard-&-id',
  'LT': 'accessories',
  'MB': 'bags',
  'NW': 'notebooks',
  'PP': 'pens',
  'PR': 'pens',
  'PS': 'accessories',
  'SA': 'bags',
  'SB': 'bags',
  'TL': 'vacuum-flask',
  'TR': 'vacuum-flask',
  'UM': 'umbrella',
  'VF': 'vacuum-flask'
};

// Helper function to generate slug from product code
function generateSlug(code, material, size) {
  let parts = [code.toLowerCase()];
  if (material && material !== 'Not listed') {
    parts.push(material.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
  }
  return parts.join('-').replace(/-+/g, '-');
}

// Helper function to parse price (remove RM and convert to number)
function parsePrice(priceStr) {
  if (!priceStr || priceStr === 'Not listed') return 0;
  const match = priceStr.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

// Helper function to extract printing methods
function extractPrintingMethods(printingMethod) {
  if (!printingMethod || printingMethod === 'Not listed') {
    return ['Silkscreen', 'Pad Print', 'UV Print'];
  }

  const methods = [];
  const methodStr = printingMethod.toUpperCase();

  if (methodStr.includes('SILKSCREEN') || methodStr.includes('SIKSCREEN') || methodStr.includes('SIKACREEN')) {
    methods.push('Silkscreen');
  }
  if (methodStr.includes('PAD PRINT') || methodStr.includes('PAD PROT') || methodStr.includes('PAD PRINS')) {
    methods.push('Pad Print');
  }
  if (methodStr.includes('UV') || methodStr.includes('FULL COLOR')) {
    methods.push('UV Print');
  }
  if (methodStr.includes('ENGRAV')) {
    methods.push('Engraving');
  }
  if (methodStr.includes('EMBROID')) {
    methods.push('Embroidery');
  }

  // Default if no methods found
  if (methods.length === 0) {
    methods.push('Silkscreen', 'Pad Print');
  }

  return methods;
}

// Helper function to calculate MOQ pricing tiers (convert RM to SGD - multiply by 0.3)
function calculateMOQPricing(basePrice) {
  const priceInRM = parsePrice(basePrice);
  const priceInSGD = priceInRM * 0.3; // RM to SGD conversion

  return {
    tiers: [
      { minQuantity: 100, unitPrice: parseFloat((priceInSGD * 1.0).toFixed(2)) },
      { minQuantity: 300, unitPrice: parseFloat((priceInSGD * 0.92).toFixed(2)) },
      { minQuantity: 500, unitPrice: parseFloat((priceInSGD * 0.85).toFixed(2)) },
      { minQuantity: 700, unitPrice: parseFloat((priceInSGD * 0.79).toFixed(2)) },
      { minQuantity: 900, unitPrice: parseFloat((priceInSGD * 0.73).toFixed(2)) },
      { minQuantity: 1000, unitPrice: parseFloat((priceInSGD * 0.68).toFixed(2)) }
    ],
    minimumOrderQuantity: 100
  };
}

// Helper function to get printing pricing
function getPrintingPricing(methods) {
  const pricingMap = {
    'Silkscreen': 1.5,
    'Pad Print': 1.6,
    'UV Print': 5,
    'UV Sticker': 1.9,
    'Engraving': 3.5,
    'Embroidery': 4.0
  };

  return {
    tiers: methods.map(method => ({
      printMethod: method,
      pricePerUnit: pricingMap[method] || 2.0
    }))
  };
}

// Transform products
const transformedProducts = allProducts.map((product, index) => {
  const prefix = product.Code.substring(0, 2);
  const categoryId = categoryMapping[prefix] || 'accessories';
  const printingMethods = extractPrintingMethods(product['Printing Method']);
  const moqPricing = calculateMOQPricing(product.Price);
  const priceInSGD = moqPricing.tiers[0].unitPrice;

  return {
    id: product.Code,
    name: `${product.Code} - ${product.Material || 'Product'}`,
    slug: generateSlug(product.Code, product.Material, product['Dimension/Size']),
    description: `${product.Material || ''} ${product['Dimension/Size'] || ''}`.trim() || 'Corporate gift item',
    shortDescription: `${product.Material || 'Product'} - ${product['Dimension/Size'] || 'Standard size'}`,
    categoryId: categoryId,
    price: priceInSGD,
    currency: 'SGD',
    sku: product.Code,
    inStock: true,
    stockQuantity: 1000,
    featured: index < 10,
    bestseller: index < 20,
    newArrival: index < 15,
    rating: 4.5,
    reviewCount: 0,
    images: [`/images/${product.Code}.jpg`],
    variants: [
      {
        id: `${product.Code}-default`,
        name: 'Default',
        value: 'default',
        type: 'color',
        sku: product.Code,
        inStock: true,
        stockQuantity: 100,
        image: `/images/${product.Code}.jpg`
      }
    ],
    moqPricing: moqPricing,
    printingPricing: getPrintingPricing(printingMethods),
    specifications: {
      material: product.Material || 'Not specified',
      size: product['Dimension/Size'] || 'Not specified',
      weight: product.Weight || 'Not specified',
      printingArea: product['Max Printing Size for LOGO'] || 'Contact for details',
      printingType: product['Printing Method'] || 'Multiple methods available',
      packaging: product.Packaging !== 'Not listed' ? product.Packaging : 'Standard packaging'
    },
    tags: [
      categoryId,
      product.Material ? product.Material.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '',
      ...printingMethods.map(m => m.toLowerCase().replace(/\s+/g, '-'))
    ].filter(Boolean),
    metaTitle: `${product.Code} - ${product.Material || 'Corporate Gift'} | JayaGifts`,
    metaDescription: `${product.Material || 'Corporate gift'} ${product['Dimension/Size'] || ''} - Perfect for corporate gifting. ${printingMethods.join(', ')} available.`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
});

// Create the output structure
const output = {
  Product: transformedProducts
};

// Write to product.json
fs.writeFileSync('./src/data/product.json', JSON.stringify(output, null, 2));

console.log(`✓ Successfully transformed ${transformedProducts.length} products`);
console.log(`✓ Output written to src/data/product.json`);

// Generate statistics
const categoryStats = transformedProducts.reduce((acc, p) => {
  acc[p.categoryId] = (acc[p.categoryId] || 0) + 1;
  return acc;
}, {});

console.log('\nProducts per category:');
Object.entries(categoryStats).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`);
});
