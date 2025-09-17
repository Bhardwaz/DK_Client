# 💕 DateKarle - Frontend

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA" />
</div>

<div align="center">
  <h1>🌟 DateKarle - Find Your Perfect Match</h1>
  <p><em>Yahan milega tumhara pyaar! 💝</em></p>
  <p>A modern, intuitive dating app built with React - connecting hearts across India</p>
</div>

<div align="center">
  <img src="https://img.shields.io/github/license/yourusername/datekarle-frontend?style=flat-square" alt="License" />
  <img src="https://img.shields.io/github/stars/yourusername/datekarle-frontend?style=flat-square" alt="Stars" />
  <img src="https://img.shields.io/github/forks/yourusername/datekarle-frontend?style=flat-square" alt="Forks" />
  <img src="https://img.shields.io/github/issues/yourusername/datekarle-frontend?style=flat-square" alt="Issues" />
</div>

---

## ✨ Features

### 🎭 **User Experience**
- 🚀 Lightning-fast Progressive Web App (PWA)
- 📱 Responsive design for mobile, tablet, and desktop
- 🌙 Dark/Light mode toggle
- 🌍 Multi-language support (Hindi, English, regional languages)
- ♿ Accessibility-first design (WCAG 2.1 compliant)
- 🎨 Smooth animations and micro-interactions

### 💝 **Core Dating Features**
- 👆 Intuitive swipe gestures (like Tinder, but better!)
- 💕 Smart matching algorithm integration
- 📸 Multi-photo profile creation with drag & drop
- 🎯 Advanced filtering (age, location, interests, profession)
- ⭐ Super likes and boosts
- 🔄 Undo swipe functionality
- 📍 Location-based discovery

### 💬 **Communication**
- 💌 Real-time messaging with WebSocket
- 📷 Photo and media sharing
- 😊 Emoji reactions and stickers
- ✅ Read receipts and typing indicators
- 🎥 Video call integration
- 🔇 Message encryption for privacy

### 🎯 **Smart Features**
- 🧠 AI-powered conversation starters
- 🎪 Icebreaker games and questions
- 📊 Profile completion suggestions
- 🏆 Gamification elements (streaks, achievements)
- 🎁 Daily rewards and challenges
- 📱 Push notifications

### 💎 **Premium Features**
- 💳 Stripe payment integration
- 👑 Premium badges and profile highlights
- 🔍 Advanced search filters
- 📈 Profile analytics and insights
- 🚫 Ad-free experience
- 💫 Priority matching

---

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI elements (Button, Modal, etc.)
│   ├── forms/          # Form components
│   ├── layout/         # Layout components (Header, Sidebar)
│   └── features/       # Feature-specific components
├── pages/              # Route components
│   ├── auth/           # Authentication pages
│   ├── profile/        # Profile management
│   ├── discover/       # Swipe/Discovery page
│   ├── matches/        # Matches and conversations
│   └── settings/       # App settings
├── hooks/              # Custom React hooks
├── services/           # API calls and external services
├── utils/              # Helper functions and utilities
├── store/              # State management (Redux/Zustand)
├── styles/             # Global styles and themes
├── assets/             # Static assets (images, icons)
├── types/              # TypeScript type definitions
└── tests/              # Test files
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/datekarle-frontend.git
   cd datekarle-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 🔧 Environment Configuration

### Environment Variables

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_SOCKET_URL=ws://localhost:3000
VITE_APP_ENV=development

# Authentication
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_FACEBOOK_APP_ID=your-facebook-app-id

# Maps & Location
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key
VITE_MAPBOX_ACCESS_TOKEN=your-mapbox-token

# Payment
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-key

# Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_MIXPANEL_TOKEN=your-mixpanel-token

# Push Notifications
VITE_VAPID_PUBLIC_KEY=your-vapid-public-key

