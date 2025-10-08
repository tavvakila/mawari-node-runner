const { execSync } = require('child_process');
const fs = require('fs-extra');
const axios = require('axios');
const path = require('path');

async function setupMawariNode() {
  console.log('🚀 Memulai setup Mawari Node...');
  
  // Step 1: Download Mawari Engine (ganti dengan token/license Anda)
  const licenseKey = process.env.MAWARI_LICENSE_KEY; // Set di .env atau Gitpod vars
  if (!licenseKey) {
    console.error('❌ Set MAWARI_LICENSE_KEY di environment variables!');
    process.exit(1);
  }
  
  try {
    // Contoh download dari API Mawari (sesuaikan dengan docs resmi)
    const response = await axios.get('https://nodes.mawari.net/api/download/engine', {
      headers: { 'Authorization': `Bearer ${licenseKey}` },
      responseType: 'stream'
    });
    const enginePath = path.join(__dirname, 'mawari-engine.zip');
    await response.data.pipe(fs.createWriteStream(enginePath));
    console.log('✅ Mawari Engine downloaded.');
    
    // Unzip (gunakan unzip command)
    execSync('unzip -o mawari-engine.zip -d mawari-engine/');
    console.log('✅ Engine extracted.');
  } catch (error) {
    console.error('❌ Error downloading engine:', error.message);
    process.exit(1);
  }
  
  // Step 2: Konfigurasi node (contoh config.json)
  const config = {
    nodeType: 'guardian', // Atau 'worker' / 'pulse'
    gpuEnabled: true,
    port: 3000,
    licenseKey: licenseKey,
    network: 'mainnet' // Atau 'testnet'
  };
  fs.writeJsonSync('mawari-engine/config.json', config);
  console.log('✅ Config generated.');
  
  console.log('Setup selesai! Jalankan `npm run start:node` untuk start node.');
}

setupMawariNode();
