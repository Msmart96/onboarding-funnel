# OnboardPro - Premium Coach Onboarding Funnel

A luxury, conversion-optimized funnel system for coach onboarding services featuring modern Chad CN aesthetic, automated workflows, and standardized VA processes.

## 🎯 Overview

OnboardPro transforms the client onboarding experience for coaches with:
- **Premium "Concierge Futurism" design** with glassmorphism and luxury gradients
- **Multi-step questionnaire** capturing all program requirements
- **Stripe payment integration** with automated flow to next steps
- **Supabase database** for data management
- **Email automation** integration ready
- **48-hour guarantee** workflow

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- Supabase account
- Stripe account

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository>
cd onboarding-funnel
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

3. **Set up Supabase database:**
```bash
# Run the SQL schema in your Supabase SQL editor
cat supabase-schema.sql
```

4. **Start development server:**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the funnel.

## 🔧 Configuration

### Required Environment Variables

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
STRIPE_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
STRIPE_PRICE_ID=price_your_price_id

# Email (Resend)
RESEND_API_KEY=your_resend_key
FROM_EMAIL=noreply@yourdomain.com
```

### Stripe Setup

1. **Create a product** in Stripe Dashboard
2. **Set up webhook** endpoint: `your-domain.com/api/webhooks/stripe`
3. **Configure webhook events:**
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.payment_failed`

### Supabase Setup

1. **Create new project** in Supabase
2. **Run SQL schema** from `supabase-schema.sql`
3. **Configure RLS policies** as needed
4. **Set up storage bucket** for file uploads (optional)

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── next-steps/              # Post-purchase confirmation
│   ├── questionnaire/           # Multi-step intake form
│   └── api/
│       ├── checkout/            # Stripe checkout creation
│       ├── questionnaire/       # Form submission handling
│       └── webhooks/stripe/     # Payment confirmation
├── components/
│   ├── ui/                      # Shadcn/UI components
│   └── checkout-button.tsx      # Payment modal
└── lib/
    ├── supabase.ts             # Database client & types
    └── stripe.ts               # Payment configuration
```

## 🎨 Design System

### Chad CN Luxury Palette
- **Background:** `#020824` (Deep midnight navy)
- **Primary:** `#6B2FFB` (Electric violet)
- **Accent:** `#FFB677` (Warm orange)
- **Surface:** `rgba(255, 255, 255, 0.06)` (Glass effect)

### Custom CSS Classes
- `.glass` - Glassmorphism effect
- `.glass-card` - Card with glass styling
- `.bg-primary-gradient` - Violet gradient
- `.text-gradient` - Multi-color text gradient
- `.btn-glow` - Button glow effect
- `.float` - Floating animation

## 🔄 User Flow

1. **Landing Page** → Premium design showcases value proposition
2. **Checkout Modal** → Collects basic info, redirects to Stripe
3. **Next Steps Page** → Post-purchase confirmation with timeline
4. **Questionnaire** → 4-step intake form for program setup
5. **Automation** → Triggers VA workflow and SOP creation

## 📊 Database Schema

### Main Tables
- `coach_payments` - Stripe payment tracking
- `coach_intake` - Questionnaire responses
- `event_log` - Action tracking
- `file_uploads` - Document management

### Key Features
- UUID primary keys
- Row Level Security (RLS)
- Automatic timestamps
- Event logging function

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Configure custom domain**
4. **Update Stripe webhook URL**

### Environment Variables for Production
Update `.env.local` with production values:
- Change `NEXT_PUBLIC_APP_URL` to your domain
- Use production Stripe keys
- Update Supabase to production instance

## 🔌 Integrations

### Email Automation
- **Resend** for transactional emails
- **Webhook triggers** on payment/submission
- **Templates** for welcome/reminder sequences

### Automation Platform
- **Make.com** or **Zapier** integration ready
- **Google Drive** SOP folder creation
- **Slack/ClickUp** VA notifications

## 📈 Analytics & Tracking

### Built-in Events
- `checkout_initiated`
- `payment_succeeded`
- `questionnaire_submitted`
- Custom event logging available

### Recommended Integrations
- Google Analytics 4
- Meta Pixel
- Hotjar for heatmaps

## 🛠 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Tech Stack
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** with custom design tokens
- **Shadcn/UI** component library
- **Framer Motion** for animations
- **React Hook Form** + Zod validation
- **Supabase** for database
- **Stripe** for payments

## 📝 Customization

### Branding
Update design tokens in `src/app/globals.css`:
```css
:root {
  --primary: #6B2FFB;      /* Your brand color */
  --accent: #FFB677;       /* Your accent color */
  --background: #020824;   /* Your background */
}
```

### Pricing
Update in `src/lib/stripe.ts`:
```typescript
products: {
  onboarding_service: {
    amount: 49700, // $497.00 in cents
    name: 'Your Service Name'
  }
}
```

### Content
- Landing page copy in `src/app/page.tsx`
- Questionnaire questions in `src/app/questionnaire/page.tsx`
- Email templates (integrate with your ESP)

## 🐛 Troubleshooting

### Common Issues

**Stripe webhook not working:**
- Verify webhook URL is accessible
- Check webhook secret matches
- Ensure proper event types selected

**Database connection failed:**
- Verify Supabase URL and keys
- Check RLS policies
- Ensure schema is properly applied

**Build errors:**
- Check TypeScript types
- Verify all environment variables
- Run `npm run lint` for issues

## 📞 Support

For technical support or customization requests:
- Check the `/docs` folder for detailed documentation
- Review the PRD, Architecture, and Visual Guide
- Submit issues for bugs or feature requests

## 📄 License

This project is built for commercial use. See license terms for details.
