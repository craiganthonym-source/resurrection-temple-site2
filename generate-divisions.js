/* ══════════════════════════════════════════════════════════════
   RT DIVISION PAGE GENERATOR
   Generates all 12 division pages from config
   Run: node generate-divisions.js
   ══════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'public/pages');

const DIVISIONS = [
  {
    key: 'builders',
    name: 'RT Builders',
    category: 'Construction & Property',
    tagline: 'Built with Precision. Delivered with Pride.',
    subtitle: 'Premier construction and property improvement across Southern California.',
    body: 'RT Builders brings workmanship, accountability, and premium execution to every project — from residential remodeling to commercial build-outs. We operate with the discipline and standards the RT name demands.',
    cta: 'Request an Estimate',
    services: [
      { name: 'Residential Remodeling', desc: 'Full-scope residential remodel, renovation, and upgrade projects from concept to completion.' },
      { name: 'Kitchen & Bath Renovation', desc: 'Premium kitchen and bathroom transformations — design, materials, and expert execution.' },
      { name: 'Property Improvement', desc: 'Interior and exterior property improvements that increase value and appeal.' },
      { name: 'Room Additions', desc: 'Permitted room additions and ADU construction coordinated with licensed contractors.' },
      { name: 'Commercial Build-Outs', desc: 'Office, retail, and commercial space improvements built to spec and on schedule.' },
      { name: 'Project Coordination', desc: 'End-to-end project management — scheduling, contractor oversight, and quality control.' },
    ],
    formFields: [
      { id: 'project-type', label: 'Project Type', type: 'select', options: ['Residential Remodel','Kitchen / Bath','Room Addition','Property Improvement','Commercial Build-Out','Other'] },
      { id: 'property-address', label: 'Property Address', type: 'text', placeholder: '123 Main St, City, CA' },
      { id: 'budget', label: 'Estimated Budget', type: 'select', options: ['Under $10,000','$10,000–$25,000','$25,000–$50,000','$50,000–$100,000','$100,000+'] },
      { id: 'timeline', label: 'Timeline', type: 'select', options: ['ASAP','Within 30 days','1–3 months','Flexible'] },
    ],
    formSuccessMsg: 'Your estimate request has been received. An RT Builders representative will contact you within 24–48 business hours.',
    icon: '🏗️',
    accentFact: ['15+', 'Years Experience'],
  },
  {
    key: 'transport',
    name: 'RT Transport',
    category: 'Logistics & Commercial Transport',
    tagline: 'Reliable. On Time. Every Haul.',
    subtitle: 'Commercial-grade transport and logistics solutions for businesses that cannot afford delays.',
    body: 'RT Transport operates with the discipline and reliability that commercial clients depend on. From logistics coordination to scheduled hauling, we move what matters with precision and professionalism.',
    cta: 'Schedule Service',
    services: [
      { name: 'Commercial Hauling', desc: 'Heavy and standard commercial hauling with dependable scheduling and route coordination.' },
      { name: 'Freight Coordination', desc: 'End-to-end freight management from pickup through final delivery confirmation.' },
      { name: 'Logistics Scheduling', desc: 'Recurring logistics programs for businesses that need consistent, on-time transport.' },
      { name: 'One-Time Transport', desc: 'Single-run transport for equipment, materials, and time-sensitive commercial cargo.' },
      { name: 'Fleet Partnerships', desc: 'Long-term fleet and logistics partnerships for contractors and commercial operators.' },
      { name: 'Commercial Intake', desc: 'New client intake and service qualification for commercial transport relationships.' },
    ],
    formFields: [
      { id: 'service-type', label: 'Service Type', type: 'select', options: ['Commercial Hauling','Freight Coordination','Recurring Logistics','One-Time Transport','Fleet Partnership'] },
      { id: 'origin', label: 'Pickup Location', type: 'text', placeholder: 'Pickup address or city' },
      { id: 'destination', label: 'Destination', type: 'text', placeholder: 'Drop-off address or city' },
      { id: 'cargo', label: 'Cargo / Load Description', type: 'textarea', placeholder: 'Type of load, approximate weight, dimensions, special handling...' },
    ],
    formSuccessMsg: 'Transport request received. RT Transport will follow up within 24 hours.',
    icon: '🚛',
    accentFact: ['24/7', 'Dispatch Ready'],
  },
  {
    key: 'enterprises',
    name: 'RT Enterprises',
    category: 'Business & Commercial Operations',
    tagline: 'Strategic. Diversified. Driven.',
    subtitle: 'The commercial engine of the RT ecosystem — executing across industries and building lasting partnerships.',
    body: 'RT Enterprises is the diversified business arm of the Resurrection Temple ecosystem. We execute across industries, build strategic partnerships, and position the RT brand as a serious force in commercial operations.',
    cta: 'Discuss a Partnership',
    services: [
      { name: 'Corporate Capability', desc: 'Full presentation of RT Enterprises operational scope and commercial capabilities.' },
      { name: 'Strategic Partnerships', desc: 'Partnership development with vendors, operators, and strategic commercial contacts.' },
      { name: 'Joint Ventures', desc: 'Structured joint venture frameworks for shared-risk commercial opportunities.' },
      { name: 'Vendor Relations', desc: 'Vendor qualification, relationship management, and supply chain coordination.' },
      { name: 'Business Development', desc: 'Market expansion strategy, outreach, and new business relationship development.' },
      { name: 'Commercial Intake', desc: 'Initial inquiry review and commercial opportunity qualification for new partners.' },
    ],
    formFields: [
      { id: 'company', label: 'Company / Organization', type: 'text', placeholder: 'Your Company Name' },
      { id: 'opp-type', label: 'Opportunity Type', type: 'select', options: ['Strategic Partnership','Joint Venture','Vendor Relationship','Commercial Inquiry','Other'] },
    ],
    formSuccessMsg: 'Inquiry received. RT Enterprises leadership will follow up within 48 hours.',
    icon: '💼',
    accentFact: ['Multi', 'Industry'],
  },
  {
    key: 'investments',
    name: 'RT Investments',
    category: 'Capital & Private Partnerships',
    tagline: 'Selective. Disciplined. High-Trust Capital.',
    subtitle: 'Private capital relationships built on discretion, discipline, and a deep understanding of opportunity.',
    body: 'RT Investments operates in the private market — building capital relationships through discretion, discipline, and a refined understanding of opportunity. This is not for everyone. This is for those who understand legacy.',
    cta: 'Request a Private Briefing',
    services: [
      { name: 'Investment Inquiry', desc: 'Qualified investor introductions and private opportunity intake.' },
      { name: 'Capital Partnerships', desc: 'Structured capital partnership arrangements for real estate and business equity.' },
      { name: 'Portfolio Positioning', desc: 'Portfolio overview and investment positioning for strategic capital discussions.' },
      { name: 'Private Lending', desc: 'Private note and lending arrangements through structured LLC loan agreements.' },
      { name: 'Real Estate Capital', desc: 'Capital deployment and co-investment frameworks for real estate acquisitions.' },
      { name: 'Private Consultation', desc: 'Confidential one-on-one consultation for accredited investors and capital partners.' },
    ],
    formFields: [
      { id: 'org', label: 'Fund / Firm / Individual', type: 'text', placeholder: 'Organization or Name' },
      { id: 'focus', label: 'Investment Focus', type: 'select', options: ['Real Estate','Business Equity','Private Lending','Portfolio Review','Capital Partnership'] },
      { id: 'capital', label: 'Available Capital Range', type: 'select', options: ['Under $50,000','$50K–$250K','$250K–$1M','$1M+','Prefer not to disclose'] },
    ],
    formSuccessMsg: 'Private inquiry received. RT Investments will reach out through secure channels within 48 hours.',
    icon: '🏦',
    accentFact: ['Private', 'Market Only'],
  },
  {
    key: 'notary',
    name: 'RT Notary Solutions',
    category: 'Professional Notary Services',
    tagline: 'Professional. Convenient. We Come to You.',
    subtitle: 'Mobile notary services for individuals, families, and businesses across the greater LA area.',
    body: 'RT Notary Solutions provides professional notary services with speed, reliability, and the premium RT standard. Mobile appointments available — we come to you anywhere in the service area.',
    cta: 'Book an Appointment',
    services: [
      { name: 'General Acknowledgments', desc: 'Standard notary acknowledgments for personal, legal, and business documents.' },
      { name: 'Loan Signing', desc: 'Certified loan signing agent services for real estate closings and refinances.' },
      { name: 'Mobile Appointments', desc: 'We come to your home, office, hospital, or any location within our service area.' },
      { name: 'Business Documents', desc: 'Notarization of operating agreements, resolutions, contracts, and corporate filings.' },
      { name: 'Real Estate Documents', desc: 'Deed notarization, title documents, grant deeds, and property transfer paperwork.' },
      { name: 'Legal Documents', desc: 'Power of attorney, affidavits, wills, trusts, and court-related document support.' },
    ],
    formFields: [
      { id: 'doc-type', label: 'Document Type', type: 'select', options: ['General Acknowledgment','Loan Signing / Real Estate','Business Documents','Power of Attorney','Affidavit','Trust / Will','Other'] },
      { id: 'location-type', label: 'Appointment Type', type: 'select', options: ['Mobile — Come to Me','In-Office','Flexible'] },
      { id: 'preferred-date', label: 'Preferred Date & Time', type: 'datetime-local', placeholder: '' },
      { id: 'location', label: 'Your Location / Address', type: 'text', placeholder: 'City or full address' },
    ],
    formSuccessMsg: 'Appointment request received. RT Notary Solutions will confirm your booking within 2 business hours.',
    icon: '📋',
    accentFact: ['Mobile', 'Service Available'],
  },
  {
    key: 'management',
    name: 'RT Management',
    category: 'Operations & Administrative Oversight',
    tagline: 'Structure. Accountability. Executive Results.',
    subtitle: 'The organizational backbone behind the RT ecosystem — disciplined oversight, coordinated leadership.',
    body: 'RT Management is the operational core of the ecosystem — providing structured oversight, administrative coordination, and executive leadership support across all RT entities and client engagements.',
    cta: 'Connect With Management',
    services: [
      { name: 'Operational Oversight', desc: 'Structured operational management for multi-entity businesses and portfolio operators.' },
      { name: 'Administrative Support', desc: 'High-level administrative coordination, scheduling, and executive support.' },
      { name: 'Entity Coordination', desc: 'Inter-entity coordination for holding companies and corporate stack operations.' },
      { name: 'Growth Planning', desc: 'Strategic growth-oriented planning aligned with business objectives and timelines.' },
      { name: 'Process Development', desc: 'SOP creation, workflow optimization, and systems implementation for scaling businesses.' },
      { name: 'Executive Leadership', desc: 'Fractional executive leadership and C-suite level advisory for growing organizations.' },
    ],
    formFields: [
      { id: 'company-name', label: 'Company / Entity Name', type: 'text', placeholder: 'Organization Name' },
      { id: 'mgmt-need', label: 'Management Need', type: 'select', options: ['Operational Oversight','Administrative Support','Entity Coordination','Growth Planning','Process Development','Executive Leadership'] },
    ],
    formSuccessMsg: 'Management inquiry received. We will respond within 24 business hours.',
    icon: '👥',
    accentFact: ['Multi', 'Entity Managed'],
  },
  {
    key: 'consultants',
    name: 'RT Consultants',
    category: 'Advisory & Strategy',
    tagline: 'Clear Thinking. Decisive Strategy.',
    subtitle: 'Premium advisory for entrepreneurs, founders, and organizations ready to move with purpose.',
    body: 'RT Consultants brings premium advisory to those who are ready to build with intention. We don\'t just advise — we architect your next level through disciplined strategy, clear thinking, and proven frameworks.',
    cta: 'Request a Consultation',
    services: [
      { name: 'Business Structure Advisory', desc: 'Entity selection, corporate structuring, and operating framework strategy.' },
      { name: 'Growth Planning', desc: 'Revenue roadmaps, scaling strategy, and milestone-based execution planning.' },
      { name: 'Brand Positioning', desc: 'Brand architecture, market positioning, and competitive differentiation strategy.' },
      { name: 'Dynasty Wealth System™', desc: 'Full Dynasty Wealth System™ implementation consulting — all 9 modules applied to your situation.' },
      { name: 'Wealth Strategy Advisory', desc: 'Business credit, tax strategy alignment, real estate, and legacy planning advisory.' },
      { name: 'Problem-Solving Sessions', desc: 'Focused single-session consulting for specific challenges, decisions, or pivots.' },
    ],
    formFields: [
      { id: 'biz-name', label: 'Business / Brand Name', type: 'text', placeholder: 'Company or Brand Name' },
      { id: 'challenge', label: 'Primary Challenge', type: 'select', options: ['Business Structure','Growth Strategy','Brand Positioning','Dynasty Wealth System™','Wealth Strategy','Specific Problem'] },
      { id: 'revenue', label: 'Revenue Stage', type: 'select', options: ['Pre-revenue','Under $100K/year','$100K–$500K/year','$500K+/year'] },
    ],
    formSuccessMsg: 'Consultation request received. An RT Consultants advisor will reach out within 24 hours.',
    icon: '💡',
    accentFact: ['9 Module', 'DWS™ System'],
  },
  {
    key: 'brokers',
    name: 'RT Brokers',
    category: 'Brokerage & Referral Partnerships',
    tagline: 'Relationships First. Opportunity Always.',
    subtitle: 'At the intersection of opportunity and connection — qualifying prospects and building referral networks.',
    body: 'RT Brokers operates where relationships meet results. We qualify prospects, build referral partnerships, and create pathways that benefit all parties involved — with discretion, professionalism, and consistency.',
    cta: 'Submit an Opportunity',
    services: [
      { name: 'Buyer Introductions', desc: 'Qualified buyer introductions for real estate, business acquisition, and financial products.' },
      { name: 'Referral Partnerships', desc: 'Structured referral programs for agents, advisors, and professional service providers.' },
      { name: 'Opportunity Intake', desc: 'Deal intake, qualification review, and routing to the appropriate RT division or partner.' },
      { name: 'Deal Coordination', desc: 'Active coordination and follow-through from introduction to close.' },
      { name: 'Borrower Qualification', desc: 'Pre-qualification intake for borrowers seeking financing introductions.' },
      { name: 'Seller Representation', desc: 'Seller-side representation for business and real estate disposition opportunities.' },
    ],
    formFields: [
      { id: 'role', label: 'Your Role', type: 'select', options: ['Referral Partner','Buyer','Borrower','Seller','Agent / Advisor','Other'] },
      { id: 'opp-type', label: 'Opportunity Type', type: 'select', options: ['Real Estate','Business Financing','Business Acquisition','Insurance','General Referral','Other'] },
      { id: 'deal-size', label: 'Approximate Deal Size', type: 'select', options: ['Under $50K','$50K–$250K','$250K–$1M','$1M+','Not Applicable'] },
    ],
    formSuccessMsg: 'Opportunity received. RT Brokers will review and respond within 48 hours.',
    icon: '🤝',
    accentFact: ['Referral', 'Network Active'],
  },
  {
    key: 'ip',
    name: 'RT IP',
    category: 'Intellectual Property & Brand Protection',
    tagline: 'Your Brand. Protected. Owned. Controlled.',
    subtitle: 'Protection, licensing, and management of intellectual property assets across the RT ecosystem.',
    body: 'RT IP handles the protection, licensing, and strategic management of intellectual property assets for the Resurrection Temple ecosystem and its clients. We believe ownership is power — and we protect it accordingly.',
    cta: 'Discuss IP Needs',
    services: [
      { name: 'Brand Asset Management', desc: 'Systematic management and documentation of all brand assets, marks, and creative IP.' },
      { name: 'Trademark Strategy', desc: 'USPTO trademark filing strategy — priority marks: "Resurrection Temple" and "Dynasty Wealth System™".' },
      { name: 'Copyright Registration', desc: 'Copyright registration strategy for creative works, courses, documents, and media.' },
      { name: 'Licensing Agreements', desc: 'IP licensing discussion, structuring, and Copyright Transfer Agreement preparation.' },
      { name: 'Brand Protection', desc: 'Monitoring, enforcement strategy, and cease-and-desist coordination for IP violations.' },
      { name: 'IP Audit', desc: 'Full audit of existing IP assets — identifying unprotected marks, gaps, and opportunities.' },
    ],
    formFields: [
      { id: 'asset-name', label: 'Brand / Asset Name', type: 'text', placeholder: 'Name of brand, product, or asset' },
      { id: 'ip-topic', label: 'IP Topic', type: 'select', options: ['Trademark Filing','Copyright Registration','Licensing Agreement','Brand Asset Protection','IP Audit','General Inquiry'] },
    ],
    formSuccessMsg: 'IP inquiry received. RT IP will respond within 48 hours.',
    icon: '🛡️',
    accentFact: ['USPTO', 'Filing Guidance'],
  },
  {
    key: 'auto',
    name: 'RT Auto',
    category: 'Automotive Services',
    tagline: 'Premium Automotive Solutions.',
    subtitle: 'Dependable automotive services for individual drivers and commercial fleet clients.',
    body: 'RT Auto delivers reliable automotive services with the premium standard the RT brand is known for — from individual vehicle support to commercial fleet coordination.',
    cta: 'Contact RT Auto',
    services: [
      { name: 'Individual Vehicle Service', desc: 'Automotive consultation, service coordination, and customer support for individual clients.' },
      { name: 'Commercial Fleet', desc: 'Fleet management coordination, scheduling, and commercial automotive support programs.' },
      { name: 'Vehicle Acquisition', desc: 'Vehicle sourcing guidance and acquisition coordination for personal and business use.' },
      { name: 'Fleet Maintenance Scheduling', desc: 'Ongoing fleet maintenance scheduling and service coordination for commercial operators.' },
      { name: 'Auto Consulting', desc: 'Expert automotive consulting for businesses managing vehicle assets and transportation costs.' },
      { name: 'Commercial Inquiry', desc: 'New client intake and service qualification for commercial automotive relationships.' },
    ],
    formFields: [
      { id: 'vehicle-type', label: 'Vehicle / Fleet Type', type: 'select', options: ['Individual Vehicle','Commercial Fleet','Both'] },
      { id: 'year-make-model', label: 'Year / Make / Model', type: 'text', placeholder: 'e.g. 2022 Ford F-150' },
      { id: 'service-need', label: 'Service Need', type: 'select', options: ['Consultation','Fleet Coordination','Vehicle Acquisition','Maintenance Scheduling','Other'] },
    ],
    formSuccessMsg: 'Automotive inquiry received. RT Auto will follow up within 24 hours.',
    icon: '🚗',
    accentFact: ['Fleet', 'Capable'],
  },
  {
    key: 'assisted-living',
    name: 'RT Assisted Living',
    category: 'Senior Care & Family Support',
    tagline: 'Dignity. Compassion. Quality Care.',
    subtitle: 'A caring, dignified environment for seniors — giving families the peace of mind they deserve.',
    body: 'RT Assisted Living provides compassionate, dignified care for seniors in a supportive environment. We partner with families through every stage of the decision-making process — with transparency, warmth, and professionalism.',
    cta: 'Request Care Information',
    services: [
      { name: 'Independent Living Support', desc: 'Light assistance and community programming for seniors who value independence.' },
      { name: 'Assisted Living Care', desc: 'Comprehensive daily care assistance, medication management, and personal support.' },
      { name: 'Memory Care', desc: 'Specialized care environment for residents with Alzheimer\'s and dementia.' },
      { name: 'Family Communication', desc: 'Regular family updates, care plan reviews, and transparent communication protocols.' },
      { name: 'Care Plan Development', desc: 'Individualized care planning developed with the resident\'s physician and family.' },
      { name: 'Facility Tours', desc: 'Scheduled in-person and virtual tours for prospective residents and their families.' },
    ],
    formFields: [
      { id: 'relationship', label: 'Your Relationship to Resident', type: 'select', options: ['Son / Daughter','Spouse / Partner','Sibling','Legal Guardian','The Resident (Self)','Other'] },
      { id: 'care-level', label: 'Level of Care Needed', type: 'select', options: ['Independent Living','Assisted Living','Memory Care','Unsure — Need Guidance'] },
      { id: 'timeline', label: 'Move-in Timeline', type: 'select', options: ['Immediate (within 30 days)','1–3 Months','3–6 Months','Exploring Options'] },
      { id: 'resident-name', label: "Resident's Name (if known)", type: 'text', placeholder: 'Prospective Resident Name' },
    ],
    formSuccessMsg: 'Your inquiry has been received with care. A member of the RT Assisted Living team will reach out within 24 hours.',
    icon: '🤍',
    accentFact: ['24/7', 'Care Available'],
  },
  {
    key: 'wear',
    name: 'RT Wear',
    category: 'Luxury Apparel & Lifestyle',
    tagline: 'Wear the Legacy. Own the Look.',
    subtitle: 'Where brand meets lifestyle — crafted for those who move with purpose and lead with excellence.',
    body: 'RT Wear is the lifestyle and apparel division of the Resurrection Temple ecosystem. Every piece carries the RT identity — premium quality, bold branding, and the kind of statement that only legacy builders wear.',
    cta: 'Shop Collections',
    services: [
      { name: 'Signature RT Apparel', desc: 'Core RT branded apparel line — premium quality pieces that carry the ecosystem identity.' },
      { name: 'Dynasty Wealth System™ Merch', desc: 'Branded merchandise for Dynasty Wealth System™ clients, alumni, and supporters.' },
      { name: 'Limited Drops', desc: 'Exclusive limited-edition releases and seasonal drops for dedicated RT supporters.' },
      { name: 'Wholesale Orders', desc: 'Bulk and wholesale ordering for events, organizations, and retail partners.' },
      { name: 'Custom Design', desc: 'Custom branded apparel design for RT divisions, events, and partner organizations.' },
      { name: 'Retail Partnerships', desc: 'Retail partnership inquiries for boutiques and lifestyle retailers carrying RT Wear.' },
    ],
    formFields: [
      { id: 'inquiry-type', label: 'Inquiry Type', type: 'select', options: ['Individual Purchase','Wholesale Order','Custom Design','Retail Partnership','Limited Drop Notification','Other'] },
      { id: 'qty', label: 'Approximate Quantity', type: 'select', options: ['1–5 pieces','6–25 pieces','26–100 pieces','100+ pieces'] },
    ],
    formSuccessMsg: 'RT Wear inquiry received. We will be in touch shortly.',
    icon: '👕',
    accentFact: ['Premium', 'RT Branded'],
  },
];

// ── HTML TEMPLATE ────────────────────────────────────────────────────
function buildFormField(field, divisionKey) {
  const id = `${divisionKey}-${field.id}`;
  const label = `<label class="form-label" for="${id}">${field.label}</label>`;
  let input = '';
  if (field.type === 'select') {
    input = `<select class="form-select" id="${id}" name="${field.id}">
      ${field.options.map(o => `<option>${o}</option>`).join('\n      ')}
    </select>`;
  } else if (field.type === 'textarea') {
    input = `<textarea class="form-textarea" id="${id}" name="${field.id}" placeholder="${field.placeholder || ''}"></textarea>`;
  } else {
    input = `<input class="form-input" type="${field.type}" id="${id}" name="${field.id}" placeholder="${field.placeholder || ''}">`;
  }
  return `        <div class="form-group">
          ${label}
          ${input}
        </div>`;
}

function buildPage(div) {
  const extraFields = div.formFields.map(f => buildFormField(f, div.key)).join('\n');
  const services = div.services.map((s, i) => `
        <div class="card reveal${i % 3 !== 0 ? ' reveal-delay-' + (i % 3) : ''}">
          <div class="card-label">${s.name}</div>
          <p class="card-body">${s.desc}</p>
        </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${div.name} — ${div.subtitle}">
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
    <nav class="main-nav">
      <a href="/" class="nav-link">Ecosystem</a>
      <a href="/pages/builders" class="nav-link${div.key === 'builders' ? ' active' : ''}">Builders</a>
      <a href="/pages/transport" class="nav-link${div.key === 'transport' ? ' active' : ''}">Transport</a>
      <a href="/pages/enterprises" class="nav-link${div.key === 'enterprises' ? ' active' : ''}">Enterprises</a>
      <a href="/pages/investments" class="nav-link${div.key === 'investments' ? ' active' : ''}">Investments</a>
      <a href="/pages/notary" class="nav-link${div.key === 'notary' ? ' active' : ''}">Notary</a>
      <a href="/pages/consultants" class="nav-link${div.key === 'consultants' ? ' active' : ''}">Consultants</a>
      <a href="/pages/brokers" class="nav-link${div.key === 'brokers' ? ' active' : ''}">Brokers</a>
      <a href="/pages/ip" class="nav-link${div.key === 'ip' ? ' active' : ''}">IP</a>
      <a href="/pages/assisted-living" class="nav-link${div.key === 'assisted-living' ? ' active' : ''}">Assisted Living</a>
      <a href="/pages/wear" class="nav-link${div.key === 'wear' ? ' active' : ''}">Wear</a>
      <a href="/portal/" class="nav-link">Client Portal</a>
    </nav>
    <a href="/portal/intake" class="nav-cta btn-gold">Begin Intake</a>
    <button class="hamburger" id="hamburger">☰</button>
  </div>
</header>

<div class="mobile-nav" id="mobile-nav">
  <div class="mobile-nav-grid">
    <a href="/" class="mobile-nav-item">Ecosystem</a>
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

  <!-- HERO -->
  <section class="hero">
    <div class="hero-left">
      <div class="hero-eyebrow">${div.category}</div>
      <h1 class="hero-title">${div.tagline.replace(/\. /g, '.<br>').replace(/([A-Z][a-z]+\.)/, '<em>$1</em>')}</h1>
      <p class="hero-body">${div.body}</p>
      <div class="hero-ctas">
        <a href="#inquiry" class="btn btn-gold btn-lg">${div.cta}</a>
        <a href="/" class="btn btn-outline btn-lg">← RT Ecosystem</a>
      </div>
    </div>
    <div class="hero-right">
      <div class="card card-gold">
        <div class="card-label">${div.name}</div>
        <div class="card-title" style="font-family:var(--font-display);font-size:1.8rem;font-weight:300;">${div.icon} ${div.accentFact[0]}</div>
        <p class="card-body" style="margin-top:4px;">${div.accentFact[1]}</p>
      </div>
      <div class="card">
        <div class="card-label">Contact</div>
        <div class="card-body" style="font-size:13px;line-height:2.1;">
          ☎ <a href="tel:+16264791082" style="color:var(--text2);">(626) 479-1082</a><br>
          ✉ <a href="mailto:cmayweather@ResurrectionTemple.org" style="color:var(--text2);">cmayweather@ResurrectionTemple.org</a><br>
          🕐 Mon–Fri · 9:00 AM–5:00 PM
        </div>
      </div>
      <a href="/portal/intake" class="btn btn-outline btn-full">Start Client Portal Intake</a>
    </div>
  </section>

  <!-- SERVICES -->
  <section class="section">
    <div class="section-eyebrow">What We Offer</div>
    <h2 class="section-title">${div.name} Services</h2>
    <p class="section-sub">${div.subtitle}</p>
    <div class="grid-3" style="margin-top:2.5rem;">
      ${services}
    </div>
  </section>

  <hr class="divider">

  <!-- INQUIRY FORM -->
  <section class="section" id="inquiry">
    <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:3rem;align-items:start;">
      <div>
        <div class="section-eyebrow">Inquiry</div>
        <h2 class="section-title" style="font-size:2rem;">${div.cta}</h2>
        <p class="section-sub" style="margin-bottom:2rem;">Fill out the form and an ${div.name} representative will respond within 24–48 business hours.</p>
        <div class="card card-gold" style="font-size:13px;line-height:2.1;color:var(--text2);">
          <div class="card-label">Direct Contact</div>
          ☎ <a href="tel:+16264791082" style="color:var(--text2);">(626) 479-1082</a><br>
          ✉ <a href="mailto:cmayweather@ResurrectionTemple.org" style="color:var(--text2);">cmayweather@ResurrectionTemple.org</a><br>
          📍 301 E Arrow Hwy Ste 101-#815<br>San Dimas, CA 91773<br>
          🕐 Mon–Fri · 9:00 AM–5:00 PM
        </div>
      </div>
      <div>
        <form data-form="${div.key}-inquiry" novalidate>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label" for="${div.key}-name">Full Name *</label>
              <input class="form-input" type="text" id="${div.key}-name" name="name" placeholder="Your Full Name" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="${div.key}-phone">Phone</label>
              <input class="form-input" type="tel" id="${div.key}-phone" name="phone" placeholder="(000) 000-0000">
            </div>
            <div class="form-group full">
              <label class="form-label" for="${div.key}-email">Email *</label>
              <input class="form-input" type="email" id="${div.key}-email" name="email" placeholder="you@example.com" required>
            </div>
${extraFields}
            <div class="form-group full">
              <label class="form-label" for="${div.key}-message">Message / Details</label>
              <textarea class="form-textarea" id="${div.key}-message" name="message" placeholder="Tell us more about your needs..."></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-gold btn-full btn-lg">${div.cta}</button>
              <div class="form-success">${div.formSuccessMsg}</div>
              <div class="form-error"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>

  <!-- DIVISION FOOTER NAV -->
  <section class="section-sm" style="padding-bottom:4rem;">
    <div class="section-eyebrow">Explore More</div>
    <h2 class="section-title" style="font-size:1.6rem;margin-bottom:1.5rem;">Other RT Divisions</h2>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
      ${DIVISIONS.filter(d => d.key !== div.key).slice(0,8).map(d =>
        `<a href="/pages/${d.key}" class="division-card">
        <div class="div-cat">${d.category.split('&')[0].trim()}</div>
        <div class="div-name">${d.name}</div>
        <div class="div-arrow">→</div>
      </a>`).join('\n      ')}
    </div>
  </section>

</div>
</div>
</main>

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="wordmark">Resurrection Temple</div>
      <p class="tagline">A multi-entity brand empire built on faith, discipline, and the relentless pursuit of legacy.</p>
      <div class="footer-legal">
        <a href="/pages/privacy">Privacy Policy</a>
        <a href="/pages/terms">Terms of Use</a>
        <a href="/portal/">Client Portal</a>
        <a href="/">Main Site</a>
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
let count = 0;
DIVISIONS.forEach(div => {
  const html = buildPage(div);
  const outPath = path.join(OUT, `${div.key}.html`);
  fs.writeFileSync(outPath, html);
  console.log(`✓ Generated: pages/${div.key}.html`);
  count++;
});
console.log(`\n✅ ${count} division pages generated in ${OUT}`);
