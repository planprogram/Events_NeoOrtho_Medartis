const fs = require('fs');
const file = 'EAD - NeoOrtho.html';
let c = fs.readFileSync(file, 'utf8');

// 1. Add Firebase SDK after font-awesome link
c = c.replace(
  '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">',
  '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">\n    <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>\n    <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js"></script>'
);

// 2. Add Firebase init before <style>
c = c.replace(
  '    </script>\n    <style>',
  '    </script>\n    <script>\n    firebase.initializeApp({\n        apiKey: "AIzaSyChLYj0irOa1k-D07v4bf6wt-75CzhJu8I",\n        authDomain: "neoorthomedartis.firebaseapp.com",\n        databaseURL: "https://neoorthomedartis-default-rtdb.firebaseio.com",\n        projectId: "neoorthomedartis",\n        storageBucket: "neoorthomedartis.firebasestorage.app",\n        messagingSenderId: "48492402152",\n        appId: "1:48492402152:web:c395acaf1e365d491bc05d",\n        measurementId: "G-W4JC235S2Y"\n    });\n    var eadDb = firebase.database();\n    </script>\n    <style>',
  1  // only first occurrence
);

// 3. Replace saveState function
c = c.replace(
  /function saveState\(\)\{try\{const d=\{course:state\.course,modules:state\.modules,files:state\.files\.map\(f=>\(\.\.\.f,data:undefined\)\),expandedPillars:\.\.\.state\.expandedPillars\],expandedSubs:\.\.\.state\.expandedSubs\],expandedLevels:\.\.\.state\.expandedLevels\],expandedModules:\.\.\.state\.expandedModules\],activePillar:state\.activePillar\};localStorage\.setItem\('ead_md_data',JSON\.stringify\(d\)\);\}catch\(e\)\{console\.warn\('Erro ao salvar:',e\);\}\}/,
  'function saveState(){try{var d={course:state.course,modules:state.modules,files:state.files.map(function(f){var r=Object.assign({},f);delete r.data;return r}),expandedPillars:Array.from(state.expandedPillars),expandedSubs:Array.from(state.expandedSubs),expandedLevels:Array.from(state.expandedLevels),expandedModules:Array.from(state.expandedModules),activePillar:state.activePillar};eadDb.ref("ead_data").set(d).catch(function(e){console.warn("Erro ao salvar:",e)});}catch(e){console.warn("Erro ao salvar:",e)}}'
);

// 4. Replace loadState function
c = c.replace(
  /function loadState\(\)\{try\{const raw=localStorage\.getItem\('ead_md_data'\);if\(!raw\)return;const d=JSON\.parse\(raw\);if\(d\.course\)state\.course=\{\.\.state\.course,\.\.d\.course\};if\(d\.modules\)state\.modules=d\.modules;if\(d\.files\)state\.files=d\.files;if\(d\.expandedPillars\)state\.expandedPillars=new Set\(d\.expandedPillars\);if\(d\.expandedSubs\)state\.expandedSubs=new Set\(d\.expandedSubs\);if\(d\.expandedLevels\)state\.expandedLevels=new Set\(d\.expandedLevels\);if\(d\.expandedModules\)state\.expandedModules=new Set\(d\.expandedModules\);if\(d\.activePillar!==undefined\)state\.activePillar=d\.activePillar;\}catch\(e\)\{console\.warn\('Erro ao carregar:',e\);\}\}/,
  'function loadState(){eadDb.ref("ead_data").once("value").then(function(snap){var d=snap.val();if(!d)return;if(d.course)state.course=Object.assign({},state.course,d.course);if(d.modules)state.modules=d.modules;if(d.files)state.files=d.files;if(d.expandedPillars)state.expandedPillars=new Set(d.expandedPillars);if(d.expandedSubs)state.expandedSubs=new Set(d.expandedSubs);if(d.expandedLevels)state.expandedLevels=new Set(d.expandedLevels);if(d.expandedModules)state.expandedModules=new Set(d.expandedModules);if(d.activePillar!==undefined)state.activePillar=d.activePillar;}).catch(function(e){console.warn("Erro ao carregar:",e)})}'
);

fs.writeFileSync(file, c, 'utf8');
console.log('Done. Replacements applied.');
