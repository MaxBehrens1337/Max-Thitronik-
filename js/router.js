// ============================================
// THITRONIK SPA Router
// Hash-basiertes Routing
// ============================================

export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.beforeEach = null;
    window.addEventListener('hashchange', () => this.resolve());
  }

  on(path, handler) {
    this.routes[path] = handler;
    return this;
  }

  guard(fn) {
    this.beforeEach = fn;
    return this;
  }

  navigate(path) {
    window.location.hash = path;
  }

  resolve() {
    const hash = window.location.hash.slice(1) || '/login';
    let matched = null;
    let params = {};

    // Try exact match first
    if (this.routes[hash]) {
      matched = hash;
    } else {
      // Try parameterized routes
      for (const route of Object.keys(this.routes)) {
        const routeParts = route.split('/');
        const hashParts = hash.split('/');
        if (routeParts.length !== hashParts.length) continue;

        let isMatch = true;
        const tempParams = {};
        for (let i = 0; i < routeParts.length; i++) {
          if (routeParts[i].startsWith(':')) {
            tempParams[routeParts[i].slice(1)] = decodeURIComponent(hashParts[i]);
          } else if (routeParts[i] !== hashParts[i]) {
            isMatch = false;
            break;
          }
        }
        if (isMatch) {
          matched = route;
          params = tempParams;
          break;
        }
      }
    }

    if (!matched) {
      this.navigate('/login');
      return;
    }

    if (this.beforeEach) {
      const canProceed = this.beforeEach(matched, params);
      if (!canProceed) return;
    }

    this.currentRoute = matched;
    this.routes[matched](params);
  }

  start() {
    this.resolve();
  }
}
