
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname);
const publicAssetsDir = path.join(baseDir, 'public/assets/vv_marine_seafood_images');
const srcAssetsDir = path.join(baseDir, 'src/assets');

const checkFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        console.log(`[OK] ${filePath}`);
        return true;
    } else {
        console.log(`[MISSING] ${filePath}`);
        return false;
    }
};

console.log('--- Checking Professional Images (01-28) ---');
for (let i = 1; i <= 28; i++) {
    const num = i.toString().padStart(2, '0');
    const files = fs.readdirSync(publicAssetsDir);
    const match = files.find(f => f.startsWith(num + '_'));
    if (match) {
        checkFile(path.join(publicAssetsDir, match));
    } else {
        console.log(`[MISSING] No file starting with ${num}_ in ${publicAssetsDir}`);
    }
}

console.log('\n--- Checking src/assets/images ---');
const imagesDir = path.join(srcAssetsDir, 'images');
if (fs.existsSync(imagesDir)) {
    const images = fs.readdirSync(imagesDir);
    images.forEach(img => checkFile(path.join(imagesDir, img)));
}

console.log('\n--- Checking src/assets/products ---');
const productsDir = path.join(srcAssetsDir, 'products');
if (fs.existsSync(productsDir)) {
    const products = fs.readdirSync(productsDir);
    products.forEach(p => checkFile(path.join(productsDir, p)));
}

console.log('\n--- Checking Videos ---');
const videos = [
    'WhatsApp Video 2026-01-27 at 7.09.57 PM.mp4',
    'WhatsApp Video 2026-01-27 at 7.09.57 PM (1).mp4',
    'Prawn_Processing_Documentary_Footage_Generated.mp4',
    'Seafood_Export_Packing_Floor_Video.mp4',
    'WhatsApp Video 2026-01-28 at 10.04.02 AM.mp4',
    'WhatsApp Video 2026-01-28 at 10.04.05 AM.mp4',
    'WhatsApp Video 2026-01-28 at 10.04.06 AM.mp4',
    'WhatsApp Video 2026-01-28 at 10.04.06 AM (1).mp4'
];
videos.forEach(v => checkFile(path.join(imagesDir, v)));
