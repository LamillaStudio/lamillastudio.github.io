function clave(estado) {
  return (estado || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().trim().replace(/\s+/g, '-');
}

function pintarJuegos(lista) {
  const cont = document.getElementById('lista-juegos');
  cont.replaceChildren();
  lista.forEach(j => {
    const art = el('article', 'juego');
    art.dataset.estado = clave(j.estado);

    const img = el('div', 'juego__img');
    if (j.imagen) img.style.backgroundImage = `url("${encodeURI(j.imagen)}")`;
    img.append(el('span', 'juego__estado', j.estado));

    const cuerpo = el('div', 'juego__cuerpo');
    cuerpo.append(el('h3', null, j.titulo), el('p', null, j.descripcion), el('p', 'juego__modo', j.modo));
    // El botón aparece solo en juegos "Disponible" que tengan enlace
    const destino = urlSegura(j.enlace);
    if (clave(j.estado) === 'disponible' && destino) {
      const a = el('a', 'btn btn--chico', j.texto_boton || 'Jugar ahora');
      a.href = destino;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      cuerpo.append(a);
    }
    art.append(img, cuerpo);
    cont.append(art);
  });
}

function pintarNovedades(lista) {
  const cont = document.getElementById('lista-novedades');
  cont.replaceChildren();
  lista.forEach(n => {
    const item = el('article', 'novedad');
    const cuerpo = el('div');
    cuerpo.append(el('h3', null, n.titulo), el('p', null, n.texto));
    item.append(el('div', 'novedad__fecha', n.fecha), cuerpo);
    cont.append(item);
  });
}
