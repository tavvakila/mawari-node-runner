const { exec } = require('child_process');
const path = require('path');

console.log('🔄 Starting Mawari Node...');

const nodeProcess = exec('cd mawari-engine && ./mawari-node start --config config.json', (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`STDERR: ${stderr}`);
    return;
  }
  console.log(`STDOUT: ${stdout}`);
});

// Handle output
nodeProcess.stdout.on('data', (data) => console.log(`Node output: ${data}`));
nodeProcess.stderr.on('data', (data) => console.error(`Node error: ${data}`));
