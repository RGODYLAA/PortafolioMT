

const $ = (sel) => document.querySelector(sel);

const categoryEl = $("#category");
const fromUnitEl = $("#fromUnit");
const toUnitEl   = $("#toUnit");
const fromValueEl= $("#fromValue");
const toValueEl  = $("#toValue");
const convertBtn = $("#convertBtn");
const swapBtn    = $("#swapBtn");
const resultEl   = $("#result");

// Opciones por categoría
const UNITS = {
  temperature: ["Celsius","Fahrenheit","Kelvin"],
  distance: ["metros","kilometros","millas","pies","pulgadas"],
  time: ["años","días","horas","segundos"],
  currency: ["MXN","USD","EUR"]
};

// Factores base (distancia en metros)
const DIST_TO_M = {
  metros: 1,
  kilometros: 1000,
  millas: 1609.344,
  pies: 0.3048,
  pulgadas: 0.0254
};

// Factores base (tiempo en segundos). 1 año = 365 días
const TIME_TO_S = {
  años: 365 * 24 * 3600,
  días: 24 * 3600,
  horas: 3600,
  segundos: 1
};


const FX = {

  USD: 1.0,
  EUR: 0.9,  // 1 USD = 0.9 EUR (aprox. de ejemplo)
  MXN: 18.0  // 1 USD = 18.0 MXN (ejemplo)
};

// ================== Utilidades ==================
function populateUnits(category){
  const list = UNITS[category] || [];
  fromUnitEl.innerHTML = "";
  toUnitEl.innerHTML = "";

  list.forEach(u => {
    const opt1 = document.createElement("option");
    opt1.value = u; opt1.textContent = u;
    fromUnitEl.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = u; opt2.textContent = u;
    toUnitEl.appendChild(opt2);
  });

  // Selecciones por defecto distintas
  if (toUnitEl.options.length > 1) {
    toUnitEl.selectedIndex = 1;
  }
}

function roundSmart(x){
  if (!isFinite(x)) return "";
  // menos ruido visual
  if (Math.abs(x) >= 1) return Number(x.toFixed(4));
  return Number(x.toPrecision(6));
}

// ================== Conversiones ==================
// Temperatura
function tempToC(value, unit){
  if (unit === "Celsius")    return value;
  if (unit === "Fahrenheit") return (value - 32) * (5/9);
  if (unit === "Kelvin")     return value - 273.15;
  return value;
}
function cToTemp(c, unit){
  if (unit === "Celsius")    return c;
  if (unit === "Fahrenheit") return c * (9/5) + 32;
  if (unit === "Kelvin")     return c + 273.15;
  return c;
}

function convertDistance(value, from, to){
  const meters = value * DIST_TO_M[from];
  return meters / DIST_TO_M[to];
}

function convertTime(value, from, to){
  const seconds = value * TIME_TO_S[from];
  return seconds / TIME_TO_S[to];
}

function convertCurrency(value, from, to){
  // Pasamos por USD como base
  if (!(from in FX) || !(to in FX)) return NaN;
  const usd = (from === "USD") ? value : (value / FX[from]);
  return (to === "USD") ? usd : (usd * FX[to]);
}

function convert(){
  const category = categoryEl.value;
  const fromUnit = fromUnitEl.value;
  const toUnit   = toUnitEl.value;
  const raw = fromValueEl.value;

  if (raw === "" || isNaN(Number(raw))) {
    toValueEl.value = "";
    resultEl.textContent = "Ingresa un número válido.";
    return;
  }
  const value = Number(raw);

  let out = NaN;

  if (category === "temperature"){
    const c = tempToC(value, fromUnit);
    out = cToTemp(c, toUnit);
  } else if (category === "distance"){
    out = convertDistance(value, fromUnit, toUnit);
  } else if (category === "time"){
    out = convertTime(value, fromUnit, toUnit);
  } else if (category === "currency"){
    out = convertCurrency(value, fromUnit, toUnit);
  }

  const rounded = roundSmart(out);
  toValueEl.value = rounded;
  resultEl.textContent = `${value} ${fromUnit} = ${rounded} ${toUnit}`;
}

// ================== Eventos ==================
categoryEl.addEventListener("change", () => {
  populateUnits(categoryEl.value);
  toValueEl.value = "";
  resultEl.textContent = "";
});

convertBtn.addEventListener("click", convert);

// Enter también convierte
[fromValueEl, fromUnitEl, toUnitEl].forEach(el => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") convert();
  });
});

// Intercambiar unidades 
swapBtn.addEventListener("click", () => {
  const tmp = fromUnitEl.value;
  fromUnitEl.value = toUnitEl.value;
  toUnitEl.value = tmp;
  convert();
});

// Inicializar
populateUnits(categoryEl.value);
