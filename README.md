# Resurrection Temple — resurrectiontemple.com
## Netlify + Railway Deployment Guide

### Architecture
Netlify serves all HTML/CSS/JS from public/
Railway runs the Node.js API server (~$5/month)
/api/* requests are proxied from Netlify → Railway

---

## STEP 1 — Push to GitHub

From the rt-site/ folder in terminal:

  git init
  git add .
  git commit -m "Initial commit — Resurrection Temple v2.0"
  git remote add origin https://github.com/YOUR_USERNAME/resurrection-temple-site.git
  git push -u origin main

---

## STEP 2 — Deploy API to Railway

1. Go to railway.app → New Project → Deploy from GitHub repo
2. Select your resurrection-temple-site repo
3. Railway auto-detects Node.js and uses railway.json

Set these Environment Variables in Railway dashboard (Variables tab):

  PORT                  = 3000
  NODE_ENV              = production
  ADMIN_PASS            = YourStrongPassword123!
  EMAIL_HOST            = smtp.gmail.com
  EMAIL_PORT            = 587
  EMAIL_USER            = cmayweather@ResurrectionTemple.org
  EMAIL_PASS            = your_gmail_app_password
  NOTIFY_EMAIL          = cmayweather@ResurrectionTemple.org
  STRIPE_PK             = pk_live_...
  STRIPE_SK             = sk_live_...
  STRIPE_WEBHOOK_SECRET = whsec_...

4. After deploy, copy your Railway URL (e.g. https://rt-site-production.up.railway.app)

Gmail App Password: myaccount.google.com → Security → App Passwords → Generate

---

## STEP 3 — Update netlify.toml with your Railway URL

Open netlify.toml, find this line and replace YOUR_RAILWAY_URL:

  to = "https://YOUR_RAILWAY_URL/api/:splat"

Then: git add netlify.toml && git commit -m "Add Railway URL" && git push

---

## STEP 4 — Deploy Frontend to Netlify

1. netlify.com → Add new site → Import from Git → select your repo
2. Publish directory: public  |  Build command: (leave blank)
3. Click Deploy — it reads netlify.toml automatically

---

## STEP 5 — Connect resurrectiontemple.com

In Netlify: Site settings → Domain management → Add custom domain → resurrectiontemple.com
Netlify gives you nameservers (e.g. dns1.p01.nsone.net)

In GoDaddy: My Products → resurrectiontemple.com → DNS → Change Nameservers
Paste Netlify's nameservers → Save → Wait 10-30 min

SSL certificate is provisioned automatically by Netlify. Free.

---

## STEP 6 — Verify

  https://www.resurrectiontemple.com/           → Homepage
  https://www.resurrectiontemple.com/portal/    → Client portal
  https://www.resurrectiontemple.com/admin/     → Admin dashboard
  https://www.resurrectiontemple.com/api/health → {"ok":true}

---

## STEP 7 — Stripe Webhook

1. dashboard.stripe.com → Developers → Webhooks → Add endpoint
2. URL: https://www.resurrectiontemple.com/api/stripe-webhook
3. Event: payment_intent.succeeded
4. Copy signing secret → add to Railway as STRIPE_WEBHOOK_SECRET

---

## Admin Dashboard

URL: https://www.resurrectiontemple.com/admin
Password: whatever you set as ADMIN_PASS in Railway

Features: View all submissions, filter/search, expand details,
          one-click email reply, CSV export

---

## Updating After Launch

  git add .
  git commit -m "describe change"
  git push

Both Netlify and Railway auto-deploy. Live in ~60 seconds.

---

## Monthly Cost

  Netlify Starter:    Free
  Railway Hobby:      ~$5/month
  Domain (GoDaddy):   ~$15/year
  Stripe:             2.9% + 30c per transaction
  Total fixed:        ~$5/month
