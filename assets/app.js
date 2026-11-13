/* ============================================================
   Mil Kositas — tienda
   Configura tus datos en CONFIG (WhatsApp, Yape, Plin, envío).
   ============================================================ */
"use strict";

const CONFIG = {
  whatsapp: "51999999999",     // número con código de país, sin + ni espacios
  holder: "Freisy",            // titular de Yape / Plin
  yape: "999999999",           // número de Yape
  plin: "999999999",           // número de Plin
  freeShippingFrom: 99,        // envío gratis desde S/ 99
  shipping: {                  // costo de envío según el distrito
    "Nuevo Chimbote": 5,
    "Chimbote": 10
  },
  deliveryTime: "24 a 48 horas",
  cardUrl: "",                 // link de pago Culqi / Izipay / Mercado Pago (vacío = próximamente)
  qrYape: "",                  // opcional: "imagenes/qr-yape.png" (si vacío, se genera un QR con el número)
  qrPlin: "",                  // opcional: "imagenes/qr-plin.png"
  supabaseUrl: "",             // opcional: URL del proyecto Supabase
  supabaseKey: ""              // opcional: anon public key
};

/* ---------- datos ---------- */
const ICON = { "Todas": "🛍️", "Útiles": "✏️", "Hogar": "🏠", "Belleza": "💄", "Tecnología": "🎧", "Moda": "👕", "Juguetes": "🧸" };

const RAW = [
  // nombre, categoría, precio, palabras clave, descripción
  ["Cartuchera de tela con cierre", "Útiles", 9.90, "lapiz lapicero estuche colores colegio", "Cartuchera resistente con cierre, ideal para el colegio y la oficina. Tela lavable y varios compartimentos."],
  ["Set de 24 lápices de colores", "Útiles", 8.90, "lapiz crayones dibujo cartuchera colores", "Colores intensos y suaves al trazo. Set de 24 lápices para dibujar, colorear y hacer tareas."],
  ["Cuaderno universitario x3", "Útiles", 14.90, "libreta apuntes cuaderno hojas", "Pack de 3 cuadernos de 100 hojas cada uno. Hojas rayadas y tapas resistentes."],
  ["Kit de resaltadores pastel x6", "Útiles", 7.90, "plumon marcador lapicero resaltador pastel", "6 resaltadores en tonos pastel que no manchan la hoja. Punta biselada para trazos finos y gruesos."],
  ["Organizador de cocina 3 niveles", "Hogar", 24.90, "estante repisa ordenar cocina", "Gana espacio en tu cocina con 3 niveles. Ideal para especias, latas y utensilios."],
  ["Set de 6 tápers herméticos", "Hogar", 19.90, "tuper lonchera comida recipiente", "6 tápers herméticos de distintos tamaños. Aptos para microondas y refrigeradora."],
  ["Lámpara LED de escritorio", "Hogar", 29.90, "luz velador estudio lectura", "Luz LED regulable que cuida tu vista. Perfecta para estudiar, leer o trabajar."],
  ["Cesta organizadora plegable", "Hogar", 12.90, "ropa canasta organizador cesta", "Cesta plegable para ropa, juguetes o lo que necesites. Se guarda sin ocupar espacio."],
  ["Sérum de vitamina C 30 ml", "Belleza", 22.00, "cara piel facial serum vitamina", "Ilumina y unifica el tono de tu piel. Textura ligera de rápida absorción."],
  ["Set de 12 brochas de maquillaje", "Belleza", 27.90, "makeup rostro brochas maquillaje", "12 brochas de cerdas suaves para un acabado perfecto. Incluye estuche."],
  ["Crema hidratante corporal", "Belleza", 14.90, "locion piel cuerpo crema", "Hidratación por 24 horas con aroma suave. Para uso diario en todo el cuerpo."],
  ["Esmaltes de uñas pack x10", "Belleza", 18.90, "manicure pintaunas esmalte uñas", "10 colores de moda con secado rápido y acabado brillante."],
  ["Audífonos bluetooth TWS", "Tecnología", 59.90, "auriculares inalambricos sonido bluetooth", "Sonido nítido, conexión bluetooth y estuche de carga. Ideales para el día a día."],
  ["Cargador rápido 20W USB-C", "Tecnología", 24.90, "cable celular carga cargador", "Carga rápida y segura de 20W. Compatible con celulares y tablets USB-C."],
  ["Parlante portátil mini", "Tecnología", 39.90, "bocina altavoz musica parlante bluetooth", "Pequeño, potente y recargable. Llévate tu música a todas partes."],
  ["Mouse inalámbrico silencioso", "Tecnología", 19.90, "computadora laptop mouse inalambrico", "Clics silenciosos y batería duradera. Conexión inalámbrica estable."],
  ["Mochila urbana impermeable", "Moda", 54.90, "bolso maleta colegio mochila", "Resistente al agua, con puerto USB y espacio para laptop. Para el cole, la u o el trabajo."],
  ["Pack de 5 pares de medias", "Moda", 16.90, "calcetines medias algodon", "5 pares de algodón suave y transpirable. Colores surtidos."],
  ["Bloques de construcción 500 pzs", "Juguetes", 34.90, "lego ninos armar bloques construccion", "500 piezas para armar y crear sin límites. Estimula la creatividad de los peques."],
  ["Rompecabezas 1000 piezas", "Juguetes", 21.90, "puzzle familia rompecabezas", "1000 piezas para disfrutar en familia. Incluye póster guía."]
];

const PRODUCTS = RAW.map((a, i) => {
  const pct = [20, 35, 15, 40, 25, 30, 50, 10][i % 8];
  const old = Math.ceil(a[2] / (1 - pct / 100)) - 0.1;
  return {
    id: i, n: a[0], c: a[1], p: a[2], k: a[3], d: a[4],
    pct, old: Math.round(old * 10) / 10,
    sold: (i * 137) % 900 + 100,
    r: (4 + ((i * 7) % 10) / 10).toFixed(1),
    imgs: [`imagenes/${i + 1}.jpg`]
  };
});

