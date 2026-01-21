// ---------- INTERACTIONS, FILTERS, CONTACT ----------
document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Skill bars animate when resume visible
  const resumeSection = document.getElementById('resume');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.bar').forEach(b => {
          const pct = b.dataset.fill || '60';
          b.querySelector('i').style.width = pct + '%';
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  if (resumeSection) barObserver.observe(resumeSection);

  // Load projects data
  loadProjects();

  // Load blog posts
  loadBlogPosts();

  // Contact form (mailto fallback)
  const form = document.getElementById('contactForm');
  const ok = document.getElementById('ok');
  const err = document.getElementById('err');

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!validEmail(email) || !subject || message.length < 10) {
        err.style.display = 'block';
        ok.style.display = 'none';
        return;
      }
      err.style.display = 'none';
      ok.style.display = 'block';
      const body = encodeURIComponent(`De: ${email}\n\n${message}`);
      window.location.href = `mailto:xenonpy465@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Small tilt on visual card
  const visual = document.querySelector('.visual-img');
  if (visual) {
    visual.addEventListener('mousemove', (ev) => {
      const r = visual.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      visual.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    visual.addEventListener('mouseleave', () => visual.style.transform = '');
  }

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(r => {
      r.style.transition = 'none';
      r.classList.add('show');
    });
  }
});

// Load projects from JSON
async function loadProjects() {
  try {
    const response = await fetch('data/projects.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    // ✅ FIX: Acceder al array dentro del objeto
    const projects = data.projects || data;
    
    if (!Array.isArray(projects)) {
      throw new Error('Los datos de proyectos no son un array válido');
    }
    
    renderProjects(projects);
    setupFilters(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    showUserFriendlyError('projects', error);
    loadFallbackProjects();
  }
}

// Load blog posts from JSON
async function loadBlogPosts() {
  try {
    const response = await fetch('data/blog.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    // ✅ FIX: Acceder al array dentro del objeto
    const posts = data.posts || data;
    
    if (!Array.isArray(posts)) {
      throw new Error('Los datos de blog no son un array válido');
    }
    
    renderBlogPosts(posts);
  } catch (error) {
    console.error('Error loading blog posts:', error);
    showUserFriendlyError('blog', error);
    loadFallbackBlogPosts();
  }
}

// ✅ NUEVO: Función para mostrar errores específicos al usuario
function showUserFriendlyError(section, error) {
  const isNetworkError = !navigator.onLine || error.message.includes('Failed to fetch');
  const isServerError = error.message.includes('HTTP error');
  
  let message = '';
  let icon = '';
  
  if (isNetworkError) {
    message = '❌ Sin conexión a internet. Por favor, verifica tu conexión y recarga la página.';
    icon = 'fa-wifi-slash';
  } else if (isServerError) {
    message = '⚠️ Estamos experimentando problemas técnicos. Trabajando para solucionarlo.';
    icon = 'fa-tools';
  } else {
    message = '⚠️ Error al cargar el contenido. Mostrando versión de respaldo.';
    icon = 'fa-exclamation-triangle';
  }
  
  const container = document.getElementById(section === 'projects' ? 'grid' : 'blogGrid');
  if (container) {
    container.innerHTML = `
      <div class="error-message" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
        <i class="fa-solid ${icon}" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
        <p style="color: var(--text); font-size: 1.1rem;">${message}</p>
        <button class="btn" onclick="location.reload()" style="margin-top: 1rem;">
          <i class="fa-solid fa-refresh"></i> Reintentar
        </button>
      </div>
    `;
  }
}

// Render projects grid
function renderProjects(projects, category = 'all') {
  const grid = document.getElementById('grid');
  if (!grid) return;

  // Show skeleton loading
  grid.innerHTML = generateProjectSkeletons();

  // Simulate loading delay for better UX
  setTimeout(() => {
    const filteredProjects = projects.filter(p => category === 'all' ? true : p.category === category);
    
    grid.innerHTML = filteredProjects
      .map(p => `
        <article class="card-project reveal" data-category="${p.category}">
          <img class="card-thumb" src="${p.thumbnail}" alt="${p.title}" loading="lazy">
          <div class="card-body">
            <h5>${p.title}</h5>
            <p>${p.summary}</p>
            <div class="card-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            <div style="margin-top:.6rem;display:flex;gap:.6rem">
              ${p.github ? `<a class="btn btn-ghost" href="${p.github}" target="_blank" rel="noopener">Código</a>` : ''}
              ${p.demo ? `<a class="btn" href="${p.demo}" target="_blank" rel="noopener">Demo</a>` : ''}
            </div>
          </div>
        </article>
      `).join('');

    // Re-observe reveals for new elements
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('#grid .reveal').forEach(el => io.observe(el));
  }, 300);
}

// Setup project filters
function setupFilters(projects) {
  const filters = document.querySelectorAll('.filter');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.cat || btn.dataset.category;
      renderProjects(projects, category);
    });
  });
}

// Render blog posts
function renderBlogPosts(posts) {
  const blogGrid = document.getElementById('blogGrid');
  if (!blogGrid) return;

  blogGrid.innerHTML = posts.map(p => `
    <article class="post reveal">
      <img src="${p.cover}" alt="${p.title}" style="width:100%;height:160px;object-fit:cover;border-radius:8px">
      <div style="padding:10px">
        <time datetime="${p.date}" style="color:var(--muted);display:block">${new Date(p.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</time>
        <h4 style="margin:.4rem 0">${p.title}</h4>
        <a class="btn-ghost" href="${p.link || '#'}">Leer</a>
      </div>
    </article>
  `).join('');

  // Re-observe reveals for new elements
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

// Generate skeleton loading for projects
function generateProjectSkeletons() {
  return Array(6).fill('').map(() => `
    <article class="card-project skeleton">
      <div class="skeleton-thumb"></div>
      <div class="card-body">
        <div class="skeleton-title"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-tags"></div>
      </div>
    </article>
  `).join('');
}

// Fallback functions
function loadFallbackProjects() {
  const projects = [
    { id: 1, title: 'Blog en Django', category: 'web', thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop', summary: 'Blog ligero con auth y panel admin', tags: ['Django', 'HTML', 'SQLite'], github: 'https://github.com/Xenon0001' },
    { id: 2, title: 'GES (Sistema Escolar Simpler)', category: 'desktop', thumbnail: 'assets/img/ges-preview.png', summary: 'Gestión de alumnos y notas', tags: ['Python', 'Tkinter', 'SQLite'], github: 'https://github.com/Xenon0001/ges_v01' },
    { id: 3, title: 'Dashboard de datos', category: 'otros', thumbnail: 'https://images.unsplash.com/photo-1551281044-8b87c5d6f3df?q=80&w=1200&auto=format&fit=crop', summary: 'KPIs y análisis con Pandas', tags: ['Pandas', 'Numpy'], github: 'https://github.com/Xenon0001' },
    { id: 4, title: 'StoreTic', category: 'web', thumbnail: 'assets/img/demo_storitic.webp', summary: 'Tienda online de dispositivos informáticos con simulación de compra', tags: ['Django', 'HTML', 'CSS', 'JS', 'SQLite'], github: 'https://github.com/Xenon0001/StoreTic', demo: 'https://xenon0001.github.io/Web-Projects/demo_storetic/' },
    { id: 5, title: 'Task App (PWA)', category: 'app', thumbnail: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop', summary: 'PWA offline-first para tareas', tags: ['JS', 'PWA'], github: 'https://github.com/Xenon0001' },
    { id: 6, title: 'Portfolio React', category: 'web', thumbnail: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop', summary: 'Portfolio con React y Vite', tags: ['React', 'Vite'], github: 'https://github.com/Xenon0001' }
  ];
  renderProjects(projects);
  setupFilters(projects);
}

function loadFallbackBlogPosts() {
  const posts = [
    { id: 1, title: 'Cómo organizar un proyecto con poca conexión', date: '2025-08-10', cover: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop', link: 'blog/organizacion-offline/index.html' },
    { id: 2, title: 'Mejorar performance sin frameworks', date: '2025-06-21', cover: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=1200&auto=format&fit=crop' },
    { id: 3, title: 'Tkinter: tips prácticos', date: '2025-04-01', cover: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1200&auto=format&fit=crop' }
  ];
  renderBlogPosts(posts);
}