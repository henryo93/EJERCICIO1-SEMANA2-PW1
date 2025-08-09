// Calculadora de Área de Rectángulo
// Autor: Sistema de Calculadora
// Descripción: Aplicación para calcular el área de un rectángulo con validaciones

class RectanguloCalculadora {
    constructor() {
        // Elementos del DOM
        this.baseInput = document.getElementById('base');
        this.alturaInput = document.getElementById('altura');
        this.btnCalcular = document.getElementById('btnCalcular');
        this.btnLimpiar = document.getElementById('btnLimpiar');
        this.resultContainer = document.getElementById('resultContainer');
        this.resultado = document.getElementById('resultado');
        
        // Inicializar eventos
        this.inicializarAplicacion();
    }
    
    /**
     * Inicializa todos los event listeners de la aplicación
     */
    inicializarAplicacion() {
        // Evento click para calcular
        this.btnCalcular.addEventListener('click', () => this.calcularArea());
        
        // Evento click para limpiar
        this.btnLimpiar.addEventListener('click', () => this.limpiarFormulario());
        
        // Permitir cálculo con Enter en los campos de entrada
        this.baseInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.calcularArea();
        });
        
        this.alturaInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.calcularArea();
        });
        
        // Validación en tiempo real (opcional: solo permitir números)
        this.baseInput.addEventListener('input', (e) => this.validarNumeroEnTiempoReal(e));
        this.alturaInput.addEventListener('input', (e) => this.validarNumeroEnTiempoReal(e));
    }
    
    /**
     * Valida que solo se ingresen números y puntos decimales
     * @param {Event} e - Evento de input
     */
    validarNumeroEnTiempoReal(e) {
        const valor = e.target.value;
        // Permitir solo números, punto decimal y signo negativo al inicio
        const regex = /^-?\d*\.?\d*$/;
        
        if (!regex.test(valor)) {
            e.target.value = valor.slice(0, -1); // Eliminar último caracter inválido
        }
    }
    
    /**
     * Realiza todas las validaciones necesarias antes del cálculo
     * @param {string} base - Valor de la base
     * @param {string} altura - Valor de la altura
     * @returns {boolean} - True si las validaciones pasan, false en caso contrario
     */
    validarEntradas(base, altura) {
        // Verificar que los campos no estén vacíos
        if (base.trim() === '' || altura.trim() === '') {
            this.mostrarAlerta('warning', '⚠️ Campos vacíos', 
                'Por favor, completa todos los campos antes de calcular.');
            return false;
        }
        
        // Verificar que sean números válidos
        const baseNum = parseFloat(base);
        const alturaNum = parseFloat(altura);
        
        if (isNaN(baseNum) || isNaN(alturaNum)) {
            this.mostrarAlerta('error', '❌ Valores inválidos', 
                'Por favor, ingresa solo números válidos en los campos.');
            return false;
        }
        
        // Verificar que sean números positivos
        if (baseNum <= 0 || alturaNum <= 0) {
            this.mostrarAlerta('error', '❌ Números negativos o cero', 
                'Los valores deben ser números positivos mayores que cero.');
            return false;
        }
        
        // Verificar que no sean números excesivamente grandes
        if (baseNum > 1000000 || alturaNum > 1000000) {
            this.mostrarAlerta('warning', '⚠️ Números muy grandes', 
                'Por favor, ingresa valores más pequeños para un cálculo preciso.');
            return false;
        }
        
        return true;
    }
    
    /**
     * Función principal que calcula el área del rectángulo
     */
    calcularArea() {
        const base = this.baseInput.value;
        const altura = this.alturaInput.value;
        
        // Realizar validaciones
        if (!this.validarEntradas(base, altura)) {
            return;
        }
        
        // Convertir a números
        const baseNum = parseFloat(base);
        const alturaNum = parseFloat(altura);
        
        // Fórmula: Área = base * altura
        const area = baseNum * alturaNum;
        
        // Redondear a 2 decimales para evitar problemas de precisión
        const areaRedondeada = Math.round(area * 100) / 100;
        
        // Mostrar resultado
        this.mostrarResultado(areaRedondeada, baseNum, alturaNum);
        
        // Mostrar mensaje de éxito
        this.mostrarAlerta('success', '✅ ¡Cálculo exitoso!', 
            `El área del rectángulo es ${areaRedondeada} cm²`, true);
    }
    
    /**
     * Muestra el resultado del cálculo en la interfaz
     * @param {number} area - Área calculada
     * @param {number} base - Base utilizada
     * @param {number} altura - Altura utilizada
     */
    mostrarResultado(area, base, altura) {
        this.resultado.innerHTML = `
            <strong>Resultado:</strong><br>
            Base: ${base} cm | Altura: ${altura} cm<br>
            <span class="fs-4">Área = ${area} cm²</span>
        `;
        
        this.resultContainer.style.display = 'block';
        
        // Animación suave para mostrar el resultado
        this.resultContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }
    
    /**
     * Limpia todos los campos del formulario y oculta el resultado
     */
    limpiarFormulario() {
        this.baseInput.value = '';
        this.alturaInput.value = '';
        this.resultContainer.style.display = 'none';
        
        // Enfocar el primer campo
        this.baseInput.focus();
        
        // Mostrar mensaje de confirmación
        this.mostrarAlerta('info', '🧹 Formulario limpiado', 
            'Todos los campos han sido borrados.', true);
    }
    
    /**
     * Muestra alertas usando SweetAlert2
     * @param {string} tipo - Tipo de alerta (success, error, warning, info)
     * @param {string} titulo - Título de la alerta
     * @param {string} texto - Texto de la alerta
     * @param {boolean} autoClose - Si la alerta se cierra automáticamente
     */
    mostrarAlerta(tipo, titulo, texto, autoClose = false) {
        const colores = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        
        const configuracion = {
            icon: tipo,
            title: titulo,
            text: texto,
            confirmButtonText: tipo === 'success' ? 'Perfecto' : 'Entendido',
            confirmButtonColor: colores[tipo] || '#667eea'
        };
        
        if (autoClose) {
            configuracion.timer = 3000;
            configuracion.timerProgressBar = true;
        }
        
        Swal.fire(configuracion);
    }
    
    /**
     * Método para obtener estadísticas de uso (funcionalidad adicional)
     */
    obtenerEstadisticas() {
        return {
            version: '1.0.0',
            autor: 'Sistema de Calculadora',
            descripcion: 'Calculadora de área de rectángulo con validaciones avanzadas'
        };
    }
}

// Inicializar la calculadora cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Crear instancia de la calculadora
    const calculadora = new RectanguloCalculadora();
    
    // Enfocar el primer campo al cargar la página
    document.getElementById('base').focus();
    
    // Mostrar mensaje de bienvenida (opcional)
    console.log('🔢 Calculadora de Área de Rectángulo inicializada correctamente');
    console.log('📊 Estadísticas:', calculadora.obtenerEstadisticas());
});

// Hacer la clase disponible globalmente si es necesario
window.RectanguloCalculadora = RectanguloCalculadora;