const SLIDES = [
  { kicker: "Vuelta a clases", title: "Todo para el cole, desde S/ 7.90", text: "Útiles, cuadernos y colores para empezar con todo.", img: "imagenes/2.jpg", cat: "Útiles", off: "50%", grad: "linear-gradient(120deg,#7b2cbf,#e8267a)", fb: 2 },
  { kicker: "Tecnología", title: "Tu música, tus llamadas, tu ritmo", text: "Audífonos, parlantes y cargadores con delivery en Nuevo Chimbote y Chimbote.", img: "imagenes/13.jpg", cat: "Tecnología", off: "40%", grad: "linear-gradient(120deg,#1e88e5,#7b2cbf)", fb: 13 },
  { kicker: "Para tu hogar", title: "Mil cositas para un hogar más lindo", text: "Organiza, ilumina y decora sin gastar de más.", img: "imagenes/7.jpg", cat: "Hogar", off: "35%", grad: "linear-gradient(120deg,#fc6701,#e8267a)", fb: 7 }
];

const TILES = [
  { cat: "Útiles", color: "#7b2cbf,#e8267a", icon: "✏️" },
  { cat: "Belleza", color: "#e8267a,#fc6701", icon: "💄" },
  { cat: "Tecnología", color: "#1e88e5,#7b2cbf", icon: "🎧" }
];

const WHY = `<div class="sec"><h2>¿Por qué comprar aquí?</h2><i class="line"></i></div>
<div class="why">
  <div><b>⚡</b>Paga fácil con Yape o Plin<small>Escanea, paga y listo.</small></div>
  <div><b>📦</b>Delivery en Chimbote y Nuevo Chimbote<small>Llega en ${CONFIG.deliveryTime}.</small></div>
  <div><b>💸</b>Precios bajos cada día<small>Ofertas nuevas todas las semanas.</small></div>
  <div><b>💬</b>Atención por WhatsApp<small>Te ayudamos a comprar.</small></div>
</div>`;

/* ---------- utilidades ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const money = n => "S/ " + (Math.round(Number(n) * 100) / 100).toFixed(2);
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { } };
const byId = id => PRODUCTS.find(p => p.id === Number(id));
const cartCount = () => Object.values(cart).reduce((a, b) => a + b, 0);
const subtotal = () => Object.entries(cart).reduce((s, [id, q]) => s + (byId(id)?.p || 0) * q, 0);
const freeShip = () => subtotal() >= CONFIG.freeShippingFrom;
const districts = Object.keys(CONFIG.shipping);
const district = () => (draft && CONFIG.shipping[draft.dis] != null ? draft.dis : districts[0]);
const shipCost = () => CONFIG.shipping[district()] ?? 0;
const shipping = () => (!cartCount() ? 0 : freeShip() ? 0 : shipCost());
const shipLabel = () => `· ${district()}`;
const grandTotal = () => subtotal() + shipping();

let cart = read("mk_cart", {});
let orders = read("mk_orders", {}) || {};
let draft = read("mk_draft", {}) || {};
if (!cart || typeof cart !== "object") cart = {};
cart = Object.fromEntries(Object.entries(cart).filter(([id, q]) => byId(id) && Number(q) > 0));
let cat = "Todas";
let query = "";
let lastFocus = null;

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("on");
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove("on"), 2200);
}

function bumpBadge() {
  const c = $("#cnt");
  c.textContent = cartCount();
  c.classList.remove("bump");
  void c.offsetWidth;
  c.classList.add("bump");
}

function saveCart() {
  write("mk_cart", cart);
  bumpBadge();
}
function saveOrders() { write("mk_orders", orders); }

/* ilustración de respaldo si falta una foto */
const PAL = [["#ffd21f", "#fc6701"], ["#e8267a", "#7b2cbf"], ["#1e88e5", "#7b2cbf"], ["#2eb85c", "#1e88e5"], ["#fc6701", "#e8267a"]];
const EMO = ["👝", "✏️", "📓", "🖍️", "🗄️", "🍱", "💡", "🧺", "🧴", "🖌️", "🫙", "💅", "🎧", "🔌", "🔊", "🖱️", "🎒", "🧦", "🧱", "🧩"];
function fallbackImg(id) {
  const c = PAL[id % PAL.length], e = EMO[id % EMO.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient></defs><rect width="600" height="600" fill="url(#g)"/><circle cx="120" cy="480" r="190" fill="#fff" opacity=".18"/><circle cx="500" cy="110" r="90" fill="#fff" opacity=".15"/><text x="300" y="330" font-size="250" text-anchor="middle">${e}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
window.imgFallback = function (el, id) {
  if (el.dataset.fb) return;
  el.dataset.fb = "1";
  el.src = fallbackImg(Number(id));
};

/* ---------- tarjetas ---------- */
function cardHTML(p, extra = "") {
  return `<article class="card ${extra}" data-open="${p.id}" tabindex="0" role="button" aria-label="Ver ${esc(p.n)}">
    <div class="ph">
      <span class="bd">-${p.pct}%</span>
      <img src="${p.imgs[0]}" alt="${esc(p.n)}" loading="lazy" onerror="imgFallback(this,${p.id})">
      <button class="plus" data-add="${p.id}" aria-label="Agregar ${esc(p.n)} al carrito" title="Agregar al carrito">+</button>
    </div>
    <div class="i">
      <span class="cat-tag">${esc(p.c)}</span>
      <p>${esc(p.n)}</p>
      <span class="st"><b>★</b> ${p.r} · ${p.sold} vendidos</span>
      <span class="pr">${money(p.p)} <span class="old">${money(p.old)}</span></span>
    </div>
  </article>`;
}

function section(title, list, link) {
  if (!list.length) return "";
  return `<div class="sec"><h2>${title}</h2><i class="line"></i>${link ? `<button class="link" data-go="${esc(link)}">Ver todo</button>` : ""}</div><div class="grid">${list.map(p => cardHTML(p)).join("")}</div>`;
}

/* ---------- render principal ---------- */
function renderCats() {
  const counts = {};
  PRODUCTS.forEach(p => counts[p.c] = (counts[p.c] || 0) + 1);
  $("#cats").innerHTML = ["Todas", ...Object.keys(ICON).filter(c => c !== "Todas" && counts[c])].map(c =>
    `<button class="cat ${c === cat ? "on" : ""}" data-cat="${esc(c)}" aria-pressed="${c === cat}"><i>${ICON[c] || "🛍️"}</i>${esc(c)}<small>${c === "Todas" ? PRODUCTS.length : counts[c]} prod.</small></button>`
  ).join("");
}

function render() {
  renderCats();
  const q = norm(query.trim());
  const hero = $("#hero"), ben = $(".ben");
  const filtered = q || cat !== "Todas";
  hero.style.display = ben.style.display = filtered ? "none" : "";
  $("#list").innerHTML = "";

  if (filtered) {
    const list = PRODUCTS.filter(p => (cat === "Todas" || p.c === cat) && (!q || norm(`${p.n} ${p.c} ${p.k} ${p.d}`).includes(q)));
    const title = q ? `Resultados para “${esc(query.trim())}”` : esc(cat);
    $("#list").innerHTML = list.length
      ? `<div class="sec"><h2>${title}</h2><i class="line"></i><button class="link" data-go="Todas">Ver todo</button></div><div class="grid">${list.map(p => cardHTML(p)).join("")}</div>`
      : `<div class="nores"><span class="ic">😕</span><h3>No encontramos “${esc(query.trim())}”</h3><p>Prueba con otra palabra o mira estas ideas:</p><div class="sugg">${["lápiz", "audífonos", "mochila", "cocina"].map(s => `<button data-search="${s}">${s}</button>`).join("")}</div></div>`;
    return;
  }

  const flash = [...PRODUCTS].sort((a, b) => b.pct - a.pct).slice(0, 8);
  const sold = [...PRODUCTS].sort((a, b) => b.sold - a.sold).slice(0, 4);
  const cheap = [...PRODUCTS].sort((a, b) => a.p - b.p).slice(0, 4);

  $("#list").innerHTML = `
    <section class="flash" aria-label="Ofertas relámpago">
      <div class="h"><span class="zap">⚡</span> Ofertas relámpago <span id="cd">--:--:--</span></div>
      <div class="hs">${flash.map(p => cardHTML(p)).join("")}</div>
    </section>
    <div class="tiles">${TILES.map(t => `<button class="tl" style="background:linear-gradient(135deg,${t.color})" data-go="${esc(t.cat)}"><b>${esc(t.cat)}</b><span>Ver todo</span><em>${t.icon}</em></button>`).join("")}</div>
    ${section("🔥 Más vendidos", sold)}
    ${section("💸 Los más baratos", cheap)}
    ${["Útiles", "Hogar", "Belleza", "Tecnología", "Moda", "Juguetes"].map(c => section(`${ICON[c]} ${c}`, PRODUCTS.filter(p => p.c === c))).join("")}
    ${WHY}`;
  tick();
}

/* cuenta regresiva de ofertas */
function tick() {
  const e = $("#cd");
  if (!e) return;
  const now = new Date(), end = new Date(now);
  end.setHours(24, 0, 0, 0);
  let s = Math.floor((end - now) / 1000);
  e.textContent = [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60].map(v => String(v).padStart(2, "0")).join(":");
}
setInterval(tick, 1000);

/* hero */
let slide = 0, heroTimer = null;
function renderHero() {
  $("#hero").innerHTML = SLIDES.map((s, i) => `
    <div class="sl ${i ? "" : "on"}" style="background:${s.grad}">
      <div class="txt">
        <span class="kick">${esc(s.kicker)}</span>
        <b>${esc(s.title)}</b>
        <span>${esc(s.text)}</span>
        <button class="cta" data-go="${esc(s.cat)}">Ver ofertas</button>
      </div>
      <div class="pic"><div class="stk">HASTA<b>-${s.off}</b></div><img src="${s.img}" alt="${esc(s.cat)}" onerror="imgFallback(this,${s.fb})"></div>
    </div>`).join("") +
    `<button class="arrow prev" data-slide="-1" aria-label="Anterior">‹</button>
     <button class="arrow next" data-slide="1" aria-label="Siguiente">›</button>
     <div class="dots">${SLIDES.map((_, i) => `<button class="${i ? "" : "on"}" data-dot="${i}" aria-label="Ir a la promoción ${i + 1}"></button>`).join("")}</div>`;
  startHero();
}
function showSlide(n) {
  slide = (n + SLIDES.length) % SLIDES.length;
  $$(".sl").forEach((e, i) => e.classList.toggle("on", i === slide));
  $$(".dots button").forEach((e, i) => e.classList.toggle("on", i === slide));
}
function startHero() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => showSlide(slide + 1), 5200);
  $("#hero").onmouseenter = () => clearInterval(heroTimer);
  $("#hero").onmouseleave = startHero;
}

