function iniciarCarrusel(slides) {
  const cont = document.getElementById('inicio');
  const pista = cont.querySelector('.carrusel__pista');
  const puntos = cont.querySelector('.carrusel__puntos');
  const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let actual = 0, timer;

  pista.replaceChildren();
  puntos.replaceChildren();

  slides.forEach((s, i) => {
    const art = el('article', 'slide');
    if (s.imagen) art.style.backgroundImage = `url("${encodeURI(s.imagen)}")`;
    const texto = el('div', 'slide__texto');
    if (s.etiqueta) texto.append(el('span', 'slide__etiqueta', s.etiqueta));
    texto.append(el('h2', null, s.titulo), el('p', null, s.texto));
    if (s.boton_texto) {
      const a = el('a', 'btn', s.boton_texto);
      a.href = s.boton_enlace || '#juegos';
      texto.append(a);
    }
    art.append(texto);
    pista.append(art);

    const p = el('button', 'punto');
    p.setAttribute('aria-label', 'Ir a la diapositiva ' + (i + 1));
    p.addEventListener('click', () => { ir(i); reiniciar(); });
    puntos.append(p);
  });

  function ir(n) {
    actual = (n + slides.length) % slides.length;
    pista.style.transform = `translateX(-${actual * 100}%)`;
    puntos.querySelectorAll('.punto').forEach((p, i) =>
      p.setAttribute('aria-current', i === actual));
  }
  function reiniciar() {
    clearInterval(timer);
    if (!reducir && slides.length > 1) timer = setInterval(() => ir(actual + 1), 6000);
  }

  cont.querySelector('.carrusel__flecha--ant').addEventListener('click', () => { ir(actual - 1); reiniciar(); });
  cont.querySelector('.carrusel__flecha--sig').addEventListener('click', () => { ir(actual + 1); reiniciar(); });
  cont.addEventListener('mouseenter', () => clearInterval(timer));
  cont.addEventListener('mouseleave', reiniciar);
  cont.addEventListener('focusin', () => clearInterval(timer));
  cont.addEventListener('focusout', reiniciar);

  ir(0);
  reiniciar();
}
