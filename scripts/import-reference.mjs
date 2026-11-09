import fs from 'node:fs';
const document = fs.readFileSync(new URL('../docs/requisitos/Documento para el desarrollador v1.md', import.meta.url), 'utf8');
const missions = document.split('## Parte 5.')[1].split('\n').filter(line => /^\| (FOR|VIG|PRX|CAR|ESC|DEB|HER|PRE|EST|HOS)-\d{2} \|/.test(line)).map(line => {
  const [code, name, category, area, points, evidence, minRank, repeat, cap] = line.split('|').slice(1,-1).map(v=>v.trim());
  return {code,name,category,area,points:Number(points),evidence,minRank:Number(minRank),repeat,cap:cap==='—'?null:Number(cap)};
});
const ranks = document.split('\n').filter(line=>/^\| (?:[1-9]|10) \| [^|]+ \| «/.test(line)).map(line=>{
  const [level,name,motto,from,to,bonus,milestone,description] = line.split('|').slice(1,-1).map(v=>v.trim());
  return {level:Number(level),name,motto,from:Number(from),to:Number(to)||null,bonus:Number(bonus),milestone,description};
});
if(missions.length!==47 || ranks.length!==10) throw new Error('El catálogo no coincide con la documentación.');
fs.writeFileSync('lib/catalog.json', JSON.stringify({missions,ranks},null,2));
console.log(`Importadas ${missions.length} misiones y ${ranks.length} rangos desde el MD vigente.`);
