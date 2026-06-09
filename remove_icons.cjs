const fs = require('fs');

for (const file of ['src/components/ResumePreview.tsx', 'src/components/PDFDocument.tsx']) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/◆/g, '|');
  content = content.replace(/<span className="text-\[10px\] text-amber-500">✦<\/span>\n\s*/g, '');
  content = content.replace(/<Text style={{ fontSize: baseSize\(9\), color: '#d97706' }}>✦<\/Text>\n\s*/g, '');
  content = content.replace(/✦/g, ''); // just in case
  fs.writeFileSync(file, content);
}
console.log('Icons removed');
