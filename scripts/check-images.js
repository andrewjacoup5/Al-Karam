import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];
const allFiles = [...getFiles(assetsDir), ...getFiles(publicDir)];
const images = allFiles.filter(f => imageExtensions.includes(path.extname(f).toLowerCase()));

// Sort by size descending
const imageDetails = images.map(img => {
  const stats = fs.statSync(img);
  return {
    path: path.relative(workspaceRoot, img),
    sizeBytes: stats.size,
    sizeMB: (stats.size / (1024 * 1024)).toFixed(3)
  };
}).sort((a, b) => b.sizeBytes - a.sizeBytes);

console.log(`Total images found: ${imageDetails.length}`);
console.log(`Total size: ${(imageDetails.reduce((acc, img) => acc + img.sizeBytes, 0) / (1024 * 1024)).toFixed(2)} MB\n`);

console.log('Top 30 largest images:');
imageDetails.slice(0, 30).forEach((img, i) => {
  console.log(`${i+1}. ${img.path} - ${img.sizeMB} MB (${(img.sizeBytes / 1024).toFixed(1)} KB)`);
});
