/* ══════════════════════════════════════════════════════════════
   RESURRECTION TEMPLE — ADMIN JS
   ══════════════════════════════════════════════════════════════ */

'use strict';

// ── CONFIG ──────────────────────────────────────────────────────────
// Change this password in production — also add server-side auth
const ADMIN_PASSWORD = 'RT2025Admin!';

let allSubmissions = [];
let sortKey = 'timestamp';
let sortAsc  = false;

// ── LOGIN ────────────────────────────────────────────────────────────
function attemptLogin() {
  const pass = document.getElementById('admin-pass').value;
  const err  = document.getElementById('login-error');
  if (pass === ADMIN_PASSWORD) {
    document.getElementById('login-gate').style.display = 'none';
    document.getElementById('dashboard').style.display  = 'block';
    sessionStorage.setItem('rt-admin', '1');
    loadSubmissions();
  } else {
    err.style.display = 'block';
    document.getElementById('admin-pass').value = '';
    document.getElementById('admin-pass').focus();
  }
}

function logout() {
  sessionStorage.removeItem('rt-admin');
  location.reload();
}

document.getElementById('admin-pass')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') attemptLogin();
});

// Auto-login if session exists
if (sessionStorage.getItem('rt-admin') === '1') {
  document.getElementById('login-gate').style.display = 'none';
  document.getElementById('dashboard').style.display  = 'block';
  loadSubmissions();
}

// ── LOAD DATA ────────────────────────────────────────────────────────
async function loadSubmissions() {
  try {
    const res  = await fetch('/api/submissions');
    const data = await res.json();
    allSubmissions = (data.submissions || []).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
    updateStats();
    renderTable(allSubmissions);
  } catch(e) {
    document.getElementById('table-body').innerHTML =
      '<tr><td colspan="7" style="text-align:center;color:#e07070;padding:2rem;">Failed to load submissions. Is the server running?</td></tr>';
  }
}

// ── STATS ────────────────────────────────────────────────────────────
function updateStats() {
  document.getElementById('stat-total').textContent    = allSubmissions.length;
  document.getElementById('stat-intakes').textContent  = allSubmissions.filter(s => s.formType === 'client-intake').length;
  document.getElementById('stat-invoices').textContent = allSubmissions.filter(s => s.formType === 'invoice-request').length;
  document.getElementById('stat-contacts').textContent = allSubmissions.filter(s =>
    !['client-intake','invoice-request'].includes(s.formType)).length;
}

// ── RENDER TABLE ──────────────────────────────────────────────────────
function renderTable(rows) {
  const tbody = document.getElementById('table-body');
  const empty = document.getElementById('table-empty');
  if (!rows.length) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  tbody.innerHTML = rows.map((r, i) => {
    const date    = new Date(r.timestamp).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'});
    const time    = new Date(r.timestamp).toLocaleTimeString('en-US', {hour:'2-digit',minute:'2-digit'});
    const badge   = typeBadge(r.formType);
    const preview = buildPreview(r);
    return `<tr>
      <td style="white-space:nowrap;"><div>${date}</div><div style="font-size:11px;color:var(--text3);">${time}</div></td>
      <td>${badge}</td>
      <td style="font-weight:500;color:var(--text);">${r.name || '—'}</td>
      <td><a href="mailto:${r.email || ''}" style="color:var(--gold);text-decoration:none;">${r.email || '—'}</a></td>
      <td>${r.phone || '—'}</td>
      <td style="color:var(--text3);max-width:160px;">${preview}</td>
      <td><button class="btn-view" onclick="openModal(${i})">View Details</button></td>
    </tr>`;
  }).join('');
}

