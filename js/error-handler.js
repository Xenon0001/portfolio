// Global Error Handler for Xenon.py Portfolio
class ErrorHandler {
  constructor() {
    this.errors = [];
    this.retryAttempts = 3;
    this.retryDelay = 1000;
    this.init();
  }

  init() {
    // Handle unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.handleError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        type: 'promise',
        message: event.reason?.message || 'Unhandled Promise Rejection',
        reason: event.reason
      });
    });

    // Handle resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.handleError({
          type: 'resource',
          element: event.target.tagName,
          source: event.target.src || event.target.href,
          error: 'Failed to load resource'
        });
      }
    }, true);

    // Handle fetch errors globally
    this.interceptFetch();
  }

  handleError(errorInfo) {
    console.error('Portfolio Error:', errorInfo);
    
    // Store error for debugging
    this.errors.push({
      ...errorInfo,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    // Show user-friendly message
    this.showUserError(errorInfo);

    // Try to recover from certain errors
    this.attemptRecovery(errorInfo);

    // Log to external service (if available)
    this.logError(errorInfo);
  }

  showUserError(errorInfo) {
    // Don't show errors for failed external resources (images, fonts, etc.)
    if (errorInfo.type === 'resource') return;

    const errorContainer = document.getElementById('error-container') || this.createErrorContainer();
    
    let message = 'Ha ocurrido un error inesperado.';
    
    switch (errorInfo.type) {
      case 'javascript':
        message = 'Error en la aplicación. Intenta recargar la página.';
        break;
      case 'promise':
        message = 'Error al procesar tu solicitud. Por favor intenta nuevamente.';
        break;
      case 'fetch':
        message = 'No se pudo cargar el contenido. Verifica tu conexión a internet.';
        break;
    }

    errorContainer.innerHTML = `
      <div class="error-toast">
        <i class="fa-solid fa-exclamation-triangle"></i>
        <span>${message}</span>
        <button class="error-close" onclick="this.parentElement.parentElement.remove()">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
    `;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      const toast = errorContainer.querySelector('.error-toast');
      if (toast) {
        toast.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
      }
    }, 5000);
  }

  createErrorContainer() {
    const container = document.createElement('div');
    container.id = 'error-container';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      max-width: 400px;
    `;
    document.body.appendChild(container);
    return container;
  }

  attemptRecovery(errorInfo) {
    switch (errorInfo.type) {
      case 'fetch':
        this.retryFailedFetch(errorInfo);
        break;
      case 'resource':
        this.handleFailedResource(errorInfo);
        break;
    }
  }

  retryFailedFetch(errorInfo) {
    if (errorInfo.retryCount >= this.retryAttempts) return;

    setTimeout(() => {
      console.log(`Retrying fetch attempt ${errorInfo.retryCount + 1}`);
      // Retry logic would be implemented here
      errorInfo.retryCount = (errorInfo.retryCount || 0) + 1;
    }, this.retryDelay * (errorInfo.retryCount || 1));
  }

  handleFailedResource(errorInfo) {
    if (errorInfo.element === 'IMG') {
      // Replace failed images with placeholder
      const img = document.querySelector(`[src="${errorInfo.source}"]`);
      if (img) {
        img.src = this.generatePlaceholderSVG();
        img.alt = 'Imagen no disponible';
        img.style.opacity = '0.5';
      }
    }
  }

  generatePlaceholderSVG() {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWEyMzMyIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjNGE1NTY4IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiPgogICAgSW1hZ2VuIG5vIGRpc3BvbmlibGUKICA8L3RleHQ+Cjwvc3ZnPg==';
  }

  interceptFetch() {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        
        // Check for HTTP errors
        if (!response.ok) {
          this.handleError({
            type: 'fetch',
            status: response.status,
            statusText: response.statusText,
            url: args[0],
            retryCount: 0
          });
        }
        
        return response;
      } catch (error) {
        this.handleError({
          type: 'fetch',
          message: error.message,
          url: args[0],
          retryCount: 0
        });
        throw error;
      }
    };
  }

  logError(errorInfo) {
    // In production, you would send this to an error tracking service
    // For now, we'll just store it locally
    try {
      const errors = JSON.parse(localStorage.getItem('portfolio_errors') || '[]');
      errors.push(errorInfo);
      
      // Keep only last 50 errors
      if (errors.length > 50) {
        errors.splice(0, errors.length - 50);
      }
      
      localStorage.setItem('portfolio_errors', JSON.stringify(errors));
    } catch (e) {
      console.warn('Could not store error in localStorage:', e);
    }
  }

  // Public method to get error log
  getErrorLog() {
    try {
      return JSON.parse(localStorage.getItem('portfolio_errors') || '[]');
    } catch (e) {
      return [];
    }
  }

  // Public method to clear error log
  clearErrorLog() {
    localStorage.removeItem('portfolio_errors');
    this.errors = [];
  }
}

// Network status monitoring
class NetworkMonitor {
  constructor() {
    this.isOnline = navigator.onLine;
    this.init();
  }

  init() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.showNetworkStatus('Conexión restaurada', 'success');
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.showNetworkStatus('Sin conexión a internet', 'error');
    });
  }

  showNetworkStatus(message, type) {
    const statusContainer = document.getElementById('network-status') || this.createStatusContainer();
    
    statusContainer.innerHTML = `
      <div class="network-status ${type}">
        <i class="fa-solid ${type === 'success' ? 'fa-wifi' : 'fa-wifi-slash'}"></i>
        <span>${message}</span>
      </div>
    `;

    setTimeout(() => {
      const status = statusContainer.querySelector('.network-status');
      if (status) {
        status.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => status.remove(), 300);
      }
    }, 3000);
  }

  createStatusContainer() {
    const container = document.createElement('div');
    container.id = 'network-status';
    container.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      background: var(--card);
      padding: 12px 24px;
      border-radius: 8px;
      border: 1px solid var(--accent);
      box-shadow: var(--shadow);
    `;
    document.body.appendChild(container);
    return container;
  }
}

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    // Monitor page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.collectMetrics();
      }, 0);
    });

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // Tasks longer than 50ms
            console.warn('Long task detected:', {
              duration: entry.duration,
              startTime: entry.startTime
            });
          }
        }
      });
      
      observer.observe({ entryTypes: ['longtask'] });
    }
  }

  collectMetrics() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      
      this.metrics = {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: this.getFirstPaint(),
        firstContentfulPaint: this.getFirstContentfulPaint(),
        largestContentfulPaint: this.getLCP()
      };

      console.log('Performance Metrics:', this.metrics);
      this.logPerformance();
    }
  }

  getFirstPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : null;
  }

  getFirstContentfulPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return fcp ? fcp.startTime : null;
  }

  getLCP() {
    // This would require additional setup with PerformanceObserver
    return null;
  }

  logPerformance() {
    try {
      const metrics = JSON.parse(localStorage.getItem('portfolio_metrics') || '[]');
      metrics.push({
        ...this.metrics,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });
      
      // Keep only last 20 entries
      if (metrics.length > 20) {
        metrics.splice(0, metrics.length - 20);
      }
      
      localStorage.setItem('portfolio_metrics', JSON.stringify(metrics));
    } catch (e) {
      console.warn('Could not store metrics in localStorage:', e);
    }
  }
}

// Initialize all monitoring systems
document.addEventListener('DOMContentLoaded', () => {
  window.errorHandler = new ErrorHandler();
  window.networkMonitor = new NetworkMonitor();
  window.performanceMonitor = new PerformanceMonitor();
});

// Add CSS for error notifications
const errorStyles = `
  .error-toast {
    background: var(--card);
    border: 1px solid var(--accent);
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: var(--shadow);
    animation: slideIn 0.3s ease-out;
  }

  .error-toast i {
    color: var(--accent);
    font-size: 16px;
  }

  .error-toast span {
    flex: 1;
    color: var(--text);
    font-size: 14px;
  }

  .error-close {
    background: none;
    border: none;
    color: var(--muted);
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .error-close:hover {
    background: var(--glass);
    color: var(--text);
  }

  .network-status {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: var(--text);
  }

  .network-status.success {
    border-color: #10b981;
    color: #10b981;
  }

  .network-status.error {
    border-color: #ef4444;
    color: #ef4444;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = errorStyles;
document.head.appendChild(styleSheet);
