const { execSync } = require('child_process');
const path = require('path');

const nodeDir = String.raw`C:\Users\usr13261\Desktop\nodejs-portable\node-v20.12.2-win-x64`;
const nodeExe = path.join(nodeDir, 'node.exe');
const npmExe = path.join(nodeDir, 'npm.cmd');

// Add Node to PATH for child processes
const env = { ...process.env, PATH: nodeDir + ';' + process.env.PATH };

// Install Firebase CLI
console.log('Installing Firebase CLI...');
execSync(`"${npmExe}" install -g firebase-tools`, { stdio: 'inherit', cwd: process.cwd(), env });

// Deploy
console.log('Deploying to Firebase...');
execSync('firebase deploy', { stdio: 'inherit', cwd: process.cwd(), env });
