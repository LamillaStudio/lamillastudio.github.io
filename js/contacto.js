// Crea una cuenta gratis en formspree.io, pon allí helle@lamillastudio.com
// y pega aquí la URL que te den (algo como https://formspree.io/f/abcdwxyz).
const FORMSPREE_URL = 'https://formspree.io/f/xzeedbob';

function iniciarContacto() {
  const form = document.getElementById('form-contacto');
  const estado = document.getElementById('form-estado');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const boton = form.querySelector('button');
    boton.disabled = true;
    estado.textContent = 'Enviando…';
    try {
      const r = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!r.ok) throw new Error();
      form.reset();
      estado.textContent = '¡Mensaje enviado! Te respondemos pronto.';
    } catch {
      estado.textContent = 'No se pudo enviar. Escríbenos a helle@lamillastudio.com';
    }
    boton.disabled = false;
  });
}
