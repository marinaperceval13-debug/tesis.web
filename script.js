
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const contenido = document.getElementById("contenido");
  const portada = document.querySelector(".portada");

  async function cargarPagina(pagina) {
    contenido.innerHTML = "<p class='cargando'>Cargando...</p>";
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

      // Ocultar portada con efecto suave
      if (portada) {
        portada.style.transition = "opacity 0.6s ease";
        portada.style.opacity = "0";
        setTimeout(() => (portada.style.display = "none"), 600);
      }

      // Actualizar enlace activo
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      cargarPagina(link.dataset.page);
    });
  });

  // Cargar la primera pestaña (resumen)
  cargarPagina("resumen.html");
});

document.addEventListener("click", e => {
  if (e.target && e.target.id === "volver-inicio") {
    e.preventDefault();
    const portada = document.querySelector(".portada");
    const contenido = document.getElementById("contenido");
    if (portada) {
      portada.style.display = "block";
      portada.style.opacity = "1";
      contenido.innerHTML = "<p class='cargando'>Cargando contenido...</p>";

      // Restaurar enlace activo al inicio
      document.querySelectorAll("nav a").forEach(l => l.classList.remove("active"));
      document.querySelector("nav a[data-page='resumen.html']")?.classList.add("active");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});
