function mostrarTexto(text) {
  document.getElementById("texto__traducido").style.display = "none";
  document.getElementById("texto__encriptado").style.display = "block";
  let textEncryted = document.getElementById("textoEncriptado");
  let texto = document.getElementById("textArea");
  textEncryted.innerText = text;
  texto.value = "";
}

function encriptar() {
  let text = document.getElementById("textArea").value;
  let newText = "";

  if (validacion(text)) {
    newText = "No introducir caracteres especiales o mayusculas, por favor.";
  } else {
    for (let i = 0; i < text.length; i++) {
      switch (text[i]) {
        case "e":
          newText += "enter";
          break;
        case "i":
          newText += "imes";
          break;
        case "a":
          newText += "ai";
          break;
        case "o":
          newText += "ober";
          break;
        case "u":
          newText += "ufat";
          break;
        default:
          newText += text[i];
      }
    }
  }

  mostrarTexto(newText);
}

function desencriptar() {
  let text = document.getElementById("textArea").value;
  let newText = text;

  if (validacion(newText)) {
    newText = "No introducir caracteres especiales o mayusculas, por favor.";
  } else {
    newText = cambiarTexto("enter", newText);
    newText = cambiarTexto("imes", newText);
    newText = cambiarTexto("ai", newText);
    newText = cambiarTexto("ober", newText);
    newText = cambiarTexto("ufat", newText);
  }
  mostrarTexto(newText);
}

function cambiarTexto(texto, textoEncriptado) {
  while (textoEncriptado.includes(texto)) {
    switch (texto) {
      case "enter":
        textoEncriptado = textoEncriptado.replace("enter", "e");
        break;
      case "imes":
        textoEncriptado = textoEncriptado.replace("imes", "i");
        break;
      case "ai":
        textoEncriptado = textoEncriptado.replace("ai", "a");
        break;
      case "ober":
        textoEncriptado = textoEncriptado.replace("ober", "o");
        break;
      case "ufat":
        textoEncriptado = textoEncriptado.replace("ufat", "u");
        break;
    }
  }
  return textoEncriptado;
}

function validacion(texto) {
  const tieneMayuscula = /[A-Z]/.test(texto);
  const caracteresEspeciales =
    /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~\u2000-\u206F\u20A0-\u20CF\u2100-\u214F\u2190-\u21FF\u2200-\u22FF\u2300-\u23FF\u2500-\u257F\u2600-\u26FF\u2700-\u27BF\u2E00-\u2E7F]/;

  return tieneMayuscula || caracteresEspeciales.test(texto);
}

function copiar() {
  let texto = document.getElementById("textoEncriptado");
  let botonCopiar = document.getElementById("botonCopiar");

  const textToCopy = texto.textContent;

  // Método alternativo usando document.execCommand('copy')
  const textArea = document.createElement("textarea");
  textArea.value = textToCopy;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    console.log("Texto copiado:", textToCopy);
    botonCopiar.textContent = "Copiado";
  } catch (err) {
    console.error("Error al copiar el texto:", err);
    botonCopiar.textContent = "Error";
  }
  document.body.removeChild(textArea);
  texto.focus();
  texto.select();
  setTimeout(() => {
    botonCopiar.textContent = "Copiar";
  }, 2000); // Revertir el texto del botón después de 2 segundos
}
