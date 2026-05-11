/* ==========================================
   Smart Community - Global App JS
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
  initDarkMode();
  initPageLoader();
  initSidebar();
  initActiveNav();
  initNotifications();
  initMobileMenu();
  initScrollAnimations();
});

/* --- Sidebar Toggle --- */
function initSidebar() {
  const hamburger = document.querySelector('.hamburger-btn');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('show');
      if (overlay) overlay.classList.toggle('show');
    });
  }

  if (overlay && sidebar) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('show');
      overlay.classList.remove('show');
    });
  }

  // Close sidebar when clicking a link on mobile
  const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        sidebar.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
      }
    });
  });
}

/* --- Active Navigation Highlight --- */
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const menuLinks = document.querySelectorAll('.sidebar-menu a');

  menuLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPath)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --- Logout Confirmation --- */
function initNotifications() {
  const notifBtn = document.querySelector('.notification-btn');
  const notifDropdown = document.querySelector('.notification-dropdown');

  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      notifDropdown.classList.remove('show');
    });
  }
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  // Auto-close sidebar on resize to desktop
  window.addEventListener('resize', () => {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (window.innerWidth >= 992) {
      if (sidebar) sidebar.classList.remove('show');
      if (overlay) overlay.classList.remove('show');
    }
  });
}

/* --- Toast Notification --- */
function showToast(message, type = 'success') {
  const toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) return;

  const icons = {
    success: 'bi-check-circle-fill',
    error: 'bi-x-circle-fill',
    warning: 'bi-exclamation-triangle-fill',
    info: 'bi-info-circle-fill'
  };
  const bgColors = {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#4F46E5'
  };

  const toastEl = document.createElement('div');
  toastEl.className = 'toast toast-custom align-items-center text-white';
  toastEl.style.background = bgColors[type] || bgColors.success;
  toastEl.style.borderRadius = '12px';
  toastEl.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
  toastEl.setAttribute('role', 'alert');
  toastEl.innerHTML = `
    <div class="d-flex align-items-center px-1">
      <i class="bi ${icons[type] || icons.success} me-2" style="font-size:1.1rem;"></i>
      <div class="toast-body" style="font-weight:500;">${message}</div>
      <button type="button" class="btn-close btn-close-white ms-2" data-bs-dismiss="toast" style="font-size:0.6rem;"></button>
    </div>
  `;

  toastContainer.appendChild(toastEl);
  const bsToast = new bootstrap.Toast(toastEl, { delay: 3500 });
  bsToast.show();

  toastEl.addEventListener('hidden.bs.toast', () => {
    toastEl.remove();
  });
}

/* --- Intersection Observer for Scroll Animations --- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card-custom, .chart-container').forEach(el => {
    if (!el.closest('.stat-card') && !el.classList.contains('stat-card')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    }
  });
}

/* --- Page Load Animation --- */
function initPageLoader() {
  const loader = document.createElement('div');
  loader.className = 'loading-overlay';
  loader.id = 'pageLoader';
  loader.innerHTML = `
    <div class="spinner-wrap">
      <div class="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  `;
  document.body.appendChild(loader);

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 300);
    }, 400);
  });
}

/* --- Dark Mode --- */
function initDarkMode() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  const toggles = document.querySelectorAll('.dark-mode-toggle');
  toggles.forEach(toggle => {
    toggle.checked = saved === 'dark';
    toggle.addEventListener('change', function() {
      if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      }
    });
  });

  // Floating theme toggle
  if (!document.querySelector('.theme-float-btn')) {
    const floatBtn = document.createElement('button');
    floatBtn.className = 'theme-float-btn';
    floatBtn.innerHTML = saved === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
    floatBtn.setAttribute('aria-label', 'Toggle theme');
    floatBtn.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
      color: #fff;
      border: none;
      box-shadow: 0 4px 14px rgba(99,102,241,0.4);
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.3s ease;
    `;
    floatBtn.addEventListener('mouseenter', () => {
      floatBtn.style.transform = 'scale(1.1)';
      floatBtn.style.boxShadow = '0 6px 20px rgba(99,102,241,0.5)';
    });
    floatBtn.addEventListener('mouseleave', () => {
      floatBtn.style.transform = 'scale(1)';
      floatBtn.style.boxShadow = '0 4px 14px rgba(99,102,241,0.4)';
    });
    floatBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        floatBtn.innerHTML = '<i class="bi bi-moon"></i>';
        showToast('Light mode enabled', 'info');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        floatBtn.innerHTML = '<i class="bi bi-sun"></i>';
        showToast('Dark mode enabled', 'info');
      }
    });
    document.body.appendChild(floatBtn);
  }
}



/* --- Confirm Action --- */
function confirmAction(message) {
  return confirm(message);
}
