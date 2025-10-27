// Función para formatear la fecha en formato legible
function formatearFecha(fecha) {
    const fechaObj = new Date(fecha);
    const opciones = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return fechaObj.toLocaleDateString('es-ES', opciones);
}

// Función para calcular la edad basada en la fecha de nacimiento
function calcularEdadReal(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    
    return edad;
}

// Manejar el envío del formulario
document.getElementById('formPersonal').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener todos los valores del formulario
    const formData = new FormData(this);
    
    // Extraer los valores individuales
    const nombre = formData.get('nombre');
    const correo = formData.get('correo');
    const edad = formData.get('edad');
    const genero = formData.get('genero');
    const fechaNacimiento = formData.get('fechaNacimiento');
    const colorFavorito = formData.get('colorFavorito');
    
    // Calcular la edad real basada en la fecha de nacimiento
    const edadReal = calcularEdadReal(fechaNacimiento);
    
    // Crear el HTML para mostrar la información
    const informacionHTML = `
        <div class="campo">
            <span class="etiqueta">Nombre:</span>
            <span class="valor">${nombre}</span>
        </div>
        <div class="campo">
            <span class="etiqueta">Correo:</span>
            <span class="valor">${correo}</span>
        </div>
        <div class="campo">
            <span class="etiqueta">Edad ingresada:</span>
            <span class="valor">${edad} años</span>
        </div>
        <div class="campo">
            <span class="etiqueta">Edad calculada:</span>
            <span class="valor">${edadReal} años</span>
        </div>
        <div class="campo">
            <span class="etiqueta">Género:</span>
            <span class="valor">${genero}</span>
        </div>
        <div class="campo">
            <span class="etiqueta">Fecha de nacimiento:</span>
            <span class="valor">${formatearFecha(fechaNacimiento)}</span>
        </div>
        <div class="campo">
            <span class="etiqueta">Color favorito:</span>
            <span class="valor">${colorFavorito}
                <span class="color-muestra" style="background-color: ${colorFavorito};"></span>
            </span>
        </div>
    `;
    
    // Mostrar la información en el párrafo
    document.getElementById('informacionCompleta').innerHTML = informacionHTML;
    
    // Mostrar el div de resultados
    document.getElementById('resultado').style.display = 'block';
    
    // Hacer scroll suave hacia los resultados
    document.getElementById('resultado').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
});

// Validaciones adicionales en tiempo real
document.getElementById('edad').addEventListener('input', function() {
    const edad = parseInt(this.value);
    if (edad < 1 || edad > 120) {
        this.setCustomValidity('La edad debe estar entre 1 y 120 años');
    } else {
        this.setCustomValidity('');
    }
});

// Sincronizar la fecha máxima de nacimiento con la fecha actual
window.addEventListener('load', function() {
    const hoy = new Date();
    const fechaMax = hoy.toISOString().split('T')[0];
    document.getElementById('fechaNacimiento').setAttribute('max', fechaMax);
});

// Verificar consistencia entre edad y fecha de nacimiento
document.getElementById('formPersonal').addEventListener('submit', function(e) {
    const edadIngresada = parseInt(document.getElementById('edad').value);
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const edadCalculada = calcularEdadReal(fechaNacimiento);
    
    // Advertir si hay una discrepancia significativa
    if (Math.abs(edadIngresada - edadCalculada) > 1) {
        const confirmar = confirm(`Notamos que la edad ingresada (${edadIngresada}) difiere de la edad calculada (${edadCalculada}) según la fecha de nacimiento. ¿Desea continuar?`);
        if (!confirmar) {
            e.preventDefault();
        }
    }
})
