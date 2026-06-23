const fs = require('fs');
const file = 'Gantt - Steps2Walk v3.html';
let content = fs.readFileSync(file, 'utf8');

// Fix 1: Add Storage.saveSilent() to Modal.save (line 624)
content = content.replace(
    'Modal.close(); App.renderAll(); \n            },',
    'Storage.saveSilent(); Modal.close(); App.renderAll(); \n            },'
);

// Fix 2: Add Storage.saveSilent() to Modal.deleteItem (line 633)
content = content.replace(
    'Modal.close(); App.renderAll(); \n                } \n            }',
    'Storage.saveSilent(); Modal.close(); App.renderAll(); \n                } \n            }'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Done. Check if replacements were applied.');
