/* Seletores */
const criptografa = document.querySelector("#btn-criptografar");
const descriptografa = document.querySelector("#btn-descriptografar");
const texto = document.querySelector("#texto");
const btnCopiar = document.querySelector("#copiar");
const textoManipulado = document.querySelector("#textoManipulado");

/* Arrays */
let letras = ["e", "i", "a", "o", "u"];
let chaveCriptografia = ["enter", "imes", "ai", "ober", "ufat"];

/* Objetos */
class atualizarTela {
  constructor(conteudo1, conteudo2) {
    this.conteudo1 = conteudo1;
    this.conteudo2 = conteudo2;
  }

  removeElemento() {
    let container = document.querySelector(".conteudo-direita");

    let conteudoContainer = document.querySelector(this.conteudo1);
    let divFilhoContainer = document.querySelector(this.conteudo2);
    container.removeChild(conteudoContainer);
    container.removeChild(divFilhoContainer);
  }

  atualiza() {
    /* Seletor */
    let container = document.querySelector(".conteudo-direita");
    let content = document.querySelector(".conteudo-criptografado");

    setTimeout(() => {
      container.classList.replace("ativado", "desativado");
    }, 1);

    const ativo = container.classList.contains("ativado");

    if (ativo) {
      this.removeElemento();
      btnCopiar.style.display = "flex";
      btnCopiar.classList.add("btn-copiar-ativo");
      content.style.display = "flex";
    }
  }
}

class adiconandoTextoCriptografado {
  constructor(tag, conteudoTag) {
    this.tag = tag;
    this.conteudoTag = conteudoTag;
  }

  pegaConteudo() {
    let p = document.querySelector(this.tag);
    p.textContent = this.conteudoTag;
  }
}

/* Função */

texto.addEventListener("click", () => {
  if (texto.value) {
    texto.value = "";
    textoManipulado.textContent = "";
    btnCopiar.innerText = "Copiar";
  }
});

function criptografar() {
  let valorTexto = texto.value.toLowerCase();
  if (!valorTexto) {
    alert("Campo vazio");
  } else {
    for (i = 0; i < letras.length; i++) {
      let reg = new RegExp(letras[i], "g");
      valorTexto = valorTexto.replace(reg, chaveCriptografia[i]);
    }
    let atualizaTela = new atualizarTela(
      ".conteudo-direita i",
      ".caixa-conteudo-direita"
    );
    atualizaTela.atualiza();

    let adicionarConteudo = new adiconandoTextoCriptografado(
      "#textoManipulado",
      valorTexto
    );
    adicionarConteudo.pegaConteudo();
  }
}

function checarCaracter(evento) {
  /* key code = numera cada tecla do teclado com um numero */
  /* String.fromCharCode = referencia a logica de cima(ESTUDAR MELHOR) */

  const caracter = String.fromCharCode(evento.keyCode);

  /*  console.log(evento.keyCode)
    console.log(caracter) */

  const padrao = "[a-zA-Z]";

  if (caracter.match(padrao)) {
    return true;
  }
}

function descriptografar() {
  let valorTexto = texto.value.toLowerCase();
  if (!valorTexto) {
    alert("Campo vazio");
  } else {
    for (i = 0; i < chaveCriptografia.length; i++) {
      let reg = new RegExp(chaveCriptografia[i], "g");
      valorTexto = valorTexto.replace(reg, letras[i]);
    }

    let atualizaTela = new atualizarTela(
      ".conteudo-direita i",
      ".caixa-conteudo-direita"
    );
    atualizaTela.atualiza();

    let adicionarConteudo = new adiconandoTextoCriptografado(
      "#textoManipulado",
      valorTexto
    );
    adicionarConteudo.pegaConteudo();

    texto.value = valorTexto;
  }
}

function copiar() {
  navigator.clipboard
    .writeText(textoManipulado.innerHTML)
    .then(() => (btnCopiar.innerText = "Texto Copiado"))
    .catch((err) => console.log("Não foi possível copiar"));
}

/* Evento */
criptografa.addEventListener("click", criptografar);
descriptografa.addEventListener("click", descriptografar);
btnCopiar.addEventListener("click", copiar);

texto.addEventListener("keypress", (evento) => {
  if (!checarCaracter(evento)) {
    /* evento.preventDefault() = comportamento padrao n vai ser executado se for caracter especial n vai aparecer no imput */
    evento.preventDefault();
  }
});
