# EduGen Study AI (Starter Code)

Production-oriented starter for your requested platform.

## Features included
- Login page (phone OTP mock + Google placeholder)
- Dashboard cards (Learn, Ask Doubt, Quiz)
- Learn form with conditional topics textarea
- Ask Doubt chat page
- File summary/question generator page (MVP text input)
- Quiz generator form and API
- Profile page with streak, quiz count, score, solved count, learn docs
- Prisma schema for real database persistence

## Quick start
1. Install dependencies
   ```bash
   npm install
   ```
2. Configure environment
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client
   ```bash
   npm run prisma:generate
   ```
4. Run migration
   ```bash
   npm run prisma:migrate -- --name init
   ```
5. Start app
   ```bash
   npm run dev
   ```

## Notes
- Set `OPENAI_API_KEY` to enable real AI outputs.
- Phone OTP currently uses dev OTP `123456` and should be replaced with Twilio Verify in production.
- Google OAuth button is UI placeholder; integrate NextAuth/Auth.js next.
