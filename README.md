# HealthAI – Provider Data Validation Platform

An enterprise-grade AI-powered healthcare provider directory validation system. This demo showcases an agentic AI orchestration approach to automatically validate, enrich, and score provider data.

## Problem Statement

Healthcare payer provider directories suffer from **80%+ incorrect data** (phone, address, license, specialty). Manual validation takes weeks and causes member complaints and compliance risk.

## Solution

HealthAI demonstrates an **Agentic AI system** that automatically:
- ✅ Validates provider data (phone, address, license)
- ✅ Enriches data with external sources (NPI registry, state medical boards)
- ✅ Scores confidence and flags high-risk records
- ✅ Routes for human review when confidence < 85%

## Features

- **AI Agent Orchestration**: 4 sequential agents (Data Validation → Enrichment → QA → Directory Management)
- **Real-time Progress Visualization**: Live agent logs and status updates
- **Confidence Scoring**: Automatic approval for high-confidence records
- **Human Review Interface**: Flagged records queued for manual verification
- **Enterprise UI**: Dark theme, smooth animations, professional UX

## Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Backend**: Fake (JavaScript simulation) — Ready for real API integration
- **State Management**: React Hooks

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/healthai.git
cd healthai

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1. **Login** → Enter dashboard (demo auth, no credentials required)
2. **Upload Data** → Use sample data (50 realistic provider records)
3. **Watch Validation** → 4 AI agents process data sequentially
4. **Review Results** → See confidence scores and approval status
5. **Human Review** → Approve/reject flagged providers

## Project Structure

```
src/
├── pages/
│   ├── LoginPage.jsx           # Fake login screen
│   ├── DashboardPage.jsx       # Main dashboard with metrics
│   ├── UploadPage.jsx          # Data upload & preview
│   ├── ValidationProgressPage.jsx  # AI agent orchestration
│   └── ResultsPage.jsx         # Validation results & review
├── components/
│   ├── Button.jsx              # Reusable button
│   ├── StatCard.jsx            # Metric cards
│   ├── ProgressStep.jsx        # Agent progress indicator
│   ├── LogEntry.jsx            # Log line component
│   └── Badge.jsx               # Status badge
├── utils/
│   └── fakeBackend.js          # Fake validation logic
└── App.jsx                     # Main app with routing
```

## Fake Backend Logic

Currently, the backend is **fully simulated** using JavaScript:

- **Data Validation**: Random 15% error rate on phone numbers
- **Address Validation**: Random 10% error rate
- **License Validation**: Random 8% error rate
- **Confidence Scoring**: Calculated from validation results (0-100%)
- **Auto-Approval Threshold**: ≥85% confidence

**To integrate real backend:**
1. Replace functions in `src/utils/fakeBackend.js` with API calls
2. Update `ValidationProgressPage.jsx` to call real endpoints
3. Add authentication with JWT tokens

## Demo Flow

```
Login (fake) 
  ↓
Dashboard (metrics overview)
  ↓
Upload (select sample data)
  ↓
Validation Progress (watch 4 AI agents work)
  ↓
Results (review & approve/reject providers)
```

## Key Components

### Validation Agents

1. **Data Validation Agent** - Format checking, deduplication, normalization
2. **Information Enrichment Agent** - NPI registry, state boards, geocoding
3. **Quality Assurance Agent** - Phone/address/license validation
4. **Directory Management Agent** - Scoring and recommendation

### Confidence Score Logic

```javascript
confidence = 100
- (phoneValid ? 0 : 25)
- (addressValid ? 0 : 20)
- (licenseValid ? 0 : 30)

action = confidence >= 85 ? 'auto-approved' : 'needs-review'
```

## UI Features

- 🌙 **Dark Enterprise Theme** - Professional SaaS look
- ⚡ **Smooth Animations** - Progress spinners, transitions
- 📊 **Real-time Logs** - Live agent activity feed
- 🎯 **Clear Status Indicators** - Success, warning, error states
- 📱 **Responsive Design** - Mobile-friendly layout

## Future Enhancements

- [ ] Real backend API integration
- [ ] JWT authentication
- [ ] Database persistence (PostgreSQL)
- [ ] Real NPI registry integration
- [ ] Batch import (CSV/Excel)
- [ ] Export results (PDF/Excel)
- [ ] Compliance reporting
- [ ] Audit trails
- [ ] Provider search & filter
- [ ] Notification system

## Building for Production

```bash
npm run build
```

Output will be in `dist/` folder.

## License

MIT

## Contact

Built for EY Hackathon Challenge VI – IT/BPM (Firstsource)

---

**Note**: This is a frontend-first demo. Backend accuracy is simulated. Real implementation will integrate actual healthcare data validation APIs.
