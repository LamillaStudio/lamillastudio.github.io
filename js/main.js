document.getElementById('anio').textContent = new Date().getFullYear();

const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('menu');
toggle.addEventListener('click', () => {
  const abierto = menu.classList.toggle('abierto');
  toggle.setAttribute('aria-expanded', abierto);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') { menu.classList.remove('abierto'); toggle.setAttribute('aria-expanded', false); }
});

Promise.all([
  cargarJSON('data/carrusel.json'),
  cargarJSON('data/juegos.json'),
  cargarJSON('data/novedades.json')
]).then(([carrusel, juegos, novedades]) => {
  iniciarCarrusel(carrusel.slides);
  pintarJuegos(juegos.juegos);
  pintarNovedades(novedades.novedades);
}).catch(() => {
  document.getElementById('lista-juegos').textContent =
    'No se pudo cargar el contenido. Si abriste el archivo directamente, usa un servidor local (por ejemplo, Live Server en VS Code).';
});

iniciarContacto();
