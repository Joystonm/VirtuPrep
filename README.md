# VirtuPrep - Soft Skills VR Trainer

VirtuPrep is an interactive, browser-based VR simulation platform that helps students and professionals practice essential soft skills—like public speaking, leadership, and teamwork—through immersive 3D environments, real-time feedback, and **AI-powered coaching**.

## What It Is

VirtuPrep is designed to make soft skills training engaging, measurable, and accessible to anyone with a web browser. Using 3D simulations powered by Three.js and WebXR, users can enter lifelike scenarios where they present, collaborate, and respond to challenges in real time. The platform acts like a "flight simulator" for soft skills, allowing safe practice before applying them in real-world situations.

## 🤖 NEW: AI-Powered Features

VirtuPrep now includes **Groq AI integration** for intelligent coaching:

- **🎯 Smart Topic Generation** - AI creates engaging speaking topics
- **🗣️ Real-time Speech Analysis** - AI analyzes your content and delivery
- **❓ Interactive Questions** - AI asks relevant questions during your speech
- **💡 Personalized Feedback** - AI provides specific improvement suggestions
- **💬 Expert Coaching** - Ask the AI anything about public speaking

## Core Features

- **Immersive 3D Simulations**: Practice soft skills in realistic VR environments (conference halls, meeting rooms, stages)
- **AI-Driven Characters**: Interact with intelligent virtual audiences and team members
- **🤖 Groq AI Coach**: Real-time AI analysis, questions, and personalized feedback
- **Real-Time Feedback**: Visual cues through audience reactions and live performance metrics
- **Voice Analysis**: Advanced speech recognition for tone, clarity, pace, and confidence assessment
- **Interactive Challenges**: Handle real-world scenarios like audience questions, interruptions, and group conflicts
- **Performance Analytics**: Detailed score breakdowns with strengths, improvement areas, and growth tips
- **Progress Tracking**: Monitor improvement across multiple training sessions
- **Dual Mode Support**: Works in both standard browser and VR headset modes

## Technology Stack

- **Frontend**: React 18, React Router, Three.js, A-Frame
- **AI Integration**: Groq API (Llama 3), Web Speech API
- **Styling**: CSS3, Custom theme system
- **VR**: WebXR API, Three.js, A-Frame
- **Speech Analysis**: Web Speech API, Web Audio API
- **Charts**: Chart.js, React Chart.js 2
- **Animations**: Anime.js
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern browser with WebXR support (for VR features)
- Microphone access (for speech analysis)
- **🆓 Free Groq API key** (for AI features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/virtuprep.git
cd virtuprep
```

2. Install dependencies:
```bash
npm install
```

3. **Set up AI features (Groq API)**:
   - Go to [console.groq.com](https://console.groq.com) and create a free account
   - Generate an API key
   - Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   - Edit `.env.local` and add your Groq API key:
   ```
   REACT_APP_GROQ_API_KEY=gsk_your_actual_api_key_here
   ```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🤖 AI Features Setup

### Option 1: Environment Variables (Recommended)
1. Get a free API key from [console.groq.com](https://console.groq.com)
2. Add it to your `.env.local` file:
   ```
   REACT_APP_GROQ_API_KEY=gsk_your_api_key_here
   ```
3. Restart the server - AI features will be automatically enabled!

### Option 2: In-App Configuration
1. Start the application without an API key
2. Go to Public Speaking Training
3. Enter your API key in the configuration section
4. AI features will be enabled immediately

### Free Groq API Benefits:
- **Fast inference** - Near-instant AI responses
- **High rate limits** - Generous free tier
- **Multiple models** - Llama 3, Mixtral, and more
- **No credit card required** - Completely free to start

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 🎯 AI-Powered Training Modules

### 🎤 Public Speaking (AI-Enhanced)
- **Smart Topic Generation**: AI creates engaging speaking challenges
- **Real-time Analysis**: AI analyzes your speech content and delivery
- **Interactive Questions**: AI asks relevant questions during your presentation
- **Personalized Feedback**: Specific suggestions for improvement
- **Expert Coaching**: Ask the AI for speaking tips and advice

### 👥 Team Leadership
- AI-driven virtual team members with realistic personalities
- Dynamic conflict resolution scenarios
- Leadership effectiveness tracking
- Decision-making challenges

### 🤝 Collaboration
- Virtual workspace with AI teammates
- Interactive whiteboards and project tools
- Consensus-building exercises
- Time-pressured decision making

### 📊 Real-time Analytics
- Live speech metrics and performance tracking
- Color-coded feedback system
- Detailed improvement reports
- Progress tracking across sessions

### 🥽 VR Experience
- WebXR integration for VR headsets
- Multiple immersive environments
- Seamless desktop/VR switching
- 3D spatial audio

### 🎯 Interactive Challenges
- AI-generated unexpected scenarios
- Time-pressured decision making
- Adaptive difficulty based on performance
- Achievement and badge system

## VR Setup

To use VR features:

1. Ensure you have a WebXR-compatible browser (Chrome, Edge, Firefox Reality)
2. Connect a VR headset (Oculus Quest, HTC Vive, etc.)
3. Enable WebXR in your browser settings
4. Grant camera and microphone permissions

## Speech Analysis

The speech analysis feature requires:

1. Microphone access
2. HTTPS connection (for production)
3. Modern browser with Web Speech API support

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

VR features require WebXR support:
- Chrome 79+ (with WebXR flag enabled)
- Firefox Reality
- Oculus Browser

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with:

```bash
# AI Configuration
REACT_APP_GROQ_API_KEY=your_groq_api_key_here
REACT_APP_GROQ_MODEL=llama3-8b-8192

# API Configuration
REACT_APP_API_BASE_URL=http://localhost:3001
REACT_APP_SPEECH_API_URL=http://localhost:3002

# Features
REACT_APP_ENABLE_AI_FEATURES=true
REACT_APP_USE_MOCK_DATA=false
REACT_APP_SKIP_VR_CHECK=false
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [x] **AI-powered coaching with Groq integration**
- [x] **Real-time speech analysis and feedback**
- [x] **Interactive AI questions and challenges**
- [ ] Multi-language support
- [ ] Advanced gesture recognition
- [ ] Integration with job platforms
- [ ] Mobile VR support
- [ ] Voice emotion analysis
- [ ] Custom scenario builder
- [ ] Team collaboration analytics
- [ ] Progress sharing and social features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@virtuprep.com or create an issue on GitHub.

## Acknowledgments

- **Groq** for providing fast, free AI inference
- Three.js community for 3D graphics support
- A-Frame team for VR framework
- React team for the excellent framework
- Contributors and beta testers

---

## 🚀 Quick Start with AI

1. **Get Groq API key**: [console.groq.com](https://console.groq.com) (free)
2. **Clone & install**: `git clone ... && npm install`
3. **Configure AI**: Add API key to `.env.local`
4. **Start training**: `npm run dev` → Public Speaking → AI-powered coaching!

**Experience the future of soft skills training with AI-powered coaching!** 🤖✨