/* ---------- carrito ---------- */
function add(id, n = 1) {
  const p = byId(id);
  if (!p) return;
  cart[p.id] = (cart[p.id] || 0) + n;
  saveCart();
  toast(`✅ ${p.n} agregado`);
}
function setQty(id, d) {
  id = Number(id);
  cart[id] = (cart[id] || 0) + d;
  if (cart[id] < 1) delete cart[id];
  saveCart();
  panel();
}
function removeItem(id) {
  delete cart[id];
  saveCart();
  panel();
}

function openCart() {
  lastFocus = document.activeElement;
  $("#drawer").classList.add("open");
  $("#drawer").setAttribute("aria-hidden", "false");
  document.body.classList.add("lock");
  panel();
  $("#panel").scrollTop = 0;
}
function closeAll() {
  $$(".ov").forEach(o => { o.classList.remove("open"); o.setAttribute("aria-hidden", "true"); });
  document.body.classList.remove("lock");
  lastFocus?.focus?.();
}
function cartHead() {
  return `<div class="cart-head"><h2>Tu carrito</h2><button class="x" data-close aria-label="Cerrar">×</button></div>`;
}
function panel() {
  const drawer = $("#drawer");
  drawer.classList.remove("pg");
  const ids = Object.keys(cart);
  const t = subtotal();

  if (!ids.length) {
    $("#panel").innerHTML = `${cartHead()}<div class="empty"><span class="ic">🛒</span><h3>Tu carrito está vacío</h3><p>Agrega algunas cositas y vuelve por aquí.</p><button class="btn" data-close>Seguir comprando</button></div>`;
    bumpBadge();
    return;
  }

  const falta = Math.max(CONFIG.freeShippingFrom - t, 0);
  $("#panel").innerHTML = `${cartHead()}
    <div class="bar"><i style="width:${Math.min(t / CONFIG.freeShippingFrom * 100, 100)}%"></i></div>
    <p class="shipmsg">${falta ? `Te faltan <b>${money(falta)}</b> para el envío GRATIS 🚚` : `🎉 ¡Tienes envío GRATIS!`}</p>
    ${ids.map(i => {
      const p = byId(i);
      return `<div class="row"><img src="${p.imgs[0]}" alt="" onerror="imgFallback(this,${p.id})">
        <div class="nm">${esc(p.n)}<br><small>${money(p.p)} c/u</small><br><button class="rm" data-remove="${p.id}">Quitar</button></div>
        <div class="rq"><div class="q"><button data-qty="${p.id}" data-d="-1" aria-label="Quitar uno">−</button><b>${cart[i]}</b><button data-qty="${p.id}" data-d="1" aria-label="Agregar uno">+</button></div></div>
        <b style="font-size:13px">${money(p.p * cart[i])}</b></div>`;
    }).join("")}
    <div class="tot"><span>Subtotal</span><b>${money(t)}</b></div>
    <div class="tot"><span>Envío <small class="dl">${shipLabel()}</small></span><b>${shipping() ? money(shipping()) : "GRATIS"}</b></div>
    <div class="tot big"><span>Total</span><b>${money(grandTotal())}</b></div>
    <button class="btn" data-checkout style="margin-top:12px">Ir a pagar 🔒</button>
    <button class="btn g" data-close style="margin-top:8px">Seguir comprando</button>
    <button class="copy" data-clear style="margin:12px auto 0;display:flex;border:0;background:none;color:#b0522f">Vaciar carrito</button>`;
  bumpBadge();
}

