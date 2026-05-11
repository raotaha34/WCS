/* ==========================================
   Dashboard & Data Rendering (CLEANED)
   ========================================== */

/* --- Dummy Data (KEEP ONLY THESE) --- */
const noticesData = [
    { id: 1, title: 'Water Supply Maintenance', desc: 'Scheduled water supply maintenance on May 15th from 10 AM to 2 PM. Please store water accordingly.', date: '2026-05-08', category: 'Maintenance', icon: 'bi-droplet', color: 'blue' },
    { id: 2, title: 'Community Cleanup Drive', desc: 'Join us for the monthly community cleanup drive this Saturday at 8 AM near the central park.', date: '2026-05-07', category: 'Community', icon: 'bi-tree', color: 'green' },
    { id: 3, title: 'New Security Protocol', desc: 'Updated visitor entry protocol effective immediately. All visitors must register at the gate.', date: '2026-05-06', category: 'Security', icon: 'bi-shield-check', color: 'red' },
    { id: 4, title: 'Parking Rules Update', desc: 'New parking allocation rules have been updated. Please check the notice board for details.', date: '2026-05-05', category: 'Rules', icon: 'bi-car-front', color: 'orange' },
    { id: 5, title: 'Gym Renovation Complete', desc: 'The community gym renovation is now complete. New equipment has been installed and is ready for use.', date: '2026-05-04', category: 'Facilities', icon: 'bi-heart-pulse', color: 'blue' }
];

const eventsData = [
    { id: 1, title: 'Summer Festival', date: '2026-06-15', time: '4:00 PM - 10:00 PM', venue: 'Community Ground', image: 'bi-sun' },
    { id: 2, title: 'Yoga Morning Session', date: '2026-05-18', time: '6:00 AM - 7:30 AM', venue: 'Central Park', image: 'bi-activity' },
    { id: 3, title: 'Book Club Meeting', date: '2026-05-22', time: '5:00 PM - 7:00 PM', venue: 'Library Hall', image: 'bi-book' },
    { id: 4, title: 'Children Day Celebration', date: '2026-06-01', time: '10:00 AM - 2:00 PM', venue: 'Play Area', image: 'bi-balloon' },
    { id: 5, title: 'Senior Citizen Health Camp', date: '2026-05-28', time: '9:00 AM - 1:00 PM', venue: 'Community Center', image: 'bi-heart-pulse' },
    { id: 6, title: 'Music Night', date: '2026-06-10', time: '7:00 PM - 11:00 PM', venue: 'Amphitheater', image: 'bi-music-note-beamed' }
];

const complaintsData = [
    { id: 'REQ-001', issue: 'Leaking tap in kitchen', category: 'Plumbing', status: 'Resolved', date: '2026-05-01' },
    { id: 'REQ-002', issue: 'Street light not working', category: 'Electrical', status: 'In Progress', date: '2026-05-03' },
    { id: 'REQ-003', issue: 'Garbage not collected', category: 'Cleaning', status: 'Pending', date: '2026-05-05' },
    { id: 'REQ-004', issue: 'Broken elevator button', category: 'Maintenance', status: 'In Progress', date: '2026-05-06' },
    { id: 'REQ-005', issue: 'Water pressure low', category: 'Plumbing', status: 'Resolved', date: '2026-05-02' },
    { id: 'REQ-006', issue: 'Security camera offline', category: 'Security', status: 'Pending', date: '2026-05-07' }
];

/* --- Render Recent Notices --- */
function renderRecentNotices() {
    const container = document.getElementById('recentNotices');
    if (!container) return;

    container.innerHTML = noticesData.slice(0, 3).map(n => `
    <div class="notice-list-item">
      <div class="notice-icon"><i class="bi ${n.icon}"></i></div>
      <div class="notice-content">
        <h5>${n.title}</h5>
        <p>${n.desc.substring(0, 80)}${n.desc.length > 80 ? '...' : ''}</p>
        <span class="notice-date">${formatDate(n.date)}</span>
      </div>
    </div>
  `).join('');
}

/* --- Render All Notices --- */
function renderAllNotices() {
    const container = document.getElementById('noticesContainer');
    if (!container) return;

    container.innerHTML = noticesData.map(n => `
    <div class="notice-card" data-category="${n.category}">
      <div class="nc-body flex-grow-1">
        <h4>${n.title}</h4>
        <p>${n.desc}</p>
        <div class="nc-meta">
          <span>${formatDate(n.date)}</span>
          <span>${n.category}</span>
        </div>
      </div>
    </div>
  `).join('');
}

/* --- Render Events --- */
function renderEvents() {
    const container = document.getElementById('eventsContainer');
    if (!container) return;

    container.innerHTML = eventsData.map(e => `
    <div class="col-md-6 col-lg-4 mb-4">
      <div class="event-card">
        <h4>${e.title}</h4>
        <div>${formatDate(e.date)}</div>
        <div>${e.time}</div>
        <div>${e.venue}</div>
      </div>
    </div>
  `).join('');
}

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