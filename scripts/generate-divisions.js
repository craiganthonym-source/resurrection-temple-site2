/* ══════════════════════════════════════════════════════════════
   RT DIVISION PAGE GENERATOR
   Generates all 12 division HTML pages from one config object
   Run: node scripts/generate-divisions.js
   ══════════════════════════════════════════════════════════════ */

'use strict';
const fs   = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'pages');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// ── DIVISION CONFIG ──────────────────────────────────────────────────
const DIVISIONS = [
  {
    key: 'builders',
    name: 'RT Builders',
    category: 'Construction · Property',
    tagline: 'Built with Precision. Delivered with Pride.',
    tagline_em: 'Precision.',
    hero_body: 'RT Builders is the construction and property improvement arm of the Resurrection Temple ecosystem. We bring workmanship, accountability, and premium execution to every project — from initial consultation to final delivery.',
    cta_primary: 'Request an Estimate',
    form_id: 'builders',
    form_title: 'Request a Project Estimate',
    form_eyebrow: 'Estimate Request',
    services: [
      'Residential remodeling & renovation',
      'Kitchen, bath & room additions',
      'Property improvement planning',
      'Project coordination & oversight',
      'Commercial build-out support',
      'Estimate & scope request intake',
    ],
    form_fields: [
      { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your Full Name', required: true },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: '(000) 000-0000' },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com', required: true },
      { label: 'Property Address', name: 'propertyAddress', type: 'text', placeholder: '123 Main St, City, CA' },
      {
        label: 'Project Type', name: 'projectType', type: 'select',
        options: ['Residential Remodel', 'Kitchen / Bath Renovation', 'Room Addition', 'Property Improvement', 'Commercial Build-out', 'Other']
      },
      {
        label: 'Estimated Budget', name: 'budget', type: 'select',
        options: ['Under $10,000', '$10,000 – $25,000', '$25,000 – $50,000', '$50,000 – $100,000', '$100,000+']
      },
      {
        label: 'Timeline', name: 'timeline', type: 'select',
        options: ['As soon as possible', 'Within 30 days', '1–3 months', 'Flexible']
      },
      { label: 'Project Description', name: 'message', type: 'textarea', placeholder: 'Describe your project in detail...', full: true },
    ]
  },
  {
    key: 'transport',
    name: 'RT Transport',
    category: 'Logistics · Commercial Transport',
    tagline: 'Reliable. On Time. Every Haul.',
    tagline_em: 'On Time.',
    hero_body: 'RT Transport operates with the discipline and reliability that commercial clients depend on. From logistics coordination to scheduled hauling, we move what matters with precision and professionalism.',
    cta_primary: 'Schedule Transport',
    form_id: 'transport',
    form_title: 'Request Transport Service',
    form_eyebrow: 'Schedule',
    services: [
      'Commercial hauling & logistics',
      'Transport coordination & scheduling',
      'Freight & cargo management',
      'Commercial partnership inquiries',
      'One-time & recurring transport',
      'Fleet logistics support',
    ],
    form_fields: [
      { label: 'Company / Name', name: 'name', type: 'text', placeholder: 'Business or Full Name', required: true },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: '(000) 000-0000', required: true },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com' },
      { label: 'Pickup Location', name: 'pickupLocation', type: 'text', placeholder: 'Origin address' },
      { label: 'Destination', name: 'destination', type: 'text', placeholder: 'Drop-off address' },
      {
        label: 'Service Type', name: 'serviceType', type: 'select',
        options: ['Commercial Hauling', 'Freight Coordination', 'Scheduled Logistics', 'One-time Transport', 'Fleet Partnership']
      },
      { label: 'Load Details & Requirements', name: 'message', type: 'textarea', placeholder: 'Load type, weight, dimensions, special handling...', full: true },
    ]
  },
  {
    key: 'enterprises',
    name: 'RT Enterprises',
    category: 'Business · Commercial Operations',
    tagline: 'Strategic. Diversified. Driven.',
    tagline_em: 'Diversified.',
    hero_body: 'RT Enterprises is the commercial engine of the ecosystem — executing across industries, building partnerships, and positioning the RT brand as a serious force in diversified business operations.',
    cta_primary: 'Connect With Us',
    form_id: 'enterprises',
    form_title: 'Discuss a Business Opportunity',
    form_eyebrow: 'Partnership',
    services: [
      'Corporate capability presentation',
      'Strategic partnership development',
      'Operational coordination',
      'Vendor & commercial relationships',
      'Joint venture exploration',
      'Business development intake',
    ],
    form_fields: [
      { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Full Name', required: true },
      { label: 'Company', name: 'company', type: 'text', placeholder: 'Organization Name' },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'you@company.com', required: true },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: '(000) 000-0000' },
      {
        label: 'Opportunity Type', name: 'opportunityType', type: 'select',
        options: ['Strategic Partnership', 'Vendor Relationship', 'Joint Venture', 'Commercial Inquiry', 'Other']
      },
      { label: 'Details', name: 'message', type: 'textarea', placeholder: 'Tell us about the opportunity...', full: true },
    ]
  },
  {
    key: 'investments',
    name: 'RT Investments',
    category: 'Capital · Private Partnerships',
    tagline: 'Selective. Disciplined. High-Trust Capital.',
    tagline_em: 'Disciplined.',
    hero_body: 'RT Investments operates in the private market — building capital relationships through discretion, discipline, and a deep understanding of opportunity. Built for those who understand legacy.',
    cta_primary: 'Request a Private Briefing',
    form_id: 'investments',
    form_title: 'Investor Inquiry',
    form_eyebrow: 'Private Briefing',
    services: [
      'Investment inquiry & intake',
      'Capital partner presentation',
      'Portfolio positioning',
      'Private consultation requests',
      'Real estate capital partnerships',
      'Private lending discussions',
    ],
    form_fields: [
      { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Investor Name', required: true },
      { label: 'Organization / Fund', name: 'organization', type: 'text', placeholder: 'Fund / Firm / Individual' },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'private@example.com', required: true },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: '(000) 000-0000' },
      {
        label: 'Investment Focus', name: 'investmentFocus', type: 'select',
        options: ['Real Estate', 'Business Equity', 'Private Lending', 'Portfolio Review', 'Capital Partnership']
      },
      {
        label: 'Available Capital Range', name: 'capitalRange', type: 'select',
        options: ['Under $50,000', '$50,000 – $250,000', '$250,000 – $1M', '$1M+', 'Prefer not to disclose']
      },
      { label: 'Investment Objectives', name: 'message', type: 'textarea', placeholder: 'Describe your investment goals...', full: true },
    ]
  },
  {
    key: 'notary',
    name: 'RT Notary Solutions',
    category: 'Professional Services · Mobile Notary',
    tagline: 'Professional. Convenient. We Come to You.',
    tagline_em: 'Convenient.',
    hero_body: 'RT Notary Solutions provides professional notary services for individuals, families, and businesses across the greater Los Angeles area. Mobile appointments available — we come to you.',
    cta_primary: 'Book an Appointment',
    form_id: 'notary',
    form_title: 'Schedule a Notary Appointment',
    form_eyebrow: 'Booking',
    services: [
      'General notary & acknowledgments',
      'Mobile appointments (we come to you)',
      'Real estate & loan signing',
      'Business document notarization',
      'Legal document support',
      'Fast scheduling & turnaround',
    ],
    form_fields: [
      { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your Name', required: true },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: '(626) 000-0000', required: true },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com' },
      { label: 'Preferred Date & Time', name: 'appointmentDate', type: 'datetime-local' },
      {
        label: 'Appointment Type', name: 'appointmentType', type: 'select',
        options: ['Mobile — Come to Me', 'In-Office Appointment', 'Flexible']
      },
      {
        label: 'Document Type', name: 'documentType', type: 'select',
        options: ['General Acknowledgment', 'Real Estate / Loan Signing', 'Business Documents', 'Legal Documents', 'Other']
      },
      { label: 'Notes & Special Instructions', name: 'message', type: 'textarea', placeholder: 'Number of signatures, location details...', full: true },
    ]
  },
  {
    key: 'management',
    name: 'RT Management',
    category: 'Operations · Administrative Oversight',
    tagline: 'Structure. Accountability. Executive Results.',
    tagline_em: 'Accountability.',
    hero_body: 'RT Management is the operational backbone of the ecosystem — providing structured oversight, administrative coordination, and disciplined leadership support across all RT entities.',
    cta_primary: 'Connect With Management',
    form_id: 'management',
    form_title: 'Management Services Inquiry',
    form_eyebrow: 'Inquiry',
    services: [
      'Administrative & operational oversight',
      'Entity coordination & reporting',
      'Growth-oriented planning',
      'Executive leadership support',
      'Process & workflow management',
      'Multi-entity coordination',
    ],
    form_fields: [
      { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Full Name', required: true },
      { label: 'Organization', name: 'organization', type: 'text', placeholder: 'Company / Entity Name' },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'you@company.com', required: true },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: '(000) 000-0000' },
      {
        label: 'Management Need', name: 'managementNeed', type: 'select',
        options: ['Operational Oversight', 'Administrative Support', 'Entity Coordination', 'Growth Planning', 'Other']
      },
      { label: 'Details', name: 'message', type: 'textarea', placeholder: 'Describe your management needs...', full: true },
    ]
  },
  {
    key: 'consultants',
    name: 'RT Consultants',
    category: 'Advisory · Strategy',
    tagline: 'Clear Thinking. Decisive Strategy.',
    tagline_em: 'Decisive Strategy.',
    hero_body: 'RT Consultants brings premium advisory to entrepreneurs, founders, and organizations who are ready to move with purpose. We don\'t just advise — we architect your next level.',
    cta_primary: 'Request a Consultation',
    form_id: 'consultants',
    form_title: 'Book Your Strategy Session',
    form_eyebrow: 'Consultation',
    services: [
      'Business structure & entity strategy',
      'Growth planning & execution roadmaps',
      'Brand positioning advisory',
      'Dynasty Wealth System™ consulting',
      'Corporate stack architecture',
      'Custom problem-solving engagements',
    ],
    form_fields: [
      { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your Name', required: true },
      { label: 'Business / Brand Name', name: 'businessName', type: 'text', placeholder: 'Company or Brand' },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com', required: true },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: '(000) 000-0000' },
      {
        label: 'Primary Challenge', name: 'challenge', type: 'select',
        options: ['Business Structure / Entity Setup', 'Growth Planning', 'Brand Strategy', 'Wealth Building', 'Dynasty Wealth System™', 'Corporate Stack Design', 'General Advisory']
      },
      {
        label: 'Revenue Stage', name: 'revenueStage', type: 'select',
        options: ['Pre-revenue / Startup', 'Under $100K/year', '$100K – $500K/year', '$500K+/year']
      },
      { label: 'Tell Us About Your Situation', name: 'message', type: 'textarea', placeholder: 'What\'s working, what\'s not, and what you want to achieve...', full: true },
    ]
  },
  {
    key: 'brokers',
    name: 'RT Brokers',
    category: 'Brokerage · Referral Partners',
    tagline: 'Relationships First. Opportunity Always.',
    tagline_em: 'First.',
    hero_body: 'RT Brokers operates at the intersection of opportunity and connection — qualifying prospects, building referral networks, and creating pathways that benefit all parties involved.',
    cta_primary: 'Submit an Opportunity',
    form_id: 'brokers',
    form_title: 'Submit an Opportunity or Referral',
    form_eyebrow: 'Inquiry',
    services: [
      'Buyer & borrower introductions',
      'Referral partner onboarding',
      'Opportunity intake & qualification',
      'Deal coordination & follow-through',
      'Real estate referral partnerships',
      'Financial product referrals',
    ],
    form_fields: [
      { label: 'Your Name', name: 'name', type: 'text', placeholder: 'Full Name', required: true },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com', required: true },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: '(000) 000-0000' },
      {
        label: 'Your Role', name: 'role', type: 'select',
        options: ['Referral Partner', 'Buyer', 'Borrower', 'Seller', 'Other']
      },
      {
        label: 'Opportunity Type', name: 'opportunityType', type: 'select',
        options: ['Real Estate', 'Business Financing', 'Insurance', 'General Referral', 'Other']
      },
      { label: 'Deal / Opportunity Details', name: 'message', type: 'textarea', placeholder: 'Describe the opportunity, deal size, timeline...', full: true },
    ]
  },
  {
    key: 'ip',
    name: 'RT IP',
    category: 'Intellectual Property · Brand Protection',
    tagline: 'Your Brand. Protected. Owned. Controlled.',
    tagline_em: 'Protected.',
    hero_body: 'RT IP handles the protection, licensing, and management of intellectual property assets across the Resurrection Temple ecosystem. We believe ownership is power — and we protect it accordingly.',
    cta_primary: 'Discuss IP Needs',
    form_id: 'ip',
    form_title: 'IP Inquiry',
    form_eyebrow: 'Inquiry',
    services: [
      'Brand asset management & protection',
      'Trademark guidance (USPTO filing)',
      'Copyright registration strategy',
      'Licensing discussions & agreements',
      'IP portfolio management',
      'Dynasty Wealth System™ IP protection',
    ],
    form_fields: [
      { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Full Name', required: true },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com', required: true },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: '(000) 000-0000' },
      { label: 'Brand / Asset Name', name: 'assetName', type: 'text', placeholder: 'Name of brand, product, or asset' },
      {
        label: 'IP Topic', name: 'ipTopic', type: 'select',
        options: ['Trademark Filing', 'Copyright Registration', 'Licensing Agreement', 'Brand Asset Protection', 'General IP Inquiry']
      },
      { label: 'Details', name: 'message', type: 'textarea', placeholder: 'Describe your IP needs...', full: true },
    ]
  },
  {
    key: 'auto',
    name: 'RT Auto',
    category: 'Automotive Services',
    tagline: 'Premium Automotive Solutions.',
    tagline_em: 'Automotive',
    hero_body: 'RT Auto delivers dependable automotive services to individual drivers and commercial fleet clients with the premium standard the RT brand is known for.',
    cta_primary: 'Contact RT Auto',
    form_id: 'auto',
    form_title: 'Automotive Service Inquiry',
    form_eyebrow: 'Service Request',
    services: [
      'Automotive consultation & inquiry',
      'Commercial fleet coordination',
      'Vehicle-related service support',
      'Fleet management solutions',
      'Customer service & intake',
      'Commercial automotive partnerships',
    ],
    form_fields: [
      { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Full Name', required: true },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: '(000) 000-0000', required: true },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com' },
      {
        label: 'Client Type', name: 'clientType', type: 'select',
        options: ['Individual Vehicle', 'Commercial Fleet', 'Partnership Inquiry', 'Other']
      },
      { label: 'Vehicle Year / Make / Model', name: 'vehicle', type: 'text', placeholder: 'e.g. 2022 Ford F-150' },
      { label: 'Details', name: 'message', type: 'textarea', placeholder: 'Describe your automotive needs...', full: true },
    ]
  },
  {
    key: 'assisted-living',
    name: 'RT Assisted Living',
    category: 'Senior Care · Family Support',
    tagline: 'Dignity. Compassion. Quality Care.',
    tagline_em: 'Compassion.',
    hero_body: 'RT Assisted Living provides a caring, dignified environment for seniors — giving families the peace of mind that comes with knowing their loved ones are in thoughtful, capable hands.',
    cta_primary: 'Request Care Information',
    form_id: 'assisted-living',
    form_title: 'Care Inquiry',
    form_eyebrow: 'Care Inquiry',
    services: [
      'Compassionate senior care environment',
      'Family communication & transparency',
      'Individualized care planning',
      'Safe, dignified living arrangements',
      'Memory care support',
      'Tour scheduling & family visits',
    ],
    form_fields: [
      { label: 'Your Name (Family Contact)', name: 'name', type: 'text', placeholder: 'Full Name', required: true },
      {
        label: 'Relationship to Resident', name: 'relationship', type: 'select',
        options: ['Son / Daughter', 'Spouse / Partner', 'Sibling', 'Legal Guardian', 'Other']
      },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: '(000) 000-0000', required: true },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'family@example.com' },
      { label: 'Resident Name (if known)', name: 'residentName', type: 'text', placeholder: 'Prospective Resident Name' },
      {
        label: 'Level of Care Needed', name: 'careLevel', type: 'select',
        options: ['Independent Living', 'Assisted Living', 'Memory Care', 'Unsure — Need Guidance']
      },
      {
        label: 'Move-in Timeline', name: 'timeline', type: 'select',
        options: ['Immediate (within 30 days)', '1–3 Months', '3–6 Months', 'Exploring Options']
      },
      { label: 'Questions or Special Needs', name: 'message', type: 'textarea', placeholder: 'Tell us about your loved one\'s needs...', full: true },
    ]
  },
  {
    key: 'wear',
    name: 'RT Wear',
    category: 'Luxury Apparel · Lifestyle',
    tagline: 'Wear the Legacy. Own the Look.',
    tagline_em: 'Legacy.',
    hero_body: 'RT Wear is where brand meets lifestyle. Every piece carries the Resurrection Temple identity — crafted for those who move with purpose, lead with excellence, and wear their empire.',
    cta_primary: 'Shop Collections',
    form_id: 'wear',
    form_title: 'Contact RT Wear',
    form_eyebrow: 'Wholesale & Inquiries',
    services: [
      'Signature RT branded apparel',
      'Dynasty Wealth System™ merch line',
      'Limited drops & special releases',
      'Wholesale & bulk orders',
      'Custom design collaborations',
      'Retail partnership inquiries',
    ],
    form_fields: [
      { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Full Name', required: true },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com', required: true },
      { label: 'Phone', name: 'phone', type: 'tel', placeholder: '(000) 000-0000' },
      {
        label: 'Inquiry Type', name: 'inquiryType', type: 'select',
        options: ['Wholesale Order', 'Custom Design', 'Retail Partnership', 'General Question']
      },
      { label: 'Details', name: 'message', type: 'textarea', placeholder: 'Tell us about your apparel needs...', full: true },
    ]
  }
];

