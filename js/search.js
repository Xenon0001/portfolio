// ---------- SEARCH FUNCTIONALITY ----------
class SearchManager {
  constructor() {
    this.searchInput = null;
    this.searchResults = null;
    this.projectsData = [];
    this.blogData = [];
    this.init();
  }

  init() {
    this.createSearchInterface();
    this.loadData();
  }

  createSearchInterface() {
    // Add search input to projects section
    const projectsHead = document.querySelector('.projects-head');
    if (projectsHead) {
      const searchContainer = document.createElement('div');
      searchContainer.className = 'search-container';
      searchContainer.innerHTML = `
        <div class="search-box">
          <i class="fa-solid fa-search"></i>
          <input type="text" id="projectSearch" placeholder="Buscar proyectos..." />
          <button class="search-clear" id="clearSearch" style="display: none;">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div id="searchResults" class="search-results"></div>
      `;
      projectsHead.appendChild(searchContainer);

      this.searchInput = document.getElementById('projectSearch');
      this.searchResults = document.getElementById('searchResults');
      this.clearButton = document.getElementById('clearSearch');

      this.setupEventListeners();
    }

    // Add search to blog section
    const blogSection = document.getElementById('blog');
    if (blogSection) {
      const blogHead = blogSection.querySelector('h2');
      if (blogHead) {
        const blogSearchContainer = document.createElement('div');
        blogSearchContainer.className = 'blog-search-container';
        blogSearchContainer.innerHTML = `
          <div class="search-box">
            <i class="fa-solid fa-search"></i>
            <input type="text" id="blogSearch" placeholder="Buscar artículos..." />
          </div>
        `;
        blogHead.parentNode.insertBefore(blogSearchContainer, blogHead.nextSibling);

        const blogSearchInput = document.getElementById('blogSearch');
        if (blogSearchInput) {
          blogSearchInput.addEventListener('input', (e) => {
            this.searchBlogPosts(e.target.value);
          });
        }
      }
    }
  }