/* ---------- pasos de compra ---------- */
const STEPS = ["Datos", "Pago", "Listo"];
function header(step, back = "close") {
  $("#drawer").classList.add("pg");
  return `<div class="ckh">
    <div class="t"><button class="bk" data-back="${back}" aria-label="Volver">←</button><img src="imagenes/logo.png" alt=""><span class="secure">🔒 Compra segura</span></div>
    <div class="sp3">${STEPS.map((x, i) => `<div class="${i + 1 <= step ? "on" : ""}"><i>${i + 1 < step ? "✓" : i + 1}</i>${x}</div>`).join("<hr>")}</div>
  </div>`;
}

function refreshTotals() {
  const s = shipping(), g = grandTotal();
  $$("[data-ship]").forEach(el => el.textContent = s ? money(s) : "GRATIS");
  $$("[data-ship-label]").forEach(el => el.textContent = shipLabel());
  $$("[data-total]").forEach(el => el.textContent = money(g));
  const pay = $("#payBtn");
  if (pay) pay.textContent = "Pagar " + money(g);
}

function checkout() {
  if (!cartCount()) return;
  $("#drawer").classList.add("open", "pg");
  $("#drawer").setAttribute("aria-hidden", "false");
  document.body.classList.add("lock");
  $("#panel").innerHTML = header(1, "cart") + `
    <form id="fData" class="cw" novalidate>
      <div class="cd">
        <h3>📍 ¿Dónde te lo enviamos?</h3>
        <label class="fl"><span>👤 Nombre completo</span><input class="f" name="nombre" value="${esc(draft.nombre || "")}" autocomplete="name" placeholder="Nombres y apellidos"></label>
        <div class="two">
          <label class="fl"><span>🪪 DNI</span><input class="f" name="dni" value="${esc(draft.dni || "")}" inputmode="numeric" maxlength="8" placeholder="8 dígitos"></label>
          <label class="fl"><span>📱 Celular</span><input class="f" name="cel" value="${esc(draft.cel || "")}" inputmode="numeric" maxlength="9" placeholder="9 dígitos"></label>
        </div>
        <label class="fl"><span>🏠 Dirección</span><input class="f" name="dir" value="${esc(draft.dir || "")}" autocomplete="street-address" placeholder="Calle, número, urbanización"></label>
        <div class="two">
          <label class="fl"><span>📌 Distrito</span>
            <select class="f" name="dis" required>
              ${districts.map(d => `<option value="${d}" ${district() === d ? "selected" : ""}>${d} · envío ${money(CONFIG.shipping[d])}</option>`).join("")}
            </select>
          </label>
          <label class="fl"><span>🧭 Referencia (opcional)</span><input class="f" name="ref" value="${esc(draft.ref || "")}" placeholder="Ej. frente al parque"></label>
        </div>
        <p class="hint">🚚 Envío: <b>Nuevo Chimbote ${money(CONFIG.shipping["Nuevo Chimbote"])}</b> · <b>Chimbote ${money(CONFIG.shipping["Chimbote"])}</b> · gratis desde ${money(CONFIG.freeShippingFrom)}.</p>
        <p class="hint">🔒 Usamos tus datos solo para coordinar la entrega.</p>
      </div>
      <div class="cd">
        <h3>🛍️ Resumen (${cartCount()} ${cartCount() === 1 ? "producto" : "productos"})</h3>
        <div class="tot"><span>Subtotal</span><b>${money(subtotal())}</b></div>
        <div class="tot"><span>Envío <small class="dl" data-ship-label>${shipLabel()}</small></span><b data-ship>${shipping() ? money(shipping()) : "GRATIS"}</b></div>
        <div class="tot big"><span>Total</span><b data-total>${money(grandTotal())}</b></div>
      </div>
      <div class="pbar"><div><small>Total a pagar</small><b data-total>${money(grandTotal())}</b></div><button class="btn" type="submit">Continuar →</button></div>
    </form>`;
  $("#fData").addEventListener("submit", submitData);
  $("#fData").elements.dis.addEventListener("change", e => {
    draft.dis = e.target.value;
    write("mk_draft", draft);
    refreshTotals();
  });
  $$("#fData input, #fData select, #fData textarea").forEach(i => {
    const clear = () => { i.classList.remove("bad"); i.parentElement.querySelector(".er")?.remove(); };
    i.addEventListener("input", clear);
    i.addEventListener("change", clear);
  });
  $("#panel").scrollTop = 0;
}

function submitData(e) {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.target));
  const errors = {};
  if (f.nombre.trim().length < 3) errors.nombre = "Escribe tu nombre completo";
  if (!/^\d{8}$/.test(f.dni)) errors.dni = "El DNI debe tener 8 números";
  if (!/^9\d{8}$/.test(f.cel)) errors.cel = "El celular debe tener 9 números y empezar con 9";
  if (f.dir.trim().length < 5) errors.dir = "Escribe tu dirección";
  if (!f.dis) errors.dis = "Elige tu distrito";

  $$("#fData .er").forEach(x => x.remove());
  $$("#fData .bad").forEach(x => x.classList.remove("bad"));
  if (Object.keys(errors).length) {
    for (const k in errors) {
      const i = e.target.elements[k];
      i.classList.add("bad");
      i.insertAdjacentHTML("afterend", `<small class="er">${errors[k]}</small>`);
    }
    const first = e.target.elements[Object.keys(errors)[0]];
    first.scrollIntoView({ block: "center", behavior: "smooth" });
    first.focus({ preventScroll: true });
    toast("⚠️ Revisa los datos marcados");
    return;
  }
  draft = { ...f };
  write("mk_draft", draft);
  payStep();
}

