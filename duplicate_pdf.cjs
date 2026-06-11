const fs = require('fs');
const content = fs.readFileSync('src/components/PDFDocument.tsx', 'utf-8');
const lines = content.split('\n');

const universeLines = lines.slice(1605, 1869);
const supernovaLines = universeLines.map(line => {
  return line
    .replace("templateId === 'ats-universe'", "templateId === 'ats-supernova'")
    .replace(/#eab308/g, '#f43f5e') // yellow-500 -> rose-500
    .replace(/#facc15/g, '#fb7185') // yellow-400 -> rose-400
    .replace(/#ca8a04/g, '#e11d48') // yellow-600 -> rose-600
    .replace(/#18181b/g, '#0f172a') // zinc-900 -> slate-900
    .replace(/#3f3f46/g, '#334155') // zinc-700 -> slate-700
    .replace(/#52525b/g, '#475569') // zinc-600 -> slate-600
    .replace(/#71717a/g, '#64748b') // zinc-500 -> slate-500
    .replace(/#a1a1aa/g, '#94a3b8') // zinc-400 -> slate-400
    .replace(/#d4d4d8/g, '#cbd5e1') // zinc-300 -> slate-300
    .replace(/#e4e4e7/g, '#e2e8f0') // zinc-200 -> slate-200
    .replace(/#f4f4f5/g, '#f1f5f9') // zinc-100 -> slate-100
    .replace(/#fafafa/g, '#f8fafc'); // zinc-50 -> slate-50
});

lines.splice(1869, 0, ...supernovaLines);

fs.writeFileSync('src/components/PDFDocument.tsx', lines.join('\n'));
console.log('PDF duplicates done');
