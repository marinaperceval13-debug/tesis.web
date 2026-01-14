document.addEventListener("DOMContentLoaded", () => {
  // === SISTEMA DE CONTRASEÑA ===
  const PASSWORD_HASH = "abb634e86d43122098486bcea800a3da"; // Hash de 'bat2026'

  let pass = prompt("Introduce la contraseña para acceder:");

  async function md5(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("MD5", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  md5(pass).then(hash => {
    if (hash !== PASSWORD_HASH) {
      alert("Contraseña incorrecta. Acceso denegado.");
      document.body.innerHTML = "<h1 style='text-align:center;margin-top:20%;color:#facc15;'>Acceso restringido 🔒</h1>";
    } else {
      // === CONTENIDO PRINCIPAL ===
      const links = document.querySelectorAll("nav a");
      const contenido = document.getElementById("contenido");

      async function cargarPagina(pagina) {
        contenido.innerHTML = "<p class='cargando'>Cargando contenido...</p>";
        try {
          const respuesta = await fetch("./content/" + pagina);
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
    }
  });
});