function payStep() {
  const t = subtotal();
  const methods = [
    { v: "Yape", ico: "💜", t: "Escanea el QR o usa el número", tag: "Recomendado" },
    { v: "Plin", ico: "💙", t: "Escanea el QR o usa el número", tag: "Recomendado" },
    { v: "Tarjeta", ico: "💳", t: CONFIG.cardUrl ? "Crédito o débito" : "Próximamente", tag: CONFIG.cardUrl ? "Link seguro" : "Pronto", off: !CONFIG.cardUrl }
  ];
  $("#panel").innerHTML = header(2, "data") + `
    <div class="cw">
      <div class="cd">
        <h3>💳 ¿Cómo quieres pagar?</h3>
        <div class="pm2">${methods.map(m => `<label class="pmo ${m.off ? "off" : ""}"><input type="radio" name="m" value="${m.v}" ${m.v === (draft.m || "Yape") && !m.off ? "checked" : ""} ${m.off ? "disabled" : ""}><span class="ico">${m.ico}</span><span><b>${m.v}</b><small>${m.t}</small></span><span class="tag ${m.off ? "soon" : ""}">${m.tag}</span></label>`).join("")}</div>
        <p class="hint">🔒 Pagas antes del envío. No es contraentrega. Tu pedido se prepara al confirmar el pago.</p>
      </div>
      <div class="cd">
        <h3>🛍️ Tu pedido</h3>
        ${Object.entries(cart).map(([i, q]) => { const p = byId(i); return `<div class="row"><img src="${p.imgs[0]}" alt="" onerror="imgFallback(this,${p.id})"><div class="nm">${esc(p.n)}<br><small>${q} × ${money(p.p)}</small></div><b style="font-size:13px">${money(p.p * q)}</b></div>`; }).join("")}
        <div class="tot"><span>Subtotal</span><b>${money(t)}</b></div>
        <div class="tot"><span>Envío <small class="dl">${shipLabel()}</small></span><b>${shipping() ? money(shipping()) : "GRATIS 🎉"}</b></div>
        <div class="tot big"><span>Total</span><b>${money(grandTotal())}</b></div>
        <p class="hint" style="margin:10px 0 0">📦 Enviamos a <b>${esc(draft.dir)}, ${esc(draft.dis)}</b>.</p>
      </div>
      <div class="pbar"><div><small>Total a pagar</small><b>${money(grandTotal())}</b></div><button class="btn" id="payBtn">Pagar ${money(grandTotal())}</button></div>
    </div>`;
  $("#payBtn").addEventListener("click", () => {
    const m = $("#panel input[name=m]:checked")?.value || "Yape";
    draft.m = m;
    write("mk_draft", draft);
    createOrder(m);
  });
  $("#panel").scrollTop = 0;
}

function newCode() {
  const abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += abc[Math.floor(Math.random() * abc.length)];
  return "MK-" + s;
}

async function createOrder(metodo) {
  const items = Object.entries(cart).map(([i, q]) => ({ n: byId(i).n, q, p: byId(i).p }));
  const order = {
    code: newCode(), ...draft, metodo, items,
    subtotal: subtotal(), envio: shipping(), total: grandTotal(),
    estado: "pendiente_pago", fecha: new Date().toISOString()
  };
  const btn = $("#payBtn");
  if (btn) { btn.disabled = true; btn.textContent = "Creando pedido…"; }

  if (CONFIG.supabaseUrl && metodo !== "Tarjeta") {
    try {
      const r = await rpc("crear_pedido", { p: { nombre: order.nombre, dni: order.dni, cel: order.cel, dir: order.dir, dis: order.dis, metodo, items: items.map(x => ({ n: x.n, q: x.q })) } });
      if (r?.codigo) order.code = r.codigo;
      if (typeof r?.total === "number") order.total = r.total;
    } catch (x) {
      alert("No se pudo registrar el pedido: " + x.message);
      if (btn) { btn.disabled = false; btn.textContent = "Pagar " + money(grandTotal()); }
      return;
    }
  }

  orders[order.code] = order;
  saveOrders();
  cart = {};
  saveCart();

  if (metodo === "Tarjeta") {
    location.href = CONFIG.cardUrl + (CONFIG.cardUrl.includes("?") ? "&" : "?") + "ref=" + encodeURIComponent(order.code);
    return;
  }
  payView(order.code);
}

/* ---------- vista de pago ---------- */
function qrSVG(text) {
  try {
    const qr = qrcode(0, "M");
    qr.addData(text);
    qr.make();
    return qr.createSvgTag({ cellSize: 5, margin: 1, scalable: true });
  } catch (e) {
    return "";
  }
}

