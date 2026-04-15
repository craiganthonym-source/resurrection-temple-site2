/* ══════════════════════════════════════════════════════════════
   RESURRECTION TEMPLE — CONTRACT GENERATORS
   All 8 contract templates with live field rendering
   ══════════════════════════════════════════════════════════════ */

'use strict';

// ── HELPERS ─────────────────────────────────────────────────────────
function v(id) { const el = document.getElementById(id); return (el && el.value.trim()) ? el.value.trim() : '[________________]'; }
function fmtDate(id) {
  const el = document.getElementById(id);
  if (!el || !el.value) return '[Date]';
  const [y,m,d] = el.value.split('-');
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return `${months[parseInt(m)-1]} ${parseInt(d)}, ${y}`;
}

function toggleAcc(id) {
  const card = document.getElementById(id);
  if (card) card.classList.toggle('open');
}

function togglePreview(previewId, renderFn) {
  const pane = document.getElementById(previewId);
  if (!pane) return;
  if (pane.classList.contains('open')) { pane.classList.remove('open'); return; }
  pane.classList.add('open');
  if (renderFn) renderFn();
}

function copyContract(previewId) {
  const el = document.getElementById(previewId);
  if (!el || !el.innerText.trim()) { alert('Click "Preview Contract" first, then copy.'); return; }
  navigator.clipboard.writeText(el.innerText).then(() => {
    if (window.showToast) showToast('Contract text copied to clipboard.');
    else alert('Copied to clipboard.');
  });
}

function printContract(previewId, title) {
  const el = document.getElementById(previewId);
  if (!el || !el.innerText.trim()) { alert('Click "Preview Contract" first, then print.'); return; }
  const w = window.open('', '_blank');
  w.document.write(`<!DOCTYPE html><html><head><title>${title}</title>
  <style>
    body{font-family:Georgia,serif;padding:3rem;max-width:780px;margin:0 auto;font-size:13px;line-height:2;color:#111;}
    h1{font-size:18px;margin-bottom:1rem;border-bottom:2px solid #B8922A;padding-bottom:0.5rem;}
    pre{white-space:pre-wrap;font-family:Georgia,serif;}
    @media print{body{padding:1.5rem;}}
  </style></head><body>
  <h1>${title}</h1>
  <pre>${el.innerText}</pre>
  </body></html>`);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 600);
}

// ── CONTRACT 1: MASTER SERVICE AGREEMENT ───────────────────────────
function renderMSA() {
  const el = document.getElementById('msa-preview');
  if (!el || !el.classList.contains('open')) return;
  const client = v('msa-client'), date = fmtDate('msa-date'), services = v('msa-services'), fee = v('msa-fee');
  el.textContent = `MASTER SERVICE AGREEMENT
Resurrection Temple Ministries

Effective Date: ${date}

This Service Agreement ("Agreement") is entered into between:

SERVICE PROVIDER: Resurrection Temple Ministries ("RT Ministries")
  Craig Mayweather, President
  301 E Arrow Hwy Ste 101-#815, San Dimas, CA 91773
  (626) 479-1082 | cmayweather@ResurrectionTemple.org

CLIENT: ${client} ("Client")

1. SCOPE OF SERVICES
RT Ministries agrees to provide the following administrative services:
  ${services}

Services may also include client intake review, document assembly, scheduling of notarization, registered address coordination, EIN procurement, digital setup, and website setup as ordered.

2. PRICING AND FEE SCHEDULE
Total fees for services selected: $${fee}

Full pricing schedule (incorporated by reference):
  Trust setup (family/business/ministry):  $700 per trust
  Single-Member LLC (Basic):               $700 one-time
  Multi-Member LLC (Standard):             $950 one-time
  LLC + DBA Filing:                        $850 one-time
  S-Corp Election (Form 2553):             $1,100 one-time
  Holding Company Structure:               $1,600 one-time
  Full Corporate Stack:                    $2,500 one-time
  508(c)(1)(A) Ministry Corp:              $1,200 one-time
  Corporate Compliance Package:            $350 annually
  Business Credit Foundation:              $500 one-time
  Corporate Resolution Drafting:           $150 per resolution
  Notary service:                          $140 per trust
  Business address:                        $140 per trust
  Annual maintenance:                      $110 annually
  Domain (.com or .org):                   $15 each
  EIN + email + phone setup:               $65
  Website setup:                           $500 one-time
  Monthly hosting:                         $20/month

3. PAYMENT TERMS
All setup fees are due in advance before work begins. Annual and monthly items remain the Client's responsibility for as long as the Client maintains those services. Work may be paused for non-payment, incomplete intake submissions, or missing identification.

4. CLIENT RESPONSIBILITIES
  a) Provide complete, accurate personal, ministry, and business information
  b) Supply timely identification documents and requested signatures
  c) Provide all formation details required to complete the order
  d) Review all final documents before use

5. NO LEGAL, TAX, OR INVESTMENT ADVICE
RT Ministries is not a law firm, CPA firm, investment adviser, or fiduciary. All services are administrative, ministerial, and document-support in nature. The Client is encouraged to obtain independent legal and tax advice before relying on any structure.

6. LIMITATION OF LIABILITY
RT Ministries is not liable for governmental filing decisions, tax treatment, bank or vendor acceptance, or legal outcomes connected to the Client's use of any trust, ministry, or corporate structure. Total liability shall not exceed the amount paid by the Client for the specific service at issue.

7. CONFIDENTIALITY
All client data is subject to the Confidentiality and Non-Disclosure Agreement included in this packet and handled accordingly.

8. REFUND POLICY
Fees are non-refundable once drafting, intake review, scheduling, document preparation, or third-party coordination has begun. Refunds for work not started remain at RT Ministries' sole discretion, less processing or filing charges already incurred.

9. GOVERNING LAW
This Agreement is governed by the laws of the State of California.

IN WITNESS WHEREOF, the parties agree as of ${date}.

CLIENT:
Signature: ________________________________
Printed Name: ${client}
Date: ____________________

SERVICE PROVIDER:
Resurrection Temple Ministries / Craig Mayweather
Date: ____________________`;
}

