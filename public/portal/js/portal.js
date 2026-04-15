/* ══════════════════════════════════════════════════════════════
   RESURRECTION TEMPLE — PORTAL JS
   ══════════════════════════════════════════════════════════════ */

'use strict';

// ── SERVICE CHECKBOX INTERACTION ────────────────────────────────────
document.querySelectorAll('.service-check-item input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', function() {
    this.closest('.service-check-item').classList.toggle('checked', this.checked);
    updateRunningTotal();
    toggleCorpFields();
  });
});

function toggleCorpFields() {
  const corpFields = document.getElementById('corp-fields');
  if (!corpFields) return;
  const corpChecks = [
    'llc-single-700','llc-multi-950','llc-dba-850','scorp-1100',
    'holding-1600','fullstack-2500','ministry-corp-1200','compliance-350','biz-credit-500','resolution-150'
  ];
  const hasCorp = corpChecks.some(val => {
    const el = document.querySelector(`input[value="${val}"]`);
    return el && el.checked;
  });
  corpFields.style.display = hasCorp ? 'block' : 'none';
}

// ── RUNNING TOTAL ────────────────────────────────────────────────────
const PRICES = {
  'family-trust-700': 700,
  'business-trust-700': 700,
  'ministry-trust-700': 700,
  'llc-single-700': 700,
  'llc-multi-950': 950,
  'llc-dba-850': 850,
  'scorp-1100': 1100,
  'holding-1600': 1600,
  'fullstack-2500': 2500,
  'ministry-corp-1200': 1200,
  'compliance-350': 350,
  'biz-credit-500': 500,
  'resolution-150': 150,
  'notary-140': 140,
  'address-140': 140,
  'maintenance-110': 110,
  'domain-15': 15,
  'ein-email-phone-65': 65,
  'website-500': 500,
  'hosting-20': 20
};

function updateRunningTotal() {
  let total = 0;
  document.querySelectorAll('.service-check-item input[type="checkbox"]:checked').forEach(cb => {
    total += PRICES[cb.value] || 0;
  });
  const totalEl = document.getElementById('running-total');
  if (totalEl) {
    totalEl.textContent = '$' + total.toLocaleString();
    totalEl.parentElement.style.display = total > 0 ? 'block' : 'none';
  }
}

// Inject running total display if on intake page
(function injectRunningTotal() {
  const form = document.getElementById('intake-form');
  if (!form) return;
  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `
    <div style="background:var(--gold-pale);border:1px solid var(--gold-border);border-radius:var(--radius);padding:16px 20px;margin-bottom:16px;display:none;">
      <div style="font-family:var(--font-cond);font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:6px;">Estimated Total</div>
      <div id="running-total" style="font-family:var(--font-display);font-size:2rem;font-weight:300;color:var(--gold-light);">$0</div>
      <div style="font-size:11px;color:var(--text3);margin-top:4px;">State filing fees not included. Final invoice will be confirmed by your RT representative.</div>
    </div>
  `;
  const lastSection = form.querySelector('.intake-section:last-of-type');
  if (lastSection) lastSection.before(totalDiv.firstElementChild);
})();
