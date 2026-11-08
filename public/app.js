const lista = document.getElementById('l');
const entrada = document.getElementById('t');
const error = document.getElementById('error');
const aviso = document.getElementById('aviso');
const clave = 'itla-practica3-tareas';
let modoLocal = false;
let tareas = [];
async function api(ruta, method = 'GET', body) {
  const r = await fetch(ruta, { method, headers: { 'Content-Type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {}) });
  if (!r.ok) { const datos = await r.json().catch(() => ({})); throw new Error(datos.error || `Error HTTP ${r.status}`); }
  return r.status === 204 ? null : r.json();
}
function guardar() { localStorage.setItem(clave, JSON.stringify(tareas)); }
function dibujar() {
  lista.replaceChildren();
  for (const t of tareas) {
    const li = document.createElement('li');
    const texto = document.createElement('span'); texto.textContent = t.titulo;
    if (t.completada) texto.className = 'hecha';
    const alternar = document.createElement('button'); alternar.textContent = t.completada ? 'Reabrir' : 'Completar';
    const borrar = document.createElement('button'); borrar.textContent = 'Eliminar';
    alternar.onclick = () => modificar(t.id, false);
    borrar.onclick = () => modificar(t.id, true);
    li.append(texto, alternar, borrar); lista.append(li);
  }
}
async function modificar(id, eliminar) {
  error.textContent = '';
  try {
    if (modoLocal) {
      if (eliminar) tareas = tareas.filter(t => t.id !== id);
      else tareas.find(t => t.id === id).completada = !tareas.find(t => t.id === id).completada;
      guardar();
    } else { await api(`/api/tareas/${id}`, eliminar ? 'DELETE' : 'PATCH'); tareas = await api('/api/tareas'); }
    dibujar();
  } catch (e) { error.textContent = e.message; }
}
document.getElementById('f').onsubmit = async e => {
  e.preventDefault(); error.textContent = '';
  const titulo = entrada.value.trim();
  if (!titulo || titulo.length > 120) { error.textContent = 'Escribe entre 1 y 120 caracteres.'; return; }
  try {
    if (modoLocal) { tareas.push({ id: crypto.randomUUID(), titulo, completada: false }); guardar(); }
    else { await api('/api/tareas', 'POST', { titulo }); tareas = await api('/api/tareas'); }
    entrada.value = ''; dibujar();
  } catch (e) { error.textContent = e.message; }
};
async function iniciar() {
  // En github.io se usa almacenamiento local: Pages no aloja Express.
  modoLocal = location.hostname.endsWith('.github.io') || location.protocol === 'file:';
  if (!modoLocal) {
    try { tareas = await api('/api/tareas'); }
    catch { modoLocal = true; }
  }
  if (modoLocal) {
    try { const datos = JSON.parse(localStorage.getItem(clave) || '[]'); tareas = Array.isArray(datos) ? datos.filter(t => t && typeof t.titulo === 'string' && typeof t.completada === 'boolean' && t.id != null) : []; }
    catch { tareas = []; error.textContent = 'No se pudo recuperar el historial local.'; }
    aviso.textContent = 'Modo GitHub Pages / local: tareas guardadas en este navegador.';
  } else aviso.textContent = 'Modo API Express: tareas en memoria del servidor.';
  dibujar();
}
iniciar();