// ── CONTRACT 2: NDA ─────────────────────────────────────────────────
function renderNDA() {
  const el = document.getElementById('nda-preview');
  if (!el || !el.classList.contains('open')) return;
  const p1=v('nda-p1'), p2=v('nda-p2'), date=fmtDate('nda-date'), dur=v('nda-dur'), purpose=v('nda-purpose'), state=v('nda-state');
  el.textContent = `NON-DISCLOSURE AGREEMENT

Effective Date: ${date}

DISCLOSING PARTY: ${p1}
RECEIVING PARTY: ${p2}

1. PURPOSE
The parties wish to explore a potential ${purpose}. In connection with this purpose, the Disclosing Party may share confidential and proprietary information with the Receiving Party.

2. CONFIDENTIAL INFORMATION
"Confidential Information" means any data or information that is proprietary to the Disclosing Party and not generally known to the public, including but not limited to: business plans, financial data, trade secrets, customer lists, processes, technology, and any information designated as confidential.

3. OBLIGATIONS
The Receiving Party agrees to:
  a) Hold all Confidential Information in strict confidence
  b) Not disclose Confidential Information to any third party without prior written consent
  c) Use Confidential Information solely for the stated Purpose
  d) Protect Confidential Information with at least the same care used for its own confidential information

4. TERM
This Agreement remains in effect for ${dur} year(s) from the Effective Date.

5. EXCLUSIONS
Obligations do not apply to information that: (a) is or becomes publicly known through no breach of this Agreement; (b) was rightfully in the Receiving Party's possession before disclosure; (c) is independently developed; or (d) is required to be disclosed by law or court order.

6. RETURN OF INFORMATION
Upon request, the Receiving Party shall promptly return or destroy all Confidential Information.

7. REMEDIES
Breach of this Agreement may cause irreparable harm, entitling the Disclosing Party to seek injunctive relief in addition to all other legal remedies.

8. GOVERNING LAW
This Agreement is governed by the laws of the State of ${state}.

DISCLOSING PARTY:
Signature: ________________________________
Printed Name: ${p1}
Date: ____________________

RECEIVING PARTY:
Signature: ________________________________
Printed Name: ${p2}
Date: ____________________`;
}