// ── HTML BUILDER ──────────────────────────────────────────────────────
function buildField(f) {
  const cls = f.full ? 'form-group full' : 'form-group';
  const req = f.required ? 'required' : '';
  if (f.type === 'select') {
    return `<div class="${cls}">
        <label class="form-label" for="${f.name}">${f.label}</label>
        <select class="form-select" id="${f.name}" name="${f.name}" ${req}>
          ${f.options.map(o => `<option>${o}</option>`).join('\n          ')}
        </select>
      </div>`;
  }
  if (f.type === 'textarea') {
    return `<div class="${cls}">
        <label class="form-label" for="${f.name}">${f.label}</label>
        <textarea class="form-textarea" id="${f.name}" name="${f.name}" placeholder="${f.placeholder}" ${req}></textarea>
      </div>`;
  }
  return `<div class="${cls}">
      <label class="form-label" for="${f.name}">${f.label}${f.required ? ' *' : ''}</label>
      <input class="form-input" type="${f.type}" id="${f.name}" name="${f.name}" placeholder="${f.placeholder || ''}" ${req}>
    </div>`;
}

function buildPage(div) {
  // Split tagline at em word
  const titleParts = div.tagline.split(div.tagline_em);
  const heroTitle = `${titleParts[0]}<em>${div.tagline_em}</em>${titleParts[1] || ''}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${div.name} — ${div.tagline} Part of the Resurrection Temple brand ecosystem.">
  <title>${div.name} — Resurrection Temple</title>
  <link rel="canonical" href="https://www.resurrectiontemple.com/pages/${div.key}">
  <link rel="stylesheet" href="/css/main.css">
</head>
<body>

<header class="site-header">
  <div class="header-inner">
    <a href="/" class="logo">
      <span class="logo-eyebrow">${div.category}</span>
      <span class="logo-name">Resurrection Temple</span>
    </a>
    <nav class="main-nav" aria-label="Main navigation">
      <a href="/" class="nav-link">Ecosystem</a>
      <a href="/pages/builders" class="nav-link${div.key==='builders'?' active':''}">Builders</a>
      <a href="/pages/transport" class="nav-link${div.key==='transport'?' active':''}">Transport</a>
      <a href="/pages/enterprises" class="nav-link${div.key==='enterprises'?' active':''}">Enterprises</a>
      <a href="/pages/investments" class="nav-link${div.key==='investments'?' active':''}">Investments</a>
      <a href="/pages/notary" class="nav-link${div.key==='notary'?' active':''}">Notary</a>
      <a href="/pages/consultants" class="nav-link${div.key==='consultants'?' active':''}">Consultants</a>
      <a href="/pages/brokers" class="nav-link${div.key==='brokers'?' active':''}">Brokers</a>
      <a href="/pages/ip" class="nav-link${div.key==='ip'?' active':''}">IP</a>
      <a href="/pages/assisted-living" class="nav-link${div.key==='assisted-living'?' active':''}">Assisted Living</a>
      <a href="/pages/wear" class="nav-link${div.key==='wear'?' active':''}">Wear</a>
      <a href="/portal/" class="nav-link">Client Portal</a>
    </nav>
    <a href="/portal/intake" class="nav-cta btn-gold">Begin Intake</a>
    <button class="hamburger" id="hamburger" aria-label="Menu">☰</button>
  </div>
</header>

<div class="mobile-nav" id="mobile-nav">
  <div class="mobile-nav-grid">
    <a href="/" class="mobile-nav-item">← Ecosystem</a>
    <a href="/pages/builders" class="mobile-nav-item">RT Builders</a>
    <a href="/pages/transport" class="mobile-nav-item">RT Transport</a>
    <a href="/pages/enterprises" class="mobile-nav-item">RT Enterprises</a>
    <a href="/pages/investments" class="mobile-nav-item">RT Investments</a>
    <a href="/pages/notary" class="mobile-nav-item">RT Notary</a>
    <a href="/pages/management" class="mobile-nav-item">RT Management</a>
    <a href="/pages/consultants" class="mobile-nav-item">RT Consultants</a>
    <a href="/pages/brokers" class="mobile-nav-item">RT Brokers</a>
    <a href="/pages/ip" class="mobile-nav-item">RT IP</a>
    <a href="/pages/auto" class="mobile-nav-item">RT Auto</a>
    <a href="/pages/assisted-living" class="mobile-nav-item">Assisted Living</a>
    <a href="/pages/wear" class="mobile-nav-item">RT Wear</a>
    <a href="/portal/" class="mobile-nav-item">Client Portal</a>
  </div>
</div>

<main>
<div class="page-wrap">
<div class="container">

  <!-- ── HERO ── -->
  <section class="hero">
    <div class="hero-left">
      <div class="hero-eyebrow">${div.category}</div>
      <h1 class="hero-title">${heroTitle}</h1>
      <p class="hero-body">${div.hero_body}</p>
      <div class="hero-ctas">
        <a href="#inquiry" class="btn btn-gold btn-lg">${div.cta_primary}</a>
        <a href="/" class="btn btn-outline btn-lg">← RT Ecosystem</a>
      </div>
    </div>
    <div class="hero-right">
      <div class="card card-gold">
        <div class="card-label">What We Offer</div>
        <ul class="service-list" style="margin-top:12px;">
          ${div.services.map(s => `<li class="service-item">${s}</li>`).join('\n          ')}
        </ul>
      </div>
    </div>
  </section>

  <!-- ── ABOUT STRIP ── -->
  <div class="proof-strip reveal" style="grid-template-columns:repeat(3,1fr);">
    <div class="proof-item">
      <span class="proof-num">RT</span>
      <div class="proof-label">Brand Standard</div>
    </div>
    <div class="proof-item">
      <span class="proof-num">17</span>
      <div class="proof-label">Ecosystem Divisions</div>
    </div>
    <div class="proof-item">
      <span class="proof-num">1</span>
      <div class="proof-label">Unified Vision</div>
    </div>
  </div>

  <hr class="divider">

  <!-- ── INQUIRY FORM ── -->
  <section class="section" id="inquiry">
    <div style="display:grid; grid-template-columns:1fr 1.15fr; gap:3rem; align-items:start;">
      <div>
        <div class="section-eyebrow">${div.form_eyebrow}</div>
        <h2 class="section-title">${div.form_title}</h2>
        <p class="section-sub" style="margin-bottom:2rem;">Submit your inquiry and a ${div.name} representative will respond within 24–48 business hours.</p>
        <div class="card">
          <div class="contact-info-item">
            <div class="ci-icon">☎</div>
            <div><div class="ci-label">Phone</div><div class="ci-value"><a href="tel:+16264791082">(626) 479-1082</a></div></div>
          </div>
          <div class="contact-info-item">
            <div class="ci-icon">✉</div>
            <div><div class="ci-label">Email</div><div class="ci-value"><a href="mailto:cmayweather@ResurrectionTemple.org">cmayweather@ResurrectionTemple.org</a></div></div>
          </div>
          <div class="contact-info-item">
            <div class="ci-icon">🕐</div>
            <div><div class="ci-label">Hours</div><div class="ci-value">Mon–Fri · 9:00 AM–5:00 PM</div></div>
          </div>
          <div style="margin-top:1.5rem;">
            <a href="/portal/intake" class="btn btn-gold btn-sm btn-full">Start Full Client Intake →</a>
          </div>
        </div>
      </div>
      <div>
        <form data-form="${div.form_id}-inquiry" novalidate>
          <div class="form-grid">
            ${div.form_fields.map(f => buildField(f)).join('\n            ')}
            <div class="form-actions">
              <button type="submit" class="btn btn-gold btn-full">Submit Inquiry</button>
              <div class="form-success">✓ Inquiry received. A ${div.name} representative will contact you within 24–48 business hours.</div>
              <div class="form-error"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>

  <hr class="divider">

  <!-- ── OTHER DIVISIONS ── -->
  <section class="section-sm" style="padding-bottom:4rem;">
    <div class="section-eyebrow">Explore More</div>
    <h2 class="section-title" style="font-size:1.8rem; margin-bottom:1.5rem;">Other RT Divisions</h2>
    <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:10px;">
      ${DIVISIONS.filter(d => d.key !== div.key).slice(0,4).map(d => `<a href="/pages/${d.key}" class="division-card">
        <div class="div-cat">${d.category.split(' · ')[0]}</div>
        <div class="div-name">${d.name}</div>
        <div class="div-arrow">→ View</div>
      </a>`).join('\n      ')}
    </div>
  </section>

</div>
</div>
</main>

<!-- ── FOOTER ── -->
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="wordmark">Resurrection Temple</div>
      <p class="tagline">A multi-entity brand empire built on faith, discipline, and the relentless pursuit of legacy. Founded by Craig A. Mayweather.</p>
      <div class="footer-legal">
        <a href="/pages/privacy">Privacy Policy</a>
        <a href="/pages/terms">Terms of Use</a>
        <a href="/portal/">Client Portal</a>
        <a href="/">Ecosystem</a>
      </div>
    </div>
    <div class="footer-links">
      <a href="/" class="footer-link">Ecosystem</a>
      <a href="/pages/builders" class="footer-link">Builders</a>
      <a href="/pages/transport" class="footer-link">Transport</a>
      <a href="/pages/enterprises" class="footer-link">Enterprises</a>
      <a href="/pages/investments" class="footer-link">Investments</a>
      <a href="/pages/notary" class="footer-link">Notary</a>
      <a href="/pages/management" class="footer-link">Management</a>
      <a href="/pages/consultants" class="footer-link">Consultants</a>
      <a href="/pages/brokers" class="footer-link">Brokers</a>
      <a href="/pages/ip" class="footer-link">IP</a>
      <a href="/pages/auto" class="footer-link">Auto</a>
      <a href="/pages/assisted-living" class="footer-link">Assisted Living</a>
      <a href="/pages/wear" class="footer-link">Wear</a>
      <a href="/portal/" class="footer-link">Client Portal</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2025 Resurrection Temple. All rights reserved.</span>
    <span>www.resurrectiontemple.com</span>
  </div>
</footer>

<script src="/js/main.js"></script>
</body>
</html>`;
}

// ── GENERATE ALL PAGES ───────────────────────────────────────────────
DIVISIONS.forEach(div => {
  const html = buildPage(div);
  const outPath = path.join(OUT, `${div.key}.html`);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`✓ Generated: pages/${div.key}.html`);
});

console.log(`\n✅ All ${DIVISIONS.length} division pages generated in /public/pages/\n`);