function payView(code) {
  const o = orders[code];
  if (!o) return track();
  const isPlin = o.metodo === "Plin";
  const num = isPlin ? CONFIG.plin : CONFIG.yape;
  const qrImg = isPlin ? CONFIG.qrPlin : CONFIG.qrYape;
  const color = isPlin ? "#1e88e5" : "#7b2cbf";

  $("#panel").innerHTML = header(2, "close") + `
    <div class="cw">
      <div class="amt" style="background:linear-gradient(135deg,${color},#e8267a)">
        <small>Paga exactamente</small>
        <b>${money(o.total)}</b>
        <span>con ${o.metodo} · Pedido <u data-copy="${esc(o.code)}" title="Copiar código">${o.code}</u></span>
      </div>
      <p class="hint" style="margin:0 0 2px">📦 Envío a <b>${esc(o.dir)}, ${esc(o.dis)}</b> · ${o.envio ? money(o.envio) : "GRATIS"}</p>
      <div class="cd" style="text-align:center">
        <div class="qrbox">
          ${qrImg ? `<img src="${qrImg}" alt="QR de ${o.metodo}" onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='block'">` : ""}
          <div style="${qrImg ? "display:none" : ""};width:190px">${qrSVG(num)}</div>
        </div>
        <p style="margin:10px 0 2px;font-weight:700;color:var(--muted)">o ${o.metodo} al número</p>
        <p class="num" data-copy="${num}" title="Copiar número">${num}</p>
        <small style="font-weight:700;color:var(--muted)">${esc(CONFIG.holder)}</small>
        <div style="margin-top:8px"><button class="copy" data-copy="${num}">📋 Copiar número</button></div>
        <p class="hint" style="margin:8px 0 0">El código QR contiene el número de ${o.metodo}.</p>
        <ol class="how">
          <li>Abre <b>${o.metodo}</b> y escanea el QR (o escribe el número).</li>
          <li>Paga <b>${money(o.total)}</b> y coloca <b>${o.code}</b> en el mensaje.</li>
          <li>Sube tu captura aquí abajo para confirmar.</li>
        </ol>
      </div>
      <form class="cd" id="fProof" novalidate>
        <h3>📸 Ya pagué</h3>
        <label class="fl"><span>N.º de operación</span><input class="f" name="op" maxlength="20" placeholder="Ej. 12345678" inputmode="numeric"></label>
        <label class="fl"><span>Captura del pago</span><input class="f" type="file" name="img" accept="image/*"></label>
        <img id="pvw" alt="" style="display:none;width:100%;border-radius:12px;margin-top:8px;max-height:260px;object-fit:contain;background:#faf3ed">
        <button class="btn" style="margin-top:12px" type="submit">Enviar comprobante ✅</button>
        <p class="hint">Si prefieres, también puedes enviarnos el comprobante por WhatsApp.</p>
      </form>
      <button class="btn wa" data-wa-order="${esc(o.code)}">💬 Enviar mi pedido por WhatsApp</button>
      <button class="btn g" data-close>Lo haré después</button>
    </div>`;

  $("#fProof").querySelector("input[type=file]").addEventListener("change", ev => {
    const f = ev.target.files[0], p = $("#pvw");
    if (f) { p.src = URL.createObjectURL(f); p.style.display = "block"; }
  });
  $("#fProof").addEventListener("submit", ev => proof(ev, o.code));
  $("#panel").scrollTop = 0;
}

function shrink(file, cb) {
  const r = new FileReader();
  r.onload = () => {
    const i = new Image();
    i.onload = () => {
      const k = Math.min(1, 900 / i.width);
      const c = document.createElement("canvas");
      c.width = Math.round(i.width * k);
      c.height = Math.round(i.height * k);
      c.getContext("2d").drawImage(i, 0, 0, c.width, c.height);
      cb(c.toDataURL("image/jpeg", .72));
    };
    i.src = r.result;
  };
  r.readAsDataURL(file);
}

function proof(e, code) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const btn = e.target.querySelector(".btn");
  const file = fd.get("img");
  const op = String(fd.get("op") || "").trim();
  if (!/^[A-Za-z0-9-]{4,20}$/.test(op)) { toast("⚠️ Escribe el número de operación"); e.target.elements.op.focus(); return; }
  if (!file || !file.size) { toast("⚠️ Sube la captura del pago"); return; }
  if (file.size > 8 * 1024 * 1024) { toast("⚠️ La imagen no debe pasar de 8 MB"); return; }

  btn.disabled = true;
  btn.textContent = "Enviando…";
  shrink(file, async u => {
    try {
      if (CONFIG.supabaseUrl) await rpc("enviar_comprobante", { p_codigo: code, p_op: op, p_img: u });
    } catch (x) {
      alert("No se pudo enviar el comprobante: " + x.message);
      btn.disabled = false;
      btn.textContent = "Enviar comprobante ✅";
      return;
    }
    const o = orders[code];
    o.op = op;
    o.comp = u;
    o.estado = "por_verificar";
    orders[code] = o;
    saveOrders();
    doneView(code);
  });
}

/* ---------- pedido listo ---------- */
const STATUS = [
  ["pendiente_pago", "Pendiente de pago"],
  ["por_verificar", "Verificando tu pago"],
  ["pagado", "Pago confirmado"],
  ["enviado", "En camino"],
  ["entregado", "Entregado"]
];

async function doneView(code) {
  code = String(code || "").trim().toUpperCase();
  let o = orders[code];

  if (CONFIG.supabaseUrl) {
    try {
      const r = await rpc("ver_pedido", { p_codigo: code });
      if (r) {
        o = {
          ...(o || {}), code, estado: r.estado, metodo: r.metodo, total: r.total,
          items: (r.items || []).map(x => ({ n: x.nombre, q: x.cantidad, p: 0 })),
          subtotal: o?.subtotal ?? r.total, envio: o?.envio ?? 0,
          nombre: o?.nombre || "", dni: o?.dni || "", cel: o?.cel || "", dir: o?.dir || "", dis: o?.dis || ""
        };
        orders[code] = o;
        saveOrders();
      }
    } catch (e) { /* seguimos con los datos locales */ }
  }

  if (!o) {
    track(code);
    $("#panel").insertAdjacentHTML("beforeend", '<p class="warn" style="margin-top:12px">No encontramos ese pedido en este dispositivo. Revisa el código o escríbenos por WhatsApp.</p>');
    return;
  }

  const idx = STATUS.findIndex(x => x[0] === o.estado);
  const bad = o.estado === "rechazado";
  const pending = o.estado === "pendiente_pago";
  $("#panel").innerHTML = header(3, "close") + `
    <div class="cw">
      <div class="cd" style="text-align:center">
        <div class="ok">${bad ? "⚠️" : o.estado === "por_verificar" ? "✅" : "📦"}</div>
        <h2 style="margin:2px 0 4px">${bad ? "Revisemos tu pago" : o.estado === "por_verificar" ? "¡Pedido recibido!" : "Pedido " + esc(o.code)}</h2>
        <p style="margin:0 0 10px;color:var(--muted);font-weight:700">Código <b style="color:var(--ink)">${esc(o.code)}</b> · ${esc(o.metodo)} · <b style="color:var(--ink)">${money(o.total)}</b></p>
        ${bad ? `<p class="warn" style="text-align:left">No pudimos verificar tu pago. Revisa el comprobante o escríbenos por WhatsApp y lo solucionamos.</p>` : `<div class="steps">${STATUS.map((s, k) => `<div class="stp ${k < idx ? "done" : k === idx ? "on" : ""}"><i>${k < idx ? "✓" : k + 1}</i>${s[1]}</div>`).join("")}</div>`}
        <div style="text-align:left;font-size:13px;font-weight:700;color:var(--ink2);margin:10px 0">
          ${(o.items || []).map(x => `${x.q} × ${esc(x.n)}`).join("<br>")}
          ${o.dir ? `<hr style="border:0;border-top:1px solid var(--line);margin:10px 0">Envío a: ${esc(o.dir)}, ${esc(o.dis)}<br>Te contactaremos al ${esc(o.cel)}.` : ""}
        </div>
        ${pending ? `<button class="btn" data-pay="${esc(o.code)}">Pagar ahora</button>` : ""}
        ${bad ? `<button class="btn" data-pay="${esc(o.code)}">Enviar otro comprobante</button>` : ""}
        ${o.nombre ? `<button class="btn wa" style="margin-top:8px" data-wa-order="${esc(o.code)}">💬 Enviar mi pedido por WhatsApp</button>` : ""}
        <button class="btn g" style="margin-top:8px" data-track="${esc(o.code)}">Actualizar estado</button>
        <button class="btn g" style="margin-top:8px" data-close>Seguir comprando</button>
      </div>
      <p class="hint" style="text-align:center">Guarda tu código <b>${esc(o.code)}</b> para consultar el estado.</p>
    </div>`;
  $("#panel").scrollTop = 0;
  if (o.estado === "por_verificar" && !o._confetti) {
    o._confetti = true;
    orders[code] = o;
    saveOrders();
    confetti();
  }
}

function confetti() {
  for (let i = 0; i < 40; i++) {
    const e = document.createElement("i");
    e.className = "cf";
    e.textContent = ["🎉", "✨", "🧡", "💜", "⭐", "🎁"][i % 6];
    e.style.cssText = `left:${Math.random() * 100}vw;animation-delay:${Math.random() * .9}s;font-size:${16 + Math.random() * 18}px`;
    document.body.appendChild(e);
    setTimeout(() => e.remove(), 3800);
  }
}

/* ---------- seguir pedido ---------- */
function track(prefill = "") {
  $("#drawer").classList.remove("pg");
  $("#drawer").classList.add("open");
  $("#drawer").setAttribute("aria-hidden", "false");
  document.body.classList.add("lock");
  $("#panel").innerHTML = `<div class="cart-head"><h2>Seguir mi pedido</h2><button class="x" data-close aria-label="Cerrar">×</button></div>
    <div class="cd"><p style="margin-top:0;font-size:14px;color:var(--ink2)">Escribe el código que te dimos al comprar. Ejemplo: <b>MK-A1B2C3</b></p>
      <form id="fTrack"><label class="fl"><span>Código de pedido</span><input class="f" name="c" value="${esc(prefill)}" placeholder="MK-XXXXXX" style="text-transform:uppercase" autocomplete="off"></label>
      <button class="btn" style="margin-top:12px">Buscar pedido</button></form></div>`;
  $("#fTrack").addEventListener("submit", e => { e.preventDefault(); doneView(e.target.elements.c.value.trim().toUpperCase()); });
  $("#fTrack").elements.c.focus();
  $("#panel").scrollTop = 0;
}

/* ---------- producto ---------- */
function openP(id) {
  const p = byId(id);
  if (!p) return;
  lastFocus = document.activeElement;
  $("#mo").classList.add("open");
  $("#mo").setAttribute("aria-hidden", "false");
  document.body.classList.add("lock");
  $("#modal").innerHTML = `<div class="pm">
    <div class="pm-head"><span class="bd">-${p.pct}%</span><button class="x" data-close aria-label="Cerrar">×</button><img id="big" src="${p.imgs[0]}" alt="${esc(p.n)}" onerror="imgFallback(this,${p.id})"></div>
    <h3>${esc(p.n)}</h3>
    <span class="st" style="color:var(--muted);font-weight:800;font-size:12.5px"><b style="color:#f5a300">★</b> ${p.r} · ${p.sold} vendidos · ${esc(p.c)}</span>
    <div class="pr" style="display:flex;align-items:baseline;gap:8px;margin-top:8px;color:var(--od);font:800 30px var(--ff)">${money(p.p)} <span class="old" style="font:600 15px var(--fb);color:#b39a89">${money(p.old)}</span></div>
    <p class="desc">${esc(p.d)}</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:12px;font-weight:800">
      <span style="background:#e9f8ef;color:#1d7a3e;border-radius:99px;padding:5px 10px">✓ Disponible</span>
      <span style="background:#fff3e8;color:var(--od);border-radius:99px;padding:5px 10px">🚚 Envío ${CONFIG.deliveryTime}</span>
      <span style="background:#eef5ff;color:#14539a;border-radius:99px;padding:5px 10px">🔒 Pago seguro</span>
    </div>
    <div class="buy">
      <div class="qbig"><button data-mq="-1" aria-label="Menos">−</button><b id="mq">1</b><button data-mq="1" aria-label="Más">+</button></div>
      <button class="btn" id="addBtn">Agregar al carrito 🛒</button>
    </div>
    <button class="btn g" style="margin-top:8px" id="buyNow">Comprar ahora</button>
    <p class="hint" style="text-align:center">Envío gratis desde ${money(CONFIG.freeShippingFrom)} · Paga con Yape o Plin.</p>
  </div>`;
  let q = 1;
  $$("#modal [data-mq]").forEach(b => b.addEventListener("click", () => { q = Math.max(1, q + Number(b.dataset.mq)); $("#mq").textContent = q; }));
  $("#addBtn").addEventListener("click", () => { add(p.id, q); closeAll(); openCart(); });
  $("#buyNow").addEventListener("click", () => { add(p.id, q); closeAll(); checkout(); });
}

/* ---------- WhatsApp ---------- */
function orderMessage(code) {
  const o = orders[code];
  if (!o) return "";
  const lines = [
    `Hola Mil Kositas 👋, te envío mi pedido ${o.code}.`,
    "",
    "*Detalle:*",
    ...o.items.map(x => `• ${x.q} × ${x.n}${x.p ? " — " + money(x.p * x.q) : ""}`),
    "",
    `Subtotal: ${money(o.subtotal ?? o.total)}`,
    `Envío: ${o.envio ? money(o.envio) : "GRATIS"}`,
    `*Total: ${money(o.total)}*`,
    "",
    `Pago: ${o.metodo}`,
    `Nombre: ${o.nombre}`,
    `DNI: ${o.dni}`,
    `Celular: ${o.cel}`,
    `Dirección: ${o.dir}${o.ref ? " (" + o.ref + ")" : ""}`,
    `Distrito: ${o.dis}`,
    o.op ? `N.º de operación: ${o.op}` : ""
  ].filter(Boolean);
  return lines.join("\n");
}
function openWA(code) {
  const o = orders[code];
  if (!o) return;
  location.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(orderMessage(code))}`;
}

