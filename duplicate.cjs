const fs = require('fs');
const content = fs.readFileSync('src/components/ResumePreview.tsx', 'utf-8');
const lines = content.split('\n');

const startIndex = lines.findIndex(l => l.includes("templateId === 'ats-universe' ? ("));
let endIndex = -1;
let openDivs = 0;
// find the matching closing div for templateId === 'ats-universe'
// actually, I know the exact lines: 1675 to 1947
const universeLines = lines.slice(1675, 1948);
const supernovaLines = universeLines.map(line => {
  return line
    .replace("templateId === 'ats-universe'", "templateId === 'ats-supernova'")
    .replace('id="layout-ats-universe"', 'id="layout-ats-supernova"')
    .replace(/bg-yellow-/g, 'bg-rose-')
    .replace(/text-yellow-/g, 'text-rose-')
    .replace(/border-yellow-/g, 'border-rose-')
    .replace(/bg-zinc-/g, 'bg-slate-')
    .replace(/text-zinc-/g, 'text-slate-')
    .replace(/border-zinc-/g, 'border-slate-');
});

// insert supernova block right before ats-universe block or after it?
// let's insert it right after the ats-universe block

lines.splice(1948, 0, ...supernovaLines);

fs.writeFileSync('src/components/ResumePreview.tsx', lines.join('\n'));
console.log('Done!');
