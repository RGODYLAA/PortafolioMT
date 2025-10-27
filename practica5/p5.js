document.getElementById("nivel").addEventListener("input", function() {
  document.getElementById("nivelValor").textContent = this.value;
});

function agregarFila() {
  var nombre = document.getElementById("nombre").value.trim();
  var correo = document.getElementById("correo").value.trim();
  var cita = document.getElementById("cita").value;
  var color = document.getElementById("colorFav").value;
  var nivel = document.getElementById("nivel").value;

  let intereses = [];
  document.querySelectorAll('input[name="intereses"]:checked').forEach(c => intereses.push(c.value));

  let turno = "";
  let radio = document.querySelector('input[name="turno"]:checked');
  if (radio) turno = radio.value;


  let errores = [];
  if (nombre == "") errores.push("Nombre vacío");
  if (correo == "") errores.push("Correo vacío");
  if (intereses.length == 0) errores.push("Seleccione un interés");
  if (turno == "") errores.push("Seleccione un turno");
  if (cita == "") errores.push("Fecha vacía");
  if (color == "") errores.push("Color vacío");

  let erroresDiv = document.getElementById("errores");
  if (errores.length > 0) {
    erroresDiv.innerHTML = errores.join("<br>");
    return;
  } else {
    erroresDiv.innerHTML = "";
  }

  
  let tabla = document.getElementById("tablaDatos").getElementsByTagName("tbody")[0];
  let fila = tabla.insertRow();

  fila.insertCell().textContent = nombre;
  fila.insertCell().textContent = correo;
  fila.insertCell().textContent = intereses.join(", ");
  fila.insertCell().textContent = turno;
  fila.insertCell().textContent = cita;
  fila.insertCell().textContent = color;
  fila.insertCell().textContent = nivel;

  
  document.getElementById("miFormulario").reset();
  document.getElementById("nivelValor").textContent = 5;
}
