#!/usr/bin/env node

/**
 * VirtuPrep AI Setup Script
 * Helps users configure Groq API for AI-powered features
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`
🎯 VirtuPrep AI Setup
=====================

This script will help you configure Groq AI for intelligent public speaking coaching.

🤖 Groq AI provides:
- Smart topic generation
- Real-time speech analysis  
- Interactive questions
- Personalized feedback
- Expert coaching advice

📝 You'll need a free API key from: https://console.groq.com
`);

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  try {
    // Check if .env.local already exists
    const envLocalPath = path.join(__dirname, '.env.local');
    const envExamplePath = path.join(__dirname, '.env.example');
    
    if (fs.existsSync(envLocalPath)) {
      const overwrite = await askQuestion('📁 .env.local already exists. Overwrite? (y/N): ');
      if (overwrite.toLowerCase() !== 'y') {
        console.log('✅ Setup cancelled. Your existing configuration is preserved.');
        rl.close();
        return;
      }
    }
    
    // Get API key from user
    console.log('\n🔑 Groq API Key Setup:');
    console.log('1. Go to https://console.groq.com');
    console.log('2. Sign up for a free account');
    console.log('3. Create a new API key');
    console.log('4. Copy the key (starts with "gsk_")');
    
    const apiKey = await askQuestion('\n🔐 Enter your Groq API key: ');
    
    if (!apiKey || !apiKey.startsWith('gsk_')) {
      console.log('❌ Invalid API key format. Groq keys start with "gsk_"');
      rl.close();
      return;
    }
    
    // Choose AI model
    console.log('\n🧠 Choose AI Model:');
    console.log('1. llama3-8b-8192 (Recommended - Fast & Smart)');
    console.log('2. llama3-70b-8192 (More Powerful)');
    console.log('3. mixtral-8x7b-32768 (Creative)');
    
    const modelChoice = await askQuestion('Select model (1-3, default: 1): ') || '1';
    
    const models = {
      '1': 'llama3-8b-8192',
      '2': 'llama3-70b-8192', 
      '3': 'mixtral-8x7b-32768'
    };
    
    const selectedModel = models[modelChoice] || 'llama3-8b-8192';
    
    // Create .env.local content
    let envContent = '';
    
    if (fs.existsSync(envExamplePath)) {
      envContent = fs.readFileSync(envExamplePath, 'utf8');
      envContent = envContent.replace('gsk_your_actual_groq_api_key_here', apiKey);
      envContent = envContent.replace('llama3-8b-8192', selectedModel);
    } else {
      envContent = `# VirtuPrep AI Configuration
REACT_APP_GROQ_API_KEY=${apiKey}
REACT_APP_GROQ_MODEL=${selectedModel}
REACT_APP_ENABLE_AI_FEATURES=true

# API Configuration
REACT_APP_API_BASE_URL=http://localhost:3001
REACT_APP_SPEECH_API_URL=http://localhost:3002

# Development Settings
REACT_APP_USE_MOCK_DATA=false
REACT_APP_SKIP_VR_CHECK=false
GENERATE_SOURCEMAP=true
`;
    }
    
    // Write .env.local file
    fs.writeFileSync(envLocalPath, envContent);
    
    console.log(`
✅ AI Configuration Complete!

📁 Created: .env.local
🤖 Model: ${selectedModel}
🔑 API Key: ${apiKey.substring(0, 10)}...

🚀 Next Steps:
1. Start the development server: npm run dev
2. Go to Public Speaking Training
3. AI features will be automatically enabled!

💡 Tips:
- Your API key is stored locally and never shared
- Groq provides generous free usage limits
- You can change the model anytime in .env.local

🎯 Ready to experience AI-powered soft skills training!
`);
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
  
  rl.close();
}

main();