# App Configuration
VITE_APP_NAME=DateKarle
VITE_APP_VERSION=1.0.0
VITE_SUPPORT_EMAIL=support@datekarle.com
```

---

## 📱 Key Pages & Components

### 🔐 Authentication Flow
```
/login              # Email/Phone login
/register           # User registration
/verify             # OTP verification
/profile-setup      # Initial profile creation
/photo-upload       # Photo upload wizard
```

### 🏠 Main Application
```
/                   # Landing/Welcome page
/discover           # Swipe/Discovery interface
/matches            # Mutual matches list
/chat/:id           # Individual chat interface
/profile            # User profile management
/settings           # App settings and preferences
/premium            # Premium subscription page
```

### 🎨 Core Components

#### SwipeCard Component
```tsx
<SwipeCard
  user={user}
  onLike={handleLike}
  onPass={handlePass}
  onSuperLike={handleSuperLike}
  enableUndo={true}
/>
```

#### ChatInterface Component
```tsx
<ChatInterface
  conversationId={conversationId}
  onSendMessage={handleSendMessage}
  realTime={true}
  encryption={true}
/>
```

---

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary-500: #FF6B9D;     /* DateKarle Pink */
--primary-600: #E5005C;     /* Darker Pink */
--primary-400: #FF8FB3;     /* Lighter Pink */

/* Secondary Colors */
--secondary-500: #4ECDC4;   /* Teal */
--accent-500: #FFD93D;      /* Yellow */
--success-500: #6BCF7F;     /* Green */
--warning-500: #FFB347;     /* Orange */
--error-500: #FF6B6B;       /* Red */

/* Neutral Colors */
--gray-50: #F9FAFB;
--gray-900: #111827;
```

### Typography
```css
/* Font Families */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Font Weights */
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing System
```css
/* Tailwind-based spacing */
--spacing-1: 0.25rem;    /* 4px */
--spacing-2: 0.5rem;     /* 8px */
--spacing-4: 1rem;       /* 16px */
--spacing-6: 1.5rem;     /* 24px */
--spacing-8: 2rem;       /* 32px */
```

---

## 🧪 Testing

### Available Scripts
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run component tests
npm run test:components
```

### Testing Stack
- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright
- **Visual Tests**: Chromatic
- **Performance Tests**: Lighthouse CI

### Test Structure
```
src/
├── __tests__/          # Global tests
├── components/
│   └── __tests__/      # Component tests
├── pages/
│   └── __tests__/      # Page tests
└── utils/
    └── __tests__/      # Utility tests

e2e/                    # End-to-end tests
├── specs/
├── fixtures/
└── support/
```

---

## 📦 Build & Deployment

### Build Commands
```bash
# Development build
npm run build:dev

# Production build
npm run build

# Analyze bundle
npm run analyze

# Preview production build
npm run preview
```

### Deployment Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Build command: npm run build
# Publish directory: dist
# Environment variables: Set in Netlify dashboard
```

#### AWS S3 + CloudFront
```bash
# Build and sync to S3
npm run build
aws s3 sync dist/ s3://your-bucket-name
```

### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview"]
```

---

## 📊 Performance Optimization

### Core Web Vitals Targets
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Optimization Strategies
- 🖼️ Image optimization with WebP/AVIF
- 📦 Code splitting and lazy loading
- 🗄️ Service Worker for caching
- ⚡ Vite for fast development and builds
- 🎯 Bundle size monitoring
- 📱 Progressive Web App features

---

## 🌐 Internationalization (i18n)

### Supported Languages
- 🇮🇳 **Hindi** (`hi`)
- 🇬🇧 **English** (`en`)
- 🇮🇳 **Punjabi** (`pa`)
- 🇮🇳 **Bengali** (`bn`)
- 🇮🇳 **Tamil** (`ta`)
- 🇮🇳 **Telugu** (`te`)

### Usage Example
```tsx
import { useTranslation } from 'react-i18next';

function WelcomeMessage() {
  const { t } = useTranslation();
  
  return (
    <h1>{t('welcome.title', 'Welcome to DateKarle!')}</h1>
  );
}
```

---

## 🔒 Security & Privacy

### Security Measures
- 🛡️ Content Security Policy (CSP)
- 🔐 HTTPS enforcement
- 🚫 XSS protection
- 🛠️ Dependency vulnerability scanning
- 🔒 Secure authentication flow
- 📱 Biometric authentication support

### Privacy Features
- 🙈 Anonymous browsing mode
- 🗑️ Data deletion tools
- 🔒 End-to-end message encryption
- 📍 Location privacy controls
- 👻 Invisible mode
- 🚫 Block and report functionality

