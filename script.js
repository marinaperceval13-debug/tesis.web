document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const contenido = document.getElementById("contenido");

  async function cargarPagina(pagina) {
    contenido.innerHTML = "<p class='cargando'>Cargando...</p>";
    try {
      const respuesta = await fetch("contenido/" + pagina);
      const html = await respuesta.text();
      contenido.innerHTML = html;
    } catch {
      contenido.innerHTML = "<p>Error al cargar el contenido.</p>";
    }
  }

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      cargarPagina(link.dataset.page);
    });
  });

  // Cargar la primera por defecto
  cargarPagina("resumen.html");
});
