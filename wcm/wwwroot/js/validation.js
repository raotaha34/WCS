/* ==========================================
   Form Validation Utilities
   ========================================== */

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateRequired(value) {
  return value.trim().length > 0;
}

function validateMinLength(value, min) {
  return value.trim().length >= min;
}

function showFieldError(input, message) {
  const parent = input.closest('.mb-3') || input.parentElement;
  let errorEl = parent.querySelector('.field-error');
  if (!errorEl) {
    errorEl = document.createElement('small');
    errorEl.className = 'field-error text-danger d-block mt-1';
    parent.appendChild(errorEl);
  }
  errorEl.textContent = message;
  input.classList.add('is-invalid');
}

function clearFieldError(input) {
  const parent = input.closest('.mb-3') || input.parentElement;
  const errorEl = parent.querySelector('.field-error');
  if (errorEl) errorEl.remove();
  input.classList.remove('is-invalid');
}

/* --- Login Form --- */
function initLoginValidation() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    let valid = true;

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    clearFieldError(email);
    clearFieldError(password);

    if (!validateRequired(email.value)) {
      showFieldError(email, 'Email is required');
      valid = false;
    } else if (!validateEmail(email.value)) {
      showFieldError(email, 'Please enter a valid email');
      valid = false;
    }

    if (!validateRequired(password.value)) {
      showFieldError(password, 'Password is required');
      valid = false;
    } else if (!validateMinLength(password.value, 6)) {
      showFieldError(password, 'Password must be at least 6 characters');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    }
  });
}

/* --- Password Toggle --- */
function initPasswordToggle() {
  const toggles = document.querySelectorAll('.toggle-password');
  toggles.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.parentElement.querySelector('input');
      const icon = this.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
      } else {
        input.type = 'password';
        icon.classList.replace('bi-eye', 'bi-eye-slash');
      }
    });
  });
}

/* --- Report Issue Form --- */
function initIssueFormValidation() {
  const form = document.getElementById('issueForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    const category = document.getElementById('issueCategory');
    const title = document.getElementById('issueTitle');
    const description = document.getElementById('issueDescription');
    const location = document.getElementById('issueLocation');

    [category, title, description, location].forEach(clearFieldError);

    if (!validateRequired(category.value)) {
      showFieldError(category, 'Please select a category');
      valid = false;
    }
    if (!validateRequired(title.value)) {
      showFieldError(title, 'Title is required');
      valid = false;
    }
    if (!validateRequired(description.value)) {
      showFieldError(description, 'Description is required');
      valid = false;
    } else if (!validateMinLength(description.value, 10)) {
      showFieldError(description, 'Description must be at least 10 characters');
      valid = false;
    }
    if (!validateRequired(location.value)) {
      showFieldError(location, 'Location is required');
      valid = false;
    }

    if (valid) {
      const modal = new bootstrap.Modal(document.getElementById('successModal'));
      modal.show();
      form.reset();
      const preview = document.getElementById('imagePreview');
      if (preview) {
        preview.src = '';
        preview.classList.add('d-none');
        preview.parentElement.classList.remove('has-image');
      }
    }
  });
}

/* --- Contact Form --- */
function initContactFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const subject = document.getElementById('contactSubject');
    const message = document.getElementById('contactMessage');

    [name, email, subject, message].forEach(clearFieldError);

    if (!validateRequired(name.value)) {
      showFieldError(name, 'Name is required');
      valid = false;
    }
    if (!validateRequired(email.value)) {
      showFieldError(email, 'Email is required');
      valid = false;
    } else if (!validateEmail(email.value)) {
      showFieldError(email, 'Please enter a valid email');
      valid = false;
    }
    if (!validateRequired(subject.value)) {
      showFieldError(subject, 'Subject is required');
      valid = false;
    }
    if (!validateRequired(message.value)) {
      showFieldError(message, 'Message is required');
      valid = false;
    }

    if (valid) {
      showToast('Message sent successfully!', 'success');
      form.reset();
    }
  });
}

/* --- File Upload Preview --- */
function initFileUploadPreview() {
  const input = document.getElementById('issueImage');
  const preview = document.getElementById('imagePreview');
  if (!input || !preview) return;

  input.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        preview.src = e.target.result;
        preview.classList.remove('d-none');
        preview.parentElement.classList.add('has-image');
      };
      reader.readAsDataURL(file);
    }
  });
}

/* --- Search & Filter --- */
function initSearchFilter(tableId, searchId, filterId) {
  const searchInput = document.getElementById(searchId);
  const filterSelect = document.getElementById(filterId);
  const table = document.getElementById(tableId);
  if (!table) return;

  const rows = table.querySelectorAll('tbody tr');

  function filterRows() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const filterVal = filterSelect ? filterSelect.value.toLowerCase() : '';

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const statusCell = row.querySelector('.status-cell');
      const status = statusCell ? statusCell.textContent.toLowerCase() : '';

      const matchSearch = !query || text.includes(query);
      const matchFilter = !filterVal || status.includes(filterVal);

      row.style.display = matchSearch && matchFilter ? '' : 'none';
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterRows);
  if (filterSelect) filterSelect.addEventListener('change', filterRows);
}

document.addEventListener('DOMContentLoaded', function() {
  initLoginValidation();
  initPasswordToggle();
  initIssueFormValidation();
  initContactFormValidation();
  initFileUploadPreview();
});
