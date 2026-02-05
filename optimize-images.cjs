#!/usr/bin/env node

// ==========================================
// IMAGE OPTIMIZATION SCRIPT
// تحويل PNG إلى WebP وإنشاء نسخ مصغرة
// ==========================================

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const SIZES = {
  small: 400,
  medium: 800,
  large: 1200
};

console.log('🎨 Starting image optimization...\n');

// التحقق من وجود Sharp
try {
  execSync('sharp --version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ Sharp CLI is not installed!');
  console.log('📦 Installing Sharp CLI...');
  execSync('npm install -g sharp-cli', { stdio: 'inherit' });
}

// قراءة جميع الصور PNG
const files = fs.readdirSync(IMAGES_DIR)
  .filter(file => file.endsWith('.png'));

if (files.length === 0) {
  console.log('⚠️  No PNG files found in', IMAGES_DIR);
  process.exit(0);
}

console.log(`📁 Found ${files.length} PNG files\n`);

// معالجة كل صورة
files.forEach((file, index) => {
  const basename = path.basename(file, '.png');
  const inputPath = path.join(IMAGES_DIR, file);
  
  console.log(`[${index + 1}/${files.length}] Processing: ${file}`);
  
  try {
    // 1. تحويل إلى WebP بجودة عالية
    const webpPath = path.join(IMAGES_DIR, `${basename}.webp`);
    execSync(`sharp -i "${inputPath}" -o "${webpPath}" --webp quality=85`, {
      stdio: 'ignore'
    });
    console.log(`  ✅ Created: ${basename}.webp`);
    
    // 2. إنشاء النسخ المصغرة
    Object.entries(SIZES).forEach(([size, width]) => {
      const outputPath = path.join(IMAGES_DIR, `${basename}-${size}.webp`);
      execSync(`sharp -i "${webpPath}" -o "${outputPath}" resize ${width}`, {
        stdio: 'ignore'
      });
      console.log(`  ✅ Created: ${basename}-${size}.webp (${width}px)`);
    });
    
    // 3. حساب التوفير في الحجم
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(webpPath).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    
    console.log(`  💾 Size: ${(originalSize / 1024).toFixed(1)}KB → ${(webpSize / 1024).toFixed(1)}KB (${savings}% smaller)\n`);
    
  } catch (error) {
    console.error(`  ❌ Error processing ${file}:`, error.message);
  }
});

console.log('✨ Image optimization complete!\n');
console.log('📊 Summary:');
console.log(`  - Original files: ${files.length} PNG`);
console.log(`  - Generated: ${files.length * 4} WebP files`);
console.log(`  - Sizes: small (400px), medium (800px), large (1200px)\n`);