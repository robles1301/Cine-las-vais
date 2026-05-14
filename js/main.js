/* ── Homepage ───────────────────────────────────────────────── */

let heroIdx = 0;
const featured = PELICULAS.filter(p => p.enCartelera && p.destacada);
let heroTimer;

// ── Hero ──────────────────────────────────────────────────────
function renderHero(i) {
  const p = featured[i];
  if (!p) return;

  const bg = document.getElementById('heroBg');
  if (p.poster) {
    bg.style.background = `${p.color}`;
    bg.style.backgroundImage = `url('${p.poster}')`;
    bg.style.backgroundSize = 'cover';
    bg.style.backgroundPosition = 'center';
  } else {
    bg.style.background = p.color;
    bg.style.backgroundImage = '';
  }

  document.getElementById('heroTitle').textContent = p.titulo;
  document.getElementById('heroSynopsis').textContent = p.sinopsis;
  document.getElementById('heroCta').href = 'pelicula.html?id=' + p.id;
  document.getElementById('heroComprar').href = 'pelicula.html?id=' + p.id + '#sesiones';

  const meta = document.getElementById('heroMeta');
  meta.innerHTML =
    '<span class="hero__meta-rating">' + p.rating + '</span>' +
    '<span class="hero__meta-item">' + p.duracion + ' min</span>' +
    '<span class="hero__meta-item">' + p.año + '</span>' +
    '<span class="hero__meta-item">' + (p.clasificacion === '0' ? 'APTA' : '+' + p.clasificacion) + '</span>' +
    '<span class="hero__meta-item">' + p.genero.join(' · ') + '</span>';

  document.querySelectorAll('.hero__dot').forEach(function(d, idx) {
    d.classList.toggle('active', idx === i);
  });
  heroIdx = i;
}

function buildHero() {
  const wrap = document.getElementById('heroDots');
  if (!wrap) return;
  featured.forEach(function(_, i) {
    const d = document.createElement('div');
    d.className = 'hero__dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', function() { stopHero(); renderHero(i); startHero(); });
    wrap.appendChild(d);
  });
  renderHero(0);
}
function startHero() {
  heroTimer = setInterval(function() { renderHero((heroIdx + 1) % featured.length); }, 6000);
}
function stopHero() { clearInterval(heroTimer); }

// ── Movie Cards ───────────────────────────────────────────────
function movieCard(p) {
  const card = document.createElement('div');
  card.className = 'movie-card fade-up';
  card.dataset.genres = p.genero.map(function(g) { return g.toLowerCase(); }).join(' ');

  const today = new Date().toISOString().split('T')[0];
  const todaySess = p.sesiones.filter(function(s) { return s.fecha === today; });

  // Session pills
  let pillsHtml = '';
  if (todaySess.length) {
    pillsHtml = '<div class="movie-card__sessions">';
    todaySess.forEach(function(s) {
      pillsHtml += '<span class="movie-card__stime' + (s.vip ? ' movie-card__stime--vip' : '') +
        '" data-sesion="' + s.id + '">' + s.hora + '</span>';
    });
    pillsHtml += '</div>';
  }

  // Poster: img over gradient background (no onerror needed — gradient shows if img fails)
  const posterHtml = p.poster
    ? '<img src="' + p.poster + '" alt="' + p.titulo + '" class="movie-card__poster-img" loading="lazy">'
    : '<div class="movie-card__art">' +
        '<div class="movie-card__art-title">' + p.titulo + '</div>' +
        '<div class="movie-card__art-rule"></div>' +
        '<div class="movie-card__art-year">' + p.año + '</div>' +
      '</div>';

  const classify = p.clasificacion === '0' ? 'APTA' : '+' + p.clasificacion;

  card.innerHTML =
    '<div class="movie-card__frame" style="background:' + p.color + '">' +
      posterHtml +
      '<div class="movie-card__classify">' + classify + '</div>' +
      '<div class="movie-card__reveal">' +
        '<a class="movie-card__reveal-btn" href="pelicula.html?id=' + p.id + '">Ver detalles</a>' +
        '<a class="movie-card__reveal-btn movie-card__reveal-btn--buy" href="pelicula.html?id=' + p.id + '#sesiones">Comprar</a>' +
      '</div>' +
    '</div>' +
    '<div class="movie-card__genres">' + p.genero.slice(0, 2).join(' · ') + '</div>' +
    '<div class="movie-card__name">' + p.titulo + '</div>' +
    '<div class="movie-card__foot">' +
      '<span class="movie-card__rating">' + p.rating + '</span>' +
      '<span>' + p.duracion + ' min</span>' +
    '</div>' +
    pillsHtml;

  // Session pill clicks
  card.querySelectorAll('.movie-card__stime').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.stopPropagation();
      location.href = 'entradas.html?sesion=' + el.dataset.sesion;
    });
  });

  card.addEventListener('click', function(e) {
    if (!e.target.closest('a') && !e.target.closest('.movie-card__stime'))
      location.href = 'pelicula.html?id=' + p.id;
  });
  return card;
}

