document.addEventListener('DOMContentLoaded', () => {

  /* ================================================================
     THEME + SMOKE PERSISTENCE
     ================================================================ */
  const root       = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const savedSmoke = localStorage.getItem('smoke') !== 'off';
  let smokeOn      = savedSmoke;

  if (savedTheme === 'light') root.setAttribute('data-theme', 'light');

  /* ================================================================
     SMOKE CANVAS
     ================================================================ */
  const canvas = document.createElement('canvas');
  canvas.id = 'smokeCanvas';
  Object.assign(canvas.style, {
    position:'fixed', top:'0', left:'0', width:'100%', height:'100%',
    pointerEvents:'none', zIndex:'1'
  });
  if (!smokeOn) canvas.classList.add('off');
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });

  let mx = W/2, my = H/2, mouseVX = 0, mouseVY = 0;
  let moving = false, moveTimer;

  window.addEventListener('mousemove', e => {
    mouseVX = e.clientX - mx; mouseVY = e.clientY - my;
    mx = e.clientX; my = e.clientY;
    moving = true;
    clearTimeout(moveTimer);
    moveTimer = setTimeout(() => { moving = false; }, 150);
    if (smokeOn) spawnBurst(mx, my, mouseVX, mouseVY);
  });

  // Dark palette = vivid, Light palette = softer pastels
  function getPalettes() {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) return [
      [[120,190,255],[80,140,230]],
      [[190,130,255],[150,80,230]],
      [[255,130,180],[230,80,140]],
      [[255,200,100],[230,160,50]],
      [[100,220,200],[60,180,160]],
    ];
    return [
      [[0,229,255],[30,170,255]],
      [[191,95,255],[140,60,255]],
      [[255,77,141],[255,30,100]],
      [[255,184,48],[255,140,20]],
      [[0,229,176],[0,200,140]],
      [[120,200,255],[60,120,255]],
      [[255,120,200],[200,60,160]],
    ];
  }

  class SmokeParticle {
    constructor(x, y, vx, vy, size) {
      const pal = getPalettes();
      const p = pal[Math.floor(Math.random()*pal.length)];
      this.col1 = p[0]; this.col2 = p[1];
      this.x = x + (Math.random()-.5)*16;
      this.y = y + (Math.random()-.5)*16;
      this.vx = vx*0.22 + (Math.random()-.5)*1.2;
      this.vy = vy*0.22 - Math.random()*1.4 - 0.5;
      this.life  = 1;
      this.decay = 0.006 + Math.random()*0.012;
      this.r     = (size||20) + Math.random()*45;
      this.dr    = 0.5 + Math.random()*0.7;
      this.spin  = (Math.random()-.5)*0.06;
      this.angle = Math.random()*Math.PI*2;
      this.sx    = 0.6 + Math.random()*0.8;
      this.sy    = 0.5 + Math.random()*0.7;
    }
    update() { this.x+=this.vx; this.y+=this.vy; this.vx*=.975; this.vy*=.975; this.life-=this.decay; this.r+=this.dr; this.angle+=this.spin; }
    draw(ctx) {
      if (this.life<=0) return;
      const alpha = Math.max(0,this.life) * (root.getAttribute('data-theme')==='light' ? 0.18 : 0.32);
      const [r1,g1,b1]=this.col1, [r2,g2,b2]=this.col2;
      ctx.save();
      ctx.translate(this.x,this.y); ctx.rotate(this.angle); ctx.scale(this.sx,this.sy);
      const grad = ctx.createRadialGradient(0,0,0,0,0,this.r);
      grad.addColorStop(0,   `rgba(${r1},${g1},${b1},${alpha})`);
      grad.addColorStop(0.35,`rgba(${r2},${g2},${b2},${alpha*.55})`);
      grad.addColorStop(0.7, `rgba(${r1},${g1},${b1},${alpha*.18})`);
      grad.addColorStop(1,   `rgba(${r2},${g2},${b2},0)`);
      ctx.fillStyle=grad; ctx.beginPath();
      ctx.ellipse(0,0,this.r,this.r*.75,0,0,Math.PI*2); ctx.fill();
      ctx.restore();
    }
  }

  class Spark {
    constructor(x, y, vx, vy) {
      const pal = getPalettes();
      this.col = pal[Math.floor(Math.random()*pal.length)][0];
      this.x=x; this.y=y;
      this.vx=vx*.4+(Math.random()-.5)*4;
      this.vy=vy*.4+(Math.random()-.5)*4-Math.random()*3;
      this.life=1; this.decay=0.028+Math.random()*.04;
      this.r=1.5+Math.random()*2.5;
    }
    update() { this.x+=this.vx; this.y+=this.vy; this.vx*=.93; this.vy*=.93; this.life-=this.decay; }
    draw(ctx) {
      if(this.life<=0) return;
      const [r,g,b]=this.col;
      const a=Math.max(0,this.life)*(root.getAttribute('data-theme')==='light'?.6:1);
      ctx.save(); ctx.globalAlpha=a;
      ctx.shadowColor=`rgb(${r},${g},${b})`; ctx.shadowBlur=8;
      ctx.fillStyle=`rgb(${r},${g},${b})`;
      ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fill();
      ctx.restore();
    }
  }

  const particles = [];
  const MAX = 300;

  function spawnBurst(x, y, vx, vy) {
    const speed = Math.sqrt(vx*vx+vy*vy);
    const count = Math.min(8, Math.floor(speed/4)+2);
    for(let i=0;i<count;i++) if(particles.length<MAX) particles.push(new SmokeParticle(x,y,vx,vy));
    if(speed>8) { const s=Math.min(5,Math.floor(speed/6)); for(let i=0;i<s;i++) if(particles.length<MAX) particles.push(new Spark(x,y,vx,vy)); }
  }

  let idleTick=0;
  function idleSmoke() {
    idleTick++;
    if(!moving && idleTick%10===0 && particles.length<50 && smokeOn) {
      const p=new SmokeParticle(mx+(Math.random()-.5)*24, my+(Math.random()-.5)*24,0,0,12);
      p.decay=0.004; particles.push(p);
    }
  }

  function render() {
    ctx.clearRect(0,0,W,H);
    idleSmoke();
    for(let i=particles.length-1;i>=0;i--) {
      const p=particles[i]; p.update(); p.draw(ctx);
      if(p.life<=0) particles.splice(i,1);
    }
    requestAnimationFrame(render);
  }
  render();

  /* ================================================================
     FLOATING CONTROLS  (theme + smoke)
     ================================================================ */
  const controls = document.createElement('div');
  controls.className = 'floating-controls';

  // Theme toggle
  const themeBtn = document.createElement('button');
  themeBtn.className = 'ctrl-btn' + (savedTheme==='light' ? ' active' : '');
  themeBtn.setAttribute('data-tip', savedTheme==='light' ? 'Dark mode' : 'Light mode');
  themeBtn.setAttribute('aria-label', 'Toggle theme');
  themeBtn.innerHTML = savedTheme==='light'
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;

  themeBtn.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme','dark');
      themeBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
      themeBtn.setAttribute('data-tip','Light mode');
      themeBtn.classList.remove('active');
    } else {
      root.setAttribute('data-theme','light');
      localStorage.setItem('theme','light');
      themeBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      themeBtn.setAttribute('data-tip','Dark mode');
      themeBtn.classList.add('active');
    }
    // Clear stale particles when switching
    particles.length = 0;
  });

  // Smoke toggle
  const smokeBtn = document.createElement('button');
  smokeBtn.className = 'ctrl-btn' + (smokeOn ? ' active' : '');
  smokeBtn.setAttribute('data-tip', smokeOn ? 'Smoke off' : 'Smoke on');
  smokeBtn.setAttribute('aria-label', 'Toggle smoke effect');
  const SMOKE_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M8 21c.5-3 2-5 2-8a4 4 0 00-8 0c0 2.5 2 4 2 8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 21c.5-3 2-5 2-8a4 4 0 00-8 0c0 2.5 2 4 2 8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  smokeBtn.innerHTML = SMOKE_ICON;

  smokeBtn.addEventListener('click', () => {
    smokeOn = !smokeOn;
    localStorage.setItem('smoke', smokeOn ? 'on' : 'off');
    canvas.classList.toggle('off', !smokeOn);
    smokeBtn.classList.toggle('active', smokeOn);
    smokeBtn.setAttribute('data-tip', smokeOn ? 'Smoke off' : 'Smoke on');
    if (!smokeOn) particles.length = 0;
  });

  controls.appendChild(themeBtn);
  controls.appendChild(smokeBtn);
  document.body.appendChild(controls);

  /* ================================================================
     LOADER
     ================================================================ */
  const loader = document.getElementById('loader');
  const loaderBar = document.querySelector('.loader-bar');
  const loaderCounter = document.querySelector('.loader-counter');
  if (loader) {
    document.body.style.overflow='hidden';
    let count=0;
    const iv = setInterval(() => {
      count += Math.floor(Math.random()*10)+4;
      if(count>=100) { count=100; clearInterval(iv); setTimeout(() => { loader.classList.add('hidden'); document.body.style.overflow=''; revealHero(); }, 500); }
      if(loaderCounter) loaderCounter.textContent = String(count).padStart(2,'0');
      if(loaderBar)     loaderBar.style.width = count+'%';
    }, 55);
  }

  /* ================================================================
     SCROLL REVEAL
     ================================================================ */
  new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold:.1}).observe === undefined || (() => {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    }, {threshold:.1});
    document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
  })();

  // Simpler version:
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold:.1});
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  function revealHero() {
    document.querySelector('.hero-name')?.classList.add('visible');
    const els = document.querySelectorAll('.hero-tagline,.hero-subtitle,.hero-cta,.motto-card,.hero-stats');
    els.forEach(el => { el.style.opacity='0'; el.style.transform='translateY(22px)'; el.style.transition='opacity .9s cubic-bezier(0.19,1,0.22,1),transform .9s cubic-bezier(0.19,1,0.22,1)'; });
    els.forEach((el,i) => setTimeout(() => { el.style.opacity='1'; el.style.transform='translateY(0)'; }, 150+i*130));
  }

  /* ================================================================
     COUNTERS
     ================================================================ */
  document.querySelectorAll('[data-target]').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(!e.isIntersecting) return;
        const target=parseInt(e.target.dataset.target), suffix=e.target.dataset.suffix||'';
        let cur=0; const step=target/55;
        const t=setInterval(() => { cur=Math.min(cur+step,target); e.target.textContent=Math.floor(cur)+suffix; if(cur>=target)clearInterval(t); }, 18);
        obs.unobserve(e.target);
      });
    });
    obs.observe(el);
  });

  /* ================================================================
     SKILL BARS
     ================================================================ */
  // skill-bar observer removed (pill layout)

  /* ================================================================
     SKILL + PROJECT FILTERS
     ================================================================ */
  // Skills filter — category rows
  const skillsFilter = document.querySelector('.skills-filter');
  if (skillsFilter) {
    const btns = skillsFilter.querySelectorAll('.filter-btn');
    const rows = document.querySelectorAll('.skills-category-row');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        rows.forEach(row => {
          const match = filter === 'All' || row.dataset.cat === filter;
          row.classList.toggle('hidden', !match);
        });
      });
    });
  }

  // ── PROJECTS HAMBURGER FILTER DRAWER ──────────────────────────────
  const filterToggle = document.getElementById('filterToggle');
  const filterDrawer = document.getElementById('filterDrawer');
  const filterReset  = document.getElementById('filterReset');
  const projCards    = document.querySelectorAll('.proj-card');

  if (filterToggle && filterDrawer && projCards.length) {
    const countEl      = document.getElementById('projCount');
    const activeCount  = document.getElementById('filterActiveCount');
    const burgerIcon   = filterToggle.querySelector('.filter-icon-burger');
    const closeIcon    = filterToggle.querySelector('.filter-icon-close');

    let activeDisc   = 'All';
    let activeYear   = 'All';
    let activeStatus = 'All';

    // Toggle drawer open/close
    filterToggle.addEventListener('click', () => {
      const isOpen = filterDrawer.classList.toggle('open');
      filterToggle.classList.toggle('open', isOpen);
      filterToggle.setAttribute('aria-expanded', isOpen);
      filterDrawer.setAttribute('aria-hidden', !isOpen);
      if (burgerIcon) burgerIcon.style.display = isOpen ? 'none'  : 'block';
      if (closeIcon)  closeIcon.style.display  = isOpen ? 'block' : 'none';
    });

    // Count active non-"All" filters
    function updateActiveCount() {
      let n = 0;
      if (activeDisc   !== 'All') n++;
      if (activeYear   !== 'All') n++;
      if (activeStatus !== 'All') n++;
      if (activeCount) {
        activeCount.textContent = n;
        activeCount.style.display = n > 0 ? 'inline-flex' : 'none';
      }
    }

    // Apply all three filters
    function applyFilters() {
      let visible = 0;
      projCards.forEach(card => {
        const disc   = card.dataset.disc || '';
        const year   = card.dataset.year || '';
        const status = card.querySelector('.proj-status')?.textContent?.trim() || '';

        const show = (activeDisc   === 'All' || disc   === activeDisc)
                  && (activeYear   === 'All' || year   === activeYear)
                  && (activeStatus === 'All' || status === activeStatus);
        card.classList.toggle('hidden', !show);
        if (show) visible++;
      });
      if (countEl) countEl.textContent = visible;
      updateActiveCount();
    }

    // Chip click handlers
    document.querySelectorAll('.filter-chip[data-group]').forEach(chip => {
      chip.addEventListener('click', () => {
        const group  = chip.dataset.group;
        const filter = chip.dataset.filter;
        document.querySelectorAll(`.filter-chip[data-group="${group}"]`)
          .forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        if (group === 'disc')   activeDisc   = filter;
        if (group === 'year')   activeYear   = filter;
        if (group === 'status') activeStatus = filter;
        applyFilters();
      });
    });

    // Reset button
    filterReset?.addEventListener('click', () => {
      activeDisc = activeYear = activeStatus = 'All';
      document.querySelectorAll('.filter-chip[data-group]').forEach(c => {
        c.classList.toggle('active', c.dataset.filter === 'All');
      });
      applyFilters();
    });

    // Close drawer on outside click
    document.addEventListener('click', e => {
      if (!e.target.closest('#filterDrawer') && !e.target.closest('#filterToggle')) {
        if (filterDrawer.classList.contains('open')) {
          filterDrawer.classList.remove('open');
          filterToggle.classList.remove('open');
          filterToggle.setAttribute('aria-expanded', false);
          if (burgerIcon) burgerIcon.style.display = 'block';
          if (closeIcon)  closeIcon.style.display  = 'none';
        }
      }
    });
  }

  /* ================================================================
     MAGNETIC BUTTONS
     ================================================================ */
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r=btn.getBoundingClientRect();
      btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.18}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', ()=>{ btn.style.transform=''; });
  });

  /* ================================================================
     ACTIVE NAV + STICKY
     ================================================================ */
  const navLinks = document.querySelectorAll('.nav-links a');
  document.querySelectorAll('section[id]').forEach(s => {
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting) navLinks.forEach(a => {
          a.classList.remove('active');
          if(a.getAttribute('href')==='#'+e.target.id||a.getAttribute('href')==='/#'+e.target.id) a.classList.add('active');
        });
      });
    }, {threshold:.4}).observe(s);
  });

  const navbar=document.getElementById('navbar');
  window.addEventListener('scroll', ()=>{ navbar?.classList.toggle('scrolled',window.scrollY>40); }, {passive:true});
  if(navbar && window.scrollY>40) navbar.classList.add('scrolled');

  /* ================================================================
     PARALLAX
     ================================================================ */
  const bgNum=document.querySelector('.hero-bg-number');
  if(bgNum) window.addEventListener('scroll', ()=>{ bgNum.style.transform=`translateY(calc(-50% + ${window.scrollY*.28}px))`; }, {passive:true});

  /* ================================================================
     TYPING EFFECT
     ================================================================ */
  const typingEl=document.querySelector('.typing-text');
  if(typingEl) {
    const words=['Developer','Designer','Builder','Creator'];
    let wi=0,ci=0,del=false;
    function type() {
      const w=words[wi];
      if(del){typingEl.textContent=w.substring(0,ci--);if(ci<0){del=false;wi=(wi+1)%words.length;setTimeout(type,450);return;}}
      else{typingEl.textContent=w.substring(0,ci++);if(ci>w.length){del=true;setTimeout(type,2000);return;}}
      setTimeout(type,del?55:95);
    }
    setTimeout(type,1200);
  }

  /* ================================================================
     HAMBURGER
     ================================================================ */
  const hamburger=document.getElementById('hamburger');
  const mobileNav=document.getElementById('mobileNav');
  const mobileClose=document.getElementById('mobileNavClose');
  const iconMenu=hamburger?.querySelector('.icon-menu');
  const iconClose=hamburger?.querySelector('.icon-close');
  const openNav=()=>{ mobileNav.classList.add('open'); if(iconMenu)iconMenu.style.display='none'; if(iconClose)iconClose.style.display='block'; document.body.style.overflow='hidden'; };
  const closeNav=()=>{ mobileNav.classList.remove('open'); if(iconMenu)iconMenu.style.display='block'; if(iconClose)iconClose.style.display='none'; document.body.style.overflow=''; };
  hamburger?.addEventListener('click', ()=>mobileNav.classList.contains('open')?closeNav():openNav());
  mobileClose?.addEventListener('click', closeNav);
  document.querySelectorAll('.mobile-nav-item').forEach(l=>l.addEventListener('click',closeNav));
  mobileNav?.addEventListener('click', e=>{ if(e.target===mobileNav)closeNav(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape')closeNav(); });

});
