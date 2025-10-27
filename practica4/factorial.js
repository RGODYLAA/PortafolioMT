// Función recursiva para calcular el factorial
function calcularFactorial(n) {
    // Caso base: si n es 0, el factorial es 1
    if (n === 0) {
        return 1;
    }
    
    // Caso base: si n es negativo, el factorial no está definido
    if (n < 0) {
        return null; // Indicamos que no está definido
    }
    
    // Caso recursivo: n! = n * (n-1)!
    return n * calcularFactorial(n - 1);
}

// Función para formatear números grandes con separadores de miles
function formatearNumero(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Manejar el envío del formulario
document.getElementById('formFactorial').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener el valor del input
    const inputNumero = document.getElementById('numero');
    const numero = parseInt(inputNumero.value);
    
    // Obtener el elemento párrafo donde se mostrará el resultado
    const parrafoResultado = document.getElementById('resultado');
    
    // Validar si es un número entero
    if (!Number.isInteger(numero)) {
        parrafoResultado.textContent = "Error: Por favor ingrese un número entero";
        parrafoResultado.className = 'error';
        return;
    }
    
    // Calcular el factorial
    const resultado = calcularFactorial(numero);
    
    // Mostrar el resultado
    if (resultado === null) {
        parrafoResultado.textContent = `Error: El factorial de números negativos no está definido`;
        parrafoResultado.className = 'error';
    } else {
        // Limitar el cálculo para números muy grandes para evitar desbordamiento
        if (numero > 170) {
            parrafoResultado.textContent = `Advertencia: ${numero}! es demasiado grande para calcularse con precisión`;
            parrafoResultado.className = 'error';
        } else {
            parrafoResultado.textContent = `${numero}! = ${formatearNumero(resultado)}`;
            parrafoResultado.className = 'exito';
        }
    }
});

// Limpiar el resultado cuando el usuario cambie el valor del input
document.getElementById('numero').addEventListener('input', function() {
    const parrafoResultado = document.getElementById('resultado');
    parrafoResultado.textContent = '';
    parrafoResultado.className = '';
});