// ── Grid ──────────────────────────────────────────────────────
function renderGrid(filter) {
  filter = filter || 'all';
  const grid = document.getElementById('moviesGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const list = filter === 'all'
    ? PELICULAS.filter(function(p) { return p.enCartelera; })
    : PELICULAS.filter(function(p) {
        return p.enCartelera && p.genero.some(function(g) { return g.toLowerCase() === filter; });
      });

  if (!list.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;color:var(--mid);font-size:.85rem;padding:40px 0">No hay películas en esta categoría.</p>';
    return;
  }
  list.forEach(function(p, i) {
    const c = movieCard(p);
    c.style.animationDelay = (i * 0.05) + 's';
    grid.appendChild(c);
  });
}

// ── Filters ───────────────────────────────────────────────────
function initFilters() {
  document.querySelectorAll('.filter-tab').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-tab').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      renderGrid(btn.dataset.filter);
    });
  });
}

// ── Upcoming ──────────────────────────────────────────────────
function renderUpcoming() {
  const grid = document.getElementById('upcomingGrid');
  if (!grid) return;
  PROXIMOS_ESTRENOS.forEach(function(p, i) {
    const d = new Date(p.fechaEstreno + 'T12:00:00');
    const dateStr = d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

    const card = document.createElement('div');
    card.className = 'upcoming-card fade-up';
    card.style.animationDelay = (i * 0.07) + 's';

    // Background: real poster image over gradient fallback
    const bgHtml = p.poster
      ? '<div class="upcoming-card__bg" style="background:' + p.color + '"></div>' +
        '<img src="' + p.poster + '" alt="' + p.titulo + '" class="upcoming-card__poster-img" loading="lazy">'
      : '<div class="upcoming-card__bg" style="background:' + p.color + '"></div>';

    card.innerHTML =
      bgHtml +
      '<div class="upcoming-card__body">' +
        '<div class="upcoming-card__date">' + dateStr + '</div>' +
        '<div class="upcoming-card__title">' + p.titulo + '</div>' +
        '<div class="upcoming-card__genres">' + p.genero.join(' · ') + '</div>' +
      '</div>';

    grid.appendChild(card);
  });
}

// ── Salas ─────────────────────────────────────────────────────
function renderSalas() {
  const grid = document.getElementById('salasGrid');
  if (!grid) return;
  const feats = {
    standard: ['Dolby Atmos', 'Proyección 4K', 'Butacas reclinables'],
    vip:      ['Dolby Atmos', 'Proyección 4K', 'Butacas Premium', 'Servicio en sala', 'Menú Premium']
  };
  CINE.salas.forEach(function(s, i) {
    const el = document.createElement('div');
    el.className = 'sala-item';
    const num = (i + 1) < 10 ? '0' + (i + 1) : '' + (i + 1);
    const featHtml = feats[s.tipo].map(function(f) { return '<div class="sala-item__feat">' + f + '</div>'; }).join('');
    el.innerHTML =
      '<div class="sala-item__num">' + num + '</div>' +
      '<div class="sala-item__name">' + s.nombre + '</div>' +
      '<div class="sala-item__cap">' + s.capacidad + ' butacas</div>' +
      '<div class="sala-item__feats">' + featHtml + '</div>';
    grid.appendChild(el);
  });
}

// ── Nav scroll ────────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 30); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const btn = document.querySelector('.nav__hamburger');
  const drawer = document.getElementById('drawer');
  if (btn && drawer) {
    btn.addEventListener('click', function() {
      btn.classList.toggle('open');
      drawer.classList.toggle('open');
    });
    drawer.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        btn.classList.remove('open');
        drawer.classList.remove('open');
      });
    });
  }
}

// ── Footer ────────────────────────────────────────────────────
function renderFooter() {
  function set(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
  set('footerHor',   CINE.horarioTaquilla);
  set('footerAddr',  CINE.direccion);
  set('footerTel',   CINE.telefono);
  set('footerEmail', CINE.email);
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  initNav();
  buildHero();
  startHero();
  renderGrid();
  initFilters();
  renderUpcoming();
  renderSalas();
  renderFooter();
});
