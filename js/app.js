// ============================================
// THITRONIK Lernplattform – Main App
// ============================================

import { Router } from './router.js';
import { Store, API } from './store.js';
import { Auth } from './auth.js';
import { Icons } from './components.js';
import { initializeSeedData } from './data/seed.js';
import { renderLogin } from './pages/login.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderCourses } from './pages/courses.js';
import { renderCourseDetail } from './pages/course-detail.js';
import { renderLesson } from './pages/lesson.js';
import { renderQuiz } from './pages/quiz.js';
import { renderResults, renderProfile } from './pages/results-profile.js';
import { renderAdminDashboard, renderAdminCourses, renderAdminQuestions, renderAdminUsers, renderAdminReporting } from './pages/admin/admin.js';

// Initialize seed data
initializeSeedData(Store);

// Layout renderer
function renderLayout() {
  const user = Auth.getCurrentUser();
  const isAdmin = Auth.isAdmin();
  const isTrainer = Auth.isTrainer();
  const initials = (user.firstName?.[0] || '') + (user.lastName?.[0] || '');

  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="layout-main">
      <!-- Sidebar -->
      <nav class="app-sidebar" id="sidebar">
        <div class="sidebar-logo">
          <div class="sidebar-logo-icon">
            <svg class="logo-segel" viewBox="0 0 100 100">
              <polygon points="50,5 95,95 5,95" fill="#CE132D"/>
              <polygon points="50,20 82,85 18,85" fill="white" opacity="0.3"/>
            </svg>
          </div>
          <div class="sidebar-logo-text">
            <span class="sidebar-logo-brand">THITRONIK</span>
            <span class="sidebar-logo-sub">Lernplattform</span>
          </div>
        </div>

        <div class="sidebar-nav">
          <div class="nav-section">
            <div class="nav-section-title">Lernen</div>
            <a class="nav-item" href="#/dashboard" data-route="/dashboard">
              <span class="nav-item-icon">${Icons.dashboard}</span>
              <span class="nav-item-text">Dashboard</span>
            </a>
            <a class="nav-item" href="#/courses" data-route="/courses">
              <span class="nav-item-icon">${Icons.courses}</span>
              <span class="nav-item-text">Kurse</span>
            </a>
            <a class="nav-item" href="#/profile" data-route="/profile">
              <span class="nav-item-icon">${Icons.profile}</span>
              <span class="nav-item-text">Mein Fortschritt</span>
            </a>
          </div>

          ${isAdmin || isTrainer ? `
          <div class="nav-section">
            <div class="nav-section-title">Administration</div>
            <a class="nav-item" href="#/admin" data-route="/admin">
              <span class="nav-item-icon">${Icons.dashboard}</span>
              <span class="nav-item-text">Admin Dashboard</span>
            </a>
            <a class="nav-item" href="#/admin/courses" data-route="/admin/courses">
              <span class="nav-item-icon">${Icons.courses}</span>
              <span class="nav-item-text">Kurse</span>
            </a>
            <a class="nav-item" href="#/admin/questions" data-route="/admin/questions">
              <span class="nav-item-icon">${Icons.quiz}</span>
              <span class="nav-item-text">Fragen</span>
            </a>
            ${isAdmin ? `
            <a class="nav-item" href="#/admin/users" data-route="/admin/users">
              <span class="nav-item-icon">${Icons.users}</span>
              <span class="nav-item-text">Benutzer</span>
            </a>
            ` : ''}
            <a class="nav-item" href="#/admin/reporting" data-route="/admin/reporting">
              <span class="nav-item-icon">${Icons.report}</span>
              <span class="nav-item-text">Reporting</span>
            </a>
          </div>
          ` : ''}
        </div>

        <div class="sidebar-footer">
          <a class="nav-item" href="#" id="logout-btn">
            <span class="nav-item-icon">${Icons.logout}</span>
            <span class="nav-item-text">Abmelden</span>
          </a>
        </div>
      </nav>

      <!-- Sidebar overlay for mobile -->
      <div class="sidebar-overlay" id="sidebar-overlay"></div>

      <!-- Header -->
      <header class="app-header" id="app-header">
        <div class="header-left">
          <button class="mobile-menu-btn" id="mobile-menu-btn">${Icons.menu}</button>
          <div class="header-breadcrumb" id="breadcrumb"></div>
        </div>
        <div class="header-right">
          <div class="header-search">
            <span class="header-search-icon">${Icons.search}</span>
            <input type="text" placeholder="Kurs suchen..." id="global-search">
          </div>
          <div class="header-user" id="header-user-menu">
            <div class="header-avatar">${initials}</div>
            <div class="header-user-info">
              <span class="header-user-name">${user.firstName} ${user.lastName}</span>
              <span class="header-user-role">${user.role === 'admin' ? 'Administrator' : user.role === 'trainer' ? 'Trainer' : 'Lernender'}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="main-content" id="main-content">
        <div class="page-content" id="page-content"></div>
      </main>
    </div>
  `;

  // Logout
  document.getElementById('logout-btn').addEventListener('click', (e) => {
    e.preventDefault();
    Auth.logout();
    window.location.hash = '/login';
  });

  // Mobile menu
  const menuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      overlay.style.display = sidebar.classList.contains('mobile-open') ? 'block' : 'none';
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      overlay.style.display = 'none';
    });
  }

  // Search
  const searchInput = document.getElementById('global-search');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = searchInput.value.trim().toLowerCase();
        if (q) {
          const courses = API.getCourses().filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
          if (courses.length > 0) {
            window.location.hash = `/courses/${courses[0].id}`;
          }
        }
      }
    });
  }

  // Update active nav
  updateActiveNav();
}

function updateActiveNav() {
  const hash = window.location.hash.slice(1) || '/dashboard';
  document.querySelectorAll('.nav-item[data-route]').forEach(item => {
    const route = item.dataset.route;
    const isActive = hash === route || hash.startsWith(route + '/');
    item.classList.toggle('active', isActive);
  });
}

function withLayout(renderFn) {
  return (params) => {
    if (!document.getElementById('page-content')) {
      renderLayout();
    }
    updateActiveNav();
    renderFn(params);
  };
}

// Router setup
const router = new Router();

router.guard((route, params) => {
  const publicRoutes = ['/login'];
  if (publicRoutes.includes(route)) return true;
  if (!Auth.isLoggedIn()) {
    router.navigate('/login');
    return false;
  }
  // Admin routes
  if (route.startsWith('/admin') && !Auth.isTrainer()) {
    router.navigate('/dashboard');
    return false;
  }
  return true;
});

// Public routes
router.on('/login', () => {
  if (Auth.isLoggedIn()) { router.navigate('/dashboard'); return; }
  renderLogin();
});

// Learner routes
router.on('/dashboard', withLayout(renderDashboard));
router.on('/courses', withLayout(renderCourses));
router.on('/courses/:id', withLayout(renderCourseDetail));
router.on('/lessons/:id', withLayout(renderLesson));
router.on('/quiz/:id', withLayout(renderQuiz));
router.on('/results/:id', withLayout(renderResults));
router.on('/profile', withLayout(renderProfile));

// Admin routes
router.on('/admin', withLayout(renderAdminDashboard));
router.on('/admin/courses', withLayout(renderAdminCourses));
router.on('/admin/questions', withLayout(renderAdminQuestions));
router.on('/admin/users', withLayout(renderAdminUsers));
router.on('/admin/reporting', withLayout(renderAdminReporting));

// Start
router.start();
