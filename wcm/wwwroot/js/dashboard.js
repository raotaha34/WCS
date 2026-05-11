/* ==========================================
   Dashboard & Data Rendering
   ========================================== */

/* --- Dummy Data --- */
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
  { id: 'REQ-006', issue: 'Security camera offline', category: 'Security', status: 'Pending', date: '2026-05-07' },
  { id: 'REQ-007', issue: 'Park bench damaged', category: 'Maintenance', status: 'Resolved', date: '2026-04-28' },
  { id: 'REQ-008', issue: 'Power fluctuation', category: 'Electrical', status: 'In Progress', date: '2026-05-08' },
  { id: 'REQ-009', issue: 'Common area cleaning', category: 'Cleaning', status: 'Pending', date: '2026-05-09' },
  { id: 'REQ-010', issue: 'Gate intercom broken', category: 'Security', status: 'Resolved', date: '2026-04-25' }
];

const residentsData = [
  { id: 1, name: 'Ahmad Khan', unit: 'A-101', email: 'ahmad@email.com', phone: '0300-1234567', status: 'Active' },
  { id: 2, name: 'Sarah Ali', unit: 'A-102', email: 'sarah@email.com', phone: '0301-2345678', status: 'Active' },
  { id: 3, name: 'Bilal Hassan', unit: 'B-201', email: 'bilal@email.com', phone: '0302-3456789', status: 'Active' },
  { id: 4, name: 'Fatima Noor', unit: 'B-202', email: 'fatima@email.com', phone: '0303-4567890', status: 'Inactive' },
  { id: 5, name: 'Usman Tariq', unit: 'C-301', email: 'usman@email.com', phone: '0304-5678901', status: 'Active' },
  { id: 6, name: 'Ayesha Malik', unit: 'C-302', email: 'ayesha@email.com', phone: '0305-6789012', status: 'Active' },
  { id: 7, name: 'Omar Farooq', unit: 'D-401', email: 'omar@email.com', phone: '0306-7890123', status: 'Active' },
  { id: 8, name: 'Zara Iqbal', unit: 'D-402', email: 'zara@email.com', phone: '0307-8901234', status: 'Inactive' }
];

