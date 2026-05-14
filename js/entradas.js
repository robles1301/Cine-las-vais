/* ── Ticket purchase ────────────────────────────────────────── */

const ROWS = ['A','B','C','D','E','F','G','H','I','J','K','L'];

const state = {
  sesion: null, pelicula: null, sala: null,
  selectedSeats: [], tickets: { general:0, reducida:0, infantil:0 },
  step: 2, occupied: new Set()
};

function getParam(n) { return new URLSearchParams(location.search).get(n); }
function totalTix() { return state.tickets.general + state.tickets.reducida + state.tickets.infantil; }

function calcPrice() {
  const pr = PRECIOS[state.sala.tipo];
  return (
    state.tickets.general  * pr.general  +
    state.tickets.reducida * pr.reducida +
    state.tickets.infantil * pr.infantil
  ).toFixed(2);
}

function seatLabel(r, c) { return `${ROWS[r]}${c+1}`; }

// ── Steps ──────────────────────────────────────────────────────
function goToStep(n) {
  state.step = n;
  document.querySelectorAll('.step').forEach((el, i) => {
    el.classList.toggle('active', i+1 === n);
    el.classList.toggle('done', i+1 < n);
  });
  document.querySelectorAll('.step-panel').forEach((el, i) => {
    el.style.display = (i+1 === n) ? 'block' : 'none';
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Seat Map ──────────────────────────────────────────────────
function buildSeatMap() {
  const wrap = document.getElementById('seatRows');
  if (!wrap) return;
  wrap.innerHTML = '';

  const { filas, asientosPorFila, tipo } = state.sala;
  const rows = Math.min(filas, ROWS.length);
  const vipRows = tipo === 'vip' ? rows : Math.floor(rows * .25);

  // Deterministic occupancy
  state.occupied = (() => {
    const total = rows * asientosPorFila;
    const occ = new Set();
    let x = state.sesion.id;
    const next = () => { x = (x * 1664525 + 1013904223) >>> 0; return x % total; };
    const target = Math.floor(total * .38);
    let t = 0;
    while (occ.size < target && t++ < total * 3) occ.add(next());
    return occ;
  })();

  for (let r = 0; r < rows; r++) {
    const row = document.createElement('div');
    row.className = 'seat-row';
    const lbl = document.createElement('div');
    lbl.className = 'seat-row__lbl';
    lbl.textContent = ROWS[r];
    row.appendChild(lbl);
    const isVip = r >= rows - vipRows;

    for (let c = 0; c < asientosPorFila; c++) {
      if (c === Math.floor(asientosPorFila / 2)) {
        const aisle = document.createElement('div');
        aisle.className = 'seat-row__aisle';
        row.appendChild(aisle);
      }
      const idx = r * asientosPorFila + c;
      const seat = document.createElement('div');
      seat.className = 'seat' + (isVip ? ' seat--vip' : '');
      seat.title = seatLabel(r, c);
      if (state.occupied.has(idx)) {
        seat.classList.add('seat--occupied');
      } else {
        seat.addEventListener('click', () => toggleSeat(seat, r, c, isVip));
      }
      row.appendChild(seat);
    }
    wrap.appendChild(row);
  }
}

function toggleSeat(el, r, c, isVip) {
  const label = seatLabel(r, c);
  const idx = state.selectedSeats.findIndex(s => s.label === label);
  if (idx >= 0) {
    state.selectedSeats.splice(idx, 1);
    el.classList.remove('seat--selected');
  } else {
    if (state.selectedSeats.length >= 9) { showToast('Máximo 9 asientos por compra'); return; }
    state.selectedSeats.push({ r, c, label, isVip });
    el.classList.add('seat--selected');
  }
  syncTickets();
  updateSummary();
}

function syncTickets() {
  const n = state.selectedSeats.length;
  const cur = totalTix();
  if (cur === n) return;
  if (cur < n) { state.tickets.general += (n - cur); }
  else {
    let diff = cur - n;
    ['infantil','reducida','general'].forEach(t => {
      const r = Math.min(diff, state.tickets[t]);
      state.tickets[t] -= r; diff -= r;
    });
  }
  renderTickets();
}

// ── Ticket controls ───────────────────────────────────────────
function renderTickets() {
  const pr = PRECIOS[state.sala.tipo];
  const types = [
    { key:'general',  label:'General',   price:pr.general  },
    { key:'reducida', label:'Reducida',  price:pr.reducida },
    { key:'infantil', label:'Infantil',  price:pr.infantil },
  ];
  const el = document.getElementById('ticketTypes');
  if (!el) return;
  el.innerHTML = types.map(t => `
    <div class="ticket-type">
      <div>
        <div class="ticket-type__name">${t.label}</div>
        <div class="ticket-type__price">${t.price.toFixed(2)} €</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="changeQty('${t.key}',-1)" ${state.tickets[t.key]===0?'disabled':''}>−</button>
        <span class="qty-val">${state.tickets[t.key]}</span>
        <button class="qty-btn" onclick="changeQty('${t.key}',1)" ${totalTix()>=state.selectedSeats.length&&state.selectedSeats.length>0?'disabled':''}>+</button>
      </div>
      <div class="ticket-type__sub">${(state.tickets[t.key]*t.price).toFixed(2)} €</div>
    </div>
  `).join('');
}

window.changeQty = function(type, delta) {
  const nv = state.tickets[type] + delta;
  if (nv < 0) return;
  if (delta > 0 && totalTix() >= state.selectedSeats.length && state.selectedSeats.length > 0) {
    showToast('Selecciona más asientos primero'); return;
  }
  state.tickets[type] = nv;
  renderTickets();
  updateSummary();
};

// ── Summary ───────────────────────────────────────────────────
function updateSummary() {
  const seatList = document.getElementById('orderSeats');
  if (seatList) {
    seatList.innerHTML = state.selectedSeats.length
      ? state.selectedSeats.map(s => `<span class="order-seat">${s.label}</span>`).join('')
      : '<span style="font-size:.72rem;color:var(--dim)">Ninguno seleccionado</span>';
  }

  const subtotal = state.selectedSeats.length ? Number(calcPrice()) : 0;
  const srv = subtotal > 0 ? .50 * state.selectedSeats.length : 0;
  const total = (subtotal + srv).toFixed(2);

  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('orderSubtotal', subtotal.toFixed(2) + ' €');
  set('orderServicios', srv.toFixed(2) + ' €');
  set('orderTotal', total + ' €');

  const btn = document.getElementById('proceedBtn');
  if (btn) {
    const ready = state.selectedSeats.length > 0 && totalTix() === state.selectedSeats.length;
    btn.disabled = !ready;
    btn.textContent = ready
      ? `Continuar · ${total} €`
      : state.selectedSeats.length === 0 ? 'Selecciona asientos'
      : `Asigna las ${state.selectedSeats.length} entradas`;
  }
}

// ── Purchase header ───────────────────────────────────────────
function renderHeader() {
  const { pelicula: p, sesion: s, sala } = state;
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('purchaseMovie', p.titulo);
  set('purchaseSession', `${formatFecha(s.fecha)} · ${s.hora} · ${sala.nombre} · ${s.version}`);

  const poster = document.getElementById('orderPoster');
  if (poster) {
    poster.style.background = p.color;
    poster.innerHTML = '';
  }
  set('orderMovieTitle', p.titulo);
  const si = document.getElementById('orderMovieSession');
  if (si) si.innerHTML = `${formatFecha(s.fecha)}<br>${s.hora} · ${sala.nombre}<br>${s.version}${s.vip?' · VIP':''}`;
}

// ── Payment ───────────────────────────────────────────────────
function initPayment() {
  const form = document.getElementById('paymentForm');
  if (!form) return;

  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('paySeats', state.selectedSeats.map(s => s.label).join(', '));
  const sub = Number(calcPrice()), srv = .50 * state.selectedSeats.length;
  set('payTotal', (sub + srv).toFixed(2) + ' €');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn--primary');
    btn.textContent = 'Procesando...';
    btn.disabled = true;
    setTimeout(() => {
      const code = 'CCR-' + Math.random().toString(36).slice(2,8).toUpperCase();
      set('confirmCode', code);
      set('confirmSeats', state.selectedSeats.map(s => s.label).join(', '));
      set('confirmTotal', (Number(calcPrice()) + .50*state.selectedSeats.length).toFixed(2) + ' €');
      set('confirmMovie', state.pelicula.titulo);
      set('confirmSession', `${formatFecha(state.sesion.fecha)} · ${state.sesion.hora}`);
      goToStep(4);
    }, 1400);
  });

  // Card formatting
  const cn = document.getElementById('cardNumber');
  const ex = document.getElementById('cardExpiry');
  if (cn) cn.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
  });
  if (ex) ex.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g,'').slice(0,4);
    if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2);
    e.target.value = v;
  });
}

