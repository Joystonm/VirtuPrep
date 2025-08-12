# VirtuPrep - Soft Skills VR Trainer

VirtuPrep is an interactive, browser-based VR simulation platform that helps students and professionals practice essential soft skills—like public speaking, leadership, and teamwork—through immersive 3D environments, real-time feedback, and performance analytics.

## What It Is

VirtuPrep is designed to make soft skills training engaging, measurable, and accessible to anyone with a web browser. Using 3D simulations powered by Three.js and WebXR, users can enter lifelike scenarios where they present, collaborate, and respond to challenges in real time. The platform acts like a "flight simulator" for soft skills, allowing safe practice before applying them in real-world situations.

## Core Features

- **Immersive 3D Simulations**: Practice soft skills in realistic VR environments (conference halls, meeting rooms, stages)
- **AI-Driven Characters**: Interact with intelligent virtual audiences and team members
- **Real-Time Feedback**: Visual cues through audience reactions and live performance metrics
- **Voice Analysis**: Advanced speech recognition for tone, clarity, pace, and confidence assessment
- **Interactive Challenges**: Handle real-world scenarios like audience questions, interruptions, and group conflicts
- **Performance Analytics**: Detailed score breakdowns with strengths, improvement areas, and growth tips
- **Progress Tracking**: Monitor improvement across multiple training sessions
- **Dual Mode Support**: Works in both standard browser and VR headset modes

## Technology Stack

- **Frontend**: React 18, React Router, Three.js, A-Frame
- **Styling**: CSS3, Custom theme system
- **VR**: WebXR API, Three.js, A-Frame
- **Speech Analysis**: Web Speech API, Web Audio API
- **Charts**: Chart.js, React Chart.js 2
- **Animations**: Anime.js
- **Build Tool**: Vite

## Project Structure

```
VirtuPrep/
├── public/                      # Static files
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── assets/
│       ├── images/
│       └── icons/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── ScenarioCard.jsx
│   │   ├── FeedbackGraph.jsx
│   │   ├── VRScene.jsx
│   │   ├── SpeechMetrics.jsx
│   │   ├── AnimatedButton.jsx
│   │   └── Loader.jsx
│   ├── pages/                   # Page components
│   │   ├── LandingPage.jsx
│   │   ├── ScenarioSelect.jsx
│   │   ├── Simulation.jsx
│   │   └── Results.jsx
│   ├── hooks/                   # Custom React hooks
│   │   ├── useSpeechAnalysis.js
│   │   └── useVRControls.js
│   ├── utils/                   # Helper functions
│   │   ├── speechUtils.js
│   │   ├── analyticsUtils.js
│   │   └── vrUtils.js
│   ├── styles/                  # Styling
│   │   ├── globals.css
│   │   └── theme.js
│   ├── App.jsx
│   ├── index.js
│   ├── routes.js
│   └── config.js
├── .env
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern browser with WebXR support (for VR features)
- Microphone access (for speech analysis)

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

3. Create environment file:
```bash
cp .env .env.local
```

4. Update environment variables in `.env.local` with your configuration

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

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

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [ ] Multi-language support
- [ ] AI-powered virtual interviewer
- [ ] Advanced gesture recognition
- [ ] Integration with job platforms
- [ ] Mobile VR support
- [ ] Voice emotion analysis
- [ ] Custom scenario builder

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@virtuprep.com or create an issue on GitHub.

## Acknowledgments

- Three.js community for 3D graphics support
- A-Frame team for VR framework
- React team for the excellent framework
- Contributors and beta testers
