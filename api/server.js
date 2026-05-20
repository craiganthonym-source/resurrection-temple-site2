/* ══════════════════════════════════════════════════════════════
   RESURRECTION TEMPLE — API SERVER
   Node.js + Express
   ══════════════════════════════════════════════════════════════ */

'use strict';

require('dotenv').config();
const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');
const helmet     = require('helmet');
const rateLimit  = require('express-rate-limit');
const path       = require('path');
const { v4: uuidv4 } = require('uuid');
const fs         = require('fs');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── MIDDLEWARE ──────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: ['https://www.resurrectiontemple.com', 'https://resurrectiontemple.com', 'http://localhost:3000'] }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiter for form submissions
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { ok: false, error: 'Too many submissions. Please try again in 15 minutes.' }
});

// ── STATIC FILES ────────────────────────────────────────────────────
const PUBLIC = path.join(__dirname, '..', 'public');
const PORTAL = path.join(__dirname, '..', 'portal');

app.use(express.static(PUBLIC));
app.use('/portal', express.static(PORTAL));

// ── EMAIL TRANSPORTER ───────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST || 'smtp.gmail.com',
  port:   parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ── EMAIL HELPER ────────────────────────────────────────────────────
async function sendNotification(subject, htmlBody) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('[EMAIL SKIPPED — no credentials configured]\n', subject);
    return;
  }
  await transporter.sendMail({
    from:    `"Resurrection Temple Website" <${process.env.EMAIL_USER}>`,
    to:      process.env.NOTIFY_EMAIL || 'cmayweather@ResurrectionTemple.org',
    subject: `[RT Website] ${subject}`,
    html:    htmlBody
  });
}