// ── Toast ──────────────────────────────────────────────────────
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── Nav ────────────────────────────────────────────────────────
function initNav() {
  const btn = document.querySelector('.nav__hamburger');
  const drawer = document.getElementById('drawer');
  if (btn && drawer) {
    btn.addEventListener('click', () => { btn.classList.toggle('open'); drawer.classList.toggle('open'); });
  }
}

// ── Globals for HTML onclick ───────────────────────────────────
window.proceedToPayment = function() {
  if (!state.selectedSeats.length || totalTix() !== state.selectedSeats.length) return;
  initPayment();
  goToStep(3);
};
window.backToSeats = function() { goToStep(2); };

// ── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  const result = getSesionById(Number(getParam('sesion')));
  if (!result) {
    document.getElementById('purchaseMain').innerHTML = `
      <div class="container" style="padding:100px 0;text-align:center">
        <p style="font-family:var(--serif);font-size:2rem;font-weight:300;margin-bottom:20px">Sesión no encontrada</p>
        <a href="index.html" class="btn btn--outline">Volver a la cartelera</a>
      </div>`;
    return;
  }
  state.sesion   = result.sesion;
  state.pelicula = result.pelicula;
  state.sala     = getSalaById(result.sesion.sala);
  document.title = `Entradas · ${state.pelicula.titulo} — Cine Ciudad Real`;
  renderHeader();
  buildSeatMap();
  renderTickets();
  updateSummary();
  goToStep(2);
});