// ── CONTRACT 3: LLC OPERATING AGREEMENT ─────────────────────────────
function renderLLC() {
  const el = document.getElementById('llc-preview');
  if (!el || !el.classList.contains('open')) return;
  const name=v('llc-name'), state=v('llc-state'), m1=v('llc-m1'), m1pct=v('llc-m1pct'),
        m2=document.getElementById('llc-m2')?.value.trim(), m2pct=v('llc-m2pct'),
        date=fmtDate('llc-date'), addr=v('llc-addr');
  const isSingle = !m2;
  el.textContent = `LLC OPERATING AGREEMENT
${name}
A ${state} Limited Liability Company

Effective Date: ${date}

ARTICLE I — FORMATION
1.1 Name: ${name}
1.2 Principal Office: ${addr}
1.3 Purpose: The Company is organized to engage in any lawful business activity.
1.4 Term: The Company shall continue perpetually unless dissolved per this Agreement.

ARTICLE II — MEMBERS AND OWNERSHIP
${isSingle
    ? `2.1 Single-Member LLC — Sole Member: ${m1} — 100% Membership Interest`
    : `2.1 Members and Ownership Interests:
   ${m1}: ${m1pct}% Membership Interest
   ${m2}: ${m2pct}% Membership Interest`}

ARTICLE III — MANAGEMENT
3.1 The Company shall be Member-Managed. All Members have authority to bind the Company in the ordinary course of business.
3.2 Decisions requiring unanimous consent: amendment of this Agreement, admission of new Members, sale of substantially all assets, dissolution.

ARTICLE IV — CAPITAL CONTRIBUTIONS
4.1 Members have made or agreed to make capital contributions as recorded in the Company's books.
4.2 No Member is required to make additional capital contributions without unanimous consent.

ARTICLE V — DISTRIBUTIONS
5.1 Distributions shall be made at Member discretion in proportion to membership interests.
5.2 No distribution shall be made that renders the Company unable to pay its debts.

ARTICLE VI — TAXES
6.1 The Company will be taxed as a ${isSingle ? 'Disregarded Entity (Schedule C)' : 'Partnership'} for federal income tax purposes unless otherwise elected.

ARTICLE VII — TRANSFER OF INTERESTS
7.1 No Member may transfer, sell, or assign membership interest without prior written consent of all other Members.
7.2 Any purported transfer in violation of this Agreement is void.

ARTICLE VIII — DISSOLUTION
8.1 The Company shall be dissolved upon unanimous written agreement of all Members, or as required by state law.

ARTICLE IX — GOVERNING LAW
This Agreement is governed by the laws of the State of ${state}.

IN WITNESS WHEREOF, the Members execute this Agreement as of ${date}.

Member Signature: ________________________________
Printed Name: ${m1} — ${m1pct}% Interest
Date: ____________________
${!isSingle ? `\nMember Signature: ________________________________\nPrinted Name: ${m2} — ${m2pct}% Interest\nDate: ____________________` : ''}`;
}

// ── CONTRACT 4: INDEPENDENT CONTRACTOR ──────────────────────────────
function renderICA() {
  const el = document.getElementById('ica-preview');
  if (!el || !el.classList.contains('open')) return;
  const co=v('ica-co'), cont=v('ica-cont'), date=fmtDate('ica-date'), rate=v('ica-rate'), scope=v('ica-scope'), end=fmtDate('ica-end');
  el.textContent = `INDEPENDENT CONTRACTOR AGREEMENT

Effective Date: ${date}

COMPANY: ${co} ("Company")
CONTRACTOR: ${cont} ("Contractor")

1. ENGAGEMENT
Company engages Contractor to perform: ${scope} ("Services").

2. INDEPENDENT CONTRACTOR STATUS
Contractor is an independent contractor, not an employee, partner, or agent of Company. Contractor is solely responsible for all taxes, insurance, and statutory obligations. Company will not withhold income taxes, FICA, or provide employee benefits.

3. COMPENSATION
Company shall pay Contractor at the rate of: ${rate}.
Invoices are due within 30 days of submission.

4. TERM
This Agreement commences ${date} and continues through ${end}, unless terminated earlier.

5. INTELLECTUAL PROPERTY
All work product created by Contractor in performance of Services is work-for-hire and becomes the sole and exclusive property of Company. Contractor assigns all intellectual property rights therein to Company.

6. CONFIDENTIALITY
Contractor agrees to keep all Company information, business strategies, and client data strictly confidential during and after the term of this Agreement.

7. NON-SOLICITATION
During the term and for one (1) year thereafter, Contractor shall not solicit Company's clients or employees for competing purposes.

8. TERMINATION
Either party may terminate with fourteen (14) days written notice. Company may terminate immediately for cause, including material breach or misconduct.

9. INDEMNIFICATION
Contractor shall indemnify and hold harmless Company from any claims arising from Contractor's negligence, misconduct, or breach of this Agreement.

10. GOVERNING LAW
This Agreement is governed by the laws of the State of California.

COMPANY:
Signature: ________________________________
Title / Company: ${co}
Date: ____________________

CONTRACTOR:
Signature: ________________________________
Printed Name: ${cont}
Date: ____________________`;
}

