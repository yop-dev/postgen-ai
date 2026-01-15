# PostGen AI 🚀

> **"See your LinkedIn post before you publish it"**

PostGen AI is a powerful SaaS application that helps LinkedIn creators generate professional, engaging posts with AI-powered captions and images. Preview your posts exactly as they'll appear on LinkedIn before publishing.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC)](https://tailwindcss.com/)

## ✨ Features

- 🤖 **AI-Powered Content Generation** - Generate 3 caption variants using Groq AI
- 🎨 **Professional Image Creation** - Create stunning visuals with Pollinations AI
- 👀 **LinkedIn Preview** - See exactly how your post will look before publishing
- 📋 **One-Click Copy** - Copy captions to clipboard instantly
- 💾 **Download Images** - Download generated images directly
- 📊 **Generation History** - Track all your past generations
- 💳 **Flexible Pricing** - Free tier with 3 generations, Pro tier with unlimited access
- 🔐 **Secure Authentication** - Powered by Clerk
- 💰 **Stripe Integration** - Seamless subscription management

## 🛠 Tech Stack

### Frontend & Backend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **UI Components:** Radix UI

### Database & ORM
- **Database:** Neon Postgres
- **ORM:** Prisma

### Authentication & Payments
- **Auth:** Clerk (Email, Google, LinkedIn)
- **Payments:** Stripe (Subscriptions & Checkout)

### AI Services
- **Text Generation:** Groq AI (fast, cost-effective)
- **Image Generation:** Pollinations AI (free tier available)

### Infrastructure
- **Deployment:** Vercel
- **Analytics:** PostHog

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Neon Postgres database
- Clerk account for authentication
- Stripe account for payments
- Groq API key
- Pollinations API key (optional, works without for free tier)
- PostHog account (optional, for analytics)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/postgenai.git
cd postgenai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Then fill in your environment variables:

```env
# Database (Neon Postgres)
DATABASE_URL="postgresql://username:password@your-neon-host.neon.tech/database?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_publishable_key_here"
CLERK_SECRET_KEY="sk_test_your_secret_key_here"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/app"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"
CLERK_WEBHOOK_SECRET="whsec_your_webhook_secret_here"

# Groq (Fast Text Generation)
GROQ_API_KEY="gsk_your_groq_api_key_here"

# Pollinations AI (Image Generation)
POLLINATIONS_API_KEY="sk_your_pollinations_api_key_here"

# Stripe
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key_here"
STRIPE_WEBHOOK_SECRET="whsec_your_stripe_webhook_secret_here"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key_here"
STRIPE_PRO_MONTHLY_PRICE_ID="price_your_stripe_price_id_here"

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY="phc_your_posthog_key_here"
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Set up the database

Run Prisma migrations:

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
postgenai/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (marketing)/       # Landing page
│   │   ├── app/               # Protected app routes
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   └── ...               # Custom components
│   ├── lib/                   # Utility libraries
│   │   ├── db.ts             # Prisma client
│   │   └── utils.ts          # Helper functions
│   └── types/                 # TypeScript types
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
└── ...config files
```

## 🗄 Database Schema

The application uses the following main models:

- **User** - User accounts with plan information
- **UserProfile** - User preferences and settings
- **Generation** - Post generation records
- **Variant** - Caption variants for each generation
- **PlanUsage** - Usage tracking for free tier limits

See `prisma/schema.prisma` for the complete schema.

## 🔐 Environment Setup Guide

### Clerk Setup
1. Create a Clerk application at [clerk.com](https://clerk.com)
2. Enable Email, Google, and LinkedIn authentication
3. Set up webhooks for user synchronization
4. Copy your publishable and secret keys

### Stripe Setup
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create a product for "Pro Monthly" subscription
3. Set up webhook endpoints for subscription events
4. Copy your API keys and webhook secret

### Groq Setup
1. Sign up at [groq.com](https://groq.com)
2. Generate an API key
3. Add to your `.env` file

### Pollinations AI Setup
1. Visit [enter.pollinations.ai](https://enter.pollinations.ai)
2. Create an account and get an API key (optional)
3. Free tier works without authentication

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add all environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Post-Deployment Checklist

- [ ] Configure custom domain
- [ ] Set up Clerk webhooks with production URL
- [ ] Set up Stripe webhooks with production URL
- [ ] Update `NEXT_PUBLIC_APP_URL` to production URL
- [ ] Test authentication flow
- [ ] Test payment flow
- [ ] Verify analytics tracking

## 💰 Pricing Tiers

### Free Plan
- 3 lifetime generations
- Caption generation with 3 variants
- 1 image per generation
- LinkedIn preview

### Pro Plan ($15/month)
- Unlimited generations
- High-resolution images
- Full generation history
- Priority support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Clerk](https://clerk.com/) - Authentication
- [Stripe](https://stripe.com/) - Payment processing
- [Prisma](https://www.prisma.io/) - Database ORM
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Groq](https://groq.com/) - AI text generation
- [Pollinations AI](https://pollinations.ai/) - AI image generation

## 📧 Support

For support, email your-email@example.com or open an issue on GitHub.

---

**Built with ❤️ for LinkedIn creators**