---

## 📱 Progressive Web App (PWA)

### PWA Features
- 📱 Installable on mobile and desktop
- 🔄 Offline functionality
- 🔔 Push notifications
- 🎯 App-like experience
- ⚡ Fast loading and caching
- 🔄 Background sync

### Installation
Users can install DateKarle directly from their browser:
1. Visit the website
2. Click "Add to Home Screen" prompt
3. Enjoy the native app experience!

---

## 🤝 Contributing

We welcome contributions from the community! Please check out our [Contributing Guide](CONTRIBUTING.md).

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Code Standards
- ✅ Follow ESLint and Prettier configurations
- 🧪 Write tests for new features
- 📝 Update documentation
- 🎨 Follow the design system
- ♿ Ensure accessibility compliance

### Commit Convention
```
feat: add new swipe animation
fix: resolve chat loading issue
docs: update README
style: improve button hover effects
test: add profile component tests
```

---

## 🚀 Roadmap

### 🎯 Version 1.1 (Next Quarter)
- [ ] Voice messages in chat
- [ ] Video profile introductions
- [ ] AI-powered conversation suggestions
- [ ] Advanced matching preferences
- [ ] Social media integration

### 🎯 Version 1.2 (Future)
- [ ] AR filters for photos
- [ ] Virtual dating experiences
- [ ] Community events and meetups
- [ ] Dating coach integration
- [ ] Personality assessments

---

## 📊 Analytics & Monitoring

### Tracking Events
```typescript
// User engagement
trackEvent('swipe_right', { userId, targetUserId });
trackEvent('message_sent', { conversationId });
trackEvent('profile_viewed', { profileId });

// Conversion tracking
trackEvent('subscription_started', { plan, amount });
trackEvent('match_created', { userId1, userId2 });
```

### Performance Monitoring
- 📈 **Sentry** for error tracking
- 📊 **Google Analytics** for user behavior
- ⚡ **Lighthouse CI** for performance
- 📱 **Firebase Performance** for mobile metrics

---

## 🆘 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Environment Variables Not Loading
```bash
# Check file naming
.env.local       # ✅ Correct
.env             # ❌ Won't work in Vite
```

#### WebSocket Connection Issues
```bash
# Check CORS settings in backend
# Verify VITE_SOCKET_URL is correct
# Check firewall/network restrictions
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/yourusername.png" width="100px;" alt=""/>
      <br />
      <sub><b>Your Name</b></sub>
      <br />
      <sub>Frontend Lead</sub>
    </td>
    <td align="center">
      <img src="https://github.com/designer.png" width="100px;" alt=""/>
      <br />
      <sub><b>Designer Name</b></sub>
      <br />
      <sub>UI/UX Designer</sub>
    </td>
    <td align="center">
      <img src="https://github.com/developer.png" width="100px;" alt=""/>
      <br />
      <sub><b>Developer Name</b></sub>
      <br />
      <sub>React Developer</sub>
    </td>
  </tr>
</table>

---

## 🌟 Acknowledgments

- 💕 Inspired by the need for authentic connections in the digital age
- 🎨 Design inspiration from Material Design and modern dating apps
- 🚀 Built with cutting-edge React ecosystem tools
- 🙏 Thanks to the open-source community
- 🇮🇳 Made with love for bringing people together across India

---

## 📞 Support

<div align="center">
  <p><strong>Need help? We're here for you!</strong></p>
  
  📧 **Email**: support@datekarle.com<br/>
  💬 **Discord**: [Join our community](https://discord.gg/datekarle)<br/>
  📱 **WhatsApp**: +91 XXXX XXXXXX<br/>
  🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/datekarle-frontend/issues)<br/>
  📖 **Docs**: [Full Documentation](https://docs.datekarle.com)<br/>
</div>

---

<div align="center">
  <h3>💕 DateKarle - Yahan Milega Tumhara Pyaar!</h3>
  <p>
    <a href="https://github.com/yourusername/datekarle-frontend">⭐ Star this repository</a>
    if you believe in love!
  </p>
  <p><em>Connect. Match. Fall in Love. 💝</em></p>
</div>