// ── CONTRACT 5: WAIVER OF LIABILITY ─────────────────────────────────
function renderWOL() {
  const el = document.getElementById('wol-preview');
  if (!el || !el.classList.contains('open')) return;
  const org=v('wol-org'), part=v('wol-part'), act=v('wol-act'), date=fmtDate('wol-date');
  el.textContent = `WAIVER AND RELEASE OF LIABILITY

Date: ${date}

ORGANIZATION: ${org}
PARTICIPANT: ${part}
ACTIVITY: ${act}

1. ASSUMPTION OF RISK
I, ${part}, understand and acknowledge that participation in ${act} involves inherent risks, including but not limited to physical injury, property damage, and other unforeseen hazards. I voluntarily assume all such risks.

2. RELEASE OF LIABILITY
I, on behalf of myself, my heirs, executors, and assigns, hereby RELEASE, WAIVE, DISCHARGE, and COVENANT NOT TO SUE ${org}, its officers, directors, employees, agents, and representatives from any and all claims, demands, damages, costs, expenses, and causes of action arising from my participation in ${act}, whether caused by negligence or otherwise.

3. INDEMNIFICATION
I agree to indemnify and hold harmless ${org} and its representatives from any loss, liability, damage, or costs, including attorneys' fees, arising from my participation.

4. MEDICAL AUTHORIZATION
In the event of an emergency, I authorize ${org} to seek medical treatment on my behalf. I agree to be responsible for all medical costs incurred.

5. ACKNOWLEDGMENT
I have read this Waiver carefully. I understand it fully and sign it voluntarily. I am at least 18 years of age and legally competent to sign this Agreement.

PARTICIPANT:
Signature: ________________________________
Printed Name: ${part}
Date: ${date}

Parent/Guardian (if Participant is a Minor):
Signature: ________________________________
Printed Name: ________________________________
Relationship: ________________________________
Date: ____________________`;
}

// ── CONTRACT 6: CAPITAL CONTRIBUTION ────────────────────────────────
function renderCCA() {
  const el = document.getElementById('cca-preview');
  if (!el || !el.classList.contains('open')) return;
  const entity=v('cca-entity'), cont=v('cca-cont'), amt=v('cca-amt'), pct=v('cca-pct'), date=fmtDate('cca-date'), state=v('cca-state');
  el.textContent = `CAPITAL CONTRIBUTION AGREEMENT

Effective Date: ${date}

ENTITY: ${entity} ("Company")
CONTRIBUTOR: ${cont} ("Contributor")

1. CAPITAL CONTRIBUTION
Contributor agrees to contribute to the Company the sum of $${amt} ("Contribution") in exchange for a ${pct}% membership interest in the Company.

2. FORM OF CONTRIBUTION
The Contribution shall be made in cash, wired or delivered to the Company's designated account, unless otherwise agreed in writing.

3. MEMBERSHIP INTEREST
Upon receipt of the Contribution, the Company shall issue to Contributor a ${pct}% membership interest, representing Contributor's proportionate share in profits, losses, and distributions as governed by the Company's Operating Agreement.

4. REPRESENTATIONS OF CONTRIBUTOR
Contributor represents and warrants that:
  a) Contributor has full legal authority to enter this Agreement
  b) The Contribution is made from lawful funds
  c) Contributor has had the opportunity to seek independent legal and financial advice

5. REPRESENTATIONS OF COMPANY
The Company represents that:
  a) It is duly organized and in good standing under the laws of ${state}
  b) This Agreement has been authorized by all required action
  c) The membership interest granted hereunder is validly issued

6. GOVERNING LAW
This Agreement is governed by the laws of the State of ${state}.

COMPANY:
Signature: ________________________________
Authorized Representative: ________________________________
Entity: ${entity}
Date: ____________________

CONTRIBUTOR:
Signature: ________________________________
Printed Name: ${cont}
Date: ____________________`;
}

