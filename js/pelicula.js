/* ── Movie detail page ──────────────────────────────────────── */

function getParam(n) { return new URLSearchParams(location.search).get(n); }

function getUniqueDates(sesiones) {
  const seen = new Set();
  return sesiones
    .filter(function(s) { if (seen.has(s.fecha)) return false; seen.add(s.fecha); return true; })
    .map(function(s) { return s.fecha; }).sort();
}

function renderSessions(p, date) {
  const el = document.getElementById('sessionsList');
  if (!el) return;
  el.innerHTML = '';

  const bySala = {};
  p.sesiones.filter(function(s) { return s.fecha === date; })
    .forEach(function(s) { (bySala[s.sala] = bySala[s.sala] || []).push(s); });

  if (!Object.keys(bySala).length) {
    el.innerHTML = '<p style="color:var(--mid);font-size:.85rem;padding:20px 0">No hay sesiones este día.</p>';
    return;
  }

  Object.entries(bySala).forEach(function(entry) {
    var sid = entry[0], sessions = entry[1];
    const sala = getSalaById(Number(sid));
    const g = document.createElement('div');
    g.className = 'sessions-group fade-up';

    var btnsHtml = '';
    sessions.forEach(function(s) {
      btnsHtml +=
        '<button class="session-btn' + (s.vip ? ' session-btn--vip' : '') +
        '" data-sesion="' + s.id + '">' +
          '<span class="session-btn__time">' + s.hora + '</span>' +
          '<span class="session-btn__ver">' + s.version + (s.vip ? ' · VIP' : '') + '</span>' +
        '</button>';
    });

    g.innerHTML =
      '<div class="sessions-group__lbl">' + (sala ? sala.nombre : 'Sala ' + sid) + '</div>' +
      '<div class="sessions-list">' + btnsHtml + '</div>';

    g.querySelectorAll('.session-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        location.href = 'entradas.html?sesion=' + btn.dataset.sesion;
      });
    });

    el.appendChild(g);
  });
}

function renderDateTabs(p, dates) {
  const tabs = document.getElementById('dateTabs');
  if (!tabs) return;
  tabs.innerHTML = '';
  dates.forEach(function(date, i) {
    const d = new Date(date + 'T12:00:00');
    const day = d.toLocaleDateString('es-ES', { weekday: 'short' });
    const num = d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    const btn = document.createElement('button');
    btn.className = 'date-tab' + (i === 0 ? ' active' : '');
    btn.innerHTML = '<span>' + day + '</span>' + num;
    btn.addEventListener('click', function() {
      document.querySelectorAll('.date-tab').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      renderSessions(p, date);
    });
    tabs.appendChild(btn);
  });
}

function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', function() { nav.classList.toggle('scrolled', window.scrollY > 20); }, { passive: true });
  nav.classList.add('scrolled');
  const btn = document.querySelector('.nav__hamburger');
  const drawer = document.getElementById('drawer');
  if (btn && drawer) {
    btn.addEventListener('click', function() { btn.classList.toggle('open'); drawer.classList.toggle('open'); });
    drawer.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        btn.classList.remove('open');
        drawer.classList.remove('open');
      });
    });
  }
}

function renderPelicula() {
  const id = Number(getParam('id'));
  const p = getPeliculaById(id);

  if (!p) {
    document.getElementById('detailMain').innerHTML =
      '<div class="container" style="padding:140px 0;text-align:center">' +
        '<p style="font-family:var(--serif);font-size:2rem;font-weight:300;margin-bottom:16px">Película no encontrada</p>' +
        '<a href="index.html" class="btn btn--outline">Volver a la cartelera</a>' +
      '</div>';
    return;
  }

  document.title = p.titulo + ' — Cines Las Vías';

  // Backdrop & poster — gradient on container, img on top (no onerror needed)
  document.getElementById('detailBg').style.background = p.color;
  const poster = document.getElementById('detailPoster');
  if (p.poster) {
    poster.style.background = p.color;
    poster.innerHTML = '<img src="' + p.poster + '" alt="' + p.titulo + '" class="detail-poster-img">';
  } else {
    poster.innerHTML =
      '<div class="detail-poster-art" style="background:' + p.color + '">' +
        '<div class="detail-poster-art-title">' + p.titulo + '</div>' +
        '<div class="detail-poster-art-rule"></div>' +
        '<div class="detail-poster-art-year">' + p.año + '</div>' +
      '</div>';
  }

  // Text
  document.getElementById('detailBreadTitle').textContent = p.titulo;
  document.getElementById('detailTitle').textContent = p.titulo;
  document.getElementById('detailOriginal').textContent = p.titulo_original;
  document.getElementById('detailSynopsis').textContent = p.sinopsis;

  var genresHtml = '';
  p.genero.forEach(function(g) { genresHtml += '<span class="detail-genre">' + g + '</span>'; });
  document.getElementById('detailGenres').innerHTML = genresHtml;

  document.getElementById('detailStats').innerHTML =
    '<div class="detail-stat">' +
      '<span class="detail-stat__lbl">Valoración</span>' +
      '<span class="detail-stat__val detail-stat__val--rating">' + p.rating + '</span>' +
    '</div>' +
    '<div class="detail-stat">' +
      '<span class="detail-stat__lbl">Duración</span>' +
      '<span class="detail-stat__val">' + p.duracion + ' min</span>' +
    '</div>' +
    '<div class="detail-stat">' +
      '<span class="detail-stat__lbl">Año</span>' +
      '<span class="detail-stat__val">' + p.año + '</span>' +
    '</div>' +
    '<div class="detail-stat">' +
      '<span class="detail-stat__lbl">Director</span>' +
      '<span class="detail-stat__val">' + p.director + '</span>' +
    '</div>' +
    '<div class="detail-stat">' +
      '<span class="detail-stat__lbl">Clasificación</span>' +
      '<span class="detail-stat__val">' + (p.clasificacion === '0' ? 'APTA' : '+' + p.clasificacion) + '</span>' +
    '</div>';

  var castHtml = '';
  p.reparto.forEach(function(a) { castHtml += '<span class="detail-cast-tag">' + a + '</span>'; });
  document.getElementById('detailCast').innerHTML = castHtml;

  // Sessions
  const dates = getUniqueDates(p.sesiones);
  renderDateTabs(p, dates);
  if (dates.length) renderSessions(p, dates[0]);
}

document.addEventListener('DOMContentLoaded', function() {
  initNav();
  renderPelicula();
});