/* ---------- créditos / cómo pagar ---------- */
function credits() {
  openInfo("Créditos de las fotos", `<p class="hint" style="margin-top:0">Las fotos de los productos provienen de bancos de imágenes con licencias libres (principalmente Wikimedia Commons, vía Openverse) y se usan como referencia ilustrativa. Los nombres de autores y licencias están en <a href="creditos.html" target="_blank" rel="noopener" style="color:var(--od);font-weight:800">creditos.html</a>.</p>`);
}
function howPay() {
  openInfo("Cómo pagar", `
    <div class="cd" style="margin-bottom:10px"><h3>💜 Yape / 💙 Plin</h3><ol class="how" style="margin:0"><li>Elige Yape o Plin al pagar.</li><li>Escanea el QR o copia el número.</li><li>Paga el monto exacto y coloca tu código de pedido en el mensaje.</li><li>Sube la captura para confirmar tu pago.</li></ol></div>
    <div class="cd"><h3>💳 Tarjeta</h3><p class="hint" style="margin:0">${CONFIG.cardUrl ? "Al elegir tarjeta te llevaremos a la pasarela de pago segura." : "Estamos habilitando el pago con tarjeta. Por ahora usa Yape o Plin."}</p></div>`);
}
function openInfo(title, html) {
  lastFocus = document.activeElement;
  $("#mo").classList.add("open");
  $("#mo").setAttribute("aria-hidden", "false");
  document.body.classList.add("lock");
  $("#modal").innerHTML = `<div class="pm"><div style="display:flex;align-items:center;gap:10px"><h3 style="margin:0">${title}</h3><button class="x" data-close style="margin-left:auto;border:0;background:#f6ece4;width:36px;height:36px;border-radius:50%;font-size:19px">×</button></div>${html}</div>`;
}

