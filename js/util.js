// Crea un elemento de forma segura (el texto nunca se interpreta como HTML)
function el(etiqueta, clase, texto) {
  const nodo = document.createElement(etiqueta);
  if (clase) nodo.className = clase;
  if (texto != null) nodo.textContent = texto;
  return nodo;
}

async function cargarJSON(ruta) {
  const r = await fetch(ruta);
  if (!r.ok) throw new Error('No se pudo cargar ' + ruta);
  return r.json();
}

// Solo acepta enlaces http(s); evita enlaces peligrosos escritos por error
function urlSegura(texto) {
  try {
    const u = new URL(texto);
    return (u.protocol === 'https:' || u.protocol === 'http:') ? u.href : null;
  } catch { return null; }
}