  setupEventListeners() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        this.clearButton.style.display = query ? 'block' : 'none';
        this.searchProjects(query);
      });

      this.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.searchProjects(e.target.value.trim());
        }
      });
    }

    if (this.clearButton) {
      this.clearButton.addEventListener('click', () => {
        this.searchInput.value = '';
        this.clearButton.style.display = 'none';
        this.searchResults.innerHTML = '';
        this.searchResults.style.display = 'none';
        // Reset to show all projects
        const event = new CustomEvent('resetProjects');
        document.dispatchEvent(event);
      });
    }
  }

  async loadData() {
    try {
      const [projectsResponse, blogResponse] = await Promise.all([
        fetch('data/projects.json'),
        fetch('data/blog.json')
      ]);

      const projectsData = await projectsResponse.json();
      const blogData = await blogResponse.json();

      // ✅ FIX: Acceder correctamente a los datos
      this.projectsData = projectsData.projects || projectsData;
      this.blogData = blogData.posts || blogData;

      // Validar que sean arrays
      if (!Array.isArray(this.projectsData)) {
        console.warn('projectsData no es un array, usando fallback');
        this.loadFallbackData();
      }
      if (!Array.isArray(this.blogData)) {
        console.warn('blogData no es un array, usando fallback');
        this.loadFallbackData();
      }
    } catch (error) {
      console.error('Error loading search data:', error);
      this.loadFallbackData();
    }
  }

  loadFallbackData() {
    this.projectsData = [
      { id: 1, title: 'Blog en Django', category: 'web', thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop', summary: 'Blog ligero con auth y panel admin', tags: ['Django', 'HTML', 'SQLite'], github: 'https://github.com/Xenon0001' },
      { id: 2, title: 'GES (Sistema Escolar Simpler)', category: 'desktop', thumbnail: 'assets/img/ges-preview.png', summary: 'Gestión de alumnos y notas', tags: ['Python', 'Tkinter', 'SQLite'], github: 'https://github.com/Xenon0001/ges_v01' },
      { id: 3, title: 'Dashboard de datos', category: 'otros', thumbnail: 'https://images.unsplash.com/photo-1551281044-8b87c5d6f3df?q=80&w=1200&auto=format&fit=crop', summary: 'KPIs y análisis con Pandas', tags: ['Pandas', 'Numpy'], github: 'https://github.com/Xenon0001' },
      { id: 4, title: 'StoreTic', category: 'web', thumbnail: 'assets/img/demo_storitic.webp', summary: 'Tienda online de dispositivos informáticos con simulación de compra', tags: ['Django', 'HTML', 'CSS', 'JS', 'SQLite'], github: 'https://github.com/Xenon0001/StoreTic', demo: 'https://xenon0001.github.io/Web-Projects/demo_storetic/' },
      { id: 5, title: 'Task App (PWA)', category: 'app', thumbnail: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop', summary: 'PWA offline-first para tareas', tags: ['JS', 'PWA'], github: 'https://github.com/Xenon0001' },
      { id: 6, title: 'Portfolio React', category: 'web', thumbnail: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop', summary: 'Portfolio con React y Vite', tags: ['React', 'Vite'], github: 'https://github.com/Xenon0001' }
    ];

    this.blogData = [
      { id: 1, title: 'Cómo organizar un proyecto con poca conexión', date: '2025-08-10', cover: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop', link: 'blog/organizacion-offline/index.html' },
      { id: 2, title: 'Mejorar performance sin frameworks', date: '2025-06-21', cover: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=1200&auto=format&fit=crop' },
      { id: 3, title: 'Tkinter: tips prácticos', date: '2025-04-01', cover: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1200&auto=format&fit=crop' }
    ];
  }

  searchProjects(query) {
    if (!query) {
      this.searchResults.innerHTML = '';
      this.searchResults.style.display = 'none';
      return;
    }

    const results = this.projectsData.filter(project => {
      const searchText = `${project.title} ${project.summary} ${project.tags.join(' ')}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });

    this.displaySearchResults(results, query);
  }

  searchBlogPosts(query) {
    if (!query) {
      // Reset blog posts to show all
      const event = new CustomEvent('resetBlogPosts');
      document.dispatchEvent(event);
      return;
    }

    const results = this.blogData.filter(post => {
      const searchText = `${post.title}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });

    this.displayBlogSearchResults(results);
  }

  displaySearchResults(results, query) {
    if (results.length === 0) {
      this.searchResults.innerHTML = `
        <div class="search-no-results">
          <i class="fa-solid fa-search"></i>
          <p>No se encontraron proyectos para "<strong>${query}</strong>"</p>
        </div>
      `;
    } else {
      this.searchResults.innerHTML = `
        <div class="search-results-header">
          <h4>${results.length} proyecto${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}</h4>
        </div>
        <div class="search-results-list">
          ${results.map(project => `
            <div class="search-result-item" data-project-id="${project.id}">
              <img src="${project.thumbnail}" alt="${project.title}" class="search-result-thumb">
              <div class="search-result-content">
                <h5>${this.highlightText(project.title, query)}</h5>
                <p>${this.highlightText(project.summary, query)}</p>
                <div class="search-result-tags">
                  ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    this.searchResults.style.display = 'block';

    // Add click handlers to search results
    this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const projectId = item.dataset.projectId;
        this.highlightProject(projectId);
      });
    });
  }

  displayBlogSearchResults(results) {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;

    if (results.length === 0) {
      blogGrid.innerHTML = `
        <div class="search-no-results" style="grid-column: 1/-1;">
          <i class="fa-solid fa-search"></i>
          <p>No se encontraron artículos</p>
        </div>
      `;
    } else {
      blogGrid.innerHTML = results.map(p => `
        <article class="post reveal">
          <img src="${p.cover}" alt="${p.title}" style="width:100%;height:160px;object-fit:cover;border-radius:8px">
          <div style="padding:10px">
            <time datetime="${p.date}" style="color:var(--muted);display:block">${new Date(p.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</time>
            <h4 style="margin:.4rem 0">${p.title}</h4>
            <a class="btn-ghost" href="${p.link || '#'}">Leer</a>
          </div>
        </article>
      `).join('');
    }

    // Re-observe reveals
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('#blogGrid .reveal').forEach(el => io.observe(el));
  }

  highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  highlightProject(projectId) {
    // Scroll to projects section
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });

    // Find and highlight the project
    setTimeout(() => {
      const projectCards = document.querySelectorAll('.card-project');
      projectCards.forEach(card => {
        card.classList.remove('search-highlighted');
        if (card.dataset.projectId == projectId) {
          card.classList.add('search-highlighted');
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }, 500);
  }
}

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SearchManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SearchManager;
}