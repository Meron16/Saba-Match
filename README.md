# Saba Match - Safe Digital Job Matching for Girls

Saba Match is a secure, innovative platform designed specifically for girls and women to find remote work opportunities from the safety of their homes. Our platform addresses Technology-Facilitated Gender-Based Violence (TFGBV) by providing verified companies, safe communication channels, and comprehensive digital safety features.

## 🎯 Project Overview

Saba Match empowers girls and women to build their careers through safe, remote work opportunities. We prioritize digital safety, privacy protection, and work-from-home flexibility to create a secure environment for professional growth.

## ✨ Key Features

### Digital Safety First
- **Company Verification**: All companies are verified before posting jobs
- **Secure Communication**: Safe messaging channels with harassment detection
- **Privacy Protection**: Your personal information is protected and controlled
- **Safe Profile Building**: Create profiles with privacy controls

### Remote Work Focus
- **Work from Home**: All opportunities are remote-friendly
- **Virtual Interviews**: Conduct interviews safely from home
- **Flexible Applications**: Apply from anywhere, anytime
- **No Travel Required**: No need to meet in person until you're comfortable

### Smart Job Matching
- **AI-Powered Matching**: Intelligent algorithms match your skills with opportunities
- **Skill-Based Matching**: Focus on abilities, not gender
- **Personalized Recommendations**: Get job suggestions tailored to your profile
- **Bias-Free System**: Active measures to eliminate gender bias

## 🏆 Hackathon Evaluation Criteria Alignment

### Relevance to TFGBV and Digital Safety (25%)
✅ **Directly addresses challenges faced by women and girls in digital spaces:**
- Verified company system prevents fake/scam job postings
- Secure communication channels protect against harassment
- Privacy controls allow users to share only what they're comfortable with
- Harassment detection and reporting system
- Safe virtual interview platform

### Innovation and Creativity (20%)
✅ **Original approach to job matching:**
- First platform specifically designed for girls/women in the region
- Safety-first design philosophy integrated into every feature
- AI-powered matching with bias detection
- Remote work focus addresses mobility and safety concerns
- Innovative verification and safety systems

### Technical Functionality (20%)
✅ **Stable, usable, and well-developed:**
- Built with Next.js 16 and React 19
- AI-powered resume screening and candidate matching
- Real-time job matching and notifications
- Secure authentication and data protection
- Responsive design for all devices

### Feasibility and Sustainability (15%)
✅ **Realistic implementation and scalability:**
- Uses modern, scalable tech stack (Next.js, Prisma, SQLite)
- Modular architecture for easy maintenance
- Can integrate with payment systems for sustainability
- Open to partnerships with organizations supporting women
- Clear path to expansion and feature additions

### User-Centered Design (10%)
✅ **Accessible, inclusive, and responsive:**
- Bilingual support (English and Amharic)
- Intuitive user interface designed for ease of use
- Privacy controls and user preferences
- Mobile-responsive design
- Clear safety guidelines and help resources

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd saba-match
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file:
```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY=your_openai_api_key_here
```

4. Initialize the database:
```bash
npm run prisma:generate
npm run prisma:push
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   └── ...
├── Components/            # React components
│   ├── Home/             # Home page components
│   ├── Layout/           # Layout components
│   └── ...
├── lib/                   # Utility libraries
│   ├── ai/               # AI services
│   ├── i18n/             # Internationalization
│   └── ...
├── modules/               # Feature modules
│   ├── ai-screening/     # AI screening module
│   ├── jobs/             # Job management
│   └── users/            # User management
└── prisma/               # Database schema
```

## 🔒 Safety Features

- **Company Verification**: All companies must be verified before posting
- **Secure Messaging**: Encrypted communication channels
- **Harassment Detection**: AI-powered detection of inappropriate behavior
- **Privacy Controls**: Users control what information is shared
- **Reporting System**: Easy reporting of safety concerns
- **Safe Interviews**: Virtual interview platform with safety features

## 🌍 Internationalization

Saba Match supports multiple languages:
- English
- Amharic (አማርኛ)

## 🤝 Contributing

This is a hackathon project. Contributions and feedback are welcome!

## 📝 License

This project is created for the hackathon.

## 🙏 Acknowledgments

Built with a focus on empowering girls and women through safe, accessible remote work opportunities.

---

**Saba Match** - Empowering Girls Through Safe Digital Job Matching
