// Función para evaluar la calificación según la tabla de equivalencias
function evaluarCalificacion(calificacion) {
    // Validar que la calificación esté en el rango válido [0, 10]
    if (calificacion < 0 || calificacion > 10) {
        return {
            error: true,
            mensaje: "Error: La calificación debe estar entre 0 y 10"
        };
    }
    
    // Evaluar según los rangos establecidos
    let equivalencia = "";
    
    if (calificacion >= 0 && calificacion < 6) {
        equivalencia = "NA";
    } else if (calificacion >= 6 && calificacion < 7.5) {
        equivalencia = "S";
    } else if (calificacion >= 7.5 && calificacion < 9) {
        equivalencia = "B";
    } else if (calificacion >= 9 && calificacion < 10) {
        equivalencia = "MB";
    } else if (calificacion === 10) {
        equivalencia = "LAP";
    }
    
    return {
        error: false,
        equivalencia: equivalencia,
        calificacion: calificacion
    };
}

// Manejar el envío del formulario
document.getElementById('formCalificacion').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener el valor del input
    const inputCalificacion = document.getElementById('calificacion');
    const calificacion = parseFloat(inputCalificacion.value);
    
    // Evaluar la calificación
    const resultado = evaluarCalificacion(calificacion);
    
    // Obtener el elemento párrafo donde se mostrará el resultado
    const parrafoResultado = document.getElementById('resultado');
    
    // Mostrar el resultado
    if (resultado.error) {
        parrafoResultado.textContent = resultado.mensaje;
        parrafoResultado.className = 'error';
    } else {
        parrafoResultado.textContent = `La calificación ${resultado.calificacion} equivale a: ${resultado.equivalencia}`;
        parrafoResultado.className = 'exito';
    }
});

// Limpiar el resultado cuando el usuario cambie el valor del input
document.getElementById('calificacion').addEventListener('input', function() {
    const parrafoResultado = document.getElementById('resultado');
    parrafoResultado.textContent = '';
    parrafoResultado.className = '';
});