async function sendAutoReply(toEmail, toName, formType) {
  if (!process.env.EMAIL_USER || !toEmail) return;
  const messages = {
    'client-intake':    'Your client intake form has been received. A member of our team will review your submission and contact you within 24 business hours.',
    'general-contact':  'Your message has been received. We will respond within 24–48 business hours.',
    'invoice-request':  'Your invoice request has been received. We will confirm your total and send payment instructions within 24 hours.',
    'default':          'Your submission has been received. We will be in touch shortly.'
  };
  await transporter.sendMail({
    from:    `"Resurrection Temple Ministries" <${process.env.EMAIL_USER}>`,
    to:      toEmail,
    subject: 'Resurrection Temple Ministries — Submission Received',
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:2rem;color:#1A1A1A;">
        <div style="border-bottom:2px solid #C9A84C;padding-bottom:1rem;margin-bottom:1.5rem;">
          <h2 style="font-weight:400;color:#1A1A1A;margin:0;">Resurrection Temple Ministries</h2>
          <p style="font-size:12px;color:#888;margin:4px 0 0;">resurrectiontemple.com · (626) 479-1082</p>
        </div>
        <p>Dear ${toName || 'Client'},</p>
        <p>${messages[formType] || messages['default']}</p>
        <p>If you have any immediate questions, please call us at <strong>(626) 479-1082</strong> or reply to this email.</p>
        <p style="margin-top:2rem;">With purpose,<br><strong>Craig A. Mayweather</strong><br>President, Resurrection Temple Ministries</p>
        <div style="margin-top:2rem;padding-top:1rem;border-top:1px solid #eee;font-size:11px;color:#999;">
          301 E Arrow Hwy Ste 101-#815 · San Dimas, CA 91773<br>
          cmayweather@ResurrectionTemple.org · resurrectiontemple.com
        </div>
      </div>
    `
  });
}

// ── DATA STORE (flat JSON — swap for DB in production) ──────────────
const DATA_FILE = path.join(__dirname, 'submissions.json');
function loadData() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch { return []; }
}
function saveData(submissions) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
}

// ── CONTACT / FORM API ──────────────────────────────────────────────
app.post('/api/contact', formLimiter, async (req, res) => {
  try {
    const { formType = 'general-contact', name, email, ...rest } = req.body;

    // Basic validation
    if (!name || name.trim().length < 2) return res.status(400).json({ ok: false, error: 'Name is required.' });

    const id = uuidv4();
    const timestamp = new Date().toISOString();
    const record = { id, timestamp, formType, name, email, ...rest };

    // Save to JSON store
    const submissions = loadData();
    submissions.push(record);
    saveData(submissions);

    // Build notification email
    const fieldRows = Object.entries({ name, email, ...rest })
      .filter(([k]) => !['formType'].includes(k))
      .map(([k, v]) => `<tr><td style="padding:6px 10px;color:#666;font-size:12px;border-bottom:1px solid #f0f0f0;">${k}</td><td style="padding:6px 10px;font-size:12px;border-bottom:1px solid #f0f0f0;">${v || '—'}</td></tr>`)
      .join('');

    await sendNotification(
      `New ${formType} from ${name}`,
      `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
        <h2 style="background:#1A1A1A;color:#C9A84C;padding:1rem 1.5rem;margin:0;">New Submission: ${formType}</h2>
        <table style="width:100%;border-collapse:collapse;margin:1rem 0;">
          <tr><td style="padding:6px 10px;color:#666;font-size:12px;border-bottom:1px solid #f0f0f0;">Submission ID</td><td style="padding:6px 10px;font-size:12px;border-bottom:1px solid #f0f0f0;">${id}</td></tr>
          <tr><td style="padding:6px 10px;color:#666;font-size:12px;border-bottom:1px solid #f0f0f0;">Timestamp</td><td style="padding:6px 10px;font-size:12px;border-bottom:1px solid #f0f0f0;">${timestamp}</td></tr>
          ${fieldRows}
        </table>
      </div>`
    );

    // Auto-reply to client
    if (email) await sendAutoReply(email, name, formType);

    res.json({ ok: true, id });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ ok: false, error: 'Server error. Please try again.' });
  }
});

// ── SUBMISSIONS VIEWER (basic admin — add auth before going live) ────
app.get('/api/submissions', (req, res) => {
  // TODO: Add authentication middleware here before deploying
  const submissions = loadData();
  res.json({ count: submissions.length, submissions });
});

// ── HEALTH CHECK ────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString(), version: '1.0.0' });
});

// ── SPA FALLBACK ROUTES ─────────────────────────────────────────────
app.get('/portal', (req, res) => res.sendFile(path.join(PORTAL, 'index.html')));
app.get('/pages/rt-music', (req, res) => res.sendFile(path.join(PUBLIC, 'pages', 'rt-music.html')));
app.get('/portal/intake', (req, res) => res.sendFile(path.join(PORTAL, 'intake.html')));
app.get('/portal/contracts', (req, res) => res.sendFile(path.join(PORTAL, 'contracts.html')));
app.get('/portal/invoice', (req, res) => res.sendFile(path.join(PORTAL, 'invoice.html')));
app.get('/portal/pricing', (req, res) => res.sendFile(path.join(PORTAL, 'pricing.html')));
app.get('/pages/:page', (req, res) => {
  const file = path.join(PUBLIC, 'pages', `${req.params.page}.html`);
  if (fs.existsSync(file)) res.sendFile(file);
  else res.status(404).sendFile(path.join(PUBLIC, '404.html'));
});
app.get('*', (req, res) => res.sendFile(path.join(PUBLIC, 'index.html')));

// ── STRIPE ───────────────────────────────────────────────────────────
const stripe = process.env.STRIPE_SK
  ? require('stripe')(process.env.STRIPE_SK)
  : null;

// ── RT MUSIC — TRACK CATALOG ─────────────────────────────────────────
const MUSIC_CATALOG = {
  price_intro:          { title: 'Intro',           file: '1INTRO_1.mp3' },
  price_by_design:      { title: 'By Design',        file: '3BY_DESIGN_1.mp3' },
  price_chump_change:   { title: 'Chump Change',     file: '2CHUMP_CHANGE_1.mp3' },
  price_souljah:        { title: 'Souljah',          file: '10SOULJAH_1.mp3' },
  price_givin_it_up:    { title: "Givin' It Up",     file: '5GIVIN__IT_UP_2.mp3' },
  price_redeemed:       { title: 'Redeemed',         file: '6REDEEMED_1.mp3' },
  price_mic_doctor:     { title: 'Mic Doctor',       file: '13MIC_DOCTOR_NEW.mp3' },
  price_back_in_days:   { title: 'Back N The Days',  file: '4BACK_IN_THE_DAYS_1.mp3' },
  price_without_god:    { title: 'Without God',      file: '12WITHOUT_GOD_3.mp3' },
  price_street_ties:    { title: 'Street Ties',      file: '8STREET_TIES_1.mp3' },
  price_heart_2_heart:  { title: 'Heart 2 Heart',    file: '9HEART_2_HEART_1.mp3' },
  price_crowned:        { title: 'Crowned',          file: '11CROWNED_1.mp3' },
  price_mo_love:        { title: "Mo' Love",         file: '12MO_LOVE_1.mp3' },
  price_rollin_legit:   { title: "Rollin' Legit",    file: '14ROLLIN_LEGIT_new3.mp3' },
  price_i_live_for_you: { title: 'I Live For You',   file: '16I_LIVE_FOR_YOU_2.mp3' },
  price_time_2_shine:   { title: 'Time 2 Shine',     file: '17TIME_2_SHINE_1.mp3' },
  price_need_to_know:   { title: 'Need To Know',     file: '15NEED_TO_KNOW_2.mp3' },
};

// ── POST /api/create-payment-intent ──────────────────────────────────
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    if (!stripe) return res.status(500).json({ error: 'Stripe not configured. Set STRIPE_SK in Railway variables.' });

    const { amount, description, trackFile, album } = req.body;
    const validAmounts = [99, 999];
    if (!validAmounts.includes(amount)) return res.status(400).json({ error: 'Invalid amount.' });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      description,
      metadata: {
        trackFile: trackFile || 'full_album',
        album: album ? 'true' : 'false',
        source: 'RT Music — By Design'
      }
    });

    const downloadUrl = album
      ? `/api/download-album?token=${paymentIntent.id}`
      : `/api/download?token=${paymentIntent.id}&file=${encodeURIComponent(trackFile)}`;

    res.json({ clientSecret: paymentIntent.client_secret, downloadUrl });
  } catch (err) {
    console.error('Payment intent error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/download ─────────────────────────────────────────────────
app.get('/api/download', async (req, res) => {
  try {
    if (!stripe) return res.status(500).send('Stripe not configured.');
    const { token, file } = req.query;
    if (!token || !file) return res.status(400).send('Missing token or file.');

    const paymentIntent = await stripe.paymentIntents.retrieve(token);
    if (paymentIntent.status !== 'succeeded') return res.status(403).send('Payment not completed.');

    const allowedFiles = Object.values(MUSIC_CATALOG).map(t => t.file);
    if (!allowedFiles.includes(file)) return res.status(403).send('File not authorized.');

    const filePath = path.join(__dirname, '..', 'public', 'audio', file);
    if (!fs.existsSync(filePath)) return res.status(404).send('Audio file not found on server.');

    const trackEntry = Object.values(MUSIC_CATALOG).find(t => t.file === file);
    const downloadName = trackEntry ? `${trackEntry.title} - By Design.mp3` : file;

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', `attachment; filename="${downloadName}"`);
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    console.error('Download error:', err.message);
    res.status(500).send('Download failed.');
  }
});

// ── GET /api/download-album ───────────────────────────────────────────
app.get('/api/download-album', async (req, res) => {
  try {
    if (!stripe) return res.status(500).send('Stripe not configured.');
    const { token } = req.query;
    if (!token) return res.status(400).send('Missing token.');

    const paymentIntent = await stripe.paymentIntents.retrieve(token);
    if (paymentIntent.status !== 'succeeded') return res.status(403).send('Payment not completed.');

    const archiver = require('archiver');
    const audioDir = path.join(__dirname, '..', 'public', 'audio');

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="By Design - RT Music.zip"');

    const archive = archiver('zip', { zlib: { level: 6 } });
    archive.on('error', err => { throw err; });
    archive.pipe(res);

    Object.entries(MUSIC_CATALOG).forEach(([, track], idx) => {
      const filePath = path.join(audioDir, track.file);
      if (fs.existsSync(filePath)) {
        const num = String(idx + 1).padStart(2, '0');
        archive.file(filePath, { name: `${num}. ${track.title}.mp3` });
      }
    });

    await archive.finalize();
  } catch (err) {
    console.error('Album download error:', err.message);
    res.status(500).send('Album download failed.');
  }
});

// ── POST /api/stripe-webhook ──────────────────────────────────────────
app.post('/api/stripe-webhook',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    if (!stripe) return res.status(500).send('Stripe not configured.');
    const sig = req.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === 'payment_intent.succeeded') {
      const pi = event.data.object;
      console.log(`✅ Music sale: ${pi.description} — $${(pi.amount / 100).toFixed(2)}`);
    }
    res.json({ received: true });
  }
);

// ── START ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🏛  Resurrection Temple — resurrectiontemple.com`);
  console.log(`✅  Server running on port ${PORT}`);
  console.log(`📧  Email: ${process.env.EMAIL_USER || '(not configured — set .env)'}`);
  console.log(`\n   http://localhost:${PORT}`);
  console.log(`   http://localhost:${PORT}/portal\n`);
});

module.exports = app;
