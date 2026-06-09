const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'public', 'icon-192.png');
const destPath = path.join(__dirname, 'public', 'favicon.ico');

try {
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log('Successfully created public/favicon.ico from public/icon-192.png');
  } else {
    console.error('Source icon-192.png not found!');
  }
} catch (error) {
  console.error('Error copying favicon:', error);
}
