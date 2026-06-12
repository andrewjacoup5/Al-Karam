import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');
const assetsDir = path.join(workspaceRoot, 'assets');
const publicDir = path.join(workspaceRoot, 'public');

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      files.push(name);
    }
  }
  return files;
}

const allFiles = [...getFiles(assetsDir), ...getFiles(publicDir)];
const images = allFiles.filter(f => {
  const ext = path.extname(f).toLowerCase();
  return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
});

async function compressImage(filePath) {
  const stats = fs.statSync(filePath);
  const sizeKB = stats.size / 1024;
  
  // Skip small files (under 100 KB) as they are already optimized
  if (sizeKB < 100) {
    return { status: 'skipped_small', sizeKB };
  }

  const ext = path.extname(filePath).toLowerCase();
  const tempPath = filePath + '.tmp';
  
  try {
    let pipeline = sharp(filePath);
    
    // Resize image if it is excessively large (greater than 2000px in either dimension)
    // to prevent memory issues and ensure responsive loading.
    const metadata = await pipeline.metadata();
    if (metadata.width > 2000 || metadata.height > 2000) {
      pipeline = pipeline.resize({
        width: 2000,
        height: 2000,
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    if (ext === '.jpg' || ext === '.jpeg') {
      await pipeline.jpeg({ quality: 80, progressive: true, mozjpeg: true }).toFile(tempPath);
    } else if (ext === '.png') {
      await pipeline.png({ compressionLevel: 8, palette: true, quality: 80 }).toFile(tempPath);
    }

    const tempStats = fs.statSync(tempPath);
    const newSizeKB = tempStats.size / 1024;

    if (newSizeKB < sizeKB) {
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
      const savingsKB = sizeKB - newSizeKB;
      const savingsPercent = ((savingsKB / sizeKB) * 100).toFixed(1);
      return {
        status: 'compressed',
        oldSizeKB: sizeKB,
        newSizeKB,
        savingsKB,
        savingsPercent
      };
    } else {
      // Temp file is larger, discard it and keep the original
      fs.unlinkSync(tempPath);
      return { status: 'kept_original', sizeKB };
    }
  } catch (err) {
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    console.error(`Failed to compress ${path.relative(workspaceRoot, filePath)}:`, err.message);
    return { status: 'error', sizeKB, error: err.message };
  }
}

async function run() {
  console.log(`Starting image compression on ${images.length} images...`);
  
  let compressedCount = 0;
  let skippedCount = 0;
  let totalSavedBytes = 0;
  let totalOriginalBytes = 0;

  for (let i = 0; i < images.length; i++) {
    const filePath = images[i];
    const relativePath = path.relative(workspaceRoot, filePath);
    const stats = fs.statSync(filePath);
    totalOriginalBytes += stats.size;

    const result = await compressImage(filePath);
    
    if (result.status === 'compressed') {
      compressedCount++;
      totalSavedBytes += (result.oldSizeKB - result.newSizeKB) * 1024;
      console.log(`[${i+1}/${images.length}] Compressed: ${relativePath} (${result.oldSizeKB.toFixed(1)} KB -> ${result.newSizeKB.toFixed(1)} KB, -${result.savingsPercent}%)`);
    } else if (result.status === 'skipped_small') {
      skippedCount++;
    } else if (result.status === 'kept_original') {
      skippedCount++;
    }
  }

  const savedMB = (totalSavedBytes / (1024 * 1024)).toFixed(2);
  const originalMB = (totalOriginalBytes / (1024 * 1024)).toFixed(2);
  const finalMB = ((totalOriginalBytes - totalSavedBytes) / (1024 * 1024)).toFixed(2);

  console.log('\n--- Compression Summary ---');
  console.log(`Total Images Evaluated: ${images.length}`);
  console.log(`Images Compressed: ${compressedCount}`);
  console.log(`Images Skipped/Kept: ${skippedCount}`);
  console.log(`Original Assets Size: ${originalMB} MB`);
  console.log(`Optimized Assets Size: ${finalMB} MB`);
  console.log(`Total Bandwidth Saved: ${savedMB} MB`);
}

run();
