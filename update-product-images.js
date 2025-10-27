const fs = require('fs');
const path = require('path');

// Paths
const productJsonPath = './src/data/product.json';
const imagesDir = './public/images';
const placeholderPath = '/images/placeholder.jpg';

// Read product.json
console.log('Reading product.json...');
const productData = JSON.parse(fs.readFileSync(productJsonPath, 'utf8'));

// Function to extract base code and variant from product code
function parseProductCode(productCode) {
  // For codes like NB47, SL09, etc. (4 chars) - base is the full code
  // For codes with variants like NB471, NB472 - base is first 4, variant is remaining
  const baseCode = productCode.substring(0, 4);
  const variantCode = productCode.length > 4 ? productCode.substring(4) : null;

  return { baseCode, variantCode };
}

// Function to get folder path for a product
function getImageFolder(baseCode) {
  // Folder structure: public/images/{first2Letters}{first2Digits}/
  // e.g., NB47 -> public/images/NB47/
  return path.join(imagesDir, baseCode);
}

// Function to scan for images in a folder
function scanImagesInFolder(folderPath, baseCode) {
  if (!fs.existsSync(folderPath)) {
    return null;
  }

  try {
    const files = fs.readdirSync(folderPath);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      const name = path.basename(file, ext);
      return (ext === '.jpg' || ext === '.png' || ext === '.jpeg') &&
             name.toUpperCase().startsWith(baseCode.toUpperCase());
    });

    return imageFiles.map(file => {
      const name = path.basename(file, path.extname(file));
      const variant = name.length > 4 ? name.substring(4) : 'default';
      return {
        variant: variant,
        image: `/images/${baseCode}/${file}`
      };
    }).sort((a, b) => {
      // Sort by variant number
      const aNum = parseInt(a.variant) || 0;
      const bNum = parseInt(b.variant) || 0;
      return aNum - bNum;
    });
  } catch (error) {
    console.error(`Error reading folder ${folderPath}:`, error.message);
    return null;
  }
}

// Process each product
console.log(`Processing ${productData.Product.length} products...`);
let productsWithImages = 0;
let productsWithPlaceholder = 0;

productData.Product.forEach((product, index) => {
  const productCode = product['Product Code'];
  const { baseCode } = parseProductCode(productCode);

  const folderPath = getImageFolder(baseCode);
  const variants = scanImagesInFolder(folderPath, baseCode);

  if (variants && variants.length > 0) {
    // Found actual images
    product.variants = variants;
    product['Image URL'] = variants[0].image; // Set first image as default
    productsWithImages++;
    console.log(`✓ ${productCode}: Found ${variants.length} variant(s)`);
  } else {
    // No images found, use placeholder
    product.variants = [{
      variant: 'default',
      image: placeholderPath
    }];
    product['Image URL'] = placeholderPath;
    productsWithPlaceholder++;
  }
});

console.log('\n=== Summary ===');
console.log(`Products with images: ${productsWithImages}`);
console.log(`Products with placeholder: ${productsWithPlaceholder}`);
console.log(`Total products: ${productData.Product.length}`);

// Write updated product.json
console.log('\nWriting updated product.json...');
fs.writeFileSync(productJsonPath, JSON.stringify(productData, null, 1), 'utf8');
console.log('✓ Done! Product.json has been updated.');
