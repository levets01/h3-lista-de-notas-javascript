//aca esyoy declando las variables para el input, el boton y la lista de notas
let input = document.getElementById("notaInput");
let botonAgregar = document.getElementById("btnAgregar");
let listaNotas = document.getElementById("listaNotas");

// Array donde se guardan las notas
let notas = [];

// Buscar notas en localStorage
let notasGuardadas = localStorage.getItem("notas");

// Si existen notas guardadas
if (notasGuardadas != null) {
  // Convertir texto JSON a array
  notas = JSON.parse(notasGuardadas);

  // Recorrer array
  for (let i = 0; i < notas.length; i++) {
    crearNota(notas[i]);
  }
}

botonAgregar.addEventListener("click", agregarNota);

function agregarNota() {
  // Obtener texto del input
  let texto = input.value;

  // Eliminar espacios
  texto = texto.trim();

  // Validar si está vacío
  if (texto == "") {
    alert("Por favor escribe una nota");

    return;
  }

  // Guardar en array
  notas.push(texto);

  // Guardar en localStorage
  localStorage.setItem("notas", JSON.stringify(notas));

  // Mostrar nota en pantalla
  crearNota(texto);

  // Limpiar input
  input.value = "";

  input.focus();
}

function crearNota(texto) {
  // Aca se crea la li
  let li = document.createElement("li");

  let span = document.createElement("span");

  span.textContent = texto;

  let botonEliminar = document.createElement("button");

  botonEliminar.textContent = "Eliminar";
  li.appendChild(span);
  //aca esta parte se agrega el boton eliminar a la lista de notas
  li.appendChild(botonEliminar);

  listaNotas.appendChild(li);

  botonEliminar.addEventListener("click", function () {
    // Eliminar elemento visual
    listaNotas.removeChild(li);

    // Nuevo array vacío
    let nuevasNotas = [];

    // Recorrer notas
    for (let i = 0; i < notas.length; i++) {
      // Guardar solo notas diferentes
      if (notas[i] != texto) {
        nuevasNotas.push(notas[i]);
      }
    }

    // Reemplazar array original
    notas = nuevasNotas;

    // Actualizar localStorage
    localStorage.setItem("notas", JSON.stringify(notas));
  });
}
