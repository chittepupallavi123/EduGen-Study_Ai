# EduGen Study AI — Complete Step-by-Step Build Guide (VS Code)

This guide shows exactly how to build your full product with a **real backend**, database, authentication, AI features, quiz generation, file upload analysis, profile analytics, and professional UI.

---

## 1) Final Product Scope (what you asked)

### Main features
1. **Auth page**
   - Phone number login (OTP)
   - Google login
2. **Dashboard with 3 boxes**
   - Learn
   - Ask Doubt
   - Quiz
3. **Learn flow**
   - Subject input
   - Mode: `Whole Subject` or `Topics`
   - Topic textbox appears only when `Topics` is selected
   - Generate button
   - AI creates structured learning path with topic-wise explanation, examples, and visuals (when needed)
4. **Ask Doubt flow**
   - AI Chat option
   - File upload option (PDF/Word/PPT)
   - AI summarizes file + generates questions
5. **Quiz flow**
   - Subject + topics form
   - Generate button
   - AI creates 20–30 questions
6. **Profile page**
   - Credentials
   - Streak
   - Quiz count
   - Score
   - Number of solved questions
   - Files generated in Learn module
7. **Professional aesthetic UI**
   - Main palette: `#3e1673`, `#580959`, `#73063a`, `#526609`, `#075c36`, `#0b1940`, `#b3580e`

---

## 2) Recommended Production Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend API**: Next.js Route Handlers (or separate NestJS/Express if preferred)
- **Database**: PostgreSQL (Neon/Supabase/Railway)
- **ORM**: Prisma
- **Auth**:
  - Google OAuth via NextAuth/Auth.js
  - Phone OTP via Twilio Verify
- **AI**: OpenAI API (chat, summarization, quiz generation, learning plan generation)
- **File processing**:
  - Upload: UploadThing or S3-compatible storage
  - Parsing: pdf-parse, mammoth (docx), pptx parser
- **Charts/graphs**: Recharts + Mermaid + quickchart (for pie/bar images)
- **Deployment**:
  - Frontend/backend: Vercel
  - DB: Neon/Supabase
  - File storage: S3/Cloudflare R2/Supabase Storage

---

## 3) Accounts to Create (Do this first)

Open VS Code terminal and browser side-by-side and create these accounts:

1. **GitHub** (for code repo)
2. **Vercel** (deploy web app)
3. **Neon or Supabase** (PostgreSQL DB)
4. **OpenAI platform** (API key)
5. **Google Cloud Console**
   - OAuth consent screen
   - OAuth client ID + secret
6. **Twilio**
   - Verify service for phone OTP
7. (Optional) **UploadThing / AWS S3 / Cloudflare R2** for file uploads

Keep all API keys in a secure password manager.

---

## 4) Project Setup in VS Code

```bash
npx create-next-app@latest edugen-study-ai --typescript --tailwind --eslint --app
cd edugen-study-ai
npm install prisma @prisma/client zod react-hook-form @hookform/resolvers
npm install next-auth
npm install openai
npm install twilio
npm install pdf-parse mammoth
npm install recharts
npm install dayjs
```

Initialize Prisma:

```bash
npx prisma init
```

Create `.env` and fill values:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
OPENAI_API_KEY="..."
TWILIO_ACCOUNT_SID="..."
TWILIO_AUTH_TOKEN="..."
TWILIO_VERIFY_SERVICE_SID="..."
```

---

## 5) Database Design (Prisma models)

Use these core entities:

- `User`
- `ProfileStats` (streak, quizCount, score, solvedCount)
- `LearnRequest`
- `LearnDocument` (generated learning output)
- `DoubtChatSession`
- `DoubtMessage`
- `UploadedFile`
- `FileSummary`
- `Quiz`
- `QuizQuestion`
- `QuizAttempt`

Then run:

```bash
npx prisma migrate dev --name init
npx prisma studio
```

Use Prisma Studio to verify tables.

---

## 6) Authentication Implementation

### A) Google Login
1. Configure Google OAuth in Google Cloud.
2. Add redirect URI:
   - `http://localhost:3000/api/auth/callback/google`
3. Setup NextAuth provider for Google.
4. Create login UI button: “Continue with Google”.

### B) Phone OTP Login
1. Create Twilio Verify service.
2. Build backend endpoints:
   - `POST /api/auth/phone/send-otp`
   - `POST /api/auth/phone/verify-otp`
3. Login page flow:
   - Enter phone number
   - Click Send OTP
   - Enter OTP
   - Verify and create/login user

---

## 7) UI Structure (Pages)

- `/login` → phone + Google login/register
- `/dashboard` → 3 feature cards (Learn, Ask Doubt, Quiz)
- `/learn` → form + generated output viewer
- `/ask-doubt` → choose AI Chat or File Upload
- `/ask-doubt/chat` → chat UI
- `/ask-doubt/upload` → upload + summary + generated questions
- `/quiz` → quiz generation form + quiz attempt view
- `/profile` → metrics + generated files list

Use protected routes (middleware) so only logged-in users access feature pages.

---

## 8) Learn Module — Exact Flow

### Frontend behavior
- Subject input (required)
- Radio/select options:
  - Whole Subject
  - Topics
- Show topics textbox only if Topics selected
- Generate button

