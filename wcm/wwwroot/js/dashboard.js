/* ==========================================
   Dashboard & Data Rendering (CLEANED)
   ========================================== */



const complaintsData = [
    { id: 'REQ-001', issue: 'Leaking tap in kitchen', category: 'Plumbing', status: 'Resolved', date: '2026-05-01' },
    { id: 'REQ-002', issue: 'Street light not working', category: 'Electrical', status: 'In Progress', date: '2026-05-03' },
    { id: 'REQ-003', issue: 'Garbage not collected', category: 'Cleaning', status: 'Pending', date: '2026-05-05' },
    { id: 'REQ-004', issue: 'Broken elevator button', category: 'Maintenance', status: 'In Progress', date: '2026-05-06' },
    { id: 'REQ-005', issue: 'Water pressure low', category: 'Plumbing', status: 'Resolved', date: '2026-05-02' },
    { id: 'REQ-006', issue: 'Security camera offline', category: 'Security', status: 'Pending', date: '2026-05-07' }
];


/* --- Render Requests Table --- */
function renderRequestsTable() {
    const tbody = document.querySelector('#requestsTable tbody');
    if (!tbody) return;

    tbody.innerHTML = complaintsData.map(c => `
    <tr>
      <td>${c.id}</td>
      <td>${c.issue}</td>
      <td>${c.category}</td>
      <td>${c.status}</td>
      <td>${formatDate(c.date)}</td>
    </tr>
  `).join('');
}

/* --- Admin Issues (FIXED - NO RESIDENT DEPENDENCY) --- */
function renderAdminIssues() {
    const tbody = document.querySelector('#adminIssuesTable tbody');
    if (!tbody) return;

    tbody.innerHTML = complaintsData.map(c => `
    <tr>
      <td>${c.issue}</td>
      <td>Resident Data (Server Side)</td>
      <td>${c.category}</td>
      <td>${c.status}</td>
      <td>${formatDate(c.date)}</td>
    </tr>
  `).join('');
}

/* --- Format Date --- */
function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* --- INIT --- */
document.addEventListener('DOMContentLoaded', function () {
    renderRecentNotices();
    renderAllNotices();
    renderEvents();
    renderRequestsTable();
    renderAdminIssues();
});