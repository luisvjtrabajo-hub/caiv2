import assert from 'node:assert/strict';
const base=process.argv[2]||'http://127.0.0.1:3000';
const pages=await Promise.all(['/','/ingresar','/miembros'].map(async route=>{const response=await fetch(new URL(route,base),{signal:AbortSignal.timeout(15000)});assert.equal(response.status,200,route+' debe responder 200');return {route,html:await response.text()};}));
const home=pages[0].html;
assert.ok(home.includes('Mientras respiremos'),'La portada debe mostrar el lema.');
assert.ok(home.includes('public-header'),'La portada debe tener navegación pública.');
assert.ok(home.includes('ilustrativo de la Cruzada'),'El globo público debe ser ilustrativo.');
assert.equal(home.includes('id="cai-username"'),false,'El login no debe reemplazar la portada.');
assert.equal(home.includes('Buen día, hermano'),false,'El panel no debe reemplazar la portada.');
for(const page of pages.slice(1)){assert.ok(page.html.includes('id="cai-username"'),page.route+' debe pedir usuario propio');assert.ok(page.html.includes('id="cai-password"'),page.route+' debe pedir contraseña propia');assert.equal(page.html.includes('href="/signin-with-chatgpt'),false);}
await Promise.all(['logo-cai.png','leon-xiv.webp','hermanos.jpg','soldado-campo.jpg','estatua-pedro.jpg'].map(async file=>{const response=await fetch(new URL('/images/reference/'+file,base),{signal:AbortSignal.timeout(15000)});assert.equal(response.status,200,file+' debe estar disponible');assert.ok(response.headers.get('content-type')?.startsWith('image/'));await response.body?.cancel();}));
console.log(JSON.stringify({base,routes:pages.map(p=>({route:p.route,status:200,publicLanding:p.route==='/',ownLogin:p.html.includes('id="cai-username"')})),referenceImages:'5 disponibles'}));