function typeBadge(type) {
  if (!type) return `<span class="badge-type badge-default">—</span>`;
  const map = {
    'client-intake':  ['badge-intake','Intake'],
    'invoice-request':['badge-invoice','Invoice'],
    'general-contact':['badge-contact','Contact'],
  };
  const match = map[type];
  if (match) return `<span class="badge-type ${match[0]}">${match[1]}</span>`;
  if (type.includes('inquiry')) return `<span class="badge-type badge-inquiry">${type.replace('-inquiry','').replace(/-/g,' ')}</span>`;
  return `<span class="badge-type badge-default">${type}</span>`;
}

function buildPreview(r) {
  if (r.formType === 'client-intake') {
    const svcs = Array.isArray(r.services) ? r.services.slice(0,2).join(', ') : (r.services || '');
    return svcs ? svcs.substring(0,60) + '...' : 'No services selected';
  }
  if (r.formType === 'invoice-request') return `Total: ${r.total || '—'} | ${r.services ? r.services.substring(0,40) : ''}`;
  return (r.message || r.details || '').substring(0,60);
}

// ── FILTER ───────────────────────────────────────────────────────────
function filterTable() {
  const q    = (document.getElementById('search-input').value || '').toLowerCase();
  const type = document.getElementById('filter-type').value;
  const filtered = allSubmissions.filter(r => {
    const matchType = !type || r.formType === type;
    const matchQ    = !q ||
      (r.name  || '').toLowerCase().includes(q) ||
      (r.email || '').toLowerCase().includes(q) ||
      (r.formType || '').toLowerCase().includes(q) ||
      (r.message || '').toLowerCase().includes(q) ||
      (r.services || '').toLowerCase().includes(q);
    return matchType && matchQ;
  });
  renderTable(filtered);
}

// ── SORT ─────────────────────────────────────────────────────────────
function sortTable(key) {
  if (sortKey === key) sortAsc = !sortAsc;
  else { sortKey = key; sortAsc = false; }
  const sorted = [...allSubmissions].sort((a, b) => {
    const av = (a[key] || '').toString().toLowerCase();
    const bv = (b[key] || '').toString().toLowerCase();
    return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
  });
  renderTable(sorted);
}

// ── MODAL ────────────────────────────────────────────────────────────
function openModal(idx) {
  const r = allSubmissions[idx];
  if (!r) return;
  document.getElementById('modal-type').textContent = r.formType || 'Submission';
  document.getElementById('modal-name').textContent = r.name || '—';
  document.getElementById('modal-email-link').href  = `mailto:${r.email || ''}?subject=RE: Your Resurrection Temple Inquiry`;

  const skip = ['id'];
  const rows = Object.entries(r)
    .filter(([k]) => !skip.includes(k))
    .map(([k, v]) => {
      const val = Array.isArray(v) ? v.join(', ') : (v || '—');
      return `<div class="modal-row"><div class="modal-key">${k}</div><div class="modal-val">${val}</div></div>`;
    }).join('');

  document.getElementById('modal-body').innerHTML = rows;
  document.getElementById('detail-modal').style.display = 'flex';
}

function closeModal(e) {
  if (!e || e.target === document.getElementById('detail-modal')) {
    document.getElementById('detail-modal').style.display = 'none';
  }
}

// ── EXPORT CSV ────────────────────────────────────────────────────────
function exportCSV() {
  if (!allSubmissions.length) { alert('No submissions to export.'); return; }
  const keys  = [...new Set(allSubmissions.flatMap(r => Object.keys(r)))];
  const header = keys.join(',');
  const rows   = allSubmissions.map(r =>
    keys.map(k => {
      const val = Array.isArray(r[k]) ? r[k].join('; ') : (r[k] || '');
      return `"${String(val).replace(/"/g,'""')}"`;
    }).join(',')
  );
  const csv  = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `RT-submissions-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function showSection(s) {
  document.querySelectorAll('.main-nav .nav-link').forEach(l => l.classList.remove('active'));
  event.target.classList.add('active');
  // Filter table by section
  const map = { intakes:'client-intake', invoices:'invoice-request', submissions:'', overview:'' };
  document.getElementById('filter-type').value = map[s] || '';
  filterTable();
}
