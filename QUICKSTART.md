# 🚀 VirtuPrep Quick Start Guide

Get up and running with AI-powered soft skills training in 5 minutes!

## 📋 Prerequisites

- Node.js (v16+)
- Modern browser (Chrome, Firefox, Edge)
- Microphone access

## ⚡ Quick Setup

### 1. Clone & Install
```bash
git clone https://github.com/your-username/virtuprep.git
cd virtuprep
npm install
```

### 2. Set Up AI Features (Free)
```bash
npm run setup-ai
```

This interactive script will:
- Guide you to get a free Groq API key
- Configure AI features automatically
- Set up your environment

### 3. Start Training
```bash
npm run dev
```

Open `http://localhost:5173` and start training!

## 🤖 Manual AI Setup (Alternative)

If you prefer manual setup:

1. **Get Free API Key**:
   - Go to [console.groq.com](https://console.groq.com)
   - Sign up (free, no credit card required)
   - Create an API key

2. **Configure Environment**:
   ```bash
   cp .env.example .env.local
   ```
   
3. **Add Your API Key**:
   Edit `.env.local`:
   ```
   REACT_APP_GROQ_API_KEY=gsk_your_actual_api_key_here
   ```

4. **Start the App**:
   ```bash
   npm run dev
   ```

## 🎯 Using AI Features

### Public Speaking Training:
1. Go to **🎤 Public Speaking**
2. Click **Start Training**
3. Use these AI features:
   - **🎲 Random Topic** - Get AI-generated speaking topics
   - **🎤 Start Speaking** - AI listens and analyzes in real-time
   - **🤖 Ask AI Question** - Get expert speaking advice
   - **💡 Get AI Feedback** - Comprehensive performance analysis

### AI Interactions:
- **Smart Topics**: "The future of remote work and its impact on society"
- **Live Analysis**: AI analyzes your speech content and delivery
- **Interactive Questions**: AI asks relevant questions during your speech
- **Expert Feedback**: Personalized improvement suggestions

## 🔧 Configuration Options

### Environment Variables (.env.local):
```bash
# AI Configuration
REACT_APP_GROQ_API_KEY=your_api_key_here
REACT_APP_GROQ_MODEL=llama3-8b-8192

# Features
REACT_APP_ENABLE_AI_FEATURES=true
REACT_APP_USE_MOCK_DATA=false
```

### Available AI Models:
- `llama3-8b-8192` - Fast & Smart (Recommended)
- `llama3-70b-8192` - More Powerful
- `mixtral-8x7b-32768` - Creative

## 🎮 Training Modules

### 🎤 Public Speaking (AI-Enhanced)
- Virtual auditorium with 100+ audience members
- AI-generated speaking topics
- Real-time speech analysis
- Interactive AI questions
- Personalized feedback

### 👥 Team Leadership
- Virtual meeting room with AI team members
- Leadership decision scenarios
- Conflict resolution practice
- Team motivation challenges

### 🤝 Collaboration
- Virtual workspace with interactive tools
- AI teammates with different personalities
- Consensus building exercises
- Time-pressured decision making

### 📊 Real-time Analytics
- Live speech metrics
- Performance tracking
- Color-coded feedback
- Detailed improvement reports

### 🥽 VR Experience
- WebXR support for VR headsets
- Multiple immersive environments
- 3D spatial audio
- Seamless desktop/VR switching

### 🎯 Interactive Challenges
- Unexpected scenarios
- Time-pressure situations
- Adaptive difficulty
- Achievement system

## 🆘 Troubleshooting

### AI Features Not Working?
1. Check your API key in `.env.local`
2. Ensure key starts with `gsk_`
3. Restart the development server
4. Check browser console for errors

### Microphone Issues?
1. Grant microphone permissions
2. Use HTTPS in production
3. Check browser compatibility

### VR Not Working?
1. Use Chrome/Edge with WebXR support
2. Connect VR headset
3. Enable WebXR in browser settings

## 📚 Next Steps

1. **Practice Daily**: Use different AI-generated topics
2. **Track Progress**: Monitor your improvement over time
3. **Try All Modules**: Explore leadership and collaboration training
4. **Use VR Mode**: Experience full immersion with a VR headset
5. **Ask AI Questions**: Get personalized coaching advice

## 🎯 Pro Tips

- **Start with Easy Topics**: Build confidence with familiar subjects
- **Use AI Questions**: They help you think deeper about your content
- **Practice Regularly**: Consistency improves speaking skills faster
- **Try Different Scenarios**: Each module teaches different skills
- **Ask for Feedback**: The AI provides specific, actionable advice

## 🔗 Useful Links

- [Groq Console](https://console.groq.com) - Get your free API key
- [WebXR Support](https://immersiveweb.dev/) - Check VR compatibility
- [Project Repository](https://github.com/your-username/virtuprep) - Source code

---

**🎉 You're ready to master your soft skills with AI-powered training!**

Start with Public Speaking, get an AI-generated topic, and begin your journey to becoming a confident communicator.
