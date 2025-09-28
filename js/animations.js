// Intersection Observer reveal
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target) }
    });
  },{threshold: .12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Skill bars animate when resume visible
  const resumeSection = document.getElementById('resume');
  const barObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        document.querySelectorAll('.bar').forEach(b=>{
          const pct = b.dataset.fill || '60';
          b.querySelector('i').style.width = pct + '%';
        });
        barObserver.unobserve(entry.target);
      }
    })
  }, {threshold: .25});
  if(resumeSection) barObserver.observe(resumeSection);

  // Projects data (mock) - luego lo remplazo con mis proyectos.
  const projects = [
    {id:1,title:'Blog en Django',cat:'web',thumb:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',summary:'Blog ligero con auth y panel admin',tags:['Django','HTML','SQLite'],github:'https://github.com/Xenon0001'},
    {id:2,title:'GES (Sistema Escolar Simpler)',cat:'desktop',thumb:'../assets/img/ges-preview.png',summary:'Gestión de alumnos y notas',tags:['Python','Tkinter','SQLite'],github:'https://github.com/Xenon0001/ges_v01'},
    {id:3,title:'Dashboard de datos',cat:'otros',thumb:'https://images.unsplash.com/photo-1551281044-8b87c5d6f3df?q=80&w=1200&auto=format&fit=crop',summary:'KPIs y análisis con Pandas',tags:['Pandas','Numpy'],github:'https://github.com/Xenon0001'},
    {id:4,title:'StoreTic',cat:'web',thumb:'../assets/img/storetic-preview.png',summary:'Tienda online de dispositivos informáticos con simulación de compra',tags:['Django','HTML','CSS','JS','SQLite'],github:'https://github.com/Xenon0001/StoreTic'},
    {id:5,title:'Task App (PWA)',cat:'app',thumb:'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop',summary:'PWA offline-first para tareas',tags:['JS','PWA'],github:'https://github.com/Xenon0001'},
    {id:6,title:'Portfolio React',cat:'web',thumb:'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop',summary:'Portfolio con React y Vite',tags:['React','Vite'],github:'https://github.com/Xenon0001'}
  ];

  const grid = document.getElementById('grid');
  function renderProjects(cat='all'){
    grid.innerHTML = projects
      .filter(p => cat === 'all' ? true : p.cat === cat)
      .map(p => `
        <article class="card-project reveal" data-cat="${p.cat}">
          <img class="card-thumb" src="${p.thumb}" alt="${p.title}" loading="lazy">
          <div class="card-body">
            <h5>${p.title}</h5>
            <p>${p.summary}</p>
            <div class="card-tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
            <div style="margin-top:.6rem;display:flex;gap:.6rem">
              ${p.github?`<a class="btn btn-ghost" href="${p.github}" target="_blank" rel="noopener">Código</a>`:''}
              // ${p.demo?`<a class="btn" href="${p.demo}" target="_blank" rel="noopener">Demo</a>`:''}
            </div>
          </div>
        </article>
      `).join('');
    // observe reveals for new elements
    document.querySelectorAll('#grid .reveal').forEach(el=>io.observe(el));
  }

  // Filters
  document.querySelectorAll('.filter').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.cat);
    });
  });

  renderProjects('all');

  // Blog mock
  const posts = [
    {id:1,title:'Cómo organizar un proyecto con poca conexión',date:'2025-08-10',cover:'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop'},
    {id:2,title:'Mejorar performance sin frameworks',date:'2025-06-21',cover:'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=1200&auto=format&fit=crop'},
    {id:3,title:'Tkinter: tips prácticos',date:'2025-04-01',cover:'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1200&auto=format&fit=crop'}
  ];
  const blogGrid = document.getElementById('blogGrid');
  blogGrid.innerHTML = posts.map(p=>`
    <article class="post reveal">
      <img src="${p.cover}" alt="${p.title}" style="width:100%;height:160px;object-fit:cover;border-radius:8px">
      <div style="padding:10px">
        <time datetime="${p.date}" style="color:var(--muted);display:block">${new Date(p.date).toLocaleDateString('es-ES',{day:'2-digit',month:'short',year:'numeric'})}</time>
        <h4 style="margin:.4rem 0">${p.title}</h4>
        <a class="btn-ghost" href="#">Leer</a>
      </div>
    </article>
  `).join('');
  document.querySelectorAll('#blogGrid .reveal').forEach(el=>io.observe(el));

  // Contact form (mailto fallback)
  const form = document.getElementById('contactForm');
  const ok = document.getElementById('ok');
  const err = document.getElementById('err');

  function validEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if(!validEmail(email) || !subject || message.length < 10){
      err.style.display='block';
      ok.style.display='none';
      return;
    }
    err.style.display='none';
    ok.style.display='block';
    const body = encodeURIComponent(`De: ${email}\n\n${message}`);
    // mailto fallback
    window.location.href = `mailto:xenonpy465@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });

  // small tilt on visual card
  const visual = document.querySelector('.visual-img');
  if(visual){
    visual.addEventListener('mousemove', (ev)=>{
      const r = visual.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      visual.style.transform = `rotateY(${x*6}deg) rotateX(${-y*6}deg)`;
    });
    visual.addEventListener('mouseleave', ()=> visual.style.transform = '');
  }

  // respect prefers-reduced-motion
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.reveal').forEach(r => { r.style.transition = 'none'; r.classList.add('show') });
  }