// ── CONTRACT 7: COPYRIGHT TRANSFER ──────────────────────────────────
function renderCTA() {
  const el = document.getElementById('cta-preview');
  if (!el || !el.classList.contains('open')) return;
  const from=v('cta-from'), to=v('cta-to'), work=v('cta-work'), pay=v('cta-pay'), date=fmtDate('cta-date'), state=v('cta-state');
  el.textContent = `COPYRIGHT TRANSFER AGREEMENT

Effective Date: ${date}

TRANSFEROR: ${from} ("Transferor")
TRANSFEREE: ${to} ("Transferee")

1. DESCRIPTION OF WORK
The work subject to this Agreement is: ${work} ("Work"). Transferor represents that the Work is an original creation and that Transferor holds all copyright and intellectual property rights therein.

2. TRANSFER OF COPYRIGHT
Transferor hereby irrevocably and exclusively transfers, assigns, and conveys to Transferee all right, title, and interest in and to the Work, including:
  a) All copyrights and renewals thereof
  b) The right to reproduce, distribute, display, and perform the Work
  c) The right to create derivative works
  d) All rights under 17 U.S.C. § 101 et seq.

3. CONSIDERATION
In consideration of this transfer, Transferee shall pay Transferor $${pay}. Payment shall be made within 10 business days of execution.

4. REPRESENTATIONS AND WARRANTIES
Transferor represents and warrants that:
  a) Transferor is the sole creator and owner of the Work
  b) The Work does not infringe any third-party intellectual property rights
  c) Transferor has not previously sold, licensed, or encumbered the Work
  d) No claims or disputes exist regarding the Work

5. MORAL RIGHTS WAIVER
To the extent permitted by law, Transferor waives any and all moral rights in the Work.

6. FURTHER ASSURANCES
Transferor agrees to execute additional documents reasonably required to perfect and record this transfer with the U.S. Copyright Office.

7. GOVERNING LAW
This Agreement is governed by the laws of the State of ${state} and applicable federal copyright law.

TRANSFEROR:
Signature: ________________________________
Printed Name: ${from}
Date: ____________________

TRANSFEREE:
Signature: ________________________________
Entity: ${to}
Date: ____________________`;
}

// ── CONTRACT 8: LLC LOAN AGREEMENT ──────────────────────────────────
function renderLoan() {
  const el = document.getElementById('loan-preview');
  if (!el || !el.classList.contains('open')) return;
  const lender=v('loan-lender'), borrow=v('loan-borrow'), amt=v('loan-amt'), rate=v('loan-rate'), date=fmtDate('loan-date'), term=v('loan-term');
  el.textContent = `LLC LOAN AGREEMENT

Loan Date: ${date}

LENDER: ${lender} ("Lender")
BORROWER: ${borrow} ("Borrower")

1. LOAN AMOUNT
Lender agrees to loan to Borrower the principal sum of $${amt} ("Loan").

2. INTEREST RATE
The outstanding principal balance shall bear interest at ${rate}% per annum, computed on a 365-day year basis.

3. REPAYMENT SCHEDULE
Borrower shall repay the Loan in equal monthly installments of principal and interest over ${term} month(s), beginning thirty (30) days from the Loan Date.

4. PREPAYMENT
Borrower may prepay this Loan in whole or in part at any time without penalty.

5. DEFAULT
The following events constitute default:
  a) Failure to make any payment within 15 days of its due date
  b) Borrower's insolvency, bankruptcy, or assignment for benefit of creditors
  c) Material breach of any representation or warranty herein

Upon default, the entire outstanding balance shall become immediately due and payable.

6. REMEDIES
Upon default, Lender may exercise all rights available at law and in equity, including initiating legal proceedings for collection of outstanding balance, interest, and reasonable attorneys' fees.

7. GOVERNING LAW
This Agreement shall be governed by the laws of the State of California.

LENDER:
Signature: ________________________________
Printed Name: ${lender}
Date: ____________________

BORROWER:
Signature: ________________________________
Authorized Representative: ________________________________
Entity: ${borrow}
Date: ____________________`;
}
