# 📄 Resume Builder Tool

An AI-powered full-stack Resume Builder with live preview, multiple templates, and PDF export.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 7, Tailwind CSS v4 |
| **Backend** | Node.js, Express 5 |
| **Database** | Supabase (PostgreSQL) |
| **AI** | Groq API — Llama 3.3 70B (free tier) |
| **PDF Export** | html2canvas + jsPDF (client-side) |
| **Icons** | Lucide React |
| **Notifications** | React Hot Toast |
| **HTTP Client** | Axios |

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- A free [Supabase](https://supabase.com) account
- A free [Groq](https://console.groq.com) account

### 1. Clone and install dependencies

```bash
# Install root dependencies (concurrently)
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 2. Configure environment variables

Edit `.env` in the project root:

```env
PORT=5000
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
GROQ_API_KEY=your-groq-api-key
```

> **Groq API key**: Sign up at [console.groq.com](https://console.groq.com) → API Keys → Create Key (free, no credit card needed).

### 3. Create the Supabase database table

In your Supabase project → **SQL Editor**, run:

```sql
CREATE TABLE resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 4. Run the app

```bash
# From project root — starts both client and server
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## ✨ Features Implemented

### Resume Editing
- Multi-section form: Personal Info, Professional Summary, Work Experience, Education, Skills, Projects
- Dynamic entries — add/remove multiple Work Experience, Education, and Project entries
- Skill tag input — press Enter or comma to add, click × to remove

### Live Preview
- Real-time A4-format resume preview that updates as you type
- Three resume templates:
  - **Classic** — Two-column, serif typography (free)
  - **Modern** — Gradient header, icon-based contacts (free)
  - **Executive** — Dark header, gold accents, premium feel (locked per session)

### AI Assistance (powered by Groq / Llama 3.3)
- **AI Generate Summary** — Creates a professional summary from your job title and experience
- **AI Improve** — Rewrites work experience descriptions with strong action verbs
- **AI Suggest Skills** — Recommends 5–8 relevant skills for your role

### Data Persistence
- **Save to Supabase** — Stores all resume data in PostgreSQL as JSONB
- **Load on startup** — Automatically reloads your saved resume on page open
- **New Resume** — Clears all fields to start fresh (with confirmation)

### Export
- **Download PDF** — Exports the current live preview as a pixel-perfect PDF

### UI / UX
- Light / Dark theme toggle (☀️ / 🌙) with smooth transitions
- Collapsible form sections
- Sticky form panel with scrollable content
- Responsive header with save timestamp indicator

---

## 📐 Assumptions Made

| Assumption | Rationale |
|-----------|-----------|
| **Single-user flow** | All resume data is stored under a hardcoded `user_id = "default-user"`. No authentication is implemented. |
| **One resume per user** | The Supabase table uses `user_id` as a unique key — saving overwrites the existing resume rather than creating multiple versions. |
| **Client-side PDF export** | `html2canvas` + `jsPDF` is used instead of Puppeteer to avoid server-side headless browser dependencies and keep deployment simple. |
| **Session-scoped premium unlock** | The Executive template "unlock" is stored in React state only and resets on page reload — there is no real payment integration. |
| **Groq free tier is sufficient** | The AI features use Groq's free tier (14,400 requests/day with Llama 3.3 70B), which is more than adequate for personal use. |
| **Vite proxy for API calls** | The frontend uses Vite's dev server proxy (`/api → localhost:5000`) so no CORS issues during development. |

---

## 📁 Project Structure

```
ResumeBuilderTool/
├── client/                    # React + Vite frontend
│   └── src/
│       ├── App.jsx            # Main layout, theme toggle, PDF export
│       ├── index.css          # Design system, light/dark theme variables
│       ├── components/
│       │   ├── ResumeForm.jsx        # Full resume editing form
│       │   ├── TemplateSelector.jsx  # Template picker with lock/unlock
│       │   ├── ResumePreview.jsx     # Template renderer
│       │   └── templates/
│       │       ├── ClassicTemplate.jsx
│       │       ├── ModernTemplate.jsx
│       │       └── ExecutiveTemplate.jsx
│       └── hooks/
│           ├── useResume.js   # Resume state + Supabase persistence
│           └── useAI.js       # Groq AI API calls
├── server/                    # Express backend
│   ├── index.js               # Server entry point
│   ├── supabase.js            # Supabase client
│   └── routes/
│       ├── resume.js          # CRUD endpoints for resume data
│       └── ai.js              # AI endpoints (summary, improve, skills)
├── .env                       # ⚠️ Add your API keys here
└── package.json               # Root scripts (npm run dev)
```
## 📸 Demo Screenshots

### Dark Theme
![Resume Builder Page-Dark Theme](Screenshots\DarkTheme.png)

### Light Theme
![Resume Builder Page-Light Theme](Screenshots\LightTheme.png)