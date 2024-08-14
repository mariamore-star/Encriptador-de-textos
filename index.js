const ingresoTexto = document.getElementById("texto");
const mensajeFinal = document.getElementById("parrafo");
const botonEncriptar = document.getElementById("botonEncriptar");
const botonDesencriptar = document.getElementById("botonDesencriptar");
const botonCopiar = document.getElementById("botonCopiar");
const imagenLupa = document.getElementById("imagenLupa");
const rightInfo = document.getElementById("rightInfo");
const tituloMensaje = document.getElementById("tituloMensaje");

// Definir el array de reemplazos
const remplazar = [
    ["e", "enter"],
    ["o", "ober"],
    ["i", "imes"],
    ["a", "ai"],
    ["u", "ufat"]
];

const mostrarResultado = (nuevoValor, esEncriptar) => {
    mensajeFinal.innerHTML = nuevoValor;
    imagenLupa.style.display = "none";
    botonCopiar.style.display = "block";
    rightInfo.classList.add("ajustar");
    mensajeFinal.classList.add("ajustar");
    
    // Actualizar el título según el tipo de operación
    if (esEncriptar) {
        tituloMensaje.innerHTML = "Texto Encriptado";
    } else {
        tituloMensaje.innerHTML = "Texto Desencriptado";
    }
};

// Función para resetear el estado
const reset = () => {
    mensajeFinal.innerHTML = "";
    imagenLupa.style.display = "block";
    botonCopiar.style.display = "none";
    rightInfo.classList.remove("ajustar");
    mensajeFinal.classList.remove("ajustar");
    ingresoTexto.focus();
};

// Función para validar que solo se permiten letras minúsculas y espacios
const validarTexto = (texto) => /^[a-z\s]*$/.test(texto);

// Función para encriptar el texto
function encriptar(newText) {
    for (let i = 0; i < remplazar.length; i++) {
        if (newText.includes(remplazar[i][0])) {
            newText = newText.replaceAll(remplazar[i][0], remplazar[i][1]);
        }
    }
    ingresoTexto.value = ""; // Limpiar el área de texto después de encriptar
    return newText;
}

// Función para desencriptar el texto
function desencriptar(newText) {
    for (let i = 0; i < remplazar.length; i++) {
        if (newText.includes(remplazar[i][1])) {
            newText = newText.replaceAll(remplazar[i][1], remplazar[i][0]);
        }
    }
    ingresoTexto.value = ""; // Limpiar el área de texto después de desencriptar
    return newText;
}

// Event listener para el botón de encriptar
botonEncriptar.addEventListener("click", () => {
    const texto = ingresoTexto.value.toLowerCase();
    if (validarTexto(texto)) {
        if (texto !== "") {
            const textoEncriptado = encriptar(texto);
            mostrarResultado(textoEncriptado);
        } else {
            alert("Ingrese texto a encriptar");
        }
    } else {
        alert("Ingrese solo letras minúsculas y espacios.");
    }
});

// Event listener para el botón de desencriptar
botonDesencriptar.addEventListener("click", () => {
    const texto = ingresoTexto.value.toLowerCase();
    if (validarTexto(texto)) {
        if (texto !== "") {
            const textoDesencriptado = desencriptar(texto);
            mostrarResultado(textoDesencriptado);
        } else {
            alert("Ingrese texto a desencriptar");
        }
    } else {
        alert("Ingrese solo letras minúsculas y espacios.");
    }
});

// Event listener para el botón de copiar
botonCopiar.addEventListener("click", () => {
    const texto = mensajeFinal.textContent;
    navigator.clipboard.writeText(texto)
        .then(() => {
            alert("Texto copiado al portapapeles");
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
});

// Event listener para restringir la entrada en el textarea a letras minúsculas y espacios
ingresoTexto.addEventListener('input', (event) => {
    const valorActual = event.target.value;
    if (!validarTexto(valorActual)) {
        event.target.value = valorActual.replace(/[^a-z\s]/g, ''); // Reemplazar caracteres no permitidos
    }
});