### Backend behavior (`POST /api/learn/generate`)
Input:

```json
{
  "subject": "Biology",
  "mode": "topics",
  "topics": ["Cell", "Photosynthesis"],
  "userId": "..."
}
```

Process:
1. Validate input with Zod.
2. Build AI prompt requesting:
   - Learning path
   - Topic-wise easy explanation
   - examples
   - where useful: table, chart suggestion, diagram notes
3. Save response into `LearnDocument`.
4. Return structured JSON to render nicely.

Output sections suggestion:
- Overview
- Prerequisites
- Learning Path (week/day wise)
- Topic Breakdown
- Examples
- Practice tasks
- Visual suggestions

---

## 9) Ask Doubt Module — Exact Flow

### Option A: AI Chat
- Create a chat session row
- Store each message (`user`/`assistant`) in DB
- Use streaming response (optional but recommended)
- Provide contextual answers with examples

API:
- `POST /api/doubt/chat`

### Option B: File Upload + Summary + Questions
- Upload file (PDF/DOCX/PPT)
- Extract text
- Send to AI:
  - Generate concise summary
  - Generate key points
  - Generate practice questions
- Save in DB linked to uploaded file

APIs:
- `POST /api/doubt/upload`
- `POST /api/doubt/summarize`

Security limits:
- Max file size (e.g., 10MB)
- Allowed MIME types only
- Virus scan if possible in production

---

## 10) Quiz Module — Exact Flow

### Frontend form
- Subject
- Topics
- Generate button

### Backend (`POST /api/quiz/generate`)
- Prompt AI to return 20–30 questions in JSON format:
  - MCQ + options + correct answer + explanation
- Validate JSON schema
- Save quiz + questions in DB
- Display quiz UI

### Attempt tracking
- When user submits quiz:
  - calculate score
  - increment `quizCount`
  - increment `solvedCount`
  - update streak logic

---

## 11) Profile Page Logic

Show:
- Name/email/phone
- Streak
- Quiz count
- Total score / average score
- Solved question count
- List of generated Learn files

APIs:
- `GET /api/profile`
- `GET /api/profile/learn-files`

Streak logic (simple):
- If user activity on consecutive day: streak +1
- If day gap >1: streak reset to 1

---

## 12) UI/UX Styling Plan (Aesthetic + Professional)

Use these as theme tokens:
- Primary: `#3e1673`
- Secondary: `#580959`
- Accent1: `#73063a`
- Accent2: `#526609`
- Accent3: `#075c36`
- Dark: `#0b1940`
- Highlight: `#b3580e`

Design tips:
- Gradient hero backgrounds (dark purple to deep blue)
- Glassmorphism cards with subtle borders
- Smooth hover animation on cards/buttons
- Consistent icon system (Lucide icons)
- Clean spacing, 8px grid
- Mobile responsive from day 1

---

## 13) Suggested Folder Structure

```txt
src/
  app/
    (auth)/login/page.tsx
    dashboard/page.tsx
    learn/page.tsx
    ask-doubt/page.tsx
    ask-doubt/chat/page.tsx
    ask-doubt/upload/page.tsx
    quiz/page.tsx
    profile/page.tsx
    api/
      auth/
      learn/
      doubt/
      quiz/
      profile/
  components/
    ui/
    auth/
    dashboard/
    learn/
    doubt/
    quiz/
    profile/
  lib/
    prisma.ts
    auth.ts
    ai.ts
    validators/
  styles/
```

---

## 14) Development Order (Do in this sequence)

1. Setup project + DB + Prisma
2. Build auth (Google + Phone OTP)
3. Build protected dashboard page
4. Build Learn UI + API + DB save
5. Build Ask Doubt chat
6. Build file upload + summarizer + question generation
7. Build quiz generation + attempt scoring
8. Build profile analytics page
9. Add charts/graphs/tables rendering in Learn output
10. Add rate limiting + logging + error handling
11. Full testing
12. Deploy and connect production env vars

---

## 15) Testing Checklist

- Auth works for Google and phone OTP
- Protected routes block anonymous users
- Learn form conditional topics textbox works
- AI generate returns valid structured response
- File upload accepts only allowed formats
- Summary/questions generated for uploaded file
- Quiz generates 20–30 questions consistently
- Quiz scoring updates profile stats
- Streak updates correctly
- Profile displays all expected fields
- Mobile responsiveness across key pages

---

## 16) Deployment Steps

1. Push code to GitHub.
2. Import repo into Vercel.
3. Add all env vars in Vercel project settings.
4. Run Prisma migrations on production DB.
5. Set Google OAuth production callback URL.
6. Set Twilio allowed domain and production config.
7. Test full flow on production URL.

---

## 17) MVP Timeline (Realistic)

- Week 1: Auth + dashboard + base UI
- Week 2: Learn module + DB persistence
- Week 3: Ask Doubt chat + file summarizer
- Week 4: Quiz + profile + deployment + polish

---

## 18) What to Build First Today (Immediate Action)

If starting now in VS Code:

1. Create Next.js app
2. Setup Prisma and PostgreSQL
3. Implement Google login
4. Implement phone OTP endpoints
5. Make dashboard with 3 cards
6. Build Learn form with conditional topic input

After this, you will already have a working foundation and can continue module by module.