/* --- Render Recent Notices on Dashboard --- */
function renderRecentNotices() {
  const container = document.getElementById('recentNotices');
  if (!container) return;

  container.innerHTML = noticesData.slice(0, 3).map(n => `
    <div class="notice-list-item">
      <div class="notice-icon"><i class="bi ${n.icon}"></i></div>
      <div class="notice-content">
        <h5>${n.title}</h5>
        <p>${n.desc.substring(0, 80)}${n.desc.length > 80 ? '...' : ''}</p>
        <span class="notice-date"><i class="bi bi-calendar3 me-1"></i>${formatDate(n.date)}</span>
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
      <div class="nc-icon" style="background:#EEF2FF;color:var(--accent)"><i class="bi ${n.icon}"></i></div>
      <div class="nc-body flex-grow-1">
        <h4>${n.title}</h4>
        <p>${n.desc}</p>
        <div class="nc-meta">
          <span><i class="bi bi-calendar3 me-1"></i>${formatDate(n.date)}</span>
          <span><i class="bi bi-tag me-1"></i>${n.category}</span>
        </div>
      </div>
      <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#noticeModal${n.id}">Read More</button>
    </div>
  `).join('');

  // Build modals
  const modalContainer = document.getElementById('noticeModals');
  if (modalContainer) {
    modalContainer.innerHTML = noticesData.map(n => `
      <div class="modal fade" id="noticeModal${n.id}" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title fw-bold">${n.title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <p class="text-muted mb-3"><i class="bi bi-calendar3 me-2"></i>${formatDate(n.date)} | <i class="bi bi-tag me-2"></i>${n.category}</p>
              <p>${n.desc}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }
}

/* --- Render Events --- */
function renderEvents() {
  const container = document.getElementById('eventsContainer');
  if (!container) return;

  container.innerHTML = eventsData.map(e => `
    <div class="col-md-6 col-lg-4 mb-4">
      <div class="event-card">
        <div class="event-img"><i class="bi ${e.image}"></i></div>
        <div class="event-body">
          <h4>${e.title}</h4>
          <div class="event-meta">
            <span><i class="bi bi-calendar-event"></i>${formatDate(e.date)}</span>
            <span><i class="bi bi-clock"></i>${e.time}</span>
            <span><i class="bi bi-geo-alt"></i>${e.venue}</span>
          </div>
          <button class="btn btn-primary-custom w-100" onclick="showToast('Event details coming soon!')">View Details</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* --- Render Requests Table --- */
function renderRequestsTable() {
  const tbody = document.querySelector('#requestsTable tbody');
  if (!tbody) return;

  tbody.innerHTML = complaintsData.map(c => {
    const badgeClass = c.status === 'Pending' ? 'badge-pending' : c.status === 'In Progress' ? 'badge-inprogress' : 'badge-resolved';
    return `
      <tr>
        <td><strong>${c.id}</strong></td>
        <td>${c.issue}</td>
        <td>${c.category}</td>
        <td><span class="${badgeClass} status-cell">${c.status}</span></td>
        <td>${formatDate(c.date)}</td>
        <td>
          <button class="btn btn-sm btn-outline-primary me-1" onclick="showToast('View details coming soon!')"><i class="bi bi-eye"></i></button>
          <button class="btn btn-sm btn-outline-danger" onclick="if(confirmAction('Delete this request?')) showToast('Request deleted','error')"><i class="bi bi-trash"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

/* --- Render Admin Issues Table --- */
function renderAdminIssues() {
  const tbody = document.querySelector('#adminIssuesTable tbody');
  if (!tbody) return;

  tbody.innerHTML = complaintsData.map(c => {
    const resident = residentsData[Math.floor(Math.random() * residentsData.length)];
    const badgeClass = c.status === 'Pending' ? 'badge-pending' : c.status === 'In Progress' ? 'badge-inprogress' : 'badge-resolved';
    return `
      <tr>
        <td>${c.issue}</td>
        <td>${resident.name}</td>
        <td>${c.category}</td>
        <td><span class="${badgeClass} status-cell">${c.status}</span></td>
        <td>${formatDate(c.date)}</td>
        <td>
          <button class="btn btn-sm btn-outline-primary me-1" onclick="showToast('Edit feature coming soon!')"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-outline-success me-1" onclick="showToast('Issue marked as resolved!')"><i class="bi bi-check-lg"></i></button>
          <button class="btn btn-sm btn-outline-danger" onclick="if(confirmAction('Delete this issue?')) showToast('Issue deleted','error')"><i class="bi bi-trash"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

/* --- Render Residents Table --- */
function renderResidentsTable() {
  const tbody = document.querySelector('#residentsTable tbody');
  if (!tbody) return;

  tbody.innerHTML = residentsData.map(r => `
    <tr>
      <td><strong>#${r.id}</strong></td>
      <td>${r.name}</td>
      <td>${r.unit}</td>
      <td>${r.email}</td>
      <td>${r.phone}</td>
      <td><span class="badge bg-${r.status === 'Active' ? 'success' : 'secondary'}">${r.status}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="showToast('Edit resident coming soon!')"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="if(confirmAction('Delete this resident?')) showToast('Resident deleted','error')"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

/* --- Render Admin Notices Table --- */
function renderAdminNotices() {
  const tbody = document.querySelector('#adminNoticesTable tbody');
  if (!tbody) return;

  tbody.innerHTML = noticesData.map(n => `
    <tr>
      <td>${n.title}</td>
      <td>${n.category}</td>
      <td>${formatDate(n.date)}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="showToast('Edit notice coming soon!')"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="if(confirmAction('Delete this notice?')) showToast('Notice deleted','error')"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

/* --- Render Admin Events Table --- */
function renderAdminEvents() {
  const tbody = document.querySelector('#adminEventsTable tbody');
  if (!tbody) return;

  tbody.innerHTML = eventsData.map(e => `
    <tr>
      <td>${e.title}</td>
      <td>${formatDate(e.date)}</td>
      <td>${e.time}</td>
      <td>${e.venue}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="showToast('Edit event coming soon!')"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="if(confirmAction('Delete this event?')) showToast('Event deleted','error')"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

/* --- Helper: Format Date --- */
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* --- Init Dashboard Stats --- */
function initDashboardStats() {
  const stats = {
    requests: complaintsData.length,
    inProgress: complaintsData.filter(c => c.status === 'In Progress').length,
    resolved: complaintsData.filter(c => c.status === 'Resolved').length,
    notices: noticesData.length
  };

  animateValue('statRequests', 0, stats.requests, 800);
  animateValue('statInProgress', 0, stats.inProgress, 800);
  animateValue('statResolved', 0, stats.resolved, 800);
  animateValue('statNotices', 0, stats.notices, 800);
}

/* --- Animate Number --- */
function animateValue(id, start, end, duration) {
  const el = document.getElementById(id);
  if (!el) return;
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    el.textContent = current;
    if (current === end) clearInterval(timer);
  }, stepTime || 10);
}

/* --- Notices Search & Filter --- */
function initNoticesFilter() {
  const searchInput = document.getElementById('noticeSearch');
  const filterSelect = document.getElementById('noticeFilter');
  if (!searchInput && !filterSelect) return;

  function filterNotices() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const category = filterSelect ? filterSelect.value : '';
    const cards = document.querySelectorAll('#noticesContainer .notice-card');

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const cat = card.getAttribute('data-category');
      const matchSearch = !query || text.includes(query);
      const matchCat = !category || cat === category;
      card.style.display = matchSearch && matchCat ? 'flex' : 'none';
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterNotices);
  if (filterSelect) filterSelect.addEventListener('change', filterNotices);
}

/* --- Initialize on Load --- */
document.addEventListener('DOMContentLoaded', function() {
  renderRecentNotices();
  renderAllNotices();
  renderEvents();
  renderRequestsTable();
  renderAdminIssues();
  renderResidentsTable();
  renderAdminNotices();
  renderAdminEvents();
  initDashboardStats();
  initNoticesFilter();
});