/* ---------- supabase (opcional) ---------- */
function rpc(fn, args) {
  return fetch(CONFIG.supabaseUrl + "/rest/v1/rpc/" + fn, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: CONFIG.supabaseKey, Authorization: "Bearer " + CONFIG.supabaseKey },
    body: JSON.stringify(args)
  }).then(async r => {
    const d = await r.json().catch(() => null);
    if (!r.ok) throw new Error(d?.message || "Error de conexión");
    return d;
  });
}

/* ---------- eventos ---------- */
function goCat(c) {
  cat = c;
  query = "";
  $("#q").value = "";
  $("#clearq").classList.remove("on");
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", async e => {
  const t = e.target;
  const addBtn = t.closest("[data-add]");
  if (addBtn) { e.stopPropagation(); add(addBtn.dataset.add); return; }

  const openEl = t.closest("[data-open]");
  if (openEl && !t.closest("[data-add]")) { openP(openEl.dataset.open); return; }

  const catBtn = t.closest("[data-cat]");
  if (catBtn) { goCat(catBtn.dataset.cat); return; }

  const go = t.closest("[data-go]");
  if (go) { e.preventDefault(); goCat(go.dataset.go); return; }

  const s = t.closest("[data-search]");
  if (s) { $("#q").value = s.dataset.search; query = s.dataset.search; cat = "Todas"; $("#clearq").classList.add("on"); render(); return; }

  const sl = t.closest("[data-slide]");
  if (sl) { clearInterval(heroTimer); showSlide(slide + Number(sl.dataset.slide)); startHero(); return; }
  const dot = t.closest("[data-dot]");
  if (dot) { clearInterval(heroTimer); showSlide(Number(dot.dataset.dot)); startHero(); return; }

  if (t.closest("[data-close]")) { closeAll(); return; }

  const back = t.closest("[data-back]");
  if (back) {
    if (back.dataset.back === "cart") panel();
    else if (back.dataset.back === "data") checkout();
    else if (back.dataset.back === "pay") payStep();
    else closeAll();
    return;
  }

  const qty = t.closest("[data-qty]");
  if (qty) { setQty(qty.dataset.qty, Number(qty.dataset.d)); return; }
  const rem = t.closest("[data-remove]");
  if (rem) { removeItem(rem.dataset.remove); return; }
  if (t.closest("[data-clear]")) {
    if (confirm("¿Vaciar el carrito?")) { cart = {}; saveCart(); panel(); toast("Carrito vaciado"); }
    return;
  }
  if (t.closest("[data-checkout]")) { checkout(); return; }

  const copy = t.closest("[data-copy]");
  if (copy) {
    const txt = copy.dataset.copy;
    try { await navigator.clipboard.writeText(txt); toast("📋 Copiado: " + txt); }
    catch { toast("Copia manualmente: " + txt); }
    return;
  }

  const pay = t.closest("[data-pay]");
  if (pay) { payView(pay.dataset.pay); return; }

  const tr = t.closest("[data-track]");
  if (tr) { doneView(tr.dataset.track); return; }

  const wa = t.closest("[data-wa-order]");
  if (wa) { openWA(wa.dataset.waOrder); return; }
});

/* cerrar overlays */
$("#drawer").addEventListener("click", e => { if (e.target.id === "drawer") closeAll(); });
$("#mo").addEventListener("click", e => { if (e.target.id === "mo") closeAll(); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeAll();
  if ((e.key === "Enter" || e.key === " ") && document.activeElement?.dataset?.open) {
    e.preventDefault();
    openP(document.activeElement.dataset.open);
  }
});

/* buscador */
let searchT = null;
$("#q").addEventListener("input", e => {
  query = e.target.value;
  $("#clearq").classList.toggle("on", !!query);
  clearTimeout(searchT);
  searchT = setTimeout(() => { cat = "Todas"; render(); }, 160);
});
$("#clearq").addEventListener("click", () => { query = ""; $("#q").value = ""; $("#clearq").classList.remove("on"); render(); $("#q").focus(); });
$("#cartbtn").addEventListener("click", openCart);
$("#homeLink").addEventListener("click", e => { e.preventDefault(); goCat("Todas"); });
$("#trackLink").addEventListener("click", e => { e.preventDefault(); track(); });
$("#waFoot").addEventListener("click", e => { e.preventDefault(); location.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Hola Mil Kositas, tengo una consulta")}`; });
$("#creditsLink").addEventListener("click", e => { e.preventDefault(); credits(); });
$("#howLink").addEventListener("click", e => { e.preventDefault(); howPay(); });

/* inicio */
$("#wa").href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Hola Mil Kositas, tengo una consulta")}`;
$("#fy").textContent = `${CONFIG.yape} (Yape) · ${CONFIG.plin} (Plin)`;
$("#fw").textContent = "+" + CONFIG.whatsapp;
$("#year").textContent = new Date().getFullYear();

renderHero();
render();
bumpBadge();
