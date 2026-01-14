document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const contenido = document.getElementById("contenido");

  async function cargarPagina(pagina) {
    contenido.innerHTML = "<p class='cargando'>Cargando contenido...</p>";
    try {
      const respuesta = await fetch("./contenido/" + pagina);
      if (!respuesta.ok) throw new Error("HTTP " + respuesta.status);
      const html = await respuesta.text();
      contenido.innerHTML = html;
    } catch (error) {
      console.error("Error al cargar contenido:", error);
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

  // Cargar resumen al inicio
  cargarPagina("resumen.